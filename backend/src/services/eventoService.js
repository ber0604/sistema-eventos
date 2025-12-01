const EventoModel = require("../models/eventoModel");
const logger = require("../config/logger");

class EventoService {
  static async createEvento(evento) {
    logger.info({ action: "createEvento_start", evento });

    const criado_em = new Date().toISOString().slice(0, 19).replace("T", " ");
    evento.criado_em = criado_em;

    try {
      const id = await EventoModel.create(evento);
      logger.info({ action: "createEvento_success", id });
      return { message: "Evento registrado com sucesso", id };
    } catch (error) {
      logger.error({ action: "createEvento_error", error: error.message });
      throw error;
    }
  }

  static async buscarEventos() {
    logger.info({ action: "buscarEventos_start" });

    try {
      const eventos = await EventoModel.findAll();
      if (!eventos || eventos.length === 0) {
        logger.warn({ action: "buscarEventos_empty" });
        throw new Error("Não possui eventos cadastrados");
      }

      logger.info({ action: "buscarEventos_success", total: eventos.length });
      return { eventos };
    } catch (error) {
      logger.error({ action: "buscarEventos_error", error: error.message });
      throw error;
    }
  }

  static async deleteEvento(id) {
    logger.info({ action: "deleteEvento_start", id });

    try {
      const deleted = await EventoModel.delete(id);

      if (!deleted) {
        logger.warn({ action: "deleteEvento_not_found", id });
        return false;
      }

      logger.info({ action: "deleteEvento_success", id });
      return true;
    } catch (error) {
      logger.error({ action: "deleteEvento_error", id, error: error.message });
      throw error;
    }
  }
}

module.exports = EventoService;