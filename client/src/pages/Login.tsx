import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock, Mail } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validação simples (em produção, seria uma chamada à API)
      if (username === 'admin' && password === 'Mm102030@@') {
        // Armazenar token de sessão
        localStorage.setItem('auth_token', 'admin-token-' + Date.now());
        localStorage.setItem('username', username);
        setLocation('/');
      } else {
        setError('Usuário ou senha incorretos');
      }
    } catch (err) {
      setError('Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
              <Lock className="w-8 h-8 text-slate-900" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">FazTudo Monitor</h1>
          <p className="text-cyan-300">Painel de Monitoramento Corporativo</p>
        </div>

        <Card className="bg-slate-800/50 backdrop-blur-xl border-cyan-400/30 p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <Alert className="bg-red-900/20 border-red-500/50">
                <AlertDescription className="text-red-300">{error}</AlertDescription>
              </Alert>
            )}

            <div>
              <label className="block text-sm font-semibold text-cyan-300 mb-2">
                Usuário
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-cyan-400" />
                <Input
                  type="text"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                  className="pl-10 bg-slate-700/50 border-cyan-400/30 text-white placeholder-slate-400 focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-300 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-cyan-400" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="pl-10 bg-slate-700/50 border-cyan-400/30 text-white placeholder-slate-400 focus:border-cyan-400"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-cyan-400/20">
            <p className="text-center text-slate-400 text-sm">
              Credenciais de teste:
              <br />
              <span className="text-cyan-300 font-mono">admin / Mm102030@@</span>
            </p>
          </div>
        </Card>

        <div className="mt-8 text-center text-slate-400 text-xs">
          <p>© 2026 FazTudo Tecnologia Ltda</p>
          <p className="mt-2">Painel de Monitoramento Corporativo com Conformidade LGPD</p>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
