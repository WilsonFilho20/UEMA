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
  FileDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUESTOES_BANCO, DISTRIBUICAO_QUESTOES, GOOGLE_DRIVE_REPO } from '../data/questionsData';
import { Dificuldade, Questao, ResultadoSimulado } from '../types';
import { UemaEconomiaLogo } from './UemaEconomiaLogo';
import { authService } from '../services/authService';
import { firestoreDataService } from '../services/firestoreDataService';
import { exportarProvaParaPDF } from '../utils/pdfExportService';

export const SimuladoComponent: React.FC = () => {
  // Setup state
  const [dificuldadeFiltro, setDificuldadeFiltro] = useState<Dificuldade | 'Todas'>('Todas');
  const [unidadeFiltro, setUnidadeFiltro] = useState<number | 'Todas'>('Todas');
  const [modoEstudo, setModoEstudo] = useState<boolean>(true); // Immediate feedback vs exam mode
  const [quantidadeQuestoes, setQuantidadeQuestoes] = useState<number>(5);
  const [tempoInicialMinutos, setTempoInicialMinutos] = useState<number>(15);

  // Active quiz state
  const [simuladoIniciado, setSimuladoIniciado] = useState<boolean>(false);
  const [simuladoFinalizado, setSimuladoFinalizado] = useState<boolean>(false);
  const [questoesAtuais, setQuestoesAtuais] = useState<Questao[]>([]);
  const [indiceAtual, setIndiceAtual] = useState<number>(0);
  const [respostas, setRespostas] = useState<Record<string, 'A' | 'B' | 'C' | 'D' | 'E'>>({});
  const [mostrarGabaritoAtual, setMostrarGabaritoAtual] = useState<boolean>(false);
  const [salvoNoBanco, setSalvoNoBanco] = useState<boolean>(false);

  // Timer state
  const [segundosRestantes, setSegundosRestantes] = useState<number>(15 * 60);
  const [timerAtivo, setTimerAtivo] = useState<boolean>(false);
  const timerRef = useRef<any>(null);

  // Obter usuário logado atual
  const usuario = authService.obterUsuarioAtual();

  // Filter and build question list
  const iniciarSimulado = () => {
    let pool = [...QUESTOES_BANCO];

    if (dificuldadeFiltro !== 'Todas') {
      pool = pool.filter((q) => q.dificuldade === dificuldadeFiltro);
    }

    if (unidadeFiltro !== 'Todas') {
      pool = pool.filter((q) => q.unidade === Number(unidadeFiltro));
    }

    // Embaralhar
    const selecionadas = pool.sort(() => 0.5 - Math.random()).slice(0, quantidadeQuestoes);

    setQuestoesAtuais(selecionadas);
    setIndiceAtual(0);
    setRespostas({});
    setMostrarGabaritoAtual(false);
    setSimuladoFinalizado(false);
    setSimuladoIniciado(true);
    setSegundosRestantes(tempoInicialMinutos * 60);
    setTimerAtivo(true);
    setSalvoNoBanco(false);
  };

  // Timer tick
  useEffect(() => {
    if (timerAtivo && segundosRestantes > 0 && !simuladoFinalizado) {
      timerRef.current = setTimeout(() => {
        setSegundosRestantes((prev) => prev - 1);
      }, 1000);
    } else if (segundosRestantes === 0 && simuladoIniciado && !simuladoFinalizado) {
      finalizarSimulado();
    }

    return () => clearTimeout(timerRef.current);
  }, [timerAtivo, segundosRestantes, simuladoIniciado, simuladoFinalizado]);

  // Formatação do tempo MM:SS
  const formatarTempo = (seg: number) => {
    const min = Math.floor(seg / 60);
    const s = seg % 60;
    return `${min.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

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

  // Estatísticas do resultado final
  const resultado: ResultadoSimulado = useMemo(() => {
    let acertos = 0;
    const porUnidade: Record<number, { acertos: number; total: number }> = {
      1: { acertos: 0, total: 0 },
      2: { acertos: 0, total: 0 },
      3: { acertos: 0, total: 0 },
      4: { acertos: 0, total: 0 },
      5: { acertos: 0, total: 0 }
    };

    questoesAtuais.forEach((q) => {
      if (!porUnidade[q.unidade]) {
        porUnidade[q.unidade] = { acertos: 0, total: 0 };
      }
      porUnidade[q.unidade].total++;

      if (respostas[q.id] === q.resposta_correta) {
        acertos++;
        porUnidade[q.unidade].acertos++;
      }
    });

    const total = questoesAtuais.length || 1;
    const nota = (acertos / total) * 10;
    const tempoGasto = tempoInicialMinutos * 60 - segundosRestantes;

    return {
      id: `sim_${Date.now()}`,
      data: new Date().toLocaleDateString('pt-BR'),
      respostas,
      acertos,
      total: questoesAtuais.length,
      nota,
      tempoGastoSegundos: Math.max(0, tempoGasto),
      dificuldade: dificuldadeFiltro,
      detalhesPorUnidade: porUnidade
    };
  }, [questoesAtuais, respostas, segundosRestantes, tempoInicialMinutos, dificuldadeFiltro]);

  const finalizarSimulado = () => {
    setSimuladoFinalizado(true);
    setTimerAtivo(false);

    // Calcular acertos
    let acertos = 0;
    const errosIds: string[] = [];
    questoesAtuais.forEach((q) => {
      if (respostas[q.id] === q.resposta_correta) {
        acertos++;
      } else {
        errosIds.push(q.id);
      }
    });

    const percentual = (acertos / (questoesAtuais.length || 1)) * 100;
    if (percentual >= 70) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }

    // Persistir no Firestore
    if (usuario) {
      firestoreDataService
        .salvarResultadoSimulado({
          alunoId: usuario.uid,
          alunoNome: usuario.nome,
          alunoMatricula: usuario.matriculaOuSiape,
          resultado,
          unidadeFiltro: unidadeFiltro,
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

  const reiniciar = () => {
    setSimuladoIniciado(false);
    setSimuladoFinalizado(false);
    setRespostas({});
    setQuestoesAtuais([]);
    setSalvoNoBanco(false);
  };

  const questaoAtiva = questoesAtuais[indiceAtual];
  const respostaSelecionada = questaoAtiva ? respostas[questaoAtiva.id] : undefined;
  const respondeuAtual = respostaSelecionada !== undefined;

  return (
    <div className="space-y-6" id="interface-simulado">
      {/* Header Banner */}
      <div className="bg-[#002752] text-white p-6 rounded-2xl shadow-sm border-b-4 border-[#ebc000] flex flex-wrap items-center justify-between gap-6">
        <div className="flex-1 min-w-[280px]">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ebc000] text-[#002752] uppercase tracking-wider">
              Ambiente de Treinamento e Simulação
            </span>
            <span className="text-xs text-slate-300">
              Banco de 1.000 Questões com Gabarito Comentado • UEMA
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight">
            Simulado de Finanças Públicas
          </h2>
          <p className="text-sm text-slate-200 mt-1 max-w-2xl">
            Pratique os conceitos teóricos de Musgrave, Coase, Arrow, Niskanen e Harberger com cronômetro ativo e persistência automática no seu perfil e painel docente.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-2 bg-white/10 rounded-xl border border-white/20 hidden lg:block">
            <UemaEconomiaLogo variant="compact" color="white" className="h-10" />
          </div>

          {simuladoIniciado && !simuladoFinalizado && (
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xs px-4 py-2 rounded-xl border border-white/20">
              <Clock className={`w-5 h-5 ${segundosRestantes < 180 ? 'text-rose-400 animate-pulse' : 'text-[#ebc000]'}`} />
              <div className="text-right">
                <span className="text-[10px] text-slate-300 uppercase block font-semibold">Tempo Restante</span>
                <span className={`text-xl font-black font-mono ${segundosRestantes < 180 ? 'text-rose-300' : 'text-white'}`}>
                  {formatarTempo(segundosRestantes)}
                </span>
              </div>
              <button
                onClick={() => setTimerAtivo(!timerAtivo)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title={timerAtivo ? 'Pausar Cronômetro' : 'Retomar Cronômetro'}
              >
                {timerAtivo ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Screen 1: Configuração do Simulado */}
      {!simuladoIniciado && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div>
            <h3 className="text-lg font-bold text-[#002752] flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#ebc000]" />
              Configurar Sessão de Estudo
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Defina os parâmetros de temas e complexidade para a resolução.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* Seletor de Dificuldade */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-[#002752]" />
                Nível de Dificuldade
              </label>
              <select
                value={dificuldadeFiltro}
                onChange={(e) => setDificuldadeFiltro(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:ring-1 focus:ring-[#002752]"
              >
                <option value="Todas">Todas (Distribuição Padrão da Matriz)</option>
                <option value="Baixa">Baixa (20% - Definições Diretas)</option>
                <option value="Média-Baixa">Média-Baixa (25% - Diferenciação)</option>
                <option value="Média">Média (30% - Aplicação em Cenários)</option>
                <option value="Média-Alta">Média-Alta (15% - Modelos Econômicos)</option>
                <option value="Alta">Alta (10% - Teoremas Complexos)</option>
              </select>
            </div>

            {/* Seletor de Unidade */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-[#00733f]" />
                Unidade Curricular
              </label>
              <select
                value={unidadeFiltro}
                onChange={(e) => setUnidadeFiltro(e.target.value === 'Todas' ? 'Todas' : Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:ring-1 focus:ring-[#002752]"
              >
                <option value="Todas">Todas as Unidades (Ementa Completa 60h)</option>
                <option value="1">Unidade 1: O Papel do Estado na Economia (10h)</option>
                <option value="2">Unidade 2: Falhas de Mercado e a Função Alocativa (10h)</option>
                <option value="3">Unidade 3: Teoria da Escolha Pública (12h)</option>
                <option value="4">Unidade 4: Princípios Teóricos da Tributação (16h)</option>
                <option value="5">Unidade 5: Introdução ao Federalismo Fiscal (12h)</option>
              </select>
            </div>

            {/* Quantidade */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Qtd de Questões</label>
              <select
                value={quantidadeQuestoes}
                onChange={(e) => setQuantidadeQuestoes(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium"
              >
                <option value={5}>5 Questões (Express)</option>
                <option value={10}>10 Questões (Padrão)</option>
                <option value={15}>15 Questões (Simulado Real)</option>
              </select>
            </div>

            {/* Tempo */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Tempo Limite</label>
              <select
                value={tempoInicialMinutos}
                onChange={(e) => setTempoInicialMinutos(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium"
              >
                <option value={10}>10 minutos</option>
                <option value={15}>15 minutos</option>
                <option value={20}>20 minutos</option>
                <option value={30}>30 minutos</option>
              </select>
            </div>
          </div>

          {/* Toggle Modo Estudo vs Exame */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="modoEstudoToggle"
                checked={modoEstudo}
                onChange={(e) => setModoEstudo(e.target.checked)}
                className="rounded border-slate-300 text-[#002752] focus:ring-[#002752] w-4 h-4 cursor-pointer"
              />
              <label htmlFor="modoEstudoToggle" className="text-slate-700 font-medium cursor-pointer">
                <strong>Modo Feedback Imediato:</strong> Ver justificativa e gabarito logo após responder cada questão.
              </label>
            </div>

            <button
              onClick={iniciarSimulado}
              className="flex items-center gap-2 px-6 py-3 bg-[#002752] hover:bg-[#001c3d] text-white font-bold rounded-xl shadow-md transition-transform hover:scale-105 cursor-pointer text-xs"
            >
              <Play className="w-4 h-4 text-[#ebc000]" />
              Iniciar Simulado Agora
            </button>
          </div>

          {/* Matriz de Dificuldade Informativa */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-xs font-bold text-[#002752] block mb-2">
              Distribuição Oficial do Banco de 1.000 Questões da UEMA:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
              {DISTRIBUICAO_QUESTOES.map((d, i) => (
                <div key={i} className="p-2 bg-white rounded-lg border border-slate-200 shadow-2xs">
                  <span className="text-[11px] text-slate-500 block">{d.nivel}</span>
                  <span className="text-sm font-black text-[#002752]">{d.percentual}%</span>
                  <span className="text-[10px] text-slate-400 block">{d.percentual * 10} questões</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Screen 2: Simulado Ativo */}
      {simuladoIniciado && !simuladoFinalizado && questaoAtiva && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          {/* Progress bar and badges */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-[#002752]">
                Questão {indiceAtual + 1} de {questoesAtuais.length}
              </span>
              <span>
                Respondidas: <strong>{Object.keys(respostas).length}</strong> / {questoesAtuais.length}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#002752] rounded-full transition-all duration-300"
                style={{ width: `${((indiceAtual + 1) / questoesAtuais.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question metadata tag */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-full font-bold bg-[#002752]/10 text-[#002752]">
              Código: {questaoAtiva.id}
            </span>
            <span className="px-2.5 py-1 rounded-full font-medium bg-emerald-50 text-[#00733f] border border-emerald-200">
              Unidade {questaoAtiva.unidade} • Aula {questaoAtiva.aula_relacionada}
            </span>
            <span className={`px-2.5 py-1 rounded-full font-semibold ${
              questaoAtiva.dificuldade === 'Baixa' ? 'bg-emerald-100 text-emerald-800' :
              questaoAtiva.dificuldade === 'Média-Baixa' ? 'bg-teal-100 text-teal-800' :
              questaoAtiva.dificuldade === 'Média' ? 'bg-amber-100 text-amber-800' :
              questaoAtiva.dificuldade === 'Média-Alta' ? 'bg-orange-100 text-orange-800' :
              'bg-rose-100 text-rose-800'
            }`}>
              Dificuldade: {questaoAtiva.dificuldade}
            </span>
          </div>

          {/* Question Prompt */}
          <div className="space-y-3">
            <h4 className="text-base sm:text-lg font-serif font-bold text-slate-900 leading-relaxed">
              {questaoAtiva.enunciado}
            </h4>
          </div>

          {/* Alternatives */}
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

          {/* Feedback section if study mode and answered */}
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

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
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
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#002752] hover:bg-[#001c3d] text-white font-bold cursor-pointer"
              >
                {indiceAtual === questoesAtuais.length - 1 ? 'Finalizar' : 'Próxima'}
                <ArrowRight className="w-4 h-4 text-[#ebc000]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Screen 3: Resultado do Simulado Concluído */}
      {simuladoFinalizado && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="text-center space-y-2 border-b border-slate-100 pb-6">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-[#00733f]">
              Simulado Concluído com Sucesso
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#002752]">
              Relatório de Desempenho
            </h3>
            <p className="text-xs text-slate-600 max-w-lg mx-auto">
              {salvoNoBanco ? (
                <span className="text-[#00733f] font-semibold flex items-center justify-center gap-1">
                  <Check className="w-4 h-4" />
                  Resultado persistido no banco de dados da disciplina e sincronizado com o painel do professor!
                </span>
              ) : (
                'Confira os detalhes das questões respondidas e seu gabarito comentado.'
              )}
            </p>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 text-center">
              <span className="text-xs text-blue-800 uppercase font-semibold block">Nota Final</span>
              <span className="text-3xl font-black text-[#002752] mt-1 block">
                {resultado.nota.toFixed(1)}
              </span>
              <span className="text-[11px] text-slate-500">escala de 0 a 10</span>
            </div>

            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
              <span className="text-xs text-emerald-800 uppercase font-semibold block">Total de Acertos</span>
              <span className="text-3xl font-black text-[#00733f] mt-1 block">
                {resultado.acertos} / {resultado.total}
              </span>
              <span className="text-[11px] text-slate-500">
                {((resultado.acertos / (resultado.total || 1)) * 100).toFixed(0)}% de acerto
              </span>
            </div>

            <div className="p-4 bg-purple-50 rounded-xl border border-purple-200 text-center">
              <span className="text-xs text-purple-800 uppercase font-semibold block">Tempo Decorrido</span>
              <span className="text-2xl font-black text-purple-950 mt-1 block">
                {formatarTempo(resultado.tempoGastoSegundos)}
              </span>
              <span className="text-[11px] text-slate-500">
                méd: {(resultado.tempoGastoSegundos / (resultado.total || 1)).toFixed(0)}s / questão
              </span>
            </div>

            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-center">
              <span className="text-xs text-amber-800 uppercase font-semibold block">Diagnóstico</span>
              <span className="text-lg font-black text-amber-900 mt-2 block">
                {resultado.nota >= 8 ? 'Excelente' : resultado.nota >= 6 ? 'Satisfatório' : 'Necessita Revisão'}
              </span>
            </div>
          </div>

          {/* Detailed Question Review */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h4 className="font-bold text-sm text-[#002752]">
              Revisão de Todas as Questões com Gabarito e Citações:
            </h4>

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

                    <p className="text-slate-800 font-medium">{q.enunciado}</p>

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

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={() => {
                exportarProvaParaPDF({
                  titulo: `Simulado de Revisão - ${usuario?.nome || 'Discente'}`,
                  questoes: questoesAtuais,
                  unidadesSelecionadas: unidadeFiltro !== 'Todas' ? [Number(unidadeFiltro)] : [],
                  dificuldadeEscolhida: dificuldadeFiltro,
                  incluirGabarito: true,
                  incluirJustificativas: true,
                  professorNome: 'Prof. Dr. Ricardo Arvate'
                });
              }}
              className="flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-50 text-[#002752] border border-slate-300 rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer"
              title="Baixar a prova do simulado e seu gabarito em PDF"
            >
              <FileDown className="w-4 h-4 text-[#ebc000]" />
              Exportar Prova em PDF
            </button>

            <button
              onClick={reiniciar}
              className="flex items-center gap-2 px-6 py-3 bg-[#002752] hover:bg-[#001c3d] text-white rounded-xl font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-[#ebc000]" />
              Fazer Novo Simulado
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
