import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import DashboardLayout from "./components/DashboardLayout";
import Login from "./pages/Login";
import { useAuth } from "./_core/hooks/useAuth";
import { useLocation } from "wouter";

function App() {
  const { user, loading } = useAuth();
  const [location] = useLocation();

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

  // Se está na página de login, mostrar login
  if (location === "/login") {
    return (
      <ErrorBoundary>
        <ThemeProvider defaultTheme="dark">
          <TooltipProvider>
            <Toaster />
            <Login />
          </TooltipProvider>
        </ThemeProvider>
      </ErrorBoundary>
    );
  }

  // Se não está autenticado, redirecionar para login
  if (!user) {
    return (
      <ErrorBoundary>
        <ThemeProvider defaultTheme="dark">
          <TooltipProvider>
            <Toaster />
            <Login />
          </TooltipProvider>
        </ThemeProvider>
      </ErrorBoundary>
    );
  }

  // Se está autenticado, mostrar dashboard
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <DashboardLayout>
            {/* O DashboardLayout gerencia navegação */}
          </DashboardLayout>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
