import React, { useState } from 'react';
import { Scale, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

export const CoaseSimulator: React.FC = () => {
  // Initial legal entitlement: 'fabrica' (direito de emitir) ou 'pescadores' (direito ao rio limpo)
  const [titularDireito, setTitularDireito] = useState<'fabrica' | 'pescadores'>('fabrica');

  // Economic values
  const [lucroFabrica] = useState<number>(1000); // Lucro que a fábrica obtém operando
  const [custoFiltro] = useState<number>(400); // Custo para a fábrica instalar filtro de despoluição
  const [danoPescadores] = useState<number>(750); // Prejuízo anual causado aos pescadores pela poluição

  // Transaction costs (busca, barganha, monitoramento contratual)
  const [custoBusca, setCustoBusca] = useState<number>(50);
  const [custoBarganha, setCustoBarganha] = useState<number>(50);
  const [custoMonitoramento, setCustoMonitoramento] = useState<number>(50);

  const totalCustosTransacao = custoBusca + custoBarganha + custoMonitoramento;

  // Analisando a barganha:
  // Como o Dano aos pescadores (750) > Custo do Filtro (400), o ganho social da despoluição é de 750 - 400 = 350.
  // Cenário 1: Fábrica tem o direito de poluir.
  // Os pescadores estão dispostos a pagar até 750 para ter água limpa.
  // A fábrica aceita qualquer valor >= 400 (custo de instalar o filtro).
  // Excedente de cooperação = 750 - 400 = 350.
  //
  // Cenário 2: Pescadores têm o direito ao rio limpo.
  // A fábrica precisaria pagar aos pescadores para poluir. Mas como poluir causa dano de 750 e o filtro custa 400,
  // a fábrica prefere instalar o filtro de 400 a pagar 750.
  // O resultado eficiente (instalação do filtro) ocorre em ambos se Custos de Transação < 350!

  const excedenteCooperacaoBruto = danoPescadores - custoFiltro; // 350
  const excedenteLiquido = excedenteCooperacaoBruto - totalCustosTransacao;
  const acordoViavel = excedenteLiquido > 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden" id="simulador-coase">
      <div className="bg-[#002752] text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ebc000] text-[#002752] mb-1">
            Aula 3 • Teorema de Coase (1960)
          </span>
          <h3 className="text-lg sm:text-xl font-bold font-serif tracking-tight">
            Simulador de Direitos de Propriedade e Custos de Transação
          </h3>
          <p className="text-xs sm:text-sm text-slate-200">
            Anatomia dos custos de busca, barganha e monitoramento na resolução privada de externalidades
          </p>
        </div>
      </div>

      <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scenario and Allocation of Rights */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h4 className="font-semibold text-sm text-[#002752] mb-2 flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#ebc000]" />
              1. Definição Jurídica dos Direitos de Propriedade
            </h4>
            <p className="text-xs text-slate-600 mb-3">
              A quem a legislação ou o tribunal concedeu o direito originário sobre o uso do recurso hídrico?
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setTitularDireito('fabrica')}
                className={`p-3 rounded-lg border text-left transition-all text-xs ${
                  titularDireito === 'fabrica'
                    ? 'border-[#002752] bg-[#002752]/5 text-[#002752] ring-2 ring-[#002752]/20 font-bold'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="font-semibold text-sm mb-1">Fábrica Industrial</div>
                <p className="text-[11px] font-normal text-slate-600">
                  Possui o direito legal de emitir efluentes no rio.
                </p>
              </button>

              <button
                onClick={() => setTitularDireito('pescadores')}
                className={`p-3 rounded-lg border text-left transition-all text-xs ${
                  titularDireito === 'pescadores'
                    ? 'border-[#00733f] bg-[#00733f]/5 text-[#00733f] ring-2 ring-[#00733f]/20 font-bold'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="font-semibold text-sm mb-1">Associação de Pescadores</div>
                <p className="text-[11px] font-normal text-slate-600">
                  Possui o direito à água pura e limpa sem contaminação.
                </p>
              </button>
            </div>
          </div>

          {/* Economic Parameters */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs space-y-2">
            <h4 className="font-semibold text-sm text-slate-800 mb-1">Parâmetros Econômicos do Litígio</h4>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 bg-white rounded border border-slate-200">
                <span className="text-slate-500 block text-[10px]">Lucro da Fábrica</span>
                <span className="font-bold text-slate-800 font-mono">R$ {lucroFabrica}</span>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200">
                <span className="text-slate-500 block text-[10px]">Custo do Filtro</span>
                <span className="font-bold text-[#00733f] font-mono">R$ {custoFiltro}</span>
              </div>
              <div className="p-2 bg-white rounded border border-slate-200">
                <span className="text-slate-500 block text-[10px]">Dano aos Pescadores</span>
                <span className="font-bold text-rose-600 font-mono">R$ {danoPescadores}</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 italic mt-1">
              Nota: O dano evitado (R$ 750) supera o custo tecnológico de despoluição (R$ 400). A solução socialmente eficiente é a instalação do filtro.
            </p>
          </div>

          {/* Transaction Costs sliders */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-slate-800">Custos de Transação Coasianos</h4>
              <span className={`font-mono font-bold px-2 py-0.5 rounded ${
                totalCustosTransacao === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-800'
              }`}>
                Total: R$ {totalCustosTransacao}
              </span>
            </div>

            <div>
              <div className="flex justify-between text-slate-600 mb-1">
                <span>1. Custos de Busca e Identificação de Partes</span>
                <span className="font-mono">R$ {custoBusca}</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                step="25"
                value={custoBusca}
                onChange={(e) => setCustoBusca(Number(e.target.value))}
                className="w-full accent-[#002752] h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-600 mb-1">
                <span>2. Custos de Barganha e Redação Jurídica</span>
                <span className="font-mono">R$ {custoBarganha}</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                step="25"
                value={custoBarganha}
                onChange={(e) => setCustoBarganha(Number(e.target.value))}
                className="w-full accent-[#002752] h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-600 mb-1">
                <span>3. Custos de Monitoramento e Cumprimento</span>
                <span className="font-mono">R$ {custoMonitoramento}</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                step="25"
                value={custoMonitoramento}
                onChange={(e) => setCustoMonitoramento(Number(e.target.value))}
                className="w-full accent-[#002752] h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => { setCustoBusca(0); setCustoBarganha(0); setCustoMonitoramento(0); }}
                className="px-2.5 py-1 bg-[#00733f] text-white rounded text-[11px] font-medium"
              >
                Zerar Custos (Coase Perfeito)
              </button>
              <button
                onClick={() => { setCustoBusca(150); setCustoBarganha(150); setCustoMonitoramento(100); }}
                className="px-2.5 py-1 bg-rose-600 text-white rounded text-[11px] font-medium"
              >
                Custos Elevados (Falha Coasiana)
              </button>
            </div>
          </div>
        </div>

        {/* Diagnosis & Bargaining Result */}
        <div className="lg:col-span-6 space-y-4">
          <div className={`p-4 rounded-xl border ${
            acordoViavel
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-rose-50 border-rose-300 text-rose-950'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm mb-1.5">
              {acordoViavel ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-[#00733f]" />
                  <span>Teorema de Coase Confirma-se: Alocação Eficiente Atingida!</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                  <span>Falha de Coase: Custos de Transação Inviabilizam o Acordo Privado</span>
                </>
              )}
            </div>

            <p className="text-xs leading-relaxed mb-3">
              {acordoViavel ? (
                titularDireito === 'fabrica'
                  ? `Os pescadores pagam uma indenização entre R$ 400 e R$ 750 (ex: R$ 575) para a fábrica instalar o filtro. O excedente líquido de R$ ${excedenteLiquido} remunera as partes e cobre os custos de transação. O filtro é instalado!`
                  : `A fábrica prefere arcar com o custo de R$ 400 do filtro a indenizar os pescadores pelo dano de R$ 750. O filtro é instalado espontaneamente!`
              ) : (
                `Os custos de transação (R$ ${totalCustosTransacao}) superam o ganho de cooperação bruto (R$ ${excedenteCooperacaoBruto}). As partes não negociam e a alocação permanece ineficiente, justificando intervenção estatal via imposto pigouviano ou regulação ambiental.`
              )}
            </p>

            <div className="bg-white/80 rounded-lg p-3 text-xs space-y-1.5 border border-slate-200">
              <div className="flex justify-between font-mono">
                <span>Ganho Bruto de Bem-Estar:</span>
                <span className="font-bold text-[#00733f]">R$ {excedenteCooperacaoBruto}</span>
              </div>
              <div className="flex justify-between font-mono text-rose-700">
                <span>(-) Custos Totais de Transação:</span>
                <span className="font-bold">- R$ {totalCustosTransacao}</span>
              </div>
              <div className="border-t border-slate-300 pt-1 flex justify-between font-mono font-bold">
                <span>(=) Saldo Líquido Social da Barganha:</span>
                <span className={excedenteLiquido >= 0 ? 'text-[#00733f]' : 'text-rose-600'}>
                  R$ {excedenteLiquido}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <h4 className="font-semibold text-sm text-[#002752] mb-2 flex items-center gap-1.5">
              <span>Síntese Teórica: Coase (1960) vs. Arvate & Biderman (2004)</span>
              <ArrowRight className="w-4 h-4 text-[#ebc000]" />
            </h4>
            <ul className="space-y-2 text-slate-600 list-disc list-inside">
              <li>
                <strong>Invariância do Resultado:</strong> Se custos de transação = 0, o mesmo desfecho (filtro instalado) acontece independentemente de quem detém o direito.
              </li>
              <li>
                <strong>Efeito Distributivo:</strong> A titularidade inicial altera quem transfere renda para quem (riqueza patrimonial), mas não a eficiência da alocação de recursos.
              </li>
              <li>
                <strong>O Mundo Real de Custos Positivos:</strong> No mundo com fricções informacionais e múltiplos pescadores (carona), a regra jurídica de responsabilidade é determinante para o bem-estar social.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
