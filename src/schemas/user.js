import { z } from 'zod';

export const createUserSchema = z.object({
    firstName: z
        .string({
            required_error: 'Firstname is required',
        })
        .trim()
        .min(3, {
            message: 'First name is required',
        }),
    lastName: z
        // Quando o campo não é passado
        .string({
            required_error: 'Lastname is required',
        })
        .trim()
        // Quando o campo não tem o mínimo de caracteres
        .min(3, {
            message: 'Lastname must be at leat 3 characters',
        }),
    email: z
        // O required padrão é apenas se o campo não estiver presente, assim usamos
        .string({
            required_error: 'Email is required',
        })
        .email({
            message: 'Please provide a valid email',
        })
        .trim()
        .min(10, {
            message: 'Email is required',
        }),
    password: z
        .string({
            required_error: 'Password ir required',
        })
        .trim()
        .min(6, {
            message: 'Password must leat at 6 characters',
        }),
});

export const updateUserSchema = createUserSchema.partial().strict({
    message: 'Invalid fields provided',
});
