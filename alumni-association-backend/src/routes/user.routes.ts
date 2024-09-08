import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "../utils/prisma";
import { registerUser,login } from "../controllers/user.controllers";
const router = express.Router();

// Signup Route
router.route("/signup").post(registerUser);
router.route("/signin").post(login);
router.route("/getUser").post((req, res) => {
    const token = req.cookies.token; // Access the token from cookies
     console.log("token:",token);
    if (!token) {
      return res.status(401).send("Unauthorized User");
    }
  
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET || "");
      return res.status(200).json({
        message: "Verified User",
        user: data,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Error");
    }
  })
export default router;
