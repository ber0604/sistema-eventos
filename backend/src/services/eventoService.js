const EventoModel = require("../models/eventoModel");

class EventoService {
  
  static async createEvento(evento) {
    const { titulo, data_evento } = evento;
    const criado_em = new Date().toISOString().slice(0, 19).replace("T", " ");
    evento.criado_em = criado_em;

    const id = await EventoModel.create(evento);
    return { message: "Evento registrado com sucesso", id };
  }

  static async buscarEventos() {
    const eventos = await EventoModel.findAll();
    if (!eventos) {
      throw new Error("Não possui eventos cadastrados");
    }
    return { eventos };
  }
}

module.exports = EventoService;
