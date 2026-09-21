import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LessonsView } from './components/LessonsView';
import { SimulatorsHub } from './components/SimulatorsHub';
import { SimuladoComponent } from './components/SimuladoComponent';
import { ProfessorDashboard } from './components/ProfessorDashboard';
import { StudentDashboard } from './components/StudentDashboard';
import { AcademicCalendarView } from './components/AcademicCalendarView';
import { DatabaseSchemaView } from './components/DatabaseSchemaView';
import { PedagogicalDashboardView } from './components/PedagogicalDashboardView';
import { CaseStudiesHub } from './components/CaseStudiesHub';
import { ForumModule } from './components/ForumModule';
import { AuthView } from './components/AuthView';
import { authService } from './services/authService';
import { UsuarioAutenticado } from './types';
import { GOOGLE_DRIVE_REPO } from './data/questionsData';
import { ShieldAlert, ExternalLink, ArrowRight } from 'lucide-react';
import { UemaEconomiaLogo } from './components/UemaEconomiaLogo';

export default function App() {
  const [usuarioAtual, setUsuarioAtual] = useState<UsuarioAutenticado | null>(() => {
    return authService.obterUsuarioAtual();
  });

  const [tabAtiva, setTabAtiva] = useState<string>('aulas');
  const [parametroSimulado, setParametroSimulado] = useState<{ aula?: number; unidade?: number } | null>(null);
  const [parametroSimuladorId, setParametroSimuladorId] = useState<any>(undefined);
  const [parametroForumAula, setParametroForumAula] = useState<string | null>(null);

  // Monitorar autenticação do Firebase e sincronizar estado
  useEffect(() => {
    const unsubscribe = authService.observarAutenticacao((usuario) => {
      if (usuario) {
        setUsuarioAtual(usuario);
      }
    });
    return () => unsubscribe();
  }, []);

  // When switching users, update tab to avoid invalid views
  useEffect(() => {
    if (usuarioAtual?.papel === 'aluno') {
      if (tabAtiva === 'professor' || tabAtiva === 'database') {
        setTabAtiva('meu_desempenho');
      }
    }
  }, [usuarioAtual, tabAtiva]);

  const handleLoginSucesso = (usuario: UsuarioAutenticado) => {
    setUsuarioAtual(usuario);
    if (usuario.papel === 'professor') {
      setTabAtiva('professor');
    } else {
      setTabAtiva('aulas');
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUsuarioAtual(null);
  };

  // If no user is logged in, show the dedicated Auth page (Login & Cadastro)
  if (!usuarioAtual) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] flex flex-col font-sans antialiased selection:bg-[#ebc000]/30 selection:text-[#002752]">
        <Navbar
          tabAtiva={tabAtiva}
          setTabAtiva={setTabAtiva}
          usuarioAtual={null}
          onLogout={handleLogout}
          onAbrirLogin={() => {}}
        />
        <main className="flex-1 flex items-center justify-center p-4">
          <AuthView onLoginSucesso={handleLoginSucesso} />
        </main>
        <footer className="bg-[#002752] text-white border-t-4 border-[#ebc000] py-6 text-center text-xs text-slate-300">
          Universidade Estadual do Maranhão (UEMA) • Teoria das Finanças Públicas • Ciências Econômicas
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] flex flex-col font-sans antialiased selection:bg-[#ebc000]/30 selection:text-[#002752]">
      {/* Navigation Header */}
      <Navbar
        tabAtiva={tabAtiva}
        setTabAtiva={setTabAtiva}
        usuarioAtual={usuarioAtual}
        onLogout={handleLogout}
        onAbrirLogin={() => {}}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Module Guard: Prevent module crossover */}
        {usuarioAtual.papel === 'aluno' && (tabAtiva === 'professor' || tabAtiva === 'database') ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs text-center max-w-md mx-auto my-12 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#002752]">
              Acesso Restrito ao Corpo Docente
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              O módulo administrativo da turma e os instrumentos de avaliação são de uso exclusivo do professor da disciplina. Seu progresso e atividades estão disponíveis em <strong>Meu Desempenho</strong>.
            </p>
            <button
              onClick={() => setTabAtiva('meu_desempenho')}
              className="px-5 py-2.5 bg-[#002752] text-white rounded-xl text-xs font-bold hover:bg-[#001c3d] inline-flex items-center gap-1.5"
            >
              Ir para Meu Desempenho <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <>
            {tabAtiva === 'aulas' && (
              <LessonsView
                onOpenSimulator={(simId?: string) => {
                  if (simId) setParametroSimuladorId(simId);
                  setTabAtiva('simuladores');
                }}
                onOpenQuiz={(aulaNumero?: number) => {
                  if (aulaNumero) {
                    setParametroSimulado({ aula: aulaNumero });
                  } else {
                    setParametroSimulado(null);
                  }
                  setTabAtiva('simulado');
                }}
                onOpenForum={(aulaId?: string) => {
                  setParametroForumAula(aulaId || null);
                  setTabAtiva('forum');
                }}
              />
            )}

            {tabAtiva === 'casos' && (
              <CaseStudiesHub
                onNavigateToSimulator={(simId?: string) => {
                  if (simId) setParametroSimuladorId(simId);
                  setTabAtiva('simuladores');
                }}
                onNavigateToForum={(casoId?: string) => {
                  setParametroForumAula(casoId || null);
                  setTabAtiva('forum');
                }}
              />
            )}

            {tabAtiva === 'forum' && (
              <ForumModule
                usuarioAtual={usuarioAtual}
                filtroAulaInicial={parametroForumAula}
                onNavigateToSimulator={(simId: string) => {
                  setParametroSimuladorId(simId);
                  setTabAtiva('simuladores');
                }}
                onNavigateToLesson={() => {
                  setTabAtiva('aulas');
                }}
              />
            )}

            {tabAtiva === 'calendario' && (
              <AcademicCalendarView
                modo={usuarioAtual.papel === 'professor' ? 'docente' : 'aluno'}
                onNavigateToLesson={() => setTabAtiva('aulas')}
                onNavigateToSimulator={(simId?: string) => {
                  if (simId) setParametroSimuladorId(simId);
                  setTabAtiva('simuladores');
                }}
                onNavigateToQuiz={(aulaNumero?: number) => {
                  if (aulaNumero) {
                    setParametroSimulado({ aula: aulaNumero });
                  } else {
                    setParametroSimulado(null);
                  }
                  setTabAtiva('simulado');
                }}
              />
            )}

            {tabAtiva === 'simuladores' && <SimulatorsHub initialSimulatorId={parametroSimuladorId} />}

            {tabAtiva === 'simulado' && (
              <SimuladoComponent
                aulaInicial={parametroSimulado?.aula ?? null}
                unidadeInicial={parametroSimulado?.unidade ?? 'Todas'}
                onNavigateToLessons={() => setTabAtiva('aulas')}
                onNavigateToSimulators={(simId?: string) => {
                  if (simId) setParametroSimuladorId(simId);
                  setTabAtiva('simuladores');
                }}
              />
            )}

            {tabAtiva === 'meu_desempenho' && usuarioAtual.papel === 'aluno' && (
              <StudentDashboard
                usuario={usuarioAtual}
                onNavigateToQuiz={() => {
                  setParametroSimulado(null);
                  setTabAtiva('simulado');
                }}
                onNavigateToLessons={() => setTabAtiva('aulas')}
                onNavigateToSimulators={() => setTabAtiva('simuladores')}
                onNavigateToCalendar={() => setTabAtiva('calendario')}
              />
            )}

            {tabAtiva === 'pedagogico' && (
              <PedagogicalDashboardView
                modo={usuarioAtual.papel === 'professor' ? 'docente' : 'aluno'}
                usuarioAtual={usuarioAtual}
                onNavigateToQuiz={() => {
                  setParametroSimulado(null);
                  setTabAtiva('simulado');
                }}
                onNavigateToLessons={() => setTabAtiva('aulas')}
              />
            )}

            {tabAtiva === 'professor' && usuarioAtual.papel === 'professor' && (
              <ProfessorDashboard />
            )}

            {tabAtiva === 'database' && usuarioAtual.papel === 'professor' && (
              <DatabaseSchemaView />
            )}
          </>
        )}
      </main>

      {/* Institutional Footer */}
      <footer className="bg-[#002752] text-white border-t-4 border-[#ebc000] mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
            {/* Column 1: Institution */}
            <div className="space-y-4 md:col-span-2">
              <div className="p-3 bg-white/10 rounded-2xl border border-white/20 inline-block max-w-md">
                <UemaEconomiaLogo variant="full" color="white" className="h-12 w-full" />
              </div>

              <div>
                <h4 className="font-serif font-bold text-sm text-white">
                  Universidade Estadual do Maranhão (UEMA)
                </h4>
                <p className="text-slate-300 text-[11px]">
                  Centro de Ciências Sociais Aplicadas • Departamento de Economia
                </p>
              </div>

              <p className="text-slate-300 leading-relaxed text-xs max-w-md">
                Plataforma instrucional e laboratório computacional para a disciplina de <strong>Teoria das Finanças Públicas</strong>, integrando as 12 aulas cronológicas, simuladores microeconômicos de equilíbrio geral e escolha pública, painel pedagógico docente e banco de 1.000 questões comentadas.
              </p>
            </div>

            {/* Column 2: Bibliografia & Drive */}
            <div className="space-y-2">
              <h5 className="font-bold text-xs uppercase tracking-wider text-[#ebc000]">
                Fontes Bibliográficas
              </h5>
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                <li>• Arvate & Biderman (2004)</li>
                <li>• Musgrave & Musgrave (1989)</li>
                <li>• Stiglitz (2000)</li>
                <li>• Downs (1957) & Buchanan (1962)</li>
                <li>• Giambiagi & Além (2018)</li>
              </ul>
              <a
                href={GOOGLE_DRIVE_REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#ebc000] font-semibold hover:underline mt-1"
              >
                Acessar pasta no Google Drive <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Column 3: Usuário Ativo & Perfil */}
            <div className="space-y-2">
              <h5 className="font-bold text-xs uppercase tracking-wider text-[#ebc000]">
                Sessão Conectada
              </h5>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-[11px] space-y-1">
                <div>
                  <strong>Usuário:</strong> {usuarioAtual.nome}
                </div>
                <div>
                  <strong>Papel:</strong> {usuarioAtual.papel === 'professor' ? 'Docente / Avaliador' : 'Discente / Aluno'}
                </div>
                <div>
                  <strong>Registro:</strong> {usuarioAtual.matriculaOuSiape}
                </div>
              </div>
              <div className="pt-1 text-[10px] text-slate-400">
                Padrão UEMA • Cores: Azul Marinho (#002752), Dourado (#ebc000), Verde (#00733f).
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
            <span>© {new Date().getFullYear()} Teoria das Finanças Públicas • UEMA Ciências Econômicas. Todos os direitos reservados.</span>
            <div className="flex items-center gap-4 mt-2 sm:mt-0">
              <span>Ambiente Interativo EdTech</span>
              <span>•</span>
              <span>Controle de Acesso por Papel (RBAC)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
