import { prisma } from "../../lib/prisma";

export class getAllUsersUseCase {
  async execute() {
    return await prisma.user.findMany({});
  }
}
