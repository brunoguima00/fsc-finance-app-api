import { DeleteUserController } from './deleteUserController';
import { faker } from '@faker-js/faker';

describe('DeleteUserControle', () => {
    class DeleteUserUseCaseStub {
        execute() {
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
        const deleteUserUseCase = new DeleteUserUseCaseStub();
        const sut = new DeleteUserController(deleteUserUseCase);

        return { deleteUserUseCase, sut };
    };

    const httpRequest = {
        params: {
            userId: faker.string.uuid(),
        },
    };

    it('should return 200 if user is deleted', async () => {
        //  Arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute(httpRequest);

        //assert
        expect(result.statusCode).toBe(200);
    });

    it('should return 400 id is invalid', async () => {
        //Arrange
        const { sut } = makeSut();

        //act
        const result = await sut.execute({ params: { userId: 'invalid_id' } });

        //assert
        expect(result.statusCode).toBe(400);
    });
});
