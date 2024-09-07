import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Define the GET method for fetching all events
export async function GET() {
  try {
    const events = await prisma.event.findMany(); // Fetch all events

    // Return success response with 200 status code
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);

    // Return error response with 500 status code
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
