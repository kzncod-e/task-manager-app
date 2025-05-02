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
exports.createProject = exports.getProjects = void 0;
const client_1 = require("@prisma/client");
const redis_1 = require("../lib/redis");
//mirip kaya model
const prisma = new client_1.PrismaClient();
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cacheKey = "projects";
        const catchValue = yield redis_1.redis.get(cacheKey);
        if (catchValue) {
            const parseValue = JSON.parse(catchValue);
            res.json(parseValue);
            return;
        }
        const projects = yield prisma.project.findMany();
        yield redis_1.redis.setex(cacheKey, 3600, JSON.stringify(projects));
        res.json(projects);
    }
    catch (error) {
        if (error instanceof Error) {
            res
                .status(500)
                .json({ message: `error while retrieving project ${error.message}` });
        }
    }
});
exports.getProjects = getProjects;
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Request Body:", req.body); // Debugging log
    const { name, description, startDate, endDate } = req.body;
    if (!name || !description || !startDate || !endDate) {
        res.status(400).json({
            message: "Invalid input. Please provide name, description, startDate, and endDate.",
        });
        return;
    }
    try {
        const projects = yield prisma.project.create({
            data: {
                name,
                description,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
            },
        });
        yield redis_1.redis.del("projects");
        res.status(201).json(projects);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: "Error while creating new project",
                error: error.message,
            });
        }
    }
});
exports.createProject = createProject;
