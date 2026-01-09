import { prisma } from "../lib/prisma";
import {
  generateRefreshToken,
  generateAcessToken,
  verifyRefreshToken,
} from "../infra/token/auth.token";
import { compareHash } from "../infra/crypto/bcrypt.auth";
import { getCrypto } from "../infra/crypto/crypto.auth";

export class RefreshTokenUseCase {
  async execute(oldToken: string) {
    const payload = verifyRefreshToken(oldToken);

    if (!payload || payload.type !== "refresh") {
      throw new Error("Token inválido");
    }

    return prisma.$transaction(async (tx) => {
      const storedToken = await tx.refreshToken.findUnique({
        where: { id: payload.sub },
      });

      if (
        !storedToken ||
        storedToken.revoked ||
        storedToken.expiresAt < new Date()
      ) {
        throw new Error("Refresh token inválido");
      }

      await tx.refreshToken.update({
        where: { id: storedToken.id },
        data: { revoked: true },
      });

      const newAccessToken = generateAcessToken(storedToken.userId);

      const temp = await tx.refreshToken.create({
        data: {
          userId: storedToken.userId,
          tokenHash: "temp",
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
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
