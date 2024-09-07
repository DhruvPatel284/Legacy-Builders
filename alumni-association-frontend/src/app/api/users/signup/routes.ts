import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; // Using ES module import for bcrypt

export async function POST(req: Request) {
  try {
    // Parse the request body
    const body = await req.json();
    const { email, password, username, role } = body; // Include role in the request body

    // Validate required fields
    if (!email || !role) {
      return new NextResponse("Email and role are required", { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new NextResponse("User Already Exists", { status: 403 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role, // Include role while creating the user
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser.id, username: newUser.username, email: newUser.email, role: newUser.role }, // Include role in the JWT payload
      process.env.JWT_SECRET || "",
      {
        expiresIn: "1d",
      }
    );

    // Set the token in the cookie
    const response = new NextResponse(
      JSON.stringify({
        message: "Successfully Account Created",
        id: newUser.id,
      }),
      { status: 200 }
    );

    response.headers.set(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}`
    );

    return response;

  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
