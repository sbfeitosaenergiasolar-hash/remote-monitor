import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LockedScreen from "@/components/LockedScreen";

interface DeviceDetailsProps {
  deviceId: string;
  deviceName: string;
  onBack: () => void;
}

interface Keylog {
  id: string;
  time: string;
  key: string;
  app: string;
}

export default function DeviceDetails({
  deviceId,
  deviceName,
  onBack,
}: DeviceDetailsProps) {
  const [activeTab, setActiveTab] = useState("info");
  const [isLiveActive, setIsLiveActive] = useState(true);
  const [isControlActive, setIsControlActive] = useState(false);
  const [isScreenLocked, setIsScreenLocked] = useState(false);
  const [keylogs, setKeylogs] = useState<Keylog[]>([
    { id: "1", time: "14:32:15", key: "admin@gmail.com", app: "Gmail" },
    { id: "2", time: "14:32:18", key: "senha123", app: "Gmail" },
    { id: "3", time: "14:35:42", key: "Olá, tudo bem?", app: "WhatsApp" },
    { id: "4", time: "14:36:01", key: "Sim, tudo certo!", app: "WhatsApp" },
    { id: "5", time: "14:38:15", key: "www.google.com", app: "Chrome" },
  ]);
  const [keylogHistory, setKeylogHistory] = useState<Keylog[]>([]);
  const [selectedKeylogs, setSelectedKeylogs] = useState<Set<string>>(new Set());

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
      onBack();
    }
  };

  const handleToggleKeylogSelection = (id: string) => {
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
    const toRemove = keylogs.filter((k) => selectedKeylogs.has(k.id));
    setKeylogHistory([...keylogHistory, ...toRemove]);
    setKeylogs(keylogs.filter((k) => !selectedKeylogs.has(k.id)));
    setSelectedKeylogs(new Set());
    alert(`✅ ${toRemove.length} keylog(s) removido(s) e movido(s) para o histórico`);
  };

  const handleRemoveAllKeylogs = () => {
    if (confirm("Tem certeza que deseja remover TODOS os keylogs?")) {
      setKeylogHistory([...keylogHistory, ...keylogs]);
      setKeylogs([]);
      setSelectedKeylogs(new Set());
      alert("✅ Todos os keylogs foram removidos e movidos para o histórico");
    }
  };

  const handleRestoreKeylog = (id: string) => {
    const toRestore = keylogHistory.find((k) => k.id === id);
    if (toRestore) {
      setKeylogs([...keylogs, toRestore]);
      setKeylogHistory(keylogHistory.filter((k) => k.id !== id));
      alert(`✅ Keylog restaurado com sucesso`);
    }
  };

  // Se a tela está travada, mostrar apenas o componente de trava
  if (isScreenLocked) {
    return (
      <LockedScreen
        deviceName={deviceName}
        onUnlock={handleUnlockScreen}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="text-cyan-400 hover:text-cyan-300 mb-4 inline-flex items-center gap-2"
        >
          ← Voltar
        </button>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
              📱 {deviceName}
            </h1>
            <p className="text-slate-400 mt-1">ID: {deviceId}</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={handleScreenshot}
              className="bg-cyan-500 hover:bg-cyan-600 text-white"
            >
              📸 Capturar Screenshot
            </Button>
            <Button
              onClick={handleStopLive}
              className="bg-red-500 hover:bg-red-600 text-white"
              disabled={!isLiveActive}
            >
              ⏹️ Parar Ao Vivo
            </Button>
            <Button
              onClick={handleActivateControl}
              className={`${
                isControlActive
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-slate-600 hover:bg-slate-700"
              } text-white`}
            >
              🎮 {isControlActive ? "Desativar" : "Ativar"} Controle
            </Button>
            <Button
              onClick={handleLockScreen}
              className="bg-orange-500 hover:bg-orange-600 text-white"
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
        </div>
      </div>

      {/* Abas */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-slate-800 border border-slate-700 mb-6">
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
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <p className="text-slate-400 text-sm">Memória</p>
                    <p className="text-cyan-400 font-semibold">4.2 GB / 8 GB</p>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "52.5%" }}
                    ></div>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <div className="flex justify-between">
                    <p className="text-slate-400 text-sm">Sinal</p>
                    <p className="text-cyan-400 font-semibold">📶 Excelente</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-slate-400 text-sm">Temperatura</p>
                    <p className="text-cyan-400 font-semibold">36°C</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-slate-400 text-sm">Último Acesso</p>
                    <p className="text-cyan-400 font-semibold">Agora</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Aba: Comandos */}
        <TabsContent value="commands" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: "📸",
                title: "Tirar Screenshot",
                desc: "Capturar tela do dispositivo",
                color: "cyan",
              },
              {
                icon: "🔊",
                title: "Ativar Som",
                desc: "Reproduzir som no dispositivo",
                color: "blue",
              },
              {
                icon: "🔒",
                title: "Bloquear Dispositivo",
                desc: "Bloquear a tela do dispositivo",
                color: "purple",
              },
              {
                icon: "🚫",
                title: "Travar Tela",
                desc: "Travar a tela permanentemente",
                color: "orange",
              },
              {
                icon: "📍",
                title: "Rastrear Localização",
                desc: "Obter localização GPS em tempo real",
                color: "red",
              },
              {
                icon: "🔄",
                title: "Sincronizar",
                desc: "Sincronizar dados do dispositivo",
                color: "green",
              },
            ].map((cmd, idx) => (
              <Card
                key={idx}
                className="bg-slate-800 border-slate-700 p-4 hover:border-cyan-500 transition cursor-pointer"
              >
                <div className="text-3xl mb-2">{cmd.icon}</div>
                <h4 className="text-cyan-400 font-bold">{cmd.title}</h4>
                <p className="text-slate-400 text-sm mt-1">{cmd.desc}</p>
                <Button className="w-full mt-3 bg-cyan-600 hover:bg-cyan-700 text-white">
                  Executar
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Aba: Screenshots */}
        <TabsContent value="screenshots" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700 p-6">
            <h3 className="text-cyan-400 font-bold mb-4">📸 Galeria de Screenshots</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-slate-700 rounded-lg overflow-hidden aspect-video flex items-center justify-center hover:bg-slate-600 transition cursor-pointer"
                >
                  <div className="text-center">
                    <p className="text-2xl mb-2">📱</p>
                    <p className="text-slate-400 text-xs">Screenshot {i}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Aba: Keylogs */}
        <TabsContent value="keylogs" className="space-y-4">
          <div className="flex gap-2 mb-4">
            <Button
              onClick={handleRemoveSelectedKeylogs}
              disabled={selectedKeylogs.size === 0}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              🗑️ Remover Selecionados ({selectedKeylogs.size})
            </Button>
            <Button
              onClick={handleRemoveAllKeylogs}
              disabled={keylogs.length === 0}
              className="bg-red-700 hover:bg-red-800 text-white"
            >
              ⚠️ Remover Todos
            </Button>
          </div>
          <Card className="bg-slate-800 border-slate-700 p-6">
            <h3 className="text-cyan-400 font-bold mb-4">⌨️ Keylogs Ativos ({keylogs.length})</h3>
            {keylogs.length === 0 ? (
              <p className="text-slate-400 text-center py-8">Nenhum keylog disponível</p>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {keylogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center gap-3 p-3 bg-slate-700 rounded border border-slate-600 hover:border-cyan-500 transition"
                  >
                    <input
                      type="checkbox"
                      checked={selectedKeylogs.has(log.id)}
                      onChange={() => handleToggleKeylogSelection(log.id)}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <div className="flex-1">
                      <p className="text-slate-300">
                        <span className="text-cyan-400">{log.app}</span>: {log.key}
                      </p>
                      <p className="text-slate-500 text-xs">{log.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>

        {/* Aba: Histórico */}
        <TabsContent value="history" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700 p-6">
            <h3 className="text-cyan-400 font-bold mb-4">📜 Histórico de Keylogs Removidos ({keylogHistory.length})</h3>
            {keylogHistory.length === 0 ? (
              <p className="text-slate-400 text-center py-8">Nenhum keylog no histórico</p>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {keylogHistory.map((log) => (
                  <div
                    key={log.id}
                    className="flex justify-between items-center p-3 bg-slate-700 rounded border border-slate-600 hover:border-yellow-500 transition"
                  >
                    <div>
                      <p className="text-slate-300">
                        <span className="text-yellow-400">{log.app}</span>: {log.key}
                      </p>
                      <p className="text-slate-500 text-xs">{log.time}</p>
                    </div>
                    <Button
                      onClick={() => handleRestoreKeylog(log.id)}
                      className="bg-green-600 hover:bg-green-700 text-white text-sm"
                    >
                      ↩️ Restaurar
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>

      {/* Visualização ao Vivo */}
      {isLiveActive && (
        <div className="mt-8">
          <Card className="bg-slate-800 border-slate-700 p-6">
            <h3 className="text-cyan-400 font-bold mb-4">
              🔴 Visualização Ao Vivo
            </h3>
            <div className="bg-black rounded-lg overflow-hidden aspect-video flex items-center justify-center border-2 border-red-500">
              <div className="text-center">
                <p className="text-4xl mb-2">📱</p>
                <p className="text-slate-400">Transmissão ao vivo do dispositivo</p>
                <p className="text-red-500 text-sm mt-2">● Gravando</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
