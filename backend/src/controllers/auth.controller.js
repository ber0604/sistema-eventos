const UserService = require("../services/userService");

/**
 * Controlador responsável por lidar com requisições de autenticação (registro e login de usuários).
 */
class AuthController {
  /**
   * Trata o registro de um novo usuário.
   * @async
   * @param {import("express").Request} req - Objeto da requisição HTTP, com `body` contendo os dados do usuário.
   * @param {import("express").Response} res - Objeto da resposta HTTP.
   * @returns {Promise<import("express").Response>} Resposta HTTP com status 201 e dados do usuário criado ou 409 em caso de conflito.
   */
  static async register(req, res) {
    try {
      const result = await UserService.createUser(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(409).json({ message: error.message });
    }
  }

  /**
   * Trata a consulta de usuários.
   * @async
   * @param {import("express").Request} req - Objeto da requisição HTTP, com `body` contendo os dados do usuário.
   * @param {import("express").Response} res - Objeto da resposta HTTP.
   * @returns {Promise<import("express").Response>} Resposta HTTP com status 201 e dados do usuário criado ou 409 em caso de conflito.
   */
  static async consultarUsuarios(req, res) {
    try {
      const result = await UserService.getUsers();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(409).json({ message: error.message });
    }
  }

  /**
   * Trata o login de um usuário existente.
   * @async
   * @param {import("express").Request} req - Objeto da requisição HTTP, com `body` contendo `email` e `senha`.
   * @param {import("express").Response} res - Objeto da resposta HTTP.
   * @returns {Promise<import("express").Response>} Resposta HTTP com status 200 e objeto `{ token, user }` em caso de sucesso, ou 401/500 em caso de erro.
   */
  static async login(req, res) {
    try {
      const result = await UserService.loginUser(req.body);
      return res.status(200).json(result); // envia { token, user }
    } catch (error) {
      const status =
        error.message === "Usuário não encontrado" ||
        error.message === "Senha inválida"
          ? 401
          : 500;
      return res.status(status).json({ message: error.message });
    }
  }
}

module.exports = AuthController;
