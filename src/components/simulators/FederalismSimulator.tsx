import React, { useState } from 'react';
import { Landmark, ArrowRight, TrendingUp, AlertTriangle } from 'lucide-react';

export const FederalismSimulator: React.FC = () => {
  // Parâmetros do Município Maranhense (ex: São Luís ou Caxias)
  const [transferenciaFPM, setTransferenciaFPM] = useState<number>(100); // R$ Milhões em transferências incondicionais
  const [aumentoRendaPrivada, setAumentoRendaPrivada] = useState<number>(100); // R$ Milhões em expansão da renda local

  // Propensões marginais a gastar (Literatura empírica: Oliveira in Arvate & Biderman, 2004)
  const propensaoGastoTransferencia = 0.72; // O dinheiro gruda onde ele cai (Flypaper Effect)
  const propensaoGastoRendaPrivada = 0.12; // Resposta do gasto público a choques na renda privada dos munícipes

  const expansaoGastoViaFPM = transferenciaFPM * propensaoGastoTransferencia;
  const expansaoGastoViaRenda = aumentoRendaPrivada * propensaoGastoRendaPrivada;
  const multiplicadorFlypaper = (expansaoGastoViaFPM / expansaoGastoViaRenda).toFixed(1);

  // Cenário de Guerra Fiscal do ICMS (Matriz da Teoria dos Jogos 2x2)
  const [estrategiaEstadoA, setEstrategiaEstadoA] = useState<'Incentivo' | 'Cooperar'>('Incentivo');
  const [estrategiaEstadoB, setEstrategiaEstadoB] = useState<'Incentivo' | 'Cooperar'>('Incentivo');

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden" id="simulador-federalismo">
      <div className="bg-[#002752] text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ebc000] text-[#002752] mb-1">
            Aula 11 & 12 • Federalismo Fiscal Brasileiro e Tiebout
          </span>
          <h3 className="text-lg sm:text-xl font-bold font-serif tracking-tight">
            Simulador de Transferências Constitucionais e Efeito Flypaper
          </h3>
          <p className="text-xs sm:text-sm text-slate-200">
            FPE/FPM, o dilema da guerra fiscal do ICMS e a assimetria na expansão do gasto público subnacional
          </p>
        </div>
      </div>

      <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Flypaper Effect Section */}
        <div className="lg:col-span-7 space-y-4 text-xs">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
            <h4 className="font-bold text-sm text-[#002752] flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#00733f]" />
              1. Demonstração Empírica do Efeito Flypaper
            </h4>
            <p className="text-slate-600">
              A teoria microeconômica tradicional presumia que R$ 100 milhões recebidos via FPM teriam o mesmo efeito sobre o gasto local que R$ 100 milhões a mais na renda dos cidadãos. Na realidade (Oliveira, 2004), o dinheiro &quot;gruda onde cai&quot;:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <div className="flex justify-between text-slate-700 font-medium mb-1">
                  <span>Repasse FPM / Transferência</span>
                  <span className="font-mono font-bold text-[#002752]">R$ {transferenciaFPM}M</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="300"
                  step="10"
                  value={transferenciaFPM}
                  onChange={(e) => setTransferenciaFPM(Number(e.target.value))}
                  className="w-full accent-[#002752] h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-700 font-medium mb-1">
                  <span>Aumento de Renda Privada</span>
                  <span className="font-mono font-bold text-[#00733f]">R$ {aumentoRendaPrivada}M</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="300"
                  step="10"
                  value={aumentoRendaPrivada}
                  onChange={(e) => setAumentoRendaPrivada(Number(e.target.value))}
                  className="w-full accent-[#00733f] h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Comparison Cards */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-[#002752]/5 border border-[#002752]/20 rounded-lg">
                <span className="text-[#002752] block font-bold text-[11px] mb-1">Expansão de Gastos via FPM</span>
                <span className="text-lg font-black text-[#002752] font-mono">
                  + R$ {expansaoGastoViaFPM.toFixed(1)} M
                </span>
                <span className="block text-[10px] text-slate-600 mt-0.5">Propensão Marginal: 72%</span>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                <span className="text-[#00733f] block font-bold text-[11px] mb-1">Expansão via Renda Própria</span>
                <span className="text-lg font-black text-[#00733f] font-mono">
                  + R$ {expansaoGastoViaRenda.toFixed(1)} M
                </span>
                <span className="block text-[10px] text-slate-600 mt-0.5">Propensão Marginal: 12%</span>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-950">
              <strong>Multiplicador Flypaper:</strong> Para valores iguais de injeção financeira, o repasse governamental expande o gasto público local <strong>{multiplicadorFlypaper}x mais</strong> do que o enriquecimento da base tributária privada, revelando a ilusão fiscal dos burocratas locais.
            </div>
          </div>
        </div>

        {/* Fiscal War Game Section */}
        <div className="lg:col-span-5 space-y-4 text-xs">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
            <h4 className="font-bold text-sm text-[#002752] flex items-center gap-1.5">
              <Landmark className="w-4 h-4 text-[#ebc000]" />
              2. Jogo da Guerra Fiscal do ICMS
            </h4>
            <p className="text-slate-600 text-[11px]">
              Dilema dos prisioneiros entre dois Estados vizinhos competindo pela atração de um polo fabril automotivo:
            </p>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-700 block font-semibold mb-1">Estratégia Estado A (MA)</label>
                <select
                  value={estrategiaEstadoA}
                  onChange={(e) => setEstrategiaEstadoA(e.target.value as any)}
                  className="w-full p-2 bg-white border border-slate-300 rounded text-xs"
                >
                  <option value="Incentivo">Conceder Renúncia Fiscal</option>
                  <option value="Cooperar">Cobrar Alíquota Padrão (18%)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-700 block font-semibold mb-1">Estratégia Estado B (PI)</label>
                <select
                  value={estrategiaEstadoB}
                  onChange={(e) => setEstrategiaEstadoB(e.target.value as any)}
                  className="w-full p-2 bg-white border border-slate-300 rounded text-xs"
                >
                  <option value="Incentivo">Conceder Renúncia Fiscal</option>
                  <option value="Cooperar">Cobrar Alíquota Padrão (18%)</option>
                </select>
              </div>
            </div>

            {/* Payoff visualization */}
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <div className="flex justify-between items-center mb-1.5">
                <span className="font-bold text-slate-800">Resultado da Competição Tributária:</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  estrategiaEstadoA === 'Incentivo' && estrategiaEstadoB === 'Incentivo'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {estrategiaEstadoA === 'Incentivo' && estrategiaEstadoB === 'Incentivo' ? 'Equilíbrio de Nash Ineficiente' : 'Cooperação Federativa'}
                </span>
              </div>

              <div className="text-[11px] text-slate-600 leading-relaxed">
                {estrategiaEstadoA === 'Incentivo' && estrategiaEstadoB === 'Incentivo' && (
                  <span className="text-rose-700 font-medium">
                    Ambos concedem isenções. A fábrica se instala com renúncia máxima, e os dois estados perdem arrecadação de ICMS sem ganhos líquidos comparativos (&quot;Corrida para o Fundo&quot; / Race to the Bottom).
                  </span>
                )}
                {estrategiaEstadoA === 'Incentivo' && estrategiaEstadoB === 'Cooperar' && (
                  <span className="text-[#002752] font-medium">
                    O Estado A atrai a fábrica ao custo de renúncia fiscal; o Estado B perde o investimento fabril.
                  </span>
                )}
                {estrategiaEstadoA === 'Cooperar' && estrategiaEstadoB === 'Incentivo' && (
                  <span className="text-amber-800 font-medium">
                    O Estado B atrai a fábrica ao custo de renúncia fiscal; o Estado A perde o investimento fabril.
                  </span>
                )}
                {estrategiaEstadoA === 'Cooperar' && estrategiaEstadoB === 'Cooperar' && (
                  <span className="text-[#00733f] font-medium">
                    Ótimo social coletivo: ambos arrecadam a alíquota cheia e a empresa se localiza segundo sua produtividade natural.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
