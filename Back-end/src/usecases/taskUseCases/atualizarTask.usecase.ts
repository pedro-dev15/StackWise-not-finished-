import { prisma } from "../../lib/prisma";
import { NotFoundError } from "../../shared/errors/NotFoundError";
import { TaskForUpdating } from "../../types/tasks";
import { ForbiddenError } from "../../shared/errors/ForbiddenError";

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
