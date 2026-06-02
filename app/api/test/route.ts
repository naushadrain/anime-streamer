// app/api/test/route.ts

import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET() {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [rows] = await connection.execute("SELECT 1 + 1 AS result");

    return NextResponse.json({
      status: true,
      message: "Database connection successful",
      env_check: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password_loaded: Boolean(process.env.DB_PASSWORD),
        password_length: process.env.DB_PASSWORD?.length,
      },
      data: rows,
    });
  } catch (error: unknown) {
    let exactError = "Unknown database error";

    if (error instanceof Error) {
      exactError = error.message;
    }

    return NextResponse.json(
      {
        status: false,
        message: "Database connection failed",
        error: exactError,
      },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}