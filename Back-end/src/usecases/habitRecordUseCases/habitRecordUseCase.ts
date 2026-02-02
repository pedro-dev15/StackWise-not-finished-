import { AppError } from "../../shared/errors/AppError";
import { ForbiddenError } from "../../shared/errors/ForbiddenError";
import { NotFoundError } from "../../shared/errors/NotFoundError";
import { prisma } from "../../lib/prisma";
import { localDateToUtcStartOfDay } from "../../shared/date/localTimeToUTC";
import { toDate } from "date-fns-tz";
import { Prisma } from "../../../generated/prisma/client";

export class CheckInUseCase {
  async execute(habitId: string, userId: string) {
    if (!habitId) throw new AppError("Id de hábito necessário");

    const habitExists = await prisma.habit.findUnique({
      where: {
        id: habitId,
      },
    });

    if (!habitExists) throw new NotFoundError("Hábito não encontrado");

    if (habitExists.userId !== userId) throw new ForbiddenError();

    const userNow = toDate(new Date(), { timeZone: habitExists.timezone });

    const date = localDateToUtcStartOfDay(userNow, habitExists.timezone);
    try {
      return await prisma.habitRecord.create({
        data: {
          date,
          habitId,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new AppError(
          "Hábito já foi concluído nesse dia",
          409, // Conflict
        );
      }

      throw error;
    }
  }
}
