import pg from "pg";

const { Pool } = pg;

const connection = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
});

export default connection;
