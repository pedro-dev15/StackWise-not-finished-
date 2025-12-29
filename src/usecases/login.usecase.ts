import { compareHash, getHash } from "../infra/crypto/bcrypt.auth";
import {
  generateAcessToken,
  generateRefreshToken,
} from "../infra/token/auth.token";
import { prisma } from "../lib/prisma";

export class LoginUseCase {
  async execute(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    const isMatch = await compareHash(password, user.password);
    if (!isMatch) {
      throw new Error("Credenciais inválidas");
    }

    const accessToken = generateAcessToken(user.id);

    const refreshToken = generateRefreshToken(user.id);
    const refreshTokenHash = getHash(refreshToken);

    await prisma.refreshToken.create({
      data: {
        tokenHash: await refreshTokenHash,
        userId: user.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      },
    });

    return { accessToken, refreshToken };
  }
}
