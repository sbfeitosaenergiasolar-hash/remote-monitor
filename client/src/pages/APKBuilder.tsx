import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Download, Loader2, Copy, Check } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function APKBuilderPage() {
  const [companyName, setCompanyName] = useState("FazTudo");
  const [companyUrl, setCompanyUrl] = useState("https://faztudo.com.br");
  const [logoUrl, setLogoUrl] = useState("https://via.placeholder.com/150");
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const buildApkMutation = trpc.apk.build.useMutation();

  const handleBuildAPK = async () => {
    if (!companyName.trim()) {
      alert("Por favor, preencha o Nome da Empresa");
      return;
    }
    
    if (!companyUrl.trim()) {
      alert("Por favor, preencha a URL da Empresa");
      return;
    }
    
    // Validar URL
    try {
      new URL(companyUrl);
    } catch (e) {
      alert("URL da Empresa inválida. Use o formato: https://exemplo.com");
      return;
    }
    
    // Validar URL da logo se fornecida
    if (logoUrl.trim()) {
      try {
        new URL(logoUrl);
      } catch (e) {
        alert("URL da Logo inválida. Use o formato: https://exemplo.com/logo.png");
        return;
      }
    }

    setIsBuilding(true);
    setBuildProgress(0);

    const interval = setInterval(() => {
      setBuildProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + Math.random() * 30;
      });
    }, 500);

    try {
      const result = await buildApkMutation.mutateAsync({
        companyName,
        companyUrl,
        logoUrl: logoUrl || undefined,
      });

      clearInterval(interval);
      setBuildProgress(100);

      if (result.success && result.downloadUrl) {
        // Construir URL completa do download
        const baseUrl = window.location.origin;
        const fullDownloadUrl = `${baseUrl}${result.downloadUrl}`;
        setDownloadUrl(fullDownloadUrl);
      } else {
        throw new Error("Resposta inválida do servidor");
      }
    } catch (error) {
      clearInterval(interval);
      console.error("Erro ao gerar APK:", error);
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      alert(`Erro ao gerar APK: ${errorMessage}. Tente novamente.`);
    } finally {
      setIsBuilding(false);
      setBuildProgress(0);
    }
  };

  const handleCopyLink = () => {
    if (downloadUrl) {
      navigator.clipboard.writeText(downloadUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadAPK = () => {
    if (downloadUrl) {
      window.location.href = downloadUrl;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-cyan-300 mb-2">🔨 Gerador de APK</h1>
        <p className="text-slate-400 mb-8">Crie um APK customizado para sua empresa</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <Card className="bg-slate-900/50 backdrop-blur-xl border-cyan-400/30 p-8">
            <h2 className="text-2xl font-bold text-cyan-300 mb-6">📋 Informações da Empresa</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Nome da Empresa *
                </label>
                <Input
                  type="text"
                  placeholder="Ex: FazTudo"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  disabled={isBuilding}
                  className="bg-slate-800/50 border-cyan-400/30 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  URL da Empresa *
                </label>
                <Input
                  type="url"
                  placeholder="Ex: https://faztudo.com.br"
                  value={companyUrl}
                  onChange={(e) => setCompanyUrl(e.target.value)}
                  disabled={isBuilding}
                  className="bg-slate-800/50 border-cyan-400/30 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Logo da Empresa (URL)
                </label>
                <Input
                  type="url"
                  placeholder="Ex: https://..."
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  disabled={isBuilding}
                  className="bg-slate-800/50 border-cyan-400/30 text-white"
                />
              </div>

              <Button
                onClick={handleBuildAPK}
                disabled={isBuilding}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 rounded-lg disabled:opacity-50 mt-6"
              >
                {isBuilding ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Gerando APK... {Math.round(buildProgress)}%
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    ▶ Build APK
                  </>
                )}
              </Button>

              {isBuilding && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-slate-400 mb-2">
                    <span>Progresso</span>
                    <span>{Math.round(buildProgress)}%</span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full transition-all"
                      style={{ width: `${buildProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {downloadUrl && (
                <div className="mt-4 p-4 bg-green-900/20 border border-green-400/30 rounded-lg space-y-3">
                  <p className="text-green-300 text-sm font-semibold">✅ APK gerado com sucesso!</p>
                  
                  <div className="space-y-2">
                    <p className="text-xs text-slate-400">Link permanente de download:</p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={downloadUrl}
                        readOnly
                        className="flex-1 bg-slate-800/50 border border-cyan-400/30 text-cyan-300 text-xs px-3 py-2 rounded font-mono truncate"
                      />
                      <Button
                        onClick={handleCopyLink}
                        size="sm"
                        className="bg-cyan-600 hover:bg-cyan-700 text-white"
                      >
                        {copied ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button
                    onClick={handleDownloadAPK}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Baixar APK Agora
                  </Button>

                  <p className="text-xs text-slate-400 text-center">
                    Compartilhe o link acima com seus clientes para instalar o app de monitoramento
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Pré-visualização */}
          <Card className="bg-slate-900/50 backdrop-blur-xl border-cyan-400/30 p-8">
            <h2 className="text-2xl font-bold text-cyan-300 mb-6">📱 Pré-visualização</h2>

            <div className="flex justify-center">
              <div className="w-64 bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl border-8 border-slate-700 shadow-2xl p-4">
                {/* Tela do celular */}
                <div className="bg-slate-950 rounded-2xl p-6 text-center space-y-4">
                  {/* Logo */}
                  <div className="flex justify-center">
                    <img
                      src={logoUrl}
                      alt="Logo"
                      className="w-20 h-20 rounded-2xl object-cover bg-blue-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%230ea5e9' width='100' height='100'/%3E%3C/svg%3E";
                      }}
                    />
                  </div>

                  {/* Nome */}
                  <h3 className="text-white font-bold text-lg">{companyName}</h3>
                  <p className="text-slate-400 text-xs">Monitor</p>

                  {/* URL */}
                  <p className="text-cyan-400 text-xs break-all">{companyUrl}</p>

                  {/* Descrição */}
                  <p className="text-slate-400 text-xs">Seu APK será customizado com:</p>
                  <ul className="text-slate-300 text-xs space-y-1">
                    <li>✓ Logo da empresa</li>
                    <li>✓ Nome customizado</li>
                    <li>✓ URL de painel</li>
                    <li>✓ Tema corporativo</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
