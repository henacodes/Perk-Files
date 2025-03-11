import { env } from '$env/dynamic/private';
import { json, type RequestHandler } from '@sveltejs/kit';

const initializePayment = async () => {
	const apiUrl = env.CHAPA_INIT_URL;
	const apiKey = env.CHAPA_SECRET_KEY;

	const payload = {
		amount: '10',
		currency: 'ETB',
		email: 'abebech_bekele@gmail.com',
		first_name: 'Bilen',
		tx_ref: 'henok-1234',
		last_name: 'Gizachew',
		phone_number: '0912345678',
		callback_url: 'http://localhost:5173/api/chapa/callback',
		return_url: 'https://www.google.com/',
		customization: {
			title: 'Payment ',
			description: 'I love online payments'
		},
		meta: {
			hide_receipt: 'true'
		}
	};

	try {
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${apiKey}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		});

		const result = await response.json();
		return result;
	} catch (error) {
		console.error('Error initializing payment:', error);
	}
};

export const POST: RequestHandler = async ({ request }) => {
	let res = await initializePayment();

	return json(res);
};
