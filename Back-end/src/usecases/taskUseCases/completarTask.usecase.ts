import { prisma } from "../../lib/prisma";
import { NotFoundError } from "../../shared/errors/NotFoundError";
import { ConflictError } from "../../shared/errors/ConflictError";
import { ForbiddenError } from "../../shared/errors/ForbiddenError";

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
