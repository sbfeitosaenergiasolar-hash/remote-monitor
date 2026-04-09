import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Plus, Smartphone, Copy, Trash2, MapPin, Clock, Battery, Wifi, Globe } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Devices() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    deviceId: "",
    deviceName: "",
    deviceType: "android" as "android" | "ios",
    osVersion: "",
    manufacturer: "",
    model: "",
    country: "BR" as string,
  });

  const devicesQuery = trpc.device.list.useQuery(undefined, { enabled: isAuthenticated });
  const createDeviceMutation = trpc.device.create.useMutation({
    onSuccess: () => {
      devicesQuery.refetch();
      setFormData({
        deviceId: "",
        deviceName: "",
        deviceType: "android",
        osVersion: "",
        manufacturer: "",
        model: "",
        country: "BR",
      });
      setIsOpen(false);
      toast.success("Dispositivo criado com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao criar dispositivo: " + error.message);
    },
  });

  const generateTokenMutation = trpc.device.generateInstallToken.useMutation({
    onSuccess: (data) => {
      toast.success("Token gerado! Copie para usar na instalação.");
      navigator.clipboard.writeText(data.token);
    },
    onError: (error) => {
      toast.error("Erro ao gerar token: " + error.message);
    },
  });

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createDeviceMutation.mutate(formData);
  };

  const isDeviceOnline = (device: any) => {
    if (!device.lastSeen) return false;
    const lastSeenTime = new Date(device.lastSeen).getTime();
    const now = new Date().getTime();
    const fiveMinutesAgo = now - 5 * 60 * 1000;
    return lastSeenTime > fiveMinutesAgo;
  };

  const getStatusColor = (device: any) => {
    return isDeviceOnline(device) ? "text-green-400" : "text-red-400";
  };

  const getStatusBg = (device: any) => {
    return isDeviceOnline(device) ? "bg-green-400/20 border-green-400/50" : "bg-red-400/20 border-red-400/50";
  };

  return (
    <MainLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-cyan-300 mb-2">Dispositivos</h1>
            <p className="text-slate-400">Gerencie seus dispositivos monitorados</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold">
                <Plus className="mr-2 w-4 h-4" />
                Novo Dispositivo
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800/50 border-cyan-400/30">
              <DialogHeader>
                <DialogTitle className="text-cyan-300">Cadastrar Novo Dispositivo</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="deviceId" className="text-slate-300">ID do Dispositivo</Label>
                  <Input
                    id="deviceId"
                    className="bg-slate-700/50 border-cyan-400/30 text-white"
                    value={formData.deviceId}
                    onChange={(e) => setFormData({ ...formData, deviceId: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deviceName" className="text-slate-300">Nome do Dispositivo</Label>
                  <Input
                    id="deviceName"
                    className="bg-slate-700/50 border-cyan-400/30 text-white"
                    value={formData.deviceName}
                    onChange={(e) => setFormData({ ...formData, deviceName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deviceType" className="text-slate-300">Tipo</Label>
                  <Select value={formData.deviceType} onValueChange={(value: any) => setFormData({ ...formData, deviceType: value })}>
                    <SelectTrigger className="bg-slate-700/50 border-cyan-400/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="android">Android</SelectItem>
                      <SelectItem value="ios">iOS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="osVersion" className="text-slate-300">Versão do SO</Label>
                  <Input
                    id="osVersion"
                    className="bg-slate-700/50 border-cyan-400/30 text-white"
                    value={formData.osVersion}
                    onChange={(e) => setFormData({ ...formData, osVersion: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manufacturer" className="text-slate-300">Fabricante</Label>
                  <Input
                    id="manufacturer"
                    className="bg-slate-700/50 border-cyan-400/30 text-white"
                    value={formData.manufacturer}
                    onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model" className="text-slate-300">Modelo</Label>
                  <Input
                    id="model"
                    className="bg-slate-700/50 border-cyan-400/30 text-white"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-slate-300">País</Label>
                  <Select value={formData.country} onValueChange={(value: any) => setFormData({ ...formData, country: value })}>
                    <SelectTrigger className="bg-slate-700/50 border-cyan-400/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BR">🇧🇷 Brasil</SelectItem>
                      <SelectItem value="MX">🇲🇽 México</SelectItem>
                      <SelectItem value="ES">🇪🇸 Espanha</SelectItem>
                      <SelectItem value="PT">🇵🇹 Portugal</SelectItem>
                      <SelectItem value="US">🇺🇸 Estados Unidos</SelectItem>
                      <SelectItem value="AR">🇦🇷 Argentina</SelectItem>
                      <SelectItem value="DE">🇩🇪 Alemanha</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="submit"
                  disabled={createDeviceMutation.isPending}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold"
                >
                  {createDeviceMutation.isPending ? <Loader2 className="mr-2 w-4 h-4 animate-spin" /> : null}
                  Criar Dispositivo
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Devices Grid */}
        {devicesQuery.isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
          </div>
        ) : devicesQuery.data && devicesQuery.data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devicesQuery.data.map((device: any) => (
              <Card
                key={device.id}
                className={`bg-slate-800/50 border-2 p-6 transition-all duration-300 ${getStatusBg(device)}`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-3 rounded-lg">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-cyan-300">{device.deviceName}</h3>
                      <p className="text-xs text-slate-400">{device.deviceType.toUpperCase()}</p>
                      {device.country && (
                        <p className="text-lg mt-1">
                          {device.country === 'BR' && '🇧🇷'}
                          {device.country === 'MX' && '🇲🇽'}
                          {device.country === 'ES' && '🇪🇸'}
                          {device.country === 'PT' && '🇵🇹'}
                          {device.country === 'US' && '🇺🇸'}
                          {device.country === 'AR' && '🇦🇷'}
                          {device.country === 'DE' && '🇩🇪'}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 ${getStatusColor(device)}`}>
                    <Wifi className="w-4 h-4" />
                    <span className="text-xs font-semibold">
                      {isDeviceOnline(device) ? "ONLINE" : "OFFLINE"}
                    </span>
                  </div>
                </div>

                {/* Device Info */}
                <div className="space-y-2 mb-4 text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-cyan-400" />
                    <span>{device.model || "Modelo desconhecido"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span>
                      {device.lastSeen
                        ? new Date(device.lastSeen).toLocaleString("pt-BR")
                        : "Nunca conectado"}
                    </span>
                  </div>
                  {device.lastLocation && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                      <span>
                        {device.lastLocation.latitude?.toFixed(4)}, {device.lastLocation.longitude?.toFixed(4)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => generateTokenMutation.mutate({ deviceId: device.id, tokenType: device.deviceType })}
                    disabled={generateTokenMutation.isPending}
                    variant="outline"
                    className="flex-1 border-cyan-400/30 text-cyan-300 hover:bg-slate-700/50"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Token
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-red-400/30 text-red-300 hover:bg-red-400/10"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remover
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-slate-800/50 border-cyan-400/20 p-12 text-center">
            <Smartphone className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-400 mb-4">Nenhum dispositivo cadastrado</p>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold">
                  <Plus className="mr-2 w-4 h-4" />
                  Cadastrar Primeiro Dispositivo
                </Button>
              </DialogTrigger>
            </Dialog>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
