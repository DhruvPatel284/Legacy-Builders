import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  try {
    const jobPosting = await prisma.post.findUnique({
      where: { id },
    });

    if (jobPosting && jobPosting.post_type === "JOB") {
      return NextResponse.json(jobPosting, { status: 200 });
    } else {
      return new NextResponse("Job posting not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching job posting by ID:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
