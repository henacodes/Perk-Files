import { z } from 'zod';

export const registerSchema = z.object({
	firstName: z.string().min(3, { message: 'Invalid first name' }),
	lastName: z.string().min(3, { message: 'Invalid last name' }),
	email: z.string().email('Email is required'),
	password: z.string().min(6, { message: 'Password must be atleast 6 characters long' })
});

export type RegisterDataType = z.infer<typeof registerSchema>;
