import { Router } from "express";
import * as user from "./auth.controller";

const router = Router();

router.get("/", user.none);
router.post("/login", user.login);
router.post("/register", user.register);

export default router;
