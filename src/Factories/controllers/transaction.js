import { PostgresCreateTransactionRepository } from '../../repositories/postgres/transactions/createTransactionRepository.js';
import { CreateTransactionUseCase } from '../../useCases/transactions/createTransaction/createTransactionUseCase.js';
import { CreateTransactionController } from '../../controllers/transactions/createTransaction/createTransactionController.js';
import { PostgresGetUserByIdRepository } from '../../repositories/postgres/user/getUserByIdRepository';
export const makeCreateTransactionController = () => {
    const createTransactionRepository =
        new PostgresCreateTransactionRepository();

    const getUserByIdRepository = new PostgresGetUserByIdRepository();

    const createTransactionUseCase = new CreateTransactionUseCase(
        createTransactionRepository,
        getUserByIdRepository,
    );

    const createTransactionController = new CreateTransactionController(
        createTransactionUseCase,
    );

    return createTransactionController;
};
