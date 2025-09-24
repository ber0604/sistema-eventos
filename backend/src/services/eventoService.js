const EventoModel = require("../models/eventoModel");

/**
 * Classe responsável pela lógica de negócio relacionada aos eventos.
 */
class EventoService {
  
  /**
   * Cria um novo evento e salva no banco de dados.
   * @async
   * @param {Object} evento - Dados do evento a ser criado.
   * @param {string} evento.titulo - Título do evento.
   * @param {string} evento.data_evento - Data do evento (formato YYYY-MM-DD).
   * @returns {Promise<Object>} Objeto com mensagem de sucesso e o ID do evento criado.
   * @throws {Error} Caso ocorra algum problema ao criar o evento.
   */
  static async createEvento(evento) {
    const { titulo, data_evento } = evento;
    const criado_em = new Date().toISOString().slice(0, 19).replace("T", " ");
    evento.criado_em = criado_em;

    const id = await EventoModel.create(evento);
    return { message: "Evento registrado com sucesso", id };
  }

  /**
   * Busca todos os eventos cadastrados no banco de dados.
   * @async
   * @returns {Promise<Object>} Objeto contendo um array de eventos.
   * @throws {Error} Caso não existam eventos cadastrados.
   */
  static async buscarEventos() {
    const eventos = await EventoModel.findAll();
    if (!eventos || eventos.length === 0) {
      throw new Error("Não possui eventos cadastrados");
    }
    return { eventos };
  }
}

module.exports = EventoService;
