import { prisma } from '../../../../prisma/prisma.js';

export class PostgresCreateUserRepository {
    async execute(createUserParams) {
        const user = await prisma.users.create({
            data: {
                id: createUserParams.id,
                firstname: createUserParams.firstName,
                lastname: createUserParams.lastName,
                email: createUserParams.email,
                password: createUserParams.password,
            },
        });

        return user;
    }
}
