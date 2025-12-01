const request = require("supertest");
const app = require("../../app");

jest.mock("../../services/eventoService", () => ({
  createEvento: jest.fn(),
  buscarEventos: jest.fn(),
  deleteEvento: jest.fn(),
}));

const EventoService = require("../../services/eventoService");

jest.mock("../../middlewares/auth.middleware", () => ({
  authenticateToken: (req, res, next) => next(),
  authorizeRole: () => (req, res, next) => next(),
}));

describe("EVENTOS", () => {
  afterEach(() => jest.clearAllMocks());

  it("POST /eventos/registrar - sucesso", async () => {
    EventoService.createEvento.mockResolvedValue({
      message: "Evento registrado com sucesso",
      id: 10,
    });

    const res = await request(app)
      .post("/eventos/registrar")
      .send({ titulo: "Ação", data_evento: "2025-01-01" });

    expect(res.status).toBe(201);
    expect(res.body.id).toBe(10);
  });

  it("POST /eventos/registrar - erro", async () => {
    EventoService.createEvento.mockRejectedValue(new Error("Erro ao criar"));

    const res = await request(app)
      .post("/eventos/registrar")
      .send({ titulo: "Ação", data_evento: "2025-01-01" });

    expect(res.status).toBe(409);
  });

  it("GET /eventos/consultar - sucesso", async () => {
    EventoService.buscarEventos.mockResolvedValue({
      eventos: [{ id: 1, titulo: "Teste" }],
    });

    const res = await request(app).get("/eventos/consultar");

    expect(res.status).toBe(200);
    expect(res.body.eventos.length).toBe(1);
  });

  it("GET /eventos/consultar - erro", async () => {
    EventoService.buscarEventos.mockRejectedValue(
      new Error("Não possui eventos cadastrados")
    );

    const res = await request(app).get("/eventos/consultar");

    expect(res.status).toBe(404);
  });

  it("DELETE /eventos/:id - sucesso", async () => {
    EventoService.deleteEvento.mockResolvedValue(true);

    const res = await request(app).delete("/eventos/1");

    expect(res.status).toBe(200);
  });

  it("DELETE /eventos/:id - não encontrado", async () => {
    EventoService.deleteEvento.mockResolvedValue(false);

    const res = await request(app).delete("/eventos/1");

    expect(res.status).toBe(404);
  });
});
