const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

/**
 * Classe responsável por interagir com a tabela de eventos no banco de dados via Prisma.
 */
class EventoModel {
  /**
   * Busca todos os eventos cadastrados no banco de dados.
   * @async
   * @returns {Promise<Array<Object>>} Uma lista de objetos representando os eventos.
   */
  static async findAll() {
    return await prisma.evento.findMany();
  }

  /**
   * Exclui um evento pelo ID no banco de dados.
   * @async
   * @param {number} id - ID do evento a ser excluído.
   * @returns {Promise<boolean>} Retorna true se um evento foi excluído, false caso não exista.
   */
  static async delete(id) {
    try {
      await prisma.evento.delete({
        where: { id: Number(id) }
      });
      
      return true;
    } catch (error) {
      if (error.code === "P2025") return false;
      throw error;
    }
  }

  /**
   * Cria um novo evento no banco de dados.
   * @async
   * @param {Object} evento - Dados do evento a ser criado.
   * @param {string} evento.titulo - Título do evento.
   * @param {string} evento.data_evento - Data do evento (formato YYYY-MM-DD).
   * @param {string} [evento.criado_em] - Data/hora de criação do evento (opcional).
   * @returns {Promise<number>} ID do evento criado.
   */
  static async create(evento) {
    const { titulo, data_evento, criado_em } = evento;

    const novoEvento = await prisma.evento.create({
      data: {
        titulo,
        data_evento: new Date(data_evento),
        criado_em: criado_em ? new Date(criado_em) : undefined,
      },
    });

    return novoEvento.id;
  }
}

module.exports = EventoModel;