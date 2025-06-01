import { InvalidPasswordError, UserNotFoundError } from '../../Errors/user.js';
import bcrypt from 'bcrypt';

export class LoginUserUseCase {
    constructor(getUserByEmailRepository) {
        this.getUserByEmailRepository = getUserByEmailRepository;
    }

    async execute({ email, password }) {
        const user = await this.getUserByEmailRepository.execute(email);

        if (!user) {
            throw new UserNotFoundError();
        }
        // Verify password
        const isPasswordValid = bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new InvalidPasswordError();
        }
    }
}
