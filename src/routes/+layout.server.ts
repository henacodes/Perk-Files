import { auth } from '$lib/auth';
import { protectedRoutes } from '$lib/constants';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request }) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	let user: any = session?.user;

	let urlPath = new URL(request.url).pathname;

	if (!user && protectedRoutes.includes(urlPath)) {
		redirect(307, '/login');
	}

	return {
		user
	};
};
