import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Activity, Loader2, Phone, MessageSquare, MapPin, Smartphone } from "lucide-react";

export default function EventsPage() {
  const [selectedDevice, setSelectedDevice] = useState("1");
  const [filterType, setFilterType] = useState<string>("all");

  const { data: events = [], isLoading, error } = trpc.events.list.useQuery({
    deviceId: selectedDevice,
  });

  const filteredEvents = useMemo(() => {
    if (filterType === "all") return events;
    return events.filter((e: any) => e.type === filterType);
  }, [events, filterType]);

  const getEventIcon = (type: string) => {
    switch (type) {
      case "app_opened":
        return <Smartphone className="w-5 h-5 text-blue-400" />;
      case "call_received":
        return <Phone className="w-5 h-5 text-green-400" />;
      case "sms_received":
        return <MessageSquare className="w-5 h-5 text-purple-400" />;
      case "location_updated":
        return <MapPin className="w-5 h-5 text-red-400" />;
      default:
        return <Activity className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "app_opened":
        return "bg-blue-500/10 border-blue-500/30";
      case "call_received":
        return "bg-green-500/10 border-green-500/30";
      case "sms_received":
        return "bg-purple-500/10 border-purple-500/30";
      case "location_updated":
        return "bg-red-500/10 border-red-500/30";
      default:
        return "bg-cyan-500/10 border-cyan-500/30";
    }
  };

  const eventTypes = [
    { value: "all", label: "Todos" },
    { value: "app_opened", label: "App Aberto" },
    { value: "call_received", label: "Chamada" },
    { value: "sms_received", label: "SMS" },
    { value: "location_updated", label: "Localização" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-cyan-300 mb-2">📊 Eventos</h1>
          <p className="text-slate-400">Histórico de eventos dos dispositivos</p>
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
              Filtrar por Tipo
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-cyan-400/30 rounded-lg text-white focus:outline-none focus:border-cyan-400"
            >
              {eventTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <Card className="bg-slate-900/50 backdrop-blur-xl border-cyan-400/30 p-8 text-center">
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
              <p className="text-slate-400">Carregando eventos...</p>
            </div>
          </Card>
        )}

        {/* Error State */}
        {error && (
          <Card className="bg-red-500/10 border-red-500/30 p-8 text-center">
            <p className="text-red-300">Erro ao carregar eventos</p>
          </Card>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredEvents.length === 0 && (
          <Card className="bg-slate-900/50 backdrop-blur-xl border-cyan-400/30 p-8 text-center">
            <p className="text-slate-400">Nenhum evento encontrado</p>
          </Card>
        )}

        {/* Events Timeline */}
        {!isLoading && !error && filteredEvents.length > 0 && (
          <div className="space-y-4">
            <div className="text-sm text-slate-400 mb-4">
              Total: <span className="font-bold text-cyan-300">{filteredEvents.length}</span> eventos
            </div>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/50 to-transparent"></div>

              {/* Events */}
              <div className="space-y-4">
                {filteredEvents.map((event: any, index: number) => (
                  <Card
                    key={event.id}
                    className={`backdrop-blur-xl border p-4 ml-16 transition-all hover:border-cyan-400 ${getEventColor(event.type)}`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-2 top-6 w-8 h-8 bg-slate-950 border-2 border-cyan-400 rounded-full flex items-center justify-center -ml-16">
                      {getEventIcon(event.type)}
                    </div>

                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-white">{event.title}</h3>
                        <p className="text-sm text-slate-300 mt-1">{event.description}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className="ml-2 bg-cyan-500/20 text-cyan-300 border-cyan-500/50 whitespace-nowrap"
                      >
                        {event.type.replace(/_/g, " ")}
                      </Badge>
                    </div>
                    <div className="mt-3 text-xs text-slate-400">
                      {new Date(event.createdAt).toLocaleString("pt-BR")}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
