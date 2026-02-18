import { Router } from "express";
import * as Task from "./tasks.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const tasksRouter = Router();

/**
 * @swagger
 * tags:
 *   - name: Tasks
 *     description: Gerenciamento de tarefas
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Criar task
 *     tags: [Tasks]
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
 *         description: Task criada
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Listar tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tasks
 */

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Atualizar task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Deletar task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /tasks/{id}/complete:
 *   patch:
 *     summary: Marcar task como concluída
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /tasks/{id}/uncomplete:
 *   patch:
 *     summary: Marcar task como não concluída
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 */

tasksRouter.post("/", authMiddleware, Task.addTask);

tasksRouter.get("/", authMiddleware, Task.getAllTasks);

tasksRouter.put("/:id", authMiddleware, Task.updateTask);

tasksRouter.delete("/:id", authMiddleware, Task.deleteTask);

tasksRouter.patch("/:id/complete", authMiddleware, Task.completeTask);

tasksRouter.patch("/:id/uncomplete", authMiddleware, Task.completeTask);

export default tasksRouter;
