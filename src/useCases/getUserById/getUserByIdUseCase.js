import { PostgresGetUserByIdRepository } from '../../repositories/postgres/user/getUserByIdRepository';

export class GetUserByIdUseCase {
    async execute(userId) {
        const getUserByIdRepository = new PostgresGetUserByIdRepository();
        const user = await getUserByIdRepository(userId);
        return user;
    }
}
