import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch all users with the role of 'alumni'
    const alumni = await prisma.user.findMany({
      where: {
        role: 'alumni', // Filter users by role 'alumni'
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        profile_picture: true,
        graduation_year: true,
        course: true,
        created_at: true,
      },
    });

    // Return the alumni data with a 200 status
    return NextResponse.json(alumni, { status: 200 });
  } catch (error) {
    console.error('Error fetching alumni directory:', error);
    // Return an error response with a 500 status
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
