const UserService = require("../services/userService");
const logger = require("../config/logger"); // importe seu logger Winston

class AuthController {
  /**
   * Registro de usuário
   */
  static async register(req, res) {
    logger.info("Requisição recebida: POST /register", {
      email: req.body.email,
      ip: req.ip
    });

    try {
      const result = await UserService.createUser(req.body);

      logger.info("Usuário registrado com sucesso", {
        id: result.id,
        email: req.body.email
      });

      return res.status(201).json(result);
    } catch (error) {
      logger.error("Erro ao registrar usuário", {
        email: req.body.email,
        error: error.message
      });

      return res.status(409).json({ message: error.message });
    }
  }

  /**
   * Consulta usuários
   */
  static async consultarUsuarios(req, res) {
    logger.info("Requisição recebida: GET /usuarios", { ip: req.ip });

    try {
      const result = await UserService.getUsers();

      logger.info("Usuários consultados com sucesso", {
        total: result.length
      });

      return res.status(200).json(result);
    } catch (error) {
      logger.error("Erro ao consultar usuários", {
        error: error.message
      });

      return res.status(409).json({ message: error.message });
    }
  }

  /**
   * Login de usuário
   */
  static async login(req, res) {
    logger.info("Requisição recebida: POST /login", {
      email: req.body.email,
      ip: req.ip
    });

    try {
      const result = await UserService.loginUser(req.body);

      logger.info("Login bem-sucedido", {
        email: result.user.email,
        role: result.user.role
      });

      return res.status(200).json(result); // retorna {token, user}
    } catch (error) {
      const status =
        error.message === "Usuário não encontrado" ||
        error.message === "Senha inválida"
          ? 401
          : 500;

      logger.error("Erro ao realizar login", {
        email: req.body.email,
        status,
        error: error.message
      });

      return res.status(status).json({ message: error.message });
    }
  }
}

module.exports = AuthController;