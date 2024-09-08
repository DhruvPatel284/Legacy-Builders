import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "../utils/prisma";


const registerUser = async (req: Request, res: Response) =>{
    const { email, password, username, role } = req.body; // Include role in request body

    if (!email && !role) {
      return res.status(400).json({ message: "Email and role is required" });
    }
  
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
  
      if (user) {
        return res.status(403).json({ message: "User Already Exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          role, // Include role while creating the user
        },
      });
  
      const token = jwt.sign(
        { userId: newUser.id, username: newUser.username, email: newUser.email, role: newUser.role }, // Include role in the JWT payload
        process.env.JWT_SECRET || "",
        { expiresIn: "1d" }
      );
  
      res
        .status(200)
        .cookie("token", token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }) 
        .json({ message: "Successfully Account Created", id: newUser.id });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal Error" });
    }
}

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
  
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
  
      if (!user) {
        return res.status(403).json({ message: "Invalid credentials" });
      }
  
      const passwordMatching = await bcrypt.compare(password, user.password);
  
      if (!passwordMatching) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      const token = jwt.sign(
        { userId: user.id, username: user.username, email: user.email, role: user.role }, // Include role in the JWT payload
        process.env.JWT_SECRET || "",
        { expiresIn: "1d" }
      );
  
      const modifiedUser = { name: user.username, email: user.email, id: user.id, role: user.role };
  
      res
        .status(200)
        .cookie("token", token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }) // Set cookie for 7 days
        .json({ message: "Successfully logged in", user: modifiedUser });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal Error" });
    }
}

export {
    registerUser,
    login
}