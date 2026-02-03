import { prisma } from "../../lib/prisma";

export class PegarHabitosUseCase {
  async execute(userId: string) {
    return prisma.habit.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}
