import express, { Request, Response } from "express";
import prisma from "../utils/prisma";
import {authenticateJWT , authorizeAdmin} from "../middlewares/authMiddleware"
import { createEvents, getAllEvents, getEventById } from "../controllers/events.controllers";
const router = express.Router();

router.route('/create').post(authenticateJWT, authorizeAdmin,createEvents);
router.route('/getAllEvents').get(getAllEvents);
router.route('/getEvent/:id').get(getEventById);
  
export default router;