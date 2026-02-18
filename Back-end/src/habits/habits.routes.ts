import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import * as habit from "./habits.controller";

/**
 * @swagger
 * tags:
 *   - name: Habits
 *     description: Gerenciamento de hábitos
 */

/**
 * @swagger
 * /habits:
 *   post:
 *     summary: Criar hábito
 *     tags: [Habits]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Hábito criado
 */

/**
 * @swagger
 * /habits:
 *   get:
 *     summary: Listar hábitos do usuário
 *     tags: [Habits]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de hábitos
 */

/**
 * @swagger
 * /habits/{id}:
 *   put:
 *     summary: Atualizar hábito
 *     tags: [Habits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hábito atualizado
 */

/**
 * @swagger
 * /habits/{id}:
 *   delete:
 *     summary: Deletar hábito
 *     tags: [Habits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hábito deletado
 */

const habitsRouter = Router();

habitsRouter.post("/", authMiddleware, habit.adicionarHabito);

habitsRouter.get("/", authMiddleware, habit.pegarHabitos);

habitsRouter.put("/:id", authMiddleware, habit.atualizarHabito);

habitsRouter.delete("/:id", authMiddleware, habit.apagarHabito);

export default habitsRouter;
