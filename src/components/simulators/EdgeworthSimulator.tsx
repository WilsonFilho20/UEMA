import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, Info } from 'lucide-react';

export const EdgeworthSimulator: React.FC = () => {
  // Total endowments of Good X and Good Y
  const totalX = 100;
  const totalY = 100;

  // Initial allocation to Consumer A (Agent A)
  const [xA, setXA] = useState<number>(40);
  const [yA, setYA] = useState<number>(60);

  // Preference parameters (Cobb-Douglas alpha for A and beta for B)
  // U_A = X_A^alpha * Y_A^(1-alpha) => TMS_A = [alpha/(1-alpha)] * (Y_A / X_A)
  // U_B = X_B^beta * Y_B^(1-beta) => TMS_B = [beta/(1-beta)] * (Y_B / X_B)
  const [alpha, setAlpha] = useState<number>(0.5);
  const [beta, setBeta] = useState<number>(0.5);

  const xB = totalX - xA;
  const yB = totalY - yA;

  // Calculate TMS (Taxa Marginal de Substituição)
  const tmsA = xA > 0 ? (alpha / (1 - alpha)) * (yA / xA) : 0;
  const tmsB = xB > 0 ? (beta / (1 - beta)) * (yB / xB) : 0;

  // Difference in TMS (efficiency gap)
  const tmsDiff = Math.abs(tmsA - tmsB);
  const isParetoEfficient = tmsDiff < 0.08;

  // Contract curve: when alpha=0.5 and beta=0.5, contract curve is the straight diagonal y = x
  // For other parameters: (alpha/(1-alpha)) * (yA/xA) = (beta/(1-beta)) * ((100-yA)/(100-xA))
  const moveToContractCurve = () => {
    // Find yA on contract curve for current xA
    const k = ((1 - alpha) / alpha) * (beta / (1 - beta));
    const targetYA = (100 * xA) / (k * (100 - xA) + xA);
    setYA(Math.round(targetYA));
  };

  const resetAllocation = () => {
    setXA(25);
    setYA(75);
    setAlpha(0.5);
    setBeta(0.5);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden" id="simulador-edgeworth">
      {/* Header */}
      <div className="bg-[#002752] text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ebc000] text-[#002752] mb-1">
            Aula 2 • 1º e 2º Teoremas do Bem-Estar
          </span>
          <h3 className="text-lg sm:text-xl font-bold font-serif tracking-tight">
            Simulador da Caixa de Edgeworth
          </h3>
          <p className="text-xs sm:text-sm text-slate-200">
            Equilíbrio Geral, Taxas Marginais de Substituição (TMS) e Curva de Contrato de Pareto
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={moveToContractCurve}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00733f] hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition-colors shadow-xs"
            title="Ir para o ponto Pareto-eficiente mais próximo"
          >
            <CheckCircle2 className="w-4 h-4 text-[#ebc000]" />
            Atingir Ótimo de Pareto
          </button>
          <button
            onClick={resetAllocation}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reiniciar
          </button>
        </div>
      </div>

      <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Canvas / Visual Box */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative w-full max-w-[420px] aspect-square bg-slate-50 border-2 border-[#002752] rounded-lg p-2 shadow-inner">
            {/* Corner labels */}
            <span className="absolute -bottom-6 left-0 text-xs font-bold text-[#002752]">
              Origem Consumidor A (O_A)
            </span>
            <span className="absolute -top-6 right-0 text-xs font-bold text-amber-700">
              Origem Consumidor B (O_B)
            </span>

            {/* SVG Plot */}
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              {/* Grid lines */}
              <line x1="0" y1="20" x2="100" y2="20" stroke="#e2e8f0" strokeDasharray="2,2" />
              <line x1="0" y1="40" x2="100" y2="40" stroke="#e2e8f0" strokeDasharray="2,2" />
              <line x1="0" y1="60" x2="100" y2="60" stroke="#e2e8f0" strokeDasharray="2,2" />
              <line x1="0" y1="80" x2="100" y2="80" stroke="#e2e8f0" strokeDasharray="2,2" />
              <line x1="20" y1="0" x2="20" y2="100" stroke="#e2e8f0" strokeDasharray="2,2" />
              <line x1="40" y1="0" x2="40" y2="100" stroke="#e2e8f0" strokeDasharray="2,2" />
              <line x1="60" y1="0" x2="60" y2="100" stroke="#e2e8f0" strokeDasharray="2,2" />
              <line x1="80" y1="0" x2="80" y2="100" stroke="#e2e8f0" strokeDasharray="2,2" />

              {/* Contract Curve (Curva de Contrato) */}
              <line
                x1="0"
                y1="100"
                x2="100"
                y2="0"
                stroke="#00733f"
                strokeWidth="2.5"
                strokeDasharray="4,3"
              />
              <text x="52" y="44" fill="#00733f" fontSize="4" fontWeight="bold" transform="rotate(-45 52 44)">
                Curva de Contrato (TMS_A = TMS_B)
              </text>

              {/* Indifference Curve A (convex to OA at bottom-left 0,100) */}
              <path
                d={`M 5,${100 - (Math.pow(xA, alpha) * Math.pow(yA, 1 - alpha)) / Math.pow(5, alpha) * 0.9} Q ${xA},${100 - yA} 95,${100 - (Math.pow(xA, alpha) * Math.pow(yA, 1 - alpha)) / Math.pow(95, alpha) * 0.9}`}
                fill="none"
                stroke="#002752"
                strokeWidth="1.8"
                opacity="0.85"
              />

              {/* Indifference Curve B (convex to OB at top-right 100,0) */}
              <path
                d={`M 5,${100 - yA - 15} Q ${xA},${100 - yA} 95,${100 - yA + 15}`}
                fill="none"
                stroke="#d97706"
                strokeWidth="1.8"
                opacity="0.85"
              />

              {/* Current Allocation Point */}
              <circle
                cx={xA}
                cy={100 - yA}
                r="4"
                fill={isParetoEfficient ? '#00733f' : '#dc2626'}
                stroke="#ffffff"
                strokeWidth="1.5"
                className="transition-all duration-200 cursor-pointer shadow-md"
              />
              <text
                x={xA + 3}
                y={100 - yA - 3}
                fill="#1e293b"
                fontSize="4"
                fontWeight="bold"
              >
                Ponto E ({xA}, {yA})
              </text>
            </svg>
          </div>

          <div className="mt-8 text-xs text-slate-500 text-center max-w-sm">
            Arraste os controles laterais para variar as dotações de Bens X e Y. Quando as curvas de indiferença tangenciam, as TMS se igualam e atinge-se a Fronteira de Eficiência de Pareto.
          </div>
        </div>

        {/* Controls and Diagnostics */}
        <div className="lg:col-span-5 space-y-4">
          <div className={`p-3.5 rounded-lg border text-xs sm:text-sm ${
            isParetoEfficient
              ? 'bg-emerald-50 border-[#00733f]/30 text-emerald-900'
              : 'bg-amber-50 border-amber-300 text-amber-900'
          }`}>
            <div className="flex items-center gap-2 font-bold mb-1">
              {isParetoEfficient ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-[#00733f]" />
                  <span>Alocação Ótima de Pareto (Equilíbrio Geral)</span>
                </>
              ) : (
                <>
                  <Info className="w-5 h-5 text-[#ebc000]" />
                  <span>Alocação Sub-Ótima (Ganhos de Troca Mútuos Possíveis)</span>
                </>
              )}
            </div>
            <p className="text-xs leading-relaxed">
              {isParetoEfficient
                ? 'As Taxas Marginais de Substituição coincidem (TMS_A ≈ TMS_B). Não é possível melhorar a utilidade do Consumidor A sem prejudicar o Consumidor B (1º Teorema do Bem-Estar).'
                : 'Como TMS_A ≠ TMS_B, existe uma "lente de Pareto" onde trocas voluntárias bilaterais aumentam o bem-estar de ambos os indivíduos.'}
            </p>
          </div>

          {/* Allocation Sliders */}
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-3 text-xs">
            <h4 className="font-semibold text-slate-800 flex items-center justify-between">
              <span>Dotação do Consumidor A</span>
              <span className="text-[#002752] font-mono">X: {xA} | Y: {yA}</span>
            </h4>

            <div>
              <div className="flex justify-between text-slate-600 mb-1">
                <span>Bem X (Privado)</span>
                <span className="font-mono">{xA} un</span>
              </div>
              <input
                type="range"
                min="5"
                max="95"
                value={xA}
                onChange={(e) => setXA(Number(e.target.value))}
                className="w-full accent-[#002752] h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-600 mb-1">
                <span>Bem Y (Serviço)</span>
                <span className="font-mono">{yA} un</span>
              </div>
              <input
                type="range"
                min="5"
                max="95"
                value={yA}
                onChange={(e) => setYA(Number(e.target.value))}
                className="w-full accent-[#002752] h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-2 text-xs">
            <h4 className="font-semibold text-slate-800">Preferências Subjetivas (Cobb-Douglas)</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-600 block mb-1">Peso Bem X (Consumidor A)</label>
                <select
                  value={alpha}
                  onChange={(e) => setAlpha(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded p-1.5 text-xs"
                >
                  <option value={0.3}>Baixo (α = 0.3)</option>
                  <option value={0.5}>Neutro (α = 0.5)</option>
                  <option value={0.7}>Alto (α = 0.7)</option>
                </select>
              </div>
              <div>
                <label className="text-slate-600 block mb-1">Peso Bem X (Consumidor B)</label>
                <select
                  value={beta}
                  onChange={(e) => setBeta(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded p-1.5 text-xs"
                >
                  <option value={0.3}>Baixo (β = 0.3)</option>
                  <option value={0.5}>Neutro (β = 0.5)</option>
                  <option value={0.7}>Alto (β = 0.7)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Metrics comparison */}
          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="bg-slate-100 p-2.5 rounded-lg border border-slate-200">
              <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">TMS Consumidor A</span>
              <span className="text-base font-extrabold text-[#002752] font-mono">{tmsA.toFixed(2)}</span>
            </div>
            <div className="bg-slate-100 p-2.5 rounded-lg border border-slate-200">
              <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">TMS Consumidor B</span>
              <span className="text-base font-extrabold text-amber-700 font-mono">{tmsB.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
