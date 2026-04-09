import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Plus, Smartphone, Copy, Trash2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

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
    navigate("/");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createDeviceMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 scan-lines">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold neon-glow">DISPOSITIVOS</h1>
            <p className="text-muted-foreground">Gerencie seus dispositivos monitorados</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="btn-neon bg-accent text-accent-foreground hover:bg-accent/90">
                <Plus className="mr-2" size={20} />
                Novo Dispositivo
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-2 border-foreground">
              <DialogHeader>
                <DialogTitle className="neon-glow">Cadastrar Novo Dispositivo</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="deviceId" className="text-foreground">ID do Dispositivo</Label>
                  <Input
                    id="deviceId"
                    className="input-neon"
                    value={formData.deviceId}
                    onChange={(e) => setFormData({ ...formData, deviceId: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deviceName" className="text-foreground">Nome do Dispositivo</Label>
                  <Input
                    id="deviceName"
                    className="input-neon"
                    value={formData.deviceName}
                    onChange={(e) => setFormData({ ...formData, deviceName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deviceType" className="text-foreground">Tipo</Label>
                  <Select value={formData.deviceType} onValueChange={(value: any) => setFormData({ ...formData, deviceType: value })}>
                    <SelectTrigger className="input-neon">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="android">Android</SelectItem>
                      <SelectItem value="ios">iOS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="osVersion" className="text-foreground">Versão do SO</Label>
                  <Input
                    id="osVersion"
                    className="input-neon"
                    value={formData.osVersion}
                    onChange={(e) => setFormData({ ...formData, osVersion: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manufacturer" className="text-foreground">Fabricante</Label>
                  <Input
                    id="manufacturer"
                    className="input-neon"
                    value={formData.manufacturer}
                    onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model" className="text-foreground">Modelo</Label>
                  <Input
                    id="model"
                    className="input-neon"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={createDeviceMutation.isPending}
                  className="w-full btn-neon bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {createDeviceMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" size={20} />
                      Criando...
                    </>
                  ) : (
                    "Criar Dispositivo"
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Devices Grid */}
        {devicesQuery.isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-foreground" size={48} />
          </div>
        ) : devicesQuery.data && devicesQuery.data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devicesQuery.data.map((device: any) => (
              <Card key={device.id} className="card-neon p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="font-bold text-lg neon-glow">{device.deviceName}</p>
                    <p className="text-sm text-muted-foreground">
                      {device.deviceType === "android" ? "Android" : "iOS"} • {device.osVersion}
                    </p>
                  </div>
                  <div className={`status-${device.status} text-sm font-bold uppercase`}>
                    {device.status === "online" ? "Online" : "Offline"}
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">
                    <span className="text-foreground">ID:</span> {device.deviceId.substring(0, 16)}...
                  </p>
                  {device.manufacturer && (
                    <p className="text-muted-foreground">
                      <span className="text-foreground">Fabricante:</span> {device.manufacturer}
                    </p>
                  )}
                  {device.model && (
                    <p className="text-muted-foreground">
                      <span className="text-foreground">Modelo:</span> {device.model}
                    </p>
                  )}
                  {device.lastSeen && (
                    <p className="text-muted-foreground">
                      <span className="text-foreground">Última atividade:</span> {new Date(device.lastSeen).toLocaleString()}
                    </p>
                  )}
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 neon-border text-foreground hover:bg-accent/10"
                    onClick={() => {
                      generateTokenMutation.mutate({
                        deviceId: device.id,
                        tokenType: device.deviceType,
                      });
                    }}
                  >
                    <Copy size={16} className="mr-1" />
                    Token
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 neon-border text-foreground hover:bg-red-500/10"
                  >
                    <Trash2 size={16} className="mr-1" />
                    Remover
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="card-neon p-12 text-center space-y-4">
            <Smartphone className="mx-auto text-muted-foreground" size={48} />
            <p className="text-lg text-muted-foreground">Nenhum dispositivo cadastrado</p>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="btn-neon bg-accent text-accent-foreground hover:bg-accent/90">
                  <Plus className="mr-2" size={20} />
                  Cadastrar Primeiro Dispositivo
                </Button>
              </DialogTrigger>
            </Dialog>
          </Card>
        )}
      </div>
    </div>
  );
}
