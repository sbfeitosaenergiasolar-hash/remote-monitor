import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, Eye, Gamepad2 } from "lucide-react";

interface Device {
  id: string;
  name: string;
  model: string;
  status: "online" | "offline";
  battery: number;
  lastSeen: string;
  location: string;
}

interface ControlAction {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const controlActions: ControlAction[] = [
  { id: "screenshot", name: "Tirar Screenshot", icon: "📸", description: "Capturar tela do dispositivo" },
  { id: "sound", name: "Ativar Som", icon: "🔊", description: "Reproduzir som no dispositivo" },
  { id: "lock", name: "Bloquear Dispositivo", icon: "🔒", description: "Bloquear a tela do dispositivo" },
  { id: "lock-screen", name: "Travar Tela", icon: "🚫", description: "Travar a tela permanentemente" },
  { id: "location", name: "Rastrear Localização", icon: "📍", description: "Obter localização GPS em tempo real" },
  { id: "sync", name: "Sincronizar", icon: "🔄", description: "Sincronizar dados do dispositivo" },
];

export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: "1",
      name: "Smartphone 1",
      model: "Samsung Galaxy A12",
      status: "online",
      battery: 85,
      lastSeen: "Agora",
      location: "São Paulo, SP",
    },
    {
      id: "2",
      name: "Smartphone 2",
      model: "iPhone 12",
      status: "online",
      battery: 72,
      lastSeen: "Agora",
      location: "Rio de Janeiro, RJ",
    },
    {
      id: "3",
      name: "Smartphone 3",
      model: "Motorola G9",
      status: "online",
      battery: 60,
      lastSeen: "Agora",
      location: "Belo Horizonte, MG",
    },
    {
      id: "4",
      name: "Smartphone 4",
      model: "Samsung Galaxy S21",
      status: "offline",
      battery: 15,
      lastSeen: "2 horas atrás",
      location: "Brasília, DF",
    },
    {
      id: "5",
      name: "Smartphone 5",
      model: "Xiaomi Redmi Note 9",
      status: "offline",
      battery: 0,
      lastSeen: "5 horas atrás",
      location: "Salvador, BA",
    },
  ]);

  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [showControlPanel, setShowControlPanel] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const onlineDevices = devices.filter((d) => d.status === "online");
  const offlineDevices = devices.filter((d) => d.status === "offline");

  const handleControl = (device: Device) => {
    setSelectedDevice(device);
    setShowControlPanel(true);
    setShowDetails(false);
  };

  const handleDetails = (device: Device) => {
    setSelectedDevice(device);
    setShowDetails(true);
    setShowControlPanel(false);
  };

  const handleAction = (actionId: string) => {
    const action = controlActions.find((a) => a.id === actionId);
    if (action) {
      setActionFeedback(`${action.icon} ${action.name} - Executando...`);
      setTimeout(() => {
        setActionFeedback(`✅ ${action.name} - Concluído com sucesso!`);
        setTimeout(() => setActionFeedback(null), 3000);
      }, 1500);
    }
  };

  const handleDeleteDevice = (id: string) => {
    setDevices(devices.filter((d) => d.id !== id));
  };

  // Tela de Controle
  if (showControlPanel && selectedDevice) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 p-6">
        <div className="max-w-4xl mx-auto">
          <Button
            onClick={() => {
              setShowControlPanel(false);
              setSelectedDevice(null);
            }}
            variant="outline"
            className="border-cyan-400/30 text-cyan-300 hover:bg-cyan-900/20 mb-8"
          >
            ← Voltar
          </Button>

          <h1 className="text-4xl font-bold text-cyan-300 mb-2">🎮 Controlar {selectedDevice.name}</h1>
          <p className="text-slate-400 mb-8">Modelo: {selectedDevice.model}</p>

          {actionFeedback && (
            <Card className="bg-blue-900/30 border-blue-400/30 p-4 mb-8">
              <p className="text-blue-300">{actionFeedback}</p>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {controlActions.map((action) => (
              <Card
                key={action.id}
                className="bg-slate-900/50 backdrop-blur-xl border-cyan-400/30 p-6 hover:border-cyan-400/60 transition cursor-pointer"
                onClick={() => handleAction(action.id)}
              >
                <div className="text-4xl mb-3">{action.icon}</div>
                <h3 className="text-lg font-bold text-cyan-300 mb-2">{action.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{action.description}</p>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold">
                  Executar
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Tela de Detalhes
  if (showDetails && selectedDevice) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 p-6">
        <div className="max-w-4xl mx-auto">
          <Button
            onClick={() => {
              setShowDetails(false);
              setSelectedDevice(null);
            }}
            variant="outline"
            className="border-cyan-400/30 text-cyan-300 hover:bg-cyan-900/20 mb-8"
          >
            ← Voltar
          </Button>

          <h1 className="text-4xl font-bold text-cyan-300 mb-2">📱 Detalhes - {selectedDevice.name}</h1>
          <p className="text-slate-400 mb-8">Informações completas do dispositivo</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-900/50 backdrop-blur-xl border-cyan-400/30 p-6">
              <h3 className="text-lg font-bold text-cyan-300 mb-4">Informações Básicas</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-slate-400 text-sm">Nome do Dispositivo</p>
                  <p className="text-white font-medium">{selectedDevice.name}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Modelo</p>
                  <p className="text-white font-medium">{selectedDevice.model}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Status</p>
                  <p className={`font-medium ${selectedDevice.status === "online" ? "text-green-400" : "text-red-400"}`}>
                    {selectedDevice.status === "online" ? "🟢 Online" : "🔴 Offline"}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Localização</p>
                  <p className="text-white font-medium">{selectedDevice.location}</p>
                </div>
              </div>
            </Card>

            <Card className="bg-slate-900/50 backdrop-blur-xl border-cyan-400/30 p-6">
              <h3 className="text-lg font-bold text-cyan-300 mb-4">Status do Sistema</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-slate-400 text-sm">Bateria</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-700/50 rounded-full h-2">
                      <div
                        className={`h-full rounded-full transition-all ${
                          selectedDevice.battery > 50
                            ? "bg-green-500"
                            : selectedDevice.battery > 20
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${selectedDevice.battery}%` }}
                      ></div>
                    </div>
                    <span className="text-white font-medium w-12">{selectedDevice.battery}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Sinal</p>
                  <p className="text-white font-medium">📶 Excelente</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Memória</p>
                  <p className="text-white font-medium">4.2 GB / 8 GB</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Temperatura</p>
                  <p className="text-white font-medium">36°C</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Último Acesso</p>
                  <p className="text-white font-medium">{selectedDevice.lastSeen}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Lista de Dispositivos
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-cyan-300 mb-2">📱 Dispositivos</h1>
            <p className="text-slate-400">Total: {devices.length} dispositivos</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Adicionar Dispositivo
          </Button>
        </div>

        {/* Dispositivos Online */}
        {onlineDevices.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-green-400 mb-4">🟢 Online ({onlineDevices.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {onlineDevices.map((device) => (
                <Card
                  key={device.id}
                  className="bg-slate-900/50 backdrop-blur-xl border-cyan-400/30 p-6 hover:border-cyan-400/60 transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-cyan-300">{device.name}</h3>
                      <p className="text-slate-400 text-sm">{device.model}</p>
                    </div>
                    <span className="bg-green-900/30 text-green-300 text-xs font-bold px-2 py-1 rounded">
                      🟢 Online
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Bateria</span>
                      <span className="text-white font-medium">{device.battery}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Localização</span>
                      <span className="text-white font-medium">{device.location}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Último Acesso</span>
                      <span className="text-white font-medium">{device.lastSeen}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleControl(device)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold flex items-center justify-center gap-2"
                    >
                      <Gamepad2 className="w-4 h-4" />
                      Controlar
                    </Button>
                    <Button
                      onClick={() => handleDetails(device)}
                      variant="outline"
                      className="flex-1 border-cyan-400/30 text-cyan-300 hover:bg-cyan-900/20 flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Detalhes
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Dispositivos Offline */}
        {offlineDevices.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-red-400 mb-4">🔴 Offline ({offlineDevices.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offlineDevices.map((device) => (
                <Card
                  key={device.id}
                  className="bg-slate-900/50 backdrop-blur-xl border-red-400/30 p-6 hover:border-red-400/60 transition opacity-75"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-300">{device.name}</h3>
                      <p className="text-slate-400 text-sm">{device.model}</p>
                    </div>
                    <span className="bg-red-900/30 text-red-300 text-xs font-bold px-2 py-1 rounded">
                      🔴 Offline
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Bateria</span>
                      <span className="text-white font-medium">{device.battery}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Localização</span>
                      <span className="text-white font-medium">{device.location}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Último Acesso</span>
                      <span className="text-white font-medium">{device.lastSeen}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      disabled
                      className="flex-1 bg-slate-700 text-slate-400 cursor-not-allowed opacity-50"
                    >
                      <Gamepad2 className="w-4 h-4 mr-2" />
                      Controlar
                    </Button>
                    <Button
                      onClick={() => handleDetails(device)}
                      variant="outline"
                      className="flex-1 border-slate-600 text-slate-400 hover:bg-slate-800/20"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDeleteDevice(device.id)}
                      variant="outline"
                      className="flex-1 border-red-400/30 text-red-300 hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
