import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, Info, Users, Vote, Scale, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';

// =========================================================================
// 1. SIMULADOR DO TEOREMA DO ELEITOR MEDIANO DE DOWNS (AULA 10)
// =========================================================================
export const DownsSimulator: React.FC = () => {
  const [posicaoA, setPosicaoA] = useState<number>(30); // Posição Partidária A (0 a 100)
  const [posicaoB, setPosicaoB] = useState<number>(75); // Posição Partidária B (0 a 100)
  const eleitorMediano = 50; // Mediana da distribuição unimodal centrada

  // Ponto de indiferença do eleitor = (posicaoA + posicaoB) / 2
  const pontoCorte = (posicaoA + posicaoB) / 2;
  const votosA = Math.round(pontoCorte);
  const votosB = 100 - votosA;

  const vencedor = votosA > votosB ? 'Partido A' : votosB > votosA ? 'Partido B' : 'Empate Exato';

  const convergirAoMediano = () => {
    setPosicaoA(49);
    setPosicaoB(51);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden" id="simulador-downs">
      <div className="bg-[#002752] text-white p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ebc000] text-[#002752] mb-1">
            Aula 10 • Teoria do Eleitor Mediano e Competição Eleitoral
          </span>
          <h3 className="text-xl font-bold font-serif tracking-tight">
            Teorema do Eleitor Mediano (Anthony Downs, 1957)
          </h3>
          <p className="text-xs sm:text-sm text-slate-200">
            Simule a atração centrípeta das plataformas partidárias em regimes de votação majoritária com preferências unimodais.
          </p>
        </div>
        <button
          onClick={convergirAoMediano}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00733f] hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition-colors"
        >
          <CheckCircle2 className="w-4 h-4 text-[#ebc000]" />
          Convergência de Equilíbrio de Nash (Mediana = 50)
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Sliders de Posição Espacial */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-[#002752]">
              <span>Plataforma do Partido A:</span>
              <span className="font-mono text-sm">{posicaoA} (Esquerda/Centro)</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={posicaoA}
              onChange={(e) => setPosicaoA(Number(e.target.value))}
              className="w-full accent-[#002752] cursor-pointer"
            />
          </div>

          <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-amber-950">
              <span>Plataforma do Partido B:</span>
              <span className="font-mono text-sm">{posicaoB} (Centro/Direita)</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={posicaoB}
              onChange={(e) => setPosicaoB(Number(e.target.value))}
              className="w-full accent-amber-700 cursor-pointer"
            />
          </div>
        </div>

        {/* Eixo Espacial Visual */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
          <span className="text-xs font-bold text-slate-700 uppercase block">
            Distribuição dos Eleitores no Espectro de Preferências (0 a 100):
          </span>
          <div className="relative w-full h-8 bg-slate-200 rounded-full overflow-hidden flex">
            <div
              className="bg-[#002752] h-full flex items-center justify-center text-white text-xs font-bold transition-all"
              style={{ width: `${votosA}%` }}
            >
              Partido A: {votosA}%
            </div>
            <div
              className="bg-amber-600 h-full flex items-center justify-center text-white text-xs font-bold transition-all"
              style={{ width: `${votosB}%` }}
            >
              Partido B: {votosB}%
            </div>
          </div>
          <div className="flex justify-between text-[11px] text-slate-500 font-mono">
            <span>0 (Extremo Esquerdo)</span>
            <span className="font-bold text-[#00733f]">▲ Eleitor Mediano (50)</span>
            <span>100 (Extremo Direito)</span>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 text-center">
          <span className="text-xs text-emerald-900 uppercase font-semibold block">Resultado da Eleição</span>
          <span className="text-2xl font-black text-[#00733f] mt-1 block">
            Vencedor: {vencedor} ({Math.max(votosA, votosB)}% dos votos)
          </span>
          <span className="text-[11px] text-slate-600">
            Quem posicionar sua plataforma mais próxima do Eleitor Mediano (50) captura mais de 50% do eleitorado.
          </span>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 2. SIMULADOR DE LOGROLLING & PORK BARREL POLITICS (AULA 9)
// =========================================================================
export const LogrollingSimulator: React.FC = () => {
  const [projetoA_beneficioLocal, setProjetoA_beneficioLocal] = useState<number>(60);
  const [projetoB_beneficioLocal, setProjetoB_beneficioLocal] = useState<number>(60);
  const [custoTotalDistribuido, setCustoTotalDistribuido] = useState<number>(80); // R$ 80 bi de imposto distribuído

  // 3 Distritos (A, B e C)
  // Cada projeto custa R$ 80 bi, repartido igualmente: R$ 26,7 bi para cada distrito
  const custoPorDistrito = custoTotalDistribuido / 3;

  // Sem troca de votos:
  // Distrito A quer Projeto A (+60 - 26.7 = +33.3), mas B e C votam contra (-26.7). Projeto A é rejeitado (1 a 2).
  // Distrito B quer Projeto B (+60 - 26.7 = +33.3), mas A e C votam contra (-26.7). Projeto B é rejeitado (1 a 2).

  // Com Logrolling (Coalizão A + B):
  // Deputado de A vota Sim em B; Deputado de B vota Sim em A.
  // Ganho líquido de A com os dois aprovados: +60 - (2 * 26.7) = +60 - 53.4 = +6.6 bi (Apoia!)
  // Ganho líquido de B com os dois aprovados: +60 - (2 * 26.7) = +60 - 53.4 = +6.6 bi (Apoia!)
  // Perda de C (sem nenhum projeto local): 0 - (2 * 26.7) = -53.4 bi (Explorado pela coalizão)
  const ganhoA = projetoA_beneficioLocal - (2 * custoPorDistrito);
  const ganhoB = projetoB_beneficioLocal - (2 * custoPorDistrito);
  const perdaC = - (2 * custoPorDistrito);
  const balancoSocialGeral = ganhoA + ganhoB + perdaC;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden" id="simulador-logrolling">
      <div className="bg-[#002752] text-white p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ebc000] text-[#002752] mb-1">
            Aula 09 • Teoria da Escolha Pública (Escola da Virgínia)
          </span>
          <h3 className="text-xl font-bold font-serif tracking-tight">
            Simulador de Logrolling (Troca de Votos) & Pork-Barrel
          </h3>
          <p className="text-xs sm:text-sm text-slate-200">
            Compreenda como coalizões parlamentares aprovam emendas e obras ineficientes espalhando os custos para a coletividade.
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-[#002752] block">
              Benefício Concentrado no Distrito A (Obra Local):
            </span>
            <input
              type="range"
              min={30}
              max={100}
              value={projetoA_beneficioLocal}
              onChange={(e) => setProjetoA_beneficioLocal(Number(e.target.value))}
              className="w-full accent-[#002752]"
            />
            <div className="text-[11px] text-slate-600 font-mono">
              Benefício Privado Local: R$ {projetoA_beneficioLocal} bi
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-[#00733f] block">
              Benefício Concentrado no Distrito B (Obra Local):
            </span>
            <input
              type="range"
              min={30}
              max={100}
              value={projetoB_beneficioLocal}
              onChange={(e) => setProjetoB_beneficioLocal(Number(e.target.value))}
              className="w-full accent-[#00733f]"
            />
            <div className="text-[11px] text-slate-600 font-mono">
              Benefício Privado Local: R$ {projetoB_beneficioLocal} bi
            </div>
          </div>
        </div>

        {/* Matriz de Impacto da Coalizão */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
            <span className="text-[11px] text-blue-900 font-semibold uppercase block">Distrito A (Coalizão)</span>
            <span className="text-xl font-black text-[#002752] mt-1 block">
              {ganhoA >= 0 ? `+ R$ ${ganhoA.toFixed(1)} bi` : `- R$ ${Math.abs(ganhoA).toFixed(1)} bi`}
            </span>
            <span className="text-[10px] text-slate-500">Vota SIM</span>
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
            <span className="text-[11px] text-emerald-900 font-semibold uppercase block">Distrito B (Coalizão)</span>
            <span className="text-xl font-black text-[#00733f] mt-1 block">
              {ganhoB >= 0 ? `+ R$ ${ganhoB.toFixed(1)} bi` : `- R$ ${Math.abs(ganhoB).toFixed(1)} bi`}
            </span>
            <span className="text-[10px] text-slate-500">Vota SIM</span>
          </div>

          <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
            <span className="text-[11px] text-rose-900 font-semibold uppercase block">Distrito C (Vítima Fiscal)</span>
            <span className="text-xl font-black text-rose-700 mt-1 block">
              - R$ {Math.abs(perdaC).toFixed(1)} bi
            </span>
            <span className="text-[10px] text-rose-600 font-bold">Vota NÃO (Vencido)</span>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
            <span className="text-[11px] text-amber-900 font-semibold uppercase block">Resultado Social Líquido</span>
            <span className={`text-xl font-black mt-1 block ${balancoSocialGeral >= 0 ? 'text-[#00733f]' : 'text-rose-700'}`}>
              {balancoSocialGeral >= 0 ? `+ R$ ${balancoSocialGeral.toFixed(1)} bi` : `- R$ ${Math.abs(balancoSocialGeral).toFixed(1)} bi`}
            </span>
            <span className="text-[10px] text-slate-500">
              {balancoSocialGeral < 0 ? 'Destruição de Bem-Estar Social' : 'Superávit'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 3. SIMULADOR DE RENT-SEEKING DE TULLOCK (AULA 9)
// =========================================================================
export const RentSeekingSimulator: React.FC = () => {
  const [rendaMonopolica, setRendaMonopolica] = useState<number>(100); // R$ 100 milhões em privilégio estatal
  const [gastosLobby, setGastosLobby] = useState<number>(75); // Gastos competitivos de lobby

  const perdaDissipacaoSocial = gastosLobby; // Recursos drenados da atividade produtiva
  const taxaDissipacao = Math.min(100, Math.round((gastosLobby / rendaMonopolica) * 100));

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden" id="simulador-rent-seeking">
      <div className="bg-[#002752] text-white p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ebc000] text-[#002752] mb-1">
            Aula 09 • Dissipação de Recursos e Busca por Rendas
          </span>
          <h3 className="text-xl font-bold font-serif tracking-tight">
            Simulador de Rent-Seeking (Gordon Tullock, 1967)
          </h3>
          <p className="text-xs sm:text-sm text-slate-200">
            A verdadeira perda social do monopólio estatal não é apenas o peso morto, mas os recursos consumidos disputando o privilégio regulatório.
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-[#002752] block">
              Valor da Renda Concedida pelo Estado (Subsídio/Tarifa/Monopólio):
            </span>
            <input
              type="range"
              min={20}
              max={200}
              value={rendaMonopolica}
              onChange={(e) => setRendaMonopolica(Number(e.target.value))}
              className="w-full accent-[#002752]"
            />
            <div className="text-[11px] text-slate-600 font-mono">
              R$ {rendaMonopolica} milhões
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-rose-800 block">
              Gastos Concorrenciais de Lobby e Advocacia (Rent-Seeking):
            </span>
            <input
              type="range"
              min={0}
              max={rendaMonopolica}
              value={gastosLobby}
              onChange={(e) => setGastosLobby(Number(e.target.value))}
              className="w-full accent-rose-700"
            />
            <div className="text-[11px] text-slate-600 font-mono">
              R$ {gastosLobby} milhões despendidos
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <span className="text-xs text-slate-500 uppercase block">Renda Transferida</span>
            <span className="text-2xl font-black text-[#002752] mt-1 block">R$ {rendaMonopolica} mi</span>
            <span className="text-[10px] text-slate-400">Captura da regulação</span>
          </div>

          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50">
            <span className="text-xs text-rose-900 uppercase block font-semibold">Desperdício Social Direto</span>
            <span className="text-2xl font-black text-rose-700 mt-1 block font-mono">
              R$ {perdaDissipacaoSocial} mi
            </span>
            <span className="text-[10px] text-rose-600 font-bold">Horas de advogados, lobby e propina</span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <span className="text-xs text-slate-500 uppercase block">Taxa de Dissipação de Tullock</span>
            <span className="text-2xl font-black text-purple-950 mt-1 block">{taxaDissipacao}%</span>
            <span className="text-[10px] text-slate-400">Da renda transferida</span>
          </div>
        </div>
      </div>
    </div>
  );
};
