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
exports.createAttachment = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createAttachment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fileName, uploadedById, fileURL, taskId } = req.body;
    if (!taskId || !fileName || !uploadedById || !fileURL) {
        res.status(400).json({
            message: "Invalid input. Please provide taskId, fileName, uploadedById, and fileURL.",
        });
        return;
    }
    try {
        const attachment = yield prisma.attachment.create({
            data: {
                fileURL,
                fileName,
                uploadedById,
                taskId: Number(taskId),
            },
        });
        res.status(201).json(attachment);
    }
    catch (_a) {
        res.status(500).json({
            message: "Error while creating new attachment",
        });
    }
});
exports.createAttachment = createAttachment;
