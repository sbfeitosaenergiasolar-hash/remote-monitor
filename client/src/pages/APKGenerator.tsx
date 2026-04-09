import React, { useState, useEffect } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Download, Copy, CheckCircle } from 'lucide-react';

export default function APKGenerator() {
  const [panelUrl, setPanelUrl] = useState('https://remotemon-vhmaxpe6.manus.space');
  const [appName, setAppName] = useState('FazTudo Monitor');
  const [packageName, setPackageName] = useState('com.faztudo.monitor');
  const [loading, setLoading] = useState(false);
  const [buildId, setBuildId] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateAPK = trpc.apk.generate.useMutation();
  const checkBuildStatus = trpc.apk.status.useQuery(
    { buildId: buildId || '' },
    { enabled: !!buildId && !downloadUrl, refetchInterval: 3000 }
  );

  useEffect(() => {
    if (checkBuildStatus.data?.status === 'completed' && checkBuildStatus.data?.downloadUrl) {
      setDownloadUrl(checkBuildStatus.data.downloadUrl);
    }
  }, [checkBuildStatus.data]);

  const handleGenerateAPK = async () => {
    setError(null);

    if (!panelUrl.trim()) {
      setError('Por favor, insira a URL do painel');
      return;
    }

    if (!appName.trim()) {
      setError('Por favor, insira o nome do app');
      return;
    }

    if (!packageName.trim()) {
      setError('Por favor, insira o nome do pacote');
      return;
    }

    // Validar formato do package name
    if (!/^[a-z][a-z0-9_]*(\.[a-z0-9_]+)*$/.test(packageName)) {
      setError('Nome do pacote inválido. Use formato: com.empresa.app');
      return;
    }

    setLoading(true);

    try {
      const result = await generateAPK.mutateAsync({
        panelUrl,
        appName,
        packageName,
      });

      if (result.buildId) {
        setBuildId(result.buildId);
      }
    } catch (err) {
      setError('Não foi possível iniciar a geração do APK');
    } finally {
      setLoading(false);
    }
  };

  if (downloadUrl) {
    return (
      <div className="min-h-screen bg-black p-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <CheckCircle className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-pink-500 mb-2">APK Gerado com Sucesso!</h1>
          </div>

          <Card className="bg-gray-900 border-cyan-400 p-6 mb-6">
            <div className="space-y-4">
              <div>
                <p className="text-cyan-400 font-semibold text-sm">App:</p>
                <p className="text-gray-300">{appName}</p>
              </div>
              <div>
                <p className="text-cyan-400 font-semibold text-sm">Pacote:</p>
                <p className="text-gray-300 font-mono text-sm">{packageName}</p>
              </div>
              <div>
                <p className="text-cyan-400 font-semibold text-sm">Painel:</p>
                <p className="text-gray-300 text-sm break-all">{panelUrl}</p>
              </div>
            </div>
          </Card>

          <div className="space-y-3 mb-6">
            <Button
              onClick={() => window.open(downloadUrl, '_blank')}
              className="w-full bg-cyan-400 text-black hover:bg-cyan-500 font-bold"
            >
              <Download className="w-4 h-4 mr-2" />
              Baixar APK
            </Button>

            <Button
              onClick={() => {
                navigator.clipboard.writeText(downloadUrl);
                alert('Link copiado para a área de transferência!');
              }}
              variant="outline"
              className="w-full border-pink-500 text-pink-500 hover:bg-pink-500/10"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copiar Link
            </Button>
          </div>

          <Card className="bg-gray-900 border-pink-500 border-l-4 p-4 mb-6">
            <h3 className="text-pink-500 font-bold mb-3">📱 Como Instalar:</h3>
            <ol className="text-gray-300 text-sm space-y-2 list-decimal list-inside">
              <li>Baixe o APK</li>
              <li>Transfira para seu Android</li>
              <li>Ative "Fontes desconhecidas" nas configurações</li>
              <li>Clique no APK para instalar</li>
              <li>Abra o app e cole seu token de instalação</li>
            </ol>
          </Card>

          <Button
            onClick={() => {
              setBuildId(null);
              setDownloadUrl(null);
              setPanelUrl('https://remotemon-vhmaxpe6.manus.space');
              setAppName('FazTudo Monitor');
              setPackageName('com.faztudo.monitor');
            }}
            className="w-full bg-pink-500 text-black hover:bg-pink-600 font-bold"
          >
            ➕ Gerar Outro APK
          </Button>
        </div>
      </div>
    );
  }

  if (buildId && !downloadUrl) {
    const progress = checkBuildStatus.data?.progress || 0;
    const message = checkBuildStatus.data?.message || 'Compilando...';
    const isFailed = checkBuildStatus.data?.status === 'failed';

    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          {!isFailed ? (
            <>
              <Loader2 className="w-12 h-12 text-cyan-400 mx-auto mb-4 animate-spin" />
              <h2 className="text-2xl font-bold text-pink-500 mb-2">Gerando APK...</h2>
              <p className="text-4xl font-bold text-cyan-400 mb-4">{progress}%</p>

              <div className="w-full bg-gray-800 rounded-full h-2 mb-4 overflow-hidden">
                <div
                  className="bg-cyan-400 h-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className="text-gray-400 text-sm">{message}</p>
            </>
          ) : (
            <>
              <p className="text-xl font-bold text-red-500 mb-4">❌ Erro na Geração</p>
              <p className="text-gray-400 mb-6">{message}</p>
              <Button
                onClick={() => {
                  setBuildId(null);
                  setDownloadUrl(null);
                }}
                className="w-full bg-pink-500 text-black hover:bg-pink-600"
              >
                🔄 Tentar Novamente
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-pink-500 mb-2">📦 Gerador de APK</h1>
          <p className="text-cyan-400">Crie seu próprio agente Android customizado</p>
        </div>

        {error && (
          <Alert className="bg-red-900/20 border-red-500 mb-6">
            <AlertDescription className="text-red-400">{error}</AlertDescription>
          </Alert>
        )}

        <Card className="bg-gray-900 border-cyan-400 p-6 mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-cyan-400 font-semibold text-sm mb-2">
                URL do Painel *
              </label>
              <Input
                type="url"
                placeholder="https://seu-painel.com"
                value={panelUrl}
                onChange={(e) => setPanelUrl(e.target.value)}
                disabled={loading}
                className="bg-black border-gray-700 text-white"
              />
            </div>

            <div>
              <label className="block text-cyan-400 font-semibold text-sm mb-2">
                Nome do App *
              </label>
              <Input
                type="text"
                placeholder="FazTudo Monitor"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                disabled={loading}
                className="bg-black border-gray-700 text-white"
              />
            </div>

            <div>
              <label className="block text-cyan-400 font-semibold text-sm mb-2">
                Nome do Pacote *
              </label>
              <Input
                type="text"
                placeholder="com.empresa.app"
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                disabled={loading}
                className="bg-black border-gray-700 text-white font-mono text-sm"
              />
              <p className="text-gray-500 text-xs mt-1">
                Formato: com.empresa.app (apenas letras, números e pontos)
              </p>
            </div>

            <Button
              onClick={handleGenerateAPK}
              disabled={loading}
              className="w-full bg-cyan-400 text-black hover:bg-cyan-500 font-bold"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Gerando...
                </>
              ) : (
                <>🚀 Gerar APK</>
              )}
            </Button>
          </div>
        </Card>

        <div className="space-y-4">
          <h2 className="text-lg font-bold text-pink-500 mb-4">ℹ️ Informações</h2>

          <Card className="bg-gray-900 border-gray-700 p-4">
            <h3 className="text-cyan-400 font-bold mb-2">O que é gerado?</h3>
            <p className="text-gray-300 text-sm">
              Um APK customizado com seu painel integrado. Quando o usuário instalar, ele se
              conectará automaticamente ao seu painel.
            </p>
          </Card>

          <Card className="bg-gray-900 border-gray-700 p-4">
            <h3 className="text-cyan-400 font-bold mb-2">Tempo de geração?</h3>
            <p className="text-gray-300 text-sm">
              Geralmente 2-5 minutos. Você pode fechar esta página e voltar depois.
            </p>
          </Card>

          <Card className="bg-gray-900 border-gray-700 p-4">
            <h3 className="text-cyan-400 font-bold mb-2">Segurança?</h3>
            <p className="text-gray-300 text-sm">
              O APK é assinado digitalmente e seguro. Você pode distribuir para seus funcionários
              com confiança.
            </p>
          </Card>

          <Card className="bg-gray-900 border-gray-700 p-4">
            <h3 className="text-cyan-400 font-bold mb-2">Conformidade?</h3>
            <p className="text-gray-300 text-sm">
              Todos os APKs gerados incluem consentimento LGPD e direitos dos funcionários
              garantidos.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
