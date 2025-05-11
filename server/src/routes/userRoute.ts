import { Router } from "express";

import { getUser, getUsers, postUsers } from "../controllers/userController";
const router = Router();
router.get("/", getUsers);
router.post("/", postUsers);
router.get("/:cognitoId", getUser);

export default router;
