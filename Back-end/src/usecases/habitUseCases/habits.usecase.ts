import { prisma } from "../../lib/prisma";
import { HabitForCreating } from "../../types/tasks";
import { AppError } from "../../shared/errors/AppError";
import { FrequencyType } from "../../../generated/prisma/enums";
import { validateTimezone } from "../../shared/validators/validateTimezone";
import { validateDaysOfWeek } from "../../domain/habits/entities/habit";
import { ForbiddenError } from "../../shared/errors/ForbiddenError";
import { NotFoundError } from "../../shared/errors/NotFoundError";

export class AdicionarHabitoUseCase {
  async execute(body: HabitForCreating, userId: string) {
    if (!body.title?.trim()) throw new AppError("Título necessário");

    validateDaysOfWeek(body.frequency, body.daysOfWeek);

    validateTimezone(body.timezone);

    return prisma.habit.create({
      data: {
        title: body.title,
        description: body.description,
        frequency: body.frequency as FrequencyType,
        daysOfWeek: body.daysOfWeek,
        timezone: body.timezone,
        target: body.target,
        userId,
      },
    });
  }
}

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

export class AtualizarHabitoUseCase {
  async execute(body: HabitForCreating, userId: string, id: string) {
    const habitExists = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!habitExists) throw new NotFoundError("Hábito não encontrado");

    if (habitExists.userId !== userId) throw new ForbiddenError();

    validateDaysOfWeek(body.frequency, body.daysOfWeek);

    validateTimezone(body.timezone);

    return prisma.habit.update({
      where: {
        userId: userId,
        id,
      },
      data: {
        title: body.title,
        description: body.description,
        frequency: body.frequency as FrequencyType,
        daysOfWeek: body.daysOfWeek,
        timezone: body.timezone,
        target: body.target,
        userId,
      },
    });
  }
}

export class ApagarHabitoUseCase {
  async execute(userId: string, id: string) {
    const habitExists = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!habitExists) throw new NotFoundError("Hábito não encontrado");

    if (habitExists.userId !== userId) throw new ForbiddenError();

    return prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
