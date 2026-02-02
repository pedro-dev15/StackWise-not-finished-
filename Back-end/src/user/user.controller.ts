import { RequestHandler } from "express";
import { DeleteUserUseCase } from "../usecases/authUsecases/deleteUser.usecase";
import { getAllUsersUseCase } from "../usecases/authUsecases/getAllUsers.usecase";
import { getOneUserUseCase } from "../usecases/authUsecases/getOneUser.usecase";

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
