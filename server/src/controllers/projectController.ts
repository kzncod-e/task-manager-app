import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { redis } from "../lib/redis";
//mirip kaya model
const prisma = new PrismaClient();
export const getProjects = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const cacheKey = "projects";
    const catchValue = await redis.get(cacheKey);
    if (catchValue) {
      const parseValue = JSON.parse(catchValue);
      res.json(parseValue);
      return;
    }
    const projects = await prisma.project.findMany();
    await redis.setex(cacheKey, 3600, JSON.stringify(projects));
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
    await redis.del("projects");
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
