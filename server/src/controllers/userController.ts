import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "error while retrieving users", error });
  }
};
export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { cognitoId } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { cognitoId } });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "error while retrieving user", error });
  }
};

export const postUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      username,
      cognitoId,
      profilePictureUrl = "i1.jpg",
      teamId = 1,
    } = req.body;
    const newUsers = await prisma.user.create({
      data: {
        username,
        cognitoId,
        profilePictureUrl,
        teamId,
      },
    });
    res.status(200).json({ message: "User created successfully", newUsers });
  } catch (error: any) {
    res
      .status(500)
      .json({
        message: "error while creating new User ",
        error: error.message,
      });
  }
};
