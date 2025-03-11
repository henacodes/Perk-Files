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

export const fetchFiles = async () => {
	const files = await prisma.digitalFile.findMany({
		include: {
			author: {
				select: {
					name: true,
					image: true
				}
			}
		}
	});
	return files;
};

// get files bought by a user
export const fetchMyFiles = async (userId: string) => {
	const transactions = await prisma.transaction.findMany({
		where: { userId, status: 'done' },
		include: {
			digitalFiles: true
		}
	});

	return transactions.map((tx) => tx.digitalFiles);
};

export const fetchFileById = async (fileId: string) => {
	const file = await prisma.digitalFile.findFirst({ where: { id: fileId } });

	return file;
};
