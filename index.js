import express from "express";
const app = express();
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import tasksRouter from "./routes/task.js";

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("mongodb database connected successfully");
  })
  .catch(() => {
    console.log("mongodb database not connected");
  });



  

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

app.use("/api/userinfo", userRouter);
app.use("/api/tasks", tasksRouter);

app.listen(7000, () => {
  console.log("port 7000 is running ");
});
