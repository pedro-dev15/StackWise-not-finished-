import request from "supertest";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { verifyToken } from "../infra/token/auth.token";

// mocks
vi.mock("../infra/token/jwt.token", () => ({
  verifyToken: vi.fn(),
}));

const prismaMock = {
  user: {
    findUnique: vi.fn(),
  },
};

vi.mock("../lib/prisma", () => ({
  prisma: prismaMock,
}));

const getApp = async () => {
  const mod = await import("../server");
  return mod.app;
};

describe("Auth API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NODE_ENV = "test";
  });

  it("GET / should return health check", async () => {
    const app = await getApp();
    const res = await request(app).get("/");

    expect(res.status).toBe(200);
    expect(res.text).toContain("Hello, the api is running!");
  });

  it("GET /profile should return 401 if token is missing", async () => {
    const app = await getApp();

    const res = await request(app).get("/profile");

    expect(res.status).toBe(401);
    expect(res.body).toMatchObject({
      error: "Token não fornecido",
    });
  });

  it("GET /profile should return 401 if token is invalid", async () => {
    const app = await getApp();
    (verifyToken as any).mockReturnValue(null);

    const res = await request(app)
      .get("/profile")
      .set("Authorization", "Bearer invalid-token");

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

  it("GET /profile should return 401 if user is not found", async () => {
    const app = await getApp();
    (verifyToken as any).mockReturnValue("user@email.com");
    prismaMock.user.findUnique.mockResolvedValue(null);

    const res = await request(app)
      .get("/profile")
      .set("Authorization", "Bearer valid-token");

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

  it("GET /profile should return user profile when authenticated", async () => {
    const app = await getApp();

    (verifyToken as any).mockReturnValue("user@email.com");
    prismaMock.user.findUnique.mockResolvedValue({
      id: 1,
      email: "user@email.com",
      name: "Test User",
      createdAt: new Date(),
    });

    const res = await request(app)
      .get("/profile")
      .set("Authorization", "Bearer valid-token");

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      message: "Perfil do usuário",
      user: {
        id: 1,
        email: "user@email.com",
        name: "Test User",
      },
    });
  });
});
