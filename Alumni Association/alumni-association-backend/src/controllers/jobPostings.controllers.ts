import express, { Request, Response } from "express";
import prisma from "../utils/prisma";

const createJobPosting = async (req: Request, res: Response) => {
  const { title, content, company, location, salary_range, job_type} = req.body;
  const created_by = (req.user as { userId: string }).userId;

  try {
    // Prepare the data object
    const postData: any = {
      title,
      content,
      company,
      location,
      salary_range,
      job_type,
      created_by,
      post_type: 'JOB',
    };

    // Create the job posting
    const jobPosting = await prisma.post.create({
      data: postData,
    });

    res.status(201).json(jobPosting);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllJobPostings = async (req: Request, res: Response) => {
    try {
      const jobPostings = await prisma.post.findMany({
        where: { post_type: 'JOB' },
      });
  
      res.status(200).json(jobPostings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getJobPostingById = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const jobPosting = await prisma.post.findUnique({
        where: { id },
      });
  
      if (jobPosting && jobPosting.post_type === 'JOB') {
        res.status(200).json(jobPosting);
      } else {
        res.status(404).json({ message: 'Job posting not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }



export{
    createJobPosting,
    getAllJobPostings, 
    getJobPostingById
}