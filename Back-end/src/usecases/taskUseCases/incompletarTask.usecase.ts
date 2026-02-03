import { prisma } from "../../lib/prisma";
import { NotFoundError } from "../../shared/errors/NotFoundError";
import { ConflictError } from "../../shared/errors/ConflictError";
import { ForbiddenError } from "../../shared/errors/ForbiddenError";

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
