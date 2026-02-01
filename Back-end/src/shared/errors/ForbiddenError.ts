import { AppError } from "./AppError";

export class ForbiddenError extends AppError {
  constructor(message = "Sem permissão") {
    super(message, 403);
  }
}
