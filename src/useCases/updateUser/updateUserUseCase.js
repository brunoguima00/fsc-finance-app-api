import { PostgresUpdateUserRepository } from '../../repositories/postgres/user/updateUserRepository.js';
import { EmailAlreadyInUseError } from '../../Errors/user.js';
import { PostgresGetUserByEmailRepository } from '../../repositories/postgres/user/getUserByEmail.js';
import bcrypt from 'bcrypt';

export class UpdateUserUseCase {
    async execute(userId, updateUserParams) {
        // Se o email estiver sendo atualizado, verificar se ele está em uso
        if (updateUserParams.email) {
            const postgresGetUserByEmailRepository =
                new PostgresGetUserByEmailRepository();

            const userProvidedEmail =
                await postgresGetUserByEmailRepository.execute(
                    updateUserParams.email,
                );

            if (userProvidedEmail && userProvidedEmail.id != userId) {
                throw new EmailAlreadyInUseError(updateUserParams.email);
            }
        }
        // Se a senha estiver sendo atualizada, criptografa-la

        const user = {
            ...updateUserParams,
        };

        if (updateUserParams.password) {
            const hashedPassword = await bcrypt.hash(
                updateUserParams.password,
                10,
            );

            user.password = hashedPassword;
        }

        // chamar o repository para atualizar o usuário

        const postgresUpdateUserRepository = new PostgresUpdateUserRepository();

        const updatedUser = await postgresUpdateUserRepository.execute(
            userId,
            updateUserParams,
        );

        return updatedUser;
    }
}
