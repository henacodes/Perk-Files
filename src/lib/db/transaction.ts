import { prisma } from '$lib/server/prisma';

interface TransactionData {
	txRef: string;
	status: string;
	userId: string;
	amount: string;
	digitalFiles: any[];
}

export const startTransaction = async (txData: TransactionData) => {
	const newTransaction = await prisma.transaction.create({
		data: {
			...txData,
			digitalFiles: {
				connect: txData.digitalFiles.map((id) => ({ id }))
			}
		},
		include: {
			digitalFiles: true
		}
	});

	return newTransaction;
};

export const getTransactionStatus = async (txRef: string) => {
	const tx = await prisma.transaction.findFirst({ where: { txRef }, select: { status: true } });

	if (tx) {
		return tx.status;
	}
	throw new Error('Transaction not found!');
};

export const completeTransaction = async (txRef: string) => {
	const updated = await prisma.transaction.update({
		where: { txRef },
		data: { status: 'done' },
		include: {
			digitalFiles: true
		}
	});
	return updated;
};

export const deleteTransaction = async (id: string) => {
	await prisma.transaction.delete({
		where: {
			id
		}
	});
};
