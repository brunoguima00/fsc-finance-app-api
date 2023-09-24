import { serverError, badRequest } from '../../helpers.js';
import { created } from '../../helpers/httpHelper.js';
import {
    checkIfIdIsValid,
    invalidIdResponse,
} from '../../helpers/userHelper.js';

import validator from 'validator';

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase;
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            const requiredFields = [
                'id',
                'userId',
                'name',
                'date',
                'amount',
                'type',
            ];
            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length == 0) {
                    return badRequest({ message: `Missing param: ${field}` });
                }
            }

            const userIdIsValid = checkIfIdIsValid(params.userID);
            if (!userIdIsValid) {
                return invalidIdResponse();
            }

            if (params.amount <= 0) {
                return badRequest({
                    message: 'The amount must be greater than 0',
                });
            }

            const amountIsValid = validator.isCurrency(
                params.amount.toString(),
                {
                    digits_after_decimal: [2],
                    allow_negative: false,
                    decimal_separator: '.',
                },
            );

            if (!amountIsValid) {
                return badRequest({
                    message: 'The amount must be a valid currency',
                });
            }

            const type = params.type.trim().toUpperCase();

            const typeIsValid = ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(
                type,
            );

            if (!typeIsValid) {
                return badRequest({
                    message: 'The type muste be EARNING, EXPENSE or INVESTMENT',
                });
            }

            const transaction = await this.createTransactionUseCase.execute({
                ...params,
                type,
            });

            return created(transaction);
        } catch (error) {
            console.log(error);
            return serverError();
        }
    }
}
