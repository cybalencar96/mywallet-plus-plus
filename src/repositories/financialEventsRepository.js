import connection from "../database.js";

async function insert({userId, value, type}) {
    return connection.query(
        `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3) RETURNING *`,
        [userId, value, type]
    );
}

async function get(filters = {}) {
    const {
        userId
    } = filters;

    const events = await connection.query(
        `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
        [userId]
    );

    return events.rows;
}

export {
    insert,
    get,
}