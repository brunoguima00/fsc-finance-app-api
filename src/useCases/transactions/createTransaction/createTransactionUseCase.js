import { UserNotFoundError } from '../../../Errors/user.js';
import { v4 as uuidv4 } from 'uuid';

export class CreateTransactionUseCase {
    constructor(createTransactionRepository, getUserByIdRepository) {
        this.createTransactionRepository = createTransactionRepository;
        this.getUserByIdRepository = getUserByIdRepository;
    }
    async execute(createTransactionParams) {
        // Validar se o usuário existe

        const userId = createTransactionParams.userId;
        const user = await this.getUserByIdRepository.execute(userId);

        if (!user) {
            throw new UserNotFoundError(userId);
        }

        const transactionId = uuidv4();

        const transaction = await this.createTransactionRepository.execute({
            ...createTransactionParams,
            id: transactionId,
        });
        return transaction;
    }
}
