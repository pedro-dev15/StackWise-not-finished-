import { Router } from "express";
import * as user from "./user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { ensureAdmin } from "../middleware/ensureAdmin.middleware";

const userRouter = Router();

/**
 * @swagger
 * tags:
 *   - name: Admin - Users
 *     description: Gerenciamento administrativo de usuários
 */
/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Lista todos os usuários (Admin)
 *     tags: [Admin - Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *       403:
 *         description: Acesso negado
 */
/**
 * @swagger
 * /admin/users/{id}:
 *   get:
 *     summary: Busca usuário por ID (Admin)
 *     tags: [Admin - Users]
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
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 */
/**
 * @swagger
 * /admin/users/{id}:
 *   put:
 *     summary: Atualiza dados do usuário (Admin)
 *     tags: [Admin - Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [USER, ADMIN]
 *     responses:
 *       200:
 *         description: Usuário atualizado
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Usuário não encontrado
 */
/**
 * @swagger
 * /admin/users/{id}:
 *   delete:
 *     summary: Remove usuário do sistema (Admin)
 *     tags: [Admin - Users]
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
 *         description: Usuário removido
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Usuário não encontrado
 */

//Rotas para ADMIN
userRouter.get("/", authMiddleware, ensureAdmin, user.getAllUsers);

userRouter.get("/:id", authMiddleware, ensureAdmin, user.getOneUser);

userRouter.delete("/:id", authMiddleware, ensureAdmin, user.deleteUser);

userRouter.patch("/:id", authMiddleware, ensureAdmin, user.promoveUser);

userRouter.patch("/:id", authMiddleware, ensureAdmin, user.demoteUser);

export default userRouter;
