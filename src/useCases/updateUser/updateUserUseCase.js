import { EmailAlreadyInUseError } from '../../Errors/user.js';
import bcrypt from 'bcrypt';

export class UpdateUserUseCase {
    constructor(getUserByEmailRepository, updateUserRepository) {
        this.getUserByEmailRepository = getUserByEmailRepository;
        this.updateUserRepository = updateUserRepository;
    }
    async execute(userId, updateUserParams) {
        // Se o email estiver sendo atualizado, verificar se ele está em uso
        if (updateUserParams.email) {
            const userProvidedEmail =
                await this.getUserByEmailRepository.execute(
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

        const updatedUser = await this.updateUserRepository.execute(
            userId,
            updateUserParams,
        );

        return updatedUser;
    }
}
