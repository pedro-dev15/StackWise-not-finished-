import { Router } from "express";
import * as user from "./auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/", user.none);
router.post("/login", user.login);
router.post("/register", user.register);
router.get("/profile", authMiddleware, user.profile);
router.get("/refresh", user.refresh);

export default router;
