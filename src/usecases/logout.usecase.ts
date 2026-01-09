import { getCrypto } from "../infra/crypto/crypto.auth";
import { prisma } from "../lib/prisma";

export class LogoutUseCase {
  async execute(refreshToken: string) {
    if (!refreshToken) {
      return;
    }
    const refreshTokenHash = getCrypto(refreshToken);

    const storedToken = await prisma.refreshToken.findUnique({
      where: {
        tokenHash: refreshTokenHash,
      },
    });

    if (!storedToken || storedToken.revoked) {
      return;
    }

    await prisma.refreshToken.update({
      where: {
        id: storedToken.id,
      },
      data: {
        revoked: true,
      },
    });
  }
}
