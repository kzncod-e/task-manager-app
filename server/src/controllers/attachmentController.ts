import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createAttachment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { fileName, uploadedById, fileURL, taskId } = req.body;

  if (!taskId || !fileName || !uploadedById || !fileURL) {
    res.status(400).json({
      message:
        "Invalid input. Please provide taskId, fileName, uploadedById, and fileURL.",
    });
    return;
  }

  try {
    const attachment = await prisma.attachment.create({
      data: {
        fileURL,
        fileName,
        uploadedById,
        taskId: Number(taskId),
      },
    });
    res.status(201).json(attachment);
  } catch {
    res.status(500).json({
      message: "Error while creating new attachment",
    });
  }
};
