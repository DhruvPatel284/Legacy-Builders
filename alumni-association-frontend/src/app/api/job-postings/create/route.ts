import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authorizeRoles } from "@/lib/middleware/authMiddleware";

export async function POST(req: NextRequest) {
  // Apply middleware to check for admin and alumni roles
  const userOrResponse = await authorizeRoles(['admin', 'alumni'])(req);

  if (userOrResponse instanceof NextResponse) {
    return userOrResponse; // If authorization fails, return the response
  }

  const { user } = userOrResponse;

  try {
    const body = await req.json();
    const { title, content, company, location, salary_range, job_type } = body;

    if (!title || !content || !company || !location || !salary_range || !job_type) {
      return new NextResponse("All fields are required", { status: 400 });
    }

    // Prepare the data object
    const postData = {
      title,
      content,
      company,
      location,
      salary_range,
      job_type,
      created_by: user.userId, // Use the user ID from the JWT token
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
