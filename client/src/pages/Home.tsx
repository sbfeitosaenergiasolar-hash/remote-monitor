import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Smartphone, AlertCircle, MapPin, Activity } from "lucide-react";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { useEffect, useState } from "react";
import { Link } from "wouter";

export default function Home() {
  const { user, loading, isAuthenticated } = useAuth();
  const [stats, setStats] = useState({ totalDevices: 0, onlineDevices: 0, unreadAlerts: 0 });

  const devicesQuery = trpc.device.list.useQuery(undefined, { enabled: isAuthenticated });
  const alertsQuery = trpc.alert.list.useQuery({ unreadOnly: true }, { enabled: isAuthenticated });

  useEffect(() => {
    if (devicesQuery.data) {
      const onlineCount = devicesQuery.data.filter((d: any) => d.status === "online").length;
      setStats({
        totalDevices: devicesQuery.data.length,
        onlineDevices: onlineCount,
        unreadAlerts: alertsQuery.data?.length || 0,
      });
    }
  }, [devicesQuery.data, alertsQuery.data]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-foreground" size={48} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4 scan-lines">
        <div className="max-w-2xl text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold neon-glow">
              REMOTE MONITOR
            </h1>
            <p className="text-xl md:text-2xl neon-glow-cyan">
              Sistema de Monitoramento Remoto em Tempo Real
            </p>
          </div>

          <div className="space-y-4 text-lg">
            <p className="text-muted-foreground">
              Monitore seus dispositivos Android e iOS com precisão. Rastreie localização, eventos e status em tempo real.
            </p>
            <p className="text-muted-foreground">
              Interface cyberpunk de alto impacto com alertas automáticos e notificações instantâneas.
            </p>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              onClick={() => (window.location.href = getLoginUrl())}
              className="btn-neon bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Acessar Painel
            </Button>
            <Button
              variant="outline"
              className="neon-border text-foreground hover:bg-accent/10"
            >
              Documentação
            </Button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-accent/30 rounded-lg opacity-50" />
        <div className="absolute bottom-10 right-10 w-48 h-48 border-2 border-accent/20 rounded-full opacity-30" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 scan-lines">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold neon-glow">
            DASHBOARD
          </h1>
          <p className="text-muted-foreground">
            Bem-vindo, <span className="neon-glow-cyan">{user?.name || "Usuário"}</span>
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="card-neon p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Dispositivos</p>
                <p className="text-3xl font-bold neon-glow">{stats.totalDevices}</p>
              </div>
              <Smartphone className="text-accent" size={40} />
            </div>
            <div className="text-sm">
              <span className="text-green-400">{stats.onlineDevices}</span>
              <span className="text-muted-foreground"> online</span>
            </div>
          </Card>

          <Card className="card-neon p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Alertas</p>
                <p className="text-3xl font-bold neon-glow">{stats.unreadAlerts}</p>
              </div>
              <AlertCircle className="text-red-500" size={40} />
            </div>
            <div className="text-sm text-muted-foreground">Não lidos</div>
          </Card>

          <Card className="card-neon p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Status</p>
                <p className="text-3xl font-bold neon-glow-cyan">ATIVO</p>
              </div>
              <Activity className="text-green-400 animate-pulse" size={40} />
            </div>
            <div className="text-sm text-green-400">Sistema operacional</div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold neon-glow-cyan">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/devices">
              <Button className="w-full btn-neon bg-accent text-accent-foreground hover:bg-accent/90">
                <Smartphone className="mr-2" size={20} />
                Gerenciar Dispositivos
              </Button>
            </Link>
            <Link href="/alerts">
              <Button className="w-full btn-neon bg-accent text-accent-foreground hover:bg-accent/90">
                <AlertCircle className="mr-2" size={20} />
                Ver Alertas
              </Button>
            </Link>
            <Link href="/map">
              <Button className="w-full btn-neon bg-accent text-accent-foreground hover:bg-accent/90">
                <MapPin className="mr-2" size={20} />
                Mapa em Tempo Real
              </Button>
            </Link>
            <Link href="/events">
              <Button className="w-full btn-neon bg-accent text-accent-foreground hover:bg-accent/90">
                <Activity className="mr-2" size={20} />
                Histórico de Eventos
              </Button>
            </Link>
          </div>
        </div>

        {/* Recent Devices */}
        {devicesQuery.data && devicesQuery.data.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold neon-glow-cyan">Dispositivos Recentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {devicesQuery.data.slice(0, 4).map((device: any) => (
                <Card key={device.id} className="card-neon p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-bold neon-glow">{device.deviceName}</p>
                      <p className="text-sm text-muted-foreground">
                        {device.deviceType === "android" ? "Android" : "iOS"} • {device.osVersion}
                      </p>
                    </div>
                    <div className={`status-${device.status}`}>
                      <span className="text-sm font-bold uppercase">
                        {device.status === "online" ? "Online" : "Offline"}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    ID: {device.deviceId.substring(0, 16)}...
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {devicesQuery.data && devicesQuery.data.length === 0 && (
          <Card className="card-neon p-12 text-center space-y-4">
            <Smartphone className="mx-auto text-muted-foreground" size={48} />
            <p className="text-lg text-muted-foreground">Nenhum dispositivo cadastrado</p>
            <Link href="/devices">
              <Button className="btn-neon bg-accent text-accent-foreground hover:bg-accent/90">
                Cadastrar Primeiro Dispositivo
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}
