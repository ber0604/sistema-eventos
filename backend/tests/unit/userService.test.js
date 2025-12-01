const UserService = require("../../src/services/userService");
const UserModel = require("../../src/models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

jest.mock("../src/models/userModel");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("UserService - createUser", () => {
  afterEach(() => jest.clearAllMocks());

  it("deve criar usuário com sucesso", async () => {
    UserModel.findByEmail.mockResolvedValue(null);
    UserModel.findByRole.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue("senhaHashFake");
    UserModel.create.mockResolvedValue(123);

    const result = await UserService.createUser({
      nome: "Teste",
      telefone: "9999-9999",
      email: "teste@teste.com",
      senha: "123",
      role: "user",
    });

    expect(result).toEqual({
      message: "Usuário registrado com sucesso",
      id: 123,
    });
  });

  it("deve lançar erro se o usuário já existir", async () => {
    UserModel.findByEmail.mockResolvedValue({ id: 1 });

    await expect(
      UserService.createUser({ email: "a@a.com", senha: "123" })
    ).rejects.toThrow("Usuário já existe");
  });

  it("deve lançar erro se tentar criar outro admin", async () => {
    UserModel.findByEmail.mockResolvedValue(null);
    UserModel.findByRole.mockResolvedValue({ id: 10 });

    await expect(
      UserService.createUser({
        nome: "Admin2",
        telefone: "0000",
        email: "admin@a.com",
        senha: "123",
        role: "admin",
      })
    ).rejects.toThrow("Já existe um administrador cadastrado");
  });
});

describe("UserService - loginUser", () => {
  afterEach(() => jest.clearAllMocks());

  // 🎯 SUCESSO
  it("deve fazer login com sucesso e retornar token", async () => {
    UserModel.findByEmail.mockResolvedValue({
      email: "teste@a.com",
      senha: "hashFake",
      role: "user",
    });

    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("tokenFake");

    const result = await UserService.loginUser({
      email: "teste@a.com",
      senha: "123",
    });

    expect(result).toEqual({
      token: "tokenFake",
      user: { email: "teste@a.com", role: "user" },
    });
  });

  it("deve dar erro se o usuário não existir", async () => {
    UserModel.findByEmail.mockResolvedValue(null);

    await expect(
      UserService.loginUser({ email: "x@x.com", senha: "123" })
    ).rejects.toThrow("Usuário não encontrado");
  });

  it("deve dar erro se a senha estiver errada", async () => {
    UserModel.findByEmail.mockResolvedValue({
      email: "a@a.com",
      senha: "hashFake",
      role: "user",
    });

    bcrypt.compare.mockResolvedValue(false);

    await expect(
      UserService.loginUser({ email: "a@a.com", senha: "123" })
    ).rejects.toThrow("Senha inválida");
  });
});

// --------------------------------------------------------
// GET USERS
// --------------------------------------------------------
describe("UserService - getUsers", () => {
  afterEach(() => jest.clearAllMocks());

  it("deve retornar lista de usuários", async () => {
    const usersFake = [{ id: 1, nome: "João" }];
    UserModel.findAll.mockResolvedValue(usersFake);

    const result = await UserService.getUsers();

    expect(result).toEqual(usersFake);
  });

  it("deve lançar erro se não houver usuários", async () => {
    UserModel.findAll.mockResolvedValue(null);

    await expect(UserService.getUsers()).rejects.toThrow(
      "Não possui voluntários cadastrados"
    );
  });
});
