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
    logoUrl: '',
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
      const response = await fetch('/api/trpc/apk.build', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          json: {
            companyName: config.appName,
            companyUrl: config.appUrl,
            logoUrl: config.logoUrl || undefined,
            protectFromUninstall: true,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Build result:', result, 'Type:', typeof result, 'Is Array:', Array.isArray(result));

      if (interval !== null) clearInterval(interval);
      setBuildProgress(100);

      // Handle tRPC response format
      let data = null;
      
      // Try multiple parsing strategies
      if (Array.isArray(result) && result.length > 0) {
        // Batch format: [{ result: { data: {...} } }]
        console.log('Parsing as batch format');
        const item = result[0];
        data = item?.result?.data || item?.data || item;
      } else if (result?.result?.data) {
        // Normal tRPC format: { result: { data: {...} } }
        console.log('Parsing as normal tRPC format');
        data = result.result.data;
      } else if (result?.success !== undefined) {
        // Direct response format: { success, downloadUrl, filename, ... }
        console.log('Parsing as direct response format');
        data = result;
      } else {
        // Fallback: assume result is the data
        console.log('Parsing as fallback');
        data = result;
      }
      
      console.log('Parsed data:', data);
      
      if (data?.success && data?.downloadUrl && data?.filename) {
        setDownloadUrl(data.downloadUrl);
        setDownloadFilename(data.filename);
        setSuccess(true);
      } else {
        console.error('Invalid response format:', result, 'Parsed data:', data);
        setError(data?.error || data?.message || 'Erro ao gerar APK - formato de resposta inválido');
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-cyan-300 flex items-center gap-3">
            🔨 APK Builder
          </h1>
          <p className="text-slate-400 mt-2">
            Gere um APK customizado que abre qualquer URL. Seus clientes instalam e aparecem no painel.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Configuration */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
                📋 Configuração
              </h2>
              
              <div className="space-y-4">
                {/* App Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Nome do App *
                  </label>
                  <Input
                    value={config.appName}
                    onChange={(e) => setConfig({ ...config, appName: e.target.value })}
                    placeholder="Ex: iFood"
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-500"
                  />
                  <p className="text-xs text-slate-400 mt-1">Aparecerá no ícone do app</p>
                </div>

                {/* App URL */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    URL do App *
                  </label>
                  <Input
                    value={config.appUrl}
                    onChange={(e) => setConfig({ ...config, appUrl: e.target.value })}
                    placeholder="https://www.ifood.com.br/"
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-500"
                  />
                  <p className="text-xs text-slate-400 mt-1">O APK abrirá esta URL</p>
                </div>

                {/* Logo URL */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Logo do App (URL)
                  </label>
                  <Input
                    value={config.logoUrl}
                    onChange={(e) => setConfig({ ...config, logoUrl: e.target.value })}
                    placeholder="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5m8B..."
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-500"
                  />
                  <p className="text-xs text-slate-400 mt-1">Opcional - Logo no ícone</p>
                </div>
              </div>
            </div>

            {/* Error/Success Messages */}
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

            {/* Build Button */}
            <Button
              onClick={handleBuildAPK}
              disabled={isBuilding}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 text-lg"
            >
              {isBuilding ? `⬇️ Gerando... ${buildProgress}%` : '⬇️ Gerar APK'}
            </Button>

            {/* Download Button */}
            {success && downloadUrl && (
              <Button
                onClick={handleDownloadAPK}
                disabled={isDownloading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 text-lg flex items-center justify-center gap-2"
              >
                <Download size={20} />
                {isDownloading ? 'Baixando...' : 'Baixar APK'}
              </Button>
            )}
          </div>

          {/* Middle Column - Phone Preview */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
              📱 Prévia do Celular
            </h2>
            
            {/* Phone Frame */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-3xl border-8 border-slate-700 p-3 shadow-2xl mx-auto max-w-sm">
              {/* Phone Screen */}
              <div className="bg-black rounded-2xl overflow-hidden aspect-[9/16] flex flex-col">
                {/* Status Bar */}
                <div className="bg-black text-white text-xs px-4 py-2 flex justify-between items-center">
                  <span>9:41</span>
                  <span>📶 📡 🔋</span>
                </div>

                {/* App Content */}
                <div className="flex-1 bg-slate-50 flex flex-col items-center justify-center p-4 gap-4">
                  {/* App Icon */}
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg overflow-hidden">
                    {config.logoUrl ? (
                      <img
                        src={config.logoUrl}
                        alt="Logo"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <span className="text-3xl">📱</span>
                    )}
                  </div>

                  {/* App Name */}
                  <h3 className="text-slate-900 font-bold text-lg text-center">{config.appName}</h3>

                  {/* App URL */}
                  <p className="text-slate-600 text-xs text-center break-all">{config.appUrl}</p>

                  {/* Info Text */}
                  <div className="mt-4 text-center text-slate-600 text-xs">
                    <p>Toque para abrir</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Info */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="bg-slate-800/50 border-slate-700 p-4">
              <h3 className="text-cyan-300 font-bold mb-3 flex items-center gap-2">
                💡 Como funciona:
              </h3>
              <ul className="text-slate-300 text-sm space-y-2">
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>APK abre uma URL em WebView</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Cliente instala normalmente</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Dispositivo aparece no painel</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Você monitora em tempo real</span>
                </li>
              </ul>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 p-4">
              <h3 className="text-cyan-300 font-bold mb-3">📥 Download Info</h3>
              {downloadFilename && (
                <div className="text-slate-300 text-sm">
                  <p className="text-xs text-slate-400 mb-1">Arquivo:</p>
                  <code className="bg-slate-900 px-2 py-1 rounded text-cyan-300 text-xs break-all">
                    {downloadFilename}
                  </code>
                </div>
              )}
              {!downloadFilename && (
                <p className="text-slate-400 text-sm">Gere um APK para ver o arquivo aqui</p>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
