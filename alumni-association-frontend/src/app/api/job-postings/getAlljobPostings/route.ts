import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const jobPostings = await prisma.post.findMany({
      where: { post_type: "JOB" },
    });

    return NextResponse.json(jobPostings, { status: 200 });
  } catch (error) {
    console.error("Error fetching job postings:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
