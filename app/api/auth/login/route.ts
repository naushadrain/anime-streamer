// app/api/auth/login/route.ts

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt, { type SignOptions } from "jsonwebtoken";
import { db } from "@/lib/db";
export const runtime = "nodejs";

type JwtUserPayload = {
    id: string;
    email: string;
    name: string | null;
    role: string | null;
};

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const email = body.email?.trim()?.toLowerCase();
        const password = body.password;

        if (!email || !password) {
            return NextResponse.json(
                {
                    status: false,
                    message: "Email and password are required.",
                },
                { status: 400 }
            );
        }

        const userResult = await db.query(
            `
      SELECT 
        u.id,
        u.name,
        u.email,
        u.password,
        u."roleId",
        r.id AS role_id,
        r.name AS role_name,
        r."displayName" AS role_display_name,
        r.description AS role_description,
        r.status AS role_status
      FROM users u
      LEFT JOIN roles r ON r.id = u."roleId"
      WHERE LOWER(u.email) = $1
      LIMIT 1
      `,
            [email]
        );

        if (userResult.rows.length === 0) {
            return NextResponse.json(
                {
                    status: false,
                    message: "Invalid email or password.",
                },
                { status: 401 }
            );
        }

        const user = userResult.rows[0];

        if (!user.password) {
            return NextResponse.json(
                {
                    status: false,
                    message: "Invalid email or password.",
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

        const permissionResult = await db.query(
            `
      SELECT 
        id,
        permission,
        module,
        "canView",
        "canCreate",
        "canEdit",
        "canDelete"
      FROM role_permissions
      WHERE "roleId" = $1
      ORDER BY module ASC
      `,
            [user.roleId]
        );

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

        const tokenPayload: JwtUserPayload = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role_name,
        };

        const expiresIn = (process.env.JWT_EXPIRES_IN || "7d") as SignOptions["expiresIn"];

        const token = jwt.sign(tokenPayload, jwtSecret, {
            expiresIn,
        });

        return NextResponse.json(
            {
                status: true,
                message: "Login successful.",
                token,
                token_type: "Bearer",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role_id
                        ? {
                            id: user.role_id,
                            name: user.role_name,
                            displayName: user.role_display_name,
                            description: user.role_description,
                            status: user.role_status,
                        }
                        : null,
                    permissions: permissionResult.rows.map((permission) => ({
                        id: permission.id,
                        permission: permission.permission,
                        module: permission.module,
                        canView: permission.canView,
                        canCreate: permission.canCreate,
                        canEdit: permission.canEdit,
                        canDelete: permission.canDelete,
                    })),
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Login API Error:", error);

        return NextResponse.json(
            {
                status: false,
                message: "Something went wrong. Please try again.",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}