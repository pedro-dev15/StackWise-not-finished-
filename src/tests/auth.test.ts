import request from "supertest";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";

import { registerUseCase } from "../usecases/register.usecase";
import { loginUseCase } from "../usecases/login.usecase";

vi.mock("../usecases/register.usecase", () => ({
  registerUseCase: vi.fn(),
}));

vi.mock("../usecases/login.usecase", () => ({
  loginUseCase: vi.fn(),
}));

const registerUseCaseMock = registerUseCase as unknown as Mock;
const loginUseCaseMock = loginUseCase as unknown as Mock;

describe("Auth API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NODE_ENV = "test";
    process.env.SECRET = "test-secret";
    process.env.DATABASE_URL = "postgresql://test:test@localhost:5432/test";
  });

  const getApp = async () => {
    const mod = await import("../server.js");
    return mod.app;
  };

  it("GET / should return health check", async () => {
    const app = await getApp();

    const res = await request(app).get("/");

    expect(res.status).toBe(200);
    expect(res.text).toContain("api is running");
  });

  it("POST /register should return success message", async () => {
    const app = await getApp();

    registerUseCaseMock.mockResolvedValueOnce({ id: 1 });

    const res = await request(app).post("/register").send({
      name: "Test User",
      email: "user@test.com",
      password: "123456",
    });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      message: "Usuário criado com sucesso!",
      userId: 1,
    });
  });

  it("POST /register should return 400 on failure", async () => {
    const app = await getApp();

    registerUseCaseMock.mockRejectedValueOnce(new Error("db error"));

    const res = await request(app).post("/register").send({
      name: "Test User",
      email: "user@test.com",
      password: "123456",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("POST /login should return token", async () => {
    const app = await getApp();

    loginUseCaseMock.mockResolvedValueOnce("token-123");

    const res = await request(app).post("/login").send({
      email: "user@test.com",
      password: "123456",
    });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ token: "token-123" });
  });

  it("POST /login should return 401 on failure", async () => {
    const app = await getApp();

    loginUseCaseMock.mockRejectedValueOnce(new Error("invalid credentials"));

    const res = await request(app).post("/login").send({
      email: "user@test.com",
      password: "wrong",
    });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });
});
