import { auth } from '$lib/auth';
import { fetchPostedFiles } from '$lib/db/files';
import { json, redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request }) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	if (!session) {
		console.log('no session');
		return redirect(307, '/');
	}

	console.log('sessssssion', session);

	const files = await fetchPostedFiles(session.user.id);

	return json(files);
};
