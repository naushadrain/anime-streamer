// app/api/auth/login/route.ts

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { RowDataPacket } from "mysql2";

interface UserRow extends RowDataPacket {
  id: string;
  name: string | null;
  email: string;
  password: string | null;
  roleId: string | null;
  roleName: string | null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          status: false,
          message: "Email and password are required.",
        },
        { status: 400 }
      );
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return NextResponse.json(
        {
          status: false,
          message: "JWT secret is missing in environment file.",
        },
        { status: 500 }
      );
    }

    const [users] = await db.execute<UserRow[]>(
      `
      SELECT 
        users.id,
        users.name,
        users.email,
        users.password,
        users.roleId,
        roles.name AS roleName
      FROM users
      LEFT JOIN roles ON users.roleId = roles.id
      WHERE users.email = ?
      LIMIT 1
      `,
      [email]
    );

    const user = users[0];

    if (!user) {
      return NextResponse.json(
        {
          status: false,
          message: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    if (!user.password) {
      return NextResponse.json(
        {
          status: false,
          message: "Password is not set for this user.",
        },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          status: false,
          message: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    const tokenPayload = {
      id: user.id,
      email: user.email,
      roleId: user.roleId,
      role: user.roleName,
    };

    const token = jwt.sign(tokenPayload, jwtSecret, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });

    return NextResponse.json({
      status: true,
      message: "Login successful.",
      token_type: "Bearer",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId,
        role: user.roleName,
      },
    });
  } catch (error: unknown) {
    let exactError = "Unknown server error";

    if (error instanceof Error) {
      exactError = error.message;
    }

    return NextResponse.json(
      {
        status: false,
        message: "Login failed.",
        error: exactError,
      },
      { status: 500 }
    );
  }
}