import { prisma } from "../lib/prisma";
import {
  generateRefreshToken,
  generateAcessToken,
  verifyRefreshToken,
} from "../infra/token/auth.token";
import { getHash, compareHash } from "../infra/crypto/bcrypt.auth";

export class RefreshTokenUseCase {
  async execute(oldToken: string) {
    const payload = verifyRefreshToken(oldToken);

    if (!payload || payload.type !== "refresh") {
      throw new Error("Token inválido");
    }

    const storedToken = await prisma.refreshToken.findUnique({
      where: { id: payload.sub },
    });

    if (
      !storedToken ||
      storedToken.revoked ||
      storedToken.expiresAt < new Date()
    ) {
      throw new Error("Refresh token inválido");
    }

    const isValid = await compareHash(oldToken, storedToken.tokenHash);
    if (!isValid) {
      throw new Error("Refresh token inválido");
    }

    await prisma.refreshToken.update({
      where: { id: storedToken.id },
      data: { revoked: true },
    });

    const newRefreshToken = generateRefreshToken(storedToken.userId);
    const newRefreshTokenHash = await getHash(newRefreshToken);

    const newAccessToken = generateAcessToken(storedToken.userId);

    await prisma.refreshToken.create({
      data: {
        userId: storedToken.userId,
        tokenHash: newRefreshTokenHash,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      },
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
