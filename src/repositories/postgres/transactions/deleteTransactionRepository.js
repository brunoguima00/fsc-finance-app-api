import { prisma } from '../../../../prisma/prisma.js';

export class PostgresDeleteTransactionRepository {
    async execute(transactionId) {
        return await prisma.transactions.delete({
            where: {
                id: transactionId,
            },
        });
    }
}
