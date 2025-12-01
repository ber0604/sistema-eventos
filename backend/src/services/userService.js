const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const logger = require("../config/logger");

class UserService {
  static async createUser(user) {
    logger.info({ action: "createUser_start", user: { email: user.email, role: user.role } });

    try {
      const { nome, telefone, email, senha, role } = user;

      const existing = await UserModel.findByEmail(email);
      if (existing) {
        logger.warn({ action: "createUser_exists", email });
        throw new Error("Usuário já existe");
      }

      let userRole = "user";
      if (role === "admin") {
        const adminExists = await UserModel.findByRole("admin");
        if (adminExists) {
          logger.warn({ action: "createUser_admin_exists" });
          throw new Error("Já existe um administrador cadastrado");
        }
        userRole = "admin";
      }

      const hashed = await bcrypt.hash(senha, 10);

      const id = await UserModel.create({
        nome,
        telefone,
        email,
        senha: hashed,
        role: userRole,
      });

      logger.info({ action: "createUser_success", id, email });
      return { message: "Usuário registrado com sucesso", id };
    } catch (error) {
      logger.error({ action: "createUser_error", error: error.message });
      throw error;
    }
  }

  static async loginUser({ email, senha }) {
    logger.info({ action: "loginUser_start", email });

    try {
      const user = await UserModel.findByEmail(email);
      if (!user) {
        logger.warn({ action: "loginUser_not_found", email });
        throw new Error("Usuário não encontrado");
      }

      const valid = await bcrypt.compare(senha, user.senha);
      if (!valid) {
        logger.warn({ action: "loginUser_invalid_password", email });
        throw new Error("Senha inválida");
      }

      const token = jwt.sign(
        { email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      logger.info({ action: "loginUser_success", email });
      return { token, user: { email: user.email, role: user.role } };
    } catch (error) {
      logger.error({ action: "loginUser_error", email, error: error.message });
      throw error;
    }
  }

  static async getUsers() {
    logger.info({ action: "getUsers_start" });

    try {
      const users = await UserModel.findAll();
      if (!users) {
        logger.warn({ action: "getUsers_empty" });
        throw new Error("Não possui voluntários cadastrados");
      }

      logger.info({ action: "getUsers_success", total: users.length });
      return users;
    } catch (error) {
      logger.error({ action: "getUsers_error", error: error.message });
      throw error;
    }
  }
}

module.exports = UserService;