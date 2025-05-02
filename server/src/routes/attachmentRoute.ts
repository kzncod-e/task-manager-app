import { Router } from "express";
import { createAttachment } from "../controllers/attachmentController";

const router = Router();

router.post("/", createAttachment);
export default router;
