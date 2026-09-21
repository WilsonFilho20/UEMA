import React, { useState, useEffect } from 'react';
import { Aula } from '../types';
import { AULAS_INTERATIVAS_DATA, OpcaoDilema } from '../data/interactiveLessonsData';
import { LISTA_25_SIMULADORES, SimulatorId } from './SimulatorsHub';
import {
  Lightbulb,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Play,
  RotateCcw,
  Sparkles,
  Award,
  ChevronRight,
  TrendingUp,
  Scale,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

interface InteractiveLessonModuleProps {
  aula: Aula;
  onOpenSimulator: (simulatorId?: string) => void;
  onOpenQuiz: (aulaNumero?: number) => void;
}

export const InteractiveLessonModule: React.FC<InteractiveLessonModuleProps> = ({
  aula,
  onOpenSimulator,
  onOpenQuiz
}) => {
  const infoInterativa = AULAS_INTERATIVAS_DATA[aula.numero];

  // Estados locais para interatividade do aluno
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<string | null>(null);
  const [respostaQuiz, setRespostaQuiz] = useState<number | null>(null);
  const [quizRevelado, setQuizRevelado] = useState<boolean>(false);
  const [aulaConcluida, setAulaConcluida] = useState<boolean>(false);

  // Carregar progresso salvo da aula
  useEffect(() => {
    try {
      const storageKey = `uema_aula_${aula.numero}_status`;
      const salvo = localStorage.getItem(storageKey);
      if (salvo === 'concluida') {
        setAulaConcluida(true);
      } else {
        setAulaConcluida(false);
      }
    } catch {
      // Ignorar fallback
    }
    setOpcaoSelecionada(null);
    setRespostaQuiz(null);
    setQuizRevelado(false);
  }, [aula.numero]);

  const toggleConclusaoAula = () => {
    const novoStatus = !aulaConcluida;
    setAulaConcluida(novoStatus);
    try {
      const storageKey = `uema_aula_${aula.numero}_status`;
      if (novoStatus) {
        localStorage.setItem(storageKey, 'concluida');
      } else {
        localStorage.removeItem(storageKey);
      }
    } catch {
      // Ignorar fallback
    }
  };

  if (!infoInterativa) {
    return null;
  }

  // Simuladores vinculados a esta aula
  const simuladoresDaAula = LISTA_25_SIMULADORES.filter(
    (sim) => sim.aulaNumero === aula.numero || infoInterativa.simuladoresSugeridos.includes(sim.id)
  );

  const opcaoAtual = infoInterativa.dilema.opcoes.find((o) => o.id === opcaoSelecionada);

  return (
    <div className="space-y-6 pt-2" id={`modulo-interativo-aula-${aula.numero}`}>
      {/* Barra de Status & Meta de Aprendizado Ativo */}
      <div className="bg-gradient-to-r from-[#002752] via-[#023e7d] to-[#002752] text-white p-5 rounded-2xl shadow-sm border-l-4 border-[#ebc000] flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#ebc000] text-[#002752] uppercase tracking-wider">
              Ambiente de Aprendizagem Ativa
            </span>
            <span className="text-xs text-slate-200">
              Aula Interativa {aula.numero}
            </span>
          </div>
          <h4 className="text-lg font-bold font-serif text-white">
            Meta Pedagógica: {infoInterativa.metaAprendizado}
          </h4>
        </div>

        <button
          onClick={toggleConclusaoAula}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-xs ${
            aulaConcluida
              ? 'bg-emerald-500 text-white ring-2 ring-emerald-300'
              : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
          }`}
        >
          <CheckCircle2 className={`w-4 h-4 ${aulaConcluida ? 'text-white' : 'text-[#ebc000]'}`} />
          {aulaConcluida ? 'Aula Concluída e Registrada' : 'Marcar Aula como Estudada'}
        </button>
      </div>

      {/* SEÇÃO 1: DILEMA INTERATIVO DE POLÍTICA PÚBLICA (TOMADA DE DECISÃO) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#002752] text-[#ebc000] flex items-center justify-center font-bold text-sm">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Dilema de Política Pública • Tomada de Decisão Econômica
              </span>
              <h4 className="text-base font-bold text-[#002752] font-serif">
                {infoInterativa.dilema.titulo}
              </h4>
            </div>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-200/70 px-2.5 py-1 rounded-full">
            Simulação Prática
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 text-xs text-amber-950 space-y-1">
            <p className="font-semibold text-amber-900 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              Contexto do Caso Real:
            </p>
            <p className="leading-relaxed pl-5">{infoInterativa.dilema.contexto}</p>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
              {infoInterativa.dilema.perguntaDecisao}
            </h5>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {infoInterativa.dilema.opcoes.map((opcao) => {
                const isSelected = opcaoSelecionada === opcao.id;
                return (
                  <button
                    key={opcao.id}
                    onClick={() => setOpcaoSelecionada(opcao.id)}
                    className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'border-[#002752] bg-slate-50 ring-2 ring-[#002752] shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 bg-white'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                          Opção {opcao.id}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-bold text-[#002752] flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Sua Decisão
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-bold text-slate-900 leading-snug">
                        {opcao.rotulo}
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {opcao.descricao}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                      <span className="text-[#002752] font-semibold">
                        {isSelected ? 'Ver Diagnóstico ↓' : 'Adotar Medida →'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Diagnóstico da Decisão do Aluno */}
          {opcaoAtual && (
            <div className="mt-4 p-4 rounded-xl border border-slate-300 bg-slate-50/90 space-y-3 animate-fade-in">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800">
                    Avaliação Econômica da Opção {opcaoAtual.id}:
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      opcaoAtual.avaliacao === 'Ótima Escolha'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : opcaoAtual.avaliacao === 'Solução com Trade-off Crítico'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}
                  >
                    {opcaoAtual.avaliacao}
                  </span>
                </div>

                <button
                  onClick={() => setOpcaoSelecionada(null)}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  Mudar Decisão
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                    <TrendingUp className="w-3.5 h-3.5 text-[#002752]" />
                    Consequência Alocativa e Fiscal:
                  </div>
                  <p className="text-slate-700 leading-relaxed text-[11px]">
                    {opcaoAtual.consequencia}
                  </p>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    Fundamentação Teórica da Disciplina:
                  </div>
                  <p className="text-slate-700 leading-relaxed text-[11px]">
                    {opcaoAtual.diagnostico}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SEÇÃO 2: SIMULADORES INTERATIVOS RECOMENDADOS PARA ESTA AULA */}
      {simuladoresDaAula.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Laboratório Computacional da Aula {aula.numero}
              </span>
              <h4 className="text-base font-bold text-[#002752] font-serif">
                Simuladores Interativos Vinculados ({simuladoresDaAula.length} modelos)
              </h4>
            </div>
            <span className="text-xs text-slate-500">
              Prática com modelagem matemática
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {simuladoresDaAula.map((sim) => (
              <div
                key={sim.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-[#002752] transition-all flex flex-col justify-between group shadow-2xs"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{sim.icone}</span>
                    <span className="text-[9px] font-mono font-bold bg-[#002752] text-[#ebc000] px-1.5 py-0.5 rounded">
                      U{sim.unidade} • A{sim.aulaNumero}
                    </span>
                  </div>
                  <h5 className="font-bold text-xs text-slate-900 group-hover:text-[#002752]">
                    {sim.titulo}
                  </h5>
                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                    {sim.subtitulo}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/70 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-medium">
                    {sim.tags.slice(0, 2).join(' • ')}
                  </span>
                  <button
                    onClick={() => onOpenSimulator(sim.id)}
                    className="flex items-center gap-1 text-xs font-bold text-[#002752] group-hover:text-blue-700 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-[#002752]" />
                    Simular
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEÇÃO 3: DESAFIO CONCEITUAL INTERATIVO (CHECK DE DOMÍNIO) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
              ✓
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Verificação Ativa de Aprendizagem
              </span>
              <h4 className="text-sm font-bold text-slate-900">
                Desafio Rápido de Fixação Conceitual
              </h4>
            </div>
          </div>

          <button
            onClick={() => onOpenQuiz(aula.numero)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#002752] text-white text-xs font-semibold hover:bg-blue-900 transition-all cursor-pointer shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#ebc000]" />
            Simulado Completo da Aula {aula.numero} →
          </button>
        </div>

        <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
          {infoInterativa.desafio.enunciado}
        </p>

        <div className="space-y-2">
          {infoInterativa.desafio.alternativas.map((alt, idx) => {
            const isSelected = respostaQuiz === idx;
            const isCorrect = idx === infoInterativa.desafio.indiceCorreto;
            let buttonClasses = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800';

            if (quizRevelado) {
              if (isCorrect) {
                buttonClasses = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-500';
              } else if (isSelected && !isCorrect) {
                buttonClasses = 'border-rose-400 bg-rose-50 text-rose-950 line-through opacity-80';
              }
            } else if (isSelected) {
              buttonClasses = 'border-[#002752] bg-blue-50 text-[#002752] font-semibold ring-1 ring-[#002752]';
            }

            return (
              <button
                key={idx}
                disabled={quizRevelado}
                onClick={() => setRespostaQuiz(idx)}
                className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 cursor-pointer ${buttonClasses}`}
              >
                <span className="w-5 h-5 rounded-md bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1 leading-relaxed">{alt}</span>
                {quizRevelado && isCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                )}
                {quizRevelado && isSelected && !isCorrect && (
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Botão de Verificação & Explicação */}
        {!quizRevelado ? (
          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-slate-500 italic">
              {infoInterativa.desafio.dica}
            </span>
            <button
              disabled={respostaQuiz === null}
              onClick={() => setQuizRevelado(true)}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              Verificar Resposta
            </button>
          </div>
        ) : (
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/70 space-y-2 text-xs text-emerald-950 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="font-bold flex items-center gap-1.5 text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Resolução e Fundamentação Econômica:
              </span>
              <button
                onClick={() => {
                  setQuizRevelado(false);
                  setRespostaQuiz(null);
                }}
                className="text-xs text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Tentar Novamente
              </button>
            </div>
            <p className="leading-relaxed text-slate-800 pl-5">
              {infoInterativa.desafio.explicacao}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
