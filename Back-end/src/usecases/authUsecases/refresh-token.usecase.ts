import { prisma } from "../../lib/prisma";
import {
  generateRefreshToken,
  generateAcessToken,
  verifyRefreshToken,
} from "../../infra/token/auth.token";
import { getCrypto } from "../../infra/crypto/crypto.auth";
import { AppError } from "../../shared/errors/AppError";
import { NotFoundError } from "../../shared/errors/NotFoundError";

export class RefreshTokenUseCase {
  async execute(oldToken: string) {
    const payload = verifyRefreshToken(oldToken);

    const incomingHash = getCrypto(oldToken);

    if (!payload || payload.type !== "refresh") {
      throw new AppError("Token inválido");
    }

    return prisma.$transaction(async (tx) => {
      const storedToken = await tx.refreshToken.findUnique({
        where: { id: payload.sub },
      });

      if (
        !storedToken ||
        storedToken.revoked ||
        storedToken.expiresAt < new Date() ||
        storedToken.tokenHash !== incomingHash
      ) {
        throw new AppError("Refresh token inválido");
      }

      const user = await prisma.user.findUnique({
        where: {
          id: storedToken.userId,
        },
        select: {
          role: true,
          id: true,
        },
      });

      if (!user) throw new NotFoundError();

      await tx.refreshToken.update({
        where: { id: storedToken.id },
        data: { revoked: true },
      });

      const newAccessToken = generateAcessToken(user.id, user.role);

      const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

      const temp = await tx.refreshToken.create({
        data: {
          userId: storedToken.userId,
          tokenHash: "temp",
          expiresAt,
        },
      });

      const newRefreshToken = generateRefreshToken(temp.id);
      const newRefreshTokenHash = getCrypto(newRefreshToken);

      await tx.refreshToken.update({
        where: {
          id: temp.id,
        },
        data: {
          tokenHash: newRefreshTokenHash,
        },
      });

      return {
        newAccessToken: newAccessToken,
        newRefreshToken: newRefreshToken,
      };
    });
  }
}
