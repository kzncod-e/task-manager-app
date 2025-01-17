import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllTasks = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { projectId } = req.query;
  try {
    const tasks = await prisma.task.findMany({
      where: {
        projectId: Number(projectId),
      },
      include: {
        author: true,
        assignee: true,
        comments: true,
        attachments: true,
      },
    });
    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error while retrieving the tasks", error });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const {
    title,
    description,
    status,
    priority,
    tags,
    startDate,
    dueDate,
    points,
    projectId,
    authorUserId,
    assignedUserId,
  } = req.body;
  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        tags,
        startDate: new Date(startDate),
        dueDate: new Date(dueDate),   
        points,
        projectId,
        authorUserId,
        assignedUserId,
      },
    });
    res.status(201).json(newTask);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "error while creating new task",
        error: error.message,
      });
    }
  }
};