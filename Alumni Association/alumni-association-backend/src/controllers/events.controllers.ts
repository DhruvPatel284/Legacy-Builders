import express, { Request, Response } from "express";
import prisma from "../utils/prisma";
import {authenticateJWT , authorizeAdmin} from "../middlewares/authMiddleware";

const createEvents = async (req: Request, res: Response) => {
    const { title, description, date, location } = req.body;
    const userId = (req.user as { userId: string }).userId; // Get the userId from the authenticated user
  
    if (!title || !description || !date || !location) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const newEvent = await prisma.event.create({
        data: {
          title,
          description,
          date: new Date(date),
          location,
          creatorId: userId, // Set the creatorId to the authenticated user's ID
        },
      });
  
      res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Error' });
    }
  }

const getAllEvents = async (req: Request, res: Response) => {
    try {
      const events = await prisma.event.findMany(); // Fetch all events
      res.status(200).json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

const getEventById = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const event = await prisma.event.findUnique({
        where: { id: id }, // Ensure ID is converted to number if needed
      });
  
      if (event) {
        res.status(200).json(event);
      } else {
        res.status(404).json({ message: 'Event not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

export {
    createEvents,
    getAllEvents,
    getEventById
}