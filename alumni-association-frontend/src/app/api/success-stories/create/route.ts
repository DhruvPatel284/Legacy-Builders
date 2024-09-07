import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authorizeRoles } from "@/lib/middleware/authMiddleware";

export async function POST(req: NextRequest) {
  const userOrResponse = await authorizeRoles(['admin', 'alumni'])(req);

  if (userOrResponse instanceof NextResponse) {
    return userOrResponse; 
  }

  const { user } = userOrResponse;

  try {
    const body = await req.json();
    const { title, content, achievement, date } = body;

    if (!title || !content || !achievement || !date) {
      return new NextResponse("All fields are required", { status: 400 });
    }

    const successStory = await prisma.post.create({
      data: {
        title,
        content,
        achievement,
        date: new Date(date), 
        created_by: user.userId, 
        post_type: "SUCCESS_STORY",
      },
    });

    return NextResponse.json(successStory, { status: 201 });
  } catch (error) {
    console.error("Error creating success story:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
