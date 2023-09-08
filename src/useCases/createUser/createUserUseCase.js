import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { EmailAlreadyInUseError } from '../../Errors/user.js';

export class CreateUserUseCase {
    constructor(getUserByEmailRepository, createUserRepository) {
        this.getUserByEmailRepository = getUserByEmailRepository;
        this.createUserRepository = createUserRepository;
    }
    async execute(createUserParams) {
        const userAlreadyExists = await this.getUserByEmailRepository.execute(
            createUserParams.email,
        );

        if (userAlreadyExists) {
            throw new EmailAlreadyInUseError(createUserParams.email);
        }

        // Gerar ID do usuário
        const userId = uuidv4();
        // Criptografar a senha do usuário
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

        // Inserir Usuário no database
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        };

        // Chamar o repositório

        const createdUser = await this.createUserRepository.execute(user);

        return createdUser;
    }
}
