const EventoService = require("../../src/services/eventoService");
const EventoModel = require("../../src/models/eventoModel");

jest.mock("../../src/models/eventoModel");

describe("EventoService - createEvento", () => {
  afterEach(() => jest.clearAllMocks());

  it("deve criar evento com sucesso", async () => {
    EventoModel.create.mockResolvedValue(10);

    const input = {
      titulo: "Evento Teste",
      data_evento: "2025-01-01",
    };

    const result = await EventoService.createEvento(input);

    expect(EventoModel.create).toHaveBeenCalled();
    expect(result).toEqual({
      message: "Evento registrado com sucesso",
      id: 10,
    });
  });

  it("deve lançar erro caso o model dê erro", async () => {
    EventoModel.create.mockRejectedValue(new Error("Erro DB"));

    await expect(
      EventoService.createEvento({
        titulo: "Teste",
        data_evento: "2025-01-01",
      })
    ).rejects.toThrow("Erro DB");
  });
});

describe("EventoService - buscarEventos", () => {
  afterEach(() => jest.clearAllMocks());

  it("deve retornar lista de eventos", async () => {
    const eventosFake = [
      { id: 1, titulo: "Evento 1" },
      { id: 2, titulo: "Evento 2" },
    ];

    EventoModel.findAll.mockResolvedValue(eventosFake);

    const result = await EventoService.buscarEventos();

    expect(result).toEqual({ eventos: eventosFake });
  });

  it("deve lançar erro quando não houver eventos", async () => {
    EventoModel.findAll.mockResolvedValue([]);

    await expect(EventoService.buscarEventos()).rejects.toThrow(
      "Não possui eventos cadastrados"
    );
  });

  it("deve lançar erro se findAll retornar null", async () => {
    EventoModel.findAll.mockResolvedValue(null);

    await expect(EventoService.buscarEventos()).rejects.toThrow(
      "Não possui eventos cadastrados"
    );
  });
});

describe("EventoService - deleteEvento", () => {
  afterEach(() => jest.clearAllMocks());

  it("deve retornar true quando o evento é excluído", async () => {
    EventoModel.delete.mockResolvedValue(true);

    const result = await EventoService.deleteEvento(5);

    expect(result).toBe(true);
  });

  it("deve retornar false quando o evento não existir", async () => {
    EventoModel.delete.mockResolvedValue(false);

    const result = await EventoService.deleteEvento(999);

    expect(result).toBe(false);
  });

  it("deve lançar erro se o delete falhar", async () => {
    EventoModel.delete.mockRejectedValue(new Error("Erro ao deletar"));

    await expect(EventoService.deleteEvento(1)).rejects.toThrow(
      "Erro ao deletar"
    );
  });
});
