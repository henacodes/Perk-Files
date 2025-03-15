import { auth } from '$lib/auth';
import { fetchFiles, fetchFilesForLoggedInUser } from '$lib/db/files';
import { serializeFile } from '$lib/utils';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ request }) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	let user = session?.user;

	let files: any[] = [];

	if (user) {
		files = await fetchFilesForLoggedInUser(user.id);
	} else {
		files = await fetchFiles();
	}

	const serializedFiles = files.map(serializeFile);

	return { files: serializedFiles };
};
