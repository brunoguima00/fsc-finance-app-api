import { PostgresGetUserByIdRepository } from '../../repositories/postgres/user/getUserByIdRepository.js';
import { PostgresGetUserByEmailRepository } from '../../repositories/postgres/user/getUserByEmail.js';
import { PostgresCreateUserRepository } from '../../repositories/postgres/user/createUserRepository.js';
import { PostgresUpdateUserRepository } from '../../repositories/postgres/user/updateUserRepository.js';
import { PostgresDeleteUserRepository } from '../../repositories/postgres/user/deleteUserRepository.js';
import { GetUserByIdUseCase } from '../../useCases/users/getUserById/getUserByIdUseCase.js';
import { CreateUserUseCase } from '../../useCases/users/createUser/createUserUseCase.js';
import { UpdateUserUseCase } from '../../useCases/users/updateUser/updateUserUseCase.js';
import { DeleteUserUseCase } from '../../useCases/users/deleteUserUseCase/deleteUserUseCase.js';
import { GetUserByIdController } from '../../controllers/users/getUserById/getUserByIdController.js';
import { CreateUserController } from '../../controllers/users/createUser/createUserController.js';
import { UpdateUserController } from '../../controllers/users/updateUser/updateUserController.js';
import { DeleteUserController } from '../../controllers/users/deleteUser/deleteUserController.js';
import { PostgresGetUserBalanceRepository } from '../../repositories/postgres/user/getUserBalanceRepository.js';
import { GetUserBalanceUseCase } from '../../useCases/users/getUserBalanceUseCase/getUserBalanceUseCase.js';
import { GetUserBalanceController } from '../../controllers/users/getUserBalance/getUserBalanceController.js';

export const makeGetUserByIdController = () => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository();

    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);

    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

    return getUserByIdController;
};

export const makeCreateUserController = () => {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();

    const createUserRepository = new PostgresCreateUserRepository();

    const createUserUseCase = new CreateUserUseCase(
        getUserByEmailRepository,
        createUserRepository,
    );

    const createUserController = new CreateUserController(createUserUseCase);

    return createUserController;
};

export const makeUpdateUserController = () => {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();

    const updateUserRepository = new PostgresUpdateUserRepository();

    const updateUserUseCase = new UpdateUserUseCase(
        getUserByEmailRepository,
        updateUserRepository,
    );
    const updateUserController = new UpdateUserController(updateUserUseCase);

    return updateUserController;
};

export const makeDeleteUserController = () => {
    const deleteUserRepository = new PostgresDeleteUserRepository();
    const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository);
    const deleteUserController = new DeleteUserController(deleteUserUseCase);

    return deleteUserController;
};

export const makeGetUserBalanceController = () => {
    const getUserBalanceRepository = new PostgresGetUserBalanceRepository();
    const getUserById = new PostgresGetUserByIdRepository();

    const getUserBalanceUseCase = new GetUserBalanceUseCase(
        getUserBalanceRepository,
        getUserById,
    );

    const getUserBalanceController = new GetUserBalanceController(
        getUserBalanceUseCase,
    );

    return getUserBalanceController;
};
