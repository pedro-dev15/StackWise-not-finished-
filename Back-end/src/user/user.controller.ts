import { RequestHandler } from "express";
import { DeleteUserUseCase } from "../usecases/adminUseCases/deleteUser.usecase";
import { getAllUsersUseCase } from "../usecases/adminUseCases/getAllUsers.usecase";
import { getOneUserUseCase } from "../usecases/adminUseCases/getOneUser.usecase";
import { promoveUserUseCase } from "../usecases/adminUseCases/promoveUser.usecase";
import { demoteUserUseCase } from "../usecases/adminUseCases/demoteUser.usecase";

//admin routes
export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const useCase = new DeleteUserUseCase();
    const deletedUser = await useCase.execute(id);

    res
      .status(200)
      .json({ message: "Usúario deletado com sucesso!", deletedUser });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
};

export const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const useCase = new getAllUsersUseCase();
    const users = await useCase.execute();

    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ error: "Erro ao pegar usuários" });
  }
};

export const getOneUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const useCase = new getOneUserUseCase();
    const users = await useCase.execute(id);

    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ error: "Erro ao pegar usuários" });
  }
};

export const promoveUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const useCase = new promoveUserUseCase();
    const User = await useCase.execute(id);

    res
      .status(200)
      .json({ message: "Usúario promovido à admin com sucesso!", User });
  } catch (err) {
    res.status(500).json({ error: "Erro ao promover usuário" });
  }
};

export const demoteUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const useCase = new demoteUserUseCase();
    const User = await useCase.execute(id);

    res.status(200).json({ message: "Usúario promovido à user", User });
  } catch (err) {
    res.status(500).json({ error: "Erro ao promover usuário" });
  }
};
