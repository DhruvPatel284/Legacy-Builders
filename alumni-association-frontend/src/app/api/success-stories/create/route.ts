import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
 
  try {
    const body = await req.json();
    const { title, content, achievement, date , userId } = body;

    if (!title || !content || !achievement || !date) {
      return new NextResponse("All fields are required", { status: 400 });
    }

    const successStory = await prisma.post.create({
      data: {
        title,
        content,
        achievement,
        date: new Date(date), 
        created_by: userId, 
        post_type: "SUCCESS_STORY",
      },
    });

    return NextResponse.json(successStory, { status: 201 });
  } catch (error) {
    console.error("Error creating success story:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
