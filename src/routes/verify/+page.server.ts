import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ url, fetch }) => {
	const txRef = url.searchParams.get('tx_ref');
	const res = await fetch(`/api/transactions/verify?tx_ref=${txRef}`);
	const result = await res.json();

	return {
		...result
	};
};
