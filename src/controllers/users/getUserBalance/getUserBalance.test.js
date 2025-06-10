import { faker } from '@faker-js/faker';
import { GetUserBalanceController } from './getUserBalanceController';

describe('GetUserBalanceController', () => {
    class GetUserBalanceUseCaseStub {
        async execute() {
            return faker.number.int();
        }
    }
    const makeSut = () => {
        const getUserBalanceUseCase = new GetUserBalanceUseCaseStub();
        const sut = new GetUserBalanceController(getUserBalanceUseCase);

        return { sut, getUserBalanceUseCase };
    };

    const httpRequest = {
        params: {
            userId: faker.string.uuid(),
        },
    };

    it('should return 200 when getting user balance', async () => {
        //Arrange
        const { sut } = makeSut();

        //Act
        const httpResponse = await sut.execute(httpRequest);

        //Assert
        expect(httpResponse.statusCode).toBe(200);
    });
});
