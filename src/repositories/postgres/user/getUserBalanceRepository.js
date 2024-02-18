import { prisma } from '../../../../prisma/prisma.js';
export class PostgresGetUserBalanceRepository {
    async execute(userId) {
        const {
            _sum: { amount: totalExpenses },
        } = await prisma.transactions.aggregate({
            where: {
                userid: userId,
                type: 'EXPENSE',
            },
            _sum: {
                amount: true,
            },
        });
        const {
            _sum: { amount: totalEarnings },
        } = await prisma.transactions.aggregate({
            where: {
                userid: userId,
                type: 'EARNING',
            },
            _sum: {
                amount: true,
            },
        });

        const {
            _sum: { amount: totalinvestments },
        } = await prisma.transactions.aggregate({
            where: {
                userid: userId,
                type: 'INVESTMENT',
            },
            _sum: {
                amount: true,
            },
        });

        const balance = totalEarnings - totalExpenses - totalinvestments;

        return {
            earnings: totalEarnings,
            expenses: totalExpenses,
            investments: totalinvestments,
            balance: balance,
        };
    }
}
