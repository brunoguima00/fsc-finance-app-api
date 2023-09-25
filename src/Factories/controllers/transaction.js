import { PostgresCreateTransactionRepository } from '../../repositories/postgres/transactions/createTransactionRepository.js';
import { CreateTransactionUseCase } from '../../useCases/transactions/createTransaction/createTransactionUseCase.js';
import { CreateTransactionController } from '../../controllers/transactions/createTransaction/createTransactionController.js';
import { PostgresGetUserByIdRepository } from '../../repositories/postgres/user/getUserByIdRepository.js';
import { PostgresGetTransactionsByUserIdRepository } from '../../repositories/postgres/transactions/getTransactionsByUserIdRepository.js';
import { GetTransactionsByUserIdUseCase } from '../../useCases/transactions/createTransaction/getTransactionsByUserIdUseCase.js';
import { GetTransactionsByUserIdController } from '../../controllers/transactions/getTransactionsByUserIdController/getTransactionsByUserIdController.js';

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

export const makeGetTransactionsByUserIdController = () => {
    const getTransactionsByUserIdRepository =
        new PostgresGetTransactionsByUserIdRepository();

    const getUserByIdRepository = new PostgresGetUserByIdRepository();

    const getTransactionByUserIdUseCase = new GetTransactionsByUserIdUseCase(
        getTransactionsByUserIdRepository,
        getUserByIdRepository,
    );

    const getTransactionsByUserIdController =
        new GetTransactionsByUserIdController(getTransactionByUserIdUseCase);

    return getTransactionsByUserIdController;
};
