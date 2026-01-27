import { Router } from "express";
import * as Task from "./tasks.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const tasksRouter = Router();

tasksRouter.post("/addTask/", authMiddleware, Task.addTask);
tasksRouter.get("/getTasks/", authMiddleware, Task.getAllTasks);
tasksRouter.put("/updateTask/", authMiddleware, Task.updateTask);
tasksRouter.delete("/deleteTask/", authMiddleware, Task.deleteTask);

export default tasksRouter;
