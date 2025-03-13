export function trimParag(paragraph: string, length: number) {
	return paragraph.slice(0, length);
}

export function returnError(message: string, otherFields?: Object) {
	return { message, ...otherFields };
}

export function serializeFile(file: any) {
	return {
		...file,
		price: file.price.toString(),
		createdAt: file.createdAt.toISOString(),
		id: file.id.toString()
	};
}
