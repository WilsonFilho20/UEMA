import React, { useState } from 'react';
import { EdgeworthSimulator } from './simulators/EdgeworthSimulator';
import { CoaseSimulator } from './simulators/CoaseSimulator';
import { MonopolySimulator } from './simulators/MonopolySimulator';
import { HarbergerSimulator } from './simulators/HarbergerSimulator';
import { NiskanenSimulator } from './simulators/NiskanenSimulator';
import { ArrowSimulator } from './simulators/ArrowSimulator';
import { FederalismSimulator } from './simulators/FederalismSimulator';
import { Layers, Sparkles, BookOpen } from 'lucide-react';
import { GOOGLE_DRIVE_REPO } from '../data/questionsData';

export const SimulatorsHub: React.FC = () => {
  const [simuladorAtivo, setSimuladorAtivo] = useState<
    'edgeworth' | 'coase' | 'monopoly' | 'harberger' | 'niskanen' | 'arrow' | 'federalism'
  >('edgeworth');

  const simuladores = [
    {
      id: 'edgeworth',
      titulo: 'Caixa de Edgeworth',
      aula: 'Aula 2 • 1º e 2º Teoremas',
      descricao: 'Equilíbrio geral na troca, curvas de indiferença e curva de contrato de Pareto.',
      icone: '📦'
    },
    {
      id: 'coase',
      titulo: 'Teorema de Coase',
      aula: 'Aula 3 • Direitos de Propriedade',
      descricao: 'Barganha privada, titularidade jurídica e anatomia dos custos de transação.',
      icone: '⚖️'
    },
    {
      id: 'monopoly',
      titulo: 'Monopólio Natural',
      aula: 'Aula 4 • P=CMg vs P=CMe',
      descricao: 'Subaditividade de custos, déficit em First-Best e Teoria da Captura.',
      icone: '🏭'
    },
    {
      id: 'harberger',
      titulo: 'Peso Morto de Harberger',
      aula: 'Aula 6 & 8 • Tributação Ótima',
      descricao: 'Distorção nos preços relativos, efeito quadrático t² e Regra de Ramsey.',
      icone: '📐'
    },
    {
      id: 'niskanen',
      titulo: 'Burocracia de Niskanen',
      aula: 'Aula 9 • Escolha Pública',
      descricao: 'Maximização orçamentária onde BT = CT e sobreoferta de serviços públicos.',
      icone: '🏛️'
    },
    {
      id: 'arrow',
      titulo: 'Teorema de Arrow',
      aula: 'Aula 10 • Ciclos de Condorcet',
      descricao: 'Axiomas democráticos, intransitividade social e a regra da maioria.',
      icone: '🗳️'
    },
    {
      id: 'federalism',
      titulo: 'Federalismo & Flypaper',
      aula: 'Aula 11 & 12 • FPE/FPM & Tiebout',
      descricao: 'Efeito Flypaper, guerra fiscal do ICMS e "votando com os pés".',
      icone: '🇧🇷'
    }
  ];

  return (
    <div className="space-y-6" id="laboratorio-simuladores">
      {/* Header Banner */}
      <div className="bg-[#002752] text-white p-6 rounded-2xl shadow-sm border-b-4 border-[#ebc000] flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ebc000] text-[#002752] uppercase tracking-wider">
              Laboratório Microeconômico Computacional
            </span>
            <span className="text-xs text-slate-300">
              UEMA • Ciências Econômicas
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight">
            Simuladores Interativos de Finanças Públicas
          </h2>
          <p className="text-sm text-slate-200 mt-1 max-w-2xl">
            Experimente em tempo real as propriedades de equilíbrio geral, regimes tributários e escolhas coletivas com modelagem matemática rigorosa.
          </p>
        </div>

        <a
          href={GOOGLE_DRIVE_REPO}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all"
        >
          <BookOpen className="w-4 h-4 text-[#ebc000]" />
          Textos no Google Drive
        </a>
      </div>

      {/* Simulator Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {simuladores.map((sim) => {
          const ativo = simuladorAtivo === sim.id;
          return (
            <button
              key={sim.id}
              onClick={() => setSimuladorAtivo(sim.id as any)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                ativo
                  ? 'bg-[#002752] text-white border-[#002752] ring-2 ring-[#ebc000] shadow-md'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div>
                <div className="text-xl mb-1">{sim.icone}</div>
                <div className={`font-bold text-xs ${ativo ? 'text-white' : 'text-slate-900'}`}>
                  {sim.titulo}
                </div>
              </div>
              <div className={`text-[10px] mt-2 font-medium ${ativo ? 'text-[#ebc000]' : 'text-slate-500'}`}>
                {sim.aula.split('•')[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Simulator Display */}
      <div>
        {simuladorAtivo === 'edgeworth' && <EdgeworthSimulator />}
        {simuladorAtivo === 'coase' && <CoaseSimulator />}
        {simuladorAtivo === 'monopoly' && <MonopolySimulator />}
        {simuladorAtivo === 'harberger' && <HarbergerSimulator />}
        {simuladorAtivo === 'niskanen' && <NiskanenSimulator />}
        {simuladorAtivo === 'arrow' && <ArrowSimulator />}
        {simuladorAtivo === 'federalism' && <FederalismSimulator />}
      </div>
    </div>
  );
};
