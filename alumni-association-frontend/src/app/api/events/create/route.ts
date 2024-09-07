import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Define the POST method for creating an event
export async function POST(req: Request) {
  const { title, description, date, location } = await req.json();

  // Assuming you have middleware or some method to get the authenticated user
  const userId = (req as any).user?.userId; // Adjust if using different middleware for authentication

  if (!title || !description || !date || !location) {
    return new NextResponse("All fields are required", { status: 400 });
  }

  try {
    const newEvent = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        location,
        creatorId: userId, // Set the creatorId to the authenticated user's ID
      },
    });

    // Return success response with 201 status code
    return NextResponse.json(
      { message: "Event created successfully", event: newEvent },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating event:", error);
    // Return error response with 500 status code
    return new NextResponse("Internal Error", { status: 500 });
  }
}
