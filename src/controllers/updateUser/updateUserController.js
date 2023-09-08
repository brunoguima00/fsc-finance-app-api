import validator from 'validator';
import { EmailAlreadyInUseError } from '../../Errors/user.js';
import {
    checkIfEmailIsValid,
    checkIfPasswordIsValid,
    emailIsAlreadyUseResponse,
    invalidIdResponse,
    invalidPasswordResponse,
    badRequest,
    serverError,
    ok,
} from '../helpers/index.js';

export class UpdateUserController {
    constructor(updateUserUseCase) {
        this.updateUserUseCase = updateUserUseCase;
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;

            const isIdValid = validator.isUUID(userId);

            if (!isIdValid) {
                return invalidIdResponse();
            }

            const params = httpRequest.body;

            const allowedFields = [
                'firstName',
                'lastName',
                'email',
                'password',
            ];

            const someFieldIsNotAllowed = Object.keys(params).some(
                (field) => !allowedFields.includes(field),
            );
            // Quando mudei para dependency injection coloquei o ! no if
            if (!someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Some provided field is not allowed',
                });
            }

            if (params.password) {
                // Verify if password has more than 6 characters
                const passwordIsValid = checkIfPasswordIsValid(params.password);

                if (!passwordIsValid) {
                    return invalidPasswordResponse();
                }
            }

            // Validar o email
            const emailIsValid = checkIfEmailIsValid(params.email);

            if (!emailIsValid) {
                return emailIsAlreadyUseResponse();
            }

            const updatedUser = await this.updateUserUseCase.execute(
                userId,
                params,
            );

            return ok(updatedUser);
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message });
            }
            console.error(error);

            return serverError;
        }
    }
}
