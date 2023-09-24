import {
    checkIfIdIsValid,
    invalidIdResponse,
    serverError,
    created,
    validateRequiredFields,
    requiredFieldsIsMissingResponse,
    checkIfAmountIsValid,
    checkIfTypeIsValid,
    invalidamountResponse,
    invalidTypeResponse,
} from '../../helpers/index.js';

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase;
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            const requiredFields = ['userId', 'name', 'date', 'amount', 'type'];

            const { ok: someRequiredFieldWereProvided, missingField } =
                validateRequiredFields(params, requiredFields);

            if (!someRequiredFieldWereProvided) {
                return requiredFieldsIsMissingResponse(missingField);
            }

            const userIdIsValid = checkIfIdIsValid(params.userId);
            if (!userIdIsValid) {
                return invalidIdResponse();
            }

            const amountIsValid = checkIfAmountIsValid(params.amount);

            if (!amountIsValid) {
                return invalidamountResponse();
            }

            const type = params.type.trim().toUpperCase();

            const typeIsValid = checkIfTypeIsValid(type);

            if (!typeIsValid) {
                return invalidTypeResponse();
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
