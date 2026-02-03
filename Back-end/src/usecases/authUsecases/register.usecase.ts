import { getHash } from "../../infra/crypto/bcrypt.auth";
import { prisma } from "../../lib/prisma";
import { User } from "../../../generated/prisma/client";
import { AppError } from "../../shared/errors/AppError";

interface registerUseCaseInput {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  async execute(data: registerUseCaseInput): Promise<Omit<User, "password">> {
    const hashPassword = await getHash(data.password);

    if (!hashPassword) {
      throw new AppError("Hash não fornecido");
    }

    const userExists = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (userExists) {
      throw new AppError("Usuário já existe");
    }

    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashPassword,
      },
    });

    return user;
  }
}
