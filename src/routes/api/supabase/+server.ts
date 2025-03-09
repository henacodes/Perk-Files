import { supabase } from '$lib/server/supabase';

export const GET = async () => {
	const { data, error } = await supabase.storage.from('perks').download('profile_image.png');

	console.log(data, error);

	return new Response();
};

export const POST = async () => {};
