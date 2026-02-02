import { FrequencyType } from "../../../../generated/prisma/enums";
import { AppError } from "../../../shared/errors/AppError";

const isValidDayOfWeek = (day: number): boolean => {
  return Number.isInteger(day) && day >= 0 && day <= 6;
};

export const validateDaysOfWeek = (
  frequency: FrequencyType,
  daysOfWeek?: number[],
) => {
  if (frequency === FrequencyType.DAILY) {
    if (daysOfWeek?.length) throw new AppError("DAILY não aceita daysOfWeek");
    return;
  }

  // Qualquer outro frequency que receber daysOfWeek deve ser validado
  if (!daysOfWeek || daysOfWeek.length === 0) {
    throw new AppError("daysOfWeek é obrigatório");
  }

  // Validação de valores
  for (const day of daysOfWeek) {
    if (!isValidDayOfWeek(day)) {
      throw new AppError(
        "Dia da semana inválido (use valores inteiros entre 0 e 6)",
      );
    }
  }

  // Validação de duplicados
  const uniqueDays = new Set(daysOfWeek);
  if (uniqueDays.size !== daysOfWeek.length) {
    throw new AppError("daysOfWeek não pode conter dias duplicados");
  }

  daysOfWeek.sort((a, b) => a - b);
};
