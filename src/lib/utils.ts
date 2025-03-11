export function trimParag(paragraph: string, length: number) {
	return paragraph.slice(0, length);
}

export function returnError(message: string, otherFields?: Object) {
	return { message, ...otherFields };
}
