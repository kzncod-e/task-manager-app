import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();

async function deleteAllData() {
  // Delete dependent records first
  await prisma.taskAssignment.deleteMany({});
  await prisma.attachment.deleteMany({});
  await prisma.comment.deleteMany({});
  await prisma.task.deleteMany({});
  await prisma.projectTeam.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.team.deleteMany({});

  // Reset primary keys (sequence) in PostgreSQL
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "User_userId_seq" RESTART WITH 1;`,
  );
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "Team_id_seq" RESTART WITH 1;`,
  );
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "Project_id_seq" RESTART WITH 1;`,
  );
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "ProjectTeam_id_seq" RESTART WITH 1;`,
  );
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "Task_id_seq" RESTART WITH 1;`,
  );
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "TaskAssignment_id_seq" RESTART WITH 1;`,
  );
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "Attachment_id_seq" RESTART WITH 1;`,
  );
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "Comment_id_seq" RESTART WITH 1;`,
  );
}

async function main() {
  const dataDirectory = path.join(__dirname, "seedData");

  const orderedFileNames = [
    "team.json",
    "project.json",
    "projectTeam.json",
    "user.json",
    "task.json",
    "attachment.json",
    "comment.json",
    "taskAssignment.json",
  ];

  await deleteAllData();

  for (const fileName of orderedFileNames) {
    const filePath = path.join(dataDirectory, fileName);
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const modelName = path.basename(fileName, path.extname(fileName));
    const model: any = prisma[modelName as keyof typeof prisma];

    try {
      for (const data of jsonData) {
        await model.create({ data });
      }
      console.log(`Seeded ${modelName} with data from ${fileName}`);
    } catch (error) {
      console.error(`Error seeding data for ${modelName}:`, error);
    }
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
