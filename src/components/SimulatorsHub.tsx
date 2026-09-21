import React, { useState, useMemo } from 'react';
import { EdgeworthSimulator } from './simulators/EdgeworthSimulator';
import { CoaseSimulator } from './simulators/CoaseSimulator';
import { MonopolySimulator } from './simulators/MonopolySimulator';
import { HarbergerSimulator } from './simulators/HarbergerSimulator';
import { NiskanenSimulator } from './simulators/NiskanenSimulator';
import { ArrowSimulator } from './simulators/ArrowSimulator';
import { FederalismSimulator } from './simulators/FederalismSimulator';

// New Unit Simulators
import {
  MusgraveSimulator,
  SocialWelfareSimulator,
  RicardianSimulator,
  WelfareFrontierSimulator
} from './simulators/Unit1Simulators';

import {
  PigouSimulator,
  SamuelsonSimulator,
  AsymmetricInfoSimulator
} from './simulators/Unit2Simulators';

import {
  DownsSimulator,
  LogrollingSimulator,
  RentSeekingSimulator
} from './simulators/Unit3Simulators';

import {
  TaxIncidenceSimulator,
  RamseySimulator,
  LafferSimulator,
  ReformaTributariaSimulator
} from './simulators/Unit4Simulators';

import {
  OatesSimulator,
  TieboutSimulator,
  FiscalWarSimulator,
  LrfSimulator
} from './simulators/Unit5Simulators';

import { Layers, Sparkles, BookOpen, Search, Filter, Play, CheckCircle2 } from 'lucide-react';
import { GOOGLE_DRIVE_REPO } from '../data/questionsData';

export type SimulatorId =
  // Unidade 1
  | 'musgrave'
  | 'edgeworth'
  | 'social_welfare'
  | 'ricardian'
  | 'welfare_frontier'
  // Unidade 2
  | 'coase'
  | 'pigou'
  | 'samuelson'
  | 'monopoly'
  | 'asymmetric_info'
  // Unidade 3
  | 'downs'
  | 'arrow'
  | 'niskanen'
  | 'logrolling'
  | 'rent_seeking'
  // Unidade 4
  | 'tax_incidence'
  | 'harberger'
  | 'ramsey'
  | 'laffer'
  | 'reforma_tributaria'
  // Unidade 5
  | 'oates'
  | 'tiebout'
  | 'federalism'
  | 'fiscal_war'
  | 'lrf_engine';

interface SimulatorMetadata {
  id: SimulatorId;
  unidade: number;
  unidadeNome: string;
  aulaNumero: number;
  aulaTitulo: string;
  titulo: string;
  subtitulo: string;
  descricao: string;
  icone: string;
  tags: string[];
}

export const LISTA_25_SIMULADORES: SimulatorMetadata[] = [
  // ==========================================
  // UNIDADE 1 (5 SIMULADORES - Aulas 1 e 2)
  // ==========================================
  {
    id: 'musgrave',
    unidade: 1,
    unidadeNome: 'Unidade 1: Papel do Estado na Economia',
    aulaNumero: 1,
    aulaTitulo: 'Aula 01: O Papel do Estado e a Evolução das Finanças Públicas',
    titulo: 'Tríplice Função Fiscal de Musgrave',
    subtitulo: 'Alocação, Distribuição e Estabilização Macrofiscal',
    descricao: 'Calibre o orçamento governamental entre bens públicos, equalização de renda (Gini) e sustentabilidade macrofiscal anticíclica.',
    icone: '🏛️',
    tags: ['Musgrave', 'Alocativa', 'Distributiva', 'Estabilizadora', 'PIB', 'Gini']
  },
  {
    id: 'edgeworth',
    unidade: 1,
    unidadeNome: 'Unidade 1: Papel do Estado na Economia',
    aulaNumero: 2,
    aulaTitulo: 'Aula 02: Economia do Bem-Estar e Teoremas Fundamentais',
    titulo: 'Caixa de Edgeworth & Equilíbrio Geral',
    subtitulo: 'Curvas de Indiferença e Curva de Contrato de Pareto',
    descricao: 'Simule a troca pura em uma economia 2x2, igualando as Taxas Marginais de Substituição (TMS_A = TMS_B) e demonstrando o 1º e 2º Teoremas do Bem-Estar.',
    icone: '📦',
    tags: ['Edgeworth', 'Pareto', 'Equilíbrio Geral', 'TMS', 'Curva de Contrato']
  },
  {
    id: 'social_welfare',
    unidade: 1,
    unidadeNome: 'Unidade 1: Papel do Estado na Economia',
    aulaNumero: 2,
    aulaTitulo: 'Aula 02: Economia do Bem-Estar e Teoremas Fundamentais',
    titulo: 'Funções de Bem-Estar Social (SWF)',
    subtitulo: 'Bentham (Utilitarismo) vs Rawls (Maximin) vs Nash',
    descricao: 'Analise como diferentes visões filosóficas e econômicas ponderam a igualdade e a eficiência no julgamento de políticas redistributivas.',
    icone: '⚖️',
    tags: ['Bentham', 'Rawls', 'Maximin', 'Nash', 'Redistribuição', 'Ética']
  },
  {
    id: 'ricardian',
    unidade: 1,
    unidadeNome: 'Unidade 1: Papel do Estado na Economia',
    aulaNumero: 1,
    aulaTitulo: 'Aula 01: O Papel do Estado e a Evolução das Finanças Públicas',
    titulo: 'Equivalência Ricardiana vs Ilusão Fiscal',
    subtitulo: 'Proposição de Robert Barro (1974): Tributos vs Dívida',
    descricao: 'Investigue se o endividamento público realmente estimula a economia no curto prazo ou se a poupança privada neutraliza o déficit.',
    icone: '⏳',
    tags: ['Barro', 'Ricardo', 'Dívida Pública', 'Ilusão Fiscal', 'Poupança Privada']
  },
  {
    id: 'welfare_frontier',
    unidade: 1,
    unidadeNome: 'Unidade 1: Papel do Estado na Economia',
    aulaNumero: 2,
    aulaTitulo: 'Aula 02: Economia do Bem-Estar e Teoremas Fundamentais',
    titulo: 'Fronteira de Utilidade & Ponto de Bliss',
    subtitulo: 'Bergson-Samuelson e o Ponto Socialmente Ótimo',
    descricao: 'Explore a fronteira de possibilidades de utilidade (UPF) e descubra por que o Ótimo de Pareto exige um juízo de valor social para escolher uma única alocação.',
    icone: '📈',
    tags: ['UPF', 'Bergson-Samuelson', 'Ponto de Bliss', 'Bem-Estar Social']
  },

  // ==========================================
  // UNIDADE 2 (5 SIMULADORES - Aulas 3, 4 e 5)
  // ==========================================
  {
    id: 'coase',
    unidade: 2,
    unidadeNome: 'Unidade 2: Falhas de Mercado e Regulação',
    aulaNumero: 3,
    aulaTitulo: 'Aula 03: Teoria das Externalidades e Direitos de Propriedade',
    titulo: 'Teorema de Coase & Barganha Privada',
    subtitulo: 'Custos de Transação e Atribuição de Direitos',
    descricao: 'Teste a resolução negociada de externalidades entre poluidor e vítima sob diferentes níveis de atrito institucional e custos de transação.',
    icone: '🤝',
    tags: ['Coase', 'Barganha', 'Custos de Transação', 'Direitos de Propriedade']
  },
  {
    id: 'pigou',
    unidade: 2,
    unidadeNome: 'Unidade 2: Falhas de Mercado e Regulação',
    aulaNumero: 3,
    aulaTitulo: 'Aula 03: Teoria das Externalidades e Direitos de Propriedade',
    titulo: 'Imposto Pigouviano vs Padrões Ambientais',
    subtitulo: 'Calibração da Alíquota Ótima de Pigou (t* = DMg)',
    descricao: 'Internalize o dano marginal externo da poluição e observe a eliminação da perda de peso morto através do mecanismo de preços.',
    icone: '🏭',
    tags: ['Pigou', 'Externalidade Negativa', 'Tributação Ambiental', 'Dano Marginal']
  },
  {
    id: 'samuelson',
    unidade: 2,
    unidadeNome: 'Unidade 2: Falhas de Mercado e Regulação',
    aulaNumero: 4,
    aulaTitulo: 'Aula 04: Bens Públicos Puros e Recursos Comuns',
    titulo: 'Condição de Samuelson & Efeito Carona',
    subtitulo: 'Soma Vertical das Demandas (∑ TMS = TMT)',
    descricao: 'Demonstre matematicamente por que bens não-rivais e não-excludentes geram subprovisão pelo mercado quando agentes agem como caronas (free-riders).',
    icone: '💡',
    tags: ['Samuelson', 'Bens Públicos', 'Carona', 'Free-Rider', 'Soma Vertical']
  },
  {
    id: 'monopoly',
    unidade: 2,
    unidadeNome: 'Unidade 2: Falhas de Mercado e Regulação',
    aulaNumero: 4,
    aulaTitulo: 'Aula 04: Bens Públicos Puros e Recursos Comuns',
    titulo: 'Regulação do Monopólio Natural',
    subtitulo: 'Tarifação First-Best (P=CMg) vs Second-Best (P=CMe)',
    descricao: 'Simule o dilema das agências reguladoras (ANEEL, ARSESP) entre eficiência máxima com subsídio governamental ou tarifa de equilíbrio contábil.',
    icone: '⚡',
    tags: ['Monopólio Natural', 'First-Best', 'Second-Best', 'Captura', 'Regulação']
  },
  {
    id: 'asymmetric_info',
    unidade: 2,
    unidadeNome: 'Unidade 2: Falhas de Mercado e Regulação',
    aulaNumero: 5,
    aulaTitulo: 'Aula 05: Assimetria de Informação e Regulação de Mercados',
    titulo: 'Seleção Adversa & Risco Moral na Seguridade',
    subtitulo: 'Espiral da Morte de Akerlof e a Obrigatoriedade do SUS/RGPS',
    descricao: 'Descubra a fundamentação econômica para a compulsoriedade da previdência pública e planos de saúde com coparticipação.',
    icone: '🛡️',
    tags: ['Akerlof', 'Seleção Adversa', 'Risco Moral', 'Seguridade Social', 'SUS']
  },

  // ==========================================
  // UNIDADE 3 (5 SIMULADORES - Aulas 9 e 10)
  // ==========================================
  {
    id: 'downs',
    unidade: 3,
    unidadeNome: 'Unidade 3: Teoria da Escolha Pública',
    aulaNumero: 10,
    aulaTitulo: 'Aula 10: Teoria da Escolha Pública e Decisões Coletivas',
    titulo: 'Teorema do Eleitor Mediano de Anthony Downs',
    subtitulo: 'Competição Espacial e Atração Centrípeta',
    descricao: 'Simule a corrida eleitoral majoritária onde partidos convergem para as preferências do eleitor no ponto mediano da distribuição.',
    icone: '🗳️',
    tags: ['Downs', 'Eleitor Mediano', 'Eleições', 'Escolha Pública', 'Equilíbrio de Nash']
  },
  {
    id: 'arrow',
    unidade: 3,
    unidadeNome: 'Unidade 3: Teoria da Escolha Pública',
    aulaNumero: 10,
    aulaTitulo: 'Aula 10: Teoria da Escolha Pública e Decisões Coletivas',
    titulo: 'Teorema da Impossibilidade de Arrow',
    subtitulo: 'Ciclos de Condorcet e Inconsistência Democrática',
    descricao: 'Verifique a impossibilidade matemática de agregar ordenações individuais em uma escolha coletiva racional e livre de paradoxos cíclicos.',
    icone: '🔄',
    tags: ['Arrow', 'Condorcet', 'Paradoxo de Voto', 'Democracia', 'Intransitividade']
  },
  {
    id: 'niskanen',
    unidade: 3,
    unidadeNome: 'Unidade 3: Teoria da Escolha Pública',
    aulaNumero: 9,
    aulaTitulo: 'Aula 09: Economia Política da Política Fiscal e Burocracia',
    titulo: 'Modelo Burocrático de William Niskanen',
    subtitulo: 'Maximização de Orçamento onde Benefício Total = Custo Total',
    descricao: 'Entenda como as agências públicas e burocratas expandem o orçamento além do ponto de eficiência marginal em busca de poder e prestígio.',
    icone: '👔',
    tags: ['Niskanen', 'Burocracia', 'Orçamento Público', 'Sobreoferta', 'BT=CT']
  },
  {
    id: 'logrolling',
    unidade: 3,
    unidadeNome: 'Unidade 3: Teoria da Escolha Pública',
    aulaNumero: 9,
    aulaTitulo: 'Aula 09: Economia Política da Política Fiscal e Burocracia',
    titulo: 'Logrolling (Troca de Votos) & Pork-Barrel',
    subtitulo: 'Benefícios Concentrados com Custos Coletivos Difusos',
    descricao: 'Veja como alianças parlamentares aprovam projetos ineficientes que destroem o valor social ao espalhar a conta para os pagadores de impostos.',
    icone: '📜',
    tags: ['Logrolling', 'Emendas Parlamentares', 'Pork-Barrel', 'Coalizões', 'Legislativo']
  },
  {
    id: 'rent_seeking',
    unidade: 3,
    unidadeNome: 'Unidade 3: Teoria da Escolha Pública',
    aulaNumero: 9,
    aulaTitulo: 'Aula 09: Economia Política da Política Fiscal e Burocracia',
    titulo: 'Rent-Seeking de Gordon Tullock',
    subtitulo: 'Dissipação Social de Recursos na Busca por Rendas Estatais',
    descricao: 'Calcule o verdadeiro desperdício macroeconômico decorrente de lobby, advocacia e privilégios regulatórios concedidos pelo Estado.',
    icone: '💼',
    tags: ['Tullock', 'Rent-Seeking', 'Lobby', 'Monopólio Legal', 'Desperdício Social']
  },

  // ==========================================
  // UNIDADE 4 (5 SIMULADORES - Aulas 6, 7 e 8)
  // ==========================================
  {
    id: 'tax_incidence',
    unidade: 4,
    unidadeNome: 'Unidade 4: Teoria da Tributação e Eficiência',
    aulaNumero: 6,
    aulaTitulo: 'Aula 06: Fundamentos da Tributação e Incidência Econômica',
    titulo: 'Incidência Econômica vs Jurídica',
    subtitulo: 'Repasse Tributário por Elasticidades de Demanda e Oferta',
    descricao: 'Comprove que quem arca com a conta do imposto é o lado do mercado com menor capacidade de fuga, independentemente de quem recolhe a guia.',
    icone: '🏷️',
    tags: ['Incidência Tributária', 'Elasticidade', 'Repasse', 'De Facto vs De Jure']
  },
  {
    id: 'harberger',
    unidade: 4,
    unidadeNome: 'Unidade 4: Teoria da Tributação e Eficiência',
    aulaNumero: 7,
    aulaTitulo: 'Aula 07: Eficiência Tributária e Perda de Peso Morto',
    titulo: 'Triângulo de Harberger & Peso Morto',
    subtitulo: 'Distorção de Preços Relativos e o Efeito Quadrático (t²)',
    descricao: 'Simule o custo de eficiência dos impostos distorcivos e comprove por que dobrar a alíquota quadruplica a perda líquida para a sociedade.',
    icone: '📐',
    tags: ['Harberger', 'Peso Morto', 'Deadweight Loss', 'Eficiência Tributária', 't²']
  },
  {
    id: 'ramsey',
    unidade: 4,
    unidadeNome: 'Unidade 4: Teoria da Tributação e Eficiência',
    aulaNumero: 8,
    aulaTitulo: 'Aula 08: Tributação Ótima e Atualidades Tributárias',
    titulo: 'Regra de Ramsey de Tributação Ótima',
    subtitulo: 'Elasticidade Inversa e o Dilema da Equidade Distributiva',
    descricao: 'Aplique a regra matemática que minimiza o peso morto global e compreenda por que os parlamentos subsidiam a cesta básica contra a pura eficiência.',
    icone: '🛒',
    tags: ['Ramsey', 'Tributação Ótima', 'Elasticidade Inversa', 'Cesta Básica', 'Equidade']
  },
  {
    id: 'laffer',
    unidade: 4,
    unidadeNome: 'Unidade 4: Teoria da Tributação e Eficiência',
    aulaNumero: 8,
    aulaTitulo: 'Aula 08: Tributação Ótima e Atualidades Tributárias',
    titulo: 'Curva de Laffer & Receita Máxima',
    subtitulo: 'Alíquota Ótima de Arrecadação e a Zona Proibitiva',
    descricao: 'Descubra a fronteira onde o aumento das alíquotas tributárias reduz a atividade econômica a ponto de contrair a arrecadação total do governo.',
    icone: '📉',
    tags: ['Laffer', 'Curva de Laffer', 'Arrecadação', 'Lado da Oferta', 'Zona Proibitiva']
  },
  {
    id: 'reforma_tributaria',
    unidade: 4,
    unidadeNome: 'Unidade 4: Teoria da Tributação e Eficiência',
    aulaNumero: 8,
    aulaTitulo: 'Aula 08: Tributação Ótima e Atualidades Tributárias',
    titulo: 'Reforma Tributária do Consumo (EC 132/2023)',
    subtitulo: 'IVA Dual (IBS + CBS) vs Cumulatividade Tributária',
    descricao: 'Simule a substituição de PIS, COFINS, IPI, ICMS e ISS pelo modelo padrão de imposto sobre valor agregado não-cumulativo no destino com cashback social.',
    icone: '🇧🇷',
    tags: ['Reforma Tributária', 'EC 132/2023', 'IBS', 'CBS', 'IVA Dual', 'Cashback']
  },

  // ==========================================
  // UNIDADE 5 (5 SIMULADORES - Aulas 11 e 12)
  // ==========================================
  {
    id: 'oates',
    unidade: 5,
    unidadeNome: 'Unidade 5: Federalismo Fiscal e Finanças Subnacionais',
    aulaNumero: 11,
    aulaTitulo: 'Aula 11: Federalismo Fiscal e Relações Intergovernamentais',
    titulo: 'Teorema da Descentralização de Wallace Oates',
    subtitulo: 'Provisão Local Customizada vs Padrão Centralizado',
    descricao: 'Compare a perda de bem-estar decorrente de padrões federais uniformes contra as vantagens de autonomia das administrações locais e estaduais.',
    icone: '🗺️',
    tags: ['Oates', 'Descentralização', 'Federalismo Fiscal', 'Heterogeneidade Local']
  },
  {
    id: 'tiebout',
    unidade: 5,
    unidadeNome: 'Unidade 5: Federalismo Fiscal e Finanças Subnacionais',
    aulaNumero: 11,
    aulaTitulo: 'Aula 11: Federalismo Fiscal e Relações Intergovernamentais',
    titulo: 'Modelo de Tiebout: Votando com os Pés',
    subtitulo: 'Mobilidade Espacial e Competição Jurisdicional',
    descricao: 'Simule a migração de famílias e firmas entre municípios concorrentes que ofertam diferentes combinações de carga tributária e qualidade de serviços.',
    icone: '🚶',
    tags: ['Tiebout', 'Votando com os Pés', 'Competição Fiscal', 'Mobilidade']
  },
  {
    id: 'federalism',
    unidade: 5,
    unidadeNome: 'Unidade 5: Federalismo Fiscal e Finanças Subnacionais',
    aulaNumero: 11,
    aulaTitulo: 'Aula 11: Federalismo Fiscal e Relações Intergovernamentais',
    titulo: 'Transferências FPE/FPM & Efeito Flypaper',
    subtitulo: 'O Dinheiro Fica Onde Cola (Transferências vs Renda Própria)',
    descricao: 'Analise o comportamento do gasto público subnacional diante de transferências constitucionais redistributivas em contraste com a arrecadação própria.',
    icone: '💰',
    tags: ['Federalismo', 'Flypaper', 'FPE', 'FPM', 'Transferências Constitucionais']
  },
  {
    id: 'fiscal_war',
    unidade: 5,
    unidadeNome: 'Unidade 5: Federalismo Fiscal e Finanças Subnacionais',
    aulaNumero: 12,
    aulaTitulo: 'Aula 12: Finanças Públicas Subnacionais e LRF',
    titulo: 'Guerra Fiscal do ICMS (Dilema Federativo)',
    subtitulo: 'Corrida para o Fundo (Race to the Bottom) entre Estados',
    descricao: 'Teste a disputa predatória por investimentos industriais mediante renúncias fiscais e créditos presumidos e veja a solução trazida pelo IBS no destino.',
    icone: '⚔️',
    tags: ['Guerra Fiscal', 'ICMS', 'Incentivos Fiscais', 'Dilema dos Prisioneiros', 'Origem vs Destino']
  },
  {
    id: 'lrf_engine',
    unidade: 5,
    unidadeNome: 'Unidade 5: Federalismo Fiscal e Finanças Subnacionais',
    aulaNumero: 12,
    aulaTitulo: 'Aula 12: Finanças Públicas Subnacionais e LRF',
    titulo: 'Limites da LRF (LC 101/2000) & Gestão Fiscal',
    subtitulo: 'Despesa com Pessoal, Limite Prudencial e Sanções do TCE',
    descricao: 'Simule o impacto de aumentos salariais e contratações sobre a Receita Corrente Líquida (RCL) e ative os gatilhos constitucionais de ajuste fiscal.',
    icone: '📊',
    tags: ['LRF', 'LC 101/2000', 'Gastos com Pessoal', 'RCL', 'Limite Prudencial', 'TCE-MA']
  }
];

interface SimulatorsHubProps {
  initialSimulatorId?: SimulatorId;
}

export const SimulatorsHub: React.FC<SimulatorsHubProps> = ({ initialSimulatorId }) => {
  const [simuladorAtivo, setSimuladorAtivo] = useState<SimulatorId>(initialSimulatorId || 'musgrave');
  const [unidadeFiltro, setUnidadeFiltro] = useState<number | 'Todas'>('Todas');
  const [buscaTexto, setBuscaTexto] = useState<string>('');

  // Sincronizar se initialSimulatorId mudar
  React.useEffect(() => {
    if (initialSimulatorId) {
      setSimuladorAtivo(initialSimulatorId);
    }
  }, [initialSimulatorId]);

  // Filtragem dos simuladores
  const simuladoresFiltrados = useMemo(() => {
    return LISTA_25_SIMULADORES.filter((sim) => {
      const matchUnidade = unidadeFiltro === 'Todas' || sim.unidade === unidadeFiltro;
      const matchTexto =
        buscaTexto.trim() === '' ||
        sim.titulo.toLowerCase().includes(buscaTexto.toLowerCase()) ||
        sim.subtitulo.toLowerCase().includes(buscaTexto.toLowerCase()) ||
        sim.descricao.toLowerCase().includes(buscaTexto.toLowerCase()) ||
        sim.tags.some((t) => t.toLowerCase().includes(buscaTexto.toLowerCase()));
      return matchUnidade && matchTexto;
    });
  }, [unidadeFiltro, buscaTexto]);

  const simuladorAtualObj = useMemo(() => {
    return LISTA_25_SIMULADORES.find((s) => s.id === simuladorAtivo) || LISTA_25_SIMULADORES[0];
  }, [simuladorAtivo]);

  return (
    <div className="space-y-6" id="laboratorio-simuladores">
      {/* Header Banner */}
      <div className="bg-[#002752] text-white p-6 rounded-2xl shadow-sm border-b-4 border-[#ebc000] flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ebc000] text-[#002752] uppercase tracking-wider">
              Laboratório Microeconômico Computacional
            </span>
            <span className="text-xs text-slate-300">
              UEMA • Ciências Econômicas • 25 Modelos Calibrados
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight">
            Laboratório Interativo de Finanças Públicas
          </h2>
          <p className="text-sm text-slate-200 mt-1 max-w-2xl">
            Simule em tempo real 5 modelos matemáticos rigorosos por Unidade Curricular (25 no total), com formulações de equilíbrio geral, bem-estar, escolha pública, tributação e federalismo fiscal.
          </p>
        </div>

        <a
          href={GOOGLE_DRIVE_REPO}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all shadow-xs"
        >
          <BookOpen className="w-4 h-4 text-[#ebc000]" />
          Repositório de Textos (Nuvem)
        </a>
      </div>

      {/* Barra de Filtros e Busca */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-bold text-slate-700 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#002752]" />
            Filtrar por Unidade:
          </span>
          {[
            { id: 'Todas', rotulo: 'Todos (25)' },
            { id: 1, rotulo: 'Unidade 1: Papel do Estado (5)' },
            { id: 2, rotulo: 'Unidade 2: Falhas & Regulação (5)' },
            { id: 3, rotulo: 'Unidade 3: Escolha Pública (5)' },
            { id: 4, rotulo: 'Unidade 4: Tributação Ótima (5)' },
            { id: 5, rotulo: 'Unidade 5: Federalismo Fiscal (5)' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setUnidadeFiltro(item.id as any)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                unidadeFiltro === item.id
                  ? 'bg-[#002752] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {item.rotulo}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Pesquisar por modelo, autor, fórmula..."
            value={buscaTexto}
            onChange={(e) => setBuscaTexto(e.target.value)}
            className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#002752] w-56 sm:w-64"
          />
        </div>
      </div>

      {/* Grid de Seleção de Simuladores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {simuladoresFiltrados.map((sim) => {
          const ativo = simuladorAtivo === sim.id;
          return (
            <button
              key={sim.id}
              onClick={() => {
                setSimuladorAtivo(sim.id);
                const el = document.getElementById('visor-simulador-ativo');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                ativo
                  ? 'bg-[#002752] text-white border-[#002752] ring-2 ring-[#ebc000] shadow-md'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 shadow-2xs'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xl">{sim.icone}</span>
                  <span
                    className={`font-mono text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      ativo ? 'bg-[#ebc000] text-[#002752]' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    U{sim.unidade} • A{sim.aulaNumero}
                  </span>
                </div>
                <h4 className={`font-bold text-xs line-clamp-1 ${ativo ? 'text-white' : 'text-slate-900'}`}>
                  {sim.titulo}
                </h4>
                <p className={`text-[10px] line-clamp-2 ${ativo ? 'text-slate-200' : 'text-slate-500'}`}>
                  {sim.subtitulo}
                </p>
              </div>

              <div className="pt-2 mt-2 border-t border-slate-100/30 flex items-center justify-between text-[10px]">
                <span className={ativo ? 'text-[#ebc000] font-bold' : 'text-[#002752] font-semibold'}>
                  {ativo ? '● Ativo' : 'Iniciar →'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Cartão de Contexto do Simulador Ativo */}
      <div id="visor-simulador-ativo" className="p-4 bg-slate-100/80 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#002752] text-[#ebc000] flex items-center justify-center text-xl shadow-xs">
            {simuladorAtualObj.icone}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#002752] text-[#ebc000] px-2 py-0.5 rounded">
                Unidade {simuladorAtualObj.unidade}
              </span>
              <span className="text-xs text-slate-600 font-semibold">
                {simuladorAtualObj.aulaTitulo}
              </span>
            </div>
            <h3 className="text-base font-bold text-[#002752] font-serif">
              {simuladorAtualObj.titulo} • {simuladorAtualObj.subtitulo}
            </h3>
            <p className="text-xs text-slate-600 mt-0.5 max-w-3xl">
              {simuladorAtualObj.descricao}
            </p>
          </div>
        </div>
      </div>

      {/* Área Dinâmica de Renderização do Simulador Selecionado */}
      <div className="transition-all duration-300">
        {/* UNIDADE 1 */}
        {simuladorAtivo === 'musgrave' && <MusgraveSimulator />}
        {simuladorAtivo === 'edgeworth' && <EdgeworthSimulator />}
        {simuladorAtivo === 'social_welfare' && <SocialWelfareSimulator />}
        {simuladorAtivo === 'ricardian' && <RicardianSimulator />}
        {simuladorAtivo === 'welfare_frontier' && <WelfareFrontierSimulator />}

        {/* UNIDADE 2 */}
        {simuladorAtivo === 'coase' && <CoaseSimulator />}
        {simuladorAtivo === 'pigou' && <PigouSimulator />}
        {simuladorAtivo === 'samuelson' && <SamuelsonSimulator />}
        {simuladorAtivo === 'monopoly' && <MonopolySimulator />}
        {simuladorAtivo === 'asymmetric_info' && <AsymmetricInfoSimulator />}

        {/* UNIDADE 3 */}
        {simuladorAtivo === 'downs' && <DownsSimulator />}
        {simuladorAtivo === 'arrow' && <ArrowSimulator />}
        {simuladorAtivo === 'niskanen' && <NiskanenSimulator />}
        {simuladorAtivo === 'logrolling' && <LogrollingSimulator />}
        {simuladorAtivo === 'rent_seeking' && <RentSeekingSimulator />}

        {/* UNIDADE 4 */}
        {simuladorAtivo === 'tax_incidence' && <TaxIncidenceSimulator />}
        {simuladorAtivo === 'harberger' && <HarbergerSimulator />}
        {simuladorAtivo === 'ramsey' && <RamseySimulator />}
        {simuladorAtivo === 'laffer' && <LafferSimulator />}
        {simuladorAtivo === 'reforma_tributaria' && <ReformaTributariaSimulator />}

        {/* UNIDADE 5 */}
        {simuladorAtivo === 'oates' && <OatesSimulator />}
        {simuladorAtivo === 'tiebout' && <TieboutSimulator />}
        {simuladorAtivo === 'federalism' && <FederalismSimulator />}
        {simuladorAtivo === 'fiscal_war' && <FiscalWarSimulator />}
        {simuladorAtivo === 'lrf_engine' && <LrfSimulator />}
      </div>
    </div>
  );
};
