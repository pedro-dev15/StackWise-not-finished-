import { AppError } from "../errors/AppError";
export const validateTimezone = (timezone: string) => {
  try {
    Intl.DateTimeFormat("en-US", { timeZone: timezone });
  } catch {
    throw new AppError("Timezone inválido");
  }
};
