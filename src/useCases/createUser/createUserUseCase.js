import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { PostgresCreateUserRepository } from '../../repositories/postgres/user/createUserRepository.js';
import { PostgresGetUserByEmailRepository } from '../../repositories/postgres/user/getUserByEmail.js';
import { EmailAlreadyInUseError } from '../../Errors/user.js';

export class CreateUserUseCase {
    async execute(createUserParams) {
        const postgresGetUserByEmailRepository =
            new PostgresGetUserByEmailRepository();

        const userAlreadyExists =
            await postgresGetUserByEmailRepository.execute(
                createUserParams.email,
            );

        if (userAlreadyExists) {
            throw new EmailAlreadyInUseError(createUserParams.email);
        }

        // Gerar ID do usuário
        const userId = uuidv4();
        // Criptografar a senha do usuário
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

        // Inserir Usuário no database
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        };

        // Chamar o repositório
        const postgresCreateUserRepository = new PostgresCreateUserRepository();

        const createdUser = await postgresCreateUserRepository.execute(user);

        return createdUser;
    }
}
