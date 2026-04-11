import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings as SettingsIcon, Save } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function SettingsPage() {
  const [monitoringEnabled, setMonitoringEnabled] = useState(false);
  const [processName, setProcessName] = useState("_Remote.exe");
  const [modulePath, setModulePath] = useState("C:\\Users\\root\\Desktop\\0x29aRT.dll");
  
  // Advanced Options
  const [hideFromDebugger, setHideFromDebugger] = useState(false);
  const [stealthInject, setStealthInject] = useState(false);
  const [hideModule, setHideModule] = useState(false);
  const [erasePE, setErasePE] = useState(false);
  const [autoInject, setAutoInject] = useState(false);
  
  // Scramble Options
  const [scramble, setScramble] = useState(false);
  const [removeDebugData, setRemoveDebugData] = useState(false);
  
  // Delay
  const [delay, setDelay] = useState(0);
  const [delayBetween, setDelayBetween] = useState(0);
  const [method, setMethod] = useState("0");

  const saveSettingsMutation = trpc.settings.save.useMutation();
  const toggleMonitoringMutation = trpc.monitoring.toggleService.useMutation();

  const toggleMonitoring = async () => {
    try {
      await toggleMonitoringMutation.mutateAsync({ enabled: !monitoringEnabled });
      setMonitoringEnabled(!monitoringEnabled);
      alert(monitoringEnabled ? "❌ Monitoramento desativado" : "✅ Monitoramento ativado");
    } catch (error) {
      alert("❌ Erro ao controlar monitoramento!");
      console.error(error);
    }
  };

  const saveSettings = async () => {
    try {
      await saveSettingsMutation.mutateAsync({
        processName,
        modulePath,
        hideFromDebugger: hideFromDebugger ? 1 : 0,
        stealthInject: stealthInject ? 1 : 0,
        hideModule: hideModule ? 1 : 0,
        erasePE: erasePE ? 1 : 0,
        autoInject: autoInject ? 1 : 0,
        scramble: scramble ? 1 : 0,
        removeDebugData: removeDebugData ? 1 : 0,
        delay,
        delayBetween,
        injectMethod: method,
      });
      alert("✅ Configurações salvas com sucesso!");
    } catch (error) {
      alert("❌ Erro ao salvar configurações!");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-2">
        <SettingsIcon className="w-6 h-6" />
        <h1 className="text-3xl font-bold">Configurações Avançadas</h1>
      </div>

      {/* Basic Settings */}
      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Configurações Básicas</h2>
        
        <div className="space-y-2">
          <Label>Nome do Processo</Label>
          <Input
            value={processName}
            onChange={(e) => setProcessName(e.target.value)}
            placeholder="_Remote.exe"
          />
        </div>

        <div className="space-y-2">
          <Label>Caminho do Módulo</Label>
          <Input
            value={modulePath}
            onChange={(e) => setModulePath(e.target.value)}
            placeholder="C:\Users\root\Desktop\0x29aRT.dll"
          />
        </div>

        <div className="space-y-2">
          <Label>Método de Injeção</Label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-background"
          >
            <option value="0">Método 0 (Padrão)</option>
            <option value="1">Método 1</option>
            <option value="2">Método 2</option>
            <option value="3">Método 3</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label>Atraso (ms)</Label>
          <Input
            type="number"
            value={delay}
            onChange={(e) => setDelay(parseInt(e.target.value))}
            min="0"
          />
        </div>

        <div className="space-y-2">
          <Label>Atraso Entre (ms)</Label>
          <Input
            type="number"
            value={delayBetween}
            onChange={(e) => setDelayBetween(parseInt(e.target.value))}
            min="0"
          />
        </div>
      </Card>

      {/* Advanced Options */}
      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Opções Avançadas</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between">
            <Label>Ocultar do Debugger</Label>
            <Switch checked={hideFromDebugger} onCheckedChange={setHideFromDebugger} />
          </div>

          <div className="flex items-center justify-between">
            <Label>Injeção Furtiva</Label>
            <Switch checked={stealthInject} onCheckedChange={setStealthInject} />
          </div>

          <div className="flex items-center justify-between">
            <Label>Ocultar Módulo</Label>
            <Switch checked={hideModule} onCheckedChange={setHideModule} />
          </div>

          <div className="flex items-center justify-between">
            <Label>Apagar PE</Label>
            <Switch checked={erasePE} onCheckedChange={setErasePE} />
          </div>

          <div className="flex items-center justify-between">
            <Label>Injeção Automática</Label>
            <Switch checked={autoInject} onCheckedChange={setAutoInject} />
          </div>
        </div>
      </Card>

      {/* Scramble Options */}
      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Opções de Ofuscação</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between">
            <Label>Scramble</Label>
            <Switch checked={scramble} onCheckedChange={setScramble} />
          </div>

          <div className="flex items-center justify-between">
            <Label>Remover Dados Debug</Label>
            <Switch checked={removeDebugData} onCheckedChange={setRemoveDebugData} />
          </div>
        </div>
      </Card>

      {/* Monitoring Control */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Controle de Monitoramento</h2>
            <p className="text-sm text-muted-foreground">Ativar/desativar o MonitoringService</p>
          </div>
          <Switch checked={monitoringEnabled} onCheckedChange={() => toggleMonitoring()} />
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex gap-4">
        <Button onClick={saveSettings} className="gap-2">
          <Save className="w-4 h-4" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
}
