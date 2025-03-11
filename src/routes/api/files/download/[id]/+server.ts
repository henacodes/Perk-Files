import { auth } from '$lib/auth';
import { fetchFileById } from '$lib/db/files';
import { userCanAccessFile } from '$lib/db/transaction';
import { downloadFile } from '$lib/server/supabase';
import { returnError } from '$lib/utils';
import { json, redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request, params }) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	if (!session) {
		redirect(301, '/login');
	}

	const fileId = params.id;
	if (!fileId) {
		return json(returnError('File ID is missing'));
	}

	try {
		const file = await fetchFileById(fileId);
		if (!file) {
			return json(returnError('File not found'));
		}

		const completedTransactionExists = await userCanAccessFile(session.user.id, file.id);

		if (!completedTransactionExists) {
			return json(returnError("You can't access this file"));
		}

		try {
			const blob = await downloadFile(file.fileUrl, 'perks');
			const buffer = await blob.arrayBuffer();
			const headers = {
				'Content-Disposition': `attachment; filename="${file.fileUrl}"`, // Filename for the download
				'Content-Type': blob.type // MIME type of the Blob
			};

			return new Response(buffer, {
				status: 200,
				headers
			});
		} catch (error: any) {
			return json(returnError(error.message));
		}
	} catch (error: any) {
		return json(returnError(error.message));
	}

	if (fileId) return json({});
};
