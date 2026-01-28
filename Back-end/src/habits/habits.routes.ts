import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import * as habit from "./habits.controller";

const habitsRouter = Router();

habitsRouter.post("/", authMiddleware, habit.adicionarHabito);
habitsRouter.get("/", authMiddleware, habit.pegarHabitos);

export default habitsRouter;
