import { AppError } from "../shared/errors/AppError";
import { RequestHandler } from "express";
import { CheckInUseCase } from "../usecases/habitRecordUseCases/habitRecordUseCase";

export const checkIn: RequestHandler = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: "NÃ£o autorizado" });
    }

    const { habitId } = req.params;

    const usecase = new CheckInUseCase();
    const habitRecord = await usecase.execute(habitId, user.id);

    res.status(200).json({ message: "CheckIn completo!", habitRecord });
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
