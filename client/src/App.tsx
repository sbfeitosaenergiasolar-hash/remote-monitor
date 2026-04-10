import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import { useAuth } from "./_core/hooks/useAuth";
import Login from "./pages/Login";
import Home from "./pages/Home";

function AppContent() {
  const { user, loading, isAuthenticated } = useAuth({
    redirectOnUnauthenticated: false,
  });
  const [showLogin, setShowLogin] = useState(!isAuthenticated);

  useEffect(() => {
    setShowLogin(!isAuthenticated);
  }, [isAuthenticated]);

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

  return showLogin ? (
    <Login
      onLogin={() => {
        setShowLogin(false);
      }}
      loading={false}
    />
  ) : (
    <Home />
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <AppContent />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
