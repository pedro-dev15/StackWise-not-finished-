import { Router } from "express";
import * as user from "./auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const authRouter = Router();

authRouter.get("/", user.none);

authRouter.post("/login", user.login);

authRouter.post("/register", user.register);

authRouter.get("/profile", authMiddleware, user.profile);

authRouter.post("/refresh", user.refresh);

authRouter.post("/logout", user.logout);

export default authRouter;
