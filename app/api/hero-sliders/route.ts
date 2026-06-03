// app/api/hero-sliders/route.ts

import { NextRequest, NextResponse } from "next/server";
import { dbConnection } from "@/lib/db";
import path from "path";
import { writeFile, mkdir } from "fs/promises";

type HeroSliderRow = {
  id: number;
  title: string;
  description: string;
  category: string;
  year: string;
  rating: string;
  votes: string;
  episodes: string;
  studio: string | null;
  director: string | null;
  duration: string;
  image: string;
  status: number;
  sort_order: number;
};

export async function GET() {
  let connection;

  try {
    connection = await dbConnection();

    const [rows] = await connection.execute(
      `
      SELECT 
        id,
        title,
        description,
        category,
        year,
        rating,
        votes,
        episodes,
        studio,
        director,
        duration,
        image,
        status,
        sort_order
      FROM hero_sliders
      ORDER BY sort_order ASC, id DESC
      `
    );

    return NextResponse.json(
      {
        status: true,
        message: "Hero sliders fetched successfully",
        data: rows as HeroSliderRow[],
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
        message: "Failed to fetch hero sliders",
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

export async function POST(req: NextRequest) {
  let connection;

  try {
    const formData = await req.formData();

    const title = String(formData.get("title") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const category = String(formData.get("category") || "").trim();
    const year = String(formData.get("year") || "").trim();
    const rating = String(formData.get("rating") || "0").trim();
    const votes = String(formData.get("votes") || "0").trim();
    const episodes = String(formData.get("episodes") || "0").trim();
    const studio = String(formData.get("studio") || "").trim();
    const director = String(formData.get("director") || "").trim();
    const duration = String(formData.get("duration") || "").trim();
    const sortOrder = Number(formData.get("sort_order") || 0);
    const statusValue = Number(formData.get("status") || 1);
    const imageFile = formData.get("image") as File | null;

    if (!title) {
      return NextResponse.json(
        { status: false, message: "Title is required" },
        { status: 400 }
      );
    }

    if (!description) {
      return NextResponse.json(
        { status: false, message: "Description is required" },
        { status: 400 }
      );
    }

    if (!category) {
      return NextResponse.json(
        { status: false, message: "Category is required" },
        { status: 400 }
      );
    }

    if (!year) {
      return NextResponse.json(
        { status: false, message: "Year is required" },
        { status: 400 }
      );
    }

    if (!duration) {
      return NextResponse.json(
        { status: false, message: "Duration is required" },
        { status: 400 }
      );
    }

    if (!imageFile || imageFile.size === 0) {
      return NextResponse.json(
        { status: false, message: "Slider image is required" },
        { status: 400 }
      );
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(imageFile.type)) {
      return NextResponse.json(
        {
          status: false,
          message: "Only JPG, PNG, and WEBP images are allowed",
        },
        { status: 400 }
      );
    }

    const maxSize = 5 * 1024 * 1024;

    if (imageFile.size > maxSize) {
      return NextResponse.json(
        {
          status: false,
          message: "Image size must be less than 5MB",
        },
        { status: 400 }
      );
    }

    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      "hero-sliders"
    );

    await mkdir(uploadDir, { recursive: true });

    const ext = imageFile.name.split(".").pop();
    const fileName = `hero-slider-${Date.now()}.${ext}`;
    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, buffer);

    const imageUrl = `/uploads/hero-sliders/${fileName}`;

    connection = await dbConnection();

    const [result] = await connection.execute(
      `
      INSERT INTO hero_sliders (
        title,
        description,
        category,
        year,
        rating,
        votes,
        episodes,
        studio,
        director,
        duration,
        image,
        status,
        sort_order
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        title,
        description,
        category,
        year,
        rating,
        votes,
        episodes,
        studio || null,
        director || null,
        duration,
        imageUrl,
        statusValue,
        sortOrder,
      ]
    );

    return NextResponse.json(
      {
        status: true,
        message: "Hero slider created successfully",
        data: result,
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
        message: "Failed to create hero slider",
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