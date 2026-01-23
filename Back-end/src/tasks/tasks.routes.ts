import { Router } from "express";
import * as Task from "./tasks.controller";

const tasksRouter = Router();

tasksRouter.post("/addTask", Task.addTask);
tasksRouter.get("/getTasks/:userId", Task.getAllTasks);

export default tasksRouter;
