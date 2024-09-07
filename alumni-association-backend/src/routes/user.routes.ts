import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "../utils/prisma";
import { registerUser,login } from "../controllers/user.controllers";
const router = express.Router();

// Signup Route
router.route("/signup").post(registerUser);
router.route("/signin").post(login);
export default router;
