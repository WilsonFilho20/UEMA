import React, { useState } from 'react';
import { authService, RegistroDados } from '../services/authService';
import { UsuarioAutenticado } from '../types';
import {
  GraduationCap,
  BookOpen,
  Lock,
  Mail,
  User,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  FileBadge,
  Loader2
} from 'lucide-react';
import { GOOGLE_DRIVE_REPO } from '../data/questionsData';
import { UemaEconomiaLogo } from './UemaEconomiaLogo';

interface AuthViewProps {
  onLoginSucesso: (usuario: UsuarioAutenticado) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onLoginSucesso }) => {
  const [modo, setModo] = useState<'login' | 'cadastro'>('login');

  // Login form state - clean institutional placeholder
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginSenha, setLoginSenha] = useState<string>('');

  // Cadastro form state
  const [cadNome, setCadNome] = useState<string>('');
  const [cadEmail, setCadEmail] = useState<string>('');
  const [cadSenha, setCadSenha] = useState<string>('');
  const [cadConfirmSenha, setCadConfirmSenha] = useState<string>('');
  const [cadPapel, setCadPapel] = useState<'professor' | 'aluno'>('aluno');
  const [cadMatricula, setCadMatricula] = useState<string>('');
  const [cadTurma, setCadTurma] = useState<string>('Ciências Econômicas 2026.2 - UEMA');

  const [carregando, setCarregando] = useState<boolean>(false);
  const [erroMensagem, setErroMensagem] = useState<string | null>(null);
  const [sucessoMensagem, setSucessoMensagem] = useState<string | null>(null);

  // Handle Google Login (Provedor nativo Firebase do projeto)
  const handleLoginGoogle = async (papel: 'professor' | 'aluno' = 'aluno') => {
    setErroMensagem(null);
    setCarregando(true);
    try {
      const resultado = await authService.loginComGoogle(papel);
      if (resultado.sucesso && resultado.usuario) {
        onLoginSucesso(resultado.usuario);
      } else if (resultado.erro) {
        setErroMensagem(resultado.erro);
      }
    } catch (err: any) {
      setErroMensagem(err.message || 'Erro ao conectar via Google.');
    } finally {
      setCarregando(false);
    }
  };

  // Handle Quick Demo Login
  const handleLoginDemo = async (papel: 'professor' | 'aluno') => {
    setErroMensagem(null);
    setCarregando(true);
    try {
      const resultado = await authService.loginDemonstrativo(papel);
      if (resultado.sucesso && resultado.usuario) {
        onLoginSucesso(resultado.usuario);
      }
    } catch (err: any) {
      setErroMensagem(err.message || 'Erro no acesso rápido.');
    } finally {
      setCarregando(false);
    }
  };

  // Handle Login Submit
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErroMensagem(null);
    setCarregando(true);

    try {
      const resultado = await authService.login(loginEmail, loginSenha);
      if (resultado.sucesso && resultado.usuario) {
        onLoginSucesso(resultado.usuario);
      } else {
        setErroMensagem(resultado.erro || 'Falha ao autenticar.');
      }
    } catch (err: any) {
      setErroMensagem(err.message || 'Erro inesperado durante o login.');
    } finally {
      setCarregando(false);
    }
  };

  // Handle Register Submit
  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setErroMensagem(null);
    setSucessoMensagem(null);

    if (cadSenha !== cadConfirmSenha) {
      setErroMensagem('As senhas digitadas não coincidem.');
      return;
    }

    if (cadSenha.length < 6) {
      setErroMensagem('A senha deve conter no mínimo 6 caracteres.');
      return;
    }

    setCarregando(true);

    try {
      const payload: RegistroDados = {
        nome: cadNome,
        email: cadEmail,
        senha: cadSenha,
        papel: cadPapel,
        matriculaOuSiape: cadMatricula,
        turma: cadTurma
      };

      const resultado = await authService.cadastrar(payload);
      if (resultado.sucesso && resultado.usuario) {
        setSucessoMensagem('Cadastro institucional realizado com sucesso! Redirecionando...');
        setTimeout(() => {
          if (resultado.usuario) onLoginSucesso(resultado.usuario);
        }, 500);
      } else {
        setErroMensagem(resultado.erro || 'Falha ao registrar usuário.');
      }
    } catch (err: any) {
      setErroMensagem(err.message || 'Erro ao registrar no banco de dados.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Left Side: Institutional Brand & Welcome */}
        <div className="lg:col-span-5 bg-[#002752] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden border-b-4 lg:border-b-0 lg:border-r-4 border-[#ebc000]">
          <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-[#ebc000]/10 blur-2xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            {/* Logo Oficial UEMA Economia */}
            <div className="p-3 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-xs">
              <UemaEconomiaLogo variant="full" color="white" className="w-full h-14" />
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#ebc000] text-[#002752] mb-2">
                Ciências Econômicas • UEMA
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-white leading-tight">
                Teoria das Finanças Públicas
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
                Portal acadêmico integrado com controle de acesso institucional para discentes e docentes.
              </p>
            </div>

            <div className="space-y-2.5 pt-4 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00733f] shrink-0" />
                <span>5 Unidades Curriculares e 12 Aulas Cronológicas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00733f] shrink-0" />
                <span>7 Laboratórios Microeconômicos Interativos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00733f] shrink-0" />
                <span>Banco de 1.000 Questões com Gabarito Comentado</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00733f] shrink-0" />
                <span>Painel Docente com Ajuste Pedagógico de Avaliações</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/15 relative z-10">
            <a
              href={GOOGLE_DRIVE_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#ebc000] hover:underline"
            >
              <BookOpen className="w-4 h-4" />
              Repositório de Bibliografias no Drive ↗
            </a>
          </div>
        </div>

        {/* Right Side: Auth Forms */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="block lg:hidden mb-6 p-2 bg-slate-50 border border-slate-200 rounded-xl flex justify-center">
              <UemaEconomiaLogo variant="full" color="navy" className="h-10" />
            </div>

            {/* Tab switch between Login and Cadastro */}
            <div className="flex bg-slate-100 p-1 rounded-xl mb-4">
              <button
                type="button"
                onClick={() => {
                  setModo('login');
                  setErroMensagem(null);
                }}
                className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${
                  modo === 'login'
                    ? 'bg-white text-[#002752] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Acessar Minha Conta (Login)
              </button>
              <button
                type="button"
                onClick={() => {
                  setModo('cadastro');
                  setErroMensagem(null);
                }}
                className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${
                  modo === 'cadastro'
                    ? 'bg-white text-[#002752] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Criar Novo Cadastro
              </button>
            </div>

            {/* Google Sign-in Primary Button (Native Firebase Provider in AI Studio) */}
            <button
              type="button"
              onClick={() => handleLoginGoogle(modo === 'cadastro' ? cadPapel : 'aluno')}
              disabled={carregando}
              className="w-full py-2.5 px-4 mb-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border border-slate-300 shadow-xs transition-all text-xs flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60 hover:border-slate-400"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continuar com Conta Google (Acesso Rápido)</span>
            </button>

            <div className="relative flex py-1 items-center mb-4">
              <div className="grow border-t border-slate-200"></div>
              <span className="shrink mx-3 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                ou com credenciais institucionais
              </span>
              <div className="grow border-t border-slate-200"></div>
            </div>

            {/* Alerts */}
            {erroMensagem && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{erroMensagem}</span>
              </div>
            )}
            {sucessoMensagem && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00733f] shrink-0" />
                <span>{sucessoMensagem}</span>
              </div>
            )}

            {/* Form: LOGIN */}
            {modo === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Email Institucional ou Pessoal
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="ex: aluno@aluno.uema.br ou professor@uema.br"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#002752]/30 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-semibold text-slate-700">Senha de Acesso</label>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={loginSenha}
                      onChange={(e) => setLoginSenha(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#002752]/30 text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={carregando}
                  className="w-full py-3 bg-[#002752] hover:bg-[#001c3d] text-white font-bold rounded-xl shadow-md transition-all text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {carregando ? (
                    <Loader2 className="w-4 h-4 animate-spin text-[#ebc000]" />
                  ) : (
                    <KeyRound className="w-4 h-4 text-[#ebc000]" />
                  )}
                  {carregando ? 'Autenticando...' : 'Entrar na Plataforma'}
                </button>
              </form>
            )}

            {/* Form: CADASTRO */}
            {modo === 'cadastro' && (
              <form onSubmit={handleCadastro} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    Selecione o seu Papel Institucional:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCadPapel('aluno')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        cadPapel === 'aluno'
                          ? 'border-[#00733f] bg-emerald-50 text-emerald-950 ring-2 ring-[#00733f]/20 font-bold'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="block text-sm">🎓 Discente / Aluno</span>
                      <span className="text-[10px] text-slate-500 font-normal block mt-0.5">
                        Acessa aulas, simuladores, simulados e notas
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCadPapel('professor')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        cadPapel === 'professor'
                          ? 'border-[#002752] bg-[#002752]/5 text-[#002752] ring-2 ring-[#002752]/20 font-bold'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="block text-sm">👨‍🏫 Docente / Professor</span>
                      <span className="text-[10px] text-slate-500 font-normal block mt-0.5">
                        Painel pedagógico, turma e gerador de avaliações
                      </span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nome Completo</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={cadNome}
                      onChange={(e) => setCadNome(e.target.value)}
                      placeholder="ex: Maria Silva de Souza"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Email Institucional ou Pessoal</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={cadEmail}
                        onChange={(e) => setCadEmail(e.target.value)}
                        placeholder="usuario@aluno.uema.br"
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {cadPapel === 'professor' ? 'SIAPE / Código Docente' : 'Matrícula UEMA'}
                    </label>
                    <div className="relative">
                      <FileBadge className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={cadMatricula}
                        onChange={(e) => setCadMatricula(e.target.value)}
                        placeholder={cadPapel === 'professor' ? 'SIAPE-88419' : '2026.2.ECO.0042'}
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Senha de Acesso</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        required
                        value={cadSenha}
                        onChange={(e) => setCadSenha(e.target.value)}
                        placeholder="Mínimo 6 caracteres"
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Confirmar Senha</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        required
                        value={cadConfirmSenha}
                        onChange={(e) => setCadConfirmSenha(e.target.value)}
                        placeholder="Repita a senha"
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={carregando}
                  className="w-full py-3 bg-[#00733f] hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all text-xs flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-60"
                >
                  {carregando ? (
                    <Loader2 className="w-4 h-4 animate-spin text-[#ebc000]" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-[#ebc000]" />
                  )}
                  {carregando ? 'Cadastrando no banco de dados...' : 'Finalizar Cadastro Institucional'}
                </button>
              </form>
            )}

            {/* Quick Demo Institutional Access */}
            <div className="mt-6 pt-5 border-t border-slate-200">
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Acesso Rápido para Avaliação Institucional (1 Clique):
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleLoginDemo('professor')}
                  disabled={carregando}
                  className="py-2.5 px-3 bg-slate-100 hover:bg-[#002752] hover:text-white text-[#002752] font-bold rounded-xl transition-all text-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
                >
                  <span>👨‍🏫 Entrar como Docente</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleLoginDemo('aluno')}
                  disabled={carregando}
                  className="py-2.5 px-3 bg-slate-100 hover:bg-[#00733f] hover:text-white text-[#00733f] font-bold rounded-xl transition-all text-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
                >
                  <span>🎓 Entrar como Discente</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
