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

    const temp = await prisma.refreshToken.create({
      data: {
        tokenHash: "temp",
        userId: user.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      },
    });

    const refreshToken = generateRefreshToken(temp.id);
    const refreshTokenHash = await getHash(refreshToken);

    await prisma.refreshToken.update({
      where: {
        id: temp.id,
      },
      data: {
        tokenHash: refreshTokenHash,
      },
    });

    return { accessToken, refreshToken };
  }
}
