import {
    EmailAlreadyInUseError,
    UserNotFoundError,
} from '../../../Errors/user.js';
import {
    invalidIdResponse,
    badRequest,
    serverError,
    ok,
    checkIfIdIsValid,
    userNotFoundResponse,
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

            const isIdValid = checkIfIdIsValid(userId);

            if (!isIdValid) {
                return invalidIdResponse();
            }

            const params = httpRequest.body;

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

            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse();
            }

            console.error(error);
            return serverError();
        }
    }
}
