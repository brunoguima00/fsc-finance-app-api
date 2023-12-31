import { CreateUserUseCase } from '../../useCases/createUser/createUserUseCase.js';
import { EmailAlreadyInUseError } from '../../Errors/user.js';
import {
    invalidPasswordResponse,
    emailIsAlreadyUseResponse,
    checkIfPasswordIsValid,
    checkIfEmailIsValid,
    badRequest,
    created,
    serverError,
} from '../helpers/index.js';

export class CreateUserController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            // validar a requisição(campos obrigatórios, tamanho de senha, se o email é valido)
            const requiredFields = [
                'firstName',
                'lastName',
                'email',
                'password',
            ];
            // Verificar pq esse for usa of ao invés de in
            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length == 0) {
                    return badRequest({ message: `Missing param: ${field}` });
                }
            }

            // Verify if password has more than 6 characters
            const passwordIsValid = checkIfPasswordIsValid(params.password);

            if (!passwordIsValid) {
                return invalidPasswordResponse();
            }
            // Validar o email
            const emailIsValid = checkIfEmailIsValid(params.email);

            if (!emailIsValid) {
                return emailIsAlreadyUseResponse();
            }

            // chamar o use case
            const createUserUseCase = new CreateUserUseCase();

            const createdUser = await createUserUseCase.execute(params);

            // retornar a resposta para o usuário (status code or body)

            return created(createdUser);
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message });
            }
            console.error(error);

            return serverError;
        }
    }
}
