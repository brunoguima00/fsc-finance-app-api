import { PostgresHelper } from '../../../database/postgres/helper.js';

export class PostgresGetUserByIdRepository {
    async execute(userId) {
        const user = await PostgresHelper.query(
            'SELECT * FROM users WHERE id = $1',
            [userId.id],
        );
        return user[0];
    }
}
