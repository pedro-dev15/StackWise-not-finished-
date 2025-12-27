import { compareHash } from "../infra/crypto/bcrypt.auth";
import { generateToken } from "../infra/token/jwt.token";
import { prisma } from "../lib/prisma";

interface loginUseCaseInput {
  email: string;
  password: string;
}

export const loginUseCase = async (
  body: loginUseCaseInput
): Promise<string> => {
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await compareHash(body.password, user.password);
  if (!isMatch) {
    throw new Error("Wrong credencials");
  }

  const token = generateToken(body.email);

  if (!token) {
    throw new Error("Token not provided");
  }
  return token;
};
