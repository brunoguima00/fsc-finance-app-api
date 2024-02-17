import validator from 'validator';
import { EmailAlreadyInUseError } from '../../../Errors/user.js';
import {
    invalidIdResponse,
    badRequest,
    serverError,
    ok,
} from '../../helpers/index.js';
import { updateUserSchema } from '../../../schemas/user.js';
import { ZodError } from 'zod';

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
            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Some provided field is not allowed',
                });
            }

            await updateUserSchema.parseAsync(params);

            const updatedUser = await this.updateUserUseCase.execute(
                userId,
                params,
            );

            return ok(updatedUser);
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.errors[0].message,
                });
            }

            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message });
            }
            console.error(error);

            return serverError;
        }
    }
}
