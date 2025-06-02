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
            createUserUseCase
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
        expect(result.body).not.toBeUndefined();
    });
});
