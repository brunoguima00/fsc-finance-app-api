import 'dotenv/config.js';
import express from 'express';
import { CreateUserController } from './src/controllers/createUser/createUserController.js';
import { GetUserByIdController } from './src/controllers/getUserById/getUserByIdController.js';
import { UpdateUserController } from './src/controllers/updateUser/updateUserController.js';
import { DeleteUserController } from './src/controllers/deleteUser/deleteUserController.js';
import { PostgresGetUserByIdRepository } from './src/repositories/postgres/user/getUserByIdRepository.js';
import { GetUserByIdUseCase } from './src/useCases/getUserById/getUserByIdUseCase.js';
import { PostgresDeleteUserRepository } from './src/repositories/postgres/user/deleteUserRepository.js';
import { DeleteUserUseCase } from './src/useCases/deleteUserUseCase/deleteUserUseCase.js';

const app = express();

app.use(express.json());

app.get('/api/users/:userId', async (request, response) => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository();

    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);

    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

    const { statusCode, body } = await getUserByIdController.execute(request);

    response.status(statusCode).send(body);
});

app.post('/api/users', async (request, response) => {
    const createUserController = new CreateUserController();

    const { statusCode, body } = await createUserController.execute(request);

    response.status(statusCode).json(body);
});

app.patch('/api/users/:userId', async (request, response) => {
    const updateUserController = new UpdateUserController();

    const { statusCode, body } = await updateUserController.execute(request);

    response.status(statusCode).send(body);
});

app.delete('/api/users/:userId', async (request, response) => {
    const deleteUserRepository = new PostgresDeleteUserRepository();
    const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository);
    const deleteUserController = new DeleteUserController(deleteUserUseCase);

    const { statusCode, body } = await deleteUserController.execute(request);

    response.status(statusCode).send(body);
});

app.listen(process.env.PORT, () =>
    console.log(`listening on port ${process.env.PORT}`),
);
