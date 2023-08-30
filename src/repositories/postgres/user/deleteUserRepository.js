import { PostgresHelper } from '../../../database/postgres/helper.js';

export class PostgresDeleteUserRepository {
    async execute(userId) {
        const user = await PostgresHelper.query(
            'DELETE FROM users WHERE id=$1 RETURNING *',
            [userId],
        );
        return user[0];
    }
}
