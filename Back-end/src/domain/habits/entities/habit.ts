import { FrequencyType } from "../../../../generated/prisma/enums";
import { AppError } from "../../../shared/errors/AppError";

export const validateDaysOfWeek = (
  frequency: FrequencyType,
  daysOfWeek?: number[],
) => {
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
};
