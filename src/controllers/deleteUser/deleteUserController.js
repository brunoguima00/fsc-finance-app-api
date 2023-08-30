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
            const user = await deleteUserByIdUseCase.execute(
                httpRequest.params.userId,
            );

            if (!user) {
                return notFound({
                    message: 'User not found',
                });
            }

            return ok(user);
        } catch (error) {
            console.error(error);
            return serverError();
        }
    }
}
