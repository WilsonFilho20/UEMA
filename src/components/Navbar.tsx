import React from 'react';
import {
  BookOpen,
  Calendar,
  Cpu,
  GraduationCap,
  Sliders,
  Database,
  ExternalLink,
  LogOut,
  UserCheck,
  TrendingUp,
  LogIn
} from 'lucide-react';
import { UsuarioAutenticado } from '../types';
import { GOOGLE_DRIVE_REPO } from '../data/questionsData';
import { UemaEconomiaLogo } from './UemaEconomiaLogo';

interface NavbarProps {
  tabAtiva: string;
  setTabAtiva: (tab: string) => void;
  usuarioAtual: UsuarioAutenticado | null;
  onLogout: () => void;
  onAbrirLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  tabAtiva,
  setTabAtiva,
  usuarioAtual,
  onLogout,
  onAbrirLogin
}) => {
  // Define menu tabs dynamically based on user role to guarantee non-crossing modules
  const getMenuItens = () => {
    if (!usuarioAtual) {
      return [
        { id: 'aulas', rotulo: '12 Aulas Cronológicas', icone: BookOpen },
        { id: 'calendario', rotulo: 'Calendário de Aulas', icone: Calendar },
        { id: 'simuladores', rotulo: 'Simuladores Interativos', icone: Cpu },
        { id: 'simulado', rotulo: 'Banco de Questões', icone: Sliders }
      ];
    }

    if (usuarioAtual.papel === 'professor') {
      return [
        { id: 'aulas', rotulo: '12 Aulas Cronológicas', icone: BookOpen },
        { id: 'calendario', rotulo: 'Calendário Acadêmico', icone: Calendar },
        { id: 'simuladores', rotulo: 'Simuladores Interativos', icone: Cpu },
        { id: 'simulado', rotulo: 'Banco de 1.000 Questões', icone: Sliders },
        { id: 'professor', rotulo: 'Painel Docente (Gestão)', icone: GraduationCap },
        { id: 'database', rotulo: 'Esquema de Dados', icone: Database }
      ];
    }

    // Aluno navigation: Focused purely on student learning, progress, and tests
    return [
      { id: 'aulas', rotulo: '12 Aulas Cronológicas', icone: BookOpen },
      { id: 'calendario', rotulo: 'Calendário de Aulas', icone: Calendar },
      { id: 'simuladores', rotulo: 'Simuladores Interativos', icone: Cpu },
      { id: 'simulado', rotulo: 'Fazer Simulado', icone: Sliders },
      { id: 'meu_desempenho', rotulo: 'Meu Desempenho', icone: TrendingUp }
    ];
  };

  const menuItens = getMenuItens();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          {/* Brand & Institution */}
          <div
            onClick={() => setTabAtiva('aulas')}
            className="flex items-center gap-3 cursor-pointer select-none group"
            title="UEMA - Curso de Ciências Econômicas"
          >
            {/* Logo Oficial do Curso UEMA Economia */}
            <div className="hidden lg:block py-1">
              <UemaEconomiaLogo variant="full" color="navy" className="h-11 hover:opacity-90 transition-opacity" />
            </div>

            {/* Mobile / Tablet Compact Representation */}
            <div className="flex lg:hidden items-center gap-2.5">
              <UemaEconomiaLogo variant="badge" color="navy" className="h-10" />
              <div className="h-7 w-px bg-slate-200" />
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#002752] block">
                  Finanças Públicas
                </span>
                <span className="text-[9px] font-semibold text-[#00733f] block">
                  UEMA
                </span>
              </div>
            </div>

            {/* Vertical divider + discipline tag on large desktop */}
            <div className="hidden xl:flex items-center gap-3 pl-2 border-l border-slate-200">
              <div className="flex flex-col">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00733f]">
                  Plataforma Acadêmica
                </span>
                <span className="text-xs font-black font-serif text-[#002752] tracking-tight">
                  Teoria das Finanças Públicas
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Tabs (Separated by role) */}
          <nav className="hidden md:flex items-center gap-1">
            {menuItens.map((item) => {
              const Icone = item.icone;
              const ativo = tabAtiva === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setTabAtiva(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    ativo
                      ? 'bg-[#002752] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#002752] hover:bg-slate-100/80'
                  }`}
                >
                  <Icone className={`w-4 h-4 ${ativo ? 'text-[#ebc000]' : 'text-slate-400'}`} />
                  <span>{item.rotulo}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools: Authenticated User Badge & Google Drive */}
          <div className="flex items-center gap-2">
            {/* Logged-in User Profile Pill */}
            {usuarioAtual ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex flex-col items-end text-right">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-800 leading-none">
                      {usuarioAtual.nome.split(' ')[0]} {usuarioAtual.nome.split(' ').slice(-1)[0]}
                    </span>
                    <span
                      className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                        usuarioAtual.papel === 'professor'
                          ? 'bg-[#002752] text-white'
                          : 'bg-[#00733f] text-white'
                      }`}
                    >
                      {usuarioAtual.papel === 'professor' ? 'Docente' : 'Discente'}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {usuarioAtual.matriculaOuSiape}
                  </span>
                </div>

                <button
                  onClick={onLogout}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors"
                  title="Sair da conta e voltar à tela de login"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline">Sair</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onAbrirLogin}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#002752] text-white rounded-lg text-xs font-bold hover:bg-[#001c3d] transition-colors"
              >
                <LogIn className="w-3.5 h-3.5 text-[#ebc000]" />
                Entrar / Cadastrar
              </button>
            )}

            {/* Google Drive Link */}
            <a
              href={GOOGLE_DRIVE_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#00733f] hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors"
              title="Repositório oficial no Google Drive com as referências completas"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#ebc000]" />
              <span className="hidden xl:inline">Drive</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center justify-between overflow-x-auto py-2 border-t border-slate-100 gap-1 text-[11px]">
          {menuItens.map((item) => {
            const Icone = item.icone;
            const ativo = tabAtiva === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTabAtiva(item.id)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-bold shrink-0 ${
                  ativo ? 'bg-[#002752] text-white' : 'text-slate-600'
                }`}
              >
                <Icone className={`w-3.5 h-3.5 ${ativo ? 'text-[#ebc000]' : 'text-slate-400'}`} />
                <span>{item.rotulo.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
