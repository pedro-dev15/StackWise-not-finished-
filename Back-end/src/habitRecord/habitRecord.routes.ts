import { Router } from "express";
import * as habitRecord from "./habitRecord.controller";
import { authMiddleware } from "../middleware/auth.middleware";

/**
 * @swagger
 * tags:
 *   - name: HabitRecord
 *     description: Check-in de hábitos
 */

/**
 * @swagger
 * /habits/{habitId}/checkin:
 *   post:
 *     summary: Realiza check-in de um hábito
 *     tags: [HabitRecord]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: habitId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Check-in realizado
 */

const habitRecordRouter = Router();

habitRecordRouter.post(
  "/:habitId/records",
  authMiddleware,
  habitRecord.checkIn,
);

export default habitRecordRouter;
