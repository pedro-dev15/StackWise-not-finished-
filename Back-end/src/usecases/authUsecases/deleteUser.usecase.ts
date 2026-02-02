import { prisma } from "../../lib/prisma";
import { AppError } from "../../shared/errors/AppError";

export class DeleteUserUseCase {
  async execute(id: string) {
    const userExists = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) throw new AppError("Usuário não existe");

    return await prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
