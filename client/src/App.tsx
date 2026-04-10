import { useState, useEffect } from "react";
import { Router, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Devices from "./pages/Devices";
import DeviceDetails from "./pages/DeviceDetails";
import Keylogs from "./pages/Keylogs";
import Alerts from "./pages/Alerts";
import Events from "./pages/Events";
import Map from "./pages/Map";
import Reports from "./pages/Reports";
import Compliance from "./pages/Compliance";
import APKBuilder from "./pages/APKBuilder";

interface User {
  email: string;
  name: string;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(true);
  const [location] = useLocation();

  // Verificar autenticação ao carregar
  useEffect(() => {
    const checkAuth = () => {
      try {
        // Verificar se tem token válido no localStorage
        const token = localStorage.getItem("auth_token");
        const timestamp = localStorage.getItem("auth_timestamp");
        const userEmail = localStorage.getItem("user_email");
        const userName = localStorage.getItem("user_name");

        // Token válido por 24 horas
        const TOKEN_VALIDITY_MS = 24 * 60 * 60 * 1000;
        
        if (token && timestamp && userEmail && userName) {
          const tokenAge = Date.now() - parseInt(timestamp);
          
          if (tokenAge < TOKEN_VALIDITY_MS) {
            // Token ainda válido
            setUser({
              email: userEmail,
              name: userName,
            });
            setIsAuthenticated(true);
          } else {
            // Token expirado - limpar tudo
            clearAuth();
          }
        } else {
          // Sem token - não autenticado
          clearAuth();
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const clearAuth = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_timestamp");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_name");
    sessionStorage.clear();
    setUser(undefined);
    setIsAuthenticated(false);
  };

  const handleLogin = (email: string, password: string) => {
    // Validação simples (credenciais de teste)
    if (email && password) {
      // Criar token com timestamp para evitar reutilização
      const token = "token_" + Date.now() + "_" + Math.random();
      const timestamp = Date.now().toString();
      const userName = email.split("@")[0];
      
      // Salvar no localStorage
      localStorage.setItem("auth_token", token);
      localStorage.setItem("auth_timestamp", timestamp);
      localStorage.setItem("user_email", email);
      localStorage.setItem("user_name", userName);
      
      setUser({
        email: email,
        name: userName,
      });
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    // Limpar TODOS os dados de autenticação
    clearAuth();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-cyan-300">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router>
            {!isAuthenticated ? (
              // Rota de login
              <Route path="*">
                <Login onLogin={handleLogin} loading={false} />
              </Route>
            ) : (
              // Rotas autenticadas
              <>
                <Route path="/">
                  <Home user={user} onLogout={handleLogout} />
                </Route>
                <Route path="/dispositivos">
                  <Home user={user} onLogout={handleLogout} />
                </Route>
                <Route path="/dispositivos/:id">
                  <Home user={user} onLogout={handleLogout} />
                </Route>
                <Route path="/keylogs">
                  <Home user={user} onLogout={handleLogout} />
                </Route>
                <Route path="/alertas">
                  <Home user={user} onLogout={handleLogout} />
                </Route>
                <Route path="/eventos">
                  <Home user={user} onLogout={handleLogout} />
                </Route>
                <Route path="/mapa">
                  <Home user={user} onLogout={handleLogout} />
                </Route>
                <Route path="/relatorios">
                  <Home user={user} onLogout={handleLogout} />
                </Route>
                <Route path="/conformidade">
                  <Home user={user} onLogout={handleLogout} />
                </Route>
                <Route path="/apk-builder">
                  <Home user={user} onLogout={handleLogout} />
                </Route>
                {/* Rota padrão */}
                <Route path="*">
                  <Home user={user} onLogout={handleLogout} />
                </Route>
              </>
            )}
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
