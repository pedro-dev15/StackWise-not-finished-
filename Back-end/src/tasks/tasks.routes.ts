import { Router } from "express";
import * as Task from "./tasks.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const tasksRouter = Router();

tasksRouter.post("/", authMiddleware, Task.addTask);

tasksRouter.get("/", authMiddleware, Task.getAllTasks);

tasksRouter.put("/:id", authMiddleware, Task.updateTask);

tasksRouter.delete("/:id", authMiddleware, Task.deleteTask);

tasksRouter.patch("/:id/complete", authMiddleware, Task.completeTask);

tasksRouter.patch("/:id/uncomplete", authMiddleware, Task.completeTask);

export default tasksRouter;
