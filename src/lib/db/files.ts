import { prisma } from '$lib/server/prisma';
import { supabase } from '$lib/server/supabase';
import { type FileData } from '$lib/validations/fileSchema';

export const createFile = async (
	title: string,
	description: string,
	price: number,
	userId: string,
	category: string,
	filePath: string,
	fileSize: number
) => {
	const newFile = await prisma.digitalFile.create({
		data: {
			title,
			description,
			price,
			authorId: userId,
			category,
			fileUrl: filePath,
			fileSize
		}
	});

	return newFile;
};
