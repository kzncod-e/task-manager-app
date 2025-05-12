"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskStatus = exports.createTask = exports.getUserTasks = exports.getTasks = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId } = req.query;
    try {
        const tasks = yield prisma.task.findMany({
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
    }
    catch (error) {
        res.status(500).json({
            message: "error while retrieving the tasks",
            error: error.message,
        });
    }
});
exports.getTasks = getTasks;
const getUserTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const tasks = yield prisma.task.findMany({
            where: {
                OR: [
                    { authorUserId: Number(userId) },
                    { assignedUserId: Number(userId) },
                ],
            },
            include: {
                author: true,
                assignee: true,
            },
        });
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({
            message: "error while retrieving the user tasks",
            error: error.message,
        });
    }
});
exports.getUserTasks = getUserTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status, priority, tags, startDate, dueDate, points, projectId, authorUserId, assignedUserId, } = req.body;
    try {
        const newTask = yield prisma.task.create({
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
        // console.log("New Task Created:", newTask);
        res.status(201).json(newTask);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: "error while creating new task",
                error: error.message,
            });
        }
    }
});
exports.createTask = createTask;
const updateTaskStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.params;
    const { status } = req.body;
    try {
        const updatedTasks = yield prisma.task.update({
            where: {
                id: Number(taskId),
            },
            data: {
                status: status,
            },
        });
        res.status(200).json(updatedTasks);
    }
    catch (error) {
        if (error instanceof Error) {
            res
                .status(500)
                .json({
                message: "error while updating status tasks",
                error: error.message,
            });
        }
    }
});
exports.updateTaskStatus = updateTaskStatus;
