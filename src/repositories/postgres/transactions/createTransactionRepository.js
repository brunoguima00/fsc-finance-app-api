import { prisma } from '../../../../prisma/prisma.js';

export class PostgresCreateTransactionRepository {
    async execute(createTransactionParams) {
        const createdTransaction = await prisma.transactions.create({
            data: createTransactionParams,
        });

        return createdTransaction;
    }
}
