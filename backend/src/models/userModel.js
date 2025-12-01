const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

/**
 * Classe responsável por interagir com a tabela de usuários no banco de dados via Prisma.
 */
class UserModel {
  /**
   * Retorna todos os usuários cadastrados no banco de dados.
   * @async
   * @returns {Promise<Array<Object>>} Uma lista de objetos representando os usuários.
   */
  static async findAll() {
    return await prisma.usuario.findMany();
  }

  /**
   * Busca um usuário pelo e-mail.
   * @async
   * @param {string} email - E-mail do usuário.
   * @returns {Promise<Object|null>} Objeto do usuário encontrado ou null se não existir.
   */
  static async findByEmail(email) {
    const user = await prisma.usuario.findUnique({
      where: { email },
    });
    return user || null;
  }

  /**
   * Busca um usuário pelo role.
   * @async
   * @param {string} role - Role do usuário (ex: 'user', 'admin').
   * @returns {Promise<Object|null>} Objeto do usuário encontrado ou null se não existir.
   */
  static async findByRole(role) {
    const user = await prisma.usuario.findFirst({
      where: { role },
    });
    return user || null;
  }

  /**
   * Cria um novo usuário no banco de dados.
   * @async
   * @param {Object} user - Dados do usuário a ser criado.
   * @param {string} user.nome - Nome do usuário.
   * @param {string} user.telefone - Telefone do usuário.
   * @param {string} user.email - E-mail do usuário.
   * @param {string} user.senha - Senha do usuário (deve estar hashada).
   * @param {string} user.role - Role do usuário (ex: 'user', 'admin').
   * @returns {Promise<number>} ID do usuário criado.
   */
  static async create(user) {
    const { nome, telefone, email, senha, role } = user;

    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        telefone,
        email,
        senha,
        role,
      },
    });

    return novoUsuario.id; // Prisma retorna o objeto criado, incluindo o ID
  }
}

module.exports = UserModel;