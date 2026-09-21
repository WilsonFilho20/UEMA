import React, { useState, useMemo, useEffect } from 'react';
import {
  BrainCircuit,
  TrendingUp,
  Award,
  Users,
  AlertTriangle,
  CheckCircle2,
  FileDown,
  Filter,
  Sparkles,
  BarChart3,
  Calendar,
  Eye,
  X,
  BookOpen,
  ArrowRight,
  Clock,
  RefreshCw,
  Search,
  BookCheck,
  GraduationCap
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell
} from 'recharts';
import { UNIDADES_CURRICULARES } from '../data/questionsData';
import { BANCO_COMPLETO_QUESTOES } from '../data/questionBankEngine';
import {
  firestoreDataService,
  RegistroSimuladoFirestore
} from '../services/firestoreDataService';
import {
  exportarDashboardPedagogicoTurmaPDF,
  exportarPerfilPedagogicoAlunoPDF
} from '../utils/pdfExportService';
import { UsuarioAutenticado } from '../types';

interface PedagogicalDashboardViewProps {
  modo?: 'docente' | 'aluno';
  usuarioAtual?: UsuarioAutenticado;
  onNavigateToQuiz?: () => void;
  onNavigateToLessons?: () => void;
}

export const PedagogicalDashboardView: React.FC<PedagogicalDashboardViewProps> = ({
  modo = 'docente',
  usuarioAtual,
  onNavigateToQuiz,
  onNavigateToLessons
}) => {
  const [simulados, setSimulados] = useState<RegistroSimuladoFirestore[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [filtroUnidade, setFiltroUnidade] = useState<string>('Todas');
  const [filtroRisco, setFiltroRisco] = useState<string>('Todos');
  const [buscaAluno, setBuscaAluno] = useState<string>('');
  const [alunoSelecionado, setAlunoSelecionado] = useState<any | null>(null);
  const [gerandoPDF, setGerandoPDF] = useState<boolean>(false);
  const [simulandoDados, setSimulandoDados] = useState<boolean>(false);

  // Escuta em tempo real do Firestore: atualiza conforme os alunos fazem os simulados
  useEffect(() => {
    setCarregando(true);
    const unsub = firestoreDataService.assinarSimuladosTurma((novosSimulados) => {
      setSimulados(novosSimulados);
      setCarregando(false);
    });

    return () => unsub();
  }, []);

  // Dados filtrados de simulados
  const simuladosFiltrados = useMemo(() => {
    let lista = [...simulados];

    if (modo === 'aluno' && usuarioAtual) {
      lista = lista.filter((s) => s.alunoId === usuarioAtual.uid);
    }

    if (filtroUnidade !== 'Todas') {
      const uNum = Number(filtroUnidade);
      lista = lista.filter((s) => {
        if (s.detalhesPorUnidade && s.detalhesPorUnidade[uNum]) {
          return s.detalhesPorUnidade[uNum].total > 0;
        }
        return s.unidadeFiltro === filtroUnidade || s.unidadeFiltro === uNum;
      });
    }

    return lista;
  }, [simulados, modo, usuarioAtual, filtroUnidade]);

  // Agrupamento de alunos e cálculo dos seus perfis pedagógicos
  const listaPerfisAlunos = useMemo(() => {
    const mapaAlunos: Record<string, {
      id: string;
      nome: string;
      matricula: string;
      simulados: RegistroSimuladoFirestore[];
      totalAcertos: number;
      totalQuestoes: number;
      somaNotas: number;
      tempoTotalSegundos: number;
      detalhesUnidades: Record<number, { acertos: number; total: number }>;
      questoesErradas: Record<string, number>;
    }> = {};

    simulados.forEach((sim) => {
      const id = sim.alunoId || 'aluno_anonimo';
      if (!mapaAlunos[id]) {
        mapaAlunos[id] = {
          id,
          nome: sim.alunoNome || 'Discente de Economia',
          matricula: sim.alunoMatricula || '20231102900',
          simulados: [],
          totalAcertos: 0,
          totalQuestoes: 0,
          somaNotas: 0,
          tempoTotalSegundos: 0,
          detalhesUnidades: {
            1: { acertos: 0, total: 0 },
            2: { acertos: 0, total: 0 },
            3: { acertos: 0, total: 0 },
            4: { acertos: 0, total: 0 },
            5: { acertos: 0, total: 0 }
          },
          questoesErradas: {}
        };
      }

      const a = mapaAlunos[id];
      a.simulados.push(sim);
      a.totalAcertos += sim.acertos;
      a.totalQuestoes += sim.total;
      a.somaNotas += sim.nota;
      a.tempoTotalSegundos += (sim.tempoGastoSegundos || 1200);

      // Unidades
      if (sim.detalhesPorUnidade) {
        Object.entries(sim.detalhesPorUnidade).forEach(([uStr, st]) => {
          const uNum = Number(uStr);
          const s = st as { acertos: number; total: number };
          if (a.detalhesUnidades[uNum] && s) {
            a.detalhesUnidades[uNum].acertos += (s.acertos || 0);
            a.detalhesUnidades[uNum].total += (s.total || 0);
          }
        });
      }

      // Erros
      if (sim.errosQuestoesIds && Array.isArray(sim.errosQuestoesIds)) {
        sim.errosQuestoesIds.forEach((qId) => {
          a.questoesErradas[qId] = (a.questoesErradas[qId] || 0) + 1;
        });
      }
    });

    return Object.values(mapaAlunos).map((aluno) => {
      const totalSim = aluno.simulados.length;
      const media = totalSim > 0 ? Number((aluno.somaNotas / totalSim).toFixed(1)) : 0;
      const taxa = aluno.totalQuestoes > 0 ? Number(((aluno.totalAcertos / aluno.totalQuestoes) * 100).toFixed(1)) : 0;
      const tempoMedio = aluno.totalQuestoes > 0 ? Math.round(aluno.tempoTotalSegundos / aluno.totalQuestoes) : 60;

      // Status pedagógico e de risco
      let statusRisco: 'Estável' | 'Atenção' | 'Crítico' = 'Estável';
      let nivelDominio = 'Proficiente';

      if (media < 5.0 || taxa < 50) {
        statusRisco = 'Crítico';
        nivelDominio = 'Iniciante / Em Risco';
      } else if (media < 7.0 || taxa < 70) {
        statusRisco = 'Atenção';
        nivelDominio = 'Em Desenvolvimento';
      } else if (media >= 8.5 && taxa >= 85) {
        nivelDominio = 'Avançado / Destaque';
      }

      // Desempenho por Unidade Curricular
      const unidadesArray = [1, 2, 3, 4, 5].map((uNum) => {
        const uInfo = UNIDADES_CURRICULARES.find((u) => u.numero === uNum);
        const st = aluno.detalhesUnidades[uNum];
        const tx = st.total > 0 ? Number(((st.acertos / st.total) * 100).toFixed(1)) : 70;
        return {
          unidade: uNum,
          nome: uInfo?.titulo || `Unidade ${uNum}`,
          acertos: st.acertos,
          total: st.total,
          taxa: tx
        };
      });

      // Identificar Unidade mais forte e mais fraca
      const ordenadasPorTaxa = [...unidadesArray].sort((a, b) => b.taxa - a.taxa);
      const unidadeMaisForte = ordenadasPorTaxa[0];
      const unidadeMaisFraca = ordenadasPorTaxa[ordenadasPorTaxa.length - 1];

      // Recomendações personalizadas de estudo
      const recomendacoes: string[] = [];
      if (unidadeMaisFraca && unidadeMaisFraca.taxa < 70) {
        recomendacoes.push(`Priorizar revisão da Unidade ${unidadeMaisFraca.unidade} (${unidadeMaisFraca.nome}), resolvendo as questões conceituais no Simulado.`);
      }
      if (media < 7.0) {
        recomendacoes.push('Realizar ao menos dois simulados no Modo Estudo por semana com foco em gabaritos comentados.');
      }
      recomendacoes.push('Acompanhar as anotações conceituais das Aulas da Ementa no Google Drive do Departamento de Economia.');

      return {
        ...aluno,
        totalSimulados: totalSim,
        media,
        taxaAcerto: taxa,
        tempoMedioFormatado: `${Math.floor(tempoMedio / 60)}m ${tempoMedio % 60}s`,
        statusRisco,
        nivelDominio,
        desempenhoUnidades: unidadesArray,
        unidadeMaisForte,
        unidadeMaisFraca,
        pontosFortes: [
          `Forte rendimento em ${unidadeMaisForte?.nome || 'Fundamentos Fiscais'} (${unidadeMaisForte?.taxa || 80}%)`,
          'Cumprimento dos prazos de simulados com frequência consistente'
        ],
        pontosAtencao: [
          `Índice de acerto de ${unidadeMaisFraca?.taxa || 50}% na ${unidadeMaisFraca?.nome || 'Tributação e Escolha Pública'}`,
          'Necessidade de fixação das condições matemáticas de ótimo de Pareto e regra de Samuelson'
        ],
        recomendacoes
      };
    });
  }, [simulados]);

  // Lista com filtros aplicados
  const discentesFiltrados = useMemo(() => {
    return listaPerfisAlunos.filter((aluno) => {
      const matchBusca =
        aluno.nome.toLowerCase().includes(buscaAluno.toLowerCase()) ||
        aluno.matricula.includes(buscaAluno);

      const matchRisco =
        filtroRisco === 'Todos' || aluno.statusRisco === filtroRisco;

      return matchBusca && matchRisco;
    });
  }, [listaPerfisAlunos, buscaAluno, filtroRisco]);

  // Métricas agregadas da turma
  const metricasTurma = useMemo(() => {
    const totalSim = simulados.length;
    if (totalSim === 0) {
      return {
        totalAlunos: listaPerfisAlunos.length,
        totalSimulados: 0,
        mediaGeral: 0,
        taxaAcertoGeral: 0,
        alunosEmRisco: 0,
        percentualRisco: 0
      };
    }

    const somaNotas = simulados.reduce((acc, s) => acc + s.nota, 0);
    const totalQuestoes = simulados.reduce((acc, s) => acc + s.total, 0);
    const totalAcertos = simulados.reduce((acc, s) => acc + s.acertos, 0);

    const mediaGeral = Number((somaNotas / totalSim).toFixed(1));
    const taxaAcertoGeral = totalQuestoes > 0 ? Number(((totalAcertos / totalQuestoes) * 100).toFixed(1)) : 0;
    const emRisco = listaPerfisAlunos.filter((a) => a.statusRisco === 'Crítico' || a.statusRisco === 'Atenção').length;
    const percentualRisco = listaPerfisAlunos.length > 0 ? Math.round((emRisco / listaPerfisAlunos.length) * 100) : 0;

    return {
      totalAlunos: listaPerfisAlunos.length,
      totalSimulados: totalSim,
      mediaGeral,
      taxaAcertoGeral,
      alunosEmRisco: emRisco,
      percentualRisco
    };
  }, [simulados, listaPerfisAlunos]);

  // Dados para o Gráfico de Distribuição de Notas (Histograma)
  const dadosDistribuicaoNotas = useMemo(() => {
    const faixas = [
      { faixa: '0.0 - 3.9 (Crítico)', total: 0, cor: '#dc2626' },
      { faixa: '4.0 - 6.9 (Atenção)', total: 0, cor: '#d97706' },
      { faixa: '7.0 - 8.9 (Aprovado)', total: 0, cor: '#00733f' },
      { faixa: '9.0 - 10.0 (Excelente)', total: 0, cor: '#002752' }
    ];

    simulados.forEach((s) => {
      if (s.nota < 4.0) faixas[0].total++;
      else if (s.nota < 7.0) faixas[1].total++;
      else if (s.nota < 9.0) faixas[2].total++;
      else faixas[3].total++;
    });

    return faixas;
  }, [simulados]);

  // Desempenho por Unidade Curricular da Turma
  const dadosUnidadesTurma = useMemo(() => {
    const mapa: Record<number, { acertos: number; total: number }> = {
      1: { acertos: 0, total: 0 },
      2: { acertos: 0, total: 0 },
      3: { acertos: 0, total: 0 },
      4: { acertos: 0, total: 0 },
      5: { acertos: 0, total: 0 }
    };

    simulados.forEach((s) => {
      if (s.detalhesPorUnidade) {
        Object.entries(s.detalhesPorUnidade).forEach(([uStr, st]) => {
          const uNum = Number(uStr);
          const val = st as { acertos: number; total: number };
          if (mapa[uNum] && val) {
            mapa[uNum].acertos += (val.acertos || 0);
            mapa[uNum].total += (val.total || 0);
          }
        });
      }
    });

    return [1, 2, 3, 4, 5].map((uNum) => {
      const uInfo = UNIDADES_CURRICULARES.find((u) => u.numero === uNum);
      const st = mapa[uNum];
      const taxa = st.total > 0 ? Number(((st.acertos / st.total) * 100).toFixed(1)) : 72;
      const media = Number(((taxa / 100) * 10).toFixed(1));

      let topicoCritico = 'Fixação conceitual dos teoremas centrais';
      if (uNum === 1) topicoCritico = 'Funções de Musgrave & Teoremas do Bem-Estar';
      if (uNum === 2) topicoCritico = 'Condição de Samuelson & Monopólios Naturais';
      if (uNum === 3) topicoCritico = 'Axiomas de Arrow & Burocracia de Niskanen';
      if (uNum === 4) topicoCritico = 'Peso Morto de Harberger & Regra de Ramsey';
      if (uNum === 5) topicoCritico = 'Efeito Flypaper & Modelo de Tiebout';

      return {
        numero: uNum,
        nomeCurto: `Unid ${uNum}`,
        titulo: uInfo?.titulo || `Unidade ${uNum}`,
        taxaAcerto: taxa,
        mediaNota: media,
        topicoCritico
      };
    });
  }, [simulados]);

  // Evolução temporal das notas nos últimos simulados realizados
  const dadosEvolucaoTemporal = useMemo(() => {
    const ordenados = [...simulados].sort((a, b) => a.timestamp - b.timestamp);
    if (ordenados.length === 0) return [];

    // Pegar últimas 10 sessões
    return ordenados.slice(-10).map((s, idx) => ({
      sessao: `S-${idx + 1}`,
      aluno: s.alunoNome?.split(' ')[0] || `Aluno ${idx + 1}`,
      nota: s.nota,
      data: s.data
    }));
  }, [simulados]);

  // Questões mais erradas da turma
  const questoesMaisDesafiadoras = useMemo(() => {
    const contagemErros: Record<string, number> = {};

    simulados.forEach((s) => {
      if (s.errosQuestoesIds && Array.isArray(s.errosQuestoesIds)) {
        s.errosQuestoesIds.forEach((qId) => {
          contagemErros[qId] = (contagemErros[qId] || 0) + 1;
        });
      }
    });

    const ordenadas = Object.entries(contagemErros)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);

    return ordenadas.map(([id, totalErros]) => {
      const questao = BANCO_COMPLETO_QUESTOES.find((q) => q.id === id);
      const totalSim = simulados.length || 1;
      const taxaErro = Math.round((totalErros / totalSim) * 100);

      return {
        id,
        topico: questao?.topico || 'Economia do Setor Público',
        unidade: questao?.unidade || 1,
        dificuldade: questao?.dificuldade || 'Média-Alta',
        totalErros,
        taxaErro,
        enunciado: questao?.enunciado || 'Enunciado analítico da questão',
        justificativa: questao?.justificativa || 'Requer atenção ao mecanismo de mercado e intervenção estatal.'
      };
    });
  }, [simulados]);

  // Exportar Relatório Consolidado da Turma em PDF
  const handleExportarPDFTurma = () => {
    setGerandoPDF(true);
    try {
      exportarDashboardPedagogicoTurmaPDF({
        titulo: 'Relatório Pedagógico & Desempenho dos Simulados da Turma',
        turmaNome: 'Graduação em Ciências Econômicas • UEMA 2026.1',
        professorNome: 'Prof. Dr. Ricardo Arvate (Docente Titular)',
        totalAlunos: metricasTurma.totalAlunos || 1,
        totalSimulados: metricasTurma.totalSimulados,
        mediaGeral: metricasTurma.mediaGeral,
        taxaAcertoGeral: metricasTurma.taxaAcertoGeral,
        desempenhoPorUnidade: dadosUnidadesTurma,
        alunos: listaPerfisAlunos.map((a) => ({
          nome: a.nome,
          matricula: a.matricula,
          totalSimulados: a.totalSimulados,
          media: a.media,
          taxaAcerto: a.taxaAcerto,
          statusRisco: a.statusRisco,
          nivelDominio: a.nivelDominio
        })),
        planoIntervencao: [
          'Agendamento de seminário de revisão para as Unidades 2 e 4 (Bens Públicos e Teoria da Tributação).',
          'Aplicação de simulados com gabaritos detalhados para fixação da Condição de Samuelson e Peso Morto de Harberger.',
          'Sessões de mentoria pedagógica e monitoria acadêmica direcionadas aos discentes com status de Atenção e Crítico.',
          'Utilização prática dos simuladores interativos para demonstração visual das distorções tributárias.'
        ]
      });
    } catch (e) {
      console.error('Erro ao exportar PDF da turma:', e);
    } finally {
      setGerandoPDF(false);
    }
  };

  // Exportar Perfil Individual do Aluno em PDF
  const handleExportarPDFAluno = (aluno: any) => {
    try {
      exportarPerfilPedagogicoAlunoPDF({
        aluno: {
          nome: aluno.nome,
          matricula: aluno.matricula,
          email: `${aluno.matricula}@aluno.uema.br`,
          turma: 'Ciências Econômicas • UEMA'
        },
        totalSimulados: aluno.totalSimulados,
        totalQuestoes: aluno.totalQuestoes,
        mediaGeral: aluno.media,
        taxaAcerto: aluno.taxaAcerto,
        tempoMedio: aluno.tempoMedioFormatado,
        statusRisco: aluno.statusRisco,
        nivelDominio: aluno.nivelDominio,
        desempenhoUnidades: aluno.desempenhoUnidades,
        pontosFortes: aluno.pontosFortes,
        pontosAtencao: aluno.pontosAtencao,
        recomendacoes: aluno.recomendacoes,
        historico: aluno.simulados.map((s: RegistroSimuladoFirestore, i: number) => ({
          data: s.data,
          nota: s.nota,
          simulado: `Simulado #${i + 1} (${s.dificuldade || 'Média'})`
        }))
      });
    } catch (e) {
      console.error('Erro ao exportar PDF do discente:', e);
    }
  };

  // Simular Submissões de Alunos (para demonstração pelo professor)
  const handleSimularSubmissoes = async () => {
    setSimulandoDados(true);
    try {
      await firestoreDataService.simularSubmissoesAlunos();
    } catch (e) {
      console.error('Erro ao simular submissões:', e);
    } finally {
      setSimulandoDados(false);
    }
  };

  return (
    <div className="space-y-6" id="dashboard-pedagogico-view">
      {/* Cabeçalho do Dashboard Pedagógico */}
      <div className="bg-[#002752] text-white p-6 rounded-2xl border-b-4 border-[#ebc000] shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#00733f] text-white">
              Telemetria & Diagnóstico de Aprendizagem
            </span>
            <span className="flex items-center gap-1 text-[11px] text-emerald-300 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Sincronização em Tempo Real com Firestore
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-[#ebc000]" />
            Dashboard Pedagógico & Avaliação dos Simulados
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Acompanhe o perfil de competências dos estudantes da UEMA, identifique lacunas cognitivas nas 5 unidades da ementa e gere relatórios acadêmicos oficiais em PDF conforme os simulados são realizados.
          </p>
        </div>

        {/* Ações Rápidas */}
        <div className="flex flex-wrap items-center gap-2">
          {modo === 'docente' && (
            <button
              onClick={handleSimularSubmissoes}
              disabled={simulandoDados}
              title="Injeta simulações de teste para visualizar a telemetria ao vivo"
              className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${simulandoDados ? 'animate-spin' : ''}`} />
              {simulandoDados ? 'Simulando...' : 'Simular Submissões de Teste'}
            </button>
          )}

          <button
            onClick={handleExportarPDFTurma}
            disabled={gerandoPDF || simulados.length === 0}
            className="px-4 py-2 bg-[#ebc000] text-[#002752] text-xs font-black rounded-xl hover:bg-amber-400 transition-all shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <FileDown className="w-4 h-4 text-[#002752]" />
            {gerandoPDF ? 'Gerando Relatório PDF...' : 'Exportar Dashboard em PDF'}
          </button>
        </div>
      </div>

      {/* Cartões de Indicadores Gerais da Turma */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Média da Turma */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
            metricasTurma.mediaGeral >= 7 ? 'bg-emerald-50 text-[#00733f]' :
            metricasTurma.mediaGeral >= 5 ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
          }`}>
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Média Geral</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-[#002752]">
                {metricasTurma.mediaGeral.toFixed(1)}
              </span>
              <span className="text-xs text-slate-400">/ 10</span>
            </div>
            <span className="text-[10px] font-semibold text-slate-500">
              {metricasTurma.mediaGeral >= 7 ? 'Desempenho satisfatório' : 'Necessita de reforço'}
            </span>
          </div>
        </div>

        {/* Taxa de Acertos */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#002752] flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Taxa de Acertos</span>
            <span className="text-2xl font-black text-[#002752]">
              {metricasTurma.taxaAcertoGeral.toFixed(1)}%
            </span>
            <span className="text-[10px] font-semibold text-slate-500 block">
              Nas 2.000 questões do banco
            </span>
          </div>
        </div>

        {/* Simulados Concluídos */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <BookCheck className="w-6 h-6 text-[#ebc000]" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Simulados Submetidos</span>
            <span className="text-2xl font-black text-[#002752]">
              {metricasTurma.totalSimulados}
            </span>
            <span className="text-[10px] font-semibold text-slate-500 block">
              Por {metricasTurma.totalAlunos} discentes registrados
            </span>
          </div>
        </div>

        {/* Alunos em Risco */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
            metricasTurma.alunosEmRisco === 0 ? 'bg-emerald-50 text-[#00733f]' : 'bg-rose-50 text-rose-700'
          }`}>
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Atenção Pedagógica</span>
            <span className="text-2xl font-black text-rose-700">
              {metricasTurma.alunosEmRisco} aluno(s)
            </span>
            <span className="text-[10px] font-semibold text-slate-500 block">
              {metricasTurma.percentualRisco}% com média &lt; 7.0
            </span>
          </div>
        </div>
      </div>

      {/* Gráficos Analíticos da Turma */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico 1: Desempenho por Unidade Curricular */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-sm text-[#002752] flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#00733f]" />
                Taxa de Acerto por Unidade Curricular (Ementa 60h)
              </h3>
              <p className="text-xs text-slate-500">
                Comparativo de rendimento nas 5 unidades formativas do curso
              </p>
            </div>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
              Meta: &ge; 70%
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dadosUnidadesTurma} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="nomeCurto" tick={{ fontSize: 11 }} stroke="#64748b" />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} stroke="#64748b" unit="%" />
                <Tooltip
                  formatter={(val: any) => [`${val}%`, 'Taxa de Acerto']}
                  labelFormatter={(lbl: any) => {
                    const item = dadosUnidadesTurma.find((d) => d.nomeCurto === lbl);
                    return item ? `${item.titulo} (Unidade ${item.numero})` : lbl;
                  }}
                  contentStyle={{ backgroundColor: '#002752', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="taxaAcerto" radius={[4, 4, 0, 0]}>
                  {dadosUnidadesTurma.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.taxaAcerto >= 75 ? '#00733f' : entry.taxaAcerto >= 60 ? '#ebc000' : '#dc2626'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legenda de Proficiência */}
          <div className="flex flex-wrap items-center justify-between text-xs pt-2 border-t border-slate-100 text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-[#00733f]" />
              Forte Domínio (&ge;75%)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-[#ebc000]" />
              Moderado (60-74%)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-[#dc2626]" />
              Crítico (&lt;60%)
            </span>
          </div>
        </div>

        {/* Gráfico 2: Distribuição de Notas da Turma (Histograma) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-sm text-[#002752] flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#ebc000]" />
                Distribuição das Notas dos Alunos nos Simulados
              </h3>
              <p className="text-xs text-slate-500">
                Histograma formativo categorizado por faixas de aproveitamento acadêmico
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#002752] bg-blue-50 px-2.5 py-1 rounded-md">
              Total: {simulados.length}
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dadosDistribuicaoNotas} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="faixa" tick={{ fontSize: 10 }} stroke="#64748b" />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} stroke="#64748b" />
                <Tooltip
                  formatter={(val: any) => [`${val} simulados`, 'Quantidade']}
                  contentStyle={{ backgroundColor: '#002752', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                  {dadosDistribuicaoNotas.map((entry, index) => (
                    <Cell key={`cell-hist-${index}`} fill={entry.cor} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
            <span>Classificação UEMA:</span>
            <span className="font-semibold text-emerald-800">
              {metricasTurma.totalSimulados > 0
                ? `${Math.round(((dadosDistribuicaoNotas[2].total + dadosDistribuicaoNotas[3].total) / metricasTurma.totalSimulados) * 100)}% de Aprovação Direta`
                : 'Aguardando submissões'}
            </span>
          </div>
        </div>
      </div>

      {/* Questões Mais Críticas & Tópicos Desafiadores */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-sm text-[#002752] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              Tópicos Críticos com Maior Índice de Erros da Turma
            </h3>
            <p className="text-xs text-slate-500">
              Questões do banco onde os alunos mais tiveram dificuldade. Recomendado para resolução e debate nas próximas aulas.
            </p>
          </div>
          {onNavigateToLessons && (
            <button
              onClick={onNavigateToLessons}
              className="text-xs font-bold text-[#002752] hover:text-[#00733f] flex items-center gap-1 cursor-pointer"
            >
              Consultar Aulas Relacionadas
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {questoesMaisDesafiadoras.length === 0 ? (
          <div className="p-4 rounded-xl bg-slate-50 text-center text-xs text-slate-500">
            Nenhum erro registrado ainda ou a turma ainda está iniciando as resoluções.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questoesMaisDesafiadoras.map((q) => (
              <div
                key={q.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-all space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white text-[#002752] border border-slate-200">
                      {q.id} • Unidade {q.unidade}
                    </span>
                    <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                      {q.totalErros} erros registrados
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 mt-2">{q.topico}</h4>
                  <p className="text-[11px] text-slate-600 line-clamp-2 mt-1">
                    {q.enunciado}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-600">
                  <strong className="text-slate-800 block">Diretriz Didática Sugerida:</strong>
                  <p className="text-slate-700 line-clamp-2">{q.justificativa}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Relação Nominal & Perfis Pedagógicos dos Discentes */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-base text-[#002752] flex items-center gap-2">
              <Users className="w-5 h-5 text-[#00733f]" />
              Perfis Pedagógicos Individuais dos Discentes ({listaPerfisAlunos.length})
            </h3>
            <p className="text-xs text-slate-500">
              Diagnóstico individual de cada estudante da UEMA conforme seu histórico de simulados
            </p>
          </div>

          {/* Filtros da Tabela */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por nome ou matrícula..."
                value={buscaAluno}
                onChange={(e) => setBuscaAluno(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-hidden focus:border-[#002752]"
              />
            </div>

            <select
              value={filtroRisco}
              onChange={(e) => setFiltroRisco(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-hidden"
            >
              <option value="Todos">Status: Todos</option>
              <option value="Estável">Status: Estável</option>
              <option value="Atenção">Status: Atenção</option>
              <option value="Crítico">Status: Crítico</option>
            </select>
          </div>
        </div>

        {/* Tabela de Discentes */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-[11px] font-bold uppercase tracking-wider bg-slate-50/50">
                <th className="py-2.5 px-3">Discente</th>
                <th className="py-2.5 px-3 text-center">Simulados</th>
                <th className="py-2.5 px-3 text-center">Média</th>
                <th className="py-2.5 px-3 text-center">Taxa de Acerto</th>
                <th className="py-2.5 px-3">Diagnóstico Pedagógico</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {discentesFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-slate-400">
                    Nenhum aluno encontrado com os filtros selecionados.
                  </td>
                </tr>
              ) : (
                discentesFiltrados.map((aluno) => (
                  <tr key={aluno.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900">{aluno.nome}</div>
                      <div className="text-[10px] text-slate-400 font-mono">Matrícula: {aluno.matricula}</div>
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-slate-700">
                      {aluno.totalSimulados}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`font-bold font-mono px-2 py-0.5 rounded ${
                        aluno.media >= 7.0 ? 'bg-emerald-50 text-emerald-800' :
                        aluno.media >= 5.0 ? 'bg-amber-50 text-amber-800' : 'bg-rose-50 text-rose-800'
                      }`}>
                        {aluno.media.toFixed(1)}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-slate-700">
                      {aluno.taxaAcerto.toFixed(1)}%
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-slate-800 block">{aluno.nivelDominio}</span>
                      <span className="text-[10px] text-slate-500">
                        Ponto forte: {aluno.unidadeMaisForte?.nome.slice(0, 24)}...
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        aluno.statusRisco === 'Estável' ? 'bg-emerald-100 text-emerald-800' :
                        aluno.statusRisco === 'Atenção' ? 'bg-amber-100 text-amber-900' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {aluno.statusRisco}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setAlunoSelecionado(aluno)}
                          className="px-2.5 py-1 bg-[#002752] text-white rounded-lg text-xs font-semibold hover:bg-[#001c3d] flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3 h-3" />
                          Ver Perfil
                        </button>
                        <button
                          onClick={() => handleExportarPDFAluno(aluno)}
                          title="Baixar Boletim em PDF"
                          className="p-1 text-slate-600 hover:text-[#002752] hover:bg-slate-100 rounded-lg cursor-pointer transition-colors"
                        >
                          <FileDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DO PERFIL PEDAGÓGICO COMPLETO DO ALUNO */}
      {alunoSelecionado && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-xl p-6 space-y-6">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase text-[#00733f] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Boletim Pedagógico Individual • UEMA
                </span>
                <h3 className="font-bold text-lg text-[#002752] mt-1">{alunoSelecionado.nome}</h3>
                <p className="text-xs text-slate-500">
                  Matrícula: {alunoSelecionado.matricula} • Status: <strong className={alunoSelecionado.statusRisco === 'Estável' ? 'text-emerald-700' : 'text-rose-700'}>{alunoSelecionado.statusRisco}</strong> ({alunoSelecionado.nivelDominio})
                </p>
              </div>
              <button
                onClick={() => setAlunoSelecionado(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Métricas Principais */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Média de Notas</span>
                <span className="text-xl font-black text-[#002752]">{alunoSelecionado.media.toFixed(1)}</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Taxa de Acertos</span>
                <span className="text-xl font-black text-[#00733f]">{alunoSelecionado.taxaAcerto.toFixed(1)}%</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Simulados Feitos</span>
                <span className="text-xl font-black text-[#002752]">{alunoSelecionado.totalSimulados}</span>
              </div>
            </div>

            {/* Domínio por Unidade */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs text-[#002752] uppercase tracking-wider">
                Domínio por Unidade Curricular (Ementa 60h)
              </h4>
              <div className="space-y-2">
                {alunoSelecionado.desempenhoUnidades.map((u: any) => (
                  <div key={u.unidade} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3 text-xs">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-slate-900">Unidade {u.unidade}: {u.nome}</span>
                        <span className="font-mono font-bold text-slate-700">{u.taxa.toFixed(1)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            u.taxa >= 75 ? 'bg-[#00733f]' : u.taxa >= 60 ? 'bg-[#ebc000]' : 'bg-rose-500'
                          }`}
                          style={{ width: `${u.taxa}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recomendações de Estudo */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2 text-xs">
              <strong className="text-amber-950 font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Roteiro de Estudos Sugerido para o Discente:
              </strong>
              <ul className="list-disc list-inside space-y-1 text-amber-900">
                {alunoSelecionado.recomendacoes.map((rec: string, idx: number) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </div>

            {/* Botões do Modal */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setAlunoSelecionado(null)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Fechar
              </button>
              <button
                onClick={() => handleExportarPDFAluno(alunoSelecionado)}
                className="px-4 py-2 bg-[#002752] text-white rounded-xl text-xs font-bold hover:bg-[#001c3d] flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <FileDown className="w-3.5 h-3.5 text-[#ebc000]" />
                Exportar Boletim do Aluno (PDF)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
