import { RequestHandler } from "express";
import {
  AddTaskUseCase,
  CompleteTaskUseCase,
  DeleteTaskUseCase,
  GetAllTasksUseCase,
  UncompleteTaskUseCase,
  UpdateTaskUseCase,
} from "../usecases/taskUseCases/tasks.usecase";
import { AppError } from "../shared/errors/AppError";

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
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        message: err.message,
      });
    }

    console.error("Erro ao adicionar task", err);
    return res.status(500).json({
      message: "Erro interno",
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
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        message: err.message,
      });
    }

    console.error("Erro ao pegar tasks", err);
    return res.status(500).json({
      message: "Erro interno",
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
    const { id } = req.params;

    const useCase = new UpdateTaskUseCase();
    const newTask = await useCase.execute(user.id, body, id);

    res.status(200).json({ message: "Task alterada com sucesso", newTask });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        message: err.message,
      });
    }

    console.error("Erro ao atualizar task", err);
    return res.status(500).json({
      message: "Erro interno",
    });
  }
};

export const deleteTask: RequestHandler = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: "NÃ£o autorizado" });
    }

    const { id } = req.params;

    const usecase = new DeleteTaskUseCase();
    await usecase.execute(user.id, id);

    res.status(204).json({ message: "Task deletada com sucesso", id });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        message: err.message,
      });
    }

    console.error("Erro ao deletar task", err);
    return res.status(500).json({
      message: "Erro interno",
    });
  }
};

export const completeTask: RequestHandler = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: "NÃ£o autorizado" });
    }

    const { id } = req.params;

    const useCase = new CompleteTaskUseCase();
    const newTask = await useCase.execute(user.id, id);

    res.status(200).json({ message: "Tarefa concluida com sucesso!", newTask });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        message: err.message,
      });
    }

    console.error("Erro ao completar task", err);
    return res.status(500).json({
      message: "Erro interno",
    });
  }
};

export const uncompleteTask: RequestHandler = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: "NÃ£o autorizado" });
    }

    const { id } = req.params;

    const useCase = new UncompleteTaskUseCase();
    const newTask = await useCase.execute(user.id, id);

    res
      .status(200)
      .json({ message: "Tarefa incompleta com sucesso!", newTask });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        message: err.message,
      });
    }

    console.error("Erro ao incompletar task", err);
    return res.status(500).json({
      message: "Erro interno",
    });
  }
};
