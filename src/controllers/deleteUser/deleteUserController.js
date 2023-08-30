import validator from 'validator';
import {
    invalidIdResponse,
    userNotFoundResponse,
    ok,
    serverError,
} from '../helpers/index.js';
import { DeleteUserUseCase } from '../../useCases/deleteUserUseCase/deleteUserUseCase.js';

export class DeleteUserController {
    async execute(httpRequest) {
        try {
            const isIdValid = validator.isUUID(httpRequest.params.userId);

            if (!isIdValid) {
                return invalidIdResponse();
            }

            const deleteUserByIdUseCase = new DeleteUserUseCase();
            const deletedUser = await deleteUserByIdUseCase.execute(
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
