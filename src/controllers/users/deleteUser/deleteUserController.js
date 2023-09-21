import validator from 'validator';
import {
    invalidIdResponse,
    userNotFoundResponse,
    ok,
    serverError,
} from '../../helpers/index.js';

export class DeleteUserController {
    constructor(deleteUserUseCase) {
        this.deleteUserByIdUseCase = deleteUserUseCase;
    }
    async execute(httpRequest) {
        try {
            const isIdValid = validator.isUUID(httpRequest.params.userId);

            if (!isIdValid) {
                return invalidIdResponse();
            }

            const deletedUser = await this.deleteUserByIdUseCase.execute(
                httpRequest.params.userId,
            );

            if (!deletedUser) {
                return userNotFoundResponse();
            }

            return ok(deletedUser);
        } catch (error) {
            console.error(error);
            return serverError();
        }
    }
}
