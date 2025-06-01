import { Prisma } from '@prisma/client';
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

        const _totalEarnings = totalEarnings || new Prisma.Decimal(0);
        const _totalExpenses = totalExpenses || new Prisma.Decimal(0);
        const _totalinvestments = totalinvestments || new Prisma.Decimal(0);

        const balance = new Prisma.Decimal(
            _totalEarnings - _totalExpenses - _totalinvestments,
        );

        return {
            earnings: _totalEarnings,
            expenses: _totalExpenses,
            investments: _totalinvestments,
            balance: balance,
        };
    }
}
