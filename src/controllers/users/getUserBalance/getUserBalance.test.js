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

    it('should return 400 if userId is invalid', async () => {
        //Arrange
        const { sut } = makeSut();

        //Act
        const httpResponse = await sut.execute({
            params: { userId: 'invalid_id' },
        });

        //Assert
        expect(httpResponse.statusCode).toBe(400);
    });
    it('should return 500 if getUserBalanceUseCase throws', async () => {
        //Arrange
        const { sut, getUserBalanceUseCase } = makeSut();

        jest.spyOn(getUserBalanceUseCase, 'execute').mockRejectedValueOnce(
            () => {
                throw new Error();
            },
        );

        //Act
        const httpResponse = await sut.execute(httpRequest);

        //Assert
        expect(httpResponse.statusCode).toBe(500);
    });
});
