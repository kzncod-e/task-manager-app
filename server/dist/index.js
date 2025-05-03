"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
// ROUTE IMPORTS
const projectRoute_1 = __importDefault(require("./routes/projectRoute"));
const taskRoute_1 = __importDefault(require("./routes/taskRoute"));
const searchRoute_1 = __importDefault(require("./routes/searchRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const teamRoute_1 = __importDefault(require("./routes/teamRoute"));
const attachmentRoute_1 = __importDefault(require("./routes/attachmentRoute"));
// CONFIGURATION
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy());
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)("dev"));
// Routes
app.get("/", (req, res) => {
    res.send("This is the home route");
});
app.use("/projects", projectRoute_1.default);
app.use("/tasks", taskRoute_1.default);
app.use("/search", searchRoute_1.default);
app.use("/users", userRoute_1.default);
app.use("/teams", teamRoute_1.default);
app.use("/attachments", attachmentRoute_1.default);
const port = Number(process.env.PORT) || 3000;
app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
});
