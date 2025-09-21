import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Button from "../components/Button";
import FormInput from "../components/FormInput";

export default function CreateLogin() {
  const { createLogin } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [form, setForm] = useState({ email: "", senha: "" });
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
      await createLogin(form); // chama AuthContext → POST /auth
      navigate(state?.from?.pathname || "/login", { replace: true });
      alert('Usuário criado com sucesso! Faça o login.');
    } catch {
      if (err.response?.status === 409) {
        setErr("Usuário já existe com esse e-mail");
      } else {
        setErr("Houve um erro ao criar o usuário");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card">
      <h1>Registro usuário</h1>
      {err && <p className="alert">{err}</p>}
      <form onSubmit={handleSubmit} className="form form--inline">
        <FormInput
          label="E-mail"
          type="email"
          name="email"
          value={form.email}
          placeholder="usuario@ifrs.edu.br"
          onChange={updateField}
          required
        />
        <FormInput
          label="Senha"
          type="senha"
          name="senha"
          value={form.senha}
          placeholder="••••••"
          onChange={updateField}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Criando usuário..." : "Registrar"}
        </Button>
      </form>
    </section>
  );
}
