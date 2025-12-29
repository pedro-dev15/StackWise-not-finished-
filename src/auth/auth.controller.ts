import { RequestHandler } from "express";
import { registerUseCase } from "../usecases/register.usecase";
import { LoginUseCase } from "../usecases/login.usecase";
import { RefreshTokenUseCase } from "../usecases/refresh-token.usecase";

export const none: RequestHandler = (req, res) => {
  res.send("Hello, the api is running!");
};

export const register: RequestHandler = async (req, res) => {
  try {
    const body = req.body;

    const user = await registerUseCase(body);

    res.status(201).json({
      message: "Usuário criado com sucesso!",
      userId: user.id,
    });
  } catch (err: any) {
    console.log("Erro ao fazer registro");
    res.status(400).json({ message: "Failed registring", error: err.message });
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const useCase = new LoginUseCase();
    const tokens = await useCase.execute(email, password);

    res.status(200).json({ tokens: tokens });
  } catch (err) {
    console.log("Erro ao fazer login");
    res.status(401).json({ message: "Failed login", err });
  }
};

export const profile: RequestHandler = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: "NÃ£o autorizado" });
  }

  res.status(200).json({
    message: "Perfil do usuário",
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    },
  });
};

export const refresh: RequestHandler = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw new Error("Refresh token não existe");
    }

    const useCase = new RefreshTokenUseCase();
    const tokens = await useCase.execute(refreshToken);

    res.status(200).json(tokens);
  } catch (err) {
    res.status(401).json({ error: err });
  }
};
