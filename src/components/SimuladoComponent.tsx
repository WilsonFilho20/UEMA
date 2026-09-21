import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Clock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Filter,
  Play,
  Pause,
  Sliders,
  Sparkles,
  Layers,
  Save,
  Check,
  FileDown,
  Printer,
  Award,
  AlertTriangle,
  TrendingUp,
  BrainCircuit,
  Compass,
  CheckSquare,
  Square,
  HelpCircle,
  ChevronRight,
  Search,
  ExternalLink,
  Target
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UNIDADES_CURRICULARES, GOOGLE_DRIVE_REPO } from '../data/questionsData';
import { BANCO_COMPLETO_QUESTOES, TOPICOS_CATALOGO, TopicoInfo } from '../data/questionBankEngine';
import { Dificuldade, Questao, ResultadoSimulado } from '../types';
import { UemaEconomiaLogo } from './UemaEconomiaLogo';
import { authService } from '../services/authService';
import { firestoreDataService } from '../services/firestoreDataService';
import { exportarProvaParaPDF, exportarRoteiroEstudosPersonalizadoPDF, DadosRoteiroEstudoPDF } from '../utils/pdfExportService';
import { gerarAnaliseDesempenhoERoteiro, AnaliseDesempenhoCompleta } from '../utils/studyPlanGenerator';

interface SimuladoComponentProps {
  unidadeInicial?: number | 'Todas';
  aulaInicial?: number | null;
  dificuldadeInicial?: Dificuldade | 'Todas';
  onNavigateToLessons?: () => void;
  onNavigateToSimulators?: () => void;
}

export const SimuladoComponent: React.FC<SimuladoComponentProps> = ({
  unidadeInicial = 'Todas',
  aulaInicial = null,
  dificuldadeInicial = 'Todas',
  onNavigateToLessons,
  onNavigateToSimulators
}) => {
  // ==========================================
  // ESTADOS DE CONFIGURAÇÃO DO SIMULADO
  // ==========================================
  // Seleção múltipla de unidades
  const [unidadesSelecionadas, setUnidadesSelecionadas] = useState<number[]>(
    unidadeInicial === 'Todas' ? [1, 2, 3, 4, 5] : [Number(unidadeInicial)]
  );
  const [todasAsUnidades, setTodasAsUnidades] = useState<boolean>(unidadeInicial === 'Todas');

  // Seleção de conteúdos específicos (tópicos da ementa)
  const [topicosSelecionados, setTopicosSelecionados] = useState<string[]>([]);
  const [todosOsTopicos, setTodosOsTopicos] = useState<boolean>(true);
  const [buscaTopico, setBuscaTopico] = useState<string>('');

  // Filtros adicionais
  const [dificuldadeFiltro, setDificuldadeFiltro] = useState<Dificuldade | 'Todas'>(dificuldadeInicial);
  const [aulaFiltro, setAulaFiltro] = useState<number | null>(aulaInicial);
  const [modoEstudo, setModoEstudo] = useState<boolean>(true); // true = Feedback imediato (treino); false = Exame oficial (tempo real)
  const [quantidadeQuestoes, setQuantidadeQuestoes] = useState<number>(10);
  const [tempoInicialMinutos, setTempoInicialMinutos] = useState<number>(20);

  // ==========================================
  // ESTADOS DO SIMULADO EM ANDAMENTO
  // ==========================================
  const [simuladoIniciado, setSimuladoIniciado] = useState<boolean>(false);
  const [simuladoFinalizado, setSimuladoFinalizado] = useState<boolean>(false);
  const [questoesAtuais, setQuestoesAtuais] = useState<Questao[]>([]);
  const [indiceAtual, setIndiceAtual] = useState<number>(0);
  const [respostas, setRespostas] = useState<Record<string, 'A' | 'B' | 'C' | 'D' | 'E'>>({});
  const [mostrarGabaritoAtual, setMostrarGabaritoAtual] = useState<boolean>(false);
  const [salvoNoBanco, setSalvoNoBanco] = useState<boolean>(false);
  const [abaResultado, setAbaResultado] = useState<'diagnostico' | 'roteiro' | 'gabarito'>('diagnostico');

  // Cronômetro
  const [segundosRestantes, setSegundosRestantes] = useState<number>(20 * 60);
  const [tempoGastoTotal, setTempoGastoTotal] = useState<number>(0);
  const [timerAtivo, setTimerAtivo] = useState<boolean>(false);
  const timerRef = useRef<any>(null);

  // Obter usuário logado atual
  const usuario = authService.obterUsuarioAtual();

  // Atualizar quando props mudarem
  useEffect(() => {
    if (unidadeInicial !== undefined) {
      if (unidadeInicial === 'Todas') {
        setUnidadesSelecionadas([1, 2, 3, 4, 5]);
        setTodasAsUnidades(true);
      } else {
        setUnidadesSelecionadas([Number(unidadeInicial)]);
        setTodasAsUnidades(false);
      }
    }
    if (aulaInicial !== undefined) setAulaFiltro(aulaInicial);
    if (dificuldadeInicial !== undefined) setDificuldadeFiltro(dificuldadeInicial);
  }, [unidadeInicial, aulaInicial, dificuldadeInicial]);

  // Lista de tópicos disponíveis baseada nas unidades ativas
  const topicosDisponiveis = useMemo(() => {
    return TOPICOS_CATALOGO.filter((topico) => {
      const unidadeAtiva = todasAsUnidades || unidadesSelecionadas.includes(topico.unidade);
      const bateAula = !aulaFiltro || topico.aulaNumero === aulaFiltro;
      const bateBusca = !buscaTopico ||
        topico.nome.toLowerCase().includes(buscaTopico.toLowerCase()) ||
        topico.descricao.toLowerCase().includes(buscaTopico.toLowerCase());
      return unidadeAtiva && bateAula && bateBusca;
    });
  }, [todasAsUnidades, unidadesSelecionadas, aulaFiltro, buscaTopico]);

  // Banco filtrado em tempo real para cálculo e contador
  const questoesFiltradas = useMemo(() => {
    let pool = [...BANCO_COMPLETO_QUESTOES];

    // 1. Filtro de Unidades
    if (!todasAsUnidades && unidadesSelecionadas.length > 0) {
      pool = pool.filter((q) => unidadesSelecionadas.includes(q.unidade));
    }

    // 2. Filtro de Tópicos
    if (!todosOsTopicos && topicosSelecionados.length > 0) {
      const nomesTopicos = TOPICOS_CATALOGO
        .filter((t) => topicosSelecionados.includes(t.id))
        .map((t) => t.nome.toLowerCase());
      pool = pool.filter((q) => {
        if (!q.topico) return false;
        const qTopicoLower = q.topico.toLowerCase();
        return nomesTopicos.some((nt) => qTopicoLower.includes(nt) || nt.includes(qTopicoLower));
      });
    }

    // 3. Filtro de Aula
    if (aulaFiltro) {
      pool = pool.filter((q) => q.aula_relacionada === aulaFiltro);
    }

    // 4. Filtro de Dificuldade
    if (dificuldadeFiltro !== 'Todas') {
      pool = pool.filter((q) => q.dificuldade === dificuldadeFiltro);
    }

    return pool;
  }, [todasAsUnidades, unidadesSelecionadas, todosOsTopicos, topicosSelecionados, aulaFiltro, dificuldadeFiltro]);

  // Handler para alternar unidade individual
  const alternarUnidade = (num: number) => {
    let novas: number[];
    if (unidadesSelecionadas.includes(num)) {
      novas = unidadesSelecionadas.filter((u) => u !== num);
      if (novas.length === 0) novas = [num]; // manter pelo menos uma
    } else {
      novas = [...unidadesSelecionadas, num];
    }
    setUnidadesSelecionadas(novas);
    setTodasAsUnidades(novas.length === 5);
  };

  // Handler para alternar todos os tópicos
  const alternarTodosTopicos = (selecionarTodos: boolean) => {
    setTodosOsTopicos(selecionarTodos);
    if (selecionarTodos) {
      setTopicosSelecionados([]);
    } else {
      setTopicosSelecionados(topicosDisponiveis.map((t) => t.id));
    }
  };

  // Handler para alternar tópico individual
  const alternarTopico = (topicoId: string) => {
    setTodosOsTopicos(false);
    if (topicosSelecionados.includes(topicoId)) {
      const novos = topicosSelecionados.filter((id) => id !== topicoId);
      setTopicosSelecionados(novos);
      if (novos.length === 0) {
        setTodosOsTopicos(true);
      }
    } else {
      setTopicosSelecionados([...topicosSelecionados, topicoId]);
    }
  };

  // Iniciar Simulado
  const iniciarSimulado = () => {
    let pool = [...questoesFiltradas];

    // Se a combinação de filtros for excessivamente restrita
    if (pool.length === 0) {
      pool = BANCO_COMPLETO_QUESTOES.filter((q) =>
        todasAsUnidades ? true : unidadesSelecionadas.includes(q.unidade)
      );
    }
    if (pool.length === 0) {
      pool = [...BANCO_COMPLETO_QUESTOES];
    }

    // Embaralhar e extrair a quantidade desejada
    const selecionadas = pool.sort(() => 0.5 - Math.random()).slice(0, quantidadeQuestoes);

    setQuestoesAtuais(selecionadas);
    setIndiceAtual(0);
    setRespostas({});
    setMostrarGabaritoAtual(false);
    setSimuladoFinalizado(false);
    setSimuladoIniciado(true);
    setAbaResultado('diagnostico');
    setSalvoNoBanco(false);

    const tempoSeg = tempoInicialMinutos === 0 ? 99999 : tempoInicialMinutos * 60;
    setSegundosRestantes(tempoSeg);
    setTempoGastoTotal(0);
    setTimerAtivo(tempoInicialMinutos > 0);
  };

  // Timer Tick
  useEffect(() => {
    if (timerAtivo && segundosRestantes > 0 && !simuladoFinalizado) {
      timerRef.current = setTimeout(() => {
        setSegundosRestantes((prev) => prev - 1);
        setTempoGastoTotal((prev) => prev + 1);
      }, 1000);
    } else if (segundosRestantes === 0 && simuladoIniciado && !simuladoFinalizado && tempoInicialMinutos > 0) {
      finalizarSimulado();
    }

    return () => clearTimeout(timerRef.current);
  }, [timerAtivo, segundosRestantes, simuladoIniciado, simuladoFinalizado, tempoInicialMinutos]);

  // Formatação do tempo MM:SS
  const formatarTempo = (seg: number) => {
    const min = Math.floor(seg / 60);
    const s = seg % 60;
    return `${min.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Selecionar alternativa
  const selecionarAlternativa = (letra: 'A' | 'B' | 'C' | 'D' | 'E') => {
    if (simuladoFinalizado) return;

    const questaoAtual = questoesAtuais[indiceAtual];
    setRespostas((prev) => ({
      ...prev,
      [questaoAtual.id]: letra
    }));

    if (modoEstudo) {
      setMostrarGabaritoAtual(true);
    }
  };

  const proximaQuestao = () => {
    if (indiceAtual < questoesAtuais.length - 1) {
      setIndiceAtual((prev) => prev + 1);
      setMostrarGabaritoAtual(false);
    } else {
      finalizarSimulado();
    }
  };

  const questaoAnterior = () => {
    if (indiceAtual > 0) {
      setIndiceAtual((prev) => prev - 1);
      setMostrarGabaritoAtual(false);
    }
  };

  // Análise Pedagógica Completa e Roteiro de Estudos (computado via helper)
  const analiseCompleta: AnaliseDesempenhoCompleta = useMemo(() => {
    const tempoGasto = tempoInicialMinutos === 0 ? tempoGastoTotal : Math.max(0, tempoInicialMinutos * 60 - segundosRestantes);
    return gerarAnaliseDesempenhoERoteiro(questoesAtuais, respostas, tempoGasto);
  }, [questoesAtuais, respostas, tempoInicialMinutos, segundosRestantes, tempoGastoTotal]);

  // Objeto de resultado compatível com Firestore
  const resultadoSimulado: ResultadoSimulado = useMemo(() => {
    const porUnidade: Record<number, { acertos: number; total: number }> = {
      1: { acertos: 0, total: 0 },
      2: { acertos: 0, total: 0 },
      3: { acertos: 0, total: 0 },
      4: { acertos: 0, total: 0 },
      5: { acertos: 0, total: 0 }
    };

    analiseCompleta.diagnosticoUnidades.forEach((du) => {
      porUnidade[du.unidade] = { acertos: du.acertos, total: du.total };
    });

    const tempoGasto = tempoInicialMinutos === 0 ? tempoGastoTotal : Math.max(0, tempoInicialMinutos * 60 - segundosRestantes);

    return {
      id: `sim_${Date.now()}`,
      data: new Date().toLocaleDateString('pt-BR'),
      respostas,
      acertos: analiseCompleta.acertos,
      total: analiseCompleta.total,
      nota: analiseCompleta.nota,
      tempoGastoSegundos: tempoGasto,
      dificuldade: dificuldadeFiltro,
      detalhesPorUnidade: porUnidade
    };
  }, [analiseCompleta, respostas, tempoInicialMinutos, segundosRestantes, tempoGastoTotal, dificuldadeFiltro]);

  // Finalizar Simulado
  const finalizarSimulado = () => {
    setSimuladoFinalizado(true);
    setTimerAtivo(false);

    // Efeito de Confetti comemorativo se nota >= 7.0
    if (analiseCompleta.nota >= 7.0) {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    // Persistir no Firestore
    if (usuario) {
      const errosIds = analiseCompleta.questoesParaRevisao.map((q) => q.id);
      const unidadeFiltroGravada = todasAsUnidades ? 'Todas' : unidadesSelecionadas.join(',');

      firestoreDataService
        .salvarResultadoSimulado({
          alunoId: usuario.uid,
          alunoNome: usuario.nome,
          alunoMatricula: usuario.matriculaOuSiape,
          resultado: resultadoSimulado,
          unidadeFiltro: unidadeFiltroGravada,
          errosQuestoesIds: errosIds
        })
        .then(() => {
          setSalvoNoBanco(true);
        })
        .catch((err) => {
          console.error('Erro ao sincronizar com Firestore:', err);
        });
    }
  };

  // Reiniciar simulado para configuração
  const reiniciar = () => {
    setSimuladoIniciado(false);
    setSimuladoFinalizado(false);
    setRespostas({});
    setQuestoesAtuais([]);
    setSalvoNoBanco(false);
  };

  // Configurar Novo Simulado focado exclusivamente nos Pontos Fracos
  const iniciarSimuladoFocadoPontosFracos = () => {
    if (analiseCompleta.unidadesParaRecuperacao.length > 0) {
      setUnidadesSelecionadas(analiseCompleta.unidadesParaRecuperacao);
      setTodasAsUnidades(false);
    }
    if (analiseCompleta.topicosParaRecuperacaoIds.length > 0) {
      setTopicosSelecionados(analiseCompleta.topicosParaRecuperacaoIds);
      setTodosOsTopicos(false);
    }
    setModoEstudo(true); // Modo treino recomendado para recuperação
    setSimuladoIniciado(false);
    setSimuladoFinalizado(false);
    setRespostas({});
    setQuestoesAtuais([]);
    setSalvoNoBanco(false);
  };

  // Exportar Roteiro de Estudos em PDF
  const baixarRoteiroPDF = () => {
    const dadosPDF: DadosRoteiroEstudoPDF = {
      aluno: {
        nome: usuario?.nome || 'Discente de Economia',
        matricula: usuario?.matriculaOuSiape || '2023-ECO-UEMA',
        email: usuario?.email || 'aluno@uema.br',
        turma: 'Ciências Econômicas - Matutino'
      },
      simuladoInfo: {
        data: new Date().toLocaleDateString('pt-BR'),
        nota: analiseCompleta.nota,
        acertos: analiseCompleta.acertos,
        total: analiseCompleta.total,
        tempoGasto: analiseCompleta.tempoGastoFormatado,
        unidadesTestadas: todasAsUnidades
          ? 'Unidades 1 a 5 (Ementa Completa 60h)'
          : unidadesSelecionadas.map((u) => `Unidade ${u}`).join(', '),
        conteudosTestados: todosOsTopicos
          ? 'Todos os conteúdos curriculares das unidades selecionadas'
          : topicosSelecionados.length > 0
            ? `${topicosSelecionados.length} tópicos específicos selecionados`
            : 'Tópicos gerais da disciplina'
      },
      diagnosticoUnidades: analiseCompleta.diagnosticoUnidades,
      diagnosticoConteudos: analiseCompleta.diagnosticoConteudos,
      pontosFortes: analiseCompleta.pontosFortes,
      pontosFracos: analiseCompleta.pontosFracos,
      questoesParaRevisao: analiseCompleta.questoesParaRevisao,
      etapasRoteiro: analiseCompleta.etapasRoteiro.map((e) => ({
        etapa: e.etapa,
        titulo: e.titulo,
        acao: e.acao,
        aulasRecomendadas: e.aulasRecomendadas,
        leituras: e.leituras,
        simuladorRecomendado: e.simuladorRecomendado
      })),
      professorResponsavel: 'Prof. Dr. Ricardo Arvate'
    };

    exportarRoteiroEstudosPersonalizadoPDF(dadosPDF);
  };

  const questaoAtiva = questoesAtuais[indiceAtual];
  const respostaSelecionada = questaoAtiva ? respostas[questaoAtiva.id] : undefined;
  const respondeuAtual = respostaSelecionada !== undefined;

  return (
    <div className="space-y-6" id="interface-simulado">
      {/* Header Institucional */}
      <div className="bg-[#002752] text-white p-6 sm:p-7 rounded-2xl shadow-sm border-b-4 border-[#ebc000] flex flex-wrap items-center justify-between gap-6">
        <div className="flex-1 min-w-[280px]">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ebc000] text-[#002752] uppercase tracking-wider">
              Ambiente de Simulação & Treinamento Personalizado
            </span>
            <span className="text-xs text-slate-300">
              Banco de 2.000 Questões com Gabarito Comentado • PPC UEMA
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight">
            Simulador Avaliativo de Teoria das Finanças Públicas
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-3xl leading-relaxed">
            Personalize seu simulado escolhendo as <strong>Unidades Curriculares</strong> e os <strong>Conteúdos Específicos</strong> da ementa. Ao finalizar, receba o diagnóstico completo com seus <strong>pontos fortes, pontos fracos</strong> e um <strong>Roteiro de Estudos Personalizado exportável em PDF</strong> para maximizar seu rendimento acadêmico.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-2 bg-white/10 rounded-xl border border-white/20 hidden lg:block">
            <UemaEconomiaLogo variant="compact" color="white" className="h-10" />
          </div>

          {/* Cronômetro ativo quando em resolução */}
          {simuladoIniciado && !simuladoFinalizado && (
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xs px-4 py-2 rounded-xl border border-white/20">
              <Clock className={`w-5 h-5 ${segundosRestantes < 180 && tempoInicialMinutos > 0 ? 'text-rose-400 animate-pulse' : 'text-[#ebc000]'}`} />
              <div className="text-right">
                <span className="text-[10px] text-slate-300 uppercase block font-semibold">
                  {tempoInicialMinutos === 0 ? 'Tempo de Resolução' : 'Tempo Restante'}
                </span>
                <span className={`text-xl font-black font-mono ${segundosRestantes < 180 && tempoInicialMinutos > 0 ? 'text-rose-300' : 'text-white'}`}>
                  {tempoInicialMinutos === 0 ? formatarTempo(tempoGastoTotal) : formatarTempo(segundosRestantes)}
                </span>
              </div>
              {tempoInicialMinutos > 0 && (
                <button
                  onClick={() => setTimerAtivo(!timerAtivo)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title={timerAtivo ? 'Pausar Cronômetro' : 'Retomar Cronômetro'}
                >
                  {timerAtivo ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* TELA 1: CONFIGURAÇÃO PERSONALIZADA DO SIMULADO */}
      {/* ========================================================= */}
      {!simuladoIniciado && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-8" id="painel-configuracao-simulado">
          {/* Header da Configuração */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl font-bold text-[#002752] flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#ebc000]" />
                Personalizar Meu Simulado de Estudo
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Selecione as Unidades e os conteúdos específicos que deseja revisar e testar.
              </p>
            </div>

            {/* Contador em Tempo Real */}
            <div className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-2">
              <Target className="w-4 h-4 text-[#002752]" />
              <span className="text-xs text-[#002752]">
                <strong>{questoesFiltradas.length} questões</strong> disponíveis no banco para sua seleção
              </span>
            </div>
          </div>

          {/* 1. SELEÇÃO DE UNIDADES CURRICULARES */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="font-bold text-sm text-[#002752] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#00733f]" />
                1. Escolha as Unidades Curriculares:
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setUnidadesSelecionadas([1, 2, 3, 4, 5]);
                    setTodasAsUnidades(true);
                  }}
                  className={`text-xs px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                    todasAsUnidades
                      ? 'bg-[#002752] text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  Todas as 5 Unidades
                </button>
              </div>
            </div>

            {/* Grid dos Cards de Unidades */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {UNIDADES_CURRICULARES.map((u) => {
                const ativa = todasAsUnidades || unidadesSelecionadas.includes(u.numero);
                return (
                  <button
                    key={u.numero}
                    type="button"
                    onClick={() => alternarUnidade(u.numero)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      ativa
                        ? 'border-[#002752] bg-blue-50/60 shadow-xs ring-1 ring-[#002752]'
                        : 'border-slate-200 bg-slate-50/70 hover:bg-white text-slate-500 opacity-70'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                          ativa ? 'bg-[#002752] text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                          Unidade {u.numero}
                        </span>
                        {ativa ? (
                          <CheckCircle2 className="w-4 h-4 text-[#00733f] shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                      </div>
                      <h4 className={`text-xs font-bold leading-tight ${ativa ? 'text-[#002752]' : 'text-slate-700'}`}>
                        {u.titulo.split('(')[0]}
                      </h4>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-2 line-clamp-2">
                      {u.descricao}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. SELEÇÃO DE CONTEÚDOS E TÓPICOS ESPECÍFICOS */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <label className="font-bold text-sm text-[#002752] flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-[#ebc000]" />
                  2. Escolha os Conteúdos / Tópicos Específicos:
                </label>
                <p className="text-xs text-slate-500 mt-0.5">
                  Filtre os temas teóricos específicos pertencentes às unidades que você selecionou acima.
                </p>
              </div>

              {/* Botões rápidos de controle dos tópicos */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => alternarTodosTopicos(true)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                    todosOsTopicos
                      ? 'bg-[#002752] text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  Todos os Conteúdos ({topicosDisponiveis.length})
                </button>
                <button
                  type="button"
                  onClick={() => alternarTodosTopicos(false)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                    !todosOsTopicos && topicosSelecionados.length > 0
                      ? 'bg-[#ebc000] text-[#002752]'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  Personalizar Eixos ({topicosSelecionados.length} selecionados)
                </button>
              </div>
            </div>

            {/* Barra de Busca de Tópico e Filtro de Aula */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="relative sm:col-span-2">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Buscar conteúdo específico (ex: Samuelson, Coase, Harberger, Downs, Ramsey...)"
                  value={buscaTopico}
                  onChange={(e) => setBuscaTopico(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-1 focus:ring-[#002752]"
                />
              </div>

              <select
                value={aulaFiltro ?? 'Todas'}
                onChange={(e) => setAulaFiltro(e.target.value === 'Todas' ? null : Number(e.target.value))}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:ring-1 focus:ring-[#002752]"
              >
                <option value="Todas">Todas as 12 Aulas do Plano de Ensino</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    Aula {n.toString().padStart(2, '0')} do Plano de Ensino
                  </option>
                ))}
              </select>
            </div>

            {/* Grid dos Cards de Tópicos / Conteúdos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 max-h-72 overflow-y-auto pr-1">
              {topicosDisponiveis.map((topico) => {
                const selecionado = todosOsTopicos || topicosSelecionados.includes(topico.id);
                return (
                  <div
                    key={topico.id}
                    onClick={() => alternarTopico(topico.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between text-xs ${
                      selecionado
                        ? 'border-[#002752] bg-blue-50/50 shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-500 opacity-60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-bold text-[#002752] bg-white px-2 py-0.5 rounded border border-slate-200">
                          U{topico.unidade} • Aula {topico.aulaNumero.toString().padStart(2, '0')}
                        </span>
                        {selecionado ? (
                          <CheckSquare className="w-4 h-4 text-[#00733f] shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                      </div>
                      <h5 className="font-bold text-slate-900 leading-tight">
                        {topico.nome}
                      </h5>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      {topico.descricao}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. PARÂMETROS DE EXECUÇÃO: DIFICULDADE, MODO, QUANTIDADE E TEMPO */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <label className="font-bold text-sm text-[#002752] flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#002752]" />
              3. Parâmetros de Complexidade & Formato:
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {/* Nível de Dificuldade */}
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Nível de Dificuldade</label>
                <select
                  value={dificuldadeFiltro}
                  onChange={(e) => setDificuldadeFiltro(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:ring-1 focus:ring-[#002752]"
                >
                  <option value="Todas">Todas (Distribuição Equilibrada)</option>
                  <option value="Baixa">Baixa (Definições e Vocabulário)</option>
                  <option value="Média-Baixa">Média-Baixa (Diferenciação)</option>
                  <option value="Média">Média (Aplicação Prática em Cenários)</option>
                  <option value="Média-Alta">Média-Alta (Modelos Analíticos)</option>
                  <option value="Alta">Alta (Teoremas Complexos e Derivações)</option>
                </select>
              </div>

              {/* Quantidade de Questões */}
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Quantidade de Questões</label>
                <select
                  value={quantidadeQuestoes}
                  onChange={(e) => setQuantidadeQuestoes(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:ring-1 focus:ring-[#002752]"
                >
                  <option value={5}>5 Questões (Simulado Rápido / Express)</option>
                  <option value={10}>10 Questões (Padrão de Autoavaliação)</option>
                  <option value={15}>15 Questões (Simulado Aprofundado)</option>
                  <option value={20}>20 Questões (Simulação de Prova Regimental)</option>
                  <option value={30}>30 Questões (Maratona de Revisão Geral)</option>
                </select>
              </div>

              {/* Tempo Limite */}
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Tempo Limite de Prova</label>
                <select
                  value={tempoInicialMinutos}
                  onChange={(e) => setTempoInicialMinutos(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:ring-1 focus:ring-[#002752]"
                >
                  <option value={10}>10 minutos (2 min/questão)</option>
                  <option value={15}>15 minutos</option>
                  <option value={20}>20 minutos (Recomendado)</option>
                  <option value={30}>30 minutos</option>
                  <option value={45}>45 minutos</option>
                  <option value={60}>60 minutos (1 hora)</option>
                  <option value={0}>Sem Limite de Tempo (Livre)</option>
                </select>
              </div>

              {/* Modo de Resolução */}
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Modo de Resolução</label>
                <select
                  value={modoEstudo ? 'estudo' : 'exame'}
                  onChange={(e) => setModoEstudo(e.target.value === 'estudo')}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:ring-1 focus:ring-[#002752]"
                >
                  <option value="estudo">Modo Estudo (Feedback Imediato)</option>
                  <option value="exame">Modo Simulado Oficial (Gabarito ao Final)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Dica descritiva do modo selecionado */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-[#002752] shrink-0 mt-0.5" />
            <div>
              {modoEstudo ? (
                <span>
                  <strong>Modo Estudo / Treino Interativo:</strong> Você receberá a justificativa teórica e a fundamentação bibliográfica imediatamente após marcar a alternativa de cada questão. Excelente para fixar conceitos e aprender durante a resolução.
                </span>
              ) : (
                <span>
                  <strong>Modo Simulado Oficial:</strong> Simula o ambiente real de avaliação da UEMA. O cronômetro corre sem revelar gabaritos até você submeter o teste completo, quando será gerado seu boletim de notas, diagnóstico de forças/fraquezas e o roteiro de estudos.
                </span>
              )}
            </div>
          </div>

          {/* Botão de Iniciar Simulado */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="text-xs text-slate-500">
              Pronto para iniciar? Seu resultado será salvo automaticamente em seu histórico discente.
            </div>

            <button
              onClick={iniciarSimulado}
              className="flex items-center gap-2 px-8 py-3.5 bg-[#002752] hover:bg-[#001c3d] text-white font-bold rounded-xl shadow-md transition-all hover:scale-102 cursor-pointer text-sm"
              id="btn-iniciar-simulado"
            >
              <Play className="w-4 h-4 text-[#ebc000]" />
              Iniciar Simulado Personalizado
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TELA 2: RESOLUÇÃO ATIVA DO SIMULADO */}
      {/* ========================================================= */}
      {simuladoIniciado && !simuladoFinalizado && questaoAtiva && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6" id="painel-resolucao-simulado">
          {/* Top Bar com Progresso e Indicadores */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 text-xs">
            <div className="flex items-center gap-3">
              <span className="font-bold text-[#002752] text-sm">
                Questão {indiceAtual + 1} de {questoesAtuais.length}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 font-medium">
                {Object.keys(respostas).length} de {questoesAtuais.length} respondidas
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full font-bold bg-blue-100 text-[#002752]">
                Unidade {questaoAtiva.unidade}
              </span>
              <span className="px-2.5 py-0.5 rounded-full font-bold bg-slate-100 text-slate-700">
                Aula {questaoAtiva.aula_relacionada}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full font-bold ${
                questaoAtiva.dificuldade === 'Baixa' ? 'bg-emerald-100 text-[#00733f]' :
                questaoAtiva.dificuldade === 'Média-Baixa' ? 'bg-teal-100 text-teal-800' :
                questaoAtiva.dificuldade === 'Média' ? 'bg-amber-100 text-amber-800' :
                questaoAtiva.dificuldade === 'Média-Alta' ? 'bg-orange-100 text-orange-800' :
                'bg-rose-100 text-rose-800'
              }`}>
                {questaoAtiva.dificuldade}
              </span>
            </div>
          </div>

          {/* Barra de Progresso Visual */}
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#002752] h-full transition-all duration-300"
              style={{ width: `${((indiceAtual + 1) / questoesAtuais.length) * 100}%` }}
            />
          </div>

          {/* Paleta rápida de navegação entre as questões */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {questoesAtuais.map((q, idx) => {
              const foiRespondida = respostas[q.id] !== undefined;
              const ehAtual = idx === indiceAtual;
              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setIndiceAtual(idx);
                    setMostrarGabaritoAtual(false);
                  }}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center justify-center ${
                    ehAtual
                      ? 'bg-[#002752] text-white ring-2 ring-[#ebc000]'
                      : foiRespondida
                        ? 'bg-emerald-100 text-[#00733f] border border-emerald-300'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                  title={`Ir para questão ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Identificação do Tópico da Questão */}
          {questaoAtiva.topico && (
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 w-fit">
              <Compass className="w-3.5 h-3.5 text-[#002752]" />
              Conteúdo Avaliado: <strong>{questaoAtiva.topico}</strong>
            </div>
          )}

          {/* Enunciado da Questão */}
          <div className="space-y-3">
            <h4 className="text-base sm:text-lg font-serif font-bold text-slate-900 leading-relaxed">
              {questaoAtiva.enunciado}
            </h4>
          </div>

          {/* Alternativas de Resposta */}
          <div className="space-y-2.5">
            {(['A', 'B', 'C', 'D', 'E'] as const).map((letra) => {
              const selecionada = respostaSelecionada === letra;
              const ehCorreta = questaoAtiva.resposta_correta === letra;
              const mostrarFeedback = mostrarGabaritoAtual && modoEstudo;

              let estiloCard = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';

              if (selecionada && !mostrarFeedback) {
                estiloCard = 'border-[#002752] bg-[#002752]/5 text-[#002752] font-semibold ring-2 ring-[#002752]/20';
              } else if (mostrarFeedback) {
                if (ehCorreta) {
                  estiloCard = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20';
                } else if (selecionada && !ehCorreta) {
                  estiloCard = 'border-rose-500 bg-rose-50 text-rose-950 font-medium ring-2 ring-rose-500/20';
                }
              }

              return (
                <button
                  key={letra}
                  type="button"
                  onClick={() => selecionarAlternativa(letra)}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3 text-xs sm:text-sm cursor-pointer ${estiloCard}`}
                >
                  <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 font-bold flex items-center justify-center shrink-0 text-slate-700">
                    {letra}
                  </span>
                  <span className="flex-1">{questaoAtiva.alternativas[letra]}</span>
                  {mostrarFeedback && ehCorreta && (
                    <CheckCircle2 className="w-5 h-5 text-[#00733f] shrink-0" />
                  )}
                  {mostrarFeedback && selecionada && !ehCorreta && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Seção de Feedback do Modo Estudo */}
          {mostrarGabaritoAtual && modoEstudo && (
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#002752]">
                <Sparkles className="w-4 h-4 text-[#ebc000]" />
                Justificativa Teórica & Bibliográfica:
              </div>
              <p className="text-slate-700 leading-relaxed">{questaoAtiva.justificativa}</p>
              {questaoAtiva.referencia_bibliografica && (
                <div className="pt-2 border-t border-amber-200/60 text-[11px] text-slate-500 italic">
                  Referência: {questaoAtiva.referencia_bibliografica}
                </div>
              )}
            </div>
          )}

          {/* Navegação Entre Questões */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <button
              onClick={questaoAnterior}
              disabled={indiceAtual === 0}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed font-medium cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Anterior
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={finalizarSimulado}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
              >
                Encerrar Simulado
              </button>

              <button
                onClick={proximaQuestao}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#002752] hover:bg-[#001c3d] text-white font-bold cursor-pointer shadow-xs"
              >
                {indiceAtual === questoesAtuais.length - 1 ? 'Submeter Respostas' : 'Próxima'}
                <ArrowRight className="w-4 h-4 text-[#ebc000]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TELA 3: RESULTADOS, DIAGNÓSTICO E ROTEIRO DE ESTUDOS */}
      {/* ========================================================= */}
      {simuladoFinalizado && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6" id="painel-resultados-simulado">
          {/* Header de Conclusão */}
          <div className="text-center space-y-2 border-b border-slate-100 pb-6">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-[#00733f]">
              Simulado Concluído com Sucesso
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#002752]">
              Relatório de Desempenho & Roteiro Pedagógico
            </h3>
            <p className="text-xs text-slate-600 max-w-xl mx-auto leading-relaxed">
              {salvoNoBanco ? (
                <span className="text-[#00733f] font-semibold flex items-center justify-center gap-1">
                  <Check className="w-4 h-4" />
                  Resultado persistido no histórico acadêmico discente e sincronizado com o painel do professor!
                </span>
              ) : (
                'Confira abaixo a análise detalhada dos seus pontos fortes e fracos por conteúdo e unidade, além do roteiro de estudos formativo.'
              )}
            </p>
          </div>

          {/* Cards de Métricas Principais */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-200 text-center">
              <span className="text-xs text-blue-800 uppercase font-semibold block">Nota Final</span>
              <span className="text-3xl font-black text-[#002752] mt-1 block">
                {analiseCompleta.nota.toFixed(1)}
              </span>
              <span className="text-[11px] text-slate-500">escala de 0 a 10</span>
            </div>

            <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 text-center">
              <span className="text-xs text-emerald-800 uppercase font-semibold block">Taxa de Acerto</span>
              <span className="text-3xl font-black text-[#00733f] mt-1 block">
                {analiseCompleta.taxaGeral.toFixed(0)}%
              </span>
              <span className="text-[11px] text-slate-500">
                {analiseCompleta.acertos} de {analiseCompleta.total} questões certas
              </span>
            </div>

            <div className="p-4 bg-purple-50/70 rounded-xl border border-purple-200 text-center">
              <span className="text-xs text-purple-800 uppercase font-semibold block">Tempo Gasto</span>
              <span className="text-2xl font-black text-purple-950 mt-1 block">
                {analiseCompleta.tempoGastoFormatado}
              </span>
              <span className="text-[11px] text-slate-500">
                méd: {(resultadoSimulado.tempoGastoSegundos / (analiseCompleta.total || 1)).toFixed(0)}s por questão
              </span>
            </div>

            <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 text-center">
              <span className="text-xs text-amber-800 uppercase font-semibold block">Diagnóstico Geral</span>
              <span className="text-lg font-black text-amber-900 mt-2 block">
                {analiseCompleta.nota >= 8 ? 'Excelente Domínio' : analiseCompleta.nota >= 6 ? 'Satisfatório' : 'Atenção Necessária'}
              </span>
            </div>
          </div>

          {/* Abas de Navegação dos Resultados */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pt-2 text-xs">
            <button
              onClick={() => setAbaResultado('diagnostico')}
              className={`px-4 py-2.5 font-bold rounded-t-xl transition-colors cursor-pointer flex items-center gap-2 ${
                abaResultado === 'diagnostico'
                  ? 'bg-[#002752] text-white border-b-2 border-[#ebc000]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-[#ebc000]" />
              Pontos Fortes & Fracos por Conteúdo
            </button>

            <button
              onClick={() => setAbaResultado('roteiro')}
              className={`px-4 py-2.5 font-bold rounded-t-xl transition-colors cursor-pointer flex items-center gap-2 ${
                abaResultado === 'roteiro'
                  ? 'bg-[#002752] text-white border-b-2 border-[#ebc000]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Compass className="w-4 h-4 text-[#ebc000]" />
              Roteiro de Estudos Personalizado
            </button>

            <button
              onClick={() => setAbaResultado('gabarito')}
              className={`px-4 py-2.5 font-bold rounded-t-xl transition-colors cursor-pointer flex items-center gap-2 ${
                abaResultado === 'gabarito'
                  ? 'bg-[#002752] text-white border-b-2 border-[#ebc000]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#ebc000]" />
              Caderno de Questões & Gabarito ({questoesAtuais.length})
            </button>
          </div>

          {/* ========================================== */}
          {/* ABA 1: DIAGNÓSTICO DE COMPETÊNCIAS (FORTES E FRACOS) */}
          {/* ========================================== */}
          {abaResultado === 'diagnostico' && (
            <div className="space-y-6">
              {/* Destaque Qualitativo: Pontos Fortes vs Pontos Fracos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Bloco de Pontos Fortes */}
                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#00733f]">
                    <Award className="w-5 h-5" />
                    Seus Pontos Fortes (Conceitos que Você Domina):
                  </div>
                  <div className="space-y-2 text-xs">
                    {analiseCompleta.pontosFortes.map((pf, i) => (
                      <div key={i} className="flex items-start gap-2 text-slate-700 bg-white p-2.5 rounded-lg border border-emerald-100">
                        <CheckCircle2 className="w-4 h-4 text-[#00733f] shrink-0 mt-0.5" />
                        <span>{pf}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bloco de Pontos Fracos / Oportunidades de Melhoria */}
                <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-sm text-rose-800">
                    <AlertTriangle className="w-5 h-5" />
                    Pontos Fracos & Lacunas a Superar:
                  </div>
                  <div className="space-y-2 text-xs">
                    {analiseCompleta.pontosFracos.map((pa, i) => (
                      <div key={i} className="flex items-start gap-2 text-slate-700 bg-white p-2.5 rounded-lg border border-rose-100">
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <span>{pa}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Desempenho por Unidade Curricular */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-[#002752] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#00733f]" />
                  Desempenho por Unidade Curricular Testada:
                </h4>

                <div className="space-y-2.5">
                  {analiseCompleta.diagnosticoUnidades.map((u) => (
                    <div key={u.unidade} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">
                          Unidade {u.unidade}: {u.nome}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 font-medium">
                            {u.acertos} de {u.total} acertos
                          </span>
                          <span className={`px-2 py-0.5 rounded-full font-bold ${
                            u.status === 'Consolidado' ? 'bg-emerald-100 text-[#00733f]' :
                            u.status === 'Atenção' ? 'bg-amber-100 text-amber-800' :
                            'bg-rose-100 text-rose-800'
                          }`}>
                            {u.taxa.toFixed(0)}% • {u.status}
                          </span>
                        </div>
                      </div>

                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            u.taxa >= 70 ? 'bg-[#00733f]' : u.taxa >= 50 ? 'bg-amber-500' : 'bg-rose-600'
                          }`}
                          style={{ width: `${u.taxa}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detalhamento por Conteúdo Específico */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-[#002752] flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-[#ebc000]" />
                  Diagnóstico por Conteúdo Específico Avaliado:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {analiseCompleta.diagnosticoConteudos.map((c, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-xl border text-xs flex flex-col justify-between space-y-2 ${
                        c.status === 'Forte' ? 'border-emerald-200 bg-emerald-50/30' :
                        c.status === 'Fraco' ? 'border-rose-200 bg-rose-50/30' :
                        'border-slate-200 bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-[#002752]">
                          [U{c.unidade} • Aula {c.aulaNumero.toString().padStart(2, '0')}] {c.topico}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                          c.status === 'Forte' ? 'bg-emerald-100 text-[#00733f]' :
                          c.status === 'Fraco' ? 'bg-rose-100 text-rose-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {c.taxa.toFixed(0)}% • {c.status === 'Forte' ? 'Ponto Forte' : c.status === 'Fraco' ? 'Lacuna' : 'Em Evolução'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        {c.descricao}
                      </p>
                      <div className="text-[10px] text-slate-400">
                        {c.acertos} acertos de {c.total} questão(ões) apresentada(s)
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* ABA 2: ROTEIRO DE ESTUDOS PERSONALIZADO */}
          {/* ========================================== */}
          {abaResultado === 'roteiro' && (
            <div className="space-y-6">
              <div className="bg-blue-50/80 p-4 rounded-xl border border-blue-200 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-[#002752] flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#ebc000]" />
                    Seu Plano de Ação Formativo Exclusivo
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Roteiro estruturado focado exclusivamente nos conteúdos em que você errou ou teve baixo índice de acerto.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={baixarRoteiroPDF}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#002752] hover:bg-[#001c3d] text-white rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer"
                    title="Baixar roteiro em formato PDF para imprimir ou salvar"
                  >
                    <FileDown className="w-4 h-4 text-[#ebc000]" />
                    Exportar Roteiro em PDF
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 text-[#002752] border border-slate-300 rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer"
                    title="Imprimir plano de estudos"
                  >
                    <Printer className="w-4 h-4" />
                    Imprimir Roteiro
                  </button>
                </div>
              </div>

              {/* Lista das Etapas do Roteiro */}
              <div className="space-y-4">
                {analiseCompleta.etapasRoteiro.map((et) => (
                  <div key={et.etapa} className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3 text-xs">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-sm text-[#002752] flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#002752] text-[#ebc000] font-black flex items-center justify-center text-xs shrink-0">
                          {et.etapa}
                        </span>
                        {et.titulo}
                      </span>
                    </div>

                    <div className="space-y-2 pl-8">
                      <p className="text-slate-800 leading-relaxed font-medium">
                        <strong>Ação Prática:</strong> {et.acao}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                        <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                          <span className="text-slate-500 block font-semibold">Aulas no AVA / Plataforma:</span>
                          <span className="text-[#002752] font-bold">{et.aulasRecomendadas}</span>
                          {onNavigateToLessons && et.aulasIds.length > 0 && (
                            <button
                              onClick={onNavigateToLessons}
                              className="mt-1 text-[11px] text-[#002752] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                            >
                              Abrir Módulo de Aulas <ExternalLink className="w-3 h-3" />
                            </button>
                          )}
                        </div>

                        <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                          <span className="text-slate-500 block font-semibold">Leituras & Bibliografia Recomendada:</span>
                          <span className="text-slate-700">{et.leituras}</span>
                          <a
                            href={GOOGLE_DRIVE_REPO}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 text-[11px] text-[#00733f] hover:underline font-semibold flex items-center gap-1"
                          >
                            Acessar Textos no Google Drive UEMA <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>

                      {et.simuladorRecomendado && (
                        <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-950 flex items-center justify-between">
                          <span>
                            <strong>Simulador Prático:</strong> {et.simuladorRecomendado}
                          </span>
                          {onNavigateToSimulators && (
                            <button
                              onClick={onNavigateToSimulators}
                              className="text-[11px] font-bold text-[#002752] hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              Ir para Simuladores <ChevronRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Botão de Atalho para Fazer Simulado Focado */}
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h5 className="font-bold text-sm text-[#00733f]">
                    Deseja testar sua recuperação agora?
                  </h5>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Gere um novo simulado parametrizado exclusivamente nas unidades e conteúdos onde você errou.
                  </p>
                </div>

                <button
                  onClick={iniciarSimuladoFocadoPontosFracos}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#00733f] hover:bg-[#005c32] text-white rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-[#ebc000]" />
                  Fazer Simulado Focado nos Pontos Fracos
                </button>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* ABA 3: GABARITO & QUESTÕES COMENTADAS */}
          {/* ========================================== */}
          {abaResultado === 'gabarito' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100">
                <h4 className="font-bold text-sm text-[#002752]">
                  Caderno de Questões Respondidas com Fundamentação:
                </h4>

                <button
                  onClick={() => {
                    exportarProvaParaPDF({
                      titulo: `Caderno de Prova & Gabarito - ${usuario?.nome || 'Discente'}`,
                      questoes: questoesAtuais,
                      unidadesSelecionadas: todasAsUnidades ? [1, 2, 3, 4, 5] : unidadesSelecionadas,
                      dificuldadeEscolhida: dificuldadeFiltro,
                      incluirGabarito: true,
                      incluirJustificativas: true,
                      professorNome: 'Prof. Dr. Ricardo Arvate'
                    });
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#002752] rounded-lg font-bold text-xs transition-colors cursor-pointer"
                >
                  <FileDown className="w-3.5 h-3.5 text-[#ebc000]" />
                  Exportar Caderno de Prova (PDF)
                </button>
              </div>

              <div className="space-y-4">
                {questoesAtuais.map((q, idx) => {
                  const resp = respostas[q.id];
                  const acertou = resp === q.resposta_correta;

                  return (
                    <div key={q.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">
                          Questão {idx + 1} ({q.id}) • Unidade {q.unidade} • Aula {q.aula_relacionada} ({q.dificuldade})
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                          acertou ? 'bg-emerald-100 text-[#00733f]' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {acertou ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                          {acertou ? 'Acertou' : 'Errou'}
                        </span>
                      </div>

                      {q.topico && (
                        <div className="text-[11px] font-semibold text-slate-500">
                          Tópico: {q.topico}
                        </div>
                      )}

                      <p className="text-slate-800 font-medium leading-relaxed">{q.enunciado}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        <div className="p-2 rounded bg-white border border-slate-200">
                          <span className="text-slate-500 block">Sua Escolha:</span>
                          <strong>({resp || 'Não respondida'})</strong> {resp ? q.alternativas[resp] : ''}
                        </div>
                        <div className="p-2 rounded bg-emerald-50 border border-emerald-200 text-emerald-950">
                          <span className="text-emerald-700 block font-semibold">Gabarito Oficial:</span>
                          <strong>({q.resposta_correta})</strong> {q.alternativas[q.resposta_correta]}
                        </div>
                      </div>

                      <div className="p-3 bg-white rounded-lg border border-slate-200 text-slate-600 space-y-1">
                        <div className="font-bold text-[#002752]">Justificativa Teórica:</div>
                        <p>{q.justificativa}</p>
                        {q.referencia_bibliografica && (
                          <div className="text-[10px] text-slate-500 italic mt-1">
                            Ref: {q.referencia_bibliografica}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Rodapé de Ações Finais */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-6 border-t border-slate-100">
            <button
              onClick={baixarRoteiroPDF}
              className="flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-50 text-[#002752] border border-slate-300 rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              <FileDown className="w-4 h-4 text-[#ebc000]" />
              Baixar Roteiro de Estudos (PDF)
            </button>

            <button
              onClick={reiniciar}
              className="flex items-center gap-2 px-7 py-3 bg-[#002752] hover:bg-[#001c3d] text-white rounded-xl font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-[#ebc000]" />
              Configurar Novo Simulado
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
