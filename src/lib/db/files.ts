import { prisma } from '$lib/server/prisma';

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

// the reason we need this function is that we want to
// exclude the files already in the cart or in transaction from being listed in the feed
export const fetchFilesForLoggedInUser = async (userId: string) => {
	const userCart = await prisma.cart.findFirst({
		where: { userId: userId },
		select: { files: true }
	});
	const cartFileIds = userCart?.files.map((item) => item.id) || [];

	const transactionFileIds = await prisma.transaction
		.findMany({
			where: {
				userId
			},
			select: { digitalFiles: { select: { id: true } } }
		})
		.then((transactions) =>
			transactions.flatMap((transaction) => transaction.digitalFiles.map((file) => file.id))
		);

	const excludedFileIds = [...new Set([...cartFileIds, ...transactionFileIds])]; // Merge & remove duplicates

	const files = await prisma.digitalFile.findMany({
		where: {
			id: { notIn: excludedFileIds }
		},
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

export const fetchPurchasedFiles = async (userId: string) => {
	const transactions = await prisma.transaction.findMany({
		where: { userId, status: 'done' },
		include: {
			digitalFiles: {
				include: {
					author: true
				}
			}
		}
	});

	let files: any[] = [];

	transactions.forEach((tx) => {
		files = [...files, ...tx.digitalFiles];
	});
	return files;
};

export const fetchPostedFiles = async (userId: string) => {
	const files = await prisma.digitalFile.findMany({
		where: { authorId: userId },
		include: { author: true }
	});

	return files;
};

export const fetchFileById = async (fileId: string) => {
	const file = await prisma.digitalFile.findFirst({ where: { id: fileId } });

	return file;
};
