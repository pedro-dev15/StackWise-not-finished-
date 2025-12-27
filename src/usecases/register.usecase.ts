import { getHash } from "../infra/crypto/bcrypt.auth";
import { prisma } from "../lib/prisma";
import { User } from "../../generated/prisma/client";

interface registerUseCaseInput {
  name: string;
  email: string;
  password: string;
}

export const registerUseCase = async (
  data: registerUseCaseInput
): Promise<Omit<User, "password">> => {
  const hashPassword = await getHash(data.password);

  if (!hashPassword) {
    throw new Error("Hash não fornecido");
  }

  const user = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      password: hashPassword,
    },
  });

  if (!user) {
    throw new Error("Ocorreu um erro ao criar um usuário");
  }
  return user;
};
