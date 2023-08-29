import { CreateUserUseCase } from '../../useCases/createUser/createUserUseCase.js';
import validator from 'validator';
import { badRequest, created, serverError } from '../helper.js';
import { EmailAlreadyInUseError } from '../../Errors/user.js';

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
            const passwordIsNotValid = params.password.length < 6;

            if (passwordIsNotValid) {
                return badRequest({
                    message: 'Password must be at least 6 characters',
                });
            }
            // Validar o email
            const emailIsValid = validator.isEmail(params.email);

            if (!emailIsValid) {
                return badRequest({
                    message: 'Invalid e-mail. Please provide a valid one',
                });
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
