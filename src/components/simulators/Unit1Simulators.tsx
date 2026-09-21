import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, Info, Sparkles, Scale, TrendingUp, ShieldCheck, DollarSign } from 'lucide-react';

// =========================================================================
// 1. SIMULADOR DAS FUNÇÕES CLÁSSICAS DE MUSGRAVE (AULA 1)
// =========================================================================
export const MusgraveSimulator: React.FC = () => {
  const [alocativa, setAlocativa] = useState<number>(45);
  const [distributiva, setDistributiva] = useState<number>(35);
  const [estabilizadora, setEstabilizadora] = useState<number>(20);

  // Normalização caso a soma divirja de 100
  const ajustarValores = (tipo: 'aloc' | 'dist' | 'estab', val: number) => {
    if (tipo === 'aloc') {
      const sobra = 100 - val;
      const totalOutros = distributiva + estabilizadora || 1;
      const novoDist = Math.round((distributiva / totalOutros) * sobra);
      const novoEstab = sobra - novoDist;
      setAlocativa(val);
      setDistributiva(novoDist);
      setEstabilizadora(novoEstab);
    } else if (tipo === 'dist') {
      const sobra = 100 - val;
      const totalOutros = alocativa + estabilizadora || 1;
      const novoAloc = Math.round((alocativa / totalOutros) * sobra);
      const novoEstab = sobra - novoAloc;
      setDistributiva(val);
      setAlocativa(novoAloc);
      setEstabilizadora(novoEstab);
    } else {
      const sobra = 100 - val;
      const totalOutros = alocativa + distributiva || 1;
      const novoAloc = Math.round((alocativa / totalOutros) * sobra);
      const novoDist = sobra - novoAloc;
      setEstabilizadora(val);
      setAlocativa(novoAloc);
      setDistributiva(novoDist);
    }
  };

  // Modelagem teórica dos impactos econômicos
  const impactoPib = (alocativa * 0.05 + estabilizadora * 0.02).toFixed(2);
  const indiceGini = Math.max(0.35, 0.58 - (distributiva * 0.0035)).toFixed(3);
  const estabilidadePrecos = Math.min(100, Math.round(estabilizadora * 2.8 + alocativa * 0.5));
  const riscoFiscal = estabilizadora < 15 ? 'Elevado (Vulnerabilidade a Choques)' : estabilizadora < 25 ? 'Moderado (Equilíbrio Dinâmico)' : 'Baixo (Sólido Colchão Anticíclico)';

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden" id="simulador-musgrave">
      <div className="bg-[#002752] text-white p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ebc000] text-[#002752] mb-1">
            Aula 01 • Teoria da Tributação e do Gasto Público
          </span>
          <h3 className="text-xl font-bold font-serif tracking-tight">
            Simulador da Tríplice Função Fiscal de Richard Musgrave
          </h3>
          <p className="text-xs sm:text-sm text-slate-200">
            Calibre a alocação de recursos públicos entre Alocação (Bens Públicos), Distribuição (Equidade) e Estabilização (Macrofiscal).
          </p>
        </div>
        <button
          onClick={() => {
            setAlocativa(40);
            setDistributiva(35);
            setEstabilizadora(25);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium transition-colors"
        >
          <RefreshCw className="w-4 h-4 text-[#ebc000]" />
          Restaurar Padrão
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Sliders de Alocação */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[#002752] uppercase flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#002752]" />
                1. Função Alocativa
              </span>
              <span className="font-mono font-bold text-sm text-[#002752]">{alocativa}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={70}
              value={alocativa}
              onChange={(e) => ajustarValores('aloc', Number(e.target.value))}
              className="w-full accent-[#002752] cursor-pointer"
            />
            <p className="text-[11px] text-slate-600">
              Provisão de bens públicos puros, infraestrutura logística, correção de externalidades e P&D.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[#00733f] uppercase flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-[#00733f]" />
                2. Função Distributiva
              </span>
              <span className="font-mono font-bold text-sm text-[#00733f]">{distributiva}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={70}
              value={distributiva}
              onChange={(e) => ajustarValores('dist', Number(e.target.value))}
              className="w-full accent-[#00733f] cursor-pointer"
            />
            <p className="text-[11px] text-slate-600">
              Transferências sociais, tributação progressiva e equalização da distribuição de renda e bem-estar.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-purple-900 uppercase flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-purple-900" />
                3. Função Estabilizadora
              </span>
              <span className="font-mono font-bold text-sm text-purple-900">{estabilizadora}%</span>
            </div>
            <input
              type="range"
              min={5}
              max={50}
              value={estabilizadora}
              onChange={(e) => ajustarValores('estab', Number(e.target.value))}
              className="w-full accent-purple-800 cursor-pointer"
            />
            <p className="text-[11px] text-slate-600">
              Superávit primário, poupança pública para amortecimento anticíclico e controle inflacionário.
            </p>
          </div>
        </div>

        {/* Painel de Indicadores Macroeconômicos Resultantes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[11px] text-slate-500 uppercase font-semibold block">Crescimento Potencial do PIB</span>
            <span className="text-2xl font-black text-[#002752] mt-1 block">+{impactoPib}% a.a.</span>
            <span className="text-[10px] text-slate-400">Impacto da infraestrutura</span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[11px] text-slate-500 uppercase font-semibold block">Coeficiente de Gini</span>
            <span className="text-2xl font-black text-[#00733f] mt-1 block">{indiceGini}</span>
            <span className="text-[10px] text-slate-400">Menor = Mais igualitário</span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[11px] text-slate-500 uppercase font-semibold block">Índice de Estabilidade</span>
            <span className="text-2xl font-black text-purple-950 mt-1 block">{estabilidadePrecos}/100</span>
            <span className="text-[10px] text-slate-400">Resiliência a choques</span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[11px] text-slate-500 uppercase font-semibold block">Regime Fiscal</span>
            <span className="text-xs font-bold text-amber-900 mt-2 block leading-tight">{riscoFiscal}</span>
            <span className="text-[10px] text-slate-400">Postura da política fiscal</span>
          </div>
        </div>

        {/* Insight Teórico */}
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-[#002752]">
            <Info className="w-4 h-4 text-[#ebc000]" />
            Fundamentação Teórica (Musgrave & Musgrave, 1989):
          </div>
          <p className="leading-relaxed">
            Richard Musgrave estabeleceu que o setor público atua onde o mecanismo de preços falha. A função <strong>alocativa</strong> resolve a subprovisão de bens públicos com custos de transação inviáveis; a função <strong>distributiva</strong> ajusta a repartição primária de renda conforme juízos éticos de justiça social; e a função <strong>estabilizadora</strong> emprega instrumentos monetário-fiscais para garantir o pleno emprego sem pressões inflacionárias.
          </p>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 2. SIMULADOR DE FUNÇÕES DE BEM-ESTAR SOCIAL: BENTHAM vs RAWLS vs NASH (AULA 2)
// =========================================================================
export const SocialWelfareSimulator: React.FC = () => {
  const [rendaTotal, setRendaTotal] = useState<number>(100);
  const [fatiaA, setFatiaA] = useState<number>(70); // Renda Agente Rico
  const [aversaoDesigualdade, setAversaoDesigualdade] = useState<number>(1); // 1 = logarítmica

  const fatiaB = rendaTotal - fatiaA; // Renda Agente Pobre

  // Funções de Utilidade com concavidade (utilidade marginal decrescente)
  // U(y) = y^(1 - rho) / (1 - rho) se rho != 1, ou ln(y) se rho == 1
  const calcUtil = (y: number) => {
    if (y <= 0) return 0;
    if (aversaoDesigualdade === 1) return Math.log(y);
    return Math.pow(y, 1 - aversaoDesigualdade * 0.4);
  };

  const utilA = calcUtil(fatiaA);
  const utilB = calcUtil(fatiaB);

  // 1. Bem-estar Benthamiano (Utilitarista clássico): W = U_A + U_B
  const wBentham = (utilA + utilB).toFixed(2);

  // 2. Bem-estar Rawlsiano (Maximin): W = min(U_A, U_B)
  const wRawls = Math.min(utilA, utilB).toFixed(2);

  // 3. Bem-estar de Nash / Bernoulli: W = U_A * U_B
  const wNash = (utilA * utilB).toFixed(2);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden" id="simulador-bem-estar-social">
      <div className="bg-[#002752] text-white p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ebc000] text-[#002752] mb-1">
            Aula 02 • Economia do Bem-Estar e Teoremas Fundamentais
          </span>
          <h3 className="text-xl font-bold font-serif tracking-tight">
            Simulador de Funções de Bem-Estar Social (SWF)
          </h3>
          <p className="text-xs sm:text-sm text-slate-200">
            Compare como o critério Utilitarista (Bentham), o critério Maximin (Rawls) e a Solução de Nash avaliam a redistribuição de renda.
          </p>
        </div>
        <button
          onClick={() => setFatiaA(50)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00733f] hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition-colors"
        >
          <Scale className="w-4 h-4 text-[#ebc000]" />
          Divisão Perfeitamente Igualitária (50/50)
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Controle da Distribuição de Renda */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-[#002752] uppercase">
              Distribuição da Renda Total (R$ 100 bilhões):
            </span>
            <span className="font-mono text-xs text-slate-600">
              Agente A: <strong>R$ {fatiaA} bi</strong> | Agente B: <strong>R$ {fatiaB} bi</strong>
            </span>
          </div>

          <input
            type="range"
            min={10}
            max={90}
            value={fatiaA}
            onChange={(e) => setFatiaA(Number(e.target.value))}
            className="w-full accent-[#002752] cursor-pointer"
          />

          <div className="flex justify-between text-[11px] text-slate-500 font-mono">
            <span>R$ 10 bi (A Pobre / B Rico)</span>
            <span>R$ 50 bi (Equidade Plena)</span>
            <span>R$ 90 bi (A Rico / B Pobre)</span>
          </div>
        </div>

        {/* Comparação dos Três Critérios Filosóficos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 space-y-2">
            <span className="text-xs font-bold text-[#002752] block uppercase">
              1. Bentham (Utilitarista Puro)
            </span>
            <div className="font-mono text-2xl font-black text-[#002752]">{wBentham}</div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Equação: <code>W = U_A + U_B</code>. A sociedade é indiferente a quem recebe a renda, desde que a soma agregada de utilidade seja maximizada.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2">
            <span className="text-xs font-bold text-[#00733f] block uppercase">
              2. John Rawls (Critério Maximin)
            </span>
            <div className="font-mono text-2xl font-black text-[#00733f]">{wRawls}</div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Equação: <code>W = min(U_A, U_B)</code>. O bem-estar social é medido estritamente pelo indivíduo em pior situação econômica sob o Véu da Ignorância.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/40 space-y-2">
            <span className="text-xs font-bold text-purple-900 block uppercase">
              3. Nash / Bernoulli (Multiplicativo)
            </span>
            <div className="font-mono text-2xl font-black text-purple-900">{wNash}</div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Equação: <code>W = U_A · U_B</code>. Pune severamente assimetrias extremas; se qualquer indivíduo tiver utilidade nula, o bem-estar social colapsa a zero.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 3. SIMULADOR DA EQUIVALÊNCIA RICARDIANA vs ILUSÃO FISCAL (AULA 1)
// =========================================================================
export const RicardianSimulator: React.FC = () => {
  const [gastoPublico, setGastoPublico] = useState<number>(100);
  const [financiamentoDivida, setFinanciamentoDivida] = useState<number>(60); // % via Dívida (o restante via Imposto hoje)
  const [taxaJuros, setTaxaJuros] = useState<number>(6); // % a.a.
  const [grauRacionalidade, setGrauRacionalidade] = useState<number>(80); // 100% = Barro/Ricardo; 0% = Ilusão Fiscal total

  const tributoHoje = gastoPublico * (1 - financiamentoDivida / 100);
  const dividaEmitida = gastoPublico * (financiamentoDivida / 100);
  const tributoFuturoNecessario = dividaEmitida * (1 + taxaJuros / 100);

  // Se agentes antecipam o futuro (Equivalência Ricardiana): aumentam poupança em valor presente
  const poupancaPrivadaAdicional = dividaEmitida * (grauRacionalidade / 100);
  const estimuloConsumoCurtoPrazo = dividaEmitida * (1 - grauRacionalidade / 100);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden" id="simulador-equivalencia-ricardiana">
      <div className="bg-[#002752] text-white p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ebc000] text-[#002752] mb-1">
            Aula 01 • Finanças Neutras vs Funcionais
          </span>
          <h3 className="text-xl font-bold font-serif tracking-tight">
            Simulador da Proposição de Equivalência Ricardiana (Barro, 1974)
          </h3>
          <p className="text-xs sm:text-sm text-slate-200">
            Dívida pública é apenas imposto diferido no tempo? Teste a resposta do consumo privado e da poupança sob diferentes graus de ilusão fiscal.
          </p>
        </div>
        <button
          onClick={() => {
            setFinanciamentoDivida(50);
            setGrauRacionalidade(100);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00733f] hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition-colors"
        >
          <CheckCircle2 className="w-4 h-4 text-[#ebc000]" />
          Equivalência Ricardiana Pura (100%)
        </button>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-[#002752] block">
              Composição do Financiamento do Déficit:
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={financiamentoDivida}
              onChange={(e) => setFinanciamentoDivida(Number(e.target.value))}
              className="w-full accent-[#002752]"
            />
            <div className="text-[11px] text-slate-600 flex justify-between font-mono">
              <span>Impostos: R$ {tributoHoje.toFixed(0)} bi</span>
              <span>Dívida: R$ {dividaEmitida.toFixed(0)} bi</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-[#002752] block">
              Grau de Antecipação Intertemporal (Barro):
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={grauRacionalidade}
              onChange={(e) => setGrauRacionalidade(Number(e.target.value))}
              className="w-full accent-[#00733f]"
            />
            <div className="text-[11px] text-slate-600 flex justify-between font-mono">
              <span>0% (Ilusão Fiscal)</span>
              <span>{grauRacionalidade}%</span>
              <span>100% (Ricardiano)</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-[#002752] block">
              Taxa de Juros Real da Dívida (r):
            </span>
            <input
              type="range"
              min={1}
              max={15}
              value={taxaJuros}
              onChange={(e) => setTaxaJuros(Number(e.target.value))}
              className="w-full accent-purple-800"
            />
            <div className="text-[11px] text-slate-600 text-right font-mono">
              r = {taxaJuros}% a.a.
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
            <span className="text-xs text-slate-500 uppercase block">Poupança Privada Compensatória</span>
            <span className="text-2xl font-black text-[#00733f] mt-1 block">
              + R$ {poupancaPrivadaAdicional.toFixed(1)} bi
            </span>
            <span className="text-[10px] text-slate-400">Famílias poupam para pagar o tributo futuro</span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
            <span className="text-xs text-slate-500 uppercase block">Estímulo Efetivo à Demanda Agregada</span>
            <span className="text-2xl font-black text-[#002752] mt-1 block">
              + R$ {estimuloConsumoCurtoPrazo.toFixed(1)} bi
            </span>
            <span className="text-[10px] text-slate-400">
              {grauRacionalidade === 100 ? 'Neutro (Multiplicador = 0)' : 'Efeito expansionista parcial'}
            </span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
            <span className="text-xs text-slate-500 uppercase block">Carga Tributária Futura (t+1)</span>
            <span className="text-2xl font-black text-rose-700 mt-1 block">
              R$ {tributoFuturoNecessario.toFixed(1)} bi
            </span>
            <span className="text-[10px] text-slate-400">Principal + Juros compostos acumulados</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 4. SIMULADOR DA FRONTEIRA DE UTILIDADE (UPF) E ÓTIMO DE BERGSON-SAMUELSON (AULA 2)
// =========================================================================
export const WelfareFrontierSimulator: React.FC = () => {
  const [pesoAlfa, setPesoAlfa] = useState<number>(0.5); // Peso ético da sociedade dado ao Agente A

  // Fronteira de Possibilidades de Utilidade côncava: U_A^2 + U_B^2 = 10000 => U_B = sqrt(10000 - U_A^2)
  // Maximização W = alfa * U_A + (1 - alfa) * U_B sob a fronteira
  // Condição de tangência: dU_B / dU_A = - U_A / U_B = - alfa / (1 - alfa) => U_A / U_B = alfa / (1 - alfa)
  const razao = pesoAlfa / (1 - pesoAlfa);
  const uA = Math.round(100 * Math.sin(Math.atan(razao)));
  const uB = Math.round(100 * Math.cos(Math.atan(razao)));

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden" id="simulador-fronteira-utilidade">
      <div className="bg-[#002752] text-white p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ebc000] text-[#002752] mb-1">
            Aula 02 • Ótimo de Pareto vs Ótimo Social
          </span>
          <h3 className="text-xl font-bold font-serif tracking-tight">
            Fronteira de Possibilidades de Utilidade (UPF) & Ponto de Bliss
          </h3>
          <p className="text-xs sm:text-sm text-slate-200">
            Descubra por que a Eficiência de Pareto é uma condição necessária, mas não suficiente, para escolher o melhor ponto distributivo na sociedade.
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-[#002752]">
            <span>Juízo Ético Societal (Peso Distributivo α):</span>
            <span className="font-mono">Peso de A: {(pesoAlfa * 100).toFixed(0)}% | Peso de B: {((1 - pesoAlfa) * 100).toFixed(0)}%</span>
          </div>
          <input
            type="range"
            min={0.1}
            max={0.9}
            step={0.05}
            value={pesoAlfa}
            onChange={(e) => setPesoAlfa(Number(e.target.value))}
            className="w-full accent-[#002752]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50">
            <span className="text-xs text-blue-900 uppercase block font-semibold">Utilidade do Agente A</span>
            <span className="text-3xl font-black text-[#002752] mt-1 block">{uA}</span>
            <span className="text-[10px] text-slate-500">Nível de utilidade de Pareto</span>
          </div>

          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
            <span className="text-xs text-emerald-900 uppercase font-semibold block">Utilidade do Agente B</span>
            <span className="text-3xl font-black text-[#00733f] mt-1 block">{uB}</span>
            <span className="text-[10px] text-slate-500">Nível de utilidade de Pareto</span>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50">
            <span className="text-xs text-amber-900 uppercase font-semibold block">Ótimo Social (Ponto de Bliss)</span>
            <span className="text-xl font-black text-amber-950 mt-2 block">Tangência UPF & Curva Social</span>
            <span className="text-[10px] text-slate-500">Bergson-Samuelson (1938)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
