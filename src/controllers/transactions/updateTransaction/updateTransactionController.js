import {
    serverError,
    badRequest,
    invalidamountResponse,
    checkIfTypeIsValid,
    invalidTypeResponse,
    ok,
} from '../../helpers/index.js';
import { checkIfIdIsValid, invalidIdResponse } from '../../helpers/index.js';

import { checkIfAmountIsValid } from '../../helpers/index.js';

export class UpdateTransactionController {
    constructor(updateTransactioUseCase) {
        this.updateTransactioUseCase = updateTransactioUseCase;
    }
    async execute(httpRequest) {
        try {
            const idIsValid = checkIfIdIsValid(
                httpRequest.params.transactionId,
            );
            if (!idIsValid) {
                return invalidIdResponse();
            }

            const params = httpRequest.body;

            const allowedFields = ['name', 'date', 'amount', 'type'];

            const someFieldIsNotAllowed = Object.keys(params).some(
                (field) => !allowedFields.includes(field),
            );
            // Quando mudei para dependency injection coloquei o ! no if
            if (!someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Some provided field is not allowed',
                });
            }

            if (params.amount) {
                const amountIsValid = checkIfAmountIsValid;

                if (!amountIsValid) {
                    return invalidamountResponse();
                }
            }

            if (params.type) {
                const typeIsValid = checkIfTypeIsValid(params.type);

                if (!typeIsValid) {
                    return invalidTypeResponse();
                }
            }

            const transaction = await this.updateTransactioUseCase.execute(
                httpRequest.params.transactionId,
                params,
            );

            return ok(transaction);
        } catch (error) {
            console.log(error);

            return serverError();
        }
    }
}
