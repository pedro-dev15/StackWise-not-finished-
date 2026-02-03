import { prisma } from "../../lib/prisma";

export class getOneUserUseCase {
  async execute(id: string) {
    return await prisma.user.findUnique({
      where: { id },
    });
  }
}
