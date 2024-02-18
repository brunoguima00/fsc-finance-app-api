import { prisma } from '../../../../prisma/prisma.js';

export class PostgresGetUserByEmailRepository {
    async execute(email) {
        const user = await prisma.users.findUnique({
            where: {
                email,
            },
        });
        return user;
    }
}
