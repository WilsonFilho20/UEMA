import React, { useState } from 'react';
import { DollarSign, ShieldAlert, BarChart3, HelpCircle } from 'lucide-react';

export const MonopolySimulator: React.FC = () => {
  // Custo Fixo elevado (rede de saneamento ou distribuição elétrica)
  const [custoFixo, setCustoFixo] = useState<number>(500);
  // Custo Marginal constante (ex: R$ 10 por m³ ou MWh)
  const [custoMarginal, setCustoMarginal] = useState<number>(10);
  // Demanda: P = 80 - 0.5 * Q => Q = (80 - P) / 0.5
  const precoMax = 80;
  const inclinacao = 0.5;

  // 1. Cenário Monopólio Não Regulado (Maximizador de Lucro RMg = CMg)
  // RMg = 80 - 1.0 * Q => 80 - Q = CMg => Q_mono = 80 - CMg
  const qMonopolio = Math.max(0, (precoMax - custoMarginal) / (2 * inclinacao));
  const pMonopolio = precoMax - inclinacao * qMonopolio;
  const cmeMonopolio = custoFixo / qMonopolio + custoMarginal;
  const lucroMonopolio = (pMonopolio - cmeMonopolio) * qMonopolio;
  const pesoMortoMonopolio = 0.5 * (pMonopolio - custoMarginal) * (((precoMax - custoMarginal) / inclinacao) - qMonopolio);

  // 2. Cenário First-Best (P = CMg - Eficiência de Pareto pura)
  const pFirstBest = custoMarginal;
  const qFirstBest = (precoMax - pFirstBest) / inclinacao;
  const cmeFirstBest = custoFixo / qFirstBest + custoMarginal;
  const deficitFirstBest = (pFirstBest - cmeFirstBest) * qFirstBest; // Valor negativo (prejuízo da firma)
  const pesoMortoFirstBest = 0;

  // 3. Cenário Second-Best (P = CMe - Equilíbrio Orçamentário sem Subsídio)
  // P = 80 - 0.5 * Q = 500/Q + CMg => 80Q - 0.5Q² = 500 + CMg*Q
  // 0.5Q² - (80 - CMg)Q + 500 = 0
  const bSecond = -(precoMax - custoMarginal);
  const deltaSecond = bSecond * bSecond - 4 * 0.5 * custoFixo;
  let qSecondBest = 0;
  let pSecondBest = 0;
  if (deltaSecond >= 0) {
    qSecondBest = (-bSecond + Math.sqrt(deltaSecond)) / (2 * 0.5);
    pSecondBest = precoMax - inclinacao * qSecondBest;
  }
  const pesoMortoSecondBest = 0.5 * (pSecondBest - custoMarginal) * (qFirstBest - qSecondBest);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden" id="simulador-monopolio">
      <div className="bg-[#002752] text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ebc000] text-[#002752] mb-1">
            Aula 4 • Monopólio Natural e Teoria do Second Best
          </span>
          <h3 className="text-lg sm:text-xl font-bold font-serif tracking-tight">
            Tabela Comparativa de Precificação Regulatória (P=CMg vs P=CMe)
          </h3>
          <p className="text-xs sm:text-sm text-slate-200">
            Subaditividade de custos, déficit operacional em First-Best e Teoria da Captura (Stiglitz & Rosengard, 2016; Arrow, 1996)
          </p>
        </div>
      </div>

      <div className="p-5 space-y-6">
        {/* Sliders */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <div className="flex justify-between text-slate-700 font-medium mb-1">
              <span>Custo Fixo de Infraestrutura (Rede)</span>
              <span className="font-mono font-bold text-[#002752]">R$ {custoFixo}</span>
            </div>
            <input
              type="range"
              min="100"
              max="1200"
              step="50"
              value={custoFixo}
              onChange={(e) => setCustoFixo(Number(e.target.value))}
              className="w-full accent-[#002752] h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <p className="text-[10px] text-slate-500 mt-1">Ex: gasodutos, trilhos, saneamento básico</p>
          </div>

          <div>
            <div className="flex justify-between text-slate-700 font-medium mb-1">
              <span>Custo Marginal Operacional (CMg)</span>
              <span className="font-mono font-bold text-[#00733f]">R$ {custoMarginal}</span>
            </div>
            <input
              type="range"
              min="5"
              max="35"
              step="1"
              value={custoMarginal}
              onChange={(e) => setCustoMarginal(Number(e.target.value))}
              className="w-full accent-[#00733f] h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <p className="text-[10px] text-slate-500 mt-1">Custo unitário de bombeamento de água ou energia adicional</p>
          </div>
        </div>

        {/* Interactive SVG Microeconomic Diagram */}
        <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 text-white space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#ebc000] font-bold block">
                Gráfico Interativo de Equilíbrio Microeconômico & Regulação
              </span>
              <h4 className="text-sm font-bold text-white">
                Curvas de Demanda, RMg, Custo Marginal e Custo Médio Decrescente
              </h4>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono">
              <span className="flex items-center gap-1.5 text-blue-400">
                <span className="w-2.5 h-0.5 bg-blue-400 inline-block" /> Demanda
              </span>
              <span className="flex items-center gap-1.5 text-indigo-300">
                <span className="w-2.5 h-0.5 bg-indigo-300 inline-block" /> RMg
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-0.5 bg-emerald-400 inline-block" /> CMg
              </span>
              <span className="flex items-center gap-1.5 text-amber-400">
                <span className="w-2.5 h-0.5 bg-amber-400 inline-block" /> CMe
              </span>
            </div>
          </div>

          <div className="w-full overflow-x-auto bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
            <svg viewBox="0 0 650 320" className="w-full max-w-3xl mx-auto select-none font-sans text-xs">
              <defs>
                <linearGradient id="areaPrejuizo" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="60" y1="20" x2="60" y2="270" stroke="#334155" strokeWidth="1.5" />
              <line x1="60" y1="270" x2="620" y2="270" stroke="#334155" strokeWidth="1.5" />

              {/* Axis Labels */}
              <text x="50" y="25" textAnchor="end" fill="#94a3b8" fontSize="10" fontWeight="bold">Preço (R$)</text>
              <text x="615" y="290" textAnchor="end" fill="#94a3b8" fontSize="10" fontWeight="bold">Quantidade (Q)</text>

              {/* Dynamic Coordinate Mappers */}
              {/* Max P = 90 => y: 20 + (90 - P) * (250 / 90) */}
              {/* Max Q = 160 => x: 60 + Q * (550 / 160) */}
              {(() => {
                const mapX = (q: number) => 60 + (q / 150) * 540;
                const mapY = (p: number) => 270 - (p / 90) * 240;

                // Demand Line: from (0, 80) to (150, 5)
                const dX1 = mapX(0);
                const dY1 = mapY(80);
                const dX2 = mapX(145);
                const dY2 = mapY(80 - 0.5 * 145);

                // RMg Line: from (0, 80) to (75, 5)
                const rX1 = mapX(0);
                const rY1 = mapY(80);
                const rX2 = mapX(75);
                const rY2 = mapY(80 - 1.0 * 75);

                // CMg Line (horizontal at custoMarginal)
                const cmgY = mapY(custoMarginal);

                // CMe points path
                const cmePoints: string[] = [];
                for (let q = 10; q <= 150; q += 5) {
                  const pVal = custoFixo / q + custoMarginal;
                  if (pVal <= 90) {
                    cmePoints.push(`${mapX(q)},${mapY(pVal)}`);
                  }
                }
                const cmePath = cmePoints.length > 0 ? `M ${cmePoints.join(' L ')}` : '';

                // Points coordinates
                const monoX = mapX(qMonopolio);
                const monoY = mapY(pMonopolio);

                const fbX = mapX(qFirstBest);
                const fbY = mapY(pFirstBest);

                const sbX = mapX(qSecondBest);
                const sbY = mapY(pSecondBest);

                return (
                  <g>
                    {/* Linha de Custo Marginal */}
                    <line x1="60" y1={cmgY} x2="600" y2={cmgY} stroke="#10b981" strokeWidth="2.5" strokeDasharray="5,4" />
                    <text x="590" y={cmgY - 6} fill="#10b981" fontSize="10" fontWeight="bold">CMg = R$ {custoMarginal}</text>

                    {/* Curva de Demanda */}
                    <line x1={dX1} y1={dY1} x2={dX2} y2={dY2} stroke="#60a5fa" strokeWidth="3" />
                    <text x={dX2 - 10} y={dY2 - 8} fill="#60a5fa" fontSize="10" fontWeight="bold">D: P=80-0.5Q</text>

                    {/* Curva de RMg */}
                    <line x1={rX1} y1={rY1} x2={rX2} y2={rY2} stroke="#a5b4fc" strokeWidth="2" strokeDasharray="4,3" />
                    <text x={rX2 + 5} y={rY2 + 10} fill="#a5b4fc" fontSize="9">RMg</text>

                    {/* Curva de Custo Médio CMe */}
                    {cmePath && <path d={cmePath} fill="none" stroke="#fbbf24" strokeWidth="3" />}
                    <text x="520" y={mapY(custoFixo / 130 + custoMarginal) - 8} fill="#fbbf24" fontSize="10" fontWeight="bold">
                      CMe = {custoFixo}/Q + {custoMarginal}
                    </text>

                    {/* Projeções Tracejadas para o Monopólio */}
                    <line x1={monoX} y1={monoY} x2={monoX} y2="270" stroke="#f43f5e" strokeDasharray="3,3" />
                    <line x1="60" y1={monoY} x2={monoX} y2={monoY} stroke="#f43f5e" strokeDasharray="3,3" />

                    {/* Projeções Tracejadas para First-Best */}
                    <line x1={fbX} y1={fbY} x2={fbX} y2="270" stroke="#38bdf8" strokeDasharray="3,3" />

                    {/* Projeções Tracejadas para Second-Best */}
                    {qSecondBest > 0 && (
                      <>
                        <line x1={sbX} y1={sbY} x2={sbX} y2="270" stroke="#f59e0b" strokeDasharray="3,3" />
                        <line x1="60" y1={sbY} x2={sbX} y2={sbY} stroke="#f59e0b" strokeDasharray="3,3" />
                      </>
                    )}

                    {/* Ponto 1: Monopólio Não Regulado */}
                    <circle cx={monoX} cy={monoY} r="6" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />
                    <g transform={`translate(${monoX - 45}, ${monoY - 26})`}>
                      <rect width="90" height="20" rx="4" fill="#f43f5e" />
                      <text x="45" y="14" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                        Monopólio ({qMonopolio.toFixed(0)}, R${pMonopolio.toFixed(0)})
                      </text>
                    </g>

                    {/* Ponto 2: First-Best (P = CMg) */}
                    <circle cx={fbX} cy={fbY} r="6" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
                    <g transform={`translate(${fbX - 45}, ${fbY - 26})`}>
                      <rect width="90" height="20" rx="4" fill="#0284c7" />
                      <text x="45" y="14" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                        1º Best ({qFirstBest.toFixed(0)}, R${pFirstBest.toFixed(0)})
                      </text>
                    </g>

                    {/* Ponto 3: Second-Best (P = CMe) */}
                    {qSecondBest > 0 && (
                      <>
                        <circle cx={sbX} cy={sbY} r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                        <g transform={`translate(${sbX - 45}, ${sbY - 26})`}>
                          <rect width="90" height="20" rx="4" fill="#d97706" />
                          <text x="45" y="14" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                            2º Best ({qSecondBest.toFixed(0)}, R${pSecondBest.toFixed(0)})
                          </text>
                        </g>
                      </>
                    )}
                  </g>
                );
              })()}
            </svg>
          </div>
          <p className="text-[11px] text-slate-400 text-center">
            Arraste os controles de Custo Fixo e Custo Marginal acima para ver o deslocamento dinâmico do Custo Médio e o impacto no ponto de Second Best.
          </p>
        </div>

        {/* Comparative Pricing Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-[#002752] text-white">
              <tr>
                <th className="p-3">Regime Regulatório</th>
                <th className="p-3">Regra de Preço</th>
                <th className="p-3">Preço (P)</th>
                <th className="p-3">Qtd Produzida (Q)</th>
                <th className="p-3">Custo Médio (CMe)</th>
                <th className="p-3">Resultado da Firma</th>
                <th className="p-3">Perda de Peso Morto</th>
                <th className="p-3">Viabilidade Financeira</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {/* Monopólio Privado Livre */}
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-500" />
                  Monopólio Desregulado
                </td>
                <td className="p-3 font-mono text-slate-600">RMg = CMg</td>
                <td className="p-3 font-mono font-bold text-slate-900">R$ {pMonopolio.toFixed(2)}</td>
                <td className="p-3 font-mono">{qMonopolio.toFixed(1)} un</td>
                <td className="p-3 font-mono text-slate-600">R$ {cmeMonopolio.toFixed(2)}</td>
                <td className="p-3 font-mono font-bold text-[#00733f]">+ R$ {lucroMonopolio.toFixed(2)}</td>
                <td className="p-3 font-mono text-rose-600 font-bold">R$ {pesoMortoMonopolio.toFixed(2)}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-medium">
                    Superávit Alto
                  </span>
                </td>
              </tr>

              {/* First-Best: P = CMg */}
              <tr className="bg-sky-50/50 hover:bg-sky-50">
                <td className="p-3 font-semibold text-[#002752] flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4 text-sky-600" />
                  First-Best (Ótimo de Pareto)
                </td>
                <td className="p-3 font-mono font-bold text-[#002752]">P = CMg</td>
                <td className="p-3 font-mono font-bold text-[#002752]">R$ {pFirstBest.toFixed(2)}</td>
                <td className="p-3 font-mono font-bold text-[#002752]">{qFirstBest.toFixed(1)} un</td>
                <td className="p-3 font-mono text-slate-600">R$ {cmeFirstBest.toFixed(2)}</td>
                <td className="p-3 font-mono font-bold text-rose-600">- R$ {Math.abs(deficitFirstBest).toFixed(2)}</td>
                <td className="p-3 font-mono text-[#00733f] font-bold">R$ 0,00 (Zero)</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[11px] font-medium" title="Requer subsídio fiscal pago pelo tesouro público">
                    Déficit Contínuo
                  </span>
                </td>
              </tr>

              {/* Second-Best: P = CMe */}
              <tr className="bg-amber-50/50 hover:bg-amber-50">
                <td className="p-3 font-semibold text-amber-900 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-amber-600" />
                  Second-Best (Sustentabilidade)
                </td>
                <td className="p-3 font-mono font-bold text-amber-900">P = CMe</td>
                <td className="p-3 font-mono font-bold text-amber-900">R$ {pSecondBest.toFixed(2)}</td>
                <td className="p-3 font-mono">{qSecondBest.toFixed(1)} un</td>
                <td className="p-3 font-mono text-slate-600">R$ {pSecondBest.toFixed(2)}</td>
                <td className="p-3 font-mono font-bold text-slate-700">R$ 0,00 (Lucro Normal)</td>
                <td className="p-3 font-mono text-amber-700 font-semibold">R$ {pesoMortoSecondBest.toFixed(2)}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-medium">
                    Autossuficiente
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Analytical Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
            <h5 className="font-bold text-[#002752] mb-1.5 flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-[#ebc000]" />
              O Dilema da Regulação: Por que P = CMg gera Prejuízo?
            </h5>
            <p className="text-slate-600 leading-relaxed">
              No monopólio natural, o Custo Marginal está sempre abaixo do Custo Médio devido às intensas economias de escala (subaditividade de custos). Quando o governo impõe a regra de Primeiro Melhor (P = CMg), a receita auferida não cobre os Custos Fixos de infraestrutura, gerando um déficit financeiro de <strong>R$ {Math.abs(deficitFirstBest).toFixed(2)}</strong>.
            </p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
            <h5 className="font-bold text-[#002752] mb-1.5 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-[#00733f]" />
              Solução de Segundo Melhor e Tarifa em Duas Partes
            </h5>
            <p className="text-slate-600 leading-relaxed">
              Para evitar o dreno sobre o orçamento fiscal com subsídios contínuos, os órgãos reguladores adotam a regra de <strong>Second Best (P = CMe)</strong> ou a <strong>Tarifa em Duas Partes</strong>: cobra-se uma taxa fixa para amortizar o custo de infraestrutura e uma tarifa volumétrica correspondente ao Custo Marginal (Arrow, 1996; Arvate & Biderman, 2004).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
