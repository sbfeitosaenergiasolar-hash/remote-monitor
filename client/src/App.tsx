import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import CorporateReports from "./pages/CorporateReports";
import LGPDCompliance from "./pages/LGPDCompliance";
import Devices from "./pages/Devices";
import Alerts from "./pages/Alerts";
import Events from "./pages/Events";
import Map from "./pages/Map";
import APKGenerator from "./pages/APKGenerator";
import DownloadAPK from "./pages/DownloadAPK";
import Features from "./pages/Features";
import CountrySelection from "./pages/CountrySelection";
import Login from "./pages/Login";
import { useEffect, useState } from "react";

function Router() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Verificar autenticação no cliente
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    setIsAuthenticated(!!token);
  }, []);

  // Aguardar verificação de autenticação
  if (isAuthenticated === null) {
    return null;
  }

  // Se não autenticado, mostrar apenas página de login (exceto /countries e /login)
  if (!isAuthenticated) {
    return (
      <Switch>
        <Route path={"/countries"} component={CountrySelection} />
        <Route path={"/login"} component={Login} />
        <Route path={"*"} component={Login} />
      </Switch>
    );
  }

  // Se autenticado, mostrar todas as rotas
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/devices"} component={Devices} />
      <Route path={"/alerts"} component={Alerts} />
      <Route path={"/events"} component={Events} />
      <Route path={"/map"} component={Map} />
      <Route path={"/corporate-reports"} component={CorporateReports} />
      <Route path={"/lgpd-compliance"} component={LGPDCompliance} />
      <Route path={"/apk-generator"} component={APKGenerator} />
      <Route path={"/download-apk"} component={DownloadAPK} />
      <Route path={"/features"} component={Features} />
      <Route path={"/countries"} component={CountrySelection} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
