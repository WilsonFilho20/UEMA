import React, { useState } from 'react';
import { authService, RegistroDados } from '../services/authService';
import { UsuarioAutenticado } from '../types';
import {
  GraduationCap,
  BookOpen,
  Lock,
  Mail,
  User,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  FileBadge
} from 'lucide-react';
import { GOOGLE_DRIVE_REPO } from '../data/questionsData';
import { UemaEconomiaLogo } from './UemaEconomiaLogo';

interface AuthViewProps {
  onLoginSucesso: (usuario: UsuarioAutenticado) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onLoginSucesso }) => {
  const [modo, setModo] = useState<'login' | 'cadastro'>('login');

  // Login form state
  const [loginEmail, setLoginEmail] = useState<string>('professor@uema.br');
  const [loginSenha, setLoginSenha] = useState<string>('uema123');

  // Cadastro form state
  const [cadNome, setCadNome] = useState<string>('');
  const [cadEmail, setCadEmail] = useState<string>('');
  const [cadSenha, setCadSenha] = useState<string>('');
  const [cadConfirmSenha, setCadConfirmSenha] = useState<string>('');
  const [cadPapel, setCadPapel] = useState<'professor' | 'aluno'>('aluno');
  const [cadMatricula, setCadMatricula] = useState<string>('');
  const [cadTurma, setCadTurma] = useState<string>('Ciências Econômicas 2026.2 - UEMA');

  const [erroMensagem, setErroMensagem] = useState<string | null>(null);
  const [sucessoMensagem, setSucessoMensagem] = useState<string | null>(null);

  // Handle Login Submit
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErroMensagem(null);

    const resultado = authService.login(loginEmail, loginSenha);
    if (resultado.sucesso && resultado.usuario) {
      onLoginSucesso(resultado.usuario);
    } else {
      setErroMensagem(resultado.erro || 'Falha ao autenticar.');
    }
  };

  // Handle Register Submit
  const handleCadastro = (e: React.FormEvent) => {
    e.preventDefault();
    setErroMensagem(null);
    setSucessoMensagem(null);

    if (cadSenha !== cadConfirmSenha) {
      setErroMensagem('As senhas digitadas não coincidem.');
      return;
    }

    const payload: RegistroDados = {
      nome: cadNome,
      email: cadEmail,
      senha: cadSenha,
      papel: cadPapel,
      matriculaOuSiape: cadMatricula,
      turma: cadTurma
    };

    const resultado = authService.cadastrar(payload);
    if (resultado.sucesso && resultado.usuario) {
      setSucessoMensagem('Cadastro realizado com sucesso! Redirecionando...');
      setTimeout(() => {
        if (resultado.usuario) onLoginSucesso(resultado.usuario);
      }, 600);
    } else {
      setErroMensagem(resultado.erro || 'Falha ao registrar usuário.');
    }
  };

  // Fast demo account access
  const handleLoginDemo = (tipo: 'professor' | 'aluno') => {
    const usuario = authService.loginDemo(tipo);
    onLoginSucesso(usuario);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Left Side: Institutional Brand & Welcome */}
        <div className="lg:col-span-5 bg-[#002752] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden border-b-4 lg:border-b-0 lg:border-r-4 border-[#ebc000]">
          {/* Decorative background element */}
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
                Ambiente acadêmico integrado com separação rigorosa de módulos entre o <strong>Corpo Docente</strong> e os <strong>Estudantes</strong>.
              </p>
            </div>

            <div className="space-y-2.5 pt-4 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00733f] shrink-0" />
                <span>12 Aulas do Plano de Ensino Oficial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00733f] shrink-0" />
                <span>7 Laboratórios e Simuladores Econômicos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00733f] shrink-0" />
                <span>Banco de 1.000 Questões com Gabarito</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00733f] shrink-0" />
                <span>Painel Docente de Gestão & Avaliação</span>
              </div>
            </div>
          </div>

          {/* Bottom Drive link */}
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
            {/* Mobile-only logo display */}
            <div className="block lg:hidden mb-6 p-2 bg-slate-50 border border-slate-200 rounded-xl flex justify-center">
              <UemaEconomiaLogo variant="full" color="navy" className="h-10" />
            </div>

            {/* Tab switch between Login and Cadastro */}
            <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
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

            {/* Error and Success Alerts */}
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
                    Email Institucional ou Cadastrado
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="ex: professor@uema.br ou aluno@aluno.uema.br"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#002752]/30 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-semibold text-slate-700">Senha de Acesso</label>
                    <span className="text-[11px] text-slate-400">Padrão demo: uema123</span>
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
                  className="w-full py-3 bg-[#002752] hover:bg-[#001c3d] text-white font-bold rounded-xl shadow-md transition-all text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <KeyRound className="w-4 h-4 text-[#ebc000]" />
                  Entrar na Plataforma
                </button>
              </form>
            )}

            {/* Form: CADASTRO */}
            {modo === 'cadastro' && (
              <form onSubmit={handleCadastro} className="space-y-3.5 text-xs">
                {/* Role selection pills */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    Selecione o seu Papel Institucional:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
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
                        Gerencia turma, notas e gerador de provas
                      </span>
                    </button>

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
                        Acessa aulas, simuladores e simulados
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
                      placeholder="ex: Carlos Eduardo de Oliveira"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Email Institucional</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={cadEmail}
                        onChange={(e) => setCadEmail(e.target.value)}
                        placeholder="usuario@uema.br"
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
                        placeholder={cadPapel === 'professor' ? 'SIAPE-99882' : '2026.2.ECO.0042'}
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
                        placeholder="Mínimo 4 caracteres"
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
                  className="w-full py-3 bg-[#00733f] hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all text-xs flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#ebc000]" />
                  Finalizar Cadastro e Entrar no Sistema
                </button>
              </form>
            )}
          </div>

          {/* Quick Demo Access Bar */}
          <div className="mt-6 pt-5 border-t border-slate-200">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2.5">
              <Sparkles className="w-4 h-4 text-[#ebc000]" />
              <span>Acesso Rápido de Teste (Sem digitação):</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleLoginDemo('professor')}
                className="p-2.5 bg-[#002752]/5 hover:bg-[#002752]/10 border border-[#002752]/20 rounded-xl text-left transition-colors flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-[#002752] block">👨‍🏫 Entrar como Professor</span>
                  <span className="text-[10px] text-slate-500 block">Prof. Dr. Ricardo Arvate (Docente)</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#002752]" />
              </button>

              <button
                type="button"
                onClick={() => handleLoginDemo('aluno')}
                className="p-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-left transition-colors flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-[#00733f] block">🎓 Entrar como Aluno</span>
                  <span className="text-[10px] text-slate-500 block">Ana Beatriz Silveira (Discente)</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#00733f]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
