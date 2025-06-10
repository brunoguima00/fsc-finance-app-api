import { UpdateUserController } from './updateUserController';
import { faker } from '@faker-js/faker';

describe('UpdateUserController', () => {
    class UpateUserUseCaseStub {
        async execute(user) {
            return user;
        }
    }

    const makeSut = () => {
        const updateUserUseCase = new UpateUserUseCaseStub();
        const sut = new UpdateUserController(updateUserUseCase);

        return { sut, updateUserUseCase };
    };

    const httpRequest = {
        params: {
            userId: faker.string.uuid(),
        },
        body: {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({
                length: 7,
            }),
        },
    };

    // it('should return 200 when updating a user successfully', async () => {
    //     // arrange
    //     const { sut } = makeSut();

    //     // act
    //     const response = await sut.execute(httpRequest);

    //     // assert
    //     expect(response.statusCode).toBe(200);
    // });

    it('should return 400 when invalid email is provided', async () => {
        // arrange
        const { sut } = makeSut();

        // Act
        const result = await sut.execute({
            params: httpRequest.params,
            body: {
                ...httpRequest.body,
                email: 'invalid-email',
            },
        });

        // Assert
        expect(result.statusCode).toBe(400);
    });
});
