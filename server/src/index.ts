import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import projectRoute from "./routes/projectRoute";
import taskRoute from "./routes/taskRoute";
// ROUTE IMPORTS

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
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
