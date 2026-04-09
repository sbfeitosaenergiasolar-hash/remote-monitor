import MainLayout from '@/components/MainLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Smartphone, AlertCircle, BarChart3, Shield } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Home() {
  const [, setLocation] = useLocation();

  const stats = [
    { label: 'Dispositivos Ativos', value: '12', icon: Smartphone, color: 'from-blue-600 to-cyan-600' },
    { label: 'Alertas Hoje', value: '3', icon: AlertCircle, color: 'from-orange-600 to-red-600' },
    { label: 'Conformidade LGPD', value: '100%', icon: Shield, color: 'from-green-600 to-emerald-600' },
    { label: 'Relatórios', value: '8', icon: BarChart3, color: 'from-purple-600 to-pink-600' },
  ];

  return (
    <MainLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-cyan-300 mb-2">Dashboard</h1>
          <p className="text-slate-400">Bem-vindo ao painel de monitoramento corporativo</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="bg-slate-800/50 border-cyan-400/20 p-6 hover:border-cyan-400/50 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-cyan-300">{stat.value}</p>
                  </div>
                  <div className={`bg-gradient-to-br ${stat.color} p-4 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-800/50 border-cyan-400/20 p-6">
            <h2 className="text-xl font-bold text-cyan-300 mb-4">Ações Rápidas</h2>
            <div className="space-y-3">
              <Button
                onClick={() => setLocation('/apk-generator')}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold"
              >
                📦 Gerar APK
              </Button>
              <Button
                onClick={() => setLocation('/devices')}
                variant="outline"
                className="w-full border-cyan-400/30 text-cyan-300 hover:bg-slate-700/50"
              >
                📱 Gerenciar Dispositivos
              </Button>
              <Button
                onClick={() => setLocation('/lgpd-compliance')}
                variant="outline"
                className="w-full border-cyan-400/30 text-cyan-300 hover:bg-slate-700/50"
              >
                🛡️ Conformidade LGPD
              </Button>
            </div>
          </Card>

          <Card className="bg-slate-800/50 border-cyan-400/20 p-6">
            <h2 className="text-xl font-bold text-cyan-300 mb-4">Informações</h2>
            <div className="space-y-3 text-sm text-slate-300">
              <p>✅ Sistema de monitoramento corporativo completo</p>
              <p>✅ Conformidade LGPD/GDPR garantida</p>
              <p>✅ Gerador de APK dinâmico integrado</p>
              <p>✅ Suporte a múltiplos dispositivos por cliente</p>
              <p>✅ Alertas em tempo real</p>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
