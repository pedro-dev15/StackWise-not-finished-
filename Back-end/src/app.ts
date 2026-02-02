import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./auth/auth.routes";
import tasksRouter from "./tasks/tasks.routes";
import habitsRouter from "./habits/habits.routes";
import habitRecordRouter from "./habitRecord/habitRecord.routes";
import userRouter from "./user/user.routes";

export const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/tasks", tasksRouter);
app.use("/habits", habitsRouter);
app.use("/habits", habitRecordRouter);
