import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; // Using ES module import for bcrypt

export async function POST(req: Request) {
  try {
    // Parse the request body
    const body = await req.json();
    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return new NextResponse("Email and password are required", { status: 400 });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new NextResponse("Invalid credentials", { status: 403 });
    }

    // Compare provided password with stored hashed password
    const passwordMatching = await bcrypt.compare(password, user.password);

    if (!passwordMatching) {
      return new NextResponse("Invalid credentials", { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username, email: user.email, role: user.role }, // Include role in the JWT payload
      process.env.JWT_SECRET || "",
      { expiresIn: "1d" }
    );

    // Prepare the user object to return
    const modifiedUser = {
      name: user.username,
      email: user.email,
      id: user.id,
      role: user.role,
    };

    // Set the token in the cookie
    const response = new NextResponse(
      JSON.stringify({
        message: "Successfully logged in",
        user: modifiedUser,
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
