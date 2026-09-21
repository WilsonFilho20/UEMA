import React, { useState, useMemo, useEffect } from 'react';
import {
  Users,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  FileDown,
  Printer,
  FileText,
  Search,
  SlidersHorizontal,
  BrainCircuit,
  GraduationCap,
  ChevronRight,
  Sparkles,
  Zap,
  RotateCcw,
  History,
  Check,
  Save,
  HelpCircle,
  Filter,
  Eye,
  X,
  TrendingUp,
  BookCheck,
  Database,
  Trash2
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
import { QUESTOES_BANCO, DISTRIBUICAO_QUESTOES, GOOGLE_DRIVE_REPO } from '../data/questionsData';
import { BANCO_COMPLETO_1000_QUESTOES, TOPICOS_CATALOGO, TopicoInfo } from '../data/questionBankEngine';
import { UNIDADES_CURRICULARES } from '../data/unidadesData';
import { AlunoDesempenho, Dificuldade, Questao } from '../types';
import { UemaEconomiaLogo } from './UemaEconomiaLogo';
import { AcademicCalendarView } from './AcademicCalendarView';
import {
  firestoreDataService,
  RegistroSimuladoFirestore,
  ProvaElaboradaDocente,
  isAlunoTeste
} from '../services/firestoreDataService';
import { authService } from '../services/authService';
import { exportarProvaParaPDF } from '../utils/pdfExportService';
import { PedagogicalDashboardView } from './PedagogicalDashboardView';
import { ProfessorLessonsCatalog } from './ProfessorLessonsCatalog';
import { UnitPerformanceReportView } from './UnitPerformanceReportView';
import { DatabaseManagerView } from './DatabaseManagerView';

export const ProfessorDashboard: React.FC = () => {
  // Navigation tabs within Professor Dashboard
  const [abaDocente, setAbaDocente] = useState<'visao_geral' | 'relacao_aulas' | 'relatorios_unidades' | 'gestao_banco' | 'pedagogico' | 'calendario' | 'gerador' | 'alunos' | 'historico_provas'>('visao_geral');

  // Real data state from Firestore
  const [simuladosTurma, setSimuladosTurma] = useState<RegistroSimuladoFirestore[]>([]);
  const [provasSalvas, setProvasSalvas] = useState<ProvaElaboradaDocente[]>([]);
  const [carregandoDados, setCarregandoDados] = useState<boolean>(true);

  // State for student filtering
  const [buscaAluno, setBuscaAluno] = useState<string>('');
  const [filtroStatus, setFiltroStatus] = useState<string>('Todos');
  const [alunoSelecionado, setAlunoSelecionado] = useState<any | null>(null);

  // State for exam generator (Gerador de Provas Inteligente)
  const [provaTitulo, setProvaTitulo] = useState<string>('Avaliação Oficial - Teoria das Finanças Públicas (UEMA)');
  const [unidadesSelecionadas, setUnidadesSelecionadas] = useState<number[]>([1, 2]);
  const [topicosSelecionados, setTopicosSelecionados] = useState<string[]>([]);
  const [dificuldadeFiltro, setDificuldadeFiltro] = useState<'todas' | 'facil' | 'medio' | 'dificil'>('todas');
  const [modoDificuldade, setModoDificuldade] = useState<'adaptativo' | 'manual'>('adaptativo');
  const [provaDificuldadeManual, setProvaDificuldadeManual] = useState<Dificuldade | 'Mista'>('Mista');
  const [provaQtdQuestoes, setProvaQtdQuestoes] = useState<number>(10);
  const [focoTopicosDeficitarios, setFocoTopicosDeficitarios] = useState<boolean>(true);

  // Generated exam state & modals
  const [questoesGeradas, setQuestoesGeradas] = useState<Questao[]>([]);
  const [modalProvaAberta, setModalProvaAberta] = useState<boolean>(false);
  const [salvandoProva, setSalvandoProva] = useState<boolean>(false);
  const [provaSalvaSucesso, setProvaSalvaSucesso] = useState<boolean>(false);
  const [gerandoPDF, setGerandoPDF] = useState<boolean>(false);
  const [incluirGabaritoPDF, setIncluirGabaritoPDF] = useState<boolean>(true);
  const [incluirJustificativasPDF, setIncluirJustificativasPDF] = useState<boolean>(true);

  const usuarioLogado = authService.obterUsuarioAtual();

  // Carregar dados de simulados e provas do Firestore
  const recarregarDados = async () => {
    setCarregandoDados(true);
    try {
      const [listaSimulados, listaProvas] = await Promise.all([
        firestoreDataService.obterTodosSimulados(),
        firestoreDataService.obterProvasGeradas()
      ]);
      setSimuladosTurma(listaSimulados);
      setProvasSalvas(listaProvas);
    } catch (e) {
      console.error('Erro ao buscar dados do Firestore:', e);
    } finally {
      setCarregandoDados(false);
    }
  };

  useEffect(() => {
    recarregarDados();
  }, []);

  // Análise agregada do desempenho real dos alunos por Unidade
  const diagnosticoPorUnidade = useMemo(() => {
    const mapaUnidades: Record<number, { total: number; acertos: number; errosQuestoes: Record<string, number> }> = {
      1: { total: 0, acertos: 0, errosQuestoes: {} },
      2: { total: 0, acertos: 0, errosQuestoes: {} },
      3: { total: 0, acertos: 0, errosQuestoes: {} },
      4: { total: 0, acertos: 0, errosQuestoes: {} },
      5: { total: 0, acertos: 0, errosQuestoes: {} }
    };

    simuladosTurma.forEach((sim) => {
      // Contabilizar detalhes por unidade se houver
      if (sim.detalhesPorUnidade) {
        Object.entries(sim.detalhesPorUnidade).forEach(([unidStr, stats]) => {
          const uNum = Number(unidStr);
          const s = stats as { acertos: number; total: number };
          if (mapaUnidades[uNum] && s) {
            mapaUnidades[uNum].total += (s.total || 0);
            mapaUnidades[uNum].acertos += (s.acertos || 0);
          }
        });
      } else if (typeof sim.unidadeFiltro === 'number' && mapaUnidades[sim.unidadeFiltro]) {
        mapaUnidades[sim.unidadeFiltro].total += sim.total;
        mapaUnidades[sim.unidadeFiltro].acertos += sim.acertos;
      }

      // Mapear questões mais erradas
      if (sim.errosQuestoesIds && Array.isArray(sim.errosQuestoesIds)) {
        sim.errosQuestoesIds.forEach((qId) => {
          const questao = BANCO_COMPLETO_1000_QUESTOES.find((q) => q.id === qId) || QUESTOES_BANCO.find((q) => q.id === qId);
          if (questao && mapaUnidades[questao.unidade]) {
            mapaUnidades[questao.unidade].errosQuestoes[qId] =
              (mapaUnidades[questao.unidade].errosQuestoes[qId] || 0) + 1;
          }
        });
      }
    });

    return [1, 2, 3, 4, 5].map((uNum) => {
      const uInfo = UNIDADES_CURRICULARES.find((u) => u.numero === uNum);
      const dados = mapaUnidades[uNum];
      const taxa = dados.total > 0 ? Number(((dados.acertos / dados.total) * 100).toFixed(1)) : 70; // baseline 70% se vazio
      const media = Number(((taxa / 100) * 10).toFixed(1));

      // Identificar o tópico crítico
      let topicoCritico = 'Revisão conceitual geral da unidade';
      if (uNum === 1) topicoCritico = 'Funções de Musgrave & 1º Teorema do Bem-Estar (Aula 1 e 2)';
      if (uNum === 2) topicoCritico = 'Condição de Samuelson & Monopólio Natural P=CMg (Aula 3 e 4)';
      if (uNum === 3) topicoCritico = 'Axiomas de Arrow & Burocracia de Niskanen (Aula 9 e 10)';
      if (uNum === 4) topicoCritico = 'Peso Morto de Harberger & Regra de Ramsey (Aula 6 e 8)';
      if (uNum === 5) topicoCritico = 'Efeito Flypaper & Modelo de Tiebout (Aula 11 e 12)';

      return {
        numero: uNum,
        titulo: uInfo?.titulo || `Unidade ${uNum}`,
        totalResolucoes: dados.total,
        taxaAcerto: taxa,
        mediaNota: media,
        topicoCritico,
        questoesMaisErradas: Object.entries(dados.errosQuestoes)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([id]) => id)
      };
    });
  }, [simuladosTurma]);

  // Taxa média ponderada das unidades selecionadas
  const mediaDesempenhoSelecionadas = useMemo(() => {
    const unidadesFiltradas = diagnosticoPorUnidade.filter((u) => unidadesSelecionadas.includes(u.numero));
    if (unidadesFiltradas.length === 0) return 70;
    const soma = unidadesFiltradas.reduce((acc, u) => acc + u.taxaAcerto, 0);
    return Number((soma / unidadesFiltradas.length).toFixed(1));
  }, [diagnosticoPorUnidade, unidadesSelecionadas]);

  // Recomendação pedagógica do algoritmo adaptativo
  const recomendacaoPedagogica = useMemo(() => {
    const taxa = mediaDesempenhoSelecionadas;
    if (taxa < 55) {
      return {
        dificuldade: 'Baixa',
        dificuldadeLabel: 'Baixa / Média-Baixa (Reforço Diagnóstico)',
        motivo: `A taxa média de acerto da turma nos temas selecionados é de ${taxa}% (nível de alerta). Recomenda-se prova com ênfase em fixação conceitual, definições diretas e fundamentos teóricos para reestruturar as bases cognitivas da turma.`,
        pesoBaixa: 50,
        pesoMedia: 40,
        pesoAlta: 10
      };
    } else if (taxa < 75) {
      return {
        dificuldade: 'Média',
        dificuldadeLabel: 'Média Balanceada (Padrão Formativo)',
        motivo: `A taxa média da turma é de ${taxa}% (desempenho regular). O algoritmo equilibrou questões de diferenciação conceitual com cenários aplicados de finanças públicas brasileiras.`,
        pesoBaixa: 25,
        pesoMedia: 55,
        pesoAlta: 20
      };
    } else {
      return {
        dificuldade: 'Média-Alta',
        dificuldadeLabel: 'Média-Alta / Alta (Aprofundamento Avançado)',
        motivo: `A turma apresenta taxa de acerto consistente (${taxa}%). O instrumento avaliativo deve calibrar questões de maior rigor analítico (derivações, teoremas de Arrow, Harberger e modelos de equilíbrio geral).`,
        pesoBaixa: 10,
        pesoMedia: 45,
        pesoAlta: 45
      };
    }
  }, [mediaDesempenhoSelecionadas]);

  // Toggle seleção de unidades
  const toggleUnidade = (unidadeNum: number) => {
    setUnidadesSelecionadas((prev) => {
      let novaSelecao: number[];
      if (prev.includes(unidadeNum)) {
        if (prev.length === 1) return prev; // mínimo 1 selecionada
        novaSelecao = prev.filter((u) => u !== unidadeNum);
      } else {
        novaSelecao = [...prev, unidadeNum].sort((a, b) => a - b);
      }
      // Limpar tópicos que não pertencem mais às unidades ativas
      setTopicosSelecionados((prevTop) => {
        const topicosPermitidos = TOPICOS_CATALOGO.filter((t) => novaSelecao.includes(t.unidade)).map((t) => t.id);
        return prevTop.filter((id) => topicosPermitidos.includes(id));
      });
      return novaSelecao;
    });
  };

  // Toggle seleção de tópicos específicos
  const toggleTopico = (topicoId: string) => {
    setTopicosSelecionados((prev) => {
      if (prev.includes(topicoId)) {
        return prev.filter((id) => id !== topicoId);
      } else {
        return [...prev, topicoId];
      }
    });
  };

  // Tópicos disponíveis com base nas unidades selecionadas
  const topicosDisponiveis = useMemo(() => {
    return TOPICOS_CATALOGO.filter((t) => unidadesSelecionadas.includes(t.unidade));
  }, [unidadesSelecionadas]);

  // Gerador de Provas Inteligente (Filtro no banco de 1.000 questões, temas e desempenho dos alunos)
  const gerarProvaAdaptativa = () => {
    // 1. Filtrar pelo banco de 1.000 questões pelas unidades ativas
    let pool = BANCO_COMPLETO_1000_QUESTOES.filter((q) => unidadesSelecionadas.includes(q.unidade));

    // 2. Se houver tópicos específicos selecionados, restringir aos tópicos
    if (topicosSelecionados.length > 0) {
      const topicosNomes = TOPICOS_CATALOGO.filter((t) => topicosSelecionados.includes(t.id)).map((t) => t.nome);
      pool = pool.filter((q) => topicosNomes.includes(q.topico));
    }

    // 3. Filtrar por Nível de Dificuldade selecionado
    if (dificuldadeFiltro === 'facil') {
      pool = pool.filter((q) => q.dificuldade === 'Baixa' || q.dificuldade === 'Média-Baixa');
    } else if (dificuldadeFiltro === 'medio') {
      pool = pool.filter((q) => q.dificuldade === 'Média');
    } else if (dificuldadeFiltro === 'dificil') {
      pool = pool.filter((q) => q.dificuldade === 'Média-Alta' || q.dificuldade === 'Alta');
    }

    // Fallback de segurança se o pool filtrado for menor que a quantidade requisitada
    if (pool.length < provaQtdQuestoes) {
      const fallbackPool = BANCO_COMPLETO_1000_QUESTOES.filter((q) => unidadesSelecionadas.includes(q.unidade));
      const poolIds = new Set(pool.map((q) => q.id));
      const complementares = fallbackPool.filter((q) => !poolIds.has(q.id));
      pool = [...pool, ...complementares];
    }

    let selecionadas: Questao[] = [];

    if (modoDificuldade === 'adaptativo') {
      // Ponderar pela média de desempenho da turma nos temas selecionados
      const questoesCriticasIds = diagnosticoPorUnidade
        .filter((u) => unidadesSelecionadas.includes(u.numero))
        .flatMap((u) => u.questoesMaisErradas);

      const questoesPrioritarias = pool.filter((q) => questoesCriticasIds.includes(q.id));
      const poolRestante = pool.filter((q) => !questoesCriticasIds.includes(q.id));

      if (dificuldadeFiltro === 'todas') {
        // Calibrar por cotas da recomendação pedagógica conforme a taxa de acerto da turma
        const qtdBaixa = Math.round((provaQtdQuestoes * recomendacaoPedagogica.pesoBaixa) / 100);
        const qtdMedia = Math.round((provaQtdQuestoes * recomendacaoPedagogica.pesoMedia) / 100);
        const qtdAlta = Math.max(1, provaQtdQuestoes - qtdBaixa - qtdMedia);

        const poolBaixas = pool.filter((q) => q.dificuldade === 'Baixa' || q.dificuldade === 'Média-Baixa').sort(() => 0.5 - Math.random());
        const poolMedias = pool.filter((q) => q.dificuldade === 'Média').sort(() => 0.5 - Math.random());
        const poolAltas = pool.filter((q) => q.dificuldade === 'Média-Alta' || q.dificuldade === 'Alta').sort(() => 0.5 - Math.random());

        const parte1 = poolBaixas.slice(0, qtdBaixa);
        const parte2 = poolMedias.slice(0, qtdMedia);
        const parte3 = poolAltas.slice(0, qtdAlta);

        selecionadas = [...parte1, ...parte2, ...parte3];
      } else {
        // Se a dificuldade foi explicitamente escolhida (fácil, médio ou difícil),
        // ordenar o pool priorizando os tópicos com menor média de desempenho
        const poolOrdenado = [...questoesPrioritarias.sort(() => 0.5 - Math.random()), ...poolRestante.sort(() => 0.5 - Math.random())];
        selecionadas = poolOrdenado.slice(0, provaQtdQuestoes);
      }

      // Se faltar para completar a quantidade desejada, preencher com pool restante
      if (selecionadas.length < provaQtdQuestoes) {
        const idsJaEscolhidos = new Set(selecionadas.map((q) => q.id));
        const restantes = pool.filter((q) => !idsJaEscolhidos.has(q.id)).sort(() => 0.5 - Math.random());
        selecionadas = [...selecionadas, ...restantes.slice(0, provaQtdQuestoes - selecionadas.length)];
      }
    } else {
      // Modo manual clássico
      if (provaDificuldadeManual !== 'Mista') {
        const poolFiltrado = pool.filter((q) => q.dificuldade === provaDificuldadeManual);
        if (poolFiltrado.length >= provaQtdQuestoes) {
          pool = poolFiltrado;
        }
      }
      selecionadas = pool.sort(() => 0.5 - Math.random()).slice(0, provaQtdQuestoes);
    }

    setQuestoesGeradas(selecionadas);
    setProvaSalvaSucesso(false);
    setModalProvaAberta(true);
  };

  // Salvar a prova gerada no Firestore
  const salvarProvaNoBanco = async () => {
    if (!usuarioLogado || questoesGeradas.length === 0) return;
    setSalvandoProva(true);
    try {
      await firestoreDataService.salvarProvaGerada({
        titulo: provaTitulo,
        professorId: usuarioLogado.uid,
        unidadesSelecionadas,
        dificuldadeEscolhida: modoDificuldade === 'adaptativo' ? recomendacaoPedagogica.dificuldadeLabel : provaDificuldadeManual,
        qtdQuestoes: questoesGeradas.length,
        criadaEm: new Date().toLocaleDateString('pt-BR'),
        timestamp: Date.now(),
        questoes: questoesGeradas,
        ajusteAutomaticoDificuldade: {
          motivo: recomendacaoPedagogica.motivo,
          taxaAcertoTurma: mediaDesempenhoSelecionadas,
          dificuldadeSugerida: recomendacaoPedagogica.dificuldade
        }
      });
      setProvaSalvaSucesso(true);
      recarregarDados();
    } catch (e) {
      console.error('Erro ao salvar prova:', e);
    } finally {
      setSalvandoProva(false);
    }
  };

  // Lista agregada de alunos cadastrados e participantes
  const listaAlunosDinamica = useMemo(() => {
    const mapaAlunos: Record<string, {
      id: string;
      nome: string;
      matricula: string;
      totalSimulados: number;
      questoesRespondidas: number;
      acertos: number;
      notas: number[];
      ultimoSimulado: string;
      historicoSimulados: RegistroSimuladoFirestore[];
      detalhesPorUnidade: Record<number, { acertos: number; total: number }>;
    }> = {};

    simuladosTurma.forEach((s) => {
      if (!mapaAlunos[s.alunoId]) {
        mapaAlunos[s.alunoId] = {
          id: s.alunoId,
          nome: s.alunoNome || 'Estudante',
          matricula: s.alunoMatricula || '—',
          totalSimulados: 0,
          questoesRespondidas: 0,
          acertos: 0,
          notas: [],
          ultimoSimulado: s.data,
          historicoSimulados: [],
          detalhesPorUnidade: {
            1: { acertos: 0, total: 0 },
            2: { acertos: 0, total: 0 },
            3: { acertos: 0, total: 0 },
            4: { acertos: 0, total: 0 },
            5: { acertos: 0, total: 0 }
          }
        };
      }
      mapaAlunos[s.alunoId].totalSimulados++;
      mapaAlunos[s.alunoId].questoesRespondidas += s.total;
      mapaAlunos[s.alunoId].acertos += s.acertos;
      mapaAlunos[s.alunoId].notas.push(s.nota);
      mapaAlunos[s.alunoId].historicoSimulados.push(s);

      if (s.detalhesPorUnidade) {
        Object.entries(s.detalhesPorUnidade).forEach(([uStr, val]) => {
          const uNum = Number(uStr);
          const v = val as { acertos?: number; total?: number } | undefined;
          if (mapaAlunos[s.alunoId].detalhesPorUnidade[uNum] && v) {
            mapaAlunos[s.alunoId].detalhesPorUnidade[uNum].acertos += (v.acertos || 0);
            mapaAlunos[s.alunoId].detalhesPorUnidade[uNum].total += (v.total || 0);
          }
        });
      }
    });

    const lista = Object.values(mapaAlunos).map((aluno) => {
      const media = aluno.notas.length > 0
        ? Number((aluno.notas.reduce((a, b) => a + b, 0) / aluno.notas.length).toFixed(1))
        : 0;
      const taxa = aluno.questoesRespondidas > 0
        ? Number(((aluno.acertos / aluno.questoesRespondidas) * 100).toFixed(1))
        : 0;

      let status = 'Estável';
      if (media < 6 || taxa < 60) status = 'Crítico';
      else if (media < 7.5 || taxa < 70) status = 'Atenção';

      return {
        ...aluno,
        mediaSimulados: media,
        taxaAcerto: taxa,
        statusRisco: status
      };
    });

    return lista.filter((a) => {
      const matchBusca =
        a.nome.toLowerCase().includes(buscaAluno.toLowerCase()) ||
        a.matricula.toLowerCase().includes(buscaAluno.toLowerCase());
      const matchStatus = filtroStatus === 'Todos' || a.statusRisco === filtroStatus;
      return matchBusca && matchStatus;
    });
  }, [simuladosTurma, buscaAluno, filtroStatus]);

  const imprimirProva = () => {
    window.print();
  };

  const exportarProvaPDF = () => {
    if (questoesGeradas.length === 0) return;
    setGerandoPDF(true);
    try {
      const rotuloDificuldade =
        dificuldadeFiltro === 'facil'
          ? 'Fácil (Baixa / Média-Baixa)'
          : dificuldadeFiltro === 'medio'
          ? 'Média (Aplicação Formativa)'
          : dificuldadeFiltro === 'dificil'
          ? 'Difícil (Média-Alta / Alta)'
          : modoDificuldade === 'adaptativo'
          ? recomendacaoPedagogica.dificuldadeLabel
          : provaDificuldadeManual;

      exportarProvaParaPDF({
        titulo: provaTitulo,
        questoes: questoesGeradas,
        unidadesSelecionadas,
        dificuldadeEscolhida: rotuloDificuldade,
        incluirGabarito: incluirGabaritoPDF,
        incluirJustificativas: incluirJustificativasPDF,
        professorNome: usuarioLogado?.nome || 'Prof. Dr. Ricardo Arvate'
      });
    } catch (e) {
      console.error('Erro ao gerar PDF da prova:', e);
    } finally {
      setGerandoPDF(false);
    }
  };

  const exportarProvaJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(questoesGeradas, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `prova_financas_uema_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
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
            Acompanhamento de alunos em tempo real no banco de dados, telemetria de simulados e gerador adaptativo de provas que ajusta o nível de dificuldade com base nos pontos fracos da turma.
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
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            abaDocente === 'visao_geral'
              ? 'bg-[#002752] text-white shadow-xs'
              : 'text-slate-700 hover:bg-white/70'
          }`}
        >
          <BarChart className="w-4 h-4" />
          Visão Geral & Indicadores
        </button>

        <button
          onClick={() => setAbaDocente('relacao_aulas')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            abaDocente === 'relacao_aulas'
              ? 'bg-[#002752] text-white shadow-xs'
              : 'text-slate-700 hover:bg-white/70'
          }`}
        >
          <BookOpen className="w-4 h-4 text-[#ebc000]" />
          Relação Detalhada de Aulas (12)
        </button>

        <button
          onClick={() => setAbaDocente('relatorios_unidades')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            abaDocente === 'relatorios_unidades'
              ? 'bg-[#002752] text-white shadow-xs ring-2 ring-[#ebc000]'
              : 'text-slate-700 hover:bg-white/70'
          }`}
        >
          <FileText className="w-4 h-4 text-[#ebc000]" />
          Relatórios por Unidade (1 a 5)
        </button>

        <button
          onClick={() => setAbaDocente('gestao_banco')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            abaDocente === 'gestao_banco'
              ? 'bg-[#002752] text-white shadow-xs ring-2 ring-rose-500'
              : 'text-slate-700 hover:bg-white/70'
          }`}
        >
          <Database className="w-4 h-4 text-rose-500" />
          Gerenciar Banco & Testes
          {simuladosTurma.some((s) => isAlunoTeste(s.alunoId, s.alunoNome, s.alunoMatricula)) && (
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" title="Alunos de teste detectados no banco" />
          )}
        </button>

        <button
          onClick={() => setAbaDocente('pedagogico')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            abaDocente === 'pedagogico'
              ? 'bg-[#002752] text-white shadow-xs'
              : 'text-slate-700 hover:bg-white/70'
          }`}
        >
          <BrainCircuit className="w-4 h-4 text-[#ebc000]" />
          Dashboard Pedagógico & Perfis dos Alunos
        </button>

        <button
          onClick={() => setAbaDocente('gerador')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            abaDocente === 'gerador'
              ? 'bg-[#002752] text-white shadow-xs'
              : 'text-slate-700 hover:bg-white/70'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#ebc000]" />
          Gerador de Provas Adaptativo (Banco de 2.000 Questões)
        </button>

        <button
          onClick={() => setAbaDocente('calendario')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            abaDocente === 'calendario'
              ? 'bg-[#002752] text-white shadow-xs'
              : 'text-slate-700 hover:bg-white/70'
          }`}
        >
          <Calendar className="w-4 h-4 text-[#ebc000]" />
          Calendário & Cronograma Oficial (13/08 a 03/12)
        </button>

        <button
          onClick={() => setAbaDocente('alunos')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            abaDocente === 'alunos'
              ? 'bg-[#002752] text-white shadow-xs'
              : 'text-slate-700 hover:bg-white/70'
          }`}
        >
          <Users className="w-4 h-4" />
          Discentes Conectados ({listaAlunosDinamica.length})
        </button>

        <button
          onClick={() => setAbaDocente('historico_provas')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            abaDocente === 'historico_provas'
              ? 'bg-[#002752] text-white shadow-xs'
              : 'text-slate-700 hover:bg-white/70'
          }`}
        >
          <History className="w-4 h-4" />
          Provas Elaboradas Salvas ({provasSalvas.length})
        </button>
      </div>

      {/* Relatórios de Desempenho por Unidade Curricular */}
      {abaDocente === 'relatorios_unidades' && (
        <UnitPerformanceReportView
          simulados={simuladosTurma}
          professorNome={usuarioLogado?.nome || 'Prof. Dr. Docente UEMA'}
          turmaNome="Ciências Econômicas — UEMA"
        />
      )}

      {/* Gerenciamento do Banco de Dados & Remoção de Alunos de Teste */}
      {abaDocente === 'gestao_banco' && (
        <DatabaseManagerView
          simulados={simuladosTurma}
          onDataChanged={recarregarDados}
        />
      )}

      {/* Dashboard Pedagógico & Perfis */}
      {abaDocente === 'pedagogico' && (
        <PedagogicalDashboardView modo="docente" />
      )}

      {/* Calendário Docente */}
      {abaDocente === 'calendario' && (
        <AcademicCalendarView
          modo="docente"
          onNavigateToQuiz={() => {
            setAbaDocente('gerador');
          }}
        />
      )}

      {/* Relação Completa de Aulas Detalhadas por Conteúdo */}
      {abaDocente === 'relacao_aulas' && (
        <ProfessorLessonsCatalog
          simuladosTurma={simuladosTurma}
          onCriarProvaParaAula={(aulaNum, unidadeNum) => {
            setUnidadesSelecionadas([unidadeNum]);
            setProvaTitulo(`Avaliação Oficial - Aula ${aulaNum.toString().padStart(2, '0')}: Finanças Públicas (UEMA)`);
            setAbaDocente('gerador');
          }}
        />
      )}

      {/* Visão Geral & Indicadores */}
      {abaDocente === 'visao_geral' && (
        <div className="space-y-6">
          {/* Alerta de Banco de Dados Vazio / Conexão */}
          {simuladosTurma.length === 0 ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#00733f] shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Banco de Dados de Produção Limpo & Pronto para os Alunos</strong>
                <p className="mt-0.5 text-emerald-800">
                  Os dados fictícios foram removidos. À medida que os alunos criarem seus cadastros e resolverem os simulados com o cronômetro, a telemetria será calculada instantaneamente aqui e no calibrador de avaliações.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-[#002752] flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#00733f]" />
                <strong>{simuladosTurma.length} simulados</strong> submetidos por alunos registrados no Firestore.
              </span>
              <button
                onClick={recarregarDados}
                className="px-3 py-1 bg-white hover:bg-slate-100 border border-blue-200 rounded-lg text-xs font-semibold"
              >
                Atualizar Dados
              </button>
            </div>
          )}

          {/* Diagnóstico de Tópicos Críticos por Unidade */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-[#002752] flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-[#ebc000]" />
                  Diagnóstico da Turma: Desempenho por Unidade Curricular (Ementa 60h)
                </h3>
                <p className="text-xs text-slate-600">
                  Indicadores utilizados pelo Gerador Adaptativo para sugerir o nível de rigor pedagógico ideal da prova.
                </p>
              </div>
              <button
                onClick={() => setAbaDocente('gerador')}
                className="px-4 py-2 bg-[#002752] text-white text-xs font-bold rounded-xl hover:bg-[#001c3d] flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-[#ebc000]" />
                Elaborar Prova Baseada Nesse Diagnóstico
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {diagnosticoPorUnidade.map((u) => (
                <div
                  key={u.numero}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-[#002752] bg-white px-2 py-0.5 rounded border border-slate-200">
                        Unidade {u.numero}
                      </span>
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        u.taxaAcerto >= 75 ? 'bg-emerald-100 text-emerald-800' :
                        u.taxaAcerto >= 60 ? 'bg-amber-100 text-amber-900' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {u.taxaAcerto}%
                      </span>
                    </div>

                    <h4 className="font-bold text-xs text-slate-900 mt-2 line-clamp-2">{u.titulo}</h4>

                    {/* Progress */}
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-2">
                      <div
                        className={`h-full rounded-full ${
                          u.taxaAcerto >= 75 ? 'bg-[#00733f]' : u.taxaAcerto >= 60 ? 'bg-[#ebc000]' : 'bg-rose-500'
                        }`}
                        style={{ width: `${u.taxaAcerto}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-600 space-y-1">
                    <span className="text-slate-400 block font-semibold">Tópico mais desafiador:</span>
                    <p className="font-medium text-slate-800 leading-tight">{u.topicoCritico}</p>
                    <button
                      onClick={() => setAbaDocente('relatorios_unidades')}
                      className="w-full mt-2 py-1 px-2 bg-[#002752] hover:bg-[#001c3d] text-white rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <FileText className="w-3 h-3 text-[#ebc000]" />
                      Relatório Oficial U{u.numero} →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Aba: GERADOR DE PROVAS INTELIGENTE (Banco de 1.000 questões, temas específicos, dificuldade e desempenho dos alunos) */}
      {abaDocente === 'gerador' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-[#00733f]">
                  Algoritmo Pedagógico Adaptativo
                </span>
                <span className="text-xs font-bold text-[#002752] bg-[#ebc000]/20 px-2 py-0.5 rounded-full">
                  ⚡ Banco de 1.000 Questões
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#002752] mt-1 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#ebc000]" />
                Gerador de Provas Inteligente
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-3xl">
                Selecione os temas específicos do curso e o nível de dificuldade desejado (fácil, médio ou difícil). O sistema filtra o banco de 1.000 questões calibrando com a média de desempenho real da turma em cada tema para montar um instrumento avaliativo preciso com prévia instantânea.
              </p>
            </div>

            <button
              onClick={gerarProvaAdaptativa}
              className="flex items-center gap-2 px-6 py-3 bg-[#002752] hover:bg-[#001c3d] text-white rounded-xl text-xs font-bold shadow-md transition-transform hover:scale-105 cursor-pointer"
            >
              <GraduationCap className="w-5 h-5 text-[#ebc000]" />
              Gerar Avaliação Agora
            </button>
          </div>

          {/* Passo 1: Selecionar Unidades e Temas Específicos */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-[#00733f]" />
                Passo 1: Selecione as Unidades e Temas Específicos:
              </label>
              <span className="text-xs text-slate-500">
                {unidadesSelecionadas.length} de 5 unidades ativas
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {UNIDADES_CURRICULARES.map((unid) => {
                const selecionada = unidadesSelecionadas.includes(unid.numero);
                const diag = diagnosticoPorUnidade.find((d) => d.numero === unid.numero);

                return (
                  <div
                    key={unid.numero}
                    onClick={() => toggleUnidade(unid.numero)}
                    className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer select-none ${
                      selecionada
                        ? 'border-[#002752] bg-[#002752]/5 text-[#002752] shadow-xs'
                        : 'border-slate-200 bg-slate-50/60 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-white border border-slate-200">
                        Unidade {unid.numero} ({unid.cargaHoraria})
                      </span>
                      <div className={`w-4 h-4 rounded-md flex items-center justify-center ${
                        selecionada ? 'bg-[#002752] text-white' : 'border border-slate-300 bg-white'
                      }`}>
                        {selecionada && <Check className="w-3 h-3" />}
                      </div>
                    </div>

                    <h5 className="font-bold text-xs leading-snug line-clamp-2">{unid.titulo}</h5>

                    <div className="mt-2 pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Acerto da turma:</span>
                      <strong className={`font-mono ${
                        (diag?.taxaAcerto || 70) >= 75 ? 'text-[#00733f]' :
                        (diag?.taxaAcerto || 70) >= 60 ? 'text-amber-800' : 'text-rose-700'
                      }`}>
                        {diag?.taxaAcerto || 70}%
                      </strong>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sub-seleção de Temas Específicos das Unidades Selecionadas */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#002752] flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#ebc000]" />
                  Filtro Fino por Temas Específicos ({topicosSelecionados.length > 0 ? `${topicosSelecionados.length} selecionado(s)` : 'Todos os temas incluídos'}):
                </span>
                <div className="flex items-center gap-2 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setTopicosSelecionados([])}
                    className="text-slate-600 hover:text-[#002752] font-semibold cursor-pointer underline"
                  >
                    Marcar Todos os Temas
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {topicosDisponiveis.map((top) => {
                  const isChecked = topicosSelecionados.includes(top.id);
                  return (
                    <button
                      key={top.id}
                      type="button"
                      onClick={() => toggleTopico(top.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                        isChecked
                          ? 'bg-[#002752] text-white border-[#002752] shadow-xs'
                          : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${isChecked ? 'bg-[#ebc000]' : 'bg-slate-300'}`} />
                      <span>{top.nome}</span>
                      <span className="text-[10px] opacity-75 font-normal">(Aula {top.aulaNumero})</span>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-slate-500">
                {topicosSelecionados.length === 0
                  ? 'Todos os tópicos das unidades ativas estão no radar de seleção.'
                  : `A busca no banco de 1.000 questões focará estritamente nos ${topicosSelecionados.length} temas marcados acima.`}
              </p>
            </div>
          </div>

          {/* Passo 2: Nível de Dificuldade & Desempenho da Turma */}
          <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-600" />
                <h4 className="font-bold text-sm text-slate-900">
                  Passo 2: Nível de Dificuldade & Integração com Média de Desempenho da Turma
                </h4>
              </div>

              {/* Seletor do Nível de Dificuldade: Fácil, Médio, Difícil ou Automático */}
              <div className="flex flex-wrap gap-1 bg-white p-1 rounded-xl border border-amber-200 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => {
                    setDificuldadeFiltro('todas');
                    setModoDificuldade('adaptativo');
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    dificuldadeFiltro === 'todas'
                      ? 'bg-[#002752] text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ⚡ Calibrado pela Média ({mediaDesempenhoSelecionadas}%)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDificuldadeFiltro('facil');
                    setModoDificuldade('adaptativo');
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    dificuldadeFiltro === 'facil'
                      ? 'bg-emerald-700 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Fácil (Fixação Conceitual)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDificuldadeFiltro('medio');
                    setModoDificuldade('adaptativo');
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    dificuldadeFiltro === 'medio'
                      ? 'bg-amber-600 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Médio (Aplicação e Cenários)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDificuldadeFiltro('dificil');
                    setModoDificuldade('adaptativo');
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    dificuldadeFiltro === 'dificil'
                      ? 'bg-rose-700 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Difícil (Modelos e Derivações)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-8 bg-white p-4 rounded-xl border border-amber-200 space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-600">Desempenho Médio da Turma nos Temas Escolhidos:</span>
                  <span className={`px-2.5 py-0.5 rounded-full font-bold font-mono text-xs ${
                    mediaDesempenhoSelecionadas >= 75 ? 'bg-emerald-100 text-emerald-900' :
                    mediaDesempenhoSelecionadas >= 60 ? 'bg-amber-100 text-amber-900' : 'bg-rose-100 text-rose-900'
                  }`}>
                    Taxa de Acerto: {mediaDesempenhoSelecionadas}%
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {dificuldadeFiltro === 'todas'
                    ? recomendacaoPedagogica.motivo
                    : dificuldadeFiltro === 'facil'
                    ? 'Filtro FÁCIL selecionado: O sistema selecionará questões de complexidade baixa e média-baixa do banco de 1.000 questões, priorizando os temas em que a turma apresentou maior índice de erro no diagnóstico dos simulados.'
                    : dificuldadeFiltro === 'medio'
                    ? 'Filtro MÉDIO selecionado: O sistema selecionará questões de complexidade média do banco de 1.000 questões, cobrindo cenários aplicados e problemas estruturados de finanças públicas.'
                    : 'Filtro DIFÍCIL selecionado: O sistema selecionará questões de complexidade média-alta e alta (padrão ANPEC/Pós-graduação), com ênfase em deduções matemáticas, teorema de Samuelson e modelos de incidência.'}
                </p>
                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-4 text-[11px] text-slate-600">
                  <span>Banco Total: <strong>1.000 Questões</strong></span>
                  <span>Unidades no Filtro: <strong>{unidadesSelecionadas.join(', ')}</strong></span>
                  <span>Filtro de Dificuldade: <strong className="capitalize">{dificuldadeFiltro === 'todas' ? 'Calibração Adaptativa' : dificuldadeFiltro}</strong></span>
                </div>
              </div>

              <div className="lg:col-span-4 bg-[#002752] text-white p-4 rounded-xl flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#ebc000] block">
                    Nível Avaliativo Definido
                  </span>
                  <h5 className="text-base font-black mt-1">
                    {dificuldadeFiltro === 'todas'
                      ? recomendacaoPedagogica.dificuldadeLabel
                      : dificuldadeFiltro === 'facil'
                      ? 'Nível Fácil (Reforço Conceitual)'
                      : dificuldadeFiltro === 'medio'
                      ? 'Nível Médio (Equilíbrio Formativo)'
                      : 'Nível Difícil (Rigor Teórico & Modelagem)'}
                  </h5>
                </div>
                <p className="text-[11px] text-slate-300 mt-2">
                  A prova será extraída imediatamente do banco e exibida na prévia interativa antes de ser exportada em PDF oficial.
                </p>
              </div>
            </div>
          </div>

          {/* Passo 3: Configurações Gerais da Prova */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Título / Cabeçalho da Prova:</label>
              <input
                type="text"
                value={provaTitulo}
                onChange={(e) => setProvaTitulo(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Qtd de Questões:</label>
              <select
                value={provaQtdQuestoes}
                onChange={(e) => setProvaQtdQuestoes(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium"
              >
                <option value={5}>5 Questões (Simulado Rápido)</option>
                <option value={10}>10 Questões (Avaliação Parcial)</option>
                <option value={15}>15 Questões (Prova Completa)</option>
                <option value={20}>20 Questões (Exame Semestral)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Aba: Discentes Conectados */}
      {abaDocente === 'alunos' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-base text-[#002752] flex items-center gap-2">
                <Users className="w-5 h-5 text-[#00733f]" />
                Acompanhamento Individual dos Alunos
              </h3>
              <p className="text-xs text-slate-600">
                Discentes cadastrados que realizaram simulados na plataforma.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar por nome ou matrícula..."
                  value={buscaAluno}
                  onChange={(e) => setBuscaAluno(e.target.value)}
                  className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden w-56"
                />
              </div>

              <select
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
                className="py-1.5 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg"
              >
                <option value="Todos">Todos os Status</option>
                <option value="Estável">Estável</option>
                <option value="Atenção">Atenção</option>
                <option value="Crítico">Crítico</option>
              </select>
            </div>
          </div>

          {listaAlunosDinamica.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500 space-y-2">
              <Users className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="font-semibold text-slate-700">Nenhum aluno realizou simulado até o momento.</p>
              <p className="text-slate-400">
                Os dados aparecerão aqui em tempo real assim que os estudantes fizerem login e submeterem suas respostas.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {simuladosTurma.some((s) => isAlunoTeste(s.alunoId, s.alunoNome, s.alunoMatricula)) && (
                <div className="m-4 p-3 bg-amber-50 rounded-xl border border-amber-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-amber-900 font-medium">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      Existem contas ou submissões demonstrativas (teste) na base. Você pode excluí-las com 1 clique para consolidar apenas dados oficiais da UEMA.
                    </span>
                  </div>
                  <button
                    onClick={() => setAbaDocente('gestao_banco')}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <Database className="w-3.5 h-3.5" />
                    Ir para Gestão do Banco
                  </button>
                </div>
              )}
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Estudante / Matrícula</th>
                    <th className="py-3 px-4">Simulados Feitos</th>
                    <th className="py-3 px-4">Questões Respondidas</th>
                    <th className="py-3 px-4">Média de Notas</th>
                    <th className="py-3 px-4">Taxa de Acerto</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-center">Perfil Pedagógico</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {listaAlunosDinamica.map((aluno) => {
                    const ehTeste = isAlunoTeste(aluno.id, aluno.nome, aluno.matricula);
                    return (
                      <tr key={aluno.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 block">{aluno.nome}</span>
                            {ehTeste && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                                Teste
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] font-mono text-slate-500">{aluno.matricula}</span>
                        </td>
                        <td className="py-3 px-4 text-slate-700 font-semibold">{aluno.totalSimulados}</td>
                        <td className="py-3 px-4 text-slate-600">{aluno.questoesRespondidas}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded font-black font-mono ${
                            aluno.mediaSimulados >= 7 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                          }`}>
                            {aluno.mediaSimulados.toFixed(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-slate-800">{aluno.taxaAcerto}%</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            aluno.statusRisco === 'Estável' ? 'bg-emerald-100 text-emerald-800' :
                            aluno.statusRisco === 'Atenção' ? 'bg-amber-100 text-amber-900' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {aluno.statusRisco}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => setAlunoSelecionado(aluno)}
                            className="px-3 py-1.5 bg-[#002752] text-white hover:bg-[#001c3d] rounded-lg text-xs font-bold flex items-center gap-1.5 mx-auto transition-transform hover:scale-105 cursor-pointer shadow-xs"
                            title="Abrir Diagnóstico Individual do Aluno"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#ebc000]" />
                            Ver Perfil
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Aba: Histórico de Provas Salvas */}
      {abaDocente === 'historico_provas' && (
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-base text-[#002752] flex items-center gap-2">
                <History className="w-5 h-5 text-[#ebc000]" />
                Provas & Avaliações Elaboradas (Salvas no Firestore)
              </h3>
              <p className="text-xs text-slate-600">
                Instrumentos avaliativos gerados pelo professor para impressão ou aplicação.
              </p>
            </div>

            <button
              onClick={() => setAbaDocente('gerador')}
              className="px-3.5 py-1.5 bg-[#002752] text-white rounded-lg text-xs font-semibold hover:bg-[#001c3d]"
            >
              Nova Prova
            </button>
          </div>

          {provasSalvas.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500 space-y-2">
              <GraduationCap className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="font-semibold text-slate-700">Nenhuma prova salva até o momento.</p>
              <p className="text-slate-400">
                Gere uma nova prova na aba "Elaborar Prova Adaptativa" e clique em "Salvar no Banco de Dados".
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {provasSalvas.map((p, idx) => (
                <div key={p.id || idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-slate-500">
                      {p.criadaEm}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#002752] text-white">
                      {p.qtdQuestoes} Questões
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-[#002752]">{p.titulo}</h4>

                  <div className="text-xs text-slate-600 space-y-1">
                    <div>
                      <strong>Unidades:</strong>{' '}
                      {p.unidadesSelecionadas?.map((u) => `U${u}`).join(', ') || 'Todas'}
                    </div>
                    <div>
                      <strong>Calibração:</strong> {p.dificuldadeEscolhida}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setQuestoesGeradas(p.questoes);
                      setProvaTitulo(p.titulo);
                      setModalProvaAberta(true);
                      setProvaSalvaSucesso(true);
                    }}
                    className="w-full py-2 bg-white hover:bg-slate-100 border border-slate-300 text-[#002752] font-semibold rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <FileDown className="w-3.5 h-3.5 text-[#ebc000]" />
                    Visualizar / Exportar Prova em PDF
                  </button>
                </div>
              ))}
            </div>
          )}
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
                    {questoesGeradas.length} questões calibradas segundo o desempenho da turma
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={exportarProvaPDF}
                  disabled={gerandoPDF}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#002752] hover:bg-[#001c3d] text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-60"
                  title="Baixar a prova em formato PDF A4 institucional UEMA"
                >
                  <FileDown className="w-4 h-4 text-[#ebc000]" />
                  {gerandoPDF ? 'Gerando PDF...' : 'Baixar Prova em PDF'}
                </button>
                <button
                  onClick={imprimirProva}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium cursor-pointer"
                  title="Imprimir diretamente no navegador"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Imprimir
                </button>
                <button
                  onClick={exportarProvaJSON}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-xs font-medium cursor-pointer"
                  title="Exportar dados das questões em formato JSON"
                >
                  <FileText className="w-3.5 h-3.5" />
                  JSON
                </button>
                <button
                  onClick={salvarProvaNoBanco}
                  disabled={salvandoProva || provaSalvaSucesso}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00733f] text-white hover:bg-emerald-700 disabled:opacity-60 rounded-lg text-xs font-medium cursor-pointer"
                >
                  {salvandoProva ? (
                    'Salvando...'
                  ) : provaSalvaSucesso ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Salva no Banco
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" /> Salvar Prova
                    </>
                  )}
                </button>
                <button
                  onClick={() => setModalProvaAberta(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Opções de Configuração da Exportação PDF */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="font-semibold text-[#002752] flex items-center gap-1.5">
                <FileDown className="w-4 h-4 text-[#00733f]" />
                Opções para o PDF Institucional (A4 formatado):
              </span>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1.5 text-slate-700 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={incluirGabaritoPDF}
                    onChange={(e) => setIncluirGabaritoPDF(e.target.checked)}
                    className="rounded text-[#002752] focus:ring-0"
                  />
                  Incluir Folha de Gabarito
                </label>
                <label className="flex items-center gap-1.5 text-slate-700 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={incluirJustificativasPDF}
                    disabled={!incluirGabaritoPDF}
                    onChange={(e) => setIncluirJustificativasPDF(e.target.checked)}
                    className="rounded text-[#002752] focus:ring-0 disabled:opacity-50"
                  />
                  Incluir Fundamentação Teórica e Citações
                </label>
              </div>
            </div>

            {/* Questions list */}
            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
              {questoesGeradas.map((q, idx) => (
                <div key={q.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#002752]">
                      Questão {idx + 1} ({q.id}) • Unidade {q.unidade} • Aula {q.aula_relacionada}
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
                className="px-4 py-2 bg-[#002752] text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Concluir Visualização
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Perfil Pedagógico Individual do Aluno */}
      {alunoSelecionado && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200">
            {/* Cabeçalho */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-[#002752] text-white rounded-t-2xl">
              <div>
                <span className="text-[11px] font-bold text-[#ebc000] uppercase tracking-wider block">
                  Perfil Pedagógico & Desempenho Individual
                </span>
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#ebc000]" />
                  {alunoSelecionado.nome}
                </h3>
                <span className="text-xs text-slate-300 font-mono">
                  Matrícula: {alunoSelecionado.matricula} • ID: {alunoSelecionado.id}
                </span>
              </div>
              <button
                onClick={() => setAlunoSelecionado(null)}
                className="p-1.5 hover:bg-white/20 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conteúdo com Scroll */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Cards de Métricas Principais */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-semibold text-slate-500 block">Média de Notas</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className={`text-2xl font-black font-mono ${
                      alunoSelecionado.mediaSimulados >= 7 ? 'text-emerald-700' : 'text-amber-700'
                    }`}>
                      {alunoSelecionado.mediaSimulados.toFixed(1)}
                    </span>
                    <span className="text-xs text-slate-400">/ 10</span>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-semibold text-slate-500 block">Taxa de Acerto</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-black font-mono text-[#002752]">
                      {alunoSelecionado.taxaAcerto}%
                    </span>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-semibold text-slate-500 block">Simulados Feitos</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-black font-mono text-slate-800">
                      {alunoSelecionado.totalSimulados}
                    </span>
                    <span className="text-xs text-slate-400">({alunoSelecionado.questoesRespondidas} questões)</span>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-semibold text-slate-500 block">Status de Risco</span>
                  <div className="mt-1">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                      alunoSelecionado.statusRisco === 'Estável'
                        ? 'bg-emerald-100 text-emerald-800'
                        : alunoSelecionado.statusRisco === 'Atenção'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {alunoSelecionado.statusRisco}
                    </span>
                  </div>
                </div>
              </div>

              {/* Diagnóstico por Unidade Curricular */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-[#002752] flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-[#00733f]" />
                  Domínio por Unidade Curricular (Ementa de 60h)
                </h4>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((uNum) => {
                    const uInfo = UNIDADES_CURRICULARES.find((u) => u.numero === uNum);
                    const stats = alunoSelecionado.detalhesPorUnidade?.[uNum] || { acertos: 0, total: 0 };
                    const taxaU = stats.total > 0 ? Math.round((stats.acertos / stats.total) * 100) : 0;
                    return (
                      <div key={uNum} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-800">
                            Unidade {uNum}: {uInfo?.titulo}
                          </span>
                          <span className="font-mono font-bold text-slate-600">
                            {stats.acertos}/{stats.total} acertos ({taxaU}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all rounded-full ${
                              taxaU >= 75 ? 'bg-emerald-600' : taxaU >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${stats.total > 0 ? taxaU : 0}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Histórico dos Simulados Submetidos */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-[#002752] flex items-center gap-2">
                  <History className="w-4 h-4 text-[#ebc000]" />
                  Histórico de Sessões de Estudo & Simulados
                </h4>
                {(!alunoSelecionado.historicoSimulados || alunoSelecionado.historicoSimulados.length === 0) ? (
                  <p className="text-xs text-slate-500 italic">Nenhum simulado detalhado registrado ainda.</p>
                ) : (
                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
                    {alunoSelecionado.historicoSimulados.map((sim: any, sIdx: number) => (
                      <div key={sIdx} className="p-3 bg-white hover:bg-slate-50 flex items-center justify-between gap-4">
                        <div>
                          <div className="font-bold text-slate-800 flex items-center gap-2">
                            <span>Sessão {sIdx + 1}</span>
                            <span className="text-[10px] text-slate-400 font-normal">
                              ({sim.data || new Date(sim.timestamp).toLocaleDateString('pt-BR')})
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-500">
                            Unidade: {sim.unidadeFiltro === 'Todas' ? 'Geral (Todas)' : `Unidade ${sim.unidadeFiltro}`} • Dificuldade: {sim.dificuldade || 'Mista'}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-0.5 rounded font-black font-mono ${
                            sim.nota >= 7 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                          }`}>
                            Nota: {Number(sim.nota).toFixed(1)}
                          </span>
                          <span className="text-[11px] text-slate-500 block font-mono">
                            {sim.acertos}/{sim.total} acertos
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Rodapé */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between rounded-b-2xl">
              <span className="text-xs text-slate-500">
                Última atividade: {alunoSelecionado.ultimoSimulado || 'Hoje'}
              </span>
              <button
                onClick={() => setAlunoSelecionado(null)}
                className="px-4 py-2 bg-[#002752] text-white hover:bg-[#001c3d] rounded-xl text-xs font-bold cursor-pointer transition-colors"
              >
                Fechar Perfil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
