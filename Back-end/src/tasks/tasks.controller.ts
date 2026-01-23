import { RequestHandler } from "express";
import { addTaskUseCase, getAllTasksUseCase } from "../usecases/tasks.usecase";

export const addTask: RequestHandler = async (req, res) => {
  try {
    const body = req.body;

    const useCase = new addTaskUseCase();
    const task = await useCase.execute(body);

    res.status(201).json({ message: "Task criada com sucesso!", task });
  } catch (err) {
    console.log("Erro ao adicionar nova task");
    res.status(400).json({
      message: "Failed adding new task",
      error: err instanceof Error ? err.message : err,
    });
  }
};

export const getAllTasks: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;

    const useCase = new getAllTasksUseCase();
    const tasks = await useCase.execute(userId);

    res.status(200).json({ tasks });
  } catch (err) {
    console.log("Erro ao pegar tasks");
    res.status(400).json({
      message: "Failed getting tasks",
      error: err instanceof Error ? err.message : err,
    });
  }
};
