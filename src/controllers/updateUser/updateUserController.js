import { badRequest, serverError, ok } from '../helper.js';
import validator from 'validator';
import { EmailAlreadyInUseError } from '../../Errors/user.js';
import { UpdateUserUseCase } from '../../useCases/updateUser/updateUserUseCase.js';

export class UpdateUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;

            const isIdValid = validator.isUUID(userId);

            if (!isIdValid) {
                return badRequest({ message: 'The provider id is not valid' });
            }

            const updateUserParams = httpRequest.body;

            const allowedFields = [
                'firstName',
                'lastName',
                'email',
                'password',
            ];

            const someFieldIsNotAllowed = Object.keys(updateUserParams).some(
                (field) => !allowedFields.includes(field),
            );

            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Some provided field is not allowed',
                });
            }

            if (updateUserParams.password) {
                // Verify if password has more than 6 characters
                const passwordIsNotValid = updateUserParams.password.length < 6;

                if (passwordIsNotValid) {
                    return badRequest({
                        message: 'Password must be at least 6 characters',
                    });
                }
            }

            // Validar o email
            const emailIsValid = validator.isEmail(updateUserParams.email);

            if (!emailIsValid) {
                return badRequest({
                    message: 'Invalid e-mail. Please provide a valid one',
                });
            }

            const updateUserUseCase = new UpdateUserUseCase();

            const updatedUser = await updateUserUseCase.execute(
                userId,
                updateUserParams,
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
