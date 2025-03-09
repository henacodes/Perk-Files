import { uploadToSupabase } from '$lib/server/supabase';
import { auth } from '$lib/auth';
import type { RequestEvent } from './$types';
import { generateRandomString } from 'better-auth/crypto';
import { getFileExtension } from '$lib/utils/file';
import { FileUploadError } from '$lib/exceptions/FileUploadException';

import { json } from '@sveltejs/kit';
import { createFile } from '$lib/db/files';

export const GET = async ({ request }: any) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	return new Response();
};

export const POST = async ({ request }: RequestEvent) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	if (!session?.user) {
		return json({ error: { message: 'You are not logged-in' } });
	}

	const formData = await request.formData();

	const title = formData.get('title') as string;
	const description = formData.get('description') as string;
	const price = parseFloat(formData.get('price') as string);
	const categoryId = formData.get('categoryId') as string;
	const file = formData.get('file') as File;

	try {
		const data = await uploadToSupabase(
			file,
			'perks',
			`${title.replace(' ', '')}_${generateRandomString(5)}.${getFileExtension(file)}`
		);

		let filePath = data.path;

		try {
			const newFile = await createFile(
				title,
				description,
				price,
				session.user.id,
				categoryId,
				filePath,
				file.size
			);

			return json(newFile);
		} catch (error) {
			console.log(error);
			return json({ error: { message: "Could't create a new file record." } });
		}
	} catch (error: unknown) {
		return json({ error: { message: 'Failed to upload file' } });
	}
	console.log(title, file);
	return new Response();
};
