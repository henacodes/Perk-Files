import { auth } from '$lib/auth';
import { addToCart, fetchUserCart } from '$lib/db/cart';
import { json, redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request }) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	if (!session) {
		console.log('no session');
		return redirect(307, '/');
	}

	const cart = await fetchUserCart(session.user.id);

	return json(cart);
};

export const POST: RequestHandler = async ({ request }) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	if (!session) {
		console.log('no session');
		return redirect(307, '/');
	}

	const req = request.clone();

	const body = await req.json();

	const cart = await addToCart({ userId: session.user.id, files: body.files });

	return json(cart);
};
