import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { EventoProvider } from "./auth/EventoContext";
import RequireAuth from "./auth/RequireAuth";
import RequireRole from "./auth/RequireRole";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateLogin from "./pages/CreateLogin";
import Forbidden from "./pages/Forbidden";
import Dashboard from "./pages/Dashboard";
import CreateEvento from "./pages/CreateEvento";

function NotFound() {
  return (
    <main className="container">
      <h1>404 — Página não encontrada</h1>
      <p>Verifique a URL ou volte para a Home.</p>
    </main>
  );
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "registro-usuario", element: <CreateLogin /> },
      { path: "forbidden", element: <Forbidden /> },
      {
        path: "dashboard",
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },
      {
        path: "registro-evento",
        element: (
          <RequireAuth>
            <RequireRole role="admin">
              <CreateEvento />
            </RequireRole>
          </RequireAuth>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <EventoProvider>
        <RouterProvider router={router} />
      </EventoProvider>
    </AuthProvider>
  );
}
