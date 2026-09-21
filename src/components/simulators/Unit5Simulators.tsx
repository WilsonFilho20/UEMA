import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, Info, Building, ShieldAlert, AlertTriangle, ArrowRight, TrendingUp, Scale } from 'lucide-react';

// =========================================================================
// 1. SIMULADOR DO TEOREMA DA DESCENTRALIZAÇÃO DE OATES (AULA 11)
// =========================================================================
export const OatesSimulator: React.FC = () => {
  const [preferenciaRegiaoA, setPreferenciaRegiaoA] = useState<number>(30); // Qtd desejada de bem público na Região A
  const [preferenciaRegiaoB, setPreferenciaRegiaoB] = useState<number>(80); // Qtd desejada de bem público na Região B
  const [custoTransbordamento, setCustoTransbordamento] = useState<number>(10); // Externalidades (spillover) entre regiões

  // Provisão centralizada uniforme: Q_c = média simples
  const provisaoCentralizada = (preferenciaRegiaoA + preferenciaRegiaoB) / 2;

  // Perda de bem-estar com provisão centralizada (distorção em relação à preferência local)
  const perdaA = Math.pow(provisaoCentralizada - preferenciaRegiaoA, 2) * 0.5;
  const perdaB = Math.pow(provisaoCentralizada - preferenciaRegiaoB, 2) * 0.5;
  const ganhoDescentralizacao = perdaA + perdaB - (custoTransbordamento * 2);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden" id="simulador-oates">
      <div className="bg-[#002752] text-white p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ebc000] text-[#002752] mb-1">
            Aula 11 • Teoria do Federalismo Fiscal
          </span>
          <h3 className="text-xl font-bold font-serif tracking-tight">
            Teorema da Descentralização de Wallace Oates (1972)
          </h3>
          <p className="text-xs sm:text-sm text-slate-200">
            Compare o ganho de eficiência da provisão local customizada contra a provisão centralizada uniforme do governo federal.
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-200 space-y-2">
            <span className="text-xs font-bold text-[#002752] block">
              Preferência Local Jurisdição A (ex: Urbano): {preferenciaRegiaoA} un.
            </span>
            <input
              type="range"
              min={10}
              max={100}
              value={preferenciaRegiaoA}
              onChange={(e) => setPreferenciaRegiaoA(Number(e.target.value))}
              className="w-full accent-[#002752]"
            />
          </div>

          <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200 space-y-2">
            <span className="text-xs font-bold text-[#00733f] block">
              Preferência Local Jurisdição B (ex: Rural): {preferenciaRegiaoB} un.
            </span>
            <input
              type="range"
              min={10}
              max={100}
              value={preferenciaRegiaoB}
              onChange={(e) => setPreferenciaRegiaoB(Number(e.target.value))}
              className="w-full accent-[#00733f]"
            />
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-700 block">
              Efeito Transbordamento (Spillover): {custoTransbordamento}%
            </span>
            <input
              type="range"
              min={0}
              max={50}
              value={custoTransbordamento}
              onChange={(e) => setCustoTransbordamento(Number(e.target.value))}
              className="w-full accent-slate-700"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <span className="text-xs text-slate-500 uppercase block">Provisão Centralizada Federal</span>
            <span className="text-2xl font-black text-[#002752] mt-1 block font-mono">
              {provisaoCentralizada.toFixed(1)} un.
            </span>
            <span className="text-[10px] text-slate-400">Padrão uniforme idêntico</span>
          </div>

          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
            <span className="text-xs text-emerald-900 uppercase font-semibold block">Ganho Líquido da Descentralização</span>
            <span className={`text-2xl font-black mt-1 block font-mono ${ganhoDescentralizacao >= 0 ? 'text-[#00733f]' : 'text-rose-700'}`}>
              {ganhoDescentralizacao >= 0 ? `+ ${ganhoDescentralizacao.toFixed(1)} pts` : `${ganhoDescentralizacao.toFixed(1)} pts`}
            </span>
            <span className="text-[10px] text-slate-500">
              {ganhoDescentralizacao >= 0 ? 'Descentralização é Superior' : 'Centralização compensa spillovers'}
            </span>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50">
            <span className="text-xs text-amber-900 uppercase font-semibold block">Veredito do Teorema de Oates</span>
            <span className="text-xs font-bold text-amber-950 mt-2 block leading-relaxed">
              Quanto maior a heterogeneidade de preferências e menores os transbordamentos, maior a vantagem dos governos subnacionais.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 2. SIMULADOR DO MODELO DE TIEBOUT: VOTANDO COM OS PÉS (AULA 11)
// =========================================================================
export const TieboutSimulator: React.FC = () => {
  const [mobilidadePopulacional, setMobilidadePopulacional] = useState<number>(75); // % facilidade de mudança
  const [iptuMunicipioA, setIptuMunicipioA] = useState<number>(1500); // R$/ano
  const [iptuMunicipioB, setIptuMunicipioB] = useState<number>(3000); // R$/ano
  const [qualidadeEscolasB, setQualidadeEscolasB] = useState<number>(90); // 0 a 100

  // Migração espontânea de famílias com filhos para o Município B (preferem escolas melhores mesmo pagando IPTU mais alto)
  const populacaoA = Math.round(50 - (qualidadeEscolasB * 0.2 * (mobilidadePopulacional / 100)));
  const populacaoB = 100 - populacaoA;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden" id="simulador-tiebout">
      <div className="bg-[#002752] text-white p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ebc000] text-[#002752] mb-1">
            Aula 11 • Competição Jurisdicional e Mobilidade
          </span>
          <h3 className="text-xl font-bold font-serif tracking-tight">
            Modelo de Tiebout: Votando com os Pés (Charles Tiebout, 1956)
          </h3>
          <p className="text-xs sm:text-sm text-slate-200">
            Em nível local, os cidadãos revelam suas preferências por bens públicos migrando para a jurisdição com o pacote tributo/serviço ideal.
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-[#002752] block">
              Município Alfa (Perfil Tributo Baixo / Serviços Básicos):
            </span>
            <div className="text-xs text-slate-600 font-mono">
              IPTU Médio: <strong>R$ {iptuMunicipioA}/ano</strong> • Foco: Custo Mínimo
            </div>
            <div className="text-lg font-black text-[#002752] mt-2 font-mono">
              População Fixada: {populacaoA}% dos munícipes
            </div>
          </div>

          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
            <span className="text-xs font-bold text-[#00733f] block">
              Município Beta (Perfil Tributo Alto / Alta Qualidade Educacional):
            </span>
            <div className="text-xs text-slate-600 font-mono">
              IPTU Médio: <strong>R$ {iptuMunicipioB}/ano</strong> • Qualidade Escolas: {qualidadeEscolasB}/100
            </div>
            <div className="text-lg font-black text-[#00733f] mt-2 font-mono">
              População Atraída: {populacaoB}% dos munícipes
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-700">
            <span>Grau de Mobilidade e Custo de Mudança Intermunicipal:</span>
            <span className="font-mono">{mobilidadePopulacional}%</span>
          </div>
          <input
            type="range"
            min={10}
            max={100}
            value={mobilidadePopulacional}
            onChange={(e) => setMobilidadePopulacional(Number(e.target.value))}
            className="w-full accent-[#002752]"
          />
          <p className="text-[11px] text-slate-500">
            Quanto mais fácil mudar de bairro/cidade, mais rápido o modelo atinge a eficiência de Pareto sem necessidade de coerção central.
          </p>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 3. SIMULADOR DE GUERRA FISCAL DO ICMS (AULA 12)
// =========================================================================
export const FiscalWarSimulator: React.FC = () => {
  const [aliquotaEstadoA, setAliquotaEstadoA] = useState<number>(7); // Alíquota com benefício (ex: 7% vs 18% padrão)
  const [aliquotaEstadoB, setAliquotaEstadoB] = useState<number>(7);
  const [renunciaA, setRenunciaA] = useState<boolean>(true);
  const [renunciaB, setRenunciaB] = useState<boolean>(true);

  // Dilema dos Prisioneiros da Guerra Fiscal:
  // Se ambos dão incentivo fiscal máximo: a fábrica divide os investimentos onde já iria por logística, mas ambos perdem receita pública líquida!
  let resultadoA = 0;
  let resultadoB = 0;

  if (renunciaA && renunciaB) {
    resultadoA = -40; // Perda de arrecadação sem exclusividade
    resultadoB = -40;
  } else if (renunciaA && !renunciaB) {
    resultadoA = +60; // Ganha a fábrica inteira
    resultadoB = -80; // Perde a fábrica
  } else if (!renunciaA && renunciaB) {
    resultadoA = -80;
    resultadoB = +60;
  } else {
    resultadoA = +20; // Equilíbrio cooperativo ideal
    resultadoB = +20;
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden" id="simulador-guerra-fiscal">
      <div className="bg-[#002752] text-white p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ebc000] text-[#002752] mb-1">
            Aula 12 • Guerra Fiscal e Finanças Subnacionais
          </span>
          <h3 className="text-xl font-bold font-serif tracking-tight">
            Guerra Fiscal do ICMS: Dilema dos Prisioneiros Federativo
          </h3>
          <p className="text-xs sm:text-sm text-slate-200">
            Descubra a dinâmica autodestrutiva da competição predatória por atração de investimentos industriais entre estados.
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-[#002752] block">Estratégia do Estado Alfa:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setRenunciaA(true)}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold ${
                  renunciaA ? 'bg-rose-700 text-white' : 'bg-white border text-slate-700'
                }`}
              >
                Conceder Renúncia / Crédito Presumido
              </button>
              <button
                type="button"
                onClick={() => setRenunciaA(false)}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold ${
                  !renunciaA ? 'bg-[#002752] text-white' : 'bg-white border text-slate-700'
                }`}
              >
                Manter Alíquota Cheia (Cooperação)
              </button>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-[#00733f] block">Estratégia do Estado Beta:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setRenunciaB(true)}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold ${
                  renunciaB ? 'bg-rose-700 text-white' : 'bg-white border text-slate-700'
                }`}
              >
                Conceder Renúncia / Crédito Presumido
              </button>
              <button
                type="button"
                onClick={() => setRenunciaB(false)}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold ${
                  !renunciaB ? 'bg-[#00733f] text-white' : 'bg-white border text-slate-700'
                }`}
              >
                Manter Alíquota Cheia (Cooperação)
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 text-center">
          <span className="text-xs text-slate-500 uppercase block font-semibold">Equilíbrio de Nash Resultante:</span>
          <span className="text-xl font-black text-rose-700 mt-1 block">
            {renunciaA && renunciaB
              ? 'Equilíbrio Ineficiente: Corrida para o Fundo (Race to the Bottom)'
              : renunciaA !== renunciaB
              ? 'Canibalização Fiscal de Investimentos'
              : 'Cooperação Federativa Plena (Ótimo Social)'}
          </span>
          <p className="text-[11px] text-slate-600 mt-2 max-w-xl mx-auto">
            A Reforma Tributária (EC 132/2023) encerra a guerra fiscal ao transferir a tributação da origem para o <strong>destino do consumo</strong>, neutralizando a renúncia predatória.
          </p>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 4. SIMULADOR DE LIMITES DA LEI DE RESPONSABILIDADE FISCAL (AULA 12)
// =========================================================================
export const LrfSimulator: React.FC = () => {
  const [gastoPessoal, setGastoPessoal] = useState<number>(53.0); // % da RCL do Executivo
  const [dividaConsolidada, setDividaConsolidada] = useState<number>(110); // % da RCL (limite Senado = 200%)

  // Limites da LRF (Executivo Estadual: 49% da RCL; Geral Estado: 60%)
  // Limite Alerta: 90% do limite máximo = 44.1%
  // Limite Prudencial: 95% do limite máximo = 46.55%
  // Limite Máximo: 49.0%
  const limiteMaximoExecutivo = 49.0;
  const limitePrudencial = limiteMaximoExecutivo * 0.95; // 46.55%
  const limiteAlerta = limiteMaximoExecutivo * 0.90; // 44.10%

  let statusLRF = 'Normal (Dentro dos parâmetros)';
  let corStatus = 'text-[#00733f] bg-emerald-50 border-emerald-200';

  if (gastoPessoal > limiteMaximoExecutivo) {
    statusLRF = 'LIMITE MÁXIMO EXCEDIDO (Infração Grave: Vedações do art. 22 e sanções penais do art. 10 da Lei 10.028/2000)';
    corStatus = 'text-rose-700 bg-rose-50 border-rose-200';
  } else if (gastoPessoal > limitePrudencial) {
    statusLRF = 'LIMITE PRUDENCIAL ATINGIDO (Art. 22: Vedada contratação de pessoal, criação de cargos e concessão de aumentos)';
    corStatus = 'text-amber-800 bg-amber-50 border-amber-200';
  } else if (gastoPessoal > limiteAlerta) {
    statusLRF = 'LIMITE DE ALERTA DO TCE (Art. 59: Tribunal de Contas do Estado emite notificação formal ao Governador)';
    corStatus = 'text-blue-800 bg-blue-50 border-blue-200';
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden" id="simulador-lrf">
      <div className="bg-[#002752] text-white p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ebc000] text-[#002752] mb-1">
            Aula 12 • Lei de Responsabilidade Fiscal (LC 101/2000)
          </span>
          <h3 className="text-xl font-bold font-serif tracking-tight">
            Simulador de Limites Fiscais da LRF & Gastos com Pessoal
          </h3>
          <p className="text-xs sm:text-sm text-slate-200">
            Teste a pressão sobre a Receita Corrente Líquida (RCL) e veja os gatilhos automáticos de ajuste fiscal.
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex justify-between text-xs font-bold text-[#002752]">
              <span>Despesa Total com Pessoal (DTP / RCL do Executivo):</span>
              <span className="font-mono text-base">{gastoPessoal.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min={35.0}
              max={60.0}
              step={0.5}
              value={gastoPessoal}
              onChange={(e) => setGastoPessoal(Number(e.target.value))}
              className="w-full accent-[#002752]"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>Alerta: {limiteAlerta.toFixed(1)}%</span>
              <span>Prudencial: {limitePrudencial.toFixed(1)}%</span>
              <span className="text-rose-700 font-bold">Máximo: {limiteMaximoExecutivo.toFixed(1)}%</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex justify-between text-xs font-bold text-[#00733f]">
              <span>Dívida Consolidada Líquida (% da RCL):</span>
              <span className="font-mono text-base">{dividaConsolidada}%</span>
            </div>
            <input
              type="range"
              min={20}
              max={250}
              value={dividaConsolidada}
              onChange={(e) => setDividaConsolidada(Number(e.target.value))}
              className="w-full accent-[#00733f]"
            />
            <div className="text-[10px] text-slate-500 text-right font-mono">
              Limite Máximo do Senado (Res. 40/2001): 200% da RCL
            </div>
          </div>
        </div>

        {/* Status Legal e Sanções */}
        <div className={`p-4 rounded-xl border text-center space-y-1.5 ${corStatus}`}>
          <span className="text-xs font-black uppercase tracking-wider block">
            Enquadramento Jurídico perante o Tribunal de Contas (TCE-MA)
          </span>
          <span className="text-sm font-extrabold block">
            {statusLRF}
          </span>
        </div>
      </div>
    </div>
  );
};
