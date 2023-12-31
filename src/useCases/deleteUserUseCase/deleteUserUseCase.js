import { PostgresDeleteUserRepository } from '../../repositories/postgres/user/deleteUserRepository.js';

export class DeleteUserUseCase {
    async execute(userId) {
        const postgresDeleteUserRepository = new PostgresDeleteUserRepository();

        const user = await postgresDeleteUserRepository.execute(userId);

        return user;
    }
}
