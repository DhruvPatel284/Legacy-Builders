import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, content, company, location, salary_range, job_type } = body;
    
    const created_by = req.headers.get("userId"); // Fetch the user ID from headers or any other method

    if (!created_by) {
      return new NextResponse("User ID is missing", { status: 400 });
    }

    // Prepare the data object
    const postData = {
      title,
      content,
      company,
      location,
      salary_range,
      job_type,
      created_by,
      post_type: "JOB",
    };

    // Create the job posting
    const jobPosting = await prisma.post.create({
        //@ts-ignore
      data: postData,
    });

    return NextResponse.json(jobPosting, { status: 201 });
  } catch (error) {
    console.error("Error creating job posting:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
