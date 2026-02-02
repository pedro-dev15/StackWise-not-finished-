import { Router } from "express";
import * as habitRecord from "./habitRecord.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const habitRecordRouter = Router();

habitRecordRouter.post("/", authMiddleware, habitRecord.marcarHabitoConcluido);

export default habitRecordRouter;
