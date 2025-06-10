import { EmailAlreadyInUseError } from '../../../Errors/user.js';
import { CreateUserController } from './createUserController.js';
import { faker } from '@faker-js/faker';

describe('Create User Controller', () => {
    class CreateUserUseCaseStub {
        async execute(user) {
            return user;
        }
    }

    const makeSut = () => {
        const createUserUseCase = new CreateUserUseCaseStub();

        // sut  = suite under tests

        const sut = new CreateUserController(createUserUseCase);

        return { createUserUseCase, sut };
    };

    const httpRequest = {
        body: {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({
                length: 7,
            }),
        },
    };

    // Arrange
    it('should create an user', async () => {
        const { sut } = makeSut();

        // Act

        const result = await sut.execute(httpRequest);

        // Assert

        expect(result.statusCode).toBe(201);
        expect(result.body).toEqual(httpRequest.body);
    });

    it('should return 400 if firstName is not provided', async () => {
        // arrange
        const { sut } = makeSut();

        // Act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                firstName: undefined,
            },
        });

        // Assert
        expect(result.statusCode).toBe(400);
    });

    it('should return 400 if lastName is not provided', async () => {
        // arrange
        const { sut } = makeSut();

        // Act
        const retult = await sut.execute({
            body: {
                ...httpRequest.body,
                lastName: undefined,
            },
        });

        // Assert
        expect(retult.statusCode).toBe(400);
    });

    it('should return 400 if email is not provided', async () => {
        // arrange
        const { sut } = makeSut();

        // Act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                email: undefined,
            },
        });
        // Assert
        expect(result.statusCode).toBe(400);
    });

    it('should return 400 if password is not provided', async () => {
        // arrange
        const { sut } = makeSut();

        // Act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                password: undefined,
            },
        });

        // Assert
        expect(result.statusCode).toBe(400);
    });

    it('should return 400 if email is not valid', async () => {
        // arrange
        const { sut } = makeSut();
        // Act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                email: 'invalid_email',
            },
        });

        // Assert
        expect(result.statusCode).toBe(400);
    });

    it('should return 400 if password is less than 7 characters', async () => {
        // arrange
        const { sut } = makeSut();

        // Act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                password: faker.internet.password({
                    length: 4,
                }),
            },
        });

        // Assert

        expect(result.statusCode).toBe(400);
    });

    it('should call CreateUserUseCase with correct params', async () => {
        const { sut, createUserUseCase } = makeSut();

        const executeSpy = jest.spyOn(createUserUseCase, 'execute');

        //Act

        await sut.execute(httpRequest);

        //assert
        expect(executeSpy).toHaveBeenCalledWith(httpRequest.body);
    });

    it('should return 500 if CreateUserUseCaseThrows', async () => {
        //Arrange

        const { sut, createUserUseCase } = makeSut();

        jest.spyOn(createUserUseCase, 'execute').mockRejectedValueOnce(
            new Error(),
        );

        //act
        const result = await sut.execute(httpRequest);

        //assert
        expect(result.statusCode).toBe(500);
    });

    it('should return 400 id CreateUserUseCase throws EmailIsAlreadyInUseError', async () => {
        // Arrange
        const { sut, createUserUseCase } = makeSut();

        jest.spyOn(createUserUseCase, 'execute').mockRejectedValueOnce(
            new EmailAlreadyInUseError(httpRequest.body.email),
        );

        //Act
        const result = await sut.execute(httpRequest);
        // Assert
        expect(result.statusCode).toBe(400);
    });
});
