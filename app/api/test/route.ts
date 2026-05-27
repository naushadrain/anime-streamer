// app/api/test/route.ts

import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [rows] = await connection.execute("SELECT 1 + 1 AS result");

    await connection.end();

    return NextResponse.json({
      status: true,
      message: "Database connection successful",
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
        full_error: error,
      },
      { status: 500 }
    );
  }
}