import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';
import { FileUploadError } from '$lib/exceptions/FileUploadException';

export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

export const uploadToSupabase = async (file: File, bucket: string, path: string) => {
	const { data, error } = await supabase.storage.from(bucket).upload(path, file);

	if (!error) {
		return data;
	} else {
		throw new FileUploadError(`Couldn't upload the file: ${error.message}`);
	}
};

export const downloadFile = async (path: string, bucket: string) => {
	const { data, error } = await supabase.storage.from(bucket).download(path);
	if (!error) {
		return data;
	} else {
		console.log(error);
		throw new Error("Could't download the file!");
	}
};
