import { RequestHandler } from "express";

export const none: RequestHandler = (req, res) => {
  res.send("Hello, the api is running!");
};

export const login: RequestHandler = async (req, res) => {};

export const register: RequestHandler = async (req, res) => {};
