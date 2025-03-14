import { auth } from '$lib/auth';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ request, locals, fetch }) => {
	const res = await fetch('/api/files/purchased-files');
	const purchasedFiles = await res.json();

	const resp = await fetch('/api/files/posted-files');
	const postedFiles = await resp.json();

	return {
		purchasedFiles,
		postedFiles
	};
};
