import { prisma } from "../../lib/prisma";
import { ForbiddenError } from "../../shared/errors/ForbiddenError";
import { NotFoundError } from "../../shared/errors/NotFoundError";

export class ApagarHabitoUseCase {
  async execute(userId: string, id: string) {
    const habitExists = await prisma.habit.findUnique({
      where: {
        id,
      },
    });

    if (!habitExists) throw new NotFoundError("Hábito não encontrado");

    if (habitExists.userId !== userId) throw new ForbiddenError();

    return prisma.habit.delete({
      where: {
        id,
      },
    });
  }
}
