import connection from '../database.js';

async function get(filters = {}) {
    const {
        email,
    } = filters;

    let query = 'SELECT * FROM "users" WHERE 1=1 ';
    const params = [];

    if (email) {
        params.push(email);
        query += `AND email = $${params.length} `;

        const user = await connection.query(query, params);
        return user.rows[0];
    }

    const users = await connection.query(query, params);
    return users.rows;
}

function insert({name, email, hashedPassword}) {
    return connection.query(
        `INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3) RETURNING *`,
        [name, email, hashedPassword]
    );
}

export {
    get,
    insert,
}