export function getFileExtension(file: File) {
	const fileName: string = file.name;
	let arr = fileName.split('.');
	const fileExtension = arr[arr.length - 1].toLowerCase(); // Get the part after the dot and make it lowercase
	return fileExtension;
}

export function convertBytes(bytes: number) {
	if (bytes < 1024) {
		return bytes + ' bytes';
	} else if (bytes < 1048576) {
		return (bytes / 1024).toFixed(2) + ' KB';
	} else {
		return (bytes / 1048576).toFixed(2) + ' MB';
	}
}
