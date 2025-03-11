import { env } from '$env/dynamic/private';
import { auth } from '$lib/auth';
import { completeTransaction, getTransactionStatus, payFileOwners } from '$lib/db/transaction';
import { returnError } from '$lib/utils';
import { json, redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request, url }) => {
	const apiUrl = env.CHAPA_VERIFY_URL;
	const apiKey = env.CHAPA_SECRET_KEY;

	const txRef = url.searchParams.get('tx_ref');

	const session = await auth.api.getSession({
		headers: request.headers
	});

	if (!session) {
		return redirect(301, '/login');
	}

	var myHeaders = new Headers();
	myHeaders.append('Authorization', `Bearer ${apiKey}`);

	try {
		let response = await fetch(`${apiUrl}/${txRef}`, {
			method: 'GET',
			headers: myHeaders
		});

		let result = await response.json();
		if (result.status == 'success') {
			let txRef = result.data.tx_ref;
			const txStatus = await getTransactionStatus(txRef);

			if (txStatus === 'done') {
				return json(returnError('Receipt already used.', { status: 'failed' }));
			}

			try {
				let transaction = await completeTransaction(txRef);

				let files = transaction.digitalFiles;

				let promises = files.map(async (f: any) => {
					await payFileOwners(f.authorId, parseFloat(f.price));
				});

				await Promise.all(promises);

				return json({ message: 'Transaction completed successfully!', status: 'success' });
			} catch (error: any) {
				return json(returnError(error.message));
			}
		} else {
			return json(returnError('Transaction is not done yet!'));
		}
	} catch (error: any) {
		console.log(error);
		return json(returnError(error.message));
	}
};
