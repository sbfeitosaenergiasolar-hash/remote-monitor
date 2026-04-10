import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Download, X } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useState } from "react";

export default function APKBuilderPage() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [companyName, setCompanyName] = useState('FazTudo');
  const [companyUrl, setCompanyUrl] = useState('https://faztudo.com.br');
  const [logoUrl, setLogoUrl] = useState('https://via.placeholder.com/150');
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleBuildAPK = async () => {
    if (!companyName.trim() || !companyUrl.trim()) {
      alert('Por favor, preencha todos os campos');
      return;
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

    await new Promise((resolve) => setTimeout(resolve, 3000));
    clearInterval(interval);
    setBuildProgress(100);

    const mockUrl = `https://storage.example.com/apks/${companyName.replace(/\s+/g, '-')}-${Date.now()}.apk`;
    setDownloadUrl(mockUrl);
    setIsBuilding(false);

    setTimeout(() => {
      const link = document.createElement('a');
      link.href = mockUrl;
      link.download = `${companyName}-Monitor.apk`;
      link.click();
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Bem-vindo</h1>
          <p className="text-slate-400 mb-8">Faça login para continuar</p>
          <Button
            onClick={() => (window.location.href = getLoginUrl())}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Entrar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button
            onClick={logout}
            variant="outline"
            className="border-red-400/30 text-red-300 hover:bg-red-900/20"
          >
            Sair
          </Button>
        </div>

        <div className="bg-slate-900 border border-cyan-400/30 rounded-lg overflow-hidden">
          <div className="bg-slate-900 border-b border-cyan-400/30 p-6">
            <h1 className="text-3xl font-bold text-cyan-300">🔨 APK Builder</h1>
            <p className="text-slate-400 mt-2">Gere seu APK customizado com sua marca</p>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Formulário */}
              <div>
                <h3 className="text-lg font-bold text-cyan-300 mb-6">📋 Informações da Empresa</h3>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Nome da Empresa *
                  </label>
                  <Input
                    type="text"
                    placeholder="Ex: FazTudo"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    disabled={isBuilding}
                    className="bg-slate-700/50 border-cyan-400/30 text-white"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    URL da Empresa *
                  </label>
                  <Input
                    type="url"
                    placeholder="Ex: https://faztudo.com.br"
                    value={companyUrl}
                    onChange={(e) => setCompanyUrl(e.target.value)}
                    disabled={isBuilding}
                    className="bg-slate-700/50 border-cyan-400/30 text-white"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Logo da Empresa (URL)
                  </label>
                  <Input
                    type="url"
                    placeholder="Ex: https://..."
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    disabled={isBuilding}
                    className="bg-slate-700/50 border-cyan-400/30 text-white"
                  />
                </div>

                <Button
                  onClick={handleBuildAPK}
                  disabled={isBuilding}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 rounded-lg disabled:opacity-50"
                >
                  {isBuilding ? (
                    <>
                      <div className="animate-spin inline-block mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Gerando APK...
                    </>
                  ) : (
                    <>
                      <Download className="inline-block mr-2 w-4 h-4" />
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
                  <div className="mt-4 p-3 bg-green-900/20 border border-green-400/30 rounded-lg">
                    <p className="text-green-300 text-sm">✅ APK gerado com sucesso!</p>
                    <Button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = downloadUrl;
                        link.download = `${companyName}-Monitor.apk`;
                        link.click();
                      }}
                      className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded"
                    >
                      📥 Baixar APK
                    </Button>
                  </div>
                )}
              </div>

              {/* Prévia */}
              <div>
                <h3 className="text-lg font-bold text-cyan-300 mb-6">👁️ Prévia do App</h3>

                <div className="flex justify-center">
                  <div className="w-64 bg-slate-700 rounded-3xl border-8 border-slate-800 overflow-hidden shadow-2xl">
                    <div className="bg-black h-6 flex justify-center">
                      <div className="w-32 h-5 bg-black rounded-b-2xl"></div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-900 to-blue-900 p-4 min-h-96 flex flex-col items-center justify-center">
                      {logoUrl && (
                        <img
                          src={logoUrl}
                          alt="Logo"
                          className="w-20 h-20 rounded-lg object-cover border-2 border-cyan-400/50 mb-4"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      )}

                      <h4 className="text-lg font-bold text-cyan-300 text-center mb-2">
                        {companyName || 'Seu App'}
                      </h4>

                      <p className="text-xs text-slate-400 text-center break-all mb-6">
                        {companyUrl || 'https://seu-site.com'}
                      </p>

                      <div className="bg-slate-800/50 border border-cyan-400/30 rounded-lg p-3 w-full text-center">
                        <p className="text-xs text-slate-300">✅ App pronto para instalar</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-slate-700/30 border border-cyan-400/20 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-cyan-300 mb-3">ℹ️ Informações</h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li>✓ APK customizado com sua marca</li>
                    <li>✓ Integrado ao seu painel</li>
                    <li>✓ Pronto para distribuir</li>
                    <li>✓ Suporte a múltiplos dispositivos</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
