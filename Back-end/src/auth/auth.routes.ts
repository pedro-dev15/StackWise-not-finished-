import { Router } from "express";
import * as user from "./auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { ensureAdmin } from "../middleware/ensureAdmin.middleware";

const authRouter = Router();

authRouter.get("/", user.none);

authRouter.post("/login", user.login);

authRouter.post("/register", user.register);

authRouter.get("/profile", authMiddleware, user.profile);

authRouter.post("/refresh", user.refresh);

authRouter.post("/logout", user.logout);

//Rotas para ADMIN
authRouter.get("/users", authMiddleware, ensureAdmin, user.getAllUsers);

authRouter.get("/users/:id", authMiddleware, ensureAdmin, user.getOneUser);

authRouter.delete("/users/:id", authMiddleware, ensureAdmin, user.deleteUser);

export default authRouter;
