import { useAuth } from "@/_core/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Activity, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";

export default function Events() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  const eventsQuery = trpc.event.recent.useQuery({ hours: 24 });

  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case "location_update":
        return "📍";
      case "status_change":
        return "🔄";
      case "app_installed":
        return "📱";
      case "app_uninstalled":
        return "🗑️";
      case "call_received":
        return "☎️";
      case "sms_received":
        return "💬";
      case "battery_low":
        return "🔋";
      case "offline":
        return "❌";
      case "online":
        return "✅";
      default:
        return "📊";
    }
  };

  const getEventLabel = (eventType: string) => {
    return eventType.replace(/_/g, " ").toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 scan-lines">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold neon-glow">HISTÓRICO DE EVENTOS</h1>
          <p className="text-muted-foreground">Últimas 24 horas</p>
        </div>

        {/* Events Timeline */}
        {eventsQuery.isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-foreground" size={48} />
          </div>
        ) : eventsQuery.data && eventsQuery.data.length > 0 ? (
          <div className="space-y-4">
            {eventsQuery.data.map((event: any, index: number) => (
              <Card key={event.id} className="card-neon p-6 space-y-3">
                <div className="flex items-start gap-4">
                  <div className="text-3xl mt-1">{getEventIcon(event.eventType)}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-bold text-lg neon-glow-cyan">
                          {getEventLabel(event.eventType)}
                        </p>
                        {event.description && (
                          <p className="text-muted-foreground mt-1">{event.description}</p>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                        {new Date(event.createdAt).toLocaleTimeString()}
                      </p>
                    </div>

                    {/* Event Details */}
                    <div className="mt-3 space-y-1 text-sm">
                      {event.latitude && event.longitude && (
                        <p className="text-muted-foreground">
                          📍 Localização: {event.latitude.toFixed(4)}, {event.longitude.toFixed(4)}
                          {event.accuracy && ` (±${event.accuracy}m)`}
                        </p>
                      )}
                      {event.eventData && Object.keys(event.eventData).length > 0 && (
                        <details className="text-muted-foreground">
                          <summary className="cursor-pointer hover:text-foreground">Detalhes</summary>
                          <pre className="mt-2 bg-background/50 p-2 rounded text-xs overflow-auto">
                            {JSON.stringify(event.eventData, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="card-neon p-12 text-center space-y-4">
            <Activity className="mx-auto text-muted-foreground" size={48} />
            <p className="text-lg text-muted-foreground">Nenhum evento nas últimas 24 horas</p>
          </Card>
        )}
      </div>
    </div>
  );
}
