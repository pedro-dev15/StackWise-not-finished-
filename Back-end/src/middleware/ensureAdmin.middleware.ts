import { RequestHandler } from "express";
import { ForbiddenError } from "../shared/errors/ForbiddenError";

export const ensureAdmin: RequestHandler = (req, res, next) => {
  if (!req.user) {
    throw new ForbiddenError("Não autenticado");
  }

  if (req.user.role !== "ADMIN") {
    throw new ForbiddenError("Acesso restrito a administradores");
  }

  next();
};
