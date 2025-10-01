import { useEffect, useState } from "react";
import { http } from "../api/http";

export default function Voluntarios() {
  const [msg, setMsg] = useState("Carregando...");
  const [voluntarios, setVoluntarios] = useState([]);

  useEffect(() => {
    carregarVoluntarios();
  }, []); // só executa uma vez

  const carregarVoluntarios = () => {
    http
      .get("/voluntarios")
      .then(({ data }) => {
        setVoluntarios(data); // backend retorna array puro
        setMsg(""); // mensagem some após carregar
      })
      .catch((err) => {
        console.error("Erro ao carregar voluntários:", err);
        setMsg("Erro ao carregar voluntários");
      });
  };

  return (
    <section className="card">
      <h1>Voluntários</h1>
      {msg && <p>{msg}</p>}
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
          </tr>
        </thead>
        <tbody>
          {voluntarios.map((voluntario) => (
            <tr key={voluntario.id}>
              <td>{voluntario.nome}</td>
              <td>{voluntario.telefone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
