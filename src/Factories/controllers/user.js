import { GetUserByIdController } from '../../controllers/getUserById/getUserByIdController.js';
import { PostgresGetUserByIdRepository } from '../../repositories/postgres/user/getUserByIdRepository.js';
import { GetUserByIdUseCase } from '../../useCases/users/getUserById/getUserByIdUseCase.js';
import { PostgresGetUserByEmailRepository } from '../../repositories/postgres/user/getUserByEmail.js';
import { PostgresCreateUserRepository } from '../../repositories/postgres/user/createUserRepository.js';
import { CreateUserUseCase } from '../../useCases/users/createUser/createUserUseCase.js';
import { CreateUserController } from '../../controllers/createUser/createUserController.js';
import { PostgresUpdateUserRepository } from '../../repositories/postgres/user/updateUserRepository.js';
import { UpdateUserUseCase } from '../../useCases/users/updateUser/updateUserUseCase.js';
import { UpdateUserController } from '../../controllers/updateUser/updateUserController.js';
import { PostgresDeleteUserRepository } from '../../repositories/postgres/user/deleteUserRepository.js';
import { DeleteUserUseCase } from '../../useCases/users/deleteUserUseCase/deleteUserUseCase.js';
import { DeleteUserController } from '../../controllers/deleteUser/deleteUserController.js';

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
