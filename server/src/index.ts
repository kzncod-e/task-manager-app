import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// ROUTE IMPORTS
import projectRoute from "./routes/projectRoute";
import taskRoute from "./routes/taskRoute";
import searchRoute from "./routes/searchRoute";
import userRoute from "./routes/userRoute";
import teamRoute from "./routes/teamRoute";
import attachmentRoute from "./routes/attachmentRoute";
// CONFIGURATION
dotenv.config();
const app = express();
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
// Routes
app.get("/", (req, res) => {
  res.send("This is the home route");
});
app.use("/projects", projectRoute);
app.use("/tasks", taskRoute);
app.use("/search", searchRoute);
app.use("/users", userRoute);
app.use("/teams", teamRoute);
app.use("/attachments", attachmentRoute);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
