import { prisma } from "../../lib/prisma";
import { HabitForCreating } from "../../types/tasks";
import { AppError } from "../../shared/errors/AppError";
import { FrequencyType } from "../../../generated/prisma/enums";
import { validateTimezone } from "../../shared/validators/validateTimezone";
import { validateDaysOfWeek } from "../../domain/habits/entities/habit";

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
