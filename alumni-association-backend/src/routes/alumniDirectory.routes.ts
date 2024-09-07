import express, { Request, Response } from "express";
import prisma from "../utils/prisma";
import {authenticateJWT , authorizeAdmin,checkRole} from "../middlewares/authMiddleware";
const router = express.Router();

router.route('/getAlumniDirectory').get(async (req: Request, res: Response) => {
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
  
      res.status(200).json(alumni);
    } catch (error) {
      console.error('Error fetching alumni directory:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
})

export default router;