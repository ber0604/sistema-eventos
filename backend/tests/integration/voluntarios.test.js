const request = require("supertest");
const app = require("../../app");

describe("GET /voluntarios", () => {
  test("sucesso - admin autorizado", async () => {
    const tokenAdmin = "Bearer token_admin_valido";

    const res = await request(app)
      .get("/voluntarios")
      .set("Authorization", tokenAdmin);

    expect(res.status).toBe(200);
  });

  test("erro - sem token", async () => {
    const res = await request(app).get("/voluntarios");
    expect(res.status).toBe(401);
  });

  test("erro - token inválido", async () => {
    const res = await request(app)
      .get("/voluntarios")
      .set("Authorization", "Bearer token_invalido");

    expect(res.status).toBe(403);
  });

  test("erro - usuário sem permissão", async () => {
    const tokenUser = "Bearer token_user_comum";

    const res = await request(app)
      .get("/voluntarios")
      .set("Authorization", tokenUser);

    expect(res.status).toBe(403);
  });
});
