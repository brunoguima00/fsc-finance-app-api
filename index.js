import 'dotenv/config.js';
import express from 'express';
import { PostgresHelper } from './src/database/postgres/helper.js';

const app = express();

app.get('/', async (req, res) => {
    const results = await PostgresHelper.query('SELECT * FROM users;');
    return res.send(JSON.stringify(results));
});

app.listen(3030, () => console.log('listening on port 3030'));
