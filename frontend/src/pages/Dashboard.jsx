import { useEffect, useState } from "react";
import { http } from "../api/http";

export default function Dashboard() {
  const [msg, setMsg] = useState("Carregando...");
  const [eventos, setEventos] = useState([]);
  useEffect(() => {
    http
      .get("/eventos/consultar")
      .then(({ data }) => {
        setMsg(data.message);
        setEventos(data.eventos);
      })
      .catch((err) => {
        console.error("Erro ao carregar eventos:", err);
        setMsg("Erro ao carregar eventos");
      });
  }, []);
  return (
    <section className="card">
      <h1>Eventos cadastrados</h1>
      <table>
        <thead>
          <th>Código</th>
          <th>Título</th>
          <th>Data do evento</th>
          <th>Criação evento</th>
        </thead>
        <tbody>
          {eventos.map((evento) => (
            <tr key={evento.id}>
              <td>{evento.id}</td>
              <td>{evento.titulo}</td>
              <td>{new Date(evento.data_evento).toLocaleDateString()}</td>
              <td>{new Date(evento.criado_em).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}