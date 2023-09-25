import { UserNotFoundError } from '../../../Errors/user.js';
export class GetTransactionByUserIdUseCase {
    constructor(getTransactionByUserIdRepository, getUserByIdRepository) {
        this.getTransactionByUserIdRepository =
            getTransactionByUserIdRepository;
        this.getUserByIdRepository = getUserByIdRepository;
    }
    async execute(params) {
        const userId = params.userId;

        const user = await this.getUserByIdRepository(userId);

        if (!user) {
            throw new UserNotFoundError();
        }
        const transactions =
            await this.getTransactionByUserIdRepository.execute(user);

        return transactions;
    }
}
