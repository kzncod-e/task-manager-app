import { Router } from "express";
import {
  createTask,
  getAllTasks,
  updateTaskStatus,
} from "../controllers/taskController";
const router = Router();
router.get("/", getAllTasks);
router.post("/", createTask);
router.patch("/:taskId/status", updateTaskStatus);
export default router;
