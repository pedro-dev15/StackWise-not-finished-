import { prisma } from "../lib/prisma";
import { TaskForCreating, TaskForUpdating } from "../types/tasks";

export class AddTaskUseCase {
  async execute(userId: string, body: TaskForCreating) {
    if (!body) throw new Error("Body não fornecido");

    const task = await prisma.task.create({
      data: {
        title: body.title,
        description: body.description,
        dueDate: body.dueDate,
        userId,
      },
    });

    if (!task) {
      throw new Error("Erro ao criar nova task");
    }

    return task;
  }
}

export class GetAllTasksUseCase {
  async execute(userId: string) {
    return await prisma.task.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}

export class UpdateTaskUseCase {
  async execute(userId: string, body: TaskForUpdating) {
    const taskExists = await prisma.task.findFirst({
      where: {
        id: body.id,
        userId,
      },
    });

    if (!taskExists) throw new Error("Id de task inválido");

    const updatedTask = await prisma.task.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        description: body.description,
        dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
      },
    });

    return updatedTask;
  }
}

export class DeleteTaskUseCase {
  async execute(userId: string, taskId: string) {
    const taskExists = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId,
      },
    });

    if (!taskExists) throw new Error("Id de task inválido");

    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }
}
