import { Aula, ReferenciaDetalhada } from '../types';
import { ZETTELKASTEN_CARDS } from './zettelkastenData';

const GOOGLE_DRIVE_REPO = 'https://1drv.ms/f/c/560860ef5b82b0bf/IgB-al7Bl3WuRK5JTo07BVMpAd7tVh5KNk5A17-9_32Q4XU?e=Uke27d';

export const AULAS_CURSO: Aula[] = [
  // ==========================================
  // MÓDULO I: FUNDAMENTOS E FALHAS DE MERCADO
  // ==========================================
  {
    numero: 1,
    modulo: 1,
    moduloNome: 'Módulo I: Fundamentos e Falhas de Mercado',
    unidadeNumero: 1,
    unidadeNome: 'Unidade 1: O Papel do Estado na Economia (10h)',
    titulo: 'O Papel do Estado e a Evolução do Pensamento Econômico',
    subtitulo: 'Do Estado Mínimo e Mercantilismo ao Welfare State e a Nova Economia Pública',
    referencias: [
      'Giambiagi & Além (Cap. 1, 2011)',
      'Matias-Pereira (Cap. 1, 2018)',
      'Buchanan (Cap. 3 e 6, 1993)'
    ],
    referenciasDetalhadas: [
      {
        autor: 'Giambiagi, Fabio & Além, Ana Cláudia',
        ano: 2011,
        obra: 'Finanças Públicas: Teoria e Prática no Brasil',
        capituloOuPaginas: 'Capítulo 1: O Papel do Estado e a Evolução das Finanças Públicas (p. 1-28)',
        contribuicaoChave: 'Analisa a transição do modelo liberal clássico de finanças neutras para o intervencionismo desenvolvimentista e o estado de bem-estar.',
        linkDrive: GOOGLE_DRIVE_REPO
      },
      {
        autor: 'Matias-Pereira, José',
        ano: 2018,
        obra: 'Finanças Públicas: A Política Orçamentária no Brasil',
        capituloOuPaginas: 'Capítulo 1: Fundamentos da Atividade Financeira do Estado (p. 3-35)',
        contribuicaoChave: 'Discute a gênese da atividade financeira pública, a soberania fiscal do Estado e os princípios jurídicos-econômicos do orçamento.',
        linkDrive: GOOGLE_DRIVE_REPO
      },
      {
        autor: 'Buchanan, James M.',
        ano: 1993,
        obra: 'Os Limites da Liberdade: Entre a Anarquia e o Leviatã',
        capituloOuPaginas: 'Capítulos 3 e 6: A Emergência da Ordem e dos Direitos de Propriedade (p. 45-89)',
        contribuicaoChave: 'Fundamenta a teoria contratualista do Estado e os riscos da expropriação governamental ilimitada sem amarras constitucionais.',
        linkDrive: GOOGLE_DRIVE_REPO
      }
    ],
    foco: 'O debate fundamental entre intervenção estatal vs. livre mercado, origens da disciplina e fronteiras do setor público.',
    topicosChave: [
      'Origem histórica da Teoria das Finanças Públicas (Cameralismo, Fisiocracia, Clássicos)',
      'A doutrina da "mão invisível" de Adam Smith e as restrições à autoridade governamental',
      'A crise de 1929 e a revolução keynesiana: legitimação macroeconômica da intervenção',
      'O dilema entre eficiência alocativa de mercado e equidade distributiva social',
      'Buchanan e os limites constitucionais do poder fiscal do Estado'
    ],
    conceitosTeoricos: [
      {
        termo: 'Finanças Públicas Neutras (Ortodoxas)',
        definicao: 'Visão clássica em que o orçamento público deve ser estritamente equilibrado, com despesas mínimas e tributação sem distorções nos preços relativos.'
      },
      {
        termo: 'Finanças Públicas Funcionais',
        definicao: 'Abordagem contemporânea em que a política fiscal é instrumento ativo de estabilização do nível de emprego, combate à pobreza e correção de externalidades.'
      },
      {
        termo: 'Constitucionalismo Fiscal',
        definicao: 'Doutrina de Buchanan que propõe regras pétreas explícitas para restringir a capacidade coercitiva do Estado em elevar tributos ou contrair dívida.'
      }
    ],
    aplicabilidadeSetorPublico: {
      ambitoFederal: 'Definição das âncoras fiscais brasileiras (como a Lei de Responsabilidade Fiscal e o Novo Arcabouço Fiscal - LC 200/2023), que tentam conciliar a sustentabilidade da dívida pública com a preservação de pisos em saúde e educação.',
      ambitoEstadualMaranhao: 'Equilíbrio orçamentário do Governo do Maranhão perante a volatilidade de receitas de royalties de minério e transferências correntes, exigindo disciplina na execução orçamentária para manter investimentos públicos.',
      impactoPoliticaPublica: 'Evita a armadilha do endividamento descontrolado e garante previsibilidade aos agentes econômicos para investimentos produtivos de longo prazo.'
    },
    zettelkasten: ZETTELKASTEN_CARDS.filter((z) => z.aulaNumero === 1),
    simuladorAssociado: 'coase',
    drivePath: GOOGLE_DRIVE_REPO
  },
  {
    numero: 2,
    modulo: 1,
    moduloNome: 'Módulo I: Fundamentos e Falhas de Mercado',
    unidadeNumero: 1,
    unidadeNome: 'Unidade 1: O Papel do Estado na Economia (10h)',
    titulo: 'As Funções Clássicas do Estado e Eficiência de Pareto',
    subtitulo: 'Alocativa, Distributiva e Estabilizadora de Musgrave; 1º e 2º Teoremas do Bem-Estar',
    referencias: [
      'Musgrave (1959, The Theory of Public Finance)',
      'Stiglitz & Rosengard (Cap. 1 e 3, 2016)',
      'Sanson (Unidade 1, 2011)'
    ],
    referenciasDetalhadas: [
      {
        autor: 'Musgrave, Richard A.',
        ano: 1959,
        obra: 'The Theory of Public Finance: A Study in Public Economy',
        capituloOuPaginas: 'Capítulo 1: The Multiple Theory of the Public Household (p. 3-27)',
        contribuicaoChave: 'Cria a célebre separação analítica das três funções do governo: Alocativa, Distributiva e Estabilizadora.',
        linkDrive: GOOGLE_DRIVE_REPO
      },
      {
        autor: 'Stiglitz, Joseph E. & Rosengard, Jay K.',
        ano: 2016,
        obra: 'Economics of the Public Sector (4th Edition)',
        capituloOuPaginas: 'Capítulos 1 e 3: The Public Sector & Market Efficiency (p. 3-18; p. 55-82)',
        contribuicaoChave: 'Dedução formal do equilíbrio geral na Caixa de Edgeworth e prova dos Teoremas Fundamentais do Bem-Estar.',
        linkDrive: GOOGLE_DRIVE_REPO
      },
      {
        autor: 'Sanson, José Ricardo',
        ano: 2011,
        obra: 'Economia do Setor Público (UFSC)',
        capituloOuPaginas: 'Unidade 1: O Setor Público e a Eficiência Econômica (p. 11-42)',
        contribuicaoChave: 'Apresentação didática das condições marginais de Pareto para a troca, produção e alocação simultânea.',
        linkDrive: GOOGLE_DRIVE_REPO
      }
    ],
    foco: 'A tríade de Musgrave, análise microeconômica de eficiência de Pareto e equilíbrio geral na Caixa de Edgeworth.',
    topicosChave: [
      'Função Alocativa: provisão de bens públicos e mitigação de falhas de mercado',
      'Função Distributiva: redistribuição de renda mediante transferências e tributação progressiva',
      'Função Estabilizadora: emprego, estabilidade inflacionária e crescimento econômico',
      'Critério de Eficiência de Pareto: impossibilidade de melhorar a situação de um agente sem piorar a de outro',
      '1º Teorema do Bem-Estar: Equilíbrio Geral Concorrencial é Pareto-Eficiente',
      '2º Teorema do Bem-Estar: Toda alocação Pareto-ótima pode ser atingida via redistribuição lump-sum'
    ],
    conceitosTeoricos: [
      {
        termo: 'Caixa de Edgeworth',
        definicao: 'Representação geométrica bidimensional do equilíbrio de trocas entre dois indivíduos, cuja curva de contrato define as alocações eficientes onde TMS_A = TMS_B.'
      },
      {
        termo: 'Transferência Lump-Sum',
        definicao: 'Tributo ou subsídio de valor fixo que não altera os preços relativos, preservando a eficiência do 2º Teorema do Bem-Estar.'
      },
      {
        termo: 'Fronteira de Possibilidades de Utilidade',
        definicao: 'Lócus geométrico que representa os níveis máximos de utilidade que um agente pode alcançar para cada nível de utilidade do outro agente.'
      }
    ],
    aplicabilidadeSetorPublico: {
      ambitoFederal: 'Orientação da Lei Orçamentária Anual (LOA) e do PPA federal, separando os programas de combate à pobreza (distributiva), segurança e pesquisa (alocativa) e gestão da taxa Selic e metas fiscais (estabilizadora).',
      ambitoEstadualMaranhao: 'Na gestão das secretarias estaduais: SEDES (função distributiva via restaurantes populares e bolsa maranhão), SINFRA (função alocativa com pavimentação de rodovias de integração) e SEFAZ (equilíbrio das contas estaduais).',
      impactoPoliticaPublica: 'Permite aos gestores públicos diagnosticar se um programa estatal visa corrigir uma falha alocativa do mercado ou se tem propósito estritamente distributivo de justiça social.'
    },
    equacaoChave: {
      formula: 'TMS_{xy}^A = TMS_{xy}^B = \\frac{P_x}{P_y}',
      descricao: 'Condição de Eficiência de Pareto na troca entre dois indivíduos A e B'
    },
    zettelkasten: ZETTELKASTEN_CARDS.filter((z) => z.aulaNumero === 2),
    simuladorAssociado: 'edgeworth',
    drivePath: GOOGLE_DRIVE_REPO
  },
  {
    numero: 3,
    modulo: 1,
    moduloNome: 'Módulo I: Fundamentos e Falhas de Mercado',
    unidadeNumero: 2,
    unidadeNome: 'Unidade 2: Falhas de Mercado e a Função Alocativa (10h)',
    titulo: 'Teorema de Coase e Custos de Transação',
    subtitulo: 'Direitos de Propriedade, Soluções Privadas para Externalidades e o Papel do Judiciário',
    referencias: [
      'Coase (1960, The Problem of Social Cost)',
      'Stiglitz & Rosengard (Cap. 6, 2016)',
      'Arvate & Biderman (2004, Cap. 2)'
    ],
    referenciasDetalhadas: [
      {
        autor: 'Coase, Ronald H.',
        ano: 1960,
        obra: 'The Problem of Social Cost (Journal of Law and Economics)',
        capituloOuPaginas: 'Artigo Seminal (p. 1-44)',
        contribuicaoChave: 'Demonstra a natureza recíproca das externalidades e como a ausência de custos de transação viabiliza acordos eficientes.',
        linkDrive: GOOGLE_DRIVE_REPO
      },
      {
        autor: 'Stiglitz, Joseph E. & Rosengard, Jay K.',
        ano: 2016,
        obra: 'Economics of the Public Sector',
        capituloOuPaginas: 'Capítulo 6: Externalities and the Environment (p. 127-158)',
        contribuicaoChave: 'Compara a abordagem de Coase com a tributação pigouviana e o sistema de regulação de emissões.',
        linkDrive: GOOGLE_DRIVE_REPO
      },
      {
        autor: 'Arvate, Paulo & Biderman, Ciro',
        ano: 2004,
        obra: 'Economia do Setor Público no Brasil',
        capituloOuPaginas: 'Capítulo 2: Falhas de Mercado e a Intervenção do Governo (p. 15-44)',
        contribuicaoChave: 'Aplica a análise coasiana a conflitos socioambientais e custos judiciais no contexto brasileiro.',
        linkDrive: GOOGLE_DRIVE_REPO
      }
    ],
    foco: 'A delimitação de direitos de propriedade como mecanismo de barganha privada e a anatomia dos custos de transação.',
    topicosChave: [
      'Natureza recíproca dos danos ambientais e externalidades negativas',
      'O Teorema de Coase: alocação eficiente na ausência de custos de transação',
      'Custos de busca e informação, custos de barganha e custos de monitoramento/execução contratual',
      'Limitações coasianas com grande número de agentes (comportamento de carona / free rider)',
      'Soluções alternativas: impostos pigouvianos e regulação direta de comando e controle'
    ],
    conceitosTeoricos: [
      {
        termo: 'Custos de Transação',
        definicao: 'Despesas incorridas na realização de uma troca econômica, incluindo levantamento de informações, negociação de termos contratuais e fiscalização de cumprimento.'
      },
      {
        termo: 'Imposto Pigouviano',
        definicao: 'Tributo específico fixado exatamente igual ao Custo Marginal Externo no ponto socialmente ótimo, internalizando a externalidade.'
      },
      {
        termo: 'Direitos de Propriedade Bem Definidos',
        definicao: 'Titularidade jurídica inequívoca, transmissível e exigível perante terceiros, que permite ao titular excluir intrusos e comercializar o uso do recurso.'
      }
    ],
    aplicabilidadeSetorPublico: {
      ambitoFederal: 'Instituição de pagamentos por serviços ambientais (Lei 14.119/2021) e mercados regulados de carbono no Brasil, que convertem externalidades ambientais em direitos transacionáveis.',
      ambitoEstadualMaranhao: 'Mediação de conflitos fundiários e ambientais no complexo portuário de São Luís e na Bacia do Rio Itapecuru, onde o Estado atua como garantidor de titularidades para reduzir custos cartorários de transação.',
      impactoPoliticaPublica: 'Evita a sobrecarga de litígios no Poder Judiciário, priorizando mecanismos de mediação e incentivos econômicos contratuais.'
    },
    equacaoChave: {
      formula: 'CMg_{Social} = CMg_{Privado} + Dano_{Marginal}',
      descricao: 'Estrutura de custo social com presença de externalidade negativa'
    },
    zettelkasten: ZETTELKASTEN_CARDS.filter((z) => z.aulaNumero === 3),
    simuladorAssociado: 'coase',
    drivePath: GOOGLE_DRIVE_REPO
  },
  {
    numero: 4,
    modulo: 1,
    moduloNome: 'Módulo I: Fundamentos e Falhas de Mercado',
    unidadeNumero: 2,
    unidadeNome: 'Unidade 2: Falhas de Mercado e a Função Alocativa (10h)',
    titulo: 'Monopólios Naturais, Regulação e Cenário de "Second Best"',
    subtitulo: 'Subaditividade de Custos, Regulação Tarifária (P=CMg vs P=CMe) e Teoria da Captura',
    referencias: [
      'Stiglitz & Rosengard (Cap. 8 e 12, 2016)',
      'Arrow (1996, The Theory of Regulatory Enforcement)',
      'Arvate & Biderman (2004, p. 23-44)'
    ],
    referenciasDetalhadas: [
      {
        autor: 'Stiglitz, Joseph E. & Rosengard, Jay K.',
        ano: 2016,
        obra: 'Economics of the Public Sector',
        capituloOuPaginas: 'Capítulos 8 e 12: Cost-Benefit Analysis & Natural Monopoly Regulation (p. 201-228)',
        contribuicaoChave: 'Analisa o trade-off entre eficiência de alocação de 1º melhor com subsídios e 2º melhor com tarifas de custo médio.',
        linkDrive: GOOGLE_DRIVE_REPO
      },
      {
        autor: 'Arrow, Kenneth J.',
        ano: 1996,
        obra: 'The Theory of Regulatory Enforcement',
        capituloOuPaginas: 'Artigo (p. 31-48)',
        contribuicaoChave: 'Aborda a governança regulatória e a fiscalização de monopólios sob assimetria de informação.',
        linkDrive: GOOGLE_DRIVE_REPO
      },
      {
        autor: 'Arvate, Paulo & Biderman, Ciro',
        ano: 2004,
        obra: 'Economia do Setor Público no Brasil',
        capituloOuPaginas: 'Capítulo 3: Regulação e Agências Reguladoras no Brasil (p. 45-72)',
        contribuicaoChave: 'Examina a criação das agências reguladoras no Brasil (ANATEL, ANEEL, ANP) pós-privatizações dos anos 1990.',
        linkDrive: GOOGLE_DRIVE_REPO
      }
    ],
    foco: 'Economias de escala em infraestrutura, precificação de segundo melhor e dilemas de agências reguladoras sob assimetria de informação.',
    topicosChave: [
      'Subaditividade da função de custo: quando uma única firma atende o mercado a custo menor que múltiplas firmas',
      'Precificação de 1º Melhor (P = CMg): perda financeira e necessidade de subsídios públicos',
      'Precificação de 2º Melhor (P = CMe): lucro econômico nulo e sustentabilidade sem fundos públicos',
      'Tarifa em Duas Partes (Two-part tariff): cobrança de taxa fixa de acesso mais tarifa volumétrica por uso',
      'Assimetria de Informação: Risco Moral (moral hazard) e Seleção Adversa na regulação',
      'Teoria da Captura (Stigler, 1971): quando a agência reguladora passa a defender os interesses da firma regulada'
    ],
    conceitosTeoricos: [
      {
        termo: 'Subaditividade de Custo',
        definicao: 'Propriedade na qual C(q1 + q2 + ... + qn) < C(q1) + C(q2) + ... + C(qn) para quaisquer volumes de produção.'
      },
      {
        termo: 'Second Best (Lipsey & Lancaster)',
        definicao: 'Se uma das condições de Pareto não pode ser satisfeita em um mercado, satisfazer as demais condições nos outros mercados não é necessariamente o melhor arranjo social.'
      },
      {
        termo: 'Teoria da Captura',
        definicao: 'Processo pelo qual agências reguladoras passam a ser influenciadas ou controladas pelos interesses dos setores econômicos que deveriam fiscalizar.'
      }
    ],
    aplicabilidadeSetorPublico: {
      ambitoFederal: 'Atuação das agências federais (ANEEL, ANTT, ANAC) no cálculo de revisões tarifárias periódicas de energia e rodovias concessionadas, utilizando regras de teto de preço (Price Cap / IPC - X).',
      ambitoEstadualMaranhao: 'Regulação dos serviços de água e esgoto pela AGERP e concessões do novo Marco Legal do Saneamento Básico nos blocos regionais do Maranhão.',
      impactoPoliticaPublica: 'Garante que os serviços essenciais de infraestrutura continuem acessíveis à população sem que as concessionárias entrem em colapso financeiro ou abusem do poder de monopólio.'
    },
    equacaoChave: {
      formula: 'P = CMe(q) = \\frac{CF}{q} + CVMe',
      descricao: 'Regra de precificação de Custo Médio para cobertura total de custos sem déficit'
    },
    zettelkasten: ZETTELKASTEN_CARDS.filter((z) => z.aulaNumero === 4),
    simuladorAssociado: 'monopoly',
    drivePath: GOOGLE_DRIVE_REPO
  },
  {
    numero: 5,
    modulo: 2,
    moduloNome: 'Módulo II: Bens Públicos e Teoria da Tributação',
    unidadeNumero: 2,
    unidadeNome: 'Unidade 2: Falhas de Mercado e a Função Alocativa (10h)',
    titulo: 'Externalidades e Bens Públicos',
    subtitulo: 'Não-Rivalidade, Não-Excludibilidade, Condição de Samuelson e o Problema do Carona',
    referencias: [
      'Samuelson (1954, Pure Theory of Public Expenditure)',
      'Stiglitz (2000, p. 128-154)',
      'Arvate & Biderman (2004, p. 45-62)'
    ],
    referenciasDetalhadas: [
      {
        autor: 'Samuelson, Paul A.',
        ano: 1954,
        obra: 'The Pure Theory of Public Expenditure (Review of Economics and Statistics)',
        capituloOuPaginas: 'Artigo Seminal (p. 387-389)',
        contribuicaoChave: 'Formula a clássica soma vertical das demandas individuais e a condição marginal de provisão ótima.',
        linkDrive: GOOGLE_DRIVE_REPO
      },
      {
        autor: 'Stiglitz, Joseph E.',
        ano: 2000,
        obra: 'Economics of the Public Sector (3rd Edition)',
        capituloOuPaginas: 'Capítulo 6: Public Goods and Publicly Provided Private Goods (p. 128-154)',
        contribuicaoChave: 'Distingue bens públicos puros de bens com congestão e bens providos publicamente por razões de mérito.',
        linkDrive: GOOGLE_DRIVE_REPO
      },
      {
        autor: 'Arvate, Paulo & Biderman, Ciro',
        ano: 2004,
        obra: 'Economia do Setor Público no Brasil',
        capituloOuPaginas: 'Capítulo 2: Provisão de Bens Públicos e Carona (p. 45-62)',
        contribuicaoChave: 'Modela o jogo da contribuição voluntária como dilema dos prisioneiros e o papel do orçamento coercitivo.',
        linkDrive: GOOGLE_DRIVE_REPO
      }
    ],
    foco: 'A subprovisão pelo livre mercado, o jogo do dilema dos prisioneiros na contribuição voluntária e a demanda vertical.',
    topicosChave: [
      'Matriz 2x2 de bens: Privados, Públicos Puros, Recursos Comuns e Bens de Clube',
      'A curva de demanda agregada de bens públicos: soma vertical das disposições a pagar',
      'A Condição de Samuelson: ∑ TMS_i = TMT',
      'O incentivo à omissão de preferências e o comportamento do carona (free-rider)',
      'Mecanismos de revelação de preferências (Vickrey-Clarke-Groves e Lindahl)',
      'A tragédia dos recursos comuns de Hardin e os arranjos comunitários de Elinor Ostrom'
    ],
    conceitosTeoricos: [
      {
        termo: 'Não-Rivalidade',
        definicao: 'O consumo de uma unidade do bem por um indivíduo tem Custo Marginal de atendimento zero para um indivíduo adicional.'
      },
      {
        termo: 'Preços de Lindahl',
        definicao: 'Esquema teórico de tributação em que cada indivíduo paga uma cota-parte fiscal proporcional ao benefício marginal que extrai do bem público.'
      },
      {
        termo: 'Bens de Mérito (Merit Goods)',
        definicao: 'Bens que a sociedade decide ofertar gratuitamente ou subsidiar mesmo que indivíduos subestimem seu valor particular (ex: vacinação, educação básica).'
      }
    ],
    aplicabilidadeSetorPublico: {
      ambitoFederal: 'Investimentos em defesa aeroespacial, monitoramento por satélite da Amazônia Legal pelo INPE e pesquisa básica do CNPq/Fiocruz, que seriam inviáveis sem financiamento fiscal compulsório.',
      ambitoEstadualMaranhao: 'Financiamento da Universidade Estadual do Maranhão (UEMA), segurança pública ostensiva e infraestrutura de faróis e balizamento da Baía de São Marcos.',
      impactoPoliticaPublica: 'Supera a ineficiência do livre mercado em ofertar bens não-excludentes, garantindo que bens coletivos essenciais sejam financiados de modo universal e equitativo.'
    },
    equacaoChave: {
      formula: '\\sum_{i=1}^n TMS_{xy}^i = TMT_{xy}',
      descricao: 'Condição de Samuelson para a provisão ótima de bens públicos'
    },
    zettelkasten: ZETTELKASTEN_CARDS.filter((z) => z.aulaNumero === 5),
    simuladorAssociado: 'coase',
    drivePath: GOOGLE_DRIVE_REPO
  },

  // ==========================================
  // MÓDULO II: TEORIA DA TRIBUTAÇÃO E EFICIÊNCIA
  // ==========================================
  {
    numero: 6,
    modulo: 2,
    moduloNome: 'Módulo II: Teoria da Tributação e Eficiência',
    unidadeNumero: 4,
    unidadeNome: 'Unidade 4: Princípios Teóricos da Tributação (16h)',
    titulo: 'Eficiência e Equidade na Tributação',
    subtitulo: 'Peso Morto de Harberger, Excedentes do Consumidor/Produtor e Princípios Tributários',
    referencias: [
      'Rosen (1998, Public Finance, p. 302-325)',
      'Arrow, Bowles & Durlauf (Cap. 8, 2000)',
      'Arvate & Biderman (2004, Cap. 7)'
    ],
    referenciasDetalhadas: [
      {
        autor: 'Rosen, Harvey S.',
        ano: 1998,
        obra: 'Public Finance (5th Edition)',
        capituloOuPaginas: 'Capítulos 13 e 14: Taxation and Economic Efficiency (p. 302-325)',
        contribuicaoChave: 'Apresenta a geometria clássica do triângulo de Harberger e o cálculo analítico do peso morto com alíquotas ad valorem.',
        linkDrive: GOOGLE_DRIVE_REPO
      },
      {
        autor: 'Arrow, Kenneth; Bowles, Samuel & Durlauf, Steven',
        ano: 2000,
        obra: 'Meritocracy and Economic Inequality',
        capituloOuPaginas: 'Capítulo 8: Efficiency, Equity, and Tax Design (p. 180-215)',
        contribuicaoChave: 'Analisa o dilema ético e microeconômico entre tributação redistributiva e produtividade do trabalho.',
        linkDrive: GOOGLE_DRIVE_REPO
      },
      {
        autor: 'Arvate, Paulo & Biderman, Ciro',
        ano: 2004,
        obra: 'Economia do Setor Público no Brasil',
        capituloOuPaginas: 'Capítulo 7: Princípios de Tributação e Eficiência (p. 145-178)',
        contribuicaoChave: 'Contextualiza a perda de peso morto no complexo sistema tributário nacional brasileiro.',
        linkDrive: GOOGLE_DRIVE_REPO
      }
    ],
    foco: 'O cálculo geométrico e analítico da perda de peso morto tributário e os princípios do benefício vs. capacidade contributiva.',
    topicosChave: [
      'Princípios de Adam Smith: Certeza, Conveniência, Economia de cobrança e Justiça',
      'Princípio do Benefício vs. Princípio da Capacidade de Pagamento',
      'Equidade Horizontal (tratar iguais igualmente) vs. Equidade Vertical (progressividade distributiva)',
      'O triângulo de Harberger: DWL = 0.5 · η · P · Q · t²',
      'A relação não-linear entre a alíquota tributária e a perda de eficiência (efeito quadrático de t)',
      'Trade-off fundamental entre eficiência alocativa e equidade distributiva'
    ],
    conceitosTeoricos: [
      {
        termo: 'Peso Morto Tributário (Deadweight Loss)',
        definicao: 'Perda de excedente econômico total que não é capturada pelo governo na forma de receita nem usufruída por compradores ou vendedores.'
      },
      {
        termo: 'Custo Marginal dos Fundos Públicos (MCF)',
        definicao: 'Custo social total associado à arrecadação de um Real adicional de receita tributária, tipicamente superior a R$ 1,00 devido às distorções.'
      },
      {
        termo: 'Equidade Horizontal',
        definicao: 'Princípio segundo o qual contribuintes com a mesma capacidade econômica devem pagar o mesmo montante de tributos.'
      }
    ],
    aplicabilidadeSetorPublico: {
      ambitoFederal: 'Elaboração da Lei de Diretrizes Orçamentárias (LDO) e avaliação de renúncias fiscais pelo Tribunal de Contas da União (TCU), mensurando o impacto distorcivo de desonerações setoriais.',
      ambitoEstadualMaranhao: 'Calibração das alíquotas modais de ICMS pela SEFAZ-MA: aumentos sucessivos de alíquotas nominais geram peso morto quadrático e incentivam a evasão fiscal.',
      impactoPoliticaPublica: 'Direciona a política tributária a priorizar alíquotas moderadas incidentes sobre bases amplas, em vez de sobrecarregar poucos setores econômicos.'
    },
    equacaoChave: {
      formula: 'DWL \\approx \\frac{1}{2} \\cdot \\frac{\\varepsilon_d \\cdot \\varepsilon_s}{\\varepsilon_d + \\varepsilon_s} \\cdot P \\cdot Q \\cdot t^2',
      descricao: 'Fórmula do Triângulo de Peso Morto de Harberger com alíquota ad valorem t'
    },
    zettelkasten: ZETTELKASTEN_CARDS.filter((z) => z.aulaNumero === 6),
    simuladorAssociado: 'harberger',
    drivePath: GOOGLE_DRIVE_REPO
  },
  {
    numero: 7,
    modulo: 2,
    moduloNome: 'Módulo II: Teoria da Tributação e Eficiência',
    unidadeNumero: 4,
    unidadeNome: 'Unidade 4: Princípios Teóricos da Tributação (16h)',
    titulo: 'Incidência e Carga Tributária Brasileira',
    subtitulo: 'Incidência Econômica vs. Jurídica, Repasse de Preços e Perfil Regressivo no Brasil',
    referencias: [
      'Giambiagi & Além (2000, p. 145-170; 2011)',
      'Matias-Pereira (2018, Cap. 8)',
      'Arvate & Biderman (2004, Cap. 6)'
    ],
    referenciasDetalhadas: [
      {
        autor: 'Giambiagi, Fabio & Além, Ana Cláudia',
        ano: 2011,
        obra: 'Finanças Públicas: Teoria e Prática no Brasil',
        capituloOuPaginas: 'Capítulo 7: A Estrutura Tributária Brasileira (p. 185-224)',
        contribuicaoChave: 'Traça a evolução da Carga Tributária Bruta brasileira desde a década de 1960 e diagnostica sua sobrecarga no consumo.',
        linkDrive: GOOGLE_DRIVE_REPO
      },
      {
        autor: 'Matias-Pereira, José',
        ano: 2018,
        obra: 'Finanças Públicas',
        capituloOuPaginas: 'Capítulo 8: Sistema Tributário e Federalismo Fiscal (p. 210-245)',
        contribuicaoChave: 'Examina a complexidade do Sistema Tributário Nacional e as disfunções decorrentes da fragmentação de competências.',
        linkDrive: GOOGLE_DRIVE_REPO
      },
      {
        autor: 'Arvate, Paulo & Biderman, Ciro',
        ano: 2004,
        obra: 'Economia do Setor Público no Brasil',
        capituloOuPaginas: 'Capítulo 6: Incidência Tributária (p. 115-144)',
        contribuicaoChave: 'Modela analiticamente o repasse de custos tributários no equilíbrio parcial com base em elasticidades.',
        linkDrive: GOOGLE_DRIVE_REPO
      }
    ],
    foco: 'Como a elasticidade relativa determina quem efetivamente paga o imposto e o diagnóstico da carga tributária brasileira.',
    topicosChave: [
      'Diferença entre contribuinte de jure (obrigado legal) e contribuinte de facto (quem suporta o ônus)',
      'O papel das elasticidades relativas: a parte mais inelástica suporta a maior fração do imposto',
      'Carga Tributária Bruta (CTB) brasileira: evolução histórica e composição setorial',
      'Concentração excessiva na tributação sobre o consumo (ICMS, PIS/Cofins, IPI, ISS) vs. OCDE',
      'Efeito regressivo sobre as camadas de menor renda e a cumulatividade de resíduos fiscais',
      'A Reforma Tributária sobre o Consumo (EC 132/2023): IBS, CBS e Imposto Seletivo'
    ],
    conceitosTeoricos: [
      {
        termo: 'Fração de Incidência do Consumidor',
        definicao: 'Proporção do imposto transferida aos preços pagos pelos compradores: ΔP / t = ε_s / (ε_s + ε_d).'
      },
      {
        termo: 'Regressividade Tributária',
        definicao: 'Característica de um sistema fiscal em que os indivíduos com menor nível de renda pagam uma fração maior de seus rendimentos totais em tributos.'
      },
      {
        termo: 'Princípio do Destino',
        definicao: 'Regra de tributação internacional e interestadual segundo a qual o imposto sobre mercadorias e serviços é devido no local onde ocorre o consumo final.'
      }
    ],
    aplicabilidadeSetorPublico: {
      ambitoFederal: 'Implementação da transição para a CBS e IBS (EC 132/2023) pelo Comitê Gestor Nacional, reduzindo o contencioso tributário de mais de R$ 5 trilhões nas cortes administrativas (CARF) e judiciais.',
      ambitoEstadualMaranhao: 'Como o Maranhão é importador líquido de mercadorias acabadas de outros estados, a mudança da tributação na origem para o destino na Reforma Tributária expande expressivamente sua receita de IBS.',
      impactoPoliticaPublica: 'Mitiga a regressividade do sistema tributário e desonera a cesta básica de alimentos e investimentos em bens de capital para acelerar o crescimento econômico.'
    },
    equacaoChave: {
      formula: '\\frac{\\Delta P_c}{t} = \\frac{\\varepsilon_s}{\\varepsilon_s + |\\varepsilon_d|}',
      descricao: 'Incidência econômica sobre o comprador baseada nas elasticidades'
    },
    zettelkasten: ZETTELKASTEN_CARDS.filter((z) => z.aulaNumero === 7),
    simuladorAssociado: 'harberger',
    drivePath: GOOGLE_DRIVE_REPO
  },
  {
    numero: 8,
    modulo: 2,
    moduloNome: 'Módulo II: Teoria da Tributação e Eficiência',
    unidadeNumero: 4,
    unidadeNome: 'Unidade 4: Princípios Teóricos da Tributação (16h)',
    titulo: 'Impostos sobre Renda vs. Consumo e Tributação Ótima',
    subtitulo: 'Regra da Elasticidade Inversa de Ramsey, Teorema de Corlett-Hague e Modelo de Mirrlees',
    referencias: [
      'Ramsey (1927, A Contribution to the Theory of Taxation)',
      'Arvate & Biderman (2004, p. 182-210)',
      'Stiglitz & Rosengard (Cap. 16-18, 2016)'
    ],
    referenciasDetalhadas: [
      {
        autor: 'Ramsey, Frank P.',
        ano: 1927,
        obra: 'A Contribution to the Theory of Taxation (The Economic Journal)',
        capituloOuPaginas: 'Artigo Seminal (p. 47-61)',
        contribuicaoChave: 'Deriva a célebre regra de minimização do peso morto agregado para um conjunto de tributos sobre mercadorias.',
        linkDrive: GOOGLE_DRIVE_REPO
      },
      {
        autor: 'Arvate, Paulo & Biderman, Ciro',
        ano: 2004,
        obra: 'Economia do Setor Público no Brasil',
        capituloOuPaginas: 'Capítulo 8: Teoria da Tributação Ótima (p. 182-210)',
        contribuicaoChave: 'Apresenta a síntese dos modelos de Ramsey, Corlett-Hague e Mirrlees aplicados a economias em desenvolvimento.',
        linkDrive: GOOGLE_DRIVE_REPO
      },
      {
        autor: 'Stiglitz, Joseph E. & Rosengard, Jay K.',
        ano: 2016,
        obra: 'Economics of the Public Sector',
        capituloOuPaginas: 'Capítulos 16 e 18: Optimal Taxation & Taxation of Capital (p. 420-475)',
        contribuicaoChave: 'Discute a distorção intertemporal do imposto sobre a renda do capital vs. imposto sobre consumo puro.',
        linkDrive: GOOGLE_DRIVE_REPO
      }
    ],
    foco: 'O modelo de Ramsey para mercadorias, a tributação da renda ótima de Mirrlees e a distorção entre poupança e consumo intertemporal.',
    topicosChave: [
      'A dedução da Regra de Ramsey: redução equiproporcional compensada na demanda de todos os bens',
      'A Regra da Elasticidade Inversa: ti · εi = constante para bens com demandas não correlacionadas',
      'O conflito distributivo na regra de Ramsey: bens essenciais vs. bens de luxo',
      'Teorema de Corlett-Hague: tributar bens complementares ao lazer para corrigir o desincentivo ao trabalho',
      'Tributação da renda de Mirrlees: assimetria informacional sobre as habilidades produtivas intrínsecas',
      'Imposto sobre a renda vs. imposto sobre a despesa (Kaldor): a neutralidade sobre a decisão de poupança'
    ],
    conceitosTeoricos: [
      {
        termo: 'Regra de Ramsey',
        definicao: 'Para minimizar a perda de peso morto agregada, os impostos indiretos devem gerar a mesma redução percentual na quantidade demandada compensada de cada mercadoria.'
      },
      {
        termo: 'Tributação Ótima de Renda (Mirrlees)',
        definicao: 'Estrutura de alíquotas marginais que equilibra o desejo social por redistribuição com a resposta elástica da oferta de trabalho e evasão fiscal.'
      },
      {
        termo: 'Teorema de Corlett-Hague',
        definicao: 'Princípio de 2º melhor que prescreve a sobretaxação de bens e serviços complementares ao tempo de lazer para neutralizar a distorção sobre o esforço de trabalho.'
      }
    ],
    aplicabilidadeSetorPublico: {
      ambitoFederal: 'Desenho da tabela progressiva do Imposto de Renda Pessoa Física (IRPF) e discussão sobre tributação de lucros e dividendos e fundos offshore no Brasil.',
      ambitoEstadualMaranhao: 'Fixação de alíquotas diferenciadas de ICMS sobre combustíveis e energia elétrica vs. cosméticos e bens de luxo, enfrentando o conflito entre maximização de receita e justiça social.',
      impactoPoliticaPublica: 'Evita a fuga de capitais e desincentivos crônicos à oferta de trabalho qualificado, mantendo a capacidade redistributiva do Estado.'
    },
    equacaoChave: {
      formula: '\\frac{t_i}{t_j} = \\frac{\\varepsilon_j}{\\varepsilon_i}',
      descricao: 'Regra da Elasticidade Inversa de Ramsey para bens com demandas independentes'
    },
    zettelkasten: ZETTELKASTEN_CARDS.filter((z) => z.aulaNumero === 8),
    simuladorAssociado: 'harberger',
    drivePath: GOOGLE_DRIVE_REPO
  },

  // ==========================================
  // MÓDULO III: ESCOLHA PÚBLICA E FEDERALISMO
  // ==========================================
  {
    numero: 9,
    modulo: 3,
    moduloNome: 'Módulo III: Escolha Pública e Federalismo Fiscal',
    unidadeNumero: 3,
    unidadeNome: 'Unidade 3: Teoria da Escolha Pública (Public Choice) (12h)',
    titulo: 'Teoria da Escolha Pública e Burocracia',
    subtitulo: 'A Escola da Virgínia, O Modelo de Maximização de Niskanen e o Leviatã Fiscal',
    referencias: [
      'Buchanan & Tullock (1962, The Calculus of Consent)',
      'Niskanen (1971, Bureaucracy and Representative Government)',
      'Stiglitz (2000, p. 189-215)'
    ],
    referenciasDetalhadas: [
      {
        autor: 'Buchanan, James M. & Tullock, Gordon',
        ano: 1962,
        obra: 'The Calculus of Consent: Logical Foundations of Constitutional Democracy',
        capituloOuPaginas: 'Capítulos 5 e 6: The Organization of Human Activity & Costs of Decision Making (p. 43-84)',
        contribuicaoChave: 'Formaliza a microeconomia da tomada de decisões coletivas e deriva a curva ótima de custos de decisão vs. custos externos.',
        linkDrive: GOOGLE_DRIVE_REPO
      },
      {
        autor: 'Niskanen, William A.',
        ano: 1971,
        obra: 'Bureaucracy and Representative Government',
        capituloOuPaginas: 'Capítulos 3 a 6: The Bureaucrat\'s Utility Function and the Budget Output (p. 24-78)',
        contribuicaoChave: 'Constrói o modelo analítico do burocrata que maximiza o orçamento departamental gerando superprovisão de serviços.',
        linkDrive: GOOGLE_DRIVE_REPO
      },
      {
        autor: 'Stiglitz, Joseph E.',
        ano: 2000,
        obra: 'Economics of the Public Sector',
        capituloOuPaginas: 'Capítulo 7: Public Choice (p. 189-215)',
        contribuicaoChave: 'Apresenta a síntese entre falhas de mercado e falhas de governo (assimetria, burocracia e miopia eleitoral).',
        linkDrive: GOOGLE_DRIVE_REPO
      }
    ],
    foco: 'A aplicação da metodologia microeconômica ao comportamento de políticos e burocratas: autointeresse, orçamento e tamanho do Estado.',
    topicosChave: [
      'Premissa metodológica da Escolha Pública: o indivíduo no setor público age pelo autointeresse racional',
      'Custos de tomada de decisão coletiva: Custos Externos vs. Custos de Decisão (Buchanan & Tullock)',
      'O Modelo de Niskanen: o burocrata maximizador de orçamento (poder, status, equipe e remuneração)',
      'Monopólio de informação da agência perante os comitês parlamentares avaliadores',
      'Equilíbrio de Niskanen: produção onde Benefício Total iguala Custo Total (BT = CT) com excedente zero',
      'Instrumentos de controle da burocracia: privatização, agências concorrentes e orçamentação por desempenho'
    ],
    conceitosTeoricos: [
      {
        termo: 'Burocrata Maximizador de Orçamento',
        definicao: 'Agente público cuja utilidade depende da ampliação do orçamento total alocado ao seu departamento, levando à superprovisão de serviços públicos.'
      },
      {
        termo: 'Proposta Take-it-or-leave-it',
        definicao: 'Estratégia orçamentária em bloco apresentada ao parlamento que impede a deliberação na margem, forçando a aceitação de custos inflacionados.'
      },
      {
        termo: 'Custos Externos de Votação',
        definicao: 'Custos suportados por indivíduos que são obrigados a acatar decisões coletivas tomadas por maiorias contrárias à sua preferência.'
      }
    ],
    aplicabilidadeSetorPublico: {
      ambitoFederal: 'Reformas administrativas do Estado brasileiro e controle de gastos com pessoal e benefícios de corporações públicas, visando conter o crescimento inercial de despesas obrigatórias.',
      ambitoEstadualMaranhao: 'Auditorias operacionais e de desempenho realizadas pelo Tribunal de Contas do Estado (TCE-MA) e pela Secretaria de Transparência e Controle (STC-MA) para coibir o inchaço burocrático em secretarias e autarquias.',
      impactoPoliticaPublica: 'Fomenta a implementação de orçamentos por resultados (orçamento-programa) e avaliação continuada de impacto de políticas públicas.'
    },
    equacaoChave: {
      formula: 'BT(Q_{niskanen}) = CT(Q_{niskanen}) \\implies Excedente\\,L\\acute{i}quido = 0',
      descricao: 'Equilíbrio de alocação no Modelo de Niskanen com apropriação do excedente social'
    },
    zettelkasten: ZETTELKASTEN_CARDS.filter((z) => z.aulaNumero === 9),
    simuladorAssociado: 'niskanen',
    drivePath: GOOGLE_DRIVE_REPO
  },
  {
    numero: 10,
    modulo: 3,
    moduloNome: 'Módulo III: Escolha Pública e Federalismo Fiscal',
    unidadeNumero: 3,
    unidadeNome: 'Unidade 3: Teoria da Escolha Pública (Public Choice) (12h)',
    titulo: 'Comportamento Eleitoral, Rent-Seeking e Teorema de Arrow',
    subtitulo: 'Downs, Ciclos de Condorcet, Paradoxo da Votação, Axiomas de Arrow e Custos de Rent-Seeking',
    referencias: [
      'Downs (Cap. 2, 3 e 8, 1999)',
      'Rowley, Tollison & Tullock (Cap. 20, 1988)',
      'Arrow (1963, Social Choice and Individual Values)'
    ],
    referenciasDetalhadas: [
      {
        autor: 'Downs, Anthony',
        ano: 1999,
        obra: 'Uma Teoria Econômica da Democracia',
        capituloOuPaginas: 'Capítulos 2, 3 e 8: A Hipótese Básica do Modelo & A Ignorância Racional (p. 35-78; p. 165-198)',
        contribuicaoChave: 'Apresenta a competição partidária espacial, a convergência para o eleitor mediano e a ignorância racional do cidadão.',
        linkDrive: GOOGLE_DRIVE_REPO
      },
      {
        autor: 'Rowley, Charles; Tollison, Robert & Tullock, Gordon',
        ano: 1988,
        obra: 'The Political Economy of Rent-Seeking',
        capituloOuPaginas: 'Capítulo 20: The Costs of Rent Seeking (p. 280-312)',
        contribuicaoChave: 'Mensa o desperdício social decorrente da disputa de privilégios estatais concedidos por governos.',
        linkDrive: GOOGLE_DRIVE_REPO
      },
      {
        autor: 'Arrow, Kenneth J.',
        ano: 1963,
        obra: 'Social Choice and Individual Values (2nd Edition)',
        capituloOuPaginas: 'Capítulos 1 a 4: The General Possibility Theorem (p. 1-59)',
        contribuicaoChave: 'Demonstra a impossibilidade de construir uma função de bem-estar social democrática perfeita a partir de preferências individuais.',
        linkDrive: GOOGLE_DRIVE_REPO
      }
    ],
    foco: 'O processo eleitoral democrático, impossibilidade de agregação coerente de preferências e o desperdício por rent-seeking.',
    topicosChave: [
      'O Modelo Espacial de Anthony Downs: o Teorema do Eleitor Mediano em disputas bipartidárias',
      'Ignorância racional dos eleitores e paradoxo do voto',
      'Paradoxo de Condorcet: intransitividade social com preferências individuais transitivas (ciclos de votação)',
      'Teorema da Impossibilidade de Arrow: Não-ditadura, Pareto, Domínio Irrestrito e Independência das Alternativas Irrelevantes (IIA)',
      'Rent-Seeking (Tullock, 1967; Krueger, 1974): a busca por rendas criadas artificialmente pela regulação estatal',
      'O custo social do rent-seeking: desperdício de recursos reais em lobby e cartelização'
    ],
    conceitosTeoricos: [
      {
        termo: 'Rent-Seeking',
        definicao: 'Uso improdutivo de recursos econômicos (advogados, lobistas, contribuições de campanha) para obter privilégios regulatórios, subsídios ou monopólios estatais.'
      },
      {
        termo: 'Ciclo de Condorcet',
        definicao: 'Situação em que a votação por maioria resulta em preferências sociais circulares (A vence B, B vence C, C vence A), gerando instabilidade na agenda política.'
      },
      {
        termo: 'Eleitor Mediano',
        definicao: 'O eleitor cujas preferências se localizam exatamente no centro da distribuição de preferências da sociedade, sendo o voto decisivo nas eleições majoritárias.'
      }
    ],
    aplicabilidadeSetorPublico: {
      ambitoFederal: 'Tramitação de matérias fiscais e orçamentárias no Congresso Nacional, onde a regra de maioria simples frequentemente produz ciclos decisórios dependentes do poder de agenda do Presidente da Câmara.',
      ambitoEstadualMaranhao: 'Na Assembleia Legislativa do Maranhão (ALEMA), a distribuição de emendas parlamentares individuais e de bancada atua como mecanismo de acomodação de coalizões para aprovação de pacotes orçamentários do Executivo.',
      impactoPoliticaPublica: 'Orienta a criação de barreiras institucionais e regulatórias de transparência de dados públicos e registros de audiências de lobby para coibir o rent-seeking improdutivo.'
    },
    equacaoChave: {
      formula: 'A \\succ B \\land B \\succ C \\land C \\succ A',
      descricao: 'Intransitividade social característica do Paradoxo da Votação de Condorcet'
    },
    zettelkasten: ZETTELKASTEN_CARDS.filter((z) => z.aulaNumero === 10),
    simuladorAssociado: 'arrow',
    drivePath: GOOGLE_DRIVE_REPO
  },
  {
    numero: 11,
    modulo: 3,
    moduloNome: 'Módulo III: Escolha Pública e Federalismo Fiscal',
    unidadeNumero: 5,
    unidadeNome: 'Unidade 5: Introdução ao Federalismo Fiscal (12h)',
    titulo: 'Descentralização e Federalismo Fiscal',
    subtitulo: 'Teorema de Oates, Hipótese de Tiebout e Desequilíbrios Fiscais Verticais e Horizontais',
    referencias: [
      'Oates (1972, Fiscal Federalism)',
      'Tiebout (1956, A Pure Theory of Local Expenditures)',
      'Tullock (1969); Matias-Pereira (Cap. 12-13, 2018)'
    ],
    referenciasDetalhadas: [
      {
        autor: 'Oates, Wallace E.',
        ano: 1972,
        obra: 'Fiscal Federalism',
        capituloOuPaginas: 'Capítulos 1 e 2: The Economic Theory of Fiscal Federalism & The Decentralization Theorem (p. 3-64)',
        contribuicaoChave: 'Formula o clássico Teorema da Descentralização e as condições econômicas para atribuição de competências entre níveis federativos.',
        linkDrive: GOOGLE_DRIVE_REPO
      },
      {
        autor: 'Tiebout, Charles M.',
        ano: 1956,
        obra: 'A Pure Theory of Local Expenditures (Journal of Political Economy)',
        capituloOuPaginas: 'Artigo Seminal (p. 416-424)',
        contribuicaoChave: 'Demonstra que a mobilidade dos cidadãos ("votação com os pés") simula um mercado concorrencial para bens públicos locais.',
        linkDrive: GOOGLE_DRIVE_REPO
      },
      {
        autor: 'Matias-Pereira, José',
        ano: 2018,
        obra: 'Finanças Públicas',
        capituloOuPaginas: 'Capítulo 12: Descentralização e Federalismo Fiscal (p. 310-348)',
        contribuicaoChave: 'Analisa o federalismo fiscal cooperativo brasileiro sob a perspectiva das disparidades regionais e transferências intergovernamentais.',
        linkDrive: GOOGLE_DRIVE_REPO
      }
    ],
    foco: 'A divisão ótima de competências tributárias e de gastos entre níveis de governo e a revelação de preferências espaciais.',
    topicosChave: [
      'Atribuições clássicas por esfera de governo: estabilização macroeconômica central vs. bens locais descentralizados',
      'Teorema da Descentralização de Oates: a provisão local diversificada sempre supera ou iguala a provisão centralizada uniforme',
      'O modelo de Tiebout: "votando com os pés" como substituto de mercado para revelar demandas por bens públicos locais',
      'Hipóteses de Tiebout: mobilidade perfeita, informação total, multiplicidade de jurisdições e ausência de transbordamentos (spillovers)',
      'Desequilíbrio Fiscal Vertical (gap entre receitas próprias e obrigações de despesa)',
      'Desequilíbrio Fiscal Horizontal (disparidades na base tributária entre estados e municípios ricos e pobres)'
    ],
    conceitosTeoricos: [
      {
        termo: 'Teorema da Descentralização de Oates',
        definicao: 'Se os custos de provisão forem equivalentes, o fornecimento descentralizado de um bem público adaptado a cada localidade é Pareto-superior à provisão uniforme de um governo central.'
      },
      {
        termo: 'Votação com os Pés (Tiebout)',
        definicao: 'Mecanismo pelo qual as famílias escolhem morar no município que melhor combina carga tributária local com cesta de serviços públicos.'
      },
      {
        termo: 'Spillovers Interjurisdicionais',
        definicao: 'Externalidades espaciais geradas por gastos públicos de um município que beneficiam ou prejudicam residentes de municípios vizinhos sem contrapartida financeira.'
      }
    ],
    aplicabilidadeSetorPublico: {
      ambitoFederal: 'Desenho das regras de transferências obrigatórias e voluntárias da União para estados e municípios, calibrando fundos de equalização fiscal para compensar desequilíbrios regionais.',
      ambitoEstadualMaranhao: 'Na Região Metropolitana da Grande São Luís (São Luís, Ribamar, Paço do Lumiar e Raposa), a dinâmica de mobilidade populacional e prestação de serviços de transporte e saúde reflete diretamente as premissas de Tiebout e spillovers.',
      impactoPoliticaPublica: 'Evita a supercentralização de decisões em órgãos federais distantes da realidade local e estimula a autonomia administrativa de governos subnacionais.'
    },
    equacaoChave: {
      formula: 'W_{descentralizado} \\ge W_{centralizado}',
      descricao: 'Enunciado do Teorema da Descentralização Fiscal de Wallace Oates'
    },
    zettelkasten: ZETTELKASTEN_CARDS.filter((z) => z.aulaNumero === 11),
    simuladorAssociado: 'federalism',
    drivePath: GOOGLE_DRIVE_REPO
  },
  {
    numero: 12,
    modulo: 3,
    moduloNome: 'Módulo III: Escolha Pública e Federalismo Fiscal',
    unidadeNumero: 5,
    unidadeNome: 'Unidade 5: Introdução ao Federalismo Fiscal (12h)',
    titulo: 'O Sistema Federativo no Brasil, Guerra Fiscal e Reformas',
    subtitulo: 'Constituição de 1988, Transferências (FPE/FPM, FUNDEB, SUS), Efeito Flypaper e Guerra do ICMS',
    referencias: [
      'Oliveira in Arvate & Biderman (2004, p. 415-442)',
      'World Bank (1997, Decentralization and Fiscal Management)',
      'Giambiagi & Além (2011, Cap. 12)'
    ],
    referenciasDetalhadas: [
      {
        autor: 'Oliveira, Fabrício Augusto de',
        ano: 2004,
        obra: 'Economia do Setor Público no Brasil (Org. Arvate & Biderman)',
        capituloOuPaginas: 'Capítulo 15: O Federalismo Fiscal Brasileiro: Rumo à Centralização? (p. 415-442)',
        contribuicaoChave: 'Examina a trajetória de descentralização da CF/88 seguida pela recentralização federal via contribuições e guerra fiscal de ICMS.',
        linkDrive: GOOGLE_DRIVE_REPO
      },
      {
        autor: 'World Bank',
        ano: 1997,
        obra: 'Brazil: Decentralization and Fiscal Management',
        capituloOuPaginas: 'Relatório Técnico nº 15616-BR (p. 1-112)',
        contribuicaoChave: 'Diagnóstico aprofundado dos riscos macroeconômicos do endividamento subnacional pré-Lei de Responsabilidade Fiscal.',
        linkDrive: GOOGLE_DRIVE_REPO
      },
      {
        autor: 'Giambiagi, Fabio & Além, Ana Cláudia',
        ano: 2011,
        obra: 'Finanças Públicas: Teoria e Prática no Brasil',
        capituloOuPaginas: 'Capítulo 12: O Federalismo Fiscal no Brasil (p. 345-388)',
        contribuicaoChave: 'Descreve as fórmulas matemáticas de rateio do FPE e FPM, as vinculações constitucionais de saúde e educação e a LRF.',
        linkDrive: GOOGLE_DRIVE_REPO
      }
    ],
    foco: 'O modelo federativo trino brasileiro, a rigidez orçamentária constitucional, o efeito flypaper e a disputa interestadual de ICMS.',
    topicosChave: [
      'O federalismo tripartite singular do Brasil: União, 26 Estados + DF e mais de 5.570 Municípios como entes autônomos',
      'A descentralização das receitas pós-1988 e a recentralização federal via contribuições não partilhadas (COFINS, CSLL)',
      'O mecanismo redistributivo dos fundos constitucionais: Fundo de Participação dos Estados (FPE) e dos Municípios (FPM)',
      'O efeito "Flypaper": por que transferências incondicionais expandem os gastos públicos locais mais do que a renda privada?',
      'A Guerra Fiscal do ICMS: concessão unilateral de incentivos tributários e perda agregada de arrecadação',
      'Fundos setoriais obrigatórios: FUNDEB (educação) e repasses vinculados ao SUS (saúde)',
      'A Lei de Responsabilidade Fiscal (LC 101/2000) e as amarras da rigidez orçamentária'
    ],
    conceitosTeoricos: [
      {
        termo: 'Efeito Flypaper',
        definicao: 'Constatação empírica de que transferências intergovernamentais em bloco aumentam o gasto público local mais do que um aumento proporcional na renda dos residentes ("o dinheiro gruda onde ele cai").'
      },
      {
        termo: 'Guerra Fiscal',
        definicao: 'Competição tributária predatória entre governos subnacionais por meio de renúncias e incentivos fiscais para atrair investimentos produtivos.'
      },
      {
        termo: 'Receita Corrente Líquida (RCL)',
        definicao: 'Base contábil apurada nos termos da Lei de Responsabilidade Fiscal utilizada como denominador para todos os limites prudenciais de despesa de pessoal e dívida pública.'
      }
    ],
    aplicabilidadeSetorPublico: {
      ambitoFederal: 'Operação dos fundos constitucionais FPE/FPM e gestão das transferências fundo a fundo do Ministério da Saúde e FNDE, garantindo pisos orçamentários nacionais.',
      ambitoEstadualMaranhao: 'O FPE representa a principal fonte individual de receita corrente líquida do Maranhão; o cumprimento dos limites da LRF é condição obrigatória para obtenção de garantias da União em operações de crédito externo (ex: BID e BIRD).',
      impactoPoliticaPublica: 'Controla a solvência fiscal de governos locais e evita calotes da dívida pública, garantindo a continuidade de serviços públicos fundamentais.'
    },
    equacaoChave: {
      formula: '\\frac{\\partial G_{local}}{\\partial Transfer\\hat{e}ncia} > \\frac{\\partial G_{local}}{\\partial Renda_{pr\\acute{o}pria}}',
      descricao: 'Condição empírica definidora do Efeito Flypaper'
    },
    zettelkasten: ZETTELKASTEN_CARDS.filter((z) => z.aulaNumero === 12),
    simuladorAssociado: 'federalism',
    drivePath: GOOGLE_DRIVE_REPO
  }
];
