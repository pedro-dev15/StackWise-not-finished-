import { AppError } from "../../shared/errors/AppError";
import { ConflictError } from "../../shared/errors/ConflictError";
import { ForbiddenError } from "../../shared/errors/ForbiddenError";
import { NotFoundError } from "../../shared/errors/NotFoundError";
import { prisma } from "../../lib/prisma";
import { TaskForCreating, TaskForUpdating } from "../../types/tasks";

export class AddTaskUseCase {
  async execute(userId: string, body: TaskForCreating) {
    if (!body.title?.trim()) throw new AppError("Título necessário");
    return prisma.task.create({
      data: {
        title: body.title,
        description: body.description,
        dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
        userId,
      },
    });
  }
}

export class GetAllTasksUseCase {
  async execute(userId: string) {
    return prisma.task.findMany({
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

    if (!taskExists) throw new NotFoundError("Task não encontrada");

    if (taskExists.userId !== userId) throw new ForbiddenError();

    return prisma.task.update({
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
  }
}

export class DeleteTaskUseCase {
  async execute(userId: string, taskId: string) {
    const taskExists = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!taskExists) throw new NotFoundError("Task não encontrada");

    if (taskExists.userId !== userId) throw new ForbiddenError();

    return prisma.task.delete({
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

    if (!taskExists) throw new NotFoundError("Task não encontrada");

    if (taskExists.userId !== userId) throw new ForbiddenError();

    if (taskExists.status !== "PENDING" && taskExists.status !== "EXPIRED") {
      throw new ConflictError("Task não pode ser concluída");
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

export class UncompleteTaskUseCase {
  async execute(userId: string, taskId: string) {
    const taskExists = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!taskExists) throw new NotFoundError("Task não encontrada");

    if (taskExists.userId !== userId) throw new ForbiddenError();

    if (taskExists.status !== "COMPLETED" && taskExists.status !== "OVERDUE") {
      throw new ConflictError("Task não pode ser incompleta");
    }

    const status = taskExists.status === "OVERDUE" ? "PENDING" : "EXPIRED";

    return prisma.task.update({
      where: { id: taskId },
      data: {
        completedAt: null,
        status,
      },
    });
  }
}
