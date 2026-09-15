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
