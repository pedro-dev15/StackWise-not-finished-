import { prisma } from "../lib/prisma";
import { TaskForCreating, TaskForUpdating } from "../types/tasks";

export class AddTaskUseCase {
  async execute(userId: string, body: TaskForCreating) {
    if (!body.title?.trim) throw new Error("Título necessário");
    const task = await prisma.task.create({
      data: {
        title: body.title,
        description: body.description,
        dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
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
  async execute(userId: string, body: TaskForUpdating, id: string) {
    const taskExists = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!taskExists) throw new Error("Id de task inválido");

    if (taskExists.userId !== userId) throw new Error("Sem permissão");

    const updatedTask = await prisma.task.update({
      where: {
        id: id,
      },
      data: {
        title: body.title ?? taskExists.title,
        description: body.description ?? taskExists.description,
        dueDate:
          body.dueDate !== undefined
            ? body.dueDate === null
              ? null
              : new Date(body.dueDate)
            : taskExists.dueDate,
      },
    });

    return updatedTask;
  }
}

export class DeleteTaskUseCase {
  async execute(userId: string, taskId: string) {
    const taskExists = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!taskExists) throw new Error("Id de task inválido");

    if (taskExists.userId !== userId) throw new Error("Sem permissão");

    return await prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }
}

export class CompleteTaskUseCase {
  async execute(userId: string, taskId: string) {
    const taskExists = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!taskExists) throw new Error("Id de task inválido");

    if (taskExists.userId !== userId) throw new Error("Sem permissão");

    if (taskExists.status !== "PENDING" && taskExists.status !== "EXPIRED") {
      throw new Error("Task não pode ser concluída");
    }

    const now = new Date();

    const isOverdue =
      taskExists.status === "EXPIRED" ||
      (taskExists.dueDate && taskExists.dueDate < now);

    const status = isOverdue ? "OVERDUE" : "COMPLETED";

    return prisma.task.update({
      where: { id: taskId },
      data: {
        completedAt: now,
        status,
      },
    });
  }
}
