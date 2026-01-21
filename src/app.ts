import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./auth/auth.routes";

export const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);