import { z } from 'zod';
import validator from 'validator';

export const createTransactionSchema = z.object({
    userid: z
        .string({
            required_error: 'User ID is required',
        })
        .uuid({
            message: 'User ID must be a valid UUID',
        }),
    name: z
        .string({
            required_error: 'Name is required',
        })
        .trim()
        .min(1, {
            message: 'Name is required',
        }),
    date: z
        .string({
            required_error: 'Date is required',
        })
        .datetime({
            message: 'Date must be a valid date',
        }),
    type: z.enum(['EXPENSE', 'EARNING', 'INVESTMENT'], {
        errorMap: () => ({
            message: 'Type must be EXPENSE, EARNING OR IVESTIMENT',
        }),
    }),
    amount: z
        .number({
            required_error: 'Amount is required',
            invalid_type_error: 'Amount must be a number',
        })
        .min(1, {
            message: 'Amount must be greater than 0',
        })
        // QUANDO NÃO TEM O MÉTODO PRONTO NO ZOD PODEMOS USAR O REFINE E FAZER MANUAL
        .refine((value) =>
            validator.isCurrency(value.toFixed(2), {
                digits_after_decimal: [2],
                allow_negative: false,
                decimal_separator: '.',
            }),
        ),
});
