import { PostgresHelper } from '../../../database/postgres/helper.js';
export class PostgresGetTransactionsByUserIdRepository {
    async execute(userId) {
        const transactions = await PostgresHelper.query(
            'SELECT * FROM transactions WHERE userId = $1',
            [userId],
        );
        return transactions;
    }
}
