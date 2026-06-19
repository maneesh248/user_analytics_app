import { useEffect, useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Sessions from "./pages/Sessions";
import Heatmap from "./pages/Heatmap";

import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";

const PAGES = {
  dashboard: Dashboard,
  sessions: Sessions,
  heatmap: Heatmap,
};

export default function App() {
  const [user, setUser] = useState(null);
  const [authPage, setAuthPage] = useState("login");
  const [page, setPage] = useState("dashboard");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);


  useEffect(() => {
    window.__currentPage = user ? `/${page}` : `/${authPage}`;
  }, [page, authPage, user]);

  const handlePageChange = (id) => {
    window.__currentPage = `/${id}`; // set immediately, before re-render
    setPage(id);
  };

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleRegister = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setAuthPage("login");
  };

  if (!user) {
    if (authPage === "register") {
      return (
        <Register
          onRegister={handleRegister}
          onBack={() => setAuthPage("login")}
        />
      );
    }
    return (
      <Login
        onLogin={handleLogin}
        onCreateAccount={() => setAuthPage("register")}
      />
    );
  }

  const Page = PAGES[page] ?? Dashboard;

  return (
    <div style={{
      display: "flex", flexDirection: "column",
      height: "100vh", overflow: "hidden", background: "#0b0d14"
    }}>
      <Topbar user={user} onLogout={handleLogout} />

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <Sidebar active={page} onChange={handlePageChange} />

        <main style={{
          flex: 1, overflowY: "auto", padding: "28px 32px",
          display: "flex", flexDirection: "column", gap: 28
        }}>
          <Page />
        </main>
      </div>
    </div>
  );
}