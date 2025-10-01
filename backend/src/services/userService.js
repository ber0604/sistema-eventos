const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken"); // Biblioteca para geração de tokens JWT
const bcrypt = require("bcryptjs"); // Biblioteca para criptografia de senhas

/**
 * Classe responsável pela lógica de negócio relacionada aos usuários.
 */
class UserService {
  /**
   * Cria um novo usuário no banco de dados.
   * @async
   * @param {Object} user - Dados do usuário a ser criado.
   * @param {string} user.email - E-mail do usuário.
   * @param {string} user.senha - Senha do usuário.
   * @param {string} [user.role] - Role do usuário ('user' ou 'admin').
   * @returns {Promise<Object>} Objeto com mensagem de sucesso e o ID do usuário criado.
   * @throws {Error} Se o usuário já existir ou se já houver um admin cadastrado.
   */
  static async createUser(user) {
    const { nome, telefone, email, senha, role } = user;

    const existing = await UserModel.findByEmail(email);
    if (existing) {
      throw new Error("Usuário já existe");
    }

    let userRole = "user";
    if (role === "admin") {
      const adminExists = await UserModel.findByRole("admin");
      if (adminExists) {
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

    return { message: "Usuário registrado com sucesso", id };
  }

  /**
   * Faz login de um usuário, verificando e-mail e senha.
   * @async
   * @param {Object} credentials - Credenciais do usuário.
   * @param {string} credentials.email - E-mail do usuário.
   * @param {string} credentials.senha - Senha do usuário.
   * @returns {Promise<Object>} Objeto contendo o token JWT e dados do usuário.
   * @throws {Error} Se o usuário não for encontrado ou a senha for inválida.
   */
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
    // Retorna o token e o usuário
    return { token, user: { email: user.email, role: user.role } };
  }

  /**
   * Busca todos os usuários cadastrados no banco de dados.
   *
   * @async
   * @function getUsers
   * @returns {Promise<Array<Object>>} Lista de usuários cadastrados no sistema.
   * Cada objeto da lista contém os dados do usuário (id, nome, telefone, email, role, etc).
   * @throws {Error} Se não houver usuários cadastrados.
   */
  static async getUsers() {
    const users = await UserModel.findAll();
    if (!users) {
      throw new Error("Não possui voluntários cadastrados");
    }    
    return users;
  }
}

module.exports = UserService;
