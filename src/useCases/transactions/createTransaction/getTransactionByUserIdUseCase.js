import { userNotFoundResponse } from '../../../controllers/helpers/index.js';
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
            return userNotFoundResponse();
        }
        const transactions =
            await this.getTransactionByUserIdRepository.execute(user);
        return transactions;
    }
}
