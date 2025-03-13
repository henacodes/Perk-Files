import { auth } from '$lib/auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request }) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	let user: any = session?.user;
	console.log('userrrrrrrrrrrrrrrrrr', user);

	return {
		user
	};
};
