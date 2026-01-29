import { RequestHandler } from "express";
import { AppError } from "../errors/AppError";
import {
  AdicionarHabitoUseCase,
  PegarHabitosUseCase,
} from "../usecases/habits.usecase";

export const adicionarHabito: RequestHandler = async (req, res) => {
  try {
    const body = req.body;

    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: "Não autorizado" });
    }

    const usecase = new AdicionarHabitoUseCase();
    const habit = await usecase.execute(body, user.id);

    res.status(201).json({ message: "Hábito criado com sucesso!", habit });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        message: err.message,
      });
    }

    console.error("Erro ao adicionar hábito", err);
    return res.status(500).json({
      message: "Erro interno",
    });
  }
};

export const pegarHabitos: RequestHandler = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: "NÃ£o autorizado" });
    }

    const useCase = new PegarHabitosUseCase();
    const habits = await useCase.execute(user.id);

    res.status(200).json({ habits });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        message: err.message,
      });
    }

    console.error("Erro ao pegar hábitos", err);
    return res.status(500).json({
      message: "Erro interno",
    });
  }
};
