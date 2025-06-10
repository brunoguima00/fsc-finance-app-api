import { faker } from '@faker-js/faker';
import { GetUserByIdController } from './getUserByIdController';

describe(`GetUserByIdController`, () => {
    class GetUserByIdUseCaseStub {
        async execute() {
            return {
                id: faker.string.uuid(),
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({
                    length: 7,
                }),
            };
        }
    }
    const makeSut = () => {
        const getUserByIdUseCase = new GetUserByIdUseCaseStub();
        const sut = new GetUserByIdController(getUserByIdUseCase);
        return { sut, getUserByIdUseCase };
    };

    it('should return 200 if user is found', async () => {
        // Arrange
        const { sut } = makeSut();

        // Act
        const httpResponse = await sut.execute({
            params: { userId: faker.string.uuid() },
        });

        // Assert
        expect(httpResponse.statusCode).toBe(200);
    });

    it('should return 400 if userId is invalid', async () => {
        // Arrange
        const { sut } = makeSut();

        // Act
        const result = await sut.execute({
            params: { userId: 'invalid_id' },
        });

        // Assert
        expect(result.statusCode).toBe(400);
    });

    it('should return 404 if user is not found', async () => {
        //Arrange
        const { sut, getUserByIdUseCase } = makeSut();
        jest.spyOn(getUserByIdUseCase, 'execute').mockResolvedValue(null);

        //Act
        const result = await sut.execute({
            params: { userId: faker.string.uuid() },
        });

        //Assert
        expect(result.statusCode).toBe(404);
    });

    it('should return 500 if getUserByIdUseCase throws', async () => {
        // Arrange
        const { sut, getUserByIdUseCase } = makeSut();
        jest.spyOn(getUserByIdUseCase, 'execute').mockRejectedValueOnce(
            new Error(),
        );

        // Act
        const result = await sut.execute({
            params: { userId: faker.string.uuid() },
        });

        // Assert
        expect(result.statusCode).toBe(500);
    });
});
