// app/api/videos/route.ts

import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { randomUUID } from "crypto";
import { z } from "zod";
import { dbConnection } from "@/lib/db";

const videoCreateSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(191)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase and use hyphens only"
    ),
  description: z.string().nullable().optional(),
  videoUrl: z.string().min(1, "Video URL is required").url("Invalid video URL"),
  thumbnailUrl: z.string().url("Invalid thumbnail URL").nullable().optional(),
  duration: z.number().int().min(0).nullable().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "PENDING"]),
  categoryId: z.string().nullable().optional(),
});

type AuthUser = {
  id: string;
  email: string;
  roleId: string | null;
};

async function verifyAuth(req: NextRequest): Promise<
  | {
      status: true;
      user: AuthUser;
    }
  | {
      status: false;
      response: NextResponse;
    }
> {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return {
        status: false,
        response: NextResponse.json(
          {
            status: false,
            message: "Unauthorized. Bearer token is required.",
          },
          { status: 401 }
        ),
      };
    }

    const token = authHeader.replace("Bearer ", "").trim();

    if (!token) {
      return {
        status: false,
        response: NextResponse.json(
          {
            status: false,
            message: "Unauthorized. Token is missing.",
          },
          { status: 401 }
        ),
      };
    }

    const jwtSecret = process.env.JWT_SECRET as Secret;

    if (!jwtSecret) {
      return {
        status: false,
        response: NextResponse.json(
          {
            status: false,
            message: "JWT secret is missing.",
          },
          { status: 500 }
        ),
      };
    }

    const decoded = jwt.verify(token, jwtSecret) as JwtPayload & AuthUser;

    if (!decoded?.id || !decoded?.email) {
      return {
        status: false,
        response: NextResponse.json(
          {
            status: false,
            message: "Invalid token payload.",
          },
          { status: 401 }
        ),
      };
    }

    const connection = await dbConnection();

    try {
      const [rows] = await connection.execute(
        `
        SELECT id, email, roleId, access_token
        FROM users
        WHERE id = ?
        LIMIT 1
        `,
        [decoded.id]
      );

      const users = rows as {
        id: string;
        email: string;
        roleId: string | null;
        access_token: string | null;
      }[];

      if (users.length === 0) {
        return {
          status: false,
          response: NextResponse.json(
            {
              status: false,
              message: "User not found.",
            },
            { status: 401 }
          ),
        };
      }

      const dbUser = users[0];

      if (dbUser.access_token !== token) {
        return {
          status: false,
          response: NextResponse.json(
            {
              status: false,
              message: "Token expired or logged out.",
            },
            { status: 401 }
          ),
        };
      }

      return {
        status: true,
        user: {
          id: dbUser.id,
          email: dbUser.email,
          roleId: dbUser.roleId,
        },
      };
    } finally {
      await connection.end();
    }
  } catch (error) {
    return {
      status: false,
      response: NextResponse.json(
        {
          status: false,
          message: "Invalid or expired token.",
        },
        { status: 401 }
      ),
    };
  }
}

export async function POST(req: NextRequest) {
  let connection;

  try {
    const auth = await verifyAuth(req);

    if (!auth.status) {
      return auth.response;
    }

    const body = await req.json();

    const validation = videoCreateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          status: false,
          message: "Validation error.",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const data = validation.data;

    connection = await dbConnection();

    const [existingSlugRows] = await connection.execute(
      `
      SELECT id
      FROM videos
      WHERE slug = ?
      LIMIT 1
      `,
      [data.slug]
    );

    const existingSlugs = existingSlugRows as { id: string }[];

    if (existingSlugs.length > 0) {
      return NextResponse.json(
        {
          status: false,
          message: "Slug already exists.",
          errors: {
            slug: ["Slug already exists."],
          },
        },
        { status: 409 }
      );
    }

    if (data.categoryId) {
      const [categoryRows] = await connection.execute(
        `
        SELECT id
        FROM categories
        WHERE id = ?
        LIMIT 1
        `,
        [data.categoryId]
      );

      const categories = categoryRows as { id: string }[];

      if (categories.length === 0) {
        return NextResponse.json(
          {
            status: false,
            message: "Selected category does not exist.",
            errors: {
              categoryId: ["Selected category does not exist."],
            },
          },
          { status: 422 }
        );
      }
    }

    const videoId = randomUUID();

    await connection.execute(
      `
      INSERT INTO videos (
        id,
        title,
        slug,
        description,
        videoUrl,
        thumbnailUrl,
        duration,
        views,
        status,
        userId,
        categoryId,
        createdAt,
        updatedAt
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      `,
      [
        videoId,
        data.title,
        data.slug,
        data.description || null,
        data.videoUrl,
        data.thumbnailUrl || null,
        data.duration ?? null,
        0,
        data.status,
        auth.user.id,
        data.categoryId || null,
      ]
    );

    return NextResponse.json(
      {
        status: true,
        message: "Video created successfully.",
        data: {
          id: videoId,
          title: data.title,
          slug: data.slug,
          description: data.description || null,
          videoUrl: data.videoUrl,
          thumbnailUrl: data.thumbnailUrl || null,
          duration: data.duration ?? null,
          views: 0,
          status: data.status,
          userId: auth.user.id,
          categoryId: data.categoryId || null,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    let exactError = "Unknown error";

    if (error instanceof Error) {
      exactError = error.message;
    }

    return NextResponse.json(
      {
        status: false,
        message: "Failed to create video.",
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