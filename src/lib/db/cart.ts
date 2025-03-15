import { prisma } from '$lib/server/prisma';

interface Cart {
	files: any[];
	userId: string;
}

export const addToCart = async (cart: Cart) => {
	const alreadyExists = await prisma.cart.findFirst({
		where: { userId: cart.userId },
		include: { files: true }
	});

	if (alreadyExists) {
		const updatedCart = await prisma.cart.update({
			where: { userId: cart.userId },
			data: {
				files: {
					connect: [
						...alreadyExists.files.map((f) => ({ id: f.id })),
						...cart.files.map((f) => ({ id: f.id }))
					]
				}
			}
		});

		return updatedCart;
	} else {
		const newCart = await prisma.cart.create({
			data: { userId: cart.userId, files: { connect: cart.files.map((f) => ({ id: f.id })) } }
		});

		return newCart;
	}
};

export const fetchUserCart = async (userId: string) => {
	const cart = await prisma.cart.findMany({ where: { userId } });
	return cart;
};

export const clearCart = async () => {
	await prisma.cart.deleteMany();
};
