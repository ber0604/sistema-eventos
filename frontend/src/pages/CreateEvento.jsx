import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEvent } from "../auth/EventoContext";
import Button from "../components/Button";
import FormInput from "../components/FormInput";

export default function CreateEvento() {
  const { createEvento } = useEvent();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [form, setForm] = useState({ titulo: "", data_evento: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  
  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await createEvento(form);
      navigate(state?.from?.pathname || "/dashboard", { replace: true });
      alert('Evento criado com sucesso!');
    } catch {
      setErr("Houve um erro ao criar o Evento");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card">
      <h1>Registro evento</h1>
      {err && <p className="alert">{err}</p>}
      <form onSubmit={handleSubmit} className="form form--inline">
        <FormInput
          label="Título"
          type="titulo"
          name="titulo"
          value={form.titulo}
          onChange={updateField}
          required
        />
        <FormInput
          label="Data Evento"
          type="date"
          name="data_evento"
          value={form.data_evento}
          onChange={updateField}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Criando evento..." : "Registrar"}
        </Button>
      </form>
    </section>
  );
}
