import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const search = async (req: Request, res: Response): Promise<void> => {
  const { query } = req.query;
  try {
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query as string,
              mode: "insensitive", // Added for case-insensitive search
            },
          },
          {
            description: {
              contains: query as string,
              mode: "insensitive", // Added for case-insensitive search
            },
          },
        ],
      },
    });
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query as string,
              mode: "insensitive", // Added for case-insensitive search
            },
          },
          {
            description: {
              contains: query as string,
              mode: "insensitive", // Added for case-insensitive search
            },
          },
        ],
      },
    });
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            username: {
              contains: query as string,
              mode: "insensitive", // Added for case-insensitive search
            },
          },
        ],
      },
    });
    res.status(200).json({ tasks, projects, users });
  } catch (error) {
    res
      .status(500)
      .json({ message: `error performing search ${(error as Error).message}` });
  }
};
