import express, { Request, Response } from "express";
import prisma from "../utils/prisma";
import {authenticateJWT , authorizeAdmin,checkRole} from "../middlewares/authMiddleware";
import { createSuccessStory, getAllSuccessStories, getSuccessStoryById } from "../controllers/successStories.controllers";

const router = express.Router();

router.route('/create').post(authenticateJWT, checkRole(['admin', 'alumni']), createSuccessStory);
router.route('/getAllSuccessStories').get(getAllSuccessStories);
router.route('/getSuccessStory/:id').get(getSuccessStoryById);


export default router;