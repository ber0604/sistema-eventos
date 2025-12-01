const request = require("supertest");
const app = require("../../app");

jest.mock("../../services/userService", () => ({
  createUser: jest.fn(),
  loginUser: jest.fn(),
  getUsers: jest.fn(),
}));

const UserService = require("../../services/userService");

describe("AUTH", () => {
  afterEach(() => jest.clearAllMocks());

  it("POST /users/register - sucesso", async () => {
    UserService.createUser.mockResolvedValue({
      message: "Usuário registrado com sucesso",
      id: 1,
    });

    const res = await request(app).post("/users/register").send({
      nome: "Bernardo",
      email: "bernardo@test.com",
      senha: "123",
    });

    expect(res.status).toBe(201);
    expect(res.body.id).toBe(1);
  });

  it("POST /users/register - erro", async () => {
    UserService.createUser.mockRejectedValue(new Error("Usuário já existe"));

    const res = await request(app).post("/users/register").send({
      nome: "Bernardo",
      email: "existe@test.com",
      senha: "123",
    });

    expect(res.status).toBe(409);
    expect(res.body.message).toBe("Usuário já existe");
  });

  it("POST /users/auth - sucesso", async () => {
    UserService.loginUser.mockResolvedValue({
      token: "fake-token",
      user: { email: "a@a.com", role: "user" },
    });

    const res = await request(app)
      .post("/users/auth")
      .send({ email: "a@a.com", senha: "123" });

    expect(res.status).toBe(200);
    expect(res.body.token).toBe("fake-token");
  });

  it("POST /users/auth - erro", async () => {
    UserService.loginUser.mockRejectedValue(
      new Error("Usuário não encontrado")
    );

    const res = await request(app)
      .post("/users/auth")
      .send({ email: "nao@existe.com", senha: "test" });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Usuário não encontrado");
  });
});
