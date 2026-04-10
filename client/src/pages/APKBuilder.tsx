import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Download, Loader2 } from "lucide-react";
import { BANKS_BY_COUNTRY, getBankName } from "../../../shared/banks";

export default function APKBuilderPage() {
  const [companyName, setCompanyName] = useState("FazTudo");
  const [companyUrl, setCompanyUrl] = useState("https://faztudo.com.br");
  const [logoUrl, setLogoUrl] = useState("https://via.placeholder.com/150");
  const [selectedCountry, setSelectedCountry] = useState("Brasil");
  const [selectedBank, setSelectedBank] = useState("bb");
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const countries = Object.keys(BANKS_BY_COUNTRY).sort();
  const banksInCountry = BANKS_BY_COUNTRY[selectedCountry] || [];

  const handleBuildAPK = async () => {
    if (!companyName.trim() || !companyUrl.trim() || !selectedBank) {
      alert("Por favor, preencha todos os campos obrigatórios");
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

    const bankName = getBankName(selectedBank);
    const apkName = `${companyName.replace(/\s+/g, "-")}-${bankName.replace(/\s+/g, "-")}-Monitor-${Date.now()}.apk`;
    const blob = new Blob(["APK simulado"], {
      type: "application/vnd.android.package-archive",
    });
    const url = URL.createObjectURL(blob);

    setDownloadUrl(url);
    setIsBuilding(false);

    setTimeout(() => {
      const link = document.createElement("a");
      link.href = url;
      link.download = apkName;
      link.click();
      URL.revokeObjectURL(url);
    }, 1000);
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

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  País *
                </label>
                <select
                  value={selectedCountry}
                  onChange={(e) => {
                    setSelectedCountry(e.target.value);
                    const banksInNewCountry = BANKS_BY_COUNTRY[e.target.value] || [];
                    if (banksInNewCountry.length > 0) {
                      setSelectedBank(banksInNewCountry[0].id);
                    }
                  }}
                  disabled={isBuilding}
                  className="w-full px-3 py-2 bg-slate-800/50 border border-cyan-400/30 text-white rounded-md focus:outline-none focus:border-cyan-400"
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Banco *
                </label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  disabled={isBuilding}
                  className="w-full px-3 py-2 bg-slate-800/50 border border-cyan-400/30 text-white rounded-md focus:outline-none focus:border-cyan-400"
                >
                  {banksInCountry.map((bank) => (
                    <option key={bank.id} value={bank.id}>
                      {bank.name}
                    </option>
                  ))}
                </select>
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
                <div className="mt-4 p-3 bg-green-900/20 border border-green-400/30 rounded-lg">
                  <p className="text-green-300 text-sm">✅ APK gerado com sucesso!</p>
                  <Button
                    onClick={() => {
                      const link = document.createElement("a");
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
          </Card>

          {/* Pré-visualização */}
          <Card className="bg-slate-900/50 backdrop-blur-xl border-cyan-400/30 p-8">
            <h2 className="text-2xl font-bold text-cyan-300 mb-6">📱 Pré-visualização</h2>

            <div className="flex flex-col items-center">
              <div className="w-48 h-96 bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl border-8 border-slate-700 shadow-2xl overflow-hidden">
                <div className="w-full h-full flex flex-col items-center justify-center p-4 space-y-4">
                  <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <img
                      src={logoUrl}
                      alt="Logo"
                      className="w-20 h-20 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/80";
                      }}
                    />
                  </div>
                  <h3 className="text-white font-bold text-center text-sm">
                    {companyName}
                  </h3>
                  <p className="text-slate-400 text-xs text-center">Monitor</p>
                  <p className="text-blue-300 text-xs text-center font-semibold">
                    🏦 {getBankName(selectedBank)}
                  </p>
                  <div className="mt-4 text-center space-y-2">
                    <p className="text-cyan-300 text-xs font-mono break-all">
                      {companyUrl}
                    </p>
                    <p className="text-blue-200 text-xs">
                      País: {selectedCountry}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-slate-400 text-sm">
                  Seu APK será customizado com:
                </p>
                <ul className="mt-3 text-left text-xs text-slate-400 space-y-1">
                  <li>✓ Logo da empresa</li>
                  <li>✓ Nome customizado</li>
                  <li>✓ URL de painel</li>
                  <li>✓ Banco: {getBankName(selectedBank)}</li>
                  <li>✓ Tema corporativo</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
