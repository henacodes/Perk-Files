import { fetchFiles } from '$lib/db/files';
import { serializeFile } from '$lib/utils';

export async function load() {
	const files = await fetchFiles();

	const serializedFiles = files.map(serializeFile);

	return { files: serializedFiles };
}
