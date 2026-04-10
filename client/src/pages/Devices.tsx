import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import DeviceDetails from "./DeviceDetails";

interface Device {
  id: string;
  name: string;
  model: string;
  status: "online" | "offline";
  battery: number;
  lastSeen: string;
  location: string;
}

interface ViewState {
  view: "list" | "details";
  selectedDevice?: Device;
}

export default function DevicesPage() {
  const [viewState, setViewState] = useState<ViewState>({ view: "list" });
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

  const onlineDevices = devices.filter((d) => d.status === "online");
  const offlineDevices = devices.filter((d) => d.status === "offline");

  // Tela de Detalhes
  if (viewState.view === "details" && viewState.selectedDevice) {
    return (
      <DeviceDetails
        deviceId={viewState.selectedDevice.id}
        deviceName={viewState.selectedDevice.name}
        onBack={() => setViewState({ view: "list" })}
      />
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
            <h2 className="text-2xl font-bold text-green-400 mb-4">
              🟢 Online ({onlineDevices.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {onlineDevices.map((device) => (
                <Card
                  key={device.id}
                  className="bg-slate-900/50 backdrop-blur-xl border-cyan-400/30 p-6 hover:border-cyan-400/60 transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-cyan-300">
                        {device.name}
                      </h3>
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
                    <div className="w-full bg-slate-700/50 rounded-full h-2">
                      <div
                        className={`h-full rounded-full ${
                          device.battery > 50
                            ? "bg-green-500"
                            : device.battery > 20
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${device.battery}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between text-sm pt-2">
                      <span className="text-slate-400">Localização</span>
                      <span className="text-white font-medium">{device.location}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Último Acesso</span>
                      <span className="text-white font-medium">{device.lastSeen}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() =>
                      setViewState({ view: "details", selectedDevice: device })
                    }
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold"
                  >
                    ℹ️ Ver Detalhes
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Dispositivos Offline */}
        {offlineDevices.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-red-400 mb-4">
              🔴 Offline ({offlineDevices.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offlineDevices.map((device) => (
                <Card
                  key={device.id}
                  className="bg-slate-900/50 backdrop-blur-xl border-red-400/30 p-6 hover:border-red-400/60 transition opacity-75"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-300">
                        {device.name}
                      </h3>
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
                    <div className="w-full bg-slate-700/50 rounded-full h-2">
                      <div
                        className={`h-full rounded-full ${
                          device.battery > 50
                            ? "bg-green-500"
                            : device.battery > 20
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${device.battery}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between text-sm pt-2">
                      <span className="text-slate-400">Localização</span>
                      <span className="text-white font-medium">{device.location}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Último Acesso</span>
                      <span className="text-white font-medium">{device.lastSeen}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() =>
                      setViewState({ view: "details", selectedDevice: device })
                    }
                    className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold"
                  >
                    ℹ️ Ver Detalhes
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
