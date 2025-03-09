import { supabase, uploadToSupabase } from '$lib/server/supabase';
import { auth } from '$lib/auth';
import { prisma } from '$lib/server/prisma';
import type { RequestEvent } from './$types';
import { generateRandomString } from 'better-auth/crypto';
import { getFileExtension } from '$lib/utils/file';
export const GET = async ({ request }: any) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	return new Response();
};

export const POST = async ({ request }: RequestEvent) => {
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
			`${title}_${generateRandomString(5)}.${getFileExtension(file)}`
		);

		console.log(data);
	} catch (error) {
		console.log(error);
	}
	console.log(title, file);
	return new Response();
};
