import { RequestHandler } from "express";
import {
  AddTaskUseCase,
  DeleteTaskUseCase,
  GetAllTasksUseCase,
  UpdateTaskUseCase,
} from "../usecases/tasks.usecase";

export const addTask: RequestHandler = async (req, res) => {
  try {
    const body = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: "NÃ£o autorizado" });
    }

    const useCase = new AddTaskUseCase();
    const task = await useCase.execute(user.id, body);

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
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: "NÃ£o autorizado" });
    }

    const useCase = new GetAllTasksUseCase();
    const tasks = await useCase.execute(user.id);

    res.status(200).json({ tasks });
  } catch (err) {
    console.log("Erro ao pegar tasks");
    res.status(400).json({
      message: "Failed getting tasks",
      error: err instanceof Error ? err.message : err,
    });
  }
};

export const updateTask: RequestHandler = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: "NÃ£o autorizado" });
    }

    const body = req.body;

    const useCase = new UpdateTaskUseCase();
    const newTask = await useCase.execute(user.id, body);

    res.status(200).json({ message: "Task alterada com sucesso", newTask });
  } catch (err) {
    console.log("Erro ao fazer update em uma task");
    res.status(400).json({
      message: "Failed updating task",
      error: err instanceof Error ? err.message : err,
    });
  }
};

export const deleteTask: RequestHandler = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: "NÃ£o autorizado" });
    }

    const { id } = req.body;

    const usecase = new DeleteTaskUseCase();
    await usecase.execute(user.id, id);

    res.status(200).json({ message: "Task deletada com sucesso", id });
  } catch (err) {
    console.log("Erro ao deletar uma task");
    res.status(400).json({
      message: "Failed deleting task",
      error: err instanceof Error ? err.message : err,
    });
  }
};
