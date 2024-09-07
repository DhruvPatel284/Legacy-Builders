import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authorizeRoles } from '@/lib/middleware/authMiddleware';

export async function POST(req: NextRequest) {
  const userOrResponse = await authorizeRoles(['alumni'])(req);

  if (userOrResponse instanceof NextResponse) {
    return userOrResponse; 
  }

  const { user } = userOrResponse;
  const { title, description, date, location } = await req.json();

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
        creatorId: user.userId,
      },
    });

    return NextResponse.json(
      { message: "Event created successfully", event: newEvent },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating event:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
