import { useState, useEffect } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Download, Copy, CheckCircle, AlertCircle } from 'lucide-react';
import MainLayout from '@/components/MainLayout';

export default function APKGenerator() {
  const [companyName, setCompanyName] = useState('FazTudo');
  const [companyUrl, setCompanyUrl] = useState('https://faztudo.com.br');
  const [logoUrl, setLogoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [buildId, setBuildId] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const generateAPK = trpc.apk.generate.useMutation();
  const checkBuildStatus = trpc.apk.status.useQuery(
    { buildId: buildId || '' },
    { enabled: !!buildId && !downloadUrl, refetchInterval: 2000 }
  );

  useEffect(() => {
    if (checkBuildStatus.data?.status === 'completed' && checkBuildStatus.data?.downloadUrl) {
      setDownloadUrl(checkBuildStatus.data.downloadUrl);
      setProgress(100);
    } else if (checkBuildStatus.data?.status === 'building') {
      setProgress(50);
    }
  }, [checkBuildStatus.data]);

  const handleGenerateAPK = async () => {
    setError(null);

    if (!companyName.trim()) {
      setError('Por favor, insira o nome da empresa');
      return;
    }

    if (!companyUrl.trim()) {
      setError('Por favor, insira a URL da empresa');
      return;
    }

    setLoading(true);
    setProgress(10);

    try {
      const result = await generateAPK.mutateAsync({
        panelUrl: 'https://remotemon-vhmaxpe6.manus.space',
        appName: `${companyName} Monitor`,
        packageName: `com.${companyName.toLowerCase()}.monitor`,
      });

      if (result.buildId) {
        setBuildId(result.buildId);
        setProgress(30);
      }
    } catch (err) {
      setError('Não foi possível iniciar a geração do APK');
    } finally {
      setLoading(false);
    }
  };

  if (downloadUrl) {
    return (
      <MainLayout>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <CheckCircle className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-cyan-300 mb-2">APK Gerado com Sucesso! ✅</h1>
            <p className="text-slate-300 mb-6">Seu APK está pronto para download</p>
          </div>

          <Card className="bg-slate-800/50 border-cyan-400/20 p-8 text-center">
            <a
              href={downloadUrl}
              download
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 px-8 rounded-lg transition-all"
            >
              <Download className="w-5 h-5" />
              Baixar APK
            </a>
            <p className="text-slate-400 mt-6 text-sm">
              Compartilhe este link com seus clientes para que eles baixem o app
            </p>
          </Card>

          <Button
            onClick={() => {
              setDownloadUrl(null);
              setBuildId(null);
              setProgress(0);
            }}
            variant="outline"
            className="w-full mt-6 border-cyan-400/30 text-cyan-300 hover:bg-slate-700/50"
          >
            Gerar Outro APK
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-cyan-300 mb-2">🔨 APK Builder</h1>
          <p className="text-slate-300">Crie seu APK customizado em poucos cliques</p>
        </div>

        {error && (
          <Alert className="mb-6 bg-red-900/20 border-red-500/50">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <AlertDescription className="text-red-300">{error}</AlertDescription>
          </Alert>
        )}

        <Card className="bg-slate-800/50 border-cyan-400/20 p-8 mb-6">
          <div className="space-y-6">
            {/* Company Info Section */}
            <div className="border-b border-cyan-400/20 pb-6">
              <h2 className="text-lg font-bold text-cyan-300 mb-4">Informações da Empresa</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-cyan-300 mb-2">
                    Nome da Empresa *
                  </label>
                  <Input
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Ex: FazTudo"
                    className="bg-slate-700/50 border-cyan-400/30 text-white"
                    disabled={loading || !!buildId}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-300 mb-2">
                    URL da Empresa *
                  </label>
                  <Input
                    value={companyUrl}
                    onChange={(e) => setCompanyUrl(e.target.value)}
                    placeholder="Ex: https://faztudo.com.br"
                    className="bg-slate-700/50 border-cyan-400/30 text-white"
                    disabled={loading || !!buildId}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-300 mb-2">
                    Logo da Empresa (URL)
                  </label>
                  <Input
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    placeholder="Ex: https://faztudo.com.br/logo.png"
                    className="bg-slate-700/50 border-cyan-400/30 text-white"
                    disabled={loading || !!buildId}
                  />
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className="border-b border-cyan-400/20 pb-6">
              <h2 className="text-lg font-bold text-cyan-300 mb-4">Prévia do App</h2>
              <div className="bg-slate-700/30 rounded-lg p-6 text-center">
                {logoUrl && (
                  <img
                    src={logoUrl}
                    alt="Logo"
                    className="w-16 h-16 mx-auto mb-4 rounded-lg"
                    onError={() => setLogoUrl('')}
                  />
                )}
                <p className="text-cyan-300 font-bold text-lg">{companyName} Monitor</p>
                <p className="text-slate-400 text-sm mt-2">{companyUrl}</p>
              </div>
            </div>

            {/* Build Status */}
            {buildId && !downloadUrl && (
              <div className="border-b border-cyan-400/20 pb-6">
                <h2 className="text-lg font-bold text-cyan-300 mb-4">Status da Compilação</h2>
                <div className="space-y-4">
                  <div className="w-full bg-slate-700/50 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-slate-300 text-sm text-center">
                    {progress < 50 && 'Iniciando compilação...'}
                    {progress >= 50 && progress < 100 && 'Compilando APK...'}
                    {progress === 100 && 'Concluído!'}
                  </p>
                </div>
              </div>
            )}

            {/* Build Button */}
            <Button
              onClick={handleGenerateAPK}
              disabled={loading || !!buildId}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 text-lg"
            >
              {loading || buildId ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {loading ? 'Iniciando...' : 'Compilando...'}
                </>
              ) : (
                '▶ Build APK'
              )}
            </Button>
          </div>
        </Card>

        <Alert className="bg-blue-900/20 border-blue-500/50">
          <AlertCircle className="w-4 h-4 text-blue-400" />
          <AlertDescription className="text-blue-300">
            Após gerar o APK, você poderá compartilhar o link de download com seus clientes
          </AlertDescription>
        </Alert>
      </div>
    </MainLayout>
  );
}
