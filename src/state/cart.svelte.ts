let cart: any[] = $state([]);

export const getCart = () => {
	return cart;
};
export const setCart = (newCart: any[]) => {
	cart = newCart;

	saveToLocalStorage();
};

export const existsInCart = (fileId: string): boolean => {
	return cart.map((f) => f.id).includes(fileId);
};

export const addToCart = (file: any) => {
	if (existsInCart(file.id)) {
		return;
	}
	cart.push(file);
	saveToLocalStorage();
};

const saveToLocalStorage = () => {
	localStorage.setItem('file-cart', JSON.stringify(cart));
};
