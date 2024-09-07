import express, { Request, Response } from "express";
import prisma from "../utils/prisma";

const createSuccessStory = async (req: Request, res: Response) => {
    const { title, content, achievement, date} = req.body;
    const created_by = (req.user as { userId: string }).userId; 
  
    try {
      const successStory = await prisma.post.create({
        data: {
          title,
          content,
          achievement,
          date,
          created_by,
          post_type: 'SUCCESS_STORY',
        },
      });
  
      res.status(201).json(successStory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getAllSuccessStories = async (req: Request, res: Response) => {
    try {
      const successStories = await prisma.post.findMany({
        where: { post_type: 'SUCCESS_STORY' },
        include: { creator: true }, // Include creator details if needed
      });
  
      res.status(200).json(successStories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getSuccessStoryById = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const successStory = await prisma.post.findUnique({
        where: { id: id },
        include: { creator: true }, // Include creator details if needed
      });
  
      if (successStory) {
        res.status(200).json(successStory);
      } else {
        res.status(404).json({ message: 'Success Story not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }


export{
    createSuccessStory, 
    getAllSuccessStories, 
    getSuccessStoryById
}