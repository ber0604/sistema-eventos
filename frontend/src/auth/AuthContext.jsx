/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { http } from "../api/http";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
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
  
  async function login({ email, senha }) {
    const { data } = await http.post("/users/auth", { email, senha });
    // Espera-se { token, user: { email, role } }
    if (!data?.token) throw new Error("Token ausente na resposta");
    localStorage.setItem("token", data.token);
    setToken(data.token);
    if (data?.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
    } else {
      // fallback defensivo
      localStorage.removeItem("user");
      setUser(null);
    }
  }
  
  // Faz login chamando a API e salva sessão
  async function createLogin({ email, senha }) {
    const { data } = await http.post("/users/register", { email, senha });
    // Espera-se { token, user: { email, role } }
    if (!data.id) throw new Error("Usuario nao criado");
  }

  // Encerra sessão
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }
  // Valor do contexto memoizado (evita re-renders desnecessários)
  const value = useMemo(
    () => ({ token, user, login, createLogin, logout, loading }),
    [token, user, loading]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
