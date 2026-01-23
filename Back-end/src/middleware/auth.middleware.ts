import { RequestHandler } from "express";
import { verifyAcessToken } from "../infra/token/auth.token";
import { prisma } from "../lib/prisma";

export const authMiddleware: RequestHandler = async (req, res, next) => {
  const header = req.headers["authorization"];

  if (!header) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const parts = header.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ error: "Token mal formatado" });
  }

  const token = parts[1];

  try {
    const decoded = verifyAcessToken(token);
    if (!decoded) {
      return res.status(401).json({ message: "Token expirado ou inválido" });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.sub,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    req.user = user;
    next();
  } catch (err) {}
};
