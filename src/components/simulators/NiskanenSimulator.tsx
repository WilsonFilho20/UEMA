import React, { useState } from 'react';
import { Building2, TrendingUp, AlertCircle } from 'lucide-react';

export const NiskanenSimulator: React.FC = () => {
  // Parâmetros das funções de Benefício e Custo:
  // Demanda/Avaliação do Parlamento: BMg = a - b*Q => BT = a*Q - 0.5*b*Q²
  // Custo da agência: CMg = c + d*Q => CT = c*Q + 0.5*d*Q²
  const [demandaIntercepto, setDemandaIntercepto] = useState<number>(120); // a
  const [custoInclinacao] = useState<number>(0.6); // d
  const [grauMonopolioBurocrata, setGrauMonopolioBurocrata] = useState<number>(100); // 0% = parlamento pleno (BMg=CMg), 100% = Niskanen puro (BT=CT)

  const a = demandaIntercepto;
  const b = 0.8;
  const c = 20;
  const d = custoInclinacao;

  // 1. Ótimo Social: BMg = CMg
  // a - b*Q = c + d*Q => (b + d)*Q = a - c => Q_otimo = (a - c) / (b + d)
  const qOtimo = Math.max(0, (a - c) / (b + d));
  const btOtimo = a * qOtimo - 0.5 * b * qOtimo * qOtimo;
  const ctOtimo = c * qOtimo + 0.5 * d * qOtimo * qOtimo;
  const excedenteOtimo = btOtimo - ctOtimo;

  // 2. Equilíbrio Puro de Niskanen: BT = CT
  // a*Q - 0.5*b*Q² = c*Q + 0.5*d*Q² => (a - c)*Q = 0.5*(b + d)*Q² => Q_niskanen = 2 * (a - c) / (b + d) = 2 * Q_otimo!
  const qNiskanenPuro = 2 * qOtimo;
  const btNiskanenPuro = a * qNiskanenPuro - 0.5 * b * qNiskanenPuro * qNiskanenPuro;
  const ctNiskanenPuro = c * qNiskanenPuro + 0.5 * d * qNiskanenPuro * qNiskanenPuro;

  // Alocação intermediária baseada no grau de monopólio informacional do burocrata
  const pesoBurocrata = grauMonopolioBurocrata / 100;
  const qAtual = qOtimo + pesoBurocrata * (qNiskanenPuro - qOtimo);
  const btAtual = a * qAtual - 0.5 * b * qAtual * qAtual;
  const ctAtual = c * qAtual + 0.5 * d * qAtual * qAtual;
  const excedenteAtual = btAtual - ctAtual;
  const ineficienciaSocial = excedenteOtimo - excedenteAtual;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden" id="simulador-niskanen">
      <div className="bg-[#002752] text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ebc000] text-[#002752] mb-1">
            Aula 9 • Teoria da Escolha Pública (Niskanen, 1971)
          </span>
          <h3 className="text-lg sm:text-xl font-bold font-serif tracking-tight">
            Animação do Modelo de Niskanen: Maximização Orçamentária (BT = CT)
          </h3>
          <p className="text-xs sm:text-sm text-slate-200">
            A burocracia governamental, assimetria de informação e apropriação do excedente do consumidor
          </p>
        </div>
      </div>

      <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-4 text-xs">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-800">Assimetria de Informação e Poder Burocrático</span>
              <span className="font-mono font-bold px-2 py-0.5 rounded bg-[#002752] text-white">
                {grauMonopolioBurocrata}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={grauMonopolioBurocrata}
              onChange={(e) => setGrauMonopolioBurocrata(Number(e.target.value))}
              className="w-full accent-[#002752] h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>0% (Parlamento Informado: BMg = CMg)</span>
              <span>100% (Monopólio Puro: BT = CT)</span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
            <div className="flex justify-between text-slate-700">
              <span>Valorização Política do Serviço (Demanda Parlamentar)</span>
              <span className="font-mono font-bold">{demandaIntercepto}</span>
            </div>
            <input
              type="range"
              min="80"
              max="160"
              step="5"
              value={demandaIntercepto}
              onChange={(e) => setDemandaIntercepto(Number(e.target.value))}
              className="w-full accent-[#00733f] h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Theoretical Breakdown */}
          <div className="bg-amber-50 p-3.5 rounded-lg border border-amber-200 text-amber-950 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              O Teorema da Duplicação de Niskanen
            </div>
            <p className="text-[11px] leading-relaxed">
              Sob curvas lineares, o burocrata puro que maximiza o orçamento (BT = CT) fornece exatamente o <strong>DOBRO</strong> da quantidade socialmente ótima (Q_Niskanen = 2 × Q_Ótimo), esgotando todo o benefício líquido da sociedade em custos operacionais e contratação de assessores.
            </p>
          </div>
        </div>

        {/* Visual Graph & Comparison */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col items-center">
            {/* SVG Budget Curve representation */}
            <svg viewBox="0 0 320 180" className="w-full max-w-[440px] overflow-visible">
              <line x1="30" y1="150" x2="290" y2="150" stroke="#64748b" strokeWidth="1.5" />
              <line x1="30" y1="150" x2="30" y2="20" stroke="#64748b" strokeWidth="1.5" />
              <text x="290" y="165" fontSize="9" fill="#64748b" textAnchor="end">Tamanho do Setor Público (Q)</text>
              <text x="20" y="20" fontSize="9" fill="#64748b">Orçamento Total (R$)</text>

              {/* Benefício Total (Parábola côncava) */}
              <path
                d="M 30,150 Q 140,20 270,150"
                fill="none"
                stroke="#00733f"
                strokeWidth="2.5"
              />
              <text x="140" y="32" fontSize="9" fill="#00733f" fontWeight="bold">
                Benefício Total (BT)
              </text>

              {/* Custo Total (Parábola convexa) */}
              <path
                d="M 30,150 Q 150,130 270,40"
                fill="none"
                stroke="#dc2626"
                strokeWidth="2.5"
              />
              <text x="250" y="32" fontSize="9" fill="#dc2626" fontWeight="bold">
                Custo Total (CT)
              </text>

              {/* Ponto Ótimo Social (Q_otimo ~ 110) */}
              <line x1="110" y1="150" x2="110" y2="52" stroke="#002752" strokeDasharray="3,3" />
              <circle cx="110" cy="52" r="3" fill="#002752" />
              <text x="110" y="165" fontSize="8" fill="#002752" textAnchor="middle" fontWeight="bold">
                Q* (Ótimo Social)
              </text>

              {/* Ponto Niskanen (BT=CT ~ 210) */}
              <line x1="210" y1="150" x2="210" y2="78" stroke="#d97706" strokeDasharray="3,3" />
              <circle cx="210" cy="78" r="3.5" fill="#d97706" />
              <text x="210" y="165" fontSize="8" fill="#d97706" textAnchor="middle" fontWeight="bold">
                Q_Niskanen (BT = CT)
              </text>

              {/* Posição Atual */}
              {(() => {
                const currentX = 110 + pesoBurocrata * 100;
                return (
                  <>
                    <line x1={currentX} y1="25" x2={currentX} y2="150" stroke="#002752" strokeWidth="2" />
                    <text x={currentX} y="20" fontSize="8" fill="#002752" textAnchor="middle" fontWeight="bold">
                      Equilíbrio Atual ({qAtual.toFixed(0)} un)
                    </text>
                  </>
                );
              })()}
            </svg>
          </div>

          {/* Metrics comparison */}
          <div className="grid grid-cols-3 gap-2.5 text-xs text-center">
            <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
              <span className="text-emerald-800 text-[10px] block font-bold uppercase tracking-wider">Ótimo Social (BMg=CMg)</span>
              <span className="text-base font-extrabold text-emerald-950 font-mono">{qOtimo.toFixed(0)} un</span>
              <span className="text-[10px] text-emerald-700 block">Excedente: R$ {excedenteOtimo.toFixed(0)}</span>
            </div>

            <div className="p-2.5 bg-[#002752]/5 rounded-lg border border-[#002752]/20">
              <span className="text-[#002752] text-[10px] block font-bold uppercase tracking-wider">Alocação Atual</span>
              <span className="text-base font-extrabold text-[#002752] font-mono">{qAtual.toFixed(0)} un</span>
              <span className="text-[10px] text-slate-600 block">Excedente: R$ {excedenteAtual.toFixed(0)}</span>
            </div>

            <div className="p-2.5 bg-rose-50 rounded-lg border border-rose-200">
              <span className="text-rose-800 text-[10px] block font-bold uppercase tracking-wider">Niskanen (BT=CT)</span>
              <span className="text-base font-extrabold text-rose-950 font-mono">{qNiskanenPuro.toFixed(0)} un</span>
              <span className="text-[10px] text-rose-600 block">Excedente: R$ 0,00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
