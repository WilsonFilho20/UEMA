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
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUESTOES_BANCO, DISTRIBUICAO_QUESTOES, GOOGLE_DRIVE_REPO } from '../data/questionsData';
import { Dificuldade, Questao, ResultadoSimulado } from '../types';
import { UemaEconomiaLogo } from './UemaEconomiaLogo';

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

  // Timer state
  const [segundosRestantes, setSegundosRestantes] = useState<number>(15 * 60);
  const [timerAtivo, setTimerAtivo] = useState<boolean>(false);
  const timerRef = useRef<any>(null);

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

  const finalizarSimulado = () => {
    setSimuladoFinalizado(true);
    setTimerAtivo(false);

    // Calcular nota
    let acertos = 0;
    questoesAtuais.forEach((q) => {
      if (respostas[q.id] === q.resposta_correta) {
        acertos++;
      }
    });

    const percentual = (acertos / questoesAtuais.length) * 100;
    if (percentual >= 70) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  const reiniciar = () => {
    setSimuladoIniciado(false);
    setSimuladoFinalizado(false);
    setRespostas({});
    setQuestoesAtuais([]);
  };

  // Estatísticas do resultado final
  const resultado: ResultadoSimulado = useMemo(() => {
    let acertos = 0;
    const porUnidade: Record<number, { acertos: number; total: number }> = {
      1: { acertos: 0, total: 0 },
      2: { acertos: 0, total: 0 },
      3: { acertos: 0, total: 0 }
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
              Ambiente de Simulação e Treinamento
            </span>
            <span className="text-xs text-slate-300">
              Banco de 1.000 Questões com Gabarito Comentado • UEMA
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight">
            Simulado Interativo de Finanças Públicas
          </h2>
          <p className="text-sm text-slate-200 mt-1 max-w-2xl">
            Pratique os conceitos teóricos de Musgrave, Coase, Arrow, Niskanen e Harberger com cronômetro ativo e justificativas referenciadas nas obras do Google Drive.
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
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
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
              Defina o filtro de complexidade e o modo de resolução desejado.
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
                <option value={10}>10 Minutos (2 min / questão)</option>
                <option value={15}>15 Minutos (3 min / questão)</option>
                <option value={30}>30 Minutos (Ritmo Livre)</option>
              </select>
            </div>
          </div>

          {/* Modo de Resolução */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <button
              onClick={() => setModoEstudo(true)}
              className={`p-3.5 rounded-lg border text-left transition-all ${
                modoEstudo
                  ? 'border-[#002752] bg-white ring-2 ring-[#002752]/20 font-bold text-[#002752]'
                  : 'border-slate-200 bg-white/60 text-slate-600'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1 font-semibold text-sm">
                <Sparkles className="w-4 h-4 text-[#ebc000]" />
                Modo Estudo Guiado (Recomendado)
              </div>
              <p className="text-[11px] font-normal text-slate-500">
                O gabarito comentado com a justificativa teórica e bibliográfica aparece imediatamente após assinalar a alternativa.
              </p>
            </button>

            <button
              onClick={() => setModoEstudo(false)}
              className={`p-3.5 rounded-lg border text-left transition-all ${
                !modoEstudo
                  ? 'border-[#00733f] bg-white ring-2 ring-[#00733f]/20 font-bold text-[#00733f]'
                  : 'border-slate-200 bg-white/60 text-slate-600'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1 font-semibold text-sm">
                <Clock className="w-4 h-4 text-[#00733f]" />
                Modo Prova Oficial (Simulação Real)
              </div>
              <p className="text-[11px] font-normal text-slate-500">
                Você responde todas as questões sob contagem regressiva sem interrupções. O gabarito e a nota só são revelados ao final.
              </p>
            </button>
          </div>

          {/* Card Matriz de Dificuldade */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
            <h4 className="font-bold text-xs text-[#002752]">Matriz de Competências Pedagógicas (1.000 Questões):</h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
              {DISTRIBUICAO_QUESTOES.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">{item.nivel}</span>
                  <span className="text-base font-black text-[#002752] font-mono">{item.percentual}%</span>
                  <span className="text-[9px] text-slate-500 block leading-tight mt-0.5">{item.descricao}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={iniciarSimulado}
              className="flex items-center gap-2 px-6 py-3 bg-[#00733f] hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md transition-all hover:scale-[1.01]"
            >
              <Play className="w-4 h-4 text-[#ebc000]" />
              Iniciar Simulado Agora
            </button>
          </div>
        </div>
      )}

      {/* Screen 2: Questões em Andamento */}
      {simuladoIniciado && !simuladoFinalizado && questaoAtiva && (
        <div className="space-y-4">
          {/* Question Navigator Bar */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#002752]">
                Questão {indiceAtual + 1} de {questoesAtuais.length}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                questaoAtiva.dificuldade === 'Baixa' ? 'bg-emerald-100 text-emerald-800' :
                questaoAtiva.dificuldade === 'Média-Baixa' ? 'bg-teal-100 text-teal-800' :
                questaoAtiva.dificuldade === 'Média' ? 'bg-amber-100 text-amber-800' :
                questaoAtiva.dificuldade === 'Média-Alta' ? 'bg-orange-100 text-orange-800' :
                'bg-rose-100 text-rose-800'
              }`}>
                {questaoAtiva.dificuldade}
              </span>
              <span className="text-xs text-slate-500">
                • Aula {questaoAtiva.aula_relacionada}: {questaoAtiva.topico}
              </span>
            </div>

            {/* Fast Jump Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {questoesAtuais.map((q, idx) => {
                const marcada = respostas[q.id] !== undefined;
                const estaAtiva = idx === indiceAtual;
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setIndiceAtual(idx);
                      setMostrarGabaritoAtual(modoEstudo && respostas[q.id] !== undefined);
                    }}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                      estaAtiva
                        ? 'bg-[#002752] text-white ring-2 ring-[#ebc000]'
                        : marcada
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Question Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            {/* Header info */}
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between text-xs text-slate-500">
              <span>Código: <strong className="font-mono text-slate-800">{questaoAtiva.id}</strong></span>
              <span>Unidade {questaoAtiva.unidade}</span>
            </div>

            {/* Enunciado */}
            <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-medium">
              {questaoAtiva.enunciado}
            </p>

            {/* Alternativas */}
            <div className="space-y-2.5 text-xs sm:text-sm">
              {Object.entries(questaoAtiva.alternativas).map(([letra, texto]) => {
                const foiEscolhida = respostaSelecionada === letra;
                const ehCorreta = letra === questaoAtiva.resposta_correta;
                const revelarResultado = modoEstudo && mostrarGabaritoAtual;

                let estilo = 'border-slate-200 bg-white hover:border-[#002752]/40 text-slate-800';

                if (revelarResultado) {
                  if (ehCorreta) {
                    estilo = 'border-[#00733f] bg-emerald-50 text-emerald-950 ring-2 ring-[#00733f]/30 font-medium';
                  } else if (foiEscolhida && !ehCorreta) {
                    estilo = 'border-rose-400 bg-rose-50 text-rose-950 font-medium';
                  } else {
                    estilo = 'border-slate-200 bg-white opacity-60 text-slate-500';
                  }
                } else if (foiEscolhida) {
                  estilo = 'border-[#002752] bg-[#002752]/5 text-[#002752] ring-2 ring-[#002752]/20 font-semibold';
                }

                return (
                  <button
                    key={letra}
                    onClick={() => selecionarAlternativa(letra as any)}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${estilo}`}
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 text-slate-800">
                      {letra}
                    </span>
                    <span className="flex-1 leading-relaxed">{texto}</span>

                    {revelarResultado && ehCorreta && (
                      <CheckCircle2 className="w-5 h-5 text-[#00733f] shrink-0" />
                    )}
                    {revelarResultado && foiEscolhida && !ehCorreta && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Gabarito Comentado (se Modo Estudo ou após resposta) */}
            {modoEstudo && mostrarGabaritoAtual && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-sm text-[#002752]">
                  <BookOpen className="w-4 h-4 text-[#ebc000]" />
                  <span>Gabarito Comentado Oficial (Alternativa {questaoAtiva.resposta_correta})</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {questaoAtiva.justificativa}
                </p>
                {questaoAtiva.referencia_bibliografica && (
                  <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between flex-wrap gap-2">
                    <span><strong>Fonte Bibliográfica:</strong> {questaoAtiva.referencia_bibliografica}</span>
                    <a
                      href={GOOGLE_DRIVE_REPO}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#002752] font-semibold hover:underline"
                    >
                      Acessar texto no Drive ↗
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={questaoAnterior}
                disabled={indiceAtual === 0}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" />
                Anterior
              </button>

              <div className="flex items-center gap-2">
                {indiceAtual < questoesAtuais.length - 1 ? (
                  <button
                    onClick={proximaQuestao}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-[#002752] text-white hover:bg-[#001c3d] transition-colors shadow-xs"
                  >
                    Próxima Questão
                    <ArrowRight className="w-4 h-4 text-[#ebc000]" />
                  </button>
                ) : (
                  <button
                    onClick={finalizarSimulado}
                    className="flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-extrabold bg-[#00733f] text-white hover:bg-emerald-700 transition-colors shadow-md"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#ebc000]" />
                    Finalizar Simulado
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Screen 3: Relatório Final de Desempenho */}
      {simuladoFinalizado && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="text-center max-w-lg mx-auto space-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-[#00733f]">
              Simulado Concluído com Sucesso!
            </span>
            <h3 className="text-2xl font-black font-serif text-[#002752]">
              Seu Desempenho na Avaliação
            </h3>
            <p className="text-xs text-slate-500">
              Tempo total gasto: {Math.floor(resultado.tempoGastoSegundos / 60)}m {resultado.tempoGastoSegundos % 60}s
            </p>
          </div>

          {/* Score cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-xs text-slate-500 uppercase font-semibold block">Nota Final</span>
              <span className="text-3xl font-black text-[#002752] font-mono mt-1 block">
                {resultado.nota.toFixed(1)} <span className="text-sm font-normal text-slate-400">/ 10</span>
              </span>
            </div>

            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
              <span className="text-xs text-emerald-800 uppercase font-semibold block">Taxa de Acertos</span>
              <span className="text-3xl font-black text-[#00733f] font-mono mt-1 block">
                {resultado.acertos} <span className="text-sm font-normal text-emerald-700">/ {resultado.total}</span>
              </span>
              <span className="text-[11px] text-emerald-700 font-bold">
                {((resultado.acertos / resultado.total) * 100).toFixed(0)}%
              </span>
            </div>

            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-center">
              <span className="text-xs text-amber-800 uppercase font-semibold block">Nível de Domínio</span>
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
                        Questão {idx + 1} ({q.id}) • Aula {q.aula_relacionada} ({q.dificuldade})
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

          <div className="flex justify-center pt-4">
            <button
              onClick={reiniciar}
              className="flex items-center gap-2 px-6 py-3 bg-[#002752] hover:bg-[#001c3d] text-white rounded-xl font-bold text-xs shadow-md transition-colors"
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
