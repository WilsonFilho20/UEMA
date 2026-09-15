import React, { useState, useMemo } from 'react';
import {
  Users,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  FileDown,
  Printer,
  Search,
  SlidersHorizontal,
  BrainCircuit,
  GraduationCap,
  ChevronRight
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { TURMA_KPIS_MOCK, ALUNOS_MOCK } from '../data/studentData';
import { QUESTOES_BANCO, DISTRIBUICAO_QUESTOES, GOOGLE_DRIVE_REPO } from '../data/questionsData';
import { AlunoDesempenho, Dificuldade, Questao } from '../types';
import { UemaEconomiaLogo } from './UemaEconomiaLogo';
import { AcademicCalendarView } from './AcademicCalendarView';

export const ProfessorDashboard: React.FC = () => {
  // Navigation tabs within Professor Dashboard
  const [abaDocente, setAbaDocente] = useState<'visao_geral' | 'calendario' | 'gerador' | 'alunos'>('visao_geral');

  // State for student filtering
  const [buscaAluno, setBuscaAluno] = useState<string>('');
  const [filtroStatus, setFiltroStatus] = useState<string>('Todos');
  const [alunoSelecionado, setAlunoSelecionado] = useState<AlunoDesempenho | null>(null);

  // State for exam generator (Gerador de Provas)
  const [provaDificuldade, setProvaDificuldade] = useState<Dificuldade | 'Mista'>('Mista');
  const [provaQtdQuestoes, setProvaQtdQuestoes] = useState<number>(5);
  const [provaUnidade, setProvaUnidade] = useState<number | 'Todas'>('Todas');
  const [provaTitulo, setProvaTitulo] = useState<string>('Avaliação Oficial - Teoria das Finanças Públicas (UEMA)');
  const [questoesGeradas, setQuestoesGeradas] = useState<Questao[]>([]);
  const [modalProvaAberta, setModalProvaAberta] = useState<boolean>(false);

  // Filter students
  const alunosFiltrados = useMemo(() => {
    return ALUNOS_MOCK.filter((aluno) => {
      const matchTexto =
        aluno.nome.toLowerCase().includes(buscaAluno.toLowerCase()) ||
        aluno.matricula.toLowerCase().includes(buscaAluno.toLowerCase());
      const matchStatus = filtroStatus === 'Todos' || aluno.statusRisco === filtroStatus;
      return matchTexto && matchStatus;
    });
  }, [buscaAluno, filtroStatus]);

  // Generate Exam questions
  const gerarProva = () => {
    let pool = [...QUESTOES_BANCO];

    if (provaUnidade !== 'Todas') {
      pool = pool.filter((q) => q.unidade === Number(provaUnidade));
    }

    if (provaDificuldade !== 'Mista') {
      pool = pool.filter((q) => q.dificuldade === provaDificuldade);
    }

    // Embaralhar e selecionar quantidade
    const selecionadas = pool.sort(() => 0.5 - Math.random()).slice(0, provaQtdQuestoes);
    setQuestoesGeradas(selecionadas);
    setModalProvaAberta(true);
  };

  const imprimirProva = () => {
    window.print();
  };

  const exportarProvaJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(questoesGeradas, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `prova_financas_publicas_uema_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Cores personalizadas para o gráfico de dificuldade
  const getCorDificuldade = (dif: string) => {
    switch (dif) {
      case 'Baixa':
        return '#00733f'; // Verde
      case 'Média-Baixa':
        return '#10b981'; // Esmeralda
      case 'Média':
        return '#ebc000'; // Dourado UEMA
      case 'Média-Alta':
        return '#f97316'; // Laranja
      case 'Alta':
        return '#dc2626'; // Vermelho
      default:
        return '#002752';
    }
  };

  return (
    <div className="space-y-6" id="painel-professor">
      {/* Top Banner */}
      <div className="bg-[#002752] text-white p-6 rounded-2xl shadow-sm border-b-4 border-[#ebc000] flex flex-wrap items-center justify-between gap-6">
        <div className="flex-1 min-w-[280px]">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ebc000] text-[#002752] uppercase tracking-wider">
              Painel Docente de Acompanhamento
            </span>
            <span className="text-xs text-slate-300">
              Curso de Ciências Econômicas • UEMA
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight">
            Gestão Pedagógica & Avaliação Contínua
          </h2>
          <p className="text-sm text-slate-200 mt-1 max-w-2xl">
            Acompanhamento em tempo real da evolução da turma nas 12 aulas cronológicas, diagnóstico de tópicos críticos e gerador de instrumentos avaliativos.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="p-2 bg-white/10 rounded-xl border border-white/20 hidden md:block">
            <UemaEconomiaLogo variant="compact" color="white" className="h-10" />
          </div>
          <a
            href={GOOGLE_DRIVE_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all"
          >
            <BookOpen className="w-4 h-4 text-[#ebc000]" />
            Pasta Oficial Drive
          </a>
        </div>
      </div>

      {/* Sub-navegação do Portal Docente */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-200/70 rounded-xl">
        <button
          onClick={() => setAbaDocente('visao_geral')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            abaDocente === 'visao_geral'
              ? 'bg-[#002752] text-white shadow-xs'
              : 'text-slate-700 hover:bg-white/70'
          }`}
        >
          <BrainCircuit className="w-4 h-4" />
          Visão Geral & Indicadores
        </button>

        <button
          onClick={() => setAbaDocente('calendario')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            abaDocente === 'calendario'
              ? 'bg-[#002752] text-white shadow-xs'
              : 'text-slate-700 hover:bg-white/70'
          }`}
        >
          <Calendar className="w-4 h-4 text-[#ebc000]" />
          Calendário & Cronograma Oficial (13/08 a 03/12)
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#ebc000] text-[#002752] font-black">
            4 Provas
          </span>
        </button>

        <button
          onClick={() => setAbaDocente('gerador')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            abaDocente === 'gerador'
              ? 'bg-[#002752] text-white shadow-xs'
              : 'text-slate-700 hover:bg-white/70'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Gerador de Avaliações
        </button>

        <button
          onClick={() => setAbaDocente('alunos')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            abaDocente === 'alunos'
              ? 'bg-[#002752] text-white shadow-xs'
              : 'text-slate-700 hover:bg-white/70'
          }`}
        >
          <Users className="w-4 h-4" />
          Lista de Alunos & Intervenções ({ALUNOS_MOCK.length})
        </button>
      </div>

      {/* Módulo Calendário Integrado no Portal Docente */}
      {abaDocente === 'calendario' && (
        <AcademicCalendarView
          modo="docente"
          onNavigateToQuiz={(unidade) => {
            if (unidade) setProvaUnidade(unidade);
            setAbaDocente('gerador');
          }}
        />
      )}

      {/* Resumo do Calendário na Visão Geral */}
      {abaDocente === 'visao_geral' && (
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-bold text-[#00733f] uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Cronograma Semestral Oficial UEMA • 13/08 a 03/12
              </span>
              <h3 className="text-base font-bold text-[#002752] mt-1 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#ebc000]" />
                Acompanhamento Pedagógico: Datas de Aulas e Avaliações
              </h3>
            </div>
            <button
              onClick={() => setAbaDocente('calendario')}
              className="text-xs font-bold text-[#002752] hover:text-[#00733f] inline-flex items-center gap-1 group bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
            >
              Abrir Módulo Calendário Completo
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                  1ª Avaliação Oficial
                </span>
                <span className="font-mono text-xs font-black text-amber-900 bg-white px-2 py-0.5 rounded border border-amber-200">
                  24/09
                </span>
              </div>
              <h4 className="font-bold text-xs text-slate-900 mt-2">Fundamentos & Falhas</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">Aulas 01 a 04 • Mesmo Peso (33,3%)</p>
            </div>

            <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#002752] bg-blue-100 px-1.5 py-0.5 rounded">
                  2ª Avaliação Oficial
                </span>
                <span className="font-mono text-xs font-black text-[#002752] bg-white px-2 py-0.5 rounded border border-blue-200">
                  22/10
                </span>
              </div>
              <h4 className="font-bold text-xs text-slate-900 mt-2">Bens Públicos & Tributação</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">Aulas 05 a 08 • Mesmo Peso (33,3%)</p>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#00733f] bg-emerald-100 px-1.5 py-0.5 rounded">
                  3ª Avaliação Oficial
                </span>
                <span className="font-mono text-xs font-black text-emerald-900 bg-white px-2 py-0.5 rounded border border-emerald-200">
                  26/11
                </span>
              </div>
              <h4 className="font-bold text-xs text-slate-900 mt-2">Escolha Pública & Federalismo</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">Aulas 09 a 12 • Mesmo Peso (33,3%)</p>
            </div>

            <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-200">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-800 bg-purple-100 px-1.5 py-0.5 rounded">
                  Exame Final
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
      )}

      {/* KPI Cards Grid (Visão Geral) */}
      {abaDocente === 'visao_geral' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Alunos */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#002752]/10 flex items-center justify-center text-[#002752]">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Alunos Matriculados</span>
            <div className="text-2xl font-black text-[#002752] font-mono">{TURMA_KPIS_MOCK.totalAlunos}</div>
            <span className="text-[11px] text-[#00733f] font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> 100% ativos no semestre
            </span>
          </div>
        </div>

        {/* Taxa de Conclusão */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#00733f]/10 flex items-center justify-center text-[#00733f]">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Progresso no Cronograma</span>
            <div className="text-2xl font-black text-[#00733f] font-mono">
              {TURMA_KPIS_MOCK.taxaConclusaoAulas}%
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              Meta esperada: Aula 8 (66%)
            </span>
          </div>
        </div>

        {/* Média da Turma */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#ebc000]/20 flex items-center justify-center text-amber-700">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Média Geral nos Simulados</span>
            <div className="text-2xl font-black text-slate-800 font-mono">
              {TURMA_KPIS_MOCK.mediaGeralTurma.toFixed(2)}
            </div>
            <span className="text-[11px] text-slate-500">
              Escala de 0 a 10 (Acurácia: 74%)
            </span>
          </div>
        </div>

        {/* Questões Resolvidas */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-700">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Questões Praticadas</span>
            <div className="text-2xl font-black text-indigo-900 font-mono">
              {TURMA_KPIS_MOCK.totalQuestoesResolvidas}
            </div>
            <span className="text-[11px] text-indigo-600 font-medium">
              Banco de 1.000 questões
            </span>
          </div>
        </div>
      </div>

      {/* Charts Section: Performance by Difficulty & Critical Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Success Rate by Difficulty Level */}
        <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-base text-[#002752] flex items-center gap-2">
                <span>Taxa de Acerto por Nível de Dificuldade</span>
              </h3>
              <span className="text-xs text-slate-500">Matriz Pedagógica</span>
            </div>
            <p className="text-xs text-slate-600 mb-4">
              Acompanhamento da retenção cognitiva dos estudantes conforme a complexidade epistemológica.
            </p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={TURMA_KPIS_MOCK.questoesPorDificuldadeAcerto}
                  margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    dataKey="dificuldade"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    interval={0}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    unit="%"
                  />
                  <Tooltip
                    formatter={(value: any) => [`${value}% de acerto`, 'Desempenho Médio']}
                    contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Bar dataKey="taxa" radius={[6, 6, 0, 0]}>
                    {TURMA_KPIS_MOCK.questoesPorDificuldadeAcerto.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getCorDificuldade(entry.dificuldade)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-2 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500">
            <span>Baixa: Definições diretas</span>
            <span>Média: Aplicação em cenários</span>
            <span className="text-rose-600 font-semibold">Alta: Teoremas complexos (Niskanen, Arrow, Ramsey)</span>
          </div>
        </div>

        {/* Desempenho por Unidade & Diagnóstico de Tópicos Críticos */}
        <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-base text-[#002752]">
                Diagnóstico de Tópicos Críticos por Módulo
              </h3>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-medium">
                Alerta de Intervenção
              </span>
            </div>
            <p className="text-xs text-slate-600 mb-4">
              Identificação dos conceitos teóricos com maior índice de erros para reforço em sala de aula.
            </p>

            <div className="space-y-3">
              {TURMA_KPIS_MOCK.desempenhoPorUnidade.map((unidade, idx) => (
                <div key={idx} className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-slate-800">{unidade.unidade}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#002752]">Média: {unidade.media}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold">
                        {unidade.taxaAcerto}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        unidade.taxaAcerto > 75 ? 'bg-[#00733f]' : unidade.taxaAcerto > 65 ? 'bg-[#ebc000]' : 'bg-rose-500'
                      }`}
                      style={{ width: `${unidade.taxaAcerto}%` }}
                    />
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span><strong>Tópico mais desafiador:</strong> {unidade.topicoCritico}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg text-xs text-[#002752] flex items-center justify-between">
            <span>
              💡 <strong>Sugestão Pedagógica:</strong> Realizar aula prática com o <em>Simulador de Niskanen</em> e <em>Teorema de Arrow</em> antes da P2.
            </span>
          </div>
        </div>
      </div>
        </>
      )}

      {/* Exam Generator Section (Gerador de Provas e Listas) */}
      {(abaDocente === 'visao_geral' || abaDocente === 'gerador') && (
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-base text-[#002752] flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-[#ebc000]" />
              Gerador de Provas & Listas de Exercícios Exportáveis
            </h3>
            <p className="text-xs text-slate-600">
              Filtre por grau de dificuldade e unidade para criar instrumentos de avaliação personalizados com gabarito comentado.
            </p>
          </div>

          <button
            onClick={gerarProva}
            className="flex items-center gap-2 px-4 py-2 bg-[#002752] hover:bg-[#001c3d] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            <GraduationCap className="w-4 h-4 text-[#ebc000]" />
            Gerar Instrumento de Avaliação
          </button>
        </div>

        {/* Generator Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block text-slate-600 font-medium mb-1">Nível de Dificuldade</label>
            <select
              value={provaDificuldade}
              onChange={(e) => setProvaDificuldade(e.target.value as any)}
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
            >
              <option value="Mista">Mista (Distribuição Padrão da Matriz)</option>
              <option value="Baixa">Apenas Baixa (Conceitual)</option>
              <option value="Média-Baixa">Apenas Média-Baixa (Diferenciação)</option>
              <option value="Média">Apenas Média (Aplicação)</option>
              <option value="Média-Alta">Apenas Média-Alta (Modelos)</option>
              <option value="Alta">Apenas Alta (Derivações Teóricas)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1">Unidade Curricular</label>
            <select
              value={provaUnidade}
              onChange={(e) => setProvaUnidade(e.target.value === 'Todas' ? 'Todas' : Number(e.target.value))}
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
            >
              <option value="Todas">Todas as 3 Unidades (Aulas 1 a 12)</option>
              <option value="1">Unidade I: Fundamentos e Falhas (Aulas 1-5)</option>
              <option value="2">Unidade II: Teoria da Tributação (Aulas 6-8)</option>
              <option value="3">Unidade III: Escolha Pública & Federalismo (Aulas 9-12)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1">Quantidade de Questões</label>
            <select
              value={provaQtdQuestoes}
              onChange={(e) => setProvaQtdQuestoes(Number(e.target.value))}
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
            >
              <option value={5}>5 Questões (Simulado Rápido)</option>
              <option value={10}>10 Questões (Prova Parcial)</option>
              <option value={15}>15 Questões (Avaliação Completa)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1">Cabeçalho Institucional</label>
            <input
              type="text"
              value={provaTitulo}
              onChange={(e) => setProvaTitulo(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
            />
          </div>
        </div>

        {/* Matrix Reference Reminder */}
        <div className="flex flex-wrap gap-2 text-[11px] text-slate-600 pt-1">
          <span className="font-semibold text-slate-700">Matriz de 1.000 Questões:</span>
          {DISTRIBUICAO_QUESTOES.map((d, i) => (
            <span key={i} className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200">
              {d.nivel}: <strong>{d.percentual}%</strong>
            </span>
          ))}
        </div>
      </div>
      )}

      {/* Student Monitoring Table (Tabela de Acompanhamento Individual dos Alunos) */}
      {(abaDocente === 'visao_geral' || abaDocente === 'alunos') && (
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-base text-[#002752] flex items-center gap-2">
              <Users className="w-5 h-5 text-[#00733f]" />
              Acompanhamento Individual dos Alunos (Avaliação Contínua)
            </h3>
            <p className="text-xs text-slate-600">
              Monitore a assiduidade, resolução de simulados e intervenções pedagógicas recomendadas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por nome ou matrícula..."
                value={buscaAluno}
                onChange={(e) => setBuscaAluno(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#002752] w-56"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="py-1.5 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden"
            >
              <option value="Todos">Todos os Status</option>
              <option value="Estável">Estável</option>
              <option value="Atenção">Atenção</option>
              <option value="Crítico">Crítico</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">Aluno</th>
                <th className="p-3">Matrícula</th>
                <th className="p-3">Progresso Aulas</th>
                <th className="p-3">Média Geral</th>
                <th className="p-3">Questões / Acurácia</th>
                <th className="p-3">Diagnóstico de Dificuldade</th>
                <th className="p-3">Status de Risco</th>
                <th className="p-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {alunosFiltrados.map((aluno) => (
                <tr key={aluno.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3">
                    <div className="font-bold text-slate-900">{aluno.nome}</div>
                    <div className="text-[11px] text-slate-500">{aluno.email}</div>
                  </td>
                  <td className="p-3 font-mono text-slate-600 font-medium">
                    {aluno.matricula}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#00733f] rounded-full"
                          style={{ width: `${aluno.progressoAulas}%` }}
                        />
                      </div>
                      <span className="font-mono text-slate-700">{aluno.progressoAulas}%</span>
                    </div>
                  </td>
                  <td className="p-3 font-mono font-bold text-sm text-[#002752]">
                    {aluno.mediaSimulados.toFixed(1)}
                  </td>
                  <td className="p-3">
                    <div className="font-mono font-semibold text-slate-800">{aluno.questoesRespondidas} respondidas</div>
                    <div className="text-[11px] text-[#00733f] font-medium">{aluno.taxaAcerto}% acerto</div>
                  </td>
                  <td className="p-3">
                    <div className="text-[11px] text-slate-600 max-w-xs truncate" title={aluno.pontosFracos.join(', ')}>
                      {aluno.pontosFracos.length > 0 ? aluno.pontosFracos[0] : 'Sem fragilidades mapeadas'}
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold inline-flex items-center gap-1 ${
                      aluno.statusRisco === 'Estável'
                        ? 'bg-emerald-100 text-emerald-800'
                        : aluno.statusRisco === 'Atenção'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {aluno.statusRisco === 'Crítico' && <AlertTriangle className="w-3 h-3" />}
                      {aluno.statusRisco}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setAlunoSelecionado(aluno)}
                      className="px-2.5 py-1 text-xs font-medium text-[#002752] hover:bg-[#002752]/10 rounded border border-[#002752]/30 transition-colors"
                    >
                      Ficha Pedagógica
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      )}

      {/* Modal Ficha Pedagógica do Aluno */}
      {alunoSelecionado && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs font-bold uppercase text-[#002752] tracking-wider">
                  Ficha de Diagnóstico Individual
                </span>
                <h4 className="text-lg font-bold text-slate-900">{alunoSelecionado.nome}</h4>
                <p className="text-xs text-slate-500 font-mono">Matrícula: {alunoSelecionado.matricula}</p>
              </div>
              <button
                onClick={() => setAlunoSelecionado(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-500 block">Média de Provas</span>
                <span className="text-lg font-bold text-[#002752]">{alunoSelecionado.mediaSimulados.toFixed(1)}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-500 block">Simulados Concluídos</span>
                <span className="text-lg font-bold text-[#00733f]">{alunoSelecionado.simuladosConcluidos}</span>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-xs text-slate-800 mb-2">Desempenho por Dificuldade de Questão:</h5>
              <div className="space-y-1.5 text-xs">
                {Object.entries(alunoSelecionado.taxaPorDificuldade).map(([chave, val]) => (
                  <div key={chave} className="flex items-center justify-between">
                    <span className="capitalize text-slate-600">{chave.replace('media', 'Média ')}</span>
                    <span className="font-mono font-bold">{val}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-bold text-xs text-slate-800 mb-1">Tópicos Críticos para Orientação Individual:</h5>
              <ul className="list-disc list-inside text-xs text-rose-700 space-y-0.5">
                {alunoSelecionado.pontosFracos.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => setAlunoSelecionado(null)}
                className="px-4 py-1.5 bg-[#002752] text-white rounded-lg text-xs font-semibold"
              >
                Fechar Ficha
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Visualizador e Exportador de Prova */}
      {modalProvaAberta && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-4">
                <UemaEconomiaLogo variant="full" color="navy" className="h-10 hidden sm:block" />
                <div>
                  <span className="text-xs font-bold uppercase text-[#00733f] tracking-wider">
                    Instrumento Avaliativo Gerado
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-[#002752]">{provaTitulo}</h4>
                  <p className="text-xs text-slate-500">
                    {questoesGeradas.length} questões selecionadas do Banco de 1.000 questões da UEMA
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={imprimirProva}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Imprimir / Salvar PDF
                </button>
                <button
                  onClick={exportarProvaJSON}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00733f] text-white hover:bg-emerald-700 rounded-lg text-xs font-medium"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  Exportar JSON
                </button>
                <button
                  onClick={() => setModalProvaAberta(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Questions list */}
            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
              {questoesGeradas.map((q, idx) => (
                <div key={q.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#002752]">
                      Questão {idx + 1} ({q.id}) • Aula {q.aula_relacionada}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      q.dificuldade === 'Baixa' ? 'bg-emerald-100 text-emerald-800' :
                      q.dificuldade === 'Média-Baixa' ? 'bg-teal-100 text-teal-800' :
                      q.dificuldade === 'Média' ? 'bg-amber-100 text-amber-800' :
                      q.dificuldade === 'Média-Alta' ? 'bg-orange-100 text-orange-800' :
                      'bg-rose-100 text-rose-800'
                    }`}>
                      Dificuldade: {q.dificuldade}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    {q.enunciado}
                  </p>

                  <div className="space-y-1.5 text-xs">
                    {Object.entries(q.alternativas).map(([letra, texto]) => (
                      <div
                        key={letra}
                        className={`p-2 rounded border ${
                          letra === q.resposta_correta
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        <strong>({letra})</strong> {texto}
                        {letra === q.resposta_correta && (
                          <span className="ml-2 text-[10px] uppercase font-bold text-[#00733f]">
                            [Gabarito Oficial]
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-amber-50/70 rounded-lg border border-amber-200 text-xs text-slate-700 space-y-1">
                    <div className="font-bold text-[#002752]">Justificativa Teórica & Bibliografia:</div>
                    <p>{q.justificativa}</p>
                    {q.referencia_bibliografica && (
                      <div className="text-[11px] text-slate-500 italic mt-1">
                        Ref: {q.referencia_bibliografica}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setModalProvaAberta(false)}
                className="px-4 py-2 bg-[#002752] text-white rounded-xl text-xs font-semibold"
              >
                Concluir Visualização
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
