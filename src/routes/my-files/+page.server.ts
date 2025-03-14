import { auth } from '$lib/auth';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ request, locals, fetch }) => {
	const res = await fetch('/api/files/my-files');

	const files = await res.json();

	return {
		files
	};
};
