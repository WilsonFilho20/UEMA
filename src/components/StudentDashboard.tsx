import React, { useState, useEffect, useMemo } from 'react';
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
  ChevronRight,
  Flame,
  CheckSquare,
  History
} from 'lucide-react';
import { GOOGLE_DRIVE_REPO } from '../data/questionsData';
import { UemaEconomiaLogo } from './UemaEconomiaLogo';
import { firestoreDataService, RegistroSimuladoFirestore } from '../services/firestoreDataService';

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
  const [simulados, setSimulados] = useState<RegistroSimuladoFirestore[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);

  // Carregar histórico real do discente no Firestore
  useEffect(() => {
    let ativo = true;
    async function carregarHistorico() {
      try {
        const dados = await firestoreDataService.obterSimuladosDoAluno(usuario.uid);
        if (ativo) {
          setSimulados(dados);
        }
      } catch (err) {
        console.error('Erro ao carregar simulados do discente:', err);
      } finally {
        if (ativo) setCarregando(false);
      }
    }
    carregarHistorico();
    return () => {
      ativo = false;
    };
  }, [usuario.uid]);

  // Cálculos dinâmicos com base nos simulados reais feitos pelo aluno
  const stats = useMemo(() => {
    const total = simulados.length;
    if (total === 0) {
      return {
        totalSimulados: 0,
        questoesResolvidas: 0,
        mediaNota: 0,
        taxaAcertoGeral: 0,
        ultimoSimulado: null,
        temRegistros: false
      };
    }

    const totalQuestoes = simulados.reduce((acc, s) => acc + s.total, 0);
    const totalAcertos = simulados.reduce((acc, s) => acc + s.acertos, 0);
    const somaNotas = simulados.reduce((acc, s) => acc + s.nota, 0);
    const media = Number((somaNotas / total).toFixed(1));
    const taxa = totalQuestoes > 0 ? Number(((totalAcertos / totalQuestoes) * 100).toFixed(1)) : 0;

    return {
      totalSimulados: total,
      questoesResolvidas: totalQuestoes,
      mediaNota: media,
      taxaAcertoGeral: taxa,
      ultimoSimulado: simulados[0],
      temRegistros: true
    };
  }, [simulados]);

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
            Bem-vindo ao seu ambiente personalizado de aprendizagem em Teoria das Finanças Públicas. Acompanhe seu progresso nas 12 aulas, treine com simuladores e resolva simulados com persistência em tempo real.
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
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#ebc000] hover:bg-amber-400 text-[#002752] text-xs font-black shadow-sm transition-transform hover:scale-105 cursor-pointer"
          >
            <Play className="w-4 h-4 text-[#002752]" />
            Fazer Novo Simulado
          </button>
        </div>
      </div>

      {/* KPI Cards Reais do Aluno */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Simulados Realizados</span>
            <div className="p-2 bg-blue-50 text-[#002752] rounded-lg">
              <History className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#002752]">{stats.totalSimulados}</span>
            <span className="text-xs text-slate-500">testes salvos</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {stats.totalSimulados > 0 ? 'Conectado ao seu perfil institucional' : 'Nenhum simulado realizado ainda'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Média Geral de Notas</span>
            <div className="p-2 bg-amber-50 text-amber-700 rounded-lg">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-950">
              {stats.temRegistros ? stats.mediaNota : '—'}
            </span>
            <span className="text-xs text-slate-500">/ 10,0</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {stats.mediaNota >= 7 ? 'Desempenho aprovatório' : stats.temRegistros ? 'Atenção para revisão teórica' : 'Comece resolvendo seu 1º simulado'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Taxa de Acertos</span>
            <div className="p-2 bg-emerald-50 text-[#00733f] rounded-lg">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#00733f]">
              {stats.temRegistros ? `${stats.taxaAcertoGeral}%` : '—'}
            </span>
            <span className="text-xs text-slate-500">acertos</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {stats.questoesResolvidas} questões respondidas no total
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Status Pedagógico</span>
            <div className="p-2 bg-purple-50 text-purple-700 rounded-lg">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-800">
              {!stats.temRegistros ? 'Iniciando' : stats.mediaNota >= 7 ? 'Regular / Estável' : 'Requer Atenção'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Sincronizado com o Painel Docente
          </p>
        </div>
      </div>

      {/* Histórico dos Simulados do Aluno */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-[#002752] flex items-center gap-2">
              <History className="w-5 h-5 text-[#ebc000]" />
              Histórico Pessoal de Simulados (Banco de Dados em Nuvem)
            </h3>
            <p className="text-xs text-slate-600">
              Registros individuais salvos automaticamente a cada teste finalizado.
            </p>
          </div>

          <button
            onClick={onNavigateToQuiz}
            className="px-3.5 py-1.5 bg-[#002752] hover:bg-[#001c3d] text-white rounded-lg text-xs font-semibold transition-colors"
          >
            Novo Treinamento
          </button>
        </div>

        {carregando ? (
          <div className="py-8 text-center text-xs text-slate-500">
            Consultando registros no Firestore...
          </div>
        ) : simulados.length === 0 ? (
          <div className="py-10 text-center space-y-3 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <GraduationCap className="w-10 h-10 text-slate-400 mx-auto" />
            <div className="max-w-md mx-auto">
              <h4 className="font-bold text-sm text-slate-800">Nenhum simulado registrado no seu perfil</h4>
              <p className="text-xs text-slate-500 mt-1">
                Seus resultados serão computados aqui e enviados ao professor para acompanhamento das dificuldades da turma.
              </p>
            </div>
            <button
              onClick={onNavigateToQuiz}
              className="px-4 py-2 bg-[#00733f] text-white rounded-xl text-xs font-bold hover:bg-emerald-700"
            >
              Iniciar Primeiro Simulado Agora
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Data</th>
                  <th className="py-2.5 px-3">Filtro / Tema</th>
                  <th className="py-2.5 px-3">Dificuldade</th>
                  <th className="py-2.5 px-3">Acertos</th>
                  <th className="py-2.5 px-3">Nota</th>
                  <th className="py-2.5 px-3">Tempo Gasto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {simulados.map((s, idx) => (
                  <tr key={s.id || idx} className="hover:bg-slate-50/80">
                    <td className="py-2.5 px-3 text-slate-700 font-medium">{s.data}</td>
                    <td className="py-2.5 px-3 text-slate-600">
                      {s.unidadeFiltro === 'Todas' ? 'Todas as Unidades' : `Unidade ${s.unidadeFiltro}`}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        {s.dificuldade}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-800 font-bold">
                      {s.acertos} / {s.total}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded font-black font-mono ${
                        s.nota >= 7 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {s.nota.toFixed(1)}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 font-mono">
                      {Math.floor((s.tempoGastoSegundos || 0) / 60)}m {(s.tempoGastoSegundos || 0) % 60}s
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                1ª Avaliação Oficial
              </span>
              <span className="font-mono text-xs font-black text-amber-900 bg-white px-2 py-0.5 rounded border border-amber-200">
                24/09
              </span>
            </div>
            <h4 className="font-bold text-xs text-slate-900 mt-2">Fundamentos & Falhas de Mercado</h4>
            <p className="text-[11px] text-slate-600 mt-0.5">Aulas 01 a 04 • Peso 33,3%</p>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-blue-800 bg-blue-100 px-1.5 py-0.5 rounded">
                2ª Avaliação Oficial
              </span>
              <span className="font-mono text-xs font-black text-blue-900 bg-white px-2 py-0.5 rounded border border-blue-200">
                29/10
              </span>
            </div>
            <h4 className="font-bold text-xs text-slate-900 mt-2">Tributação & Escolha Pública</h4>
            <p className="text-[11px] text-slate-600 mt-0.5">Aulas 05 a 09 • Peso 33,3%</p>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-[#00733f] bg-emerald-100 px-1.5 py-0.5 rounded">
                3ª Avaliação Oficial
              </span>
              <span className="font-mono text-xs font-black text-[#002752] bg-white px-2 py-0.5 rounded border border-emerald-200">
                26/11
              </span>
            </div>
            <h4 className="font-bold text-xs text-slate-900 mt-2">Arrow & Federalismo Fiscal</h4>
            <p className="text-[11px] text-slate-600 mt-0.5">Aulas 10 a 12 • Peso 33,4%</p>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-purple-800 bg-purple-100 px-1.5 py-0.5 rounded">
                Exame Final
              </span>
              <span className="font-mono text-xs font-black text-purple-900 bg-white px-2 py-0.5 rounded border border-purple-200">
                03/12
              </span>
            </div>
            <h4 className="font-bold text-xs text-slate-900 mt-2">Prova Final (Todo Conteúdo)</h4>
            <p className="text-[11px] text-slate-600 mt-0.5">Para discentes com 4,0 ≤ Média &lt; 7,0</p>
          </div>
        </div>
      </div>
    </div>
  );
};
