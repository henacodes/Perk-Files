import { fetchFiles } from '$lib/db/files';

function serializeFile(file: any) {
	return {
		...file,
		price: file.price.toString(),
		createdAt: file.createdAt.toISOString(),
		id: file.id.toString()
	};
}

export async function load() {
	const files = await fetchFiles();

	const serializedFiles = files.map(serializeFile);

	return { files: serializedFiles };
}
