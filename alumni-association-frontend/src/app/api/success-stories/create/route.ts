import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, content, achievement, date } = body;
    const created_by = req.headers.get("userId"); // Assuming userId is passed in headers or modify as per your authentication setup

    if (!created_by) {
      return new NextResponse("User is not authenticated", { status: 401 });
    }

    const successStory = await prisma.post.create({
      data: {
        title,
        content,
        achievement,
        date,
        created_by,
        post_type: "SUCCESS_STORY",
      },
    });

    return NextResponse.json(successStory, { status: 201 });
  } catch (error) {
    console.error("Error creating success story:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
