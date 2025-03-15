import { auth } from '$lib/auth';
import { fetchPurchasedFiles } from '$lib/db/files';
import { json, redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request }) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	if (!session) {
		console.log('no session');
		return redirect(307, '/');
	}
	const files = await fetchPurchasedFiles(session.user.id);
	console.log(files);
	return json(files);
};
