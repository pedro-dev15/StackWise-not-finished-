import { NotFoundError } from "../../shared/errors/NotFoundError";
import { prisma } from "../../lib/prisma";
import { ForbiddenError } from "../../shared/errors/ForbiddenError";

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
