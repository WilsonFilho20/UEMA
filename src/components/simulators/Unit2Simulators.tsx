import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, Info, AlertTriangle, ArrowRight, ShieldAlert, Sparkles, TrendingDown } from 'lucide-react';

// =========================================================================
// 1. SIMULADOR DE IMPOSTO PIGOUVIANO vs REGULAÇÃO DE EXTERNALIDADES (AULA 3)
// =========================================================================
export const PigouSimulator: React.FC = () => {
  const [danoMarginal, setDanoMarginal] = useState<number>(30); // R$/unidade emitida
  const [impostoAplicado, setImpostoAplicado] = useState<number>(30); // t = 30
  const [demandaElasticidade, setDemandaElasticidade] = useState<number>(1.2);

  // Mercado não regulado: Q_mercado = 100, P_mercado = 50
  // Custo Marginal Social = Custo Marginal Privado + Dano Marginal
  // Equilíbrio Socialmente Ótimo Q*: Q* = 100 - (danoMarginal * 1.0)
  const qMercadoLivre = 100;
  const qOtimoSocial = Math.max(20, Math.round(100 - danoMarginal * 1.1));
  const qComImposto = Math.max(20, Math.round(100 - impostoAplicado * (demandaElasticidade * 0.9)));

  const arrecadacaoPigou = (impostoAplicado * qComImposto).toFixed(0);
  const pesoMortoResidual = Math.abs(qComImposto - qOtimoSocial) * Math.abs(impostoAplicado - danoMarginal) * 0.5;
  const reducaoPoluicao = Math.round(((qMercadoLivre - qComImposto) / qMercadoLivre) * 100);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden" id="simulador-pigou">
      <div className="bg-[#002752] text-white p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ebc000] text-[#002752] mb-1">
            Aula 03 • Externalidades Negativas e Instrumentos de Correção
          </span>
          <h3 className="text-xl font-bold font-serif tracking-tight">
            Simulador de Imposto Pigouviano (Arthur C. Pigou, 1920)
          </h3>
          <p className="text-xs sm:text-sm text-slate-200">
            Internalize o custo marginal externo da poluição e observe a convergência para o equilíbrio socialmente ótimo.
          </p>
        </div>
        <button
          onClick={() => setImpostoAplicado(danoMarginal)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00733f] hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition-colors"
        >
          <CheckCircle2 className="w-4 h-4 text-[#ebc000]" />
          Calibrar Alíquota Ótima de Pigou (t* = DMg)
        </button>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-[#002752]">
              <span>Dano Marginal Externo (DMg da Poluição):</span>
              <span className="font-mono text-rose-700 font-black">R$ {danoMarginal}/ton</span>
            </div>
            <input
              type="range"
              min={10}
              max={60}
              value={danoMarginal}
              onChange={(e) => setDanoMarginal(Number(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Custo suportado por terceiros (saúde pública, degradação hídrica) não contabilizado pela firma.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-[#002752]">
              <span>Alíquota do Tributo Ambiental de Pigou (t):</span>
              <span className="font-mono text-[#00733f] font-black">R$ {impostoAplicado}/ton</span>
            </div>
            <input
              type="range"
              min={0}
              max={60}
              value={impostoAplicado}
              onChange={(e) => setImpostoAplicado(Number(e.target.value))}
              className="w-full accent-[#00733f] cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Imposto por unidade poluidora recolhido pelo Ministério da Fazenda / Secretaria de Fazenda.
            </p>
          </div>
        </div>

        {/* Comparativo de Equilíbrios */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[11px] text-slate-500 uppercase font-semibold block">Qtd Mercado Livre</span>
            <span className="text-2xl font-black text-slate-700 mt-1 block">{qMercadoLivre} mil un.</span>
            <span className="text-[10px] text-rose-600 font-bold">Sobreprodução ineficiente</span>
          </div>

          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200">
            <span className="text-[11px] text-emerald-800 uppercase font-semibold block">Qtd Socialmente Ótima (Q*)</span>
            <span className="text-2xl font-black text-[#00733f] mt-1 block">{qOtimoSocial} mil un.</span>
            <span className="text-[10px] text-emerald-700 font-bold">CMg Social = Benefício</span>
          </div>

          <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200">
            <span className="text-[11px] text-blue-800 uppercase font-semibold block">Qtd com Tributo</span>
            <span className="text-2xl font-black text-[#002752] mt-1 block">{qComImposto} mil un.</span>
            <span className="text-[10px] text-blue-700 font-bold">Redução de {reducaoPoluicao}% na emissão</span>
          </div>

          <div className="p-3.5 bg-purple-50 rounded-xl border border-purple-200">
            <span className="text-[11px] text-purple-800 uppercase font-semibold block">Receita Fiscal Arrecadada</span>
            <span className="text-2xl font-black text-purple-950 mt-1 block">R$ {arrecadacaoPigou} mil</span>
            <span className="text-[10px] text-purple-700 font-bold">Duplo dividendo ecológico</span>
          </div>
        </div>

        {pesoMortoResidual > 5 && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>
              <strong>Distorção Remanescente:</strong> O tributo atual (R$ {impostoAplicado}) difere do dano marginal real (R$ {danoMarginal}), gerando perda de peso morto de R$ {pesoMortoResidual.toFixed(1)} mil. Ajuste para t* = DMg para eliminar a ineficiência.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// =========================================================================
// 2. SIMULADOR DA CONDIÇÃO DE SAMUELSON & CARONA (AULA 4 e 5)
// =========================================================================
export const SamuelsonSimulator: React.FC = () => {
  const [wtpA, setWtpA] = useState<number>(35); // Disposição a pagar do Cidadão A (R$)
  const [wtpB, setWtpB] = useState<number>(45); // Disposição a pagar do Cidadão B (R$)
  const [wtpC, setWtpC] = useState<number>(20); // Disposição a pagar do Cidadão C (R$)
  const [custoMarginal, setCustoMarginal] = useState<number>(80); // Custo Marginal de Provisão (TMT)
  const [declaracaoCarona, setDeclaracaoCarona] = useState<boolean>(false);

  // Soma Vertical das Demandas: ∑ TMS = TMS_A + TMS_B + TMS_C
  const somaTMS = declaracaoCarona ? wtpA + wtpB + 0 : wtpA + wtpB + wtpC;
  const viavelSocialmente = somaTMS >= custoMarginal;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden" id="simulador-samuelson">
      <div className="bg-[#002752] text-white p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ebc000] text-[#002752] mb-1">
            Aula 04 e 05 • Bens Públicos Puros e Carona
          </span>
          <h3 className="text-xl font-bold font-serif tracking-tight">
            Condição de Samuelson: Soma Vertical das Demandas (∑ TMS = TMT)
          </h3>
          <p className="text-xs sm:text-sm text-slate-200">
            Diferentemente de bens privados (soma horizontal), bens não rivais exigem soma vertical da disposição marginal a pagar.
          </p>
        </div>
        <button
          onClick={() => setDeclaracaoCarona(!declaracaoCarona)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
            declaracaoCarona ? 'bg-rose-600 text-white' : 'bg-slate-700 text-white hover:bg-slate-600'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-[#ebc000]" />
          {declaracaoCarona ? 'Desativar Comportamento Carona' : 'Simular Carona (Cidadão C Oculta WTP)'}
        </button>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <span className="text-xs font-bold text-[#002752] block">Cidadão A (TMS_A): R$ {wtpA}</span>
            <input
              type="range"
              min={5}
              max={60}
              value={wtpA}
              onChange={(e) => setWtpA(Number(e.target.value))}
              className="w-full accent-[#002752]"
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <span className="text-xs font-bold text-[#00733f] block">Cidadão B (TMS_B): R$ {wtpB}</span>
            <input
              type="range"
              min={5}
              max={60}
              value={wtpB}
              onChange={(e) => setWtpB(Number(e.target.value))}
              className="w-full accent-[#00733f]"
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <span className="text-xs font-bold text-purple-900 block">
              Cidadão C (TMS_C): {declaracaoCarona ? 'R$ 0 (Declara falso)' : `R$ ${wtpC}`}
            </span>
            <input
              type="range"
              min={5}
              max={60}
              disabled={declaracaoCarona}
              value={wtpC}
              onChange={(e) => setWtpC(Number(e.target.value))}
              className="w-full accent-purple-800 disabled:opacity-30"
            />
          </div>
        </div>

        {/* Comparativo de Samuelson */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-500 uppercase block font-semibold">
              Soma Vertical Agregada (∑ TMS):
            </span>
            <span className="text-3xl font-black text-[#002752] mt-0.5 block font-mono">
              R$ {somaTMS}
            </span>
          </div>

          <div>
            <span className="text-xs text-slate-500 uppercase block font-semibold">
              Custo Marginal de Provisão (TMT):
            </span>
            <span className="text-3xl font-black text-slate-700 mt-0.5 block font-mono">
              R$ {custoMarginal}
            </span>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-500 uppercase block font-semibold">
              Decisão de Provisão Pública:
            </span>
            <span className={`text-base font-black px-3 py-1 rounded-lg inline-block mt-1 ${
              viavelSocialmente ? 'bg-emerald-100 text-[#00733f]' : 'bg-rose-100 text-rose-700'
            }`}>
              {viavelSocialmente ? 'Viável (∑ TMS ≥ TMT)' : 'Inviabilizado pelo Carona (Subprovisão)'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 3. SIMULADOR DE INFORMAÇÃO ASSIMÉTRICA: SELEÇÃO ADVERSA E RISCO MORAL (AULA 5)
// =========================================================================
export const AsymmetricInfoSimulator: React.FC = () => {
  const [obrigatoriedadeSeguro, setObrigatoriedadeSeguro] = useState<boolean>(true);
  const [premioSeguro, setPremioSeguro] = useState<number>(450); // R$/mês
  const [coparticipacao, setCoparticipacao] = useState<number>(20); // % para inibir risco moral

  // Se o seguro é voluntário: apenas pessoas de alto risco compram, gerando a "espiral da morte"
  const proporcaoAltoRisco = obrigatoriedadeSeguro ? 25 : 75; // %
  const sinistralidadeEsperada = Math.round(proporcaoAltoRisco * 12 + (100 - coparticipacao) * 2.5);
  const sustentabilidadeFundo = obrigatoriedadeSeguro && coparticipacao >= 15 ? 'Equilibrado' : 'Déficit Atuarial Crítico';

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden" id="simulador-informacao-assimetrica">
      <div className="bg-[#002752] text-white p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ebc000] text-[#002752] mb-1">
            Aula 05 • Informação Assimétrica na Seguridade Social
          </span>
          <h3 className="text-xl font-bold font-serif tracking-tight">
            Seleção Adversa (Akerlof) & Risco Moral na Previdência e Saúde
          </h3>
          <p className="text-xs sm:text-sm text-slate-200">
            Descubra a justificativa econômica da adesão obrigatória ao Regime Geral de Previdência Social (RGPS) e ao SUS.
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-[#002752] block uppercase">
              Regime de Adesão:
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setObrigatoriedadeSeguro(true)}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold ${
                  obrigatoriedadeSeguro ? 'bg-[#002752] text-white' : 'bg-white border text-slate-700'
                }`}
              >
                Público / Obrigatório (RGPS / SUS)
              </button>
              <button
                type="button"
                onClick={() => setObrigatoriedadeSeguro(false)}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold ${
                  !obrigatoriedadeSeguro ? 'bg-rose-700 text-white' : 'bg-white border text-slate-700'
                }`}
              >
                Privado / Voluntário (Mercado Livre)
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              No modelo voluntário, os indivíduos saudáveis fogem do plano, elevando o prêmio e expulsando mais pessoas (Espiral da Morte).
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-[#00733f]">
              <span>Controle de Risco Moral (Coparticipação / Franquia):</span>
              <span className="font-mono">{coparticipacao}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={50}
              value={coparticipacao}
              onChange={(e) => setCoparticipacao(Number(e.target.value))}
              className="w-full accent-[#00733f]"
            />
            <p className="text-[11px] text-slate-500">
              Inibe o consumo excessivo ou descuidado de serviços quando o custo marginal aparente é zero.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <span className="text-xs text-slate-500 uppercase block">Composição do Pool</span>
            <span className="text-2xl font-black text-[#002752] mt-1 block">
              {proporcaoAltoRisco}% Alto Risco
            </span>
            <span className="text-[10px] text-slate-400">{100 - proporcaoAltoRisco}% Baixo Risco</span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <span className="text-xs text-slate-500 uppercase block">Índice de Sinistralidade</span>
            <span className="text-2xl font-black text-rose-700 mt-1 block font-mono">
              {sinistralidadeEsperada} pts
            </span>
            <span className="text-[10px] text-slate-400">Gastos com sinistros</span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <span className="text-xs text-slate-500 uppercase block">Diagnóstico Atuarial</span>
            <span className={`text-sm font-bold mt-2 block ${
              sustentabilidadeFundo === 'Equilibrado' ? 'text-[#00733f]' : 'text-rose-700'
            }`}>
              {sustentabilidadeFundo}
            </span>
            <span className="text-[10px] text-slate-400">Sustentabilidade intertemporal</span>
          </div>
        </div>
      </div>
    </div>
  );
};
