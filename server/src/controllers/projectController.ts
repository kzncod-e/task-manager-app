import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
//mirip kaya model
const prisma = new PrismaClient();
export const getProjects = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: `error while retrieving project ${error.message}` });
    }
  }
};
export const createProject = async (
  req: Request,
  res: Response,
): Promise<void> => {
  console.log("Request Body:", req.body); // Debugging log

  const { name, description, startDate, endDate } = req.body;

  if (!name || !description || !startDate || !endDate) {
    res.status(400).json({
      message:
        "Invalid input. Please provide name, description, startDate, and endDate.",
    });
    return;
  }

  try {
    const projects = await prisma.project.create({
      data: {
        name,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });
    res.status(201).json(projects);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Error while creating new project",
        error: error.message,
      });
    }
  }
};
