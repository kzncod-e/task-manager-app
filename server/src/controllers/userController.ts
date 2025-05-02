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
// export const createUser = async (req: Request, res: Response): Promise<void> => {
//   const { username, email } = req.body;
//   try {
//     const users = await prisma.user.create({data: { username,  } });
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: "error while retrieving users", error });
//   }
// };
