import { RequestHandler } from "express";
import { RegisterUseCase } from "../usecases/register.usecase";
import { LoginUseCase } from "../usecases/login.usecase";
import { RefreshTokenUseCase } from "../usecases/refresh-token.usecase";
import { LogoutUseCase } from "../usecases/logout.usecase";

export const none: RequestHandler = (req, res) => {
  res.send("Hello, the api is running!");
};

export const register: RequestHandler = async (req, res) => {
  try {
    const body = req.body;

    const useCase = new RegisterUseCase();
    const user = await useCase.execute(body);

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

    res
      .cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        path: "/",
      })
      .status(200)
      .json({ AccessToken: tokens.accessToken });
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
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token ausente" });
    }

    const useCase = new RefreshTokenUseCase();
    const tokens = await useCase.execute(refreshToken);

    res
      .cookie("refreshToken", tokens.newRefreshToken, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .status(201)
      .json({ accessToken: tokens.newAccessToken });
  } catch (err) {
    res
      .status(401)
      .json({
        error: "Refresh token inválido",
        err: err instanceof Error ? err.message : err,
      });
  }
};

export const logout: RequestHandler = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(200).json({ error: "Refresh token ausente" });
    }

    const useCase = new LogoutUseCase();
    await useCase.execute(refreshToken);

    res
      .clearCookie("refreshToken", { httpOnly: true, sameSite: "strict" })
      .status(200)
      .json({ message: "Logout feito com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao efetuar logout" });
  }
};
