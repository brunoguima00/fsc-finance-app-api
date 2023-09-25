import { UserNotFoundError } from '../../../Errors/user.js';
import {
    userNotFoundResponse,
    serverError,
    requiredFieldsIsMissingResponse,
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
} from '../../helpers/index.js';

export class GetTransactionsByUserIdController {
    constructor(getTransactionsByUserIdUseCase) {
        this.getTransactionsByUserIdUseCase = getTransactionsByUserIdUseCase;
    }
    async execute(httpRequest) {
        try {
            // usamos o query pois será um query param ?param
            const userId = httpRequest.query.userId;

            // Verifica se o Id foi passado como parâmetro
            if (!userId) {
                return requiredFieldsIsMissingResponse('userId');
            }
            // Verifica se é um Id válido
            const userIdIsValid = checkIfIdIsValid(userId);

            if (!userIdIsValid) {
                return invalidIdResponse();
            }

            const transaction =
                await this.getTransactionsByUserIdUseCase.execute({ userId });

            return ok(transaction);
        } catch (error) {
            console.log(error);

            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse();
            }
            return serverError();
        }
    }
}
