import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, Info, Percent, TrendingUp, AlertTriangle, Scale, ShieldCheck, ArrowRight } from 'lucide-react';

// =========================================================================
// 1. SIMULADOR DE INCIDÊNCIA TRIBUTÁRIA E REPASSE POR ELASTICIDADE (AULA 6)
// =========================================================================
export const TaxIncidenceSimulator: React.FC = () => {
  const [elasticidadeDemanda, setElasticidadeDemanda] = useState<number>(0.5); // Demanda inelástica (ex: combustível, energia)
  const [elasticidadeOferta, setElasticidadeOferta] = useState<number>(1.5); // Oferta elástica
  const [tributoUnitario, setTributoUnitario] = useState<number>(10); // R$ 10 por unidade
  const [contribuinteDeJure, setContribuinteDeJure] = useState<'vendedor' | 'comprador'>('vendedor');

  // Teorema da Invariância da Incidência: a repartição do ônus independe de quem recolhe de jure!
  // Parcela paga pelo consumidor: Es / (Es + Ed)
  // Parcela paga pelo produtor: Ed / (Es + Ed)
  const somaElast = elasticidadeDemanda + elasticidadeOferta;
  const fracaoConsumidor = elasticidadeOferta / somaElast;
  const fracaoProdutor = elasticidadeDemanda / somaElast;

  const onusConsumidor = (tributoUnitario * fracaoConsumidor).toFixed(2);
  const onusProdutor = (tributoUnitario * fracaoProdutor).toFixed(2);
  const pctConsumidor = Math.round(fracaoConsumidor * 100);
  const pctProdutor = 100 - pctConsumidor;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden" id="simulador-incidencia">
      <div className="bg-[#002752] text-white p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ebc000] text-[#002752] mb-1">
            Aula 06 • Teoria da Incidência Tributária e Repasse
          </span>
          <h3 className="text-xl font-bold font-serif tracking-tight">
            Simulador de Incidência Econômica vs Jurídica
          </h3>
          <p className="text-xs sm:text-sm text-slate-200">
            Descubra por que a parte menos elástica do mercado sempre arca com a maior fatia do tributo, independente de quem emite a guia de recolhimento.
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex justify-between text-xs font-bold text-[#002752]">
              <span>Elasticidade da Demanda (|ε_d|):</span>
              <span className="font-mono">{elasticidadeDemanda.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={0.1}
              max={3.0}
              step={0.1}
              value={elasticidadeDemanda}
              onChange={(e) => setElasticidadeDemanda(Number(e.target.value))}
              className="w-full accent-[#002752]"
            />
            <span className="text-[10px] text-slate-500">
              {elasticidadeDemanda < 1 ? 'Demanda Inelástica (Consumidor cativo)' : 'Demanda Elástica (Consumidor sensível a preço)'}
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex justify-between text-xs font-bold text-[#00733f]">
              <span>Elasticidade da Oferta (ε_s):</span>
              <span className="font-mono">{elasticidadeOferta.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={0.1}
              max={3.0}
              step={0.1}
              value={elasticidadeOferta}
              onChange={(e) => setElasticidadeOferta(Number(e.target.value))}
              className="w-full accent-[#00733f]"
            />
            <span className="text-[10px] text-slate-500">
              {elasticidadeOferta < 1 ? 'Oferta Rígida (Produtor preso à capacidade)' : 'Oferta Flexível (Fácil realocação de capital)'}
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-700 block">
              Contribuinte Formal (De Jure):
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setContribuinteDeJure('vendedor')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold ${
                  contribuinteDeJure === 'vendedor' ? 'bg-[#002752] text-white' : 'bg-white border text-slate-700'
                }`}
              >
                Vendedor / Empresa
              </button>
              <button
                type="button"
                onClick={() => setContribuinteDeJure('comprador')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold ${
                  contribuinteDeJure === 'comprador' ? 'bg-[#002752] text-white' : 'bg-white border text-slate-700'
                }`}
              >
                Consumidor Final
              </button>
            </div>
            <span className="text-[10px] text-slate-500 block">
              Alíquota do tributo: <strong>R$ {tributoUnitario}/unidade</strong>
            </span>
          </div>
        </div>

        {/* Repartição Efetiva */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 space-y-1">
            <span className="text-xs font-bold text-[#002752] block uppercase">
              Ônus Econômico Real do Consumidor (De Facto)
            </span>
            <div className="text-3xl font-black text-[#002752] font-mono">
              R$ {onusConsumidor} <span className="text-base font-normal">({pctConsumidor}%)</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Absorvido através do aumento do preço final de venda nas prateleiras.
            </p>
          </div>

          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
            <span className="text-xs font-bold text-[#00733f] block uppercase">
              Ônus Econômico Real do Produtor (De Facto)
            </span>
            <div className="text-3xl font-black text-[#00733f] font-mono">
              R$ {onusProdutor} <span className="text-base font-normal">({pctProdutor}%)</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Absorvido através da compressão de sua margem de lucro operacional líquida.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 2. SIMULADOR DA REGRA DE RAMSEY DE TRIBUTAÇÃO ÓTIMA (AULA 8)
// =========================================================================
export const RamseySimulator: React.FC = () => {
  const [elastBemA, setElastBemA] = useState<number>(0.4); // Inelástico (ex: Medicamentos / Alimentos)
  const [elastBemB, setElastBemB] = useState<number>(1.8); // Elástico (ex: Bens de luxo / Supérfluos)
  const metaArrecadacao = 100;

  // Regra de Ramsey: t_A * Ed_A = t_B * Ed_B => t_A / t_B = Ed_B / Ed_A
  const razao = elastBemB / elastBemA;
  const aliquotaB = (20 / (1 + razao * 0.4)).toFixed(1);
  const aliquotaA = (Number(aliquotaB) * razao).toFixed(1);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden" id="simulador-ramsey">
      <div className="bg-[#002752] text-white p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ebc000] text-[#002752] mb-1">
            Aula 08 • Tributação Ótima e Eficiência Fiscal
          </span>
          <h3 className="text-xl font-bold font-serif tracking-tight">
            Regra da Elasticidade Inversa de Frank Ramsey (1927)
          </h3>
          <p className="text-xs sm:text-sm text-slate-200">
            Para minimizar a perda de peso morto total, tribute com alíquotas mais altas os bens cuja demanda é inelástica.
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-[#002752] block">
              Elasticidade-Preço do Bem A (Essencial): |ε_A| = {elastBemA}
            </span>
            <input
              type="range"
              min={0.2}
              max={1.0}
              step={0.1}
              value={elastBemA}
              onChange={(e) => setElastBemA(Number(e.target.value))}
              className="w-full accent-[#002752]"
            />
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-[#00733f] block">
              Elasticidade-Preço do Bem B (Supérfluo): |ε_B| = {elastBemB}
            </span>
            <input
              type="range"
              min={1.1}
              max={3.0}
              step={0.1}
              value={elastBemB}
              onChange={(e) => setElastBemB(Number(e.target.value))}
              className="w-full accent-[#00733f]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
            <span className="text-xs text-amber-900 uppercase font-semibold block">Alíquota Ótima de Ramsey para Bem A</span>
            <span className="text-3xl font-black text-amber-950 mt-1 block font-mono">{aliquotaA}%</span>
            <span className="text-[10px] text-amber-800">Mais alta devido à baixa elasticidade</span>
          </div>

          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
            <span className="text-xs text-emerald-900 uppercase font-semibold block">Alíquota Ótima de Ramsey para Bem B</span>
            <span className="text-3xl font-black text-[#00733f] mt-1 block font-mono">{aliquotaB}%</span>
            <span className="text-[10px] text-emerald-800">Mais baixa para não destruir o mercado</span>
          </div>
        </div>

        <div className="p-3.5 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-900 flex items-start gap-2">
          <Scale className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <strong>O Dilema Ético de Ramsey:</strong> A pura eficiência microeconômica dita tributar itens básicos (remédios, comida) porque não há como escapar do consumo. Contudo, razões de <em>justiça distributiva</em> e equidade social levam os parlamentos a desonerar a cesta básica, sacrificando eficiência para proteger os mais pobres.
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 3. SIMULADOR DA CURVA DE LAFFER (AULA 8)
// =========================================================================
export const LafferSimulator: React.FC = () => {
  const [aliquota, setAliquota] = useState<number>(35); // %
  const [elasticidadeBase, setElasticidadeBase] = useState<number>(0.6); // Sensibilidade à evasão/desincentivo

  // Modelo de Laffer: R(t) = t * [1000 * (1 - (t/100)^elasticidade)]
  // Alíquota que maximiza arrecadação t*
  const tOtimoLaffer = Math.round(100 / (1 + elasticidadeBase));
  const arrecadacaoAtual = Math.max(0, Math.round(aliquota * 10 * (1 - Math.pow(aliquota / 100, 1.8) * elasticidadeBase)));
  const arrecadacaoMaxima = Math.max(0, Math.round(tOtimoLaffer * 10 * (1 - Math.pow(tOtimoLaffer / 100, 1.8) * elasticidadeBase)));

  const ladoDaCurva = aliquota > tOtimoLaffer ? 'Lado Proibitivo (Perda de Arrecadação por Fuga/Sonegação)' : 'Lado Normal (Aumento de t eleva arrecadação)';

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden" id="simulador-laffer">
      <div className="bg-[#002752] text-white p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ebc000] text-[#002752] mb-1">
            Aula 08 • Curva de Laffer e Economia do Lado da Oferta
          </span>
          <h3 className="text-xl font-bold font-serif tracking-tight">
            Simulador da Curva de Laffer (Arthur Laffer, 1974)
          </h3>
          <p className="text-xs sm:text-sm text-slate-200">
            Descubra o ponto de inflexão fiscal onde aumentos adicionais na alíquota encolhem a base tributável e reduzem a receita do tesouro.
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <div className="flex justify-between text-xs font-bold text-[#002752]">
            <span>Alíquota Tributária Média Efetiva (t):</span>
            <span className="font-mono text-base">{aliquota}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={aliquota}
            onChange={(e) => setAliquota(Number(e.target.value))}
            className="w-full accent-[#002752]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-white rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 uppercase block">Arrecadação Efetiva</span>
            <span className="text-2xl font-black text-[#002752] mt-1 block font-mono">
              R$ {arrecadacaoAtual} mi
            </span>
          </div>

          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
            <span className="text-xs text-emerald-900 uppercase font-semibold block">Alíquota Máxima de Laffer (t*)</span>
            <span className="text-2xl font-black text-[#00733f] mt-1 block font-mono">
              {tOtimoLaffer}%
            </span>
            <span className="text-[10px] text-slate-500">Ponto de máximo fiscal</span>
          </div>

          <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
            <span className="text-xs text-purple-900 uppercase font-semibold block">Posição Estrutural</span>
            <span className={`text-xs font-bold mt-2 block ${aliquota > tOtimoLaffer ? 'text-rose-700' : 'text-[#00733f]'}`}>
              {ladoDaCurva}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 4. SIMULADOR DA REFORMA TRIBUTÁRIA BRASILEIRA (EC 132/2023)
// =========================================================================
export const ReformaTributariaSimulator: React.FC = () => {
  const [aliquotaIbsCbs, setAliquotaIbsCbs] = useState<number>(27.5); // Alíquota estimada neutra (26.5% a 28%)
  const [desoneracaoCestaBasica, setDesoneracaoCestaBasica] = useState<boolean>(true);
  const [cashbackPobres, setCashbackPobres] = useState<boolean>(true);

  // Redução do contencioso tributário e eliminação da cumulatividade
  const ganhoEficienciaPib = (0.5 + (30 - aliquotaIbsCbs) * 0.05).toFixed(2);
  const reducaoCustoConformidade = 85; // % de redução de horas gastas para pagar tributos

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden" id="simulador-reforma-tributaria">
      <div className="bg-[#002752] text-white p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ebc000] text-[#002752] mb-1">
            Aulas 06 a 08 • Atualidades Tributárias do Brasil (EC 132/2023)
          </span>
          <h3 className="text-xl font-bold font-serif tracking-tight">
            Simulador da Reforma Tributária do Consumo (IBS + CBS Dual)
          </h3>
          <p className="text-xs sm:text-sm text-slate-200">
            Substituição de PIS, COFINS, IPI, ICMS e ISS pelo modelo padrão de IVA Dual não-cumulativo no destino.
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex justify-between text-xs font-bold text-[#002752]">
              <span>Alíquota de Referência do IVA Dual (IBS + CBS):</span>
              <span className="font-mono text-base">{aliquotaIbsCbs.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min={24.0}
              max={32.0}
              step={0.1}
              value={aliquotaIbsCbs}
              onChange={(e) => setAliquotaIbsCbs(Number(e.target.value))}
              className="w-full accent-[#002752]"
            />
            <span className="text-[10px] text-slate-500">
              CBS (Federal): ~8,8% | IBS (Estados e Municípios): ~18,7%
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-700 block uppercase">
              Mecanismos Distributivos Especiais:
            </span>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={desoneracaoCestaBasica}
                  onChange={(e) => setDesoneracaoCestaBasica(e.target.checked)}
                  className="rounded text-[#002752] accent-[#002752]"
                />
                <span>Cesta Básica Nacional com Alíquota Zero (Isenção Total)</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cashbackPobres}
                  onChange={(e) => setCashbackPobres(e.target.checked)}
                  className="rounded text-[#00733f] accent-[#00733f]"
                />
                <span>Cashback do Povo (Devolução de tributos para famílias do CadÚnico)</span>
              </label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
            <span className="text-xs text-emerald-900 uppercase font-semibold block">Ganho Potencial no PIB</span>
            <span className="text-2xl font-black text-[#00733f] mt-1 block">+{ganhoEficienciaPib}% a.a.</span>
            <span className="text-[10px] text-slate-500">Eliminação da cumulatividade</span>
          </div>

          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50">
            <span className="text-xs text-blue-900 uppercase font-semibold block">Desoneração de Exportações</span>
            <span className="text-2xl font-black text-[#002752] mt-1 block">100% Livre</span>
            <span className="text-[10px] text-slate-500">Crédito financeiro pleno e imediato</span>
          </div>

          <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/50">
            <span className="text-xs text-purple-900 uppercase font-semibold block">Custo de Conformidade</span>
            <span className="text-2xl font-black text-purple-950 mt-1 block">-{reducaoCustoConformidade}%</span>
            <span className="text-[10px] text-slate-500">Redução de horas burocráticas</span>
          </div>
        </div>
      </div>
    </div>
  );
};
