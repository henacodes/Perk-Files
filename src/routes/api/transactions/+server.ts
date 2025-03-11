import { auth } from '$lib/auth';
import { deleteTransaction, startTransaction } from '$lib/db/transaction';
import { json, redirect, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { returnError } from '$lib/utils';

export const POST: RequestHandler = async ({ request }) => {
	const apiUrl = env.CHAPA_INIT_URL;
	const apiKey = env.CHAPA_SECRET_KEY;
	const req = request.clone();

	const session = await auth.api.getSession({
		headers: request.headers
	});

	if (!session) {
		return redirect(301, '/');
	}

	const body = await req.json();

	try {
		const newTx = await startTransaction({
			txRef: body.tx_ref,
			status: 'pending',
			userId: session.user.id,
			amount: body.amount,
			digitalFiles: body.digital_files
		});

		try {
			const response = await fetch(apiUrl, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${apiKey}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			});

			let res = await response.json();
			return json({ checkoutUrl: res.data.checkout_url });
		} catch (error) {
			// since it has no use, current new tx will be deleted
			await deleteTransaction(newTx.id);
			return json(returnError("Couldn't initiate transaction"));
		}
	} catch (error) {
		return json({ error: { message: 'Checkout failed' } });
	}
};
