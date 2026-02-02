import { AppError } from "../shared/errors/AppError";
import { RequestHandler } from "express";
export const checkIn: RequestHandler = async (req, res) => {
  try {
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        message: err.message,
      });
    }

    console.error("Erro ao marcar checkIn", err);
    return res.status(500).json({
      message: "Erro interno",
    });
  }
};
