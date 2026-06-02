// lib/db.ts
import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
export async function dbConnection() {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
}
// // lib/db.ts

// import { Pool } from "pg";

// const globalForPg = globalThis as unknown as {
//   pgPool: Pool | undefined;
// };

// export const db =
//   globalForPg.pgPool ??
//   new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: false,
//   });

// if (process.env.NODE_ENV !== "production") {
//   globalForPg.pgPool = db;
// }
