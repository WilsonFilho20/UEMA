import React from 'react';
import { UsuarioAutenticado } from '../types';
import {
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  Clock,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  Play,
  Sparkles,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { GOOGLE_DRIVE_REPO } from '../data/questionsData';
import { UemaEconomiaLogo } from './UemaEconomiaLogo';

interface StudentDashboardProps {
  usuario: UsuarioAutenticado;
  onNavigateToQuiz: () => void;
  onNavigateToLessons: () => void;
  onNavigateToSimulators: () => void;
  onNavigateToCalendar?: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  usuario,
  onNavigateToQuiz,
  onNavigateToLessons,
  onNavigateToSimulators,
  onNavigateToCalendar
}) => {
  return (
    <div className="space-y-6" id="painel-aluno">
      {/* Welcome Banner */}
      <div className="bg-[#002752] text-white p-6 rounded-2xl shadow-sm border-b-4 border-[#ebc000] flex flex-wrap items-center justify-between gap-6">
        <div className="flex-1 min-w-[280px]">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#00733f] text-white uppercase tracking-wider">
              Área do Discente • UEMA
            </span>
            <span className="text-xs text-slate-300">
              Matrícula: <strong className="font-mono text-[#ebc000]">{usuario.matriculaOuSiape}</strong>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight">
            Olá, {usuario.nome}!
          </h2>
          <p className="text-sm text-slate-200 mt-1 max-w-2xl">
            Bem-vindo ao seu ambiente personalizado de aprendizagem em Teoria das Finanças Públicas. Acompanhe seu progresso nas 12 aulas, treine com simuladores e resolva questões com cronômetro.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="p-2 bg-white/10 rounded-xl border border-white/20 hidden md:block">
            <UemaEconomiaLogo variant="compact" color="white" className="h-10" />
          </div>

          {onNavigateToCalendar && (
            <button
              onClick={onNavigateToCalendar}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 shadow-xs transition-colors"
            >
              <Calendar className="w-4 h-4 text-[#ebc000]" />
              Calendário Acadêmico
            </button>
          )}

          <button
            onClick={onNavigateToQuiz}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#ebc000] hover:bg-amber-400 text-[#002752] text-xs font-black shadow-sm transition-transform hover:scale-105"
          >
            <Play className="w-4 h-4 text-[#002752]" />
            Fazer Novo Simulado
          </button>
        </div>
      </div>

      {/* Calendário & Datas Oficiais de Provas (13/08 a 03/12) */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-bold text-[#00733f] uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Cronograma Semestral UEMA • 13/08 a 03/12
            </span>
            <h3 className="text-base font-bold text-[#002752] mt-1 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#ebc000]" />
              Acompanhamento de Datas das Aulas e Avaliações
            </h3>
          </div>
          {onNavigateToCalendar && (
            <button
              onClick={onNavigateToCalendar}
              className="text-xs font-bold text-[#002752] hover:text-[#00733f] inline-flex items-center gap-1 group bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
            >
              Abrir Calendário Completo Detalhado
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>

        {/* 4 Cards de Provas para Acompanhamento Rápido */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {/* Prova 1 */}
          <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 relative">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                1ª Avaliação
              </span>
              <span className="font-mono text-xs font-black text-amber-900 bg-white px-2 py-0.5 rounded border border-amber-200">
                24/09
              </span>
            </div>
            <h4 className="font-bold text-xs text-slate-900 mt-2">Fundamentos & Falhas</h4>
            <p className="text-[11px] text-slate-600 mt-0.5">Aulas 01 a 04 • Mesmo Peso (33,3%)</p>
          </div>

          {/* Prova 2 */}
          <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200 relative">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#002752] bg-blue-100 px-1.5 py-0.5 rounded">
                2ª Avaliação
              </span>
              <span className="font-mono text-xs font-black text-[#002752] bg-white px-2 py-0.5 rounded border border-blue-200">
                22/10
              </span>
            </div>
            <h4 className="font-bold text-xs text-slate-900 mt-2">Bens Públicos & Tributação</h4>
            <p className="text-[11px] text-slate-600 mt-0.5">Aulas 05 a 08 • Mesmo Peso (33,3%)</p>
          </div>

          {/* Prova 3 */}
          <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 relative">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#00733f] bg-emerald-100 px-1.5 py-0.5 rounded">
                3ª Avaliação
              </span>
              <span className="font-mono text-xs font-black text-emerald-900 bg-white px-2 py-0.5 rounded border border-emerald-200">
                26/11
              </span>
            </div>
            <h4 className="font-bold text-xs text-slate-900 mt-2">Escolha Pública & Federalismo</h4>
            <p className="text-[11px] text-slate-600 mt-0.5">Aulas 09 a 12 • Mesmo Peso (33,3%)</p>
          </div>

          {/* Prova Final */}
          <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-200 relative">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-800 bg-purple-100 px-1.5 py-0.5 rounded">
                Prova Final
              </span>
              <span className="font-mono text-xs font-black text-purple-900 bg-white px-2 py-0.5 rounded border border-purple-200">
                03/12
              </span>
            </div>
            <h4 className="font-bold text-xs text-slate-900 mt-2">Exame Cumulativo</h4>
            <p className="text-[11px] text-slate-600 mt-0.5">Aulas 01 a 12 • Encerramento</p>
          </div>
        </div>
      </div>

      {/* Student Personal Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#002752]/10 flex items-center justify-center text-[#002752]">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Aulas Concluídas</span>
            <div className="text-2xl font-black text-[#002752] font-mono">9 / 12</div>
            <span className="text-[11px] text-[#00733f] font-medium">75% da ementa oficial</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#00733f]/10 flex items-center justify-center text-[#00733f]">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Média nos Simulados</span>
            <div className="text-2xl font-black text-[#00733f] font-mono">8.5</div>
            <span className="text-[11px] text-slate-500">Escala de 0 a 10</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Questões Praticadas</span>
            <div className="text-2xl font-black text-slate-800 font-mono">78</div>
            <span className="text-[11px] text-emerald-700 font-bold">84.6% de acerto</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-700">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Tempo de Estudo</span>
            <div className="text-2xl font-black text-indigo-900 font-mono">14h 20m</div>
            <span className="text-[11px] text-indigo-600 font-medium">No semestre atual</span>
          </div>
        </div>
      </div>

      {/* Main Section: Roadmap and Diagnostic */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recommended Next Steps */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-base text-[#002752] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#ebc000]" />
              Próximas Metas Recomendadas para Você
            </h3>
            <span className="text-xs font-semibold text-slate-500">Plano Individual</span>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#002752] text-white">
                  Módulo II • Em Andamento
                </span>
                <h4 className="font-bold text-sm text-slate-900 mt-1">
                  Aula 8: Eficiência Econômica da Tributação & Regra de Ramsey
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Estude a derivação matemática da tributação ótima e o peso morto quadrático de Harberger.
                </p>
              </div>
              <button
                onClick={onNavigateToLessons}
                className="px-3 py-2 bg-white hover:bg-slate-100 text-[#002752] font-bold text-xs rounded-lg border border-slate-300 shrink-0 flex items-center gap-1"
              >
                Abrir Aula <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#00733f] text-white">
                  Laboratório Prático
                </span>
                <h4 className="font-bold text-sm text-slate-900 mt-1">
                  Simulador do Teorema de Kenneth Arrow (Ciclos de Condorcet)
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Experimente o paradoxo de intransitividade e teste os 4 axiomas democráticos da escolha social.
                </p>
              </div>
              <button
                onClick={onNavigateToSimulators}
                className="px-3 py-2 bg-white hover:bg-emerald-50 text-[#00733f] font-bold text-xs rounded-lg border border-emerald-300 shrink-0 flex items-center gap-1"
              >
                Simular <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#ebc000] text-[#002752]">
                  Simulado de Fixação
                </span>
                <h4 className="font-bold text-sm text-slate-900 mt-1">
                  Treino com 5 Questões de Dificuldade Média e Alta
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Reforce seus pontos de melhoria com justificativas comentadas das obras de Arvate e Biderman.
                </p>
              </div>
              <button
                onClick={onNavigateToQuiz}
                className="px-3 py-2 bg-white hover:bg-amber-100 text-amber-900 font-bold text-xs rounded-lg border border-amber-300 shrink-0 flex items-center gap-1"
              >
                Treinar <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Cognitive Strength & Diagnostic Breakdown */}
        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-base text-[#002752] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#00733f]" />
              Diagnóstico de Desempenho
            </h3>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
              Status: Estável
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Questões Nível Baixa (Conceitual)</span>
                <span className="font-mono text-[#00733f]">95% de acerto</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#00733f] rounded-full" style={{ width: '95%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Questões Nível Média (Aplicação em Cenários)</span>
                <span className="font-mono text-[#002752]">85% de acerto</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#002752] rounded-full" style={{ width: '85%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Questões Nível Alta (Teoremas & Derivações)</span>
                <span className="font-mono text-amber-700">60% de acerto</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#ebc000] rounded-full" style={{ width: '60%' }} />
              </div>
            </div>

            {/* Critical topics alert */}
            <div className="p-3.5 bg-amber-50 rounded-lg border border-amber-200 text-amber-950 space-y-1 mt-4">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Ponto de Atenção para a Próxima Avaliação:</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Você teve maior índice de dúvida em questões envolvendo a <strong>Regra da Elasticidade Inversa de Ramsey</strong> e a condição de equilíbrio da <strong>Burocracia de Niskanen (BT=CT)</strong>. Recomendamos revisar as aulas 8 e 9 antes da prova.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
