import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./auth/auth.routes";
import tasksRouter from "./tasks/tasks.routes";
import habitsRouter from "./habits/habits.routes";

export const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/tasks", tasksRouter);
app.use("/habits", habitsRouter);
