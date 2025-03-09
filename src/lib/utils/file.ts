export function getFileExtension(file: File) {
	const fileName: string = file.name;
	let arr = fileName.split('.');
	const fileExtension = arr[arr.length - 1].toLowerCase(); // Get the part after the dot and make it lowercase
	return fileExtension;
}
