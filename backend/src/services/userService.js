const UserModel = require("../models/userModel");
const validateEmail = require("../utils/validateEmail");
const jwt = require("jsonwebtoken"); // Biblioteca para geração de tokens JWT
const bcrypt = require("bcryptjs"); // Biblioteca para criptografia de senhas

class UserService {
  static async createUser(user) {
    const { email, senha } = user;
    user.role = "user";
    const existing = await UserModel.findByEmail(email);
    if (existing) {
      throw new Error("Usuário já existe");
    }
    const hashed = await bcrypt.hash(senha, 10);
    user.senha = hashed;
    const id = await UserModel.create(user);
    return { message: "Usuário registrado com sucesso", id };
  }

  static async loginUser({ email, senha }) {
    // Busca o usuário pelo e-mail
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    // Verifica se a senha fornecida é válida
    const valid = await bcrypt.compare(senha, user.senha);
    if (!valid) {
      throw new Error("Senha inválida");
    }
    // Gera o token JWT
    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    // Retorna o token e o usuário para o controller
    return { token, user: { email: user.email, role: user.role } };
  }
}
module.exports = UserService;
