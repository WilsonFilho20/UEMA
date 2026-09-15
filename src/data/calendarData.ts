import { GOOGLE_DRIVE_REPO } from './questionsData';

export type TipoEventoCalendario = 'aula' | 'revisao' | 'prova' | 'prova_final';

export interface EventoCalendario {
  id: string;
  data: string; // "13/08/2026"
  diaMes: string; // "13/08"
  mes: 'Agosto' | 'Setembro' | 'Outubro' | 'Novembro' | 'Dezembro';
  diaSemana: string; // "Quinta-feira"
  horario: string; // "14:00 - 18:00 (4h/aula)"
  local: string; // "CCSA - UEMA Campus Paulo VI"
  tipo: TipoEventoCalendario;
  titulo: string;
  subtitulo: string;
  modulo: 1 | 2 | 3 | 'Geral';
  moduloNome: string;
  unidadeNumero?: number; // 1 a 5 (ou 0 para geral)
  unidadeNome?: string;
  aulaNumero?: number; // 1 a 12 se for aula
  pesoAvaliacao?: string; // e.g. "Mesmo Peso (33,33% da Média)", "Exame Final"
  resumoConteudo: string;
  topicosChave: string[];
  referencias: string[];
  simuladorAssociado?: string;
  drivePath?: string;
  statusSugerido?: 'concluida' | 'em_andamento' | 'proxima' | 'agendada';
}

export const CALENDARIO_ACADEMICO: EventoCalendario[] = [
  // ==========================================
  // AGOSTO / 2026
  // ==========================================
  {
    id: 'cal-01',
    data: '13/08/2026',
    diaMes: '13/08',
    mes: 'Agosto',
    diaSemana: 'Quinta-feira',
    horario: '14:00 - 18:00 (4h/aula)',
    local: 'CCSA - Prédio de Economia • Sala 04',
    tipo: 'aula',
    aulaNumero: 1,
    modulo: 1,
    moduloNome: 'Módulo I: Fundamentos e Falhas de Mercado (Aulas 01 a 04)',
    titulo: 'Aula 01: O Papel do Estado e a Evolução do Pensamento Econômico',
    subtitulo: 'Do Estado Mínimo e Mercantilismo ao Welfare State e a Nova Economia Pública',
    resumoConteudo: 'Abertura do semestre letivo 2026. Apresentação do plano de ensino e ementa oficial UEMA. O debate histórico entre intervenção estatal vs. livre mercado, Smith, a Grande Depressão de 1929, Keynes e Buchanan.',
    topicosChave: [
      'Origem histórica da Teoria das Finanças Públicas (Cameralismo e Fisiocracia)',
      'A doutrina da "mão invisível" e as restrições à autoridade governamental',
      'A crise de 1929 e a revolução keynesiana: legitimação da intervenção',
      'Finanças Neutras vs. Finanças Funcionais contemporâneas'
    ],
    referencias: [
      'Giambiagi & Além (Cap. 1, 2011)',
      'Matias-Pereira (Cap. 1, 2018)',
      'Buchanan (Cap. 3 e 6, 1993)'
    ],
    simuladorAssociado: 'coase',
    drivePath: GOOGLE_DRIVE_REPO,
    statusSugerido: 'concluida'
  },
  {
    id: 'cal-02',
    data: '20/08/2026',
    diaMes: '20/08',
    mes: 'Agosto',
    diaSemana: 'Quinta-feira',
    horario: '14:00 - 18:00 (4h/aula)',
    local: 'CCSA - Prédio de Economia • Sala 04',
    tipo: 'aula',
    aulaNumero: 2,
    modulo: 1,
    moduloNome: 'Módulo I: Fundamentos e Falhas de Mercado (Aulas 01 a 04)',
    titulo: 'Aula 02: As Funções Clássicas do Estado e Eficiência de Pareto',
    subtitulo: 'Alocativa, Distributiva e Estabilizadora de Musgrave; 1º e 2º Teoremas do Bem-Estar',
    resumoConteudo: 'A tríade de Musgrave (alocativa, distributiva e estabilizadora), eficiência no sentido de Pareto, Caixa de Edgeworth e os dois Teoremas Fundamentais da Economia do Bem-Estar.',
    topicosChave: [
      'Funções Alocativa, Distributiva e Estabilizadora de Richard Musgrave',
      'Critério de Eficiência de Pareto e Curva de Contrato na Caixa de Edgeworth',
      '1º Teorema do Bem-Estar (Equilíbrio concorrencial é Pareto-eficiente)',
      '2º Teorema do Bem-Estar e transferências de montante fixo (lump-sum)'
    ],
    referencias: [
      'Musgrave (The Theory of Public Finance, Cap. 1, 1959)',
      'Stiglitz & Rosengard (Cap. 1 e 3, 2016)',
      'Sanson (Unidade 1, UFSC, 2011)'
    ],
    simuladorAssociado: 'edgeworth',
    drivePath: GOOGLE_DRIVE_REPO,
    statusSugerido: 'concluida'
  },
  {
    id: 'cal-03',
    data: '27/08/2026',
    diaMes: '27/08',
    mes: 'Agosto',
    diaSemana: 'Quinta-feira',
    horario: '14:00 - 18:00 (4h/aula)',
    local: 'CCSA - Prédio de Economia • Sala 04',
    tipo: 'aula',
    aulaNumero: 3,
    modulo: 1,
    moduloNome: 'Módulo I: Fundamentos e Falhas de Mercado (Aulas 01 a 04)',
    titulo: 'Aula 03: Teorema de Coase e Custos de Transação',
    subtitulo: 'Direitos de Propriedade, Soluções Privadas para Externalidades e o Papel do Judiciário',
    resumoConteudo: 'A abordagem coasiana para externalidades. Direitos de propriedade bem delimitados vs. custos de busca, barganha e fiscalização contratual. Limitações de Coase com múltiplos agentes.',
    topicosChave: [
      'Natureza recíproca dos danos socioambientais',
      'Enunciado formal do Teorema de Coase e independência da titularidade inicial',
      'Anatomia dos custos de transação no ambiente institucional brasileiro',
      'Barganha privada vs. regulação pigouviana direta'
    ],
    referencias: [
      'Coase (The Problem of Social Cost, 1960)',
      'Stiglitz & Rosengard (Cap. 6, 2016)',
      'Arvate & Biderman (Cap. 2, 2004)'
    ],
    simuladorAssociado: 'coase',
    drivePath: GOOGLE_DRIVE_REPO,
    statusSugerido: 'concluida'
  },

  // ==========================================
  // SETEMBRO / 2026
  // ==========================================
  {
    id: 'cal-04',
    data: '03/09/2026',
    diaMes: '03/09',
    mes: 'Setembro',
    diaSemana: 'Quinta-feira',
    horario: '14:00 - 18:00 (4h/aula)',
    local: 'CCSA - Laboratório de Economia Computacional',
    tipo: 'aula',
    aulaNumero: 4,
    modulo: 1,
    moduloNome: 'Módulo I: Fundamentos e Falhas de Mercado (Aulas 01 a 04)',
    titulo: 'Aula 04: Monopólios Naturais, Regulação e Cenário de "Second Best"',
    subtitulo: 'Subaditividade de Custos, Regulação Tarifária (P=CMg vs P=CMe) e Teoria da Captura',
    resumoConteudo: 'Condições tecnológicas de monopólio natural, subaditividade da função de custo, precificação de primeiro melhor (subsídios) vs. segundo melhor (tarifa de custo médio) e Teoria da Captura de Stigler. Última aula cobrada na 1ª Avaliação (P1).',
    topicosChave: [
      'Subaditividade de custos e economias de escala em redes de utilidade pública',
      'Dilema tarifário: P = CMg (déficit financeiro) vs. P = CMe (lucro zero)',
      'Tarifas em duas partes (two-part tariffs)',
      'Assimetria de informação, risco moral e Teoria da Captura das agências reguladoras'
    ],
    referencias: [
      'Stiglitz & Rosengard (Cap. 8 e 12, 2016)',
      'Arrow (The Theory of Regulatory Enforcement, 1996)',
      'Arvate & Biderman (Cap. 3, 2004)'
    ],
    simuladorAssociado: 'monopoly',
    drivePath: GOOGLE_DRIVE_REPO,
    statusSugerido: 'concluida'
  },
  {
    id: 'cal-05',
    data: '10/09/2026',
    diaMes: '10/09',
    mes: 'Setembro',
    diaSemana: 'Quinta-feira',
    horario: '14:00 - 18:00 (4h/aula)',
    local: 'CCSA - Prédio de Economia • Sala 04',
    tipo: 'aula',
    aulaNumero: 5,
    modulo: 2,
    moduloNome: 'Módulo II: Teoria da Tributação e Bens Públicos (Aulas 05 a 08)',
    titulo: 'Aula 05: Externalidades e Bens Públicos (Conteúdo da P2)',
    subtitulo: 'Não-Rivalidade, Não-Excludibilidade, Condição de Samuelson e o Problema do Carona',
    resumoConteudo: 'Classificação analítica dos bens econômicos, agregação vertical das curvas de demanda individual, condição de Samuelson (∑TMS = TMT), comportamento do carona (free rider) e preços de Lindahl. NOTA: O conteúdo desta aula compõe a 2ª Avaliação (P2); a 1ª Avaliação (P1) abrange apenas as Aulas 01 a 04.',
    topicosChave: [
      'Matriz 2x2: Bens Privados, Bens Públicos Puros, Recursos Comuns e Bens de Clube',
      'Soma vertical da disposição marginal a pagar',
      'A Condição de Samuelson: ∑ TMS_i = TMT',
      'O carona (free-rider) como equilíbrio de Nash no Dilema dos Prisioneiros',
      'Aviso Pedagógico: Conteúdo cobrado na 2ª Avaliação (Aulas 05 a 08)'
    ],
    referencias: [
      'Samuelson (Pure Theory of Public Expenditure, 1954)',
      'Stiglitz (Economics of the Public Sector, 2000)',
      'Arvate & Biderman (Cap. 2, 2004)'
    ],
    simuladorAssociado: 'coase',
    drivePath: GOOGLE_DRIVE_REPO,
    statusSugerido: 'concluida'
  },
  {
    id: 'cal-06',
    data: '17/09/2026',
    diaMes: '17/09',
    mes: 'Setembro',
    diaSemana: 'Quinta-feira',
    horario: '14:00 - 18:00 (4h/aula)',
    local: 'CCSA - Prédio de Economia • Sala 04',
    tipo: 'revisao',
    modulo: 1,
    moduloNome: 'Módulo I: Fundamentos e Falhas de Mercado (Aulas 01 a 04)',
    titulo: 'Revisão Geral e Resolução de Questões Pré-P1 (Aulas 01 a 04)',
    subtitulo: 'Plantão de Dúvidas, Integração dos Simuladores e Simulado Rápido de Fixação',
    resumoConteudo: 'Sessão intensiva de resolução comentada de questões do banco UEMA relativas exclusivamente às Aulas 01 a 04 (Papel do Estado, Funções de Musgrave, Caixa de Edgeworth, Teorema de Coase e Monopólios Naturais). Demonstração prática dos simuladores e alinhamento preparatório para a 1ª Avaliação.',
    topicosChave: [
      'Síntese comparativa: Teoremas do Bem-Estar vs. Teorema de Coase',
      'Resolução passo a passo de questões de alta dificuldade da ANPEC e UEMA',
      'Fixação das condições matemáticas de Pareto e tarifas em duas partes',
      'Checklist preparatório para a P1 de 24/09 (Aulas 01 a 04)'
    ],
    referencias: [
      'Banco de Questões UEMA (Aulas 01 a 04)',
      'Fichas Zettelkasten Z-01.01 a Z-04.03'
    ],
    drivePath: GOOGLE_DRIVE_REPO,
    statusSugerido: 'proxima'
  },
  {
    id: 'cal-07',
    data: '24/09/2026',
    diaMes: '24/09',
    mes: 'Setembro',
    diaSemana: 'Quinta-feira',
    horario: '14:00 - 18:00',
    local: 'CCSA - Prédio de Economia • Sala 04 e Auditório',
    tipo: 'prova',
    modulo: 1,
    moduloNome: 'Módulo I: Fundamentos e Falhas de Mercado',
    titulo: '📝 1ª AVALIAÇÃO PRESENCIAL (PROVA 1)',
    subtitulo: 'Avaliação Individual Escrita sobre o Conteúdo das Aulas 01 a 04',
    pesoAvaliacao: 'Mesmo Peso • 33,33% da Média (Nota N1)',
    resumoConteudo: 'Aplicação da primeira avaliação oficial presencial do semestre letivo 2026. Instrumento composto por questões objetivas e discursivas abordando exclusivamente o escopo das Aulas 01 a 04: Papel do Estado, Funções de Musgrave, Bem-Estar de Pareto, Teorema de Coase e Monopólios Naturais.',
    topicosChave: [
      'Questões conceituais e analíticas restritas às Aulas 01, 02, 03 e 04',
      'Derivações gráficas da Caixa de Edgeworth e curvas de contrato',
      'Análise de casos práticos de barganha coasiana e regulação tarifária',
      'Regra de peso: Todas as 3 avaliações possuem o mesmo peso (Média Aritmética Simples)'
    ],
    referencias: [
      'Todo o acervo bibliográfico e fichas Zettelkasten das Aulas 01 a 04'
    ],
    drivePath: GOOGLE_DRIVE_REPO,
    statusSugerido: 'agendada'
  },

  // ==========================================
  // OUTUBRO / 2026
  // ==========================================
  {
    id: 'cal-08',
    data: '01/10/2026',
    diaMes: '01/10',
    mes: 'Outubro',
    diaSemana: 'Quinta-feira',
    horario: '14:00 - 18:00 (4h/aula)',
    local: 'CCSA - Laboratório de Economia Computacional',
    tipo: 'aula',
    aulaNumero: 6,
    modulo: 2,
    moduloNome: 'Módulo II: Teoria da Tributação e Bens Públicos (Aulas 05 a 08)',
    titulo: 'Aula 06: Eficiência e Equidade na Tributação',
    subtitulo: 'Peso Morto de Harberger, Excedentes do Consumidor/Produtor e Princípios Tributários',
    resumoConteudo: 'Princípios de tributação de Adam Smith, equidade horizontal e vertical. Derivação geométrica e analítica do triângulo de peso morto de Harberger (DWL) e custo marginal dos fundos públicos.',
    topicosChave: [
      'Princípios clássicos da tributação: neutralidade, equidade e simplicidade',
      'Derivação matemática da fórmula de Harberger: DWL = 0.5 · η · P · Q · t²',
      'Efeito quadrático da alíquota tributária sobre a ineficiência econômica',
      'O trade-off fundamental entre equidade distributiva e eficiência alocativa'
    ],
    referencias: [
      'Rosen (Public Finance, Cap. 13 e 14, 1998)',
      'Arrow, Bowles & Durlauf (Meritocracy and Economic Inequality, Cap. 8, 2000)',
      'Arvate & Biderman (Cap. 7, 2004)'
    ],
    simuladorAssociado: 'harberger',
    drivePath: GOOGLE_DRIVE_REPO,
    statusSugerido: 'agendada'
  },
  {
    id: 'cal-09',
    data: '08/10/2026',
    diaMes: '08/10',
    mes: 'Outubro',
    diaSemana: 'Quinta-feira',
    horario: '14:00 - 18:00 (4h/aula)',
    local: 'CCSA - Prédio de Economia • Sala 04',
    tipo: 'aula',
    aulaNumero: 7,
    modulo: 2,
    moduloNome: 'Módulo II: Teoria da Tributação e Bens Públicos (Aulas 05 a 08)',
    titulo: 'Aula 07: Incidência e Carga Tributária Brasileira',
    subtitulo: 'Incidência Econômica vs. Jurídica, Repasse de Preços, Regressividade e a Reforma Tributária (EC 132/23)',
    resumoConteudo: 'Incidência de fato vs. de direito. Como a elasticidade-preço relativa determina o ônus real do imposto. Diagnóstico da regressividade tributária brasileira e os impactos da Reforma Tributária sobre o Consumo (IBS e CBS).',
    topicosChave: [
      'Fórmula da fração de repasse ao consumidor: ΔPc / t = εs / (εs + |εd|)',
      'Carga Tributária Bruta (CTB) brasileira: composição sobre consumo vs. renda',
      'Regressividade sobre famílias de baixa renda e cumulatividade de resíduos fiscais',
      'A Emenda Constitucional 132/2023: substituição de ICMS/ISS por IBS e PIS/Cofins por CBS'
    ],
    referencias: [
      'Giambiagi & Além (Cap. 7, 2011)',
      'Matias-Pereira (Cap. 8, 2018)',
      'Arvate & Biderman (Cap. 6, 2004)'
    ],
    simuladorAssociado: 'harberger',
    drivePath: GOOGLE_DRIVE_REPO,
    statusSugerido: 'agendada'
  },
  {
    id: 'cal-10',
    data: '15/10/2026',
    diaMes: '15/10',
    mes: 'Outubro',
    diaSemana: 'Quinta-feira',
    horario: '14:00 - 18:00 (4h/aula)',
    local: 'CCSA - Prédio de Economia • Sala 04',
    tipo: 'aula',
    aulaNumero: 8,
    modulo: 2,
    moduloNome: 'Módulo II: Teoria da Tributação e Bens Públicos (Aulas 05 a 08)',
    titulo: 'Aula 08: Impostos sobre Renda vs. Consumo e Tributação Ótima',
    subtitulo: 'Regra da Elasticidade Inversa de Ramsey, Teorema de Corlett-Hague e Modelo de Mirrlees',
    resumoConteudo: 'Modelos normativos de tributação ótima. Regra de Ramsey para tributação de mercadorias (redução equiproporcional na demanda compensada), Corlett-Hague (sobretaxação do lazer) e o modelo de renda ótima de Mirrlees. Fechamento do conteúdo e revisão pré-P2.',
    topicosChave: [
      'Dedução analítica da Regra de Ramsey: ti / tj = εj / εi para bens independentes',
      'O conflito ético-distributivo da regra de Ramsey sobre bens essenciais inelásticos',
      'Teorema de Corlett-Hague: tributar bens complementares ao tempo de lazer',
      'Modelo de Mirrlees: tributação ótima da renda sob assimetria de informação de habilidades',
      'Orientações finais para a 2ª Avaliação (Aulas 05 a 08)'
    ],
    referencias: [
      'Ramsey (A Contribution to the Theory of Taxation, 1927)',
      'Arvate & Biderman (Cap. 8, 2004)',
      'Stiglitz & Rosengard (Cap. 16-18, 2016)'
    ],
    simuladorAssociado: 'harberger',
    drivePath: GOOGLE_DRIVE_REPO,
    statusSugerido: 'agendada'
  },
  {
    id: 'cal-11',
    data: '22/10/2026',
    diaMes: '22/10',
    mes: 'Outubro',
    diaSemana: 'Quinta-feira',
    horario: '14:00 - 18:00',
    local: 'CCSA - Prédio de Economia • Sala 04 e Auditório',
    tipo: 'prova',
    modulo: 2,
    moduloNome: 'Módulo II: Teoria da Tributação e Bens Públicos',
    titulo: '📝 2ª AVALIAÇÃO PRESENCIAL (PROVA 2)',
    subtitulo: 'Avaliação Individual Escrita sobre o Conteúdo das Aulas 05 a 08',
    pesoAvaliacao: 'Mesmo Peso • 33,33% da Média (Nota N2)',
    resumoConteudo: 'Aplicação da segunda avaliação oficial presencial do semestre letivo 2026. Conteúdo focado no escopo das Aulas 05 a 08: Bens Públicos & Samuelson, Eficiência Tributária, Peso Morto de Harberger, Incidência Econômica por Elasticidades, Carga Tributária Brasileira, EC 132/2023 e Teoria da Tributação Ótima (Ramsey/Mirrlees).',
    topicosChave: [
      'Bens públicos puros vs bens de clube e soma vertical de Samuelson (Aula 05)',
      'Cálculo e interpretação do triângulo de Harberger e elasticidades de repasse (Aulas 06 e 07)',
      'Análise comparativa da tributação sobre consumo vs. renda no Brasil e EC 132/23',
      'Aplicações da Regra da Elasticidade Inversa de Ramsey (Aula 08)',
      'Regra de peso: Todas as 3 avaliações possuem o mesmo peso (Média Aritmética Simples)'
    ],
    referencias: [
      'Todo o acervo bibliográfico e fichas Zettelkasten das Aulas 05 a 08'
    ],
    drivePath: GOOGLE_DRIVE_REPO,
    statusSugerido: 'agendada'
  },
  {
    id: 'cal-12',
    data: '29/10/2026',
    diaMes: '29/10',
    mes: 'Outubro',
    diaSemana: 'Quinta-feira',
    horario: '14:00 - 18:00 (4h/aula)',
    local: 'CCSA - Laboratório de Economia Computacional',
    tipo: 'aula',
    aulaNumero: 9,
    modulo: 3,
    moduloNome: 'Módulo III: Escolha Pública e Federalismo Fiscal (Aulas 09 a 12)',
    titulo: 'Aula 09: Teoria da Escolha Pública e Burocracia',
    subtitulo: 'A Escola da Virgínia, O Modelo de Maximização de Niskanen e o Leviatã Fiscal',
    resumoConteudo: 'Início do Módulo III (conteúdo da P3). O comportamento do agente público sob autointeresse racional. Custos de decisão coletiva de Buchanan e Tullock. O modelo analítico do burocrata maximizador de orçamento de William Niskanen.',
    topicosChave: [
      'Fundamentos metodológicos da Escola da Virgínia (Public Choice)',
      'Custos de Decisão vs. Custos Externos de votação (Cálculo do Consenso)',
      'Modelo de Niskanen: maximização de orçamento com apropriação do excedente (BT = CT)',
      'Monopólio de informação do burocrata perante o parlamento e propostas "pegar ou largar"'
    ],
    referencias: [
      'Buchanan & Tullock (The Calculus of Consent, Cap. 5 e 6, 1962)',
      'Niskanen (Bureaucracy and Representative Government, Cap. 3-6, 1971)',
      'Stiglitz (Economics of the Public Sector, Cap. 7, 2000)'
    ],
    simuladorAssociado: 'niskanen',
    drivePath: GOOGLE_DRIVE_REPO,
    statusSugerido: 'agendada'
  },

  // ==========================================
  // NOVEMBRO / 2026
  // ==========================================
  {
    id: 'cal-13',
    data: '05/11/2026',
    diaMes: '05/11',
    mes: 'Novembro',
    diaSemana: 'Quinta-feira',
    horario: '14:00 - 18:00 (4h/aula)',
    local: 'CCSA - Laboratório de Economia Computacional',
    tipo: 'aula',
    aulaNumero: 10,
    modulo: 3,
    moduloNome: 'Módulo III: Escolha Pública e Federalismo Fiscal (Aulas 09 a 12)',
    titulo: 'Aula 10: Comportamento Eleitoral, Rent-Seeking e Teorema de Arrow',
    subtitulo: 'Downs, Ciclos de Condorcet, Paradoxo da Votação, Axiomas de Arrow e Custos de Rent-Seeking',
    resumoConteudo: 'Competição eleitoral espacial de Anthony Downs e o Teorema do Eleitor Mediano. O Teorema da Impossibilidade de Kenneth Arrow e a intransitividade coletiva de Condorcet. O custo de desperdício do rent-seeking de Gordon Tullock.',
    topicosChave: [
      'Modelo de Downs: convergência ao eleitor mediano e ignorância racional',
      'Paradoxo da votação de Condorcet e ciclos intransitivos de preferências',
      'Teorema da Impossibilidade de Arrow: os 4 axiomas democráticos e o colapso na ditadura',
      'A economia do Rent-Seeking: desperdício social de recursos produtivos em busca de privilégios'
    ],
    referencias: [
      'Downs (Uma Teoria Econômica da Democracia, Cap. 2, 3 e 8, 1999)',
      'Rowley, Tollison & Tullock (The Political Economy of Rent-Seeking, 1988)',
      'Arrow (Social Choice and Individual Values, 1963)'
    ],
    simuladorAssociado: 'arrow',
    drivePath: GOOGLE_DRIVE_REPO,
    statusSugerido: 'agendada'
  },
  {
    id: 'cal-14',
    data: '12/11/2026',
    diaMes: '12/11',
    mes: 'Novembro',
    diaSemana: 'Quinta-feira',
    horario: '14:00 - 18:00 (4h/aula)',
    local: 'CCSA - Prédio de Economia • Sala 04',
    tipo: 'aula',
    aulaNumero: 11,
    modulo: 3,
    moduloNome: 'Módulo III: Escolha Pública e Federalismo Fiscal (Aulas 09 a 12)',
    titulo: 'Aula 11: Descentralização e Federalismo Fiscal',
    subtitulo: 'Teorema de Oates, Hipótese de Tiebout e Desequilíbrios Fiscais Verticais e Horizontais',
    resumoConteudo: 'Arquitetura do federalismo fiscal. Atribuições de competências por nível de governo. Teorema da Descentralização de Wallace Oates (W_desc ≥ W_cent). A hipótese de Tiebout ("votando com os pés") e os desequilíbrios verticais e horizontais.',
    topicosChave: [
      'Divisão clássica: estabilização macroeconômica central vs. bens locais descentralizados',
      'Teorema de Oates: superioridade da provisão adaptada às preferências locais',
      'O modelo de Charles Tiebout: mobilidade interjurisdicional e revelação de preferências',
      'Desequilíbrio Fiscal Vertical (gap de arrecadação) e Horizontal (disparidades regionais)'
    ],
    referencias: [
      'Oates (Fiscal Federalism, Cap. 1 e 2, 1972)',
      'Tiebout (A Pure Theory of Local Expenditures, 1956)',
      'Matias-Pereira (Cap. 12, 2018)'
    ],
    simuladorAssociado: 'federalism',
    drivePath: GOOGLE_DRIVE_REPO,
    statusSugerido: 'agendada'
  },
  {
    id: 'cal-15',
    data: '19/11/2026',
    diaMes: '19/11',
    mes: 'Novembro',
    diaSemana: 'Quinta-feira',
    horario: '14:00 - 18:00 (4h/aula)',
    local: 'CCSA - Prédio de Economia • Sala 04',
    tipo: 'aula',
    aulaNumero: 12,
    modulo: 3,
    moduloNome: 'Módulo III: Escolha Pública e Federalismo Fiscal (Aulas 09 a 12)',
    titulo: 'Aula 12: O Sistema Federativo no Brasil, Guerra Fiscal e Reformas',
    subtitulo: 'Constituição de 1988, Transferências (FPE/FPM, FUNDEB, SUS), Efeito Flypaper e Guerra do ICMS',
    resumoConteudo: 'O arranjo do federalismo fiscal brasileiro pós-CF/88. Sistema de transferências redistributivas (FPE e FPM), vinculações constitucionais (saúde e educação), Lei de Responsabilidade Fiscal (LC 101/2000), Guerra Fiscal e o Efeito Flypaper. Revisão e encerramento para a P3.',
    topicosChave: [
      'A trajetória federativa da CF/88: descentralização política e desequilíbrios de receita',
      'Mecanismos de equalização fiscal: Fundo de Participação dos Estados (FPE) e Municípios (FPM)',
      'O fenômeno do Efeito Flypaper ("o dinheiro gruda onde bate")',
      'A Guerra Fiscal do ICMS interestadual e o Fundo de Desenvolvimento Regional na EC 132/2023',
      'Orientações finais e fechamento do conteúdo da 3ª Avaliação (Aulas 09 a 12)'
    ],
    referencias: [
      'Oliveira in Arvate & Biderman (Cap. 15, 2004)',
      'World Bank (Brazil: Decentralization and Fiscal Management, 1997)',
      'Giambiagi & Além (Cap. 12, 2011)'
    ],
    simuladorAssociado: 'federalism',
    drivePath: GOOGLE_DRIVE_REPO,
    statusSugerido: 'agendada'
  },
  {
    id: 'cal-16',
    data: '26/11/2026',
    diaMes: '26/11',
    mes: 'Novembro',
    diaSemana: 'Quinta-feira',
    horario: '14:00 - 18:00',
    local: 'CCSA - Prédio de Economia • Sala 04 e Auditório',
    tipo: 'prova',
    modulo: 3,
    moduloNome: 'Módulo III: Escolha Pública e Federalismo Fiscal',
    titulo: '📝 3ª AVALIAÇÃO PRESENCIAL (PROVA 3)',
    subtitulo: 'Avaliação Individual Escrita sobre o Conteúdo das Aulas 09 a 12',
    pesoAvaliacao: 'Mesmo Peso • 33,33% da Média (Nota N3)',
    resumoConteudo: 'Aplicação da terceira avaliação oficial presencial do semestre letivo 2026. Instrumento abrangendo o escopo das Aulas 09 a 12: Teoria da Escolha Pública, Burocracia de Niskanen, Eleitor Mediano de Downs, Teorema de Arrow, Rent-Seeking, Teorema de Oates, Tiebout e Federalismo Brasileiro (FPE, LRF e Guerra Fiscal).',
    topicosChave: [
      'Modelagem analítica de Niskanen (BT=CT) e equilíbrios parlamentares (Aula 09)',
      'Demonstração da intransitividade de Arrow e ciclos de Condorcet (Aula 10)',
      'Cálculo e implicações do Teorema da Descentralização de Oates e modelo de Tiebout (Aula 11)',
      'Diagnóstico do federalismo fiscal, transferências governamentais (FPE/FPM) e efeito Flypaper (Aula 12)',
      'Regra de peso: Todas as 3 avaliações possuem o mesmo peso (Média Aritmética Simples)'
    ],
    referencias: [
      'Todo o acervo bibliográfico e fichas Zettelkasten das Aulas 09 a 12'
    ],
    drivePath: GOOGLE_DRIVE_REPO,
    statusSugerido: 'agendada'
  },

  // ==========================================
  // DEZEMBRO / 2026
  // ==========================================
  {
    id: 'cal-17',
    data: '03/12/2026',
    diaMes: '03/12',
    mes: 'Dezembro',
    diaSemana: 'Quinta-feira',
    horario: '14:00 - 18:00',
    local: 'CCSA - Prédio de Economia • Sala 04',
    tipo: 'prova_final',
    modulo: 'Geral',
    moduloNome: 'Avaliação Final & Encerramento do Semestre Letivo 2026',
    titulo: '🎓 PROVA FINAL (EXAME FINAL / AVALIAÇÃO SUBSTITUTIVA)',
    subtitulo: 'Avaliação Integral Cumulativa da Disciplina (Aulas 01 a 12) e Fechamento das Médias Finais',
    pesoAvaliacao: 'Exame Final (Substitui ou compõe a média com peso 50%)',
    resumoConteudo: 'Aplicação da Prova Final para os discentes em recuperação ou com pendência avaliativa, abrangendo a totalidade do programa da disciplina no ano de 2026 (Aulas 01 a 12). Lançamento no sistema acadêmico oficial da UEMA e encerramento do semestre letivo.',
    topicosChave: [
      'Exame integrador cumulativo de todo o conteúdo programático de 2026 (12 Aulas)',
      'Síntese entre Falhas de Mercado (Aulas 01 a 04), Eficiência Tributária & Bens Públicos (Aulas 05 a 08) e Escolha Pública & Federalismo (Aulas 09 a 12)',
      'Divulgação das notas finais e revisão de provas',
      'Encerramento do semestre letivo de 2026 do Curso de Ciências Econômicas da UEMA'
    ],
    referencias: [
      'Ementa Oficial Completa e Banco de 1.000 Questões UEMA',
      'Literatura Integral do Curso (Arvate & Biderman, Musgrave, Stiglitz, Giambiagi)'
    ],
    drivePath: GOOGLE_DRIVE_REPO,
    statusSugerido: 'agendada'
  }
];

export const RESUMO_DATAS_CHAVE = {
  inicioAulas: '13/08/2026',
  fimAulas: '03/12/2026',
  anoLetivo: '2026',
  diasSemana: 'Quintas-feiras (14:00 às 18:00)',
  criterioAprovacao: 'Média Aritmética Simples: M = (P1 + P2 + P3) / 3 (Pesos Iguais: 33,33% cada)',
  provas: [
    {
      nome: '1ª Avaliação (P1)',
      data: '24/09/2026',
      diaSemana: 'Quinta-feira',
      conteudo: 'Módulo I: Fundamentos e Falhas de Mercado (Aulas 01 a 04)',
      peso: 'Mesmo Peso (Peso 1 • 33,33% da Média)'
    },
    {
      nome: '2ª Avaliação (P2)',
      data: '22/10/2026',
      diaSemana: 'Quinta-feira',
      conteudo: 'Módulo II: Teoria da Tributação e Bens Públicos (Aulas 05 a 08)',
      peso: 'Mesmo Peso (Peso 1 • 33,33% da Média)'
    },
    {
      nome: '3ª Avaliação (P3)',
      data: '26/11/2026',
      diaSemana: 'Quinta-feira',
      conteudo: 'Módulo III: Escolha Pública e Federalismo Fiscal (Aulas 09 a 12)',
      peso: 'Mesmo Peso (Peso 1 • 33,33% da Média)'
    },
    {
      nome: 'Prova Final / Exame',
      data: '03/12/2026',
      diaSemana: 'Quinta-feira',
      conteudo: 'Conteúdo Integral do Semestre (Aulas 01 a 12)',
      peso: 'Exame Final'
    }
  ]
};

