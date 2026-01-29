import { prisma } from "../lib/prisma";
import { HabitForCreating } from "../types/tasks";
import { AppError } from "../errors/AppError";
import { FrequencyType } from "../../generated/prisma/enums";

export class AdicionarHabitoUseCase {
  async execute(body: HabitForCreating, userId: string) {
    if (!body.title?.trim()) throw new AppError("Título necessário");

    this.validateDaysOfWeek(body.frequency, body.daysOfWeek);

    this.validateTimezone(body.timezone);

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

  validateDaysOfWeek(frequency: FrequencyType, daysOfWeek?: number[]) {
    if (frequency === FrequencyType.DAILY) {
      if (daysOfWeek?.length) throw new AppError("DAILY não aceita daysOfWeek");
      return;
    }

    if (frequency === FrequencyType.WEEKLY) {
      if (!daysOfWeek || daysOfWeek.length === 0)
        throw new AppError("WEEKLY exige daysOfWeek");

      const unique = new Set(daysOfWeek);

      if (unique.size !== daysOfWeek.length)
        throw new AppError("Dias duplicados");

      for (const day of daysOfWeek) {
        if (day < 0 || day > 6) throw new AppError("Dia da semana inválido");
      }

      daysOfWeek.sort((a, b) => a - b);
    }
  }

  validateTimezone(timezone: string) {
    try {
      Intl.DateTimeFormat("en-US", { timeZone: timezone });
    } catch {
      throw new AppError("Timezone inválido");
    }
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
