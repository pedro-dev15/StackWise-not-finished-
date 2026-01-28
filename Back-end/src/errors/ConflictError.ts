import { AppError } from "./AppError";

export class ConflictError extends AppError {
  constructor(message = "Conflito de estado") {
    super(message, 409);
  }
}
