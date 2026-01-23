import { prisma } from "../lib/prisma";
import { TaskForCreating } from "../types/tasks";

export class addTaskUseCase {
  async execute(body: TaskForCreating) {
    if (!body) throw new Error("Body não fornecido");

    const userExists = await prisma.user.findUnique({
      where: {
        id: body.userId,
      },
    });

    if (!userExists) throw new Error("User doesn't exists");

    const task = await prisma.task.create({
      data: {
        title: body.title,
        description: body.description,
        dueDate: body.dueDate,
        completedAt: body.completedAt,
        userId: body.userId,
      },
    });

    if (!task) {
      throw new Error("Erro ao criar nova task");
    }

    return task;
  }
}

export class getAllTasksUseCase {
  async execute(userId: string) {
    if (!userId) throw new Error("UserId não fornecido!");

    return await prisma.task.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}
