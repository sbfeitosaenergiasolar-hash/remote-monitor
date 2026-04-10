import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Dashboard from "./Dashboard";
import DevicesPage from "./Devices";
import AlertsPage from "./Alerts";
import EventsPage from "./Events";
import MapPage from "./Map";
import ReportsPage from "./Reports";
import CompliancePage from "./Compliance";
import APKBuilderPage from "./APKBuilder";
import KeylogsPage from "./Keylogs";

interface User {
  email: string;
  name: string;
}

interface HomeProps {
  user?: User;
  onLogout: () => void;
}

type PageType = "dashboard" | "devices" | "alerts" | "events" | "map" | "reports" | "compliance" | "apk-builder" | "keylogs";

export default function Home({ user, onLogout }: HomeProps) {
  const [location, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Mapear URL para página
  const getPageFromLocation = (): PageType => {
    if (location === "/dispositivos") return "devices";
    if (location === "/alertas") return "alerts";
    if (location === "/eventos") return "events";
    if (location === "/mapa") return "map";
    if (location === "/relatorios") return "reports";
    if (location === "/conformidade") return "compliance";
    if (location === "/apk-builder") return "apk-builder";
    if (location === "/keylogs") return "keylogs";
    return "dashboard";
  };

  const currentPage = getPageFromLocation();

  // Detectar mudanças de tamanho de tela
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigate = (page: PageType) => {
    // Mapear página para URL
    const urlMap: Record<PageType, string> = {
      dashboard: "/",
      devices: "/dispositivos",
      alerts: "/alertas",
      events: "/eventos",
      map: "/mapa",
      reports: "/relatorios",
      compliance: "/conformidade",
      "apk-builder": "/apk-builder",
      keylogs: "/keylogs",
    };
    
    setLocation(urlMap[page]);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleLogoutClick = () => {
    onLogout();
    setLocation("/");
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onNavigate={handleNavigate}
        currentPage={currentPage}
        onLogout={handleLogoutClick}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            <h1 className="text-xl font-bold text-cyan-400">
              Painel de Monitoramento
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">
              Usuário: <span className="text-cyan-400">{user?.name}</span>
            </span>
            <Button
              onClick={handleLogoutClick}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          {currentPage === "dashboard" && <Dashboard />}
          {currentPage === "devices" && <DevicesPage />}
          {currentPage === "alerts" && <AlertsPage />}
          {currentPage === "events" && <EventsPage />}
          {currentPage === "map" && <MapPage />}
          {currentPage === "reports" && <ReportsPage />}
          {currentPage === "compliance" && <CompliancePage />}
          {currentPage === "apk-builder" && <APKBuilderPage />}
          {currentPage === "keylogs" && <KeylogsPage />}
        </div>
      </div>
    </div>
  );
}
