/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { http } from "../api/http";

const EventoContext = createContext(null);

export function EventoProvider({ children }) {
  const [token, setToken] = useState(null); // JWT
  const [user, setUser] = useState(null); // { email, role }
  const [loading, setLoading] = useState(true); // indica restauração da sessão
  // Restaura sessão ao iniciar o app (ex.: após F5)
  useEffect(() => {
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("user");
    setToken(t || null);
    try {
      setUser(u ? JSON.parse(u) : null);
    } catch {
      // Se algo inválido foi salvo (ex.: "undefined"), limpa e segue sem user.
      localStorage.removeItem("user");
      setUser(null);
    }
    setLoading(false);
  }, []);
  
  // Faz login chamando a API e salva sessão
  async function createEvento({ titulo, data_evento }) {
    const { data } = await http.post("/eventos/registrar", { titulo, data_evento });
    // Espera-se { token, user: { email, role } }
    if (!data.id) throw new Error("Usuario nao criado");
  }

  // Valor do contexto memoizado (evita re-renders desnecessários)
  const value = useMemo(
    () => ({ token, user, createEvento, loading }),
    [token, user, loading]
  );
  return <EventoContext.Provider value={value}>{children}</EventoContext.Provider>;
}

export function useEvent() {
  return useContext(EventoContext);
}
