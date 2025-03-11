import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';

export const GET = () => {
	const apiUrl = env.CHAPA_INIT_URL;
	const apiKey = env.CHAPA_SECRET_KEY;
	var myHeaders = new Headers();
	myHeaders.append('Authorization', `Bearer ${apiKey}`);

	fetch('https://api.chapa.co/v1/transaction/verify/henok-1234', {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow'
	})
		.then((response) => response.text())
		.then((result) => console.log(result))
		.catch((error) => console.log('error', error));

	return json({});
};
