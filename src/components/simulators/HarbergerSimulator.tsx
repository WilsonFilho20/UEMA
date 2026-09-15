import React, { useState } from 'react';
import { DollarSign, TrendingDown, Percent, Layers } from 'lucide-react';

export const HarbergerSimulator: React.FC = () => {
  const [aliquota, setAliquota] = useState<number>(20); // Tax rate in %
  const [elasticidadeDemanda, setElasticidadeDemanda] = useState<number>(1.0); // |Ed|
  const [elasticidadeOferta, setElasticidadeOferta] = useState<number>(1.0); // Es
  const precoBase = 100;
  const quantidadeBase = 1000;

  const t = aliquota / 100;

  // Elasticidade conjunta harmônica: eta = (Ed * Es) / (Ed + Es)
  const eta = (elasticidadeDemanda * elasticidadeOferta) / (elasticidadeDemanda + elasticidadeOferta);

  // Variação na quantidade: deltaQ = eta * Q0 * t
  const deltaQ = eta * quantidadeBase * t;
  const quantidadeComImposto = Math.max(0, quantidadeBase - deltaQ);

  // Incidência tributária relativa:
  // deltaPc = t * (Es / (Ed + Es)) * P0
  // deltaPv = t * (Ed / (Ed + Es)) * P0
  const aumentoPrecoConsumidor = precoBase * t * (elasticidadeOferta / (elasticidadeDemanda + elasticidadeOferta));
  const reducaoPrecoProdutor = precoBase * t * (elasticidadeDemanda / (elasticidadeDemanda + elasticidadeOferta));
  const precoConsumidor = precoBase + aumentoPrecoConsumidor;
  const precoProdutor = precoBase - reducaoPrecoProdutor;

  // Arrecadação Tributária = t * P0 * Q_novo (ou (Pc - Pv) * Q_novo)
  const impostoUnitario = precoConsumidor - precoProdutor;
  const arrecadacaoFiscal = impostoUnitario * quantidadeComImposto;

  // Triângulo de Peso Morto de Harberger (DWL) = 0.5 * impostoUnitario * deltaQ
  const pesoMortoHarberger = 0.5 * impostoUnitario * deltaQ;

  // Perda de Excedente do Consumidor = (Pc - P0) * Q1 + 0.5 * (Pc - P0) * deltaQ
  const perdaExcedenteConsumidor = aumentoPrecoConsumidor * quantidadeComImposto + 0.5 * aumentoPrecoConsumidor * deltaQ;
  // Perda de Excedente do Produtor = (P0 - Pv) * Q1 + 0.5 * (P0 - Pv) * deltaQ
  const perdaExcedenteProdutor = reducaoPrecoProdutor * quantidadeComImposto + 0.5 * reducaoPrecoProdutor * deltaQ;

  // Proporção do DWL sobre a Arrecadação (Custo da arrecadação)
  const razaoPesoMortoArrecadacao = arrecadacaoFiscal > 0 ? (pesoMortoHarberger / arrecadacaoFiscal) * 100 : 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden" id="simulador-harberger">
      <div className="bg-[#002752] text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ebc000] text-[#002752] mb-1">
            Aula 6 & 8 • Eficiência Tributária e Regra de Ramsey
          </span>
          <h3 className="text-lg sm:text-xl font-bold font-serif tracking-tight">
            Simulador de Peso Morto de Harberger (Deadweight Loss)
          </h3>
          <p className="text-xs sm:text-sm text-slate-200">
            A distorção nos preços relativos, elasticidades cruzadas e o efeito quadrático da alíquota (DWL ∝ t²)
          </p>
        </div>
      </div>

      <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-800">Alíquota Tributária Ad Valorem (t)</span>
              <span className="font-mono font-bold text-base px-2 py-0.5 rounded bg-[#002752] text-white">
                {aliquota}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="1"
              value={aliquota}
              onChange={(e) => setAliquota(Number(e.target.value))}
              className="w-full accent-[#002752] h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Observe que dobrar a alíquota de 10% para 20% quase quadruplica o peso morto (relação exponencial t²).
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-slate-700 font-medium mb-1">
                <span>Elasticidade-Preço da Demanda (|ε_d|)</span>
                <span className="font-mono font-bold text-rose-600">{elasticidadeDemanda.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="3.0"
                step="0.1"
                value={elasticidadeDemanda}
                onChange={(e) => setElasticidadeDemanda(Number(e.target.value))}
                className="w-full accent-rose-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-slate-500">
                {elasticidadeDemanda < 0.8 ? 'Demanda Inelástica (essencial: água, medicamentos)' : 'Demanda Elástica (bens de luxo ou com substitutos)'}
              </span>
            </div>

            <div>
              <div className="flex justify-between text-slate-700 font-medium mb-1">
                <span>Elasticidade-Preço da Oferta (ε_s)</span>
                <span className="font-mono font-bold text-[#00733f]">{elasticidadeOferta.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="3.0"
                step="0.1"
                value={elasticidadeOferta}
                onChange={(e) => setElasticidadeOferta(Number(e.target.value))}
                className="w-full accent-[#00733f] h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Incidência Econômica */}
          <div className="bg-white p-3.5 rounded-lg border border-slate-200 text-xs space-y-2">
            <h5 className="font-bold text-slate-800 flex items-center gap-1.5">
              <Percent className="w-3.5 h-3.5 text-[#ebc000]" />
              Divisão da Carga do Imposto (Incidência de Facto)
            </h5>
            <div className="flex justify-between text-slate-600">
              <span>Preço pago pelo Consumidor (Pc):</span>
              <span className="font-mono font-bold text-rose-700">R$ {precoConsumidor.toFixed(2)} (+R$ {aumentoPrecoConsumidor.toFixed(2)})</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Preço recebido pelo Vendedor (Pv):</span>
              <span className="font-mono font-bold text-[#00733f]">R$ {precoProdutor.toFixed(2)} (-R$ {reducaoPrecoProdutor.toFixed(2)})</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Quantidade Transacionada (Q):</span>
              <span className="font-mono font-bold text-slate-800">{quantidadeComImposto.toFixed(0)} un (-{deltaQ.toFixed(0)} un)</span>
            </div>
          </div>
        </div>

        {/* Visual Graph & Metrics */}
        <div className="lg:col-span-7 space-y-4">
          {/* SVG Supply & Demand Diagram with Harberger Triangle */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col items-center">
            <svg viewBox="0 0 320 220" className="w-full max-w-[440px] overflow-visible">
              {/* Axes */}
              <line x1="40" y1="190" x2="300" y2="190" stroke="#64748b" strokeWidth="1.5" />
              <line x1="40" y1="190" x2="40" y2="20" stroke="#64748b" strokeWidth="1.5" />
              <text x="300" y="205" fontSize="10" fill="#64748b" textAnchor="end">Quantidade (Q)</text>
              <text x="25" y="25" fontSize="10" fill="#64748b">Preço (P)</text>

              {/* Demand curve (downward sloping) */}
              <line x1="50" y1="35" x2="280" y2="185" stroke="#dc2626" strokeWidth="2.5" />
              <text x="285" y="185" fontSize="10" fill="#dc2626" fontWeight="bold">Demanda</text>

              {/* Supply curve (upward sloping) */}
              <line x1="50" y1="185" x2="280" y2="35" stroke="#00733f" strokeWidth="2.5" />
              <text x="285" y="35" fontSize="10" fill="#00733f" fontWeight="bold">Oferta</text>

              {/* Equilibrium without tax: (Q0=165, P0=110) */}
              <circle cx="165" cy="110" r="3.5" fill="#002752" />
              <line x1="40" y1="110" x2="165" y2="110" stroke="#94a3b8" strokeDasharray="3,3" />
              <line x1="165" y1="110" x2="165" y2="190" stroke="#94a3b8" strokeDasharray="3,3" />

              {/* Quantidade Q1 com imposto */}
              {(() => {
                const q1X = 165 - (deltaQ / quantidadeBase) * 110;
                const pcY = 110 - (aumentoPrecoConsumidor / precoBase) * 80;
                const pvY = 110 + (reducaoPrecoProdutor / precoBase) * 80;

                return (
                  <>
                    {/* Arrecadação Retângulo (Verde/Azul) */}
                    <polygon
                      points={`40,${pcY} ${q1X},${pcY} ${q1X},${pvY} 40,${pvY}`}
                      fill="#002752"
                      opacity="0.18"
                    />

                    {/* Triângulo de Peso Morto de Harberger (Dourado/Vermelho) */}
                    <polygon
                      points={`${q1X},${pcY} 165,110 ${q1X},${pvY}`}
                      fill="#ebc000"
                      stroke="#d97706"
                      strokeWidth="1.5"
                      opacity="0.75"
                    />

                    {/* Linhas de preços */}
                    <line x1="40" y1={pcY} x2={q1X} y2={pcY} stroke="#dc2626" strokeDasharray="2,2" />
                    <line x1="40" y1={pvY} x2={q1X} y2={pvY} stroke="#00733f" strokeDasharray="2,2" />
                    <line x1={q1X} y1={pvY} x2={q1X} y2="190" stroke="#475569" strokeDasharray="2,2" />

                    <text x={q1X} y="205" fontSize="9" fill="#1e293b" textAnchor="middle" fontWeight="bold">
                      Q1
                    </text>
                    <text x="35" y={pcY + 3} fontSize="9" fill="#dc2626" textAnchor="end" fontWeight="bold">
                      Pc
                    </text>
                    <text x="35" y={pvY + 3} fontSize="9" fill="#00733f" textAnchor="end" fontWeight="bold">
                      Pv
                    </text>
                    <text x="35" y="113" fontSize="9" fill="#64748b" textAnchor="end">
                      P0
                    </text>

                    {/* DWL Tag */}
                    <text x={q1X + 12} y="113" fontSize="9" fill="#78350f" fontWeight="bold">
                      DWL (Triângulo de Harberger)
                    </text>
                  </>
                );
              })()}
            </svg>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 text-[11px] mt-2">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-[#002752]/30 inline-block rounded-xs"></span>
                Arrecadação Governamental
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-[#ebc000] inline-block rounded-xs"></span>
                Peso Morto (Perda Social Irrecuperável)
              </span>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <div className="flex items-center gap-1 text-slate-500 text-[11px] mb-1">
                <DollarSign className="w-3.5 h-3.5 text-[#00733f]" />
                Arrecadação Fiscal
              </div>
              <span className="text-base font-extrabold text-[#002752] font-mono">
                R$ {arrecadacaoFiscal.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
              </span>
            </div>

            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-center gap-1 text-amber-800 text-[11px] mb-1 font-semibold">
                <TrendingDown className="w-3.5 h-3.5 text-amber-600" />
                Peso Morto (Harberger)
              </div>
              <span className="text-base font-extrabold text-amber-900 font-mono">
                R$ {pesoMortoHarberger.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 col-span-2 sm:col-span-1">
              <div className="flex items-center gap-1 text-slate-500 text-[11px] mb-1">
                <Layers className="w-3.5 h-3.5 text-[#002752]" />
                Custo de Eficiência
              </div>
              <span className="text-base font-extrabold text-slate-900 font-mono">
                {razaoPesoMortoArrecadacao.toFixed(1)}%
              </span>
              <span className="block text-[10px] text-slate-500">do total arrecadado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
