import { Router } from "express";
import * as user from "./user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { ensureAdmin } from "../middleware/ensureAdmin.middleware";

const userRouter = Router();

//Rotas para ADMIN
userRouter.get("/", authMiddleware, ensureAdmin, user.getAllUsers);

userRouter.get("/:id", authMiddleware, ensureAdmin, user.getOneUser);

userRouter.delete("/:id", authMiddleware, ensureAdmin, user.deleteUser);

export default userRouter;
