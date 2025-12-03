const request = require("supertest");
const app = require("../../src/app");

describe("GET /voluntarios", () => {
  test("sucesso - admin autorizado", async () => {
    const tokenAdmin = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGlmcnMuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzY0Nzk5MjQ4LCJleHAiOjE3NjQ4MDI4NDh9.6_xv_wkNrAPohW2g44fOOUW6WW31zHBFATlmcd-i2Uc"; // sem quebras de linha
  
    const res = await request(app)
      .get("/voluntarios")
      .set("Authorization", tokenAdmin.trim());
  
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
