import { AppError } from "../../shared/errors/AppError";
import { prisma } from "../../lib/prisma";
import { TaskForCreating } from "../../types/tasks";

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
