import { PostgresCreateTransactionRepository } from '../../repositories/postgres/transactions/createTransactionRepository.js';
import { CreateTransactionUseCase } from '../../useCases/transactions/createTransaction/createTransactionUseCase.js';
import { CreateTransactionController } from '../../controllers/transactions/createTransaction/createTransactionController.js';
import { PostgresGetUserByIdRepository } from '../../repositories/postgres/user/getUserByIdRepository.js';
import { PostgresGetTransactionsByUserIdRepository } from '../../repositories/postgres/transactions/getTransactionsByUserIdRepository.js';
import { GetTransactionsByUserIdUseCase } from '../../useCases/transactions/getTransactionsByUserId/getTransactionsByUserIdUseCase.js';
import { GetTransactionsByUserIdController } from '../../controllers/transactions/getTransactionsByUserIdController/getTransactionsByUserIdController.js';
import { PostgresDeleteTransactionRepository } from '../../repositories/postgres/transactions/deleteTransactionRepository.js';
import { DeleteTransactionUseCase } from '../../useCases/transactions/deleteTransaction/deleteTransactionUseCase.js';
import { DeleteTransactionController } from '../../controllers/transactions/deleteTransaction/deleteTransactionController.js';
import { PostgresUpdateTransactionRepository } from '../../repositories/postgres/transactions/updateTransactionRepository.js';
import { UpdateTransactionUseCase } from '../../useCases/transactions/updateTransactions/updateTransactionsUseCase.js';
import { UpdateTransactionController } from '../../controllers/transactions/updateTransaction/updateTransactionController.js';

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

export const makeDeleteTransactionController = () => {
    const deleteTransactionRepository =
        new PostgresDeleteTransactionRepository();

    const deleteTransactionUseCase = new DeleteTransactionUseCase(
        deleteTransactionRepository,
    );

    const deleteTransactionController = new DeleteTransactionController(
        deleteTransactionUseCase,
    );

    return deleteTransactionController;
};

export const makeUpdateTransactionController = () => {
    const updateTransactionRepository =
        new PostgresUpdateTransactionRepository();

    const updateTransactionUseCase = new UpdateTransactionUseCase(
        updateTransactionRepository,
    );

    const updateTransactionController = new UpdateTransactionController(
        updateTransactionUseCase,
    );

    return updateTransactionController;
};
