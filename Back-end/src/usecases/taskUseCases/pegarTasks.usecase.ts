import { prisma } from "../../lib/prisma";
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
