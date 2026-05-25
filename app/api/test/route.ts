import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const result = await db.query(`
      SELECT 
        NOW() AS server_time,
        current_database() AS database_name,
        current_user AS database_user
    `);

    return NextResponse.json(
      {
        status: true,
        message: "Database connected successfully.",
        data: result.rows[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database connection failed:", error);

    return NextResponse.json(
      {
        status: false,
        message: "Database connection failed.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}