import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Define the GET method to fetch an event by ID
export async function GET(
  req: NextRequest,
  context: { params: { evenId: string } }
) {
  try {
    const eventId = context.params.evenId; // Extract the event ID from the route parameters

    if (!eventId) {
      return new NextResponse("Event ID is missing", { status: 400 });
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId }, // Find the event by ID
    });

    if (event) {
      return NextResponse.json(event, { status: 200 }); // Return the found event
    } else {
      return new NextResponse("Event not found", { status: 404 }); // Handle event not found
    }
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
