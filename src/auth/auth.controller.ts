import { RequestHandler } from "express";
import { registerUseCase } from "../usecases/register.usecase";
import { loginUseCase } from "../usecases/login.usecase";

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
    const body = req.body;

    const token = await loginUseCase(body);

    res.status(200).json({ token: token });
  } catch {
    console.log("Erro ao fazer login");
    res.status(401).json({ message: "Failed login" });
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
