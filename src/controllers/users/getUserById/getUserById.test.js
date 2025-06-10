import { faker } from '@faker-js/faker';
import { GetUserBalanceController } from '../getUserBalance/getUserBalanceController';

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
        const sut = new GetUserBalanceController(getUserByIdUseCase);
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
});
