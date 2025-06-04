import { CreateUserController } from './createUserController.js';

describe('Create User Controller', () => {
    class CreateUserUseCaseStub {
        execute(user) {
            return user;
        }
    }
    // Arrange
    it('should create an user', async () => {
        const createUserUseCase = new CreateUserUseCaseStub();

        const createUserController = new CreateUserController(
            createUserUseCase,
        );

        const httpRequest = {
            body: {
                firstName: 'Bruno',
                lastName: 'Soares',
                email: 'bruno@bruno.com.br',
                password: '1234456789',
            },
        };

        // Act

        const result = await createUserController.execute(httpRequest);

        // Assert

        expect(result.statusCode).toBe(201);
        expect(result.body).toEqual(httpRequest.body);
    });

    it('should return 400 if firstName is not provided', async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCaseStub();

        const createUserController = new CreateUserController(
            createUserUseCase,
        );

        const httpRequest = {
            body: {
                lastName: 'Soares',
                email: 'bruno@bruno.com.br',
                password: '1234456789',
            },
        };
        // Act
        const result = await createUserController.execute(httpRequest);

        // Assert
        expect(result.statusCode).toBe(400);
    });

    it('should return 400 if lastName is not provided', async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCaseStub();

        const createUserController = new CreateUserController(
            createUserUseCase,
        );

        const httpRequest = {
            body: {
                firstName: 'Bruno',
                email: '',
                password: '1234456789',
            },
        };
        // Act
        const retult = await createUserController.execute(httpRequest);

        // Assert
        expect(retult.statusCode).toBe(400);
    });

    it('should return 400 if email is not provided', async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCaseStub();

        const createUserController = new CreateUserController(
            createUserUseCase,
        );

        const httpRequest = {
            body: {
                firstName: 'Bruno',
                lastName: 'Soares',
                password: '1234456789',
            },
        };
        // Act
        const result = await createUserController.execute(httpRequest);
        // Assert
        expect(result.statusCode).toBe(400);
    });

    it('should return 400 if password is not provided', async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCaseStub();

        const createUserController = new CreateUserController(
            createUserUseCase,
        );

        const httpRequest = {
            body: {
                firstName: 'Bruno',
                lastName: 'Soares',
                email: '',
            },
        };
        // Act
        const result = await createUserController.execute(httpRequest);

        // Assert
        expect(result.statusCode).toBe(400);
    });

    it('should return 400 if email is not valid', async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCaseStub();
        const createUserController = new CreateUserController(
            createUserUseCase,
        );

        const httpRequest = {
            body: {
                firstName: 'Bruno',
                lastName: 'Soares',
                email: 'bruno',
                password: '1234456789',
            },
        };
        // Act
        const result = await createUserController.execute(httpRequest);

        // Assert
        expect(result.statusCode).toBe(400);
    });
});
