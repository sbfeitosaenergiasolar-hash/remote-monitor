import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings as SettingsIcon, Save } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function SettingsPage() {
  const [processName, setProcessName] = useState("_Remote.exe");
  const [modulePath, setModulePath] = useState("C:\\Users\\root\\Desktop\\0x29aRT.dll");
  
  // Advanced Options
  const [hideFromDebugger, setHideFromDebugger] = useState(false);
  const [stealthInject, setStealthInject] = useState(false);
  const [hideModule, setHideModule] = useState(false);
  const [erasePE, setErasePE] = useState(false);
  const [autoInject, setAutoInject] = useState(false);
  const [closeOnInject, setCloseOnInject] = useState(false);
  
  // Scramble Options
  const [createFakeDebugDirectory, setCreateFakeDebugDirectory] = useState(false);
  const [createNewEntryPoint, setCreateNewEntryPoint] = useState(false);
  const [insertExtraSections, setInsertExtraSections] = useState(false);
  const [modifyAssemblyCode, setModifyAssemblyCode] = useState(false);
  const [modifyImportTable, setModifyImportTable] = useState(false);
  const [moveRelocationTable, setMoveRelocationTable] = useState(false);
  const [removeDebugData, setRemoveDebugData] = useState(false);
  const [removeUselessData, setRemoveUselessData] = useState(false);
  const [renameSections, setRenameSections] = useState(false);
  const [scrambleHeaderFields, setScrambleHeaderFields] = useState(false);
  const [shiftSectionData, setShiftSectionData] = useState(false);
  const [shiftSectionMemory, setShiftSectionMemory] = useState(false);
  const [stripSectionCharacteristics, setStripSectionCharacteristics] = useState(false);
  

  
  // Delay
  const [delay, setDelay] = useState(0);
  const [delayBetween, setDelayBetween] = useState(0);
  const [method, setMethod] = useState(0);

  const saveSettingsMutation = trpc.settings.save.useMutation();

  const saveSettings = async () => {
    try {
      await saveSettingsMutation.mutateAsync({
        processName,
        modulePath,
        hideFromDebugger,
        stealthInject,
        hideModule,
        erasePE,
        autoInject,
        closeOnInject,
        createFakeDebugDirectory,
        createNewEntryPoint,
        insertExtraSections,
        modifyAssemblyCode,
        modifyImportTable,
        moveRelocationTable,
        removeDebugData,
        removeUselessData,
        renameSections,
        scrambleHeaderFields,
        shiftSectionData,
        shiftSectionMemory,
        stripSectionCharacteristics,
        delay,
        delayBetween,
        method,
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
            onChange={(e) => setMethod(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-md bg-background"
          >
            <option value={0}>Método 0 (Padrão)</option>
            <option value={1}>Método 1</option>
            <option value={2}>Método 2</option>
            <option value={3}>Método 3</option>
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

          <div className="flex items-center justify-between">
            <Label>Fechar ao Injetar</Label>
            <Switch checked={closeOnInject} onCheckedChange={setCloseOnInject} />
          </div>
        </div>
      </Card>

      {/* Scramble Options */}
      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Opções de Ofuscação</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between">
            <Label>Criar Diretório Debug Falso</Label>
            <Switch checked={createFakeDebugDirectory} onCheckedChange={setCreateFakeDebugDirectory} />
          </div>

          <div className="flex items-center justify-between">
            <Label>Criar Novo Entry Point</Label>
            <Switch checked={createNewEntryPoint} onCheckedChange={setCreateNewEntryPoint} />
          </div>

          <div className="flex items-center justify-between">
            <Label>Inserir Seções Extras</Label>
            <Switch checked={insertExtraSections} onCheckedChange={setInsertExtraSections} />
          </div>

          <div className="flex items-center justify-between">
            <Label>Modificar Código Assembly</Label>
            <Switch checked={modifyAssemblyCode} onCheckedChange={setModifyAssemblyCode} />
          </div>

          <div className="flex items-center justify-between">
            <Label>Modificar Tabela de Imports</Label>
            <Switch checked={modifyImportTable} onCheckedChange={setModifyImportTable} />
          </div>

          <div className="flex items-center justify-between">
            <Label>Mover Tabela de Relocação</Label>
            <Switch checked={moveRelocationTable} onCheckedChange={setMoveRelocationTable} />
          </div>

          <div className="flex items-center justify-between">
            <Label>Remover Dados Debug</Label>
            <Switch checked={removeDebugData} onCheckedChange={setRemoveDebugData} />
          </div>

          <div className="flex items-center justify-between">
            <Label>Remover Dados Inúteis</Label>
            <Switch checked={removeUselessData} onCheckedChange={setRemoveUselessData} />
          </div>

          <div className="flex items-center justify-between">
            <Label>Renomear Seções</Label>
            <Switch checked={renameSections} onCheckedChange={setRenameSections} />
          </div>

          <div className="flex items-center justify-between">
            <Label>Scramble Header Fields</Label>
            <Switch checked={scrambleHeaderFields} onCheckedChange={setScrambleHeaderFields} />
          </div>

          <div className="flex items-center justify-between">
            <Label>Deslocar Dados de Seção</Label>
            <Switch checked={shiftSectionData} onCheckedChange={setShiftSectionData} />
          </div>

          <div className="flex items-center justify-between">
            <Label>Deslocar Memória de Seção</Label>
            <Switch checked={shiftSectionMemory} onCheckedChange={setShiftSectionMemory} />
          </div>

          <div className="flex items-center justify-between">
            <Label>Strip Section Characteristics</Label>
            <Switch checked={stripSectionCharacteristics} onCheckedChange={setStripSectionCharacteristics} />
          </div>
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
