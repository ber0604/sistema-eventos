import { useEffect, useState } from "react";
import { http } from "../api/http";

export default function Dashboard() {
  const [msg, setMsg] = useState("Carregando...");
  useEffect(() => {
    http
      .get("/protected/dashboard")
      .then(({ data }) => setMsg(data.message))
      .catch(() => setMsg("Erro ao carregar eventos"));
  }, []);
  return (
    <section className="card">
      <h1>Eventos cadastrados</h1>
      <p>{msg}</p>
    </section>
  );
}