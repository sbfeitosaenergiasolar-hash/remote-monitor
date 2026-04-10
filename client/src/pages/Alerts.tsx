import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { AlertCircle, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";

export default function AlertsPage() {
  const [selectedDevice, setSelectedDevice] = useState("1");
  const [filterSeverity, setFilterSeverity] = useState<string>("all");

  const { data: alerts = [], isLoading, error } = trpc.alerts.list.useQuery({
    deviceId: selectedDevice,
  });

  const filteredAlerts = useMemo(() => {
    if (filterSeverity === "all") return alerts;
    return alerts.filter((a: any) => a.severity === filterSeverity);
  }, [alerts, filterSeverity]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500/10 border-red-500/30 text-red-300";
      case "medium":
        return "bg-yellow-500/10 border-yellow-500/30 text-yellow-300";
      case "low":
        return "bg-blue-500/10 border-blue-500/30 text-blue-300";
      default:
        return "bg-slate-500/10 border-slate-500/30 text-slate-300";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case "medium":
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case "low":
        return <CheckCircle className="w-5 h-5 text-blue-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-cyan-300 mb-2">📢 Alertas</h1>
          <p className="text-slate-400">Gerencie alertas e notificações dos dispositivos</p>
        </div>

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Selecionar Dispositivo
            </label>
            <select
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-cyan-400/30 rounded-lg text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="1">Dispositivo 1</option>
              <option value="2">Dispositivo 2</option>
              <option value="3">Dispositivo 3</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Filtrar por Severidade
            </label>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-cyan-400/30 rounded-lg text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="all">Todos</option>
              <option value="high">Alta</option>
              <option value="medium">Média</option>
              <option value="low">Baixa</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <Card className="bg-slate-900/50 backdrop-blur-xl border-cyan-400/30 p-8 text-center">
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
              <p className="text-slate-400">Carregando alertas...</p>
            </div>
          </Card>
        )}

        {/* Error State */}
        {error && (
          <Card className="bg-red-500/10 border-red-500/30 p-8 text-center">
            <p className="text-red-300">Erro ao carregar alertas</p>
          </Card>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredAlerts.length === 0 && (
          <Card className="bg-slate-900/50 backdrop-blur-xl border-cyan-400/30 p-8 text-center">
            <p className="text-slate-400">Nenhum alerta encontrado</p>
          </Card>
        )}

        {/* Alerts List */}
        {!isLoading && !error && filteredAlerts.length > 0 && (
          <div className="space-y-4">
            <div className="text-sm text-slate-400 mb-4">
              Total: <span className="font-bold text-cyan-300">{filteredAlerts.length}</span> alertas
            </div>
            {filteredAlerts.map((alert: any) => (
              <Card
                key={alert.id}
                className={`backdrop-blur-xl border p-4 transition-all hover:border-cyan-400 ${getSeverityColor(alert.severity)}`}
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    {getSeverityIcon(alert.severity)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{alert.title}</h3>
                        <p className="text-sm mt-1 opacity-90">{alert.message}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`ml-2 ${
                          alert.severity === "high"
                            ? "bg-red-500/20 text-red-300 border-red-500/50"
                            : alert.severity === "medium"
                            ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/50"
                            : "bg-blue-500/20 text-blue-300 border-blue-500/50"
                        }`}
                      >
                        {alert.severity === "high"
                          ? "Alta"
                          : alert.severity === "medium"
                          ? "Média"
                          : "Baixa"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs opacity-75">
                        {new Date(alert.createdAt).toLocaleString("pt-BR")}
                      </span>
                      {alert.isRead ? (
                        <Badge variant="outline" className="bg-green-500/20 text-green-300 border-green-500/50">
                          Lido
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-orange-500/20 text-orange-300 border-orange-500/50">
                          Novo
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
