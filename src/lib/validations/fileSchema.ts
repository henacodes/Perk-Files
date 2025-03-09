import { z } from 'zod';

export const fileSchema = z.object({
	title: z.string().min(1, { message: 'Title is required' }),
	description: z.string().min(1, { message: 'Description is required' }),
	price: z.number().min(0, { message: 'Price must be a positive number' }),
	file: z.instanceof(File).refine((file) => file.size > 0, {
		message: 'File is required'
	}),
	categoryId: z.string().min(1, { message: 'Category is required' })
});

export type FileData = z.infer<typeof fileSchema>;
