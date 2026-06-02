import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { dbConnection } from "@/lib/db";

type UserRow = {
  id: string;
  name: string | null;
  email: string;
  password: string | null;
  roleId: string | null;
  role_name: string | null;
  role_display_name: string | null;
  status: number | null;
};

export async function POST(req: NextRequest) {
  let connection;

  try {
    const body = await req.json();

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          status: false,
          message: "Email and password are required",
        },
        { status: 400 }
      );
    }

    connection = await dbConnection();

    const [rows] = await connection.execute(
      `
      SELECT 
        users.id,
        users.name,
        users.email,
        users.password,
        users.roleId,
        roles.name AS role_name,
        roles.displayName AS role_display_name,
        roles.status
      FROM users
      LEFT JOIN roles ON roles.id = users.roleId
      WHERE users.email = ?
      LIMIT 1
      `,
      [email]
    );

    const users = rows as UserRow[];

    if (users.length === 0) {
      return NextResponse.json(
        {
          status: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    const user = users[0];

    if (!user.password) {
      return NextResponse.json(
        {
          status: false,
          message: "Password is not set for this account",
        },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          status: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return NextResponse.json(
        {
          status: false,
          message: "JWT secret is missing",
        },
        { status: 500 }
      );
    }

    const expiresIn = (process.env.JWT_EXPIRES_IN || "7d") as SignOptions["expiresIn"];

    const jwtOptions: SignOptions = {
      expiresIn,
    };

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        roleId: user.roleId,
      },
      jwtSecret as Secret,
      jwtOptions
    );

    await connection.execute(
      `
      UPDATE users
      SET access_token = ?
      WHERE id = ?
      `,
      [token, user.id]
    );

    return NextResponse.json(
      {
        status: true,
        message: "Login successful",
        token: token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          roleId: user.roleId,
          role: {
            name: user.role_name,
            displayName: user.role_display_name,
            status: user.status === 1,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    let exactError = "Unknown error";

    if (error instanceof Error) {
      exactError = error.message;
    }

    return NextResponse.json(
      {
        status: false,
        message: "Login failed",
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