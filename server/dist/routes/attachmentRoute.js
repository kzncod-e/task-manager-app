"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attachmentController_1 = require("../controllers/attachmentController");
const router = (0, express_1.Router)();
router.post("/", attachmentController_1.createAttachment);
exports.default = router;
