import { fetchFiles } from '$lib/db/files';

function serializeFile(file: any) {
	return {
		...file,
		price: file.price.toString(), // Convert Decimal to string
		createdAt: file.createdAt.toISOString(), // Convert Date to string
		id: file.id.toString() // Convert BigInt to string
	};
}

export async function load() {
	const files = await fetchFiles();

	const serializedFiles = files.map(serializeFile);

	return { files: serializedFiles };
}
