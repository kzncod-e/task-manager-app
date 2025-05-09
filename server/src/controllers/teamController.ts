/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const teams = await prisma.team.findMany();
    const teamsWithUsernames = await Promise.all(
      teams.map(async (team: any) => {
        const productsOwner = await prisma.user.findUnique({
          where: { userId: team.productOwnerUserId! },
          select: { username: true },
        });
        const projectManager = await prisma.user.findUnique({
          where: { userId: team.projectManagerUserId! },
          select: { username: true },
        });
        return {
          ...team,
          productOwnerUsername: productsOwner?.username,
          projectManagerUsername: projectManager?.username,
        };
      }),
    );
    res.status(200).json(teamsWithUsernames);
  } catch (error) {
    res.status(500).json({ message: "error while retrieving teams", error });
  }
};
