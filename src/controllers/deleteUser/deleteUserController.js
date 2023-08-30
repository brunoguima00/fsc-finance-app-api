import validator from 'validator';
import {
    invalidIdResponse,
    notFound,
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
                return notFound({
                    message: 'User not found',
                });
            }

            return ok(deletedUser);
        } catch (error) {
            console.error(error);
            return serverError();
        }
    }
}
