import { env } from '$env/dynamic/private';
import { completeTransaction, getTransactionStatus } from '$lib/db/transaction';
import { returnError } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request, url }) => {
	const apiUrl = env.CHAPA_VERIFY_URL;
	const apiKey = env.CHAPA_SECRET_KEY;

	const txRef = url.searchParams.get('tx_ref');

	var myHeaders = new Headers();
	myHeaders.append('Authorization', `Bearer ${apiKey}`);

	try {
		let response = await fetch(`${apiUrl}/${txRef}`, {
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow'
		});

		let result = await response.json();
		if (result.status == 'success') {
			let txRef = result.data.tx_ref;
			const txStatus = await getTransactionStatus(txRef);

			if (txStatus === 'done') {
				return json(returnError('Receipt already used.', { status: 'failed' }));
			}

			await completeTransaction(txRef);

			return json({ message: 'Transaction completed successfully!', status: 'success' });
		} else {
			return json(returnError('Transaction is not done yet!'));
		}
	} catch (error: any) {
		console.log(error);
		return json(returnError(error.message));
	}
};
