import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  try {
    const successStory = await prisma.post.findUnique({
      where: { id: id },
      include: { creator: true }, // Include creator details if needed
    });

    if (successStory) {
      return NextResponse.json(successStory);
    } else {
      return new NextResponse("Success Story not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching success story:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
