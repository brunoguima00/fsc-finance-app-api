import { prisma } from '../../../../prisma/prisma.js';

export class PostgresGetUserByIdRepository {
    async execute(userId) {
        const user = await prisma.users.findUnique({
            where: {
                id: userId,
            },
        });

        return user;
    }
}
