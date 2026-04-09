import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, Loader2, CheckCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";

export default function Alerts() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  const alertsQuery = trpc.alert.list.useQuery({});
  const markAsReadMutation = trpc.alert.markAsRead.useMutation({
    onSuccess: () => {
      alertsQuery.refetch();
    },
  });

  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 scan-lines">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold neon-glow">ALERTAS</h1>
          <p className="text-muted-foreground">Notificações de eventos importantes</p>
        </div>

        {/* Alerts List */}
        {alertsQuery.isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-foreground" size={48} />
          </div>
        ) : alertsQuery.data && alertsQuery.data.length > 0 ? (
          <div className="space-y-4">
            {alertsQuery.data.map((alert: any) => (
              <Card
                key={alert.id}
                className={`card-neon p-6 space-y-3 ${alert.isRead ? "opacity-60" : "border-red-500"}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <AlertCircle
                      className={`mt-1 flex-shrink-0 ${
                        alert.alertType === "critical_event" ? "text-red-500" : "text-yellow-500"
                      }`}
                      size={24}
                    />
                    <div className="flex-1">
                      <p className="font-bold text-lg neon-glow">{alert.title}</p>
                      <p className="text-muted-foreground mt-1">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(alert.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {!alert.isRead && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="neon-border text-foreground hover:bg-green-500/10 flex-shrink-0"
                      onClick={() => markAsReadMutation.mutate({ alertId: alert.id })}
                    >
                      <CheckCircle size={16} className="mr-1" />
                      Marcar
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="card-neon p-12 text-center space-y-4">
            <AlertCircle className="mx-auto text-muted-foreground" size={48} />
            <p className="text-lg text-muted-foreground">Nenhum alerta</p>
            <p className="text-sm text-muted-foreground">Você está em dia com todas as notificações</p>
          </Card>
        )}
      </div>
    </div>
  );
}
