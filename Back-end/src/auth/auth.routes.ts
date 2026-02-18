import { Router } from "express";
import * as user from "./auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const authRouter = Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Autenticação e gerenciamento de sessão
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro no registro
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado
 *       401:
 *         description: Credenciais inválidas
 */

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Retorna perfil do usuário autenticado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil retornado
 *       401:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Atualiza access token
 *     tags: [Auth]
 *     responses:
 *       201:
 *         description: Token renovado
 *       401:
 *         description: Refresh token inválido
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout do usuário
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout realizado
 */

authRouter.get("/", user.none);

authRouter.post("/login", user.login);

authRouter.post("/register", user.register);

authRouter.get("/profile", authMiddleware, user.profile);

authRouter.post("/refresh", user.refresh);

authRouter.post("/logout", user.logout);

export default authRouter;
