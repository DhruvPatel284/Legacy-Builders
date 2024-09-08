import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const successStories = await prisma.post.findMany({
      where: { post_type: "SUCCESS_STORY" },
      include: { creator: true }, // Include creator details if needed
    });

    return NextResponse.json(successStories);
  } catch (error) {
    console.error("Error fetching success stories:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
