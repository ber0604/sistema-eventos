import { useEffect, useState } from "react";
import { http } from "../api/http";
import { useAuth } from "../auth/AuthContext";

export default function Dashboard() {
  const [msg, setMsg] = useState("Carregando...");
  const [eventos, setEventos] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    carregarEventos();
  }, []);

  const carregarEventos = () => {
    http
      .get("/eventos/consultar")
      .then(({ data }) => {
        setMsg(data.message || "Eventos carregados");
        setEventos(data.eventos);
      })
      .catch((err) => {
        console.error("Erro ao carregar eventos:", err);
        setMsg("Erro ao carregar eventos");
      });
  };

  const excluirEvento = (id) => {
    if (!window.confirm("Deseja realmente excluir este evento?")) return;

    http
      .delete(`/eventos/${id}`) // Supondo que sua API suporte DELETE /eventos/:id
      .then(() => {
        setEventos((prev) => prev.filter((evento) => evento.id !== id));
        alert("Evento excluído com sucesso!");
      })
      .catch((err) => {
        console.error("Erro ao excluir evento:", err);
        alert("Erro ao excluir o evento");
      });
  };

  return (
    <section className="card">
      <h1>Eventos cadastrados</h1>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Título</th>
            <th>Data do evento</th>
            <th>Criação evento</th>
            {user.role === "admin" && (
              <th>Ações</th>
            )}
          </tr>
        </thead>
        <tbody>
          {eventos.length === 0 && (
            <tr>
              <td colSpan={5}>{msg}</td>
            </tr>
          )}
          {eventos.map((evento) => (
            <tr key={evento.id}>
              <td>{evento.id}</td>
              <td>{evento.titulo}</td>
              <td>{new Date(evento.data_evento).toLocaleDateString()}</td>
              <td>{new Date(evento.criado_em).toLocaleDateString()}</td>
              {user.role === "admin" && ( <td>
                <button
                  onClick={() => excluirEvento(evento.id)}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                  title="Excluir evento"
                >
                  🗑️
                </button>
              </td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}