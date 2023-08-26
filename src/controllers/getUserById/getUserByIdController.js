import { serverError, ok, badRequest, notFound } from '../helper.js';
import { GetUserByIdUseCase } from '../../useCases/getUserById/getUserByIdUseCase.js';
import validator from 'validator';

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const isIdValid = validator.isUUID(httpRequest.params.userId);

            if (!isIdValid) {
                return badRequest({ message: 'The provider id is invalid' });
            }
            const getUserByIdUseCase = new GetUserByIdUseCase();
            const user = await getUserByIdUseCase.execute(
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
