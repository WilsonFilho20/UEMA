import React, { useState } from 'react';
import { Shuffle, CheckCircle, XCircle, Info, RefreshCcw } from 'lucide-react';

export const ArrowSimulator: React.FC = () => {
  // Três eleitores com ordenações de preferência
  const [eleitor1, setEleitor1] = useState<string[]>(['A', 'B', 'C']);
  const [eleitor2, setEleitor2] = useState<string[]>(['B', 'C', 'A']);
  const [eleitor3, setEleitor3] = useState<string[]>(['C', 'A', 'B']);

  // Opção irrelevante D para testar IIA (Independência das Alternativas Irrelevantes)
  const [incluirOpcaoD, setIncluirOpcaoD] = useState<boolean>(false);

  // Calcula disputas par a par (Regra de Maioria Simples)
  const compararPares = (opcaoX: string, opcaoY: string): { vencedor: string; votosX: number; votosY: number } => {
    let votosX = 0;
    let votosY = 0;

    const rank = (eleitor: string[], op: string) => eleitor.indexOf(op);

    // Eleitor 1
    if (rank(eleitor1, opcaoX) < rank(eleitor1, opcaoY)) votosX++; else votosY++;
    // Eleitor 2
    if (rank(eleitor2, opcaoX) < rank(eleitor2, opcaoY)) votosX++; else votosY++;
    // Eleitor 3
    if (rank(eleitor3, opcaoX) < rank(eleitor3, opcaoY)) votosX++; else votosY++;

    return {
      vencedor: votosX > votosY ? opcaoX : opcaoY,
      votosX,
      votosY
    };
  };

  const avsB = compararPares('A', 'B');
  const bvsC = compararPares('B', 'C');
  const cvsA = compararPares('C', 'A');

  // Verifica se há ciclo de Condorcet
  const ehCicloCondorcet =
    (avsB.vencedor === 'A' && bvsC.vencedor === 'B' && cvsA.vencedor === 'C') ||
    (avsB.vencedor === 'B' && bvsC.vencedor === 'C' && cvsA.vencedor === 'A');

  const carregarCicloCondorcetClassico = () => {
    setEleitor1(['A', 'B', 'C']);
    setEleitor2(['B', 'C', 'A']);
    setEleitor3(['C', 'A', 'B']);
    setIncluirOpcaoD(false);
  };

  const carregarPreferenciaTransitiva = () => {
    setEleitor1(['A', 'B', 'C']);
    setEleitor2(['A', 'C', 'B']);
    setEleitor3(['B', 'A', 'C']);
    setIncluirOpcaoD(false);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden" id="simulador-arrow">
      <div className="bg-[#002752] text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ebc000] text-[#002752] mb-1">
            Aula 10 • Teorema da Impossibilidade de Kenneth Arrow (1963)
          </span>
          <h3 className="text-lg sm:text-xl font-bold font-serif tracking-tight">
            Infográfico Dinâmico: Teorema de Arrow e Paradoxo de Condorcet
          </h3>
          <p className="text-xs sm:text-sm text-slate-200">
            Axiomas democráticos de agregação social e a intransitividade das escolhas por maioria
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={carregarCicloCondorcetClassico}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00733f] text-white rounded-lg text-xs font-medium hover:bg-emerald-700 transition-colors"
          >
            <Shuffle className="w-3.5 h-3.5 text-[#ebc000]" />
            Ciclo de Condorcet
          </button>
          <button
            onClick={carregarPreferenciaTransitiva}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 text-slate-200 rounded-lg text-xs hover:bg-slate-700 transition-colors"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            Consenso Transitivo
          </button>
        </div>
      </div>

      <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Eleitores & Preferências */}
        <div className="lg:col-span-5 space-y-4 text-xs">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
            <h4 className="font-semibold text-slate-800 text-sm">Preferências Individuais Transitivas</h4>

            {/* Eleitor 1 */}
            <div className="p-2.5 bg-white rounded border border-slate-200">
              <span className="font-bold text-[#002752] block mb-1">Eleitor 1 (Conservador Fiscal)</span>
              <div className="flex items-center gap-2 font-mono font-bold text-slate-800">
                <span className="px-2 py-1 bg-blue-100 rounded text-blue-900">{eleitor1[0]}</span> &gt;
                <span className="px-2 py-1 bg-slate-100 rounded text-slate-800">{eleitor1[1]}</span> &gt;
                <span className="px-2 py-1 bg-slate-100 rounded text-slate-800">{eleitor1[2]}</span>
              </div>
            </div>

            {/* Eleitor 2 */}
            <div className="p-2.5 bg-white rounded border border-slate-200">
              <span className="font-bold text-[#00733f] block mb-1">Eleitor 2 (Social-Democrata)</span>
              <div className="flex items-center gap-2 font-mono font-bold text-slate-800">
                <span className="px-2 py-1 bg-emerald-100 rounded text-emerald-900">{eleitor2[0]}</span> &gt;
                <span className="px-2 py-1 bg-slate-100 rounded text-slate-800">{eleitor2[1]}</span> &gt;
                <span className="px-2 py-1 bg-slate-100 rounded text-slate-800">{eleitor2[2]}</span>
              </div>
            </div>

            {/* Eleitor 3 */}
            <div className="p-2.5 bg-white rounded border border-slate-200">
              <span className="font-bold text-amber-700 block mb-1">Eleitor 3 (Desenvolvimentista)</span>
              <div className="flex items-center gap-2 font-mono font-bold text-slate-800">
                <span className="px-2 py-1 bg-amber-100 rounded text-amber-900">{eleitor3[0]}</span> &gt;
                <span className="px-2 py-1 bg-slate-100 rounded text-slate-800">{eleitor3[1]}</span> &gt;
                <span className="px-2 py-1 bg-slate-100 rounded text-slate-800">{eleitor3[2]}</span>
              </div>
            </div>
          </div>

          {/* Axiomas de Arrow Card */}
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-2">
            <h5 className="font-bold text-[#002752] text-xs">Os 4 Axiomas Democráticos de Arrow</h5>
            <div className="space-y-1 text-[11px] text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#00733f] shrink-0" />
                <span><strong>1. Domínio Irrestrito:</strong> qualquer ordenação individual é aceita.</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#00733f] shrink-0" />
                <span><strong>2. Não-Ditadura:</strong> nenhuma preferência individual se impõe compulsoriamente.</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#00733f] shrink-0" />
                <span><strong>3. Pareto (Unanimidade):</strong> se todos preferem X a Y, a sociedade escolhe X.</span>
              </div>
              <div className="flex items-center gap-1.5">
                {ehCicloCondorcet ? (
                  <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                ) : (
                  <CheckCircle className="w-3.5 h-3.5 text-[#00733f] shrink-0" />
                )}
                <span><strong>4. IIA:</strong> a escolha social entre X e Y depende apenas de X e Y.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pairwise Voting & Diagnosis */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h4 className="font-bold text-sm text-[#002752] mb-3">
              Resultado das Votações por Pares (Regra da Maioria)
            </h4>

            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 font-bold block mb-1">Disputa A vs B</span>
                <span className="text-lg font-black text-[#002752] font-mono">
                  {avsB.vencedor} VENCE
                </span>
                <span className="text-[11px] text-slate-600 block mt-1">
                  Placar: {avsB.votosX} a {avsB.votosY}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 font-bold block mb-1">Disputa B vs C</span>
                <span className="text-lg font-black text-[#00733f] font-mono">
                  {bvsC.vencedor} VENCE
                </span>
                <span className="text-[11px] text-slate-600 block mt-1">
                  Placar: {bvsC.votosX} a {bvsC.votosY}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 font-bold block mb-1">Disputa C vs A</span>
                <span className="text-lg font-black text-amber-800 font-mono">
                  {cvsA.vencedor} VENCE
                </span>
                <span className="text-[11px] text-slate-600 block mt-1">
                  Placar: {cvsA.votosX} a {cvsA.votosY}
                </span>
              </div>
            </div>

            {/* Verdict Box */}
            <div className={`mt-4 p-4 rounded-lg border text-xs ${
              ehCicloCondorcet
                ? 'bg-rose-50 border-rose-200 text-rose-950'
                : 'bg-emerald-50 border-emerald-200 text-emerald-950'
            }`}>
              <div className="flex items-center gap-2 font-bold text-sm mb-1">
                {ehCicloCondorcet ? (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span>Paradoxo de Condorcet Identificado! Intransitividade Social Coletiva</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 text-[#00733f]" />
                    <span>Vencedor de Condorcet Existente (Ordenação Social Estável)</span>
                  </>
                )}
              </div>

              <p className="leading-relaxed">
                {ehCicloCondorcet ? (
                  <>
                    Constata-se que <strong>A vence B</strong> (2 a 1), <strong>B vence C</strong> (2 a 1) e <strong>C vence A</strong> (2 a 1). Embora cada eleitor individual seja 100% racional e transitivo, a sociedade como um todo revela um <em>ciclo intransitivo</em> (A &gt; B &gt; C &gt; A). O resultado final dependerá arbitrariamente de quem define a ordem da pauta no parlamento (controle da agenda)!
                  </>
                ) : (
                  <>
                    Existe uma alternativa dominante que derrota todas as demais em disputas binárias. Não há ciclo de votação para esta distribuição de votos.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
