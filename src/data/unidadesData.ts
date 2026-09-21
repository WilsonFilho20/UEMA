import { UnidadeCurricular, ReferenciaOficial } from '../types';

export const UNIDADES_CURRICULARES: UnidadeCurricular[] = [
  {
    numero: 1,
    titulo: 'O Papel do Estado na Economia',
    cargaHoraria: '10h',
    cargaHorariaHoras: 10,
    descricao: 'Aborda a evolução histórica do pensamento econômico sobre o Estado, os fundamentos da intervenção pública, as três funções clássicas de Musgrave (Alocativa, Distributiva e Estabilizadora) e os limites constitucionais entre Estado e mercado.',
    subtopicos: [
      {
        numero: 1,
        titulo: 'Evolução histórica do pensamento econômico sobre o Estado.',
        referenciasTexto: 'GIAMBIAGI e ALÉM, Cap. 1, 2011; MATIAS-PEREIRA, Cap. 1, 2018',
        referenciasDetalhadas: [
          'GIAMBIAGI, Fabio; ALÉM, Ana Cláudia. Finanças públicas: teoria e prática no Brasil. 4. ed. Elsevier, 2011. Cap. 1.',
          'MATIAS-PEREIRA, José. Finanças públicas. 7. ed. Atlas, 2018. Cap. 1.'
        ]
      },
      {
        numero: 2,
        titulo: 'As funções clássicas do Estado (Alocativa, Distributiva e Estabilizadora).',
        referenciasTexto: 'GIAMBIAGI e ALÉM, Cap. 1, 2011; STIGLITZ e ROSENGARD, Cap. 1, 2016; SANSON, Unidade 1, 2011',
        referenciasDetalhadas: [
          'GIAMBIAGI, Fabio; ALÉM, Ana Cláudia. Finanças públicas: teoria e prática no Brasil. 4. ed. Elsevier, 2011. Cap. 1.',
          'STIGLITZ, Joseph E.; ROSENGARD, Jay K. La economía del sector público. 4. ed. Antoni Bosch, 2016. Cap. 1.',
          'SANSON, João R. Teoria das finanças públicas. Florianópolis: UFSC/UAB, 2011. Unidade 1.'
        ]
      },
      {
        numero: 3,
        titulo: 'O debate entre intervenção estatal e livre mercado.',
        referenciasTexto: 'BUCHANAN, Cap. 3 e 6, 1993',
        referenciasDetalhadas: [
          'BUCHANAN, James M. Custo e escolha: uma indagação em teoria econômica. Rio de Janeiro: Instituto Liberal, 1993. Cap. 3 e 6.'
        ]
      }
    ],
    aulasRelacionadas: [1, 2],
    avaliacaoRelacionada: '1ª Avaliação (P1 - Aulas 1 a 4)',
    simuladores: ['musgrave', 'edgeworth', 'social_welfare', 'ricardian', 'welfare_frontier'],
    competencias: [
      'Compreender as matrizes teóricas do mercantilismo, liberalismo clássico e keynesianismo',
      'Distinguir com precisão micro e macroeconômica as funções Alocativa, Distributiva e Estabilizadora',
      'Analisar a eficiência de Pareto na Caixa de Edgeworth e os dois Teoremas Fundamentais do Bem-Estar',
      'Debater a economia política da intervenção sob a perspectiva do custo de oportunidade e da escolha pública'
    ],
    referencias: [
      'GIAMBIAGI e ALÉM (Cap. 1, 2011)',
      'MATIAS-PEREIRA (Cap. 1, 2018)',
      'STIGLITZ e ROSENGARD (Cap. 1, 2016)',
      'SANSON (Unidade 1, 2011)',
      'BUCHANAN (Cap. 3 e 6, 1993)'
    ]
  },
  {
    numero: 2,
    titulo: 'Falhas de Mercado e a Função Alocativa',
    cargaHoraria: '10h',
    cargaHorariaHoras: 10,
    descricao: 'Examina os desvios da eficiência paretiana de mercado: bens públicos e o problema do carona (free-rider), externalidades tecnológicas e pecuniárias com o Teorema de Coase, e monopólios naturais com regulação tarifária.',
    subtopicos: [
      {
        numero: 1,
        titulo: 'Bens Públicos (Puros e Impuros) e o problema do free-rider.',
        referenciasTexto: 'STIGLITZ e ROSENGARD, Cap. 5, 2016',
        referenciasDetalhadas: [
          'STIGLITZ, Joseph E.; ROSENGARD, Jay K. La economía del sector público. 4. ed. Antoni Bosch, 2016. Cap. 5.',
          'TULLOCK, Gordon. Hawks, Doves, and Free Riders. Kyklos, v. 45, 1992.',
          'TULLOCK, Gordon. Provision of Public Goods through Privatization. Kyklos, v. 49, 1996.'
        ]
      },
      {
        numero: 2,
        titulo: 'Externalidades (Positivas e Negativas) e Teorema de Coase.',
        referenciasTexto: 'STIGLITZ e ROSENGARD, Cap. 6, 2016',
        referenciasDetalhadas: [
          'STIGLITZ, Joseph E.; ROSENGARD, Jay K. La economía del sector público. 4. ed. Antoni Bosch, 2016. Cap. 6.',
          'TULLOCK, Gordon. Externalities and Government. Public Choice, v. 96, 1998.',
          'ARROW, Kenneth J. et al. Economic Growth, Carrying Capacity, and the Environment. Ecological Applications, 1996.'
        ]
      },
      {
        numero: 3,
        titulo: 'Monopólios Naturais e introdução à regulação.',
        referenciasTexto: 'STIGLITZ e ROSENGARD, Cap. 8 e 12, 2016; ARROW, 1996',
        referenciasDetalhadas: [
          'STIGLITZ, Joseph E.; ROSENGARD, Jay K. La economía del sector público. 4. ed. Antoni Bosch, 2016. Cap. 8 e 12.',
          'ARROW, Kenneth J. The Theory of Risk-Bearing: Small and Great Risks. Journal of Risk and Uncertainty, 1996.',
          'TULLOCK, Gordon. The Welfare Costs of Tariffs, Monopolies, and Theft. Western Economic Journal, 1967.'
        ]
      }
    ],
    aulasRelacionadas: [3, 4, 5],
    avaliacaoRelacionada: '1ª e 2ª Avaliação (P1: Aulas 3-4 | P2: Aula 5)',
    simuladores: ['coase', 'pigou', 'samuelson', 'monopoly', 'asymmetric_info'],
    competencias: [
      'Modelar a condição de Samuelson (ΣTMS = TMT) para oferta ótima de bens públicos',
      'Analisar a matriz de rivalidade e excludibilidade (bens puros, comuns, clube e privados)',
      'Avaliar custos de transação e alocação de direitos de propriedade pelo Teorema de Coase',
      'Calcular o dilema da regulação de monopólio natural (P=CMg com subsídio vs P=CMe de equilíbrio contábil)'
    ],
    referencias: [
      'STIGLITZ e ROSENGARD (Cap. 5, 6, 8 e 12, 2016)',
      'ARROW (1996)',
      'TULLOCK (1967, 1992, 1996, 1998)'
    ]
  },
  {
    numero: 3,
    titulo: 'Teoria da Escolha Pública (Public Choice)',
    cargaHoraria: '12h',
    cargaHorariaHoras: 12,
    descricao: 'Investiga as falhas de governo e a economia política do setor público: premissa da escolha pública de que agentes políticos e burocratas maximizam utilidade própria, modelo de maximização orçamentária de Niskanen, rent-seeking e o Teorema do Eleitor Mediano de Anthony Downs.',
    subtopicos: [
      {
        numero: 1,
        titulo: 'Falhas de Governo: por que a intervenção estatal pode ser ineficiente?',
        referenciasTexto: 'BUCHANAN, Cap. 3, 1993; SANSON, 2011',
        referenciasDetalhadas: [
          'BUCHANAN, James M. Custo e escolha: uma indagação em teoria econômica. Instituto Liberal, 1993. Cap. 3.',
          'SANSON, João R. Teoria das finanças públicas. Florianópolis: UFSC/UAB, 2011.',
          'NISKANEN, William A. Economists and Politicians. Journal of Policy Analysis and Management, 1986.'
        ]
      },
      {
        numero: 2,
        titulo: 'Comportamento do burocrata, do eleitor e do político (rent-seeking).',
        referenciasTexto: 'DOWNS, Cap. 2 e 3, 1999; ROWLEY, TOLLISON e TULLOCK, Cap. 20, 1988',
        referenciasDetalhadas: [
          'DOWNS, Anthony. Uma teoria econômica da democracia. Tradução de Fábio Wanderley Reis. Edusp, 1999. Cap. 2 e 3.',
          'ROWLEY, Charles K.; TOLLISON, Robert D.; TULLOCK, Gordon (orgs.). The Political Economy of Rent-Seeking. Kluwer, 1988. Cap. 20.',
          'TULLOCK, Gordon. The Costs of Rent Seeking: A Metaphysical Problem. Public Choice, 1988.'
        ]
      },
      {
        numero: 3,
        titulo: 'Teorema do Eleitor Mediano e ciclos políticos.',
        referenciasTexto: 'DOWNS, Cap. 8, 1999; GIAMBIAGI e ALÉM, Cap. 13, 2011',
        referenciasDetalhadas: [
          'DOWNS, Anthony. Uma teoria econômica da democracia. Edusp, 1999. Cap. 8.',
          'DOWNS, Anthony. An Economic Theory of Political Action in a Democracy. Journal of Political Economy, 1957.',
          'GIAMBIAGI, Fabio; ALÉM, Ana Cláudia. Finanças públicas: teoria e prática no Brasil. 4. ed. Elsevier, 2011. Cap. 13.',
          'MASKIN, Eric; SEN, Amartya. The Arrow Impossibility Theorem. Columbia University Press, 2014.'
        ]
      }
    ],
    aulasRelacionadas: [9, 10],
    avaliacaoRelacionada: '3ª Avaliação (P3 - Aulas 9 a 12)',
    simuladores: ['downs', 'arrow', 'niskanen', 'logrolling', 'rent_seeking'],
    competencias: [
      'Identificar as causas estruturais das falhas de governo (assimetria, captura e rent-seeking)',
      'Formular o modelo de Niskanen onde o burocrata busca o ponto de orçamento máximo (BT=CT)',
      'Demonstrar a dinâmica de convergência eleitoral espacial do Teorema do Eleitor Mediano de Downs',
      'Interpretar o Teorema da Impossibilidade de Arrow e a inexistência de regra perfeita de agregação'
    ],
    referencias: [
      'BUCHANAN (Cap. 3, 1993)',
      'SANSON (2011)',
      'DOWNS (Cap. 2, 3 e 8, 1999; 1957)',
      'ROWLEY, TOLLISON e TULLOCK (Cap. 20, 1988)',
      'GIAMBIAGI e ALÉM (Cap. 13, 2011)',
      'NISKANEN (1986)',
      'MASKIN e SEN (2014)'
    ]
  },
  {
    numero: 4,
    titulo: 'Princípios Teóricos da Tributação',
    cargaHoraria: '16h',
    cargaHorariaHoras: 16,
    descricao: 'Estuda os fundamentos microeconômicos da tributação: o triângulo de peso morto de Harberger, incidência econômica vs. jurídica, princípios de equidade (horizontal e vertical), critérios de benefício vs. capacidade contributiva, progressividade e regressividade, e a teoria da tributação ótima (Regra de Ramsey e Curva de Laffer).',
    subtopicos: [
      {
        numero: 1,
        titulo: 'Equidade (Horizontal e Vertical) e Eficiência Econômica (Peso Morto).',
        referenciasTexto: 'ARROW, BOWLES e DURLAUF, Introdução e Cap. 8, 2000; STIGLITZ e ROSENGARD, Cap. 7, 2016',
        referenciasDetalhadas: [
          'ARROW, Kenneth J.; BOWLES, Samuel; DURLAUF, Steven N. (orgs.). Meritocracy and economic inequality. Princeton, 2000. Introdução e Cap. 8.',
          'STIGLITZ, Joseph E.; ROSENGARD, Jay K. La economía del sector público. 4. ed. Antoni Bosch, 2016. Cap. 7.',
          'BÉNABOU, Roland. Meritocracy, Redistribution, and the Size of the Pie. In: Arrow et al., 2000.',
          'SEN, Amartya. Merit and Justice. In: Arrow et al., 2000.'
        ]
      },
      {
        numero: 2,
        titulo: 'Progressividade, Regressividade e Proporcionalidade.',
        referenciasTexto: 'GIAMBIAGI e ALÉM, Cap. 10, 2011; STIGLITZ e ROSENGARD, Cap. 17, 2016',
        referenciasDetalhadas: [
          'GIAMBIAGI, Fabio; ALÉM, Ana Cláudia. Finanças públicas: teoria e prática no Brasil. 4. ed. Elsevier, 2011. Cap. 10.',
          'STIGLITZ, Joseph E.; ROSENGARD, Jay K. La economía del sector público. 4. ed. Antoni Bosch, 2016. Cap. 17.',
          'RICARDO, David. Princípios de economia política e tributação. Nova Cultural, 1996.'
        ]
      },
      {
        numero: 3,
        titulo: 'Princípio do Benefício vs. Princípio da Capacidade de Pagamento.',
        referenciasTexto: 'GIAMBIAGI e ALÉM, Cap. 1, 2011; STIGLITZ e ROSENGARD, Cap. 16, 2016',
        referenciasDetalhadas: [
          'GIAMBIAGI, Fabio; ALÉM, Ana Cláudia. Finanças públicas: teoria e prática no Brasil. 4. ed. Elsevier, 2011. Cap. 1.',
          'STIGLITZ, Joseph E.; ROSENGARD, Jay K. La economía del sector público. 4. ed. Antoni Bosch, 2016. Cap. 16.'
        ]
      },
      {
        numero: 4,
        titulo: 'Curva de Laffer e Tributação Ótima.',
        referenciasTexto: 'GIAMBIAGI e ALÉM, Cap. 1, 2011; STIGLITZ e ROSENGARD, Cap. 18, 2016',
        referenciasDetalhadas: [
          'GIAMBIAGI, Fabio; ALÉM, Ana Cláudia. Finanças públicas: teoria e prática no Brasil. 4. ed. Elsevier, 2011. Cap. 1.',
          'STIGLITZ, Joseph E.; ROSENGARD, Jay K. La economía del sector público. 4. ed. Antoni Bosch, 2016. Cap. 18.',
          'ARVATE, Paulo Roberto; BIDERMAN, Ciro (orgs.). Economia do setor público no Brasil. Elsevier, 2004.'
        ]
      }
    ],
    aulasRelacionadas: [6, 7, 8],
    avaliacaoRelacionada: '2ª Avaliação (P2 - Aulas 5 a 8)',
    simuladores: ['tax_incidence', 'harberger', 'ramsey', 'laffer', 'reforma_tributaria'],
    competencias: [
      'Calcular e ilustrar graficamente o peso morto de Harberger: DW = 0.5 * η * t² * P0 * Q0',
      'Distinguir a incidência jurídica da incidência econômica baseada nas elasticidades-preço relativas',
      'Comparar a justiça fiscal distributiva: alíquotas progressivas no IRPF versus regressividade sobre consumo (ICMS/IBS)',
      'Aplicar a regra da elasticidade inversa de Ramsey para minimização de distorções alocativas'
    ],
    referencias: [
      'ARROW, BOWLES e DURLAUF (2000)',
      'STIGLITZ e ROSENGARD (Cap. 7, 16, 17 e 18, 2016)',
      'GIAMBIAGI e ALÉM (Cap. 1, 10 e 18, 2011)',
      'RICARDO (1996)',
      'ARVATE e BIDERMAN (2004)'
    ]
  },
  {
    numero: 5,
    titulo: 'Introdução ao Federalismo Fiscal',
    cargaHoraria: '12h',
    cargaHorariaHoras: 12,
    descricao: 'Analisa as relações fiscais intergovernamentais: o dilema entre centralização e descentralização tributária, o Teorema da Descentralização de Wallace Oates, a mobilidade de cidadãos pelo modelo de Tiebout ("votar com os pés"), o mecanismo de transferências intergovernamentais compensatórias (FPE, FPM, FUNDEB, SUS), o efeito flypaper e a guerra fiscal federativa no Brasil.',
    subtopicos: [
      {
        numero: 1,
        titulo: 'Descentralização vs. Centralização fiscal.',
        referenciasTexto: 'OLIVEIRA, Seção 1 e 4, 2007; TULLOCK, 1969',
        referenciasDetalhadas: [
          'OLIVEIRA, Fabrício Augusto de. Teorias da federação e do federalismo fiscal: o caso brasileiro. Belo Horizonte: Fundação João Pinheiro, 2007. Seção 1 e 4.',
          'TULLOCK, Gordon. Federalism: Problems of Scale. Public Choice, v. 6, p. 19-29, 1969.',
          'TULLOCK, Gordon. The Cost of Transfers. Kyklos, v. 24, 1971.'
        ]
      },
      {
        numero: 2,
        titulo: 'O Teorema da Descentralização de Oates.',
        referenciasTexto: 'OLIVEIRA, Seção 4.1, 2007; MATIAS-PEREIRA, Cap. 12, 2018',
        referenciasDetalhadas: [
          'OLIVEIRA, Fabrício Augusto de. Teorias da federação e do federalismo fiscal: o caso brasileiro. Belo Horizonte: Fundação João Pinheiro, 2007. Seção 4.1.',
          'MATIAS-PEREIRA, José. Finanças públicas. 7. ed. Atlas, 2018. Cap. 12.'
        ]
      },
      {
        numero: 3,
        titulo: 'Teoria e Mecanismo das Transferências intergovernamentais.',
        referenciasTexto: 'OLIVEIRA, Seção 4.2, 2007; MATIAS-PEREIRA, Cap. 13, 2018; GIAMBIAGI e ALÉM, Cap. 12, 2011',
        referenciasDetalhadas: [
          'OLIVEIRA, Fabrício Augusto de. Teorias da federação e do federalismo fiscal: o caso brasileiro. Belo Horizonte: Fundação João Pinheiro, 2007. Seção 4.2.',
          'MATIAS-PEREIRA, José. Finanças públicas. 7. ed. Atlas, 2018. Cap. 13.',
          'GIAMBIAGI, Fabio; ALÉM, Ana Cláudia. Finanças públicas: teoria e prática no Brasil. 4. ed. Elsevier, 2011. Cap. 12.',
          'ARVATE, Paulo Roberto; BIDERMAN, Ciro (orgs.). Economia do setor público no Brasil. Elsevier, 2004.'
        ]
      }
    ],
    aulasRelacionadas: [11, 12],
    avaliacaoRelacionada: '3ª Avaliação (P3 - Aulas 9 a 12)',
    simuladores: ['oates', 'tiebout', 'federalism', 'fiscal_war', 'lrf_engine'],
    competencias: [
      'Modelar a superioridade de bem-estar da descentralização sob preferências regionais heterogêneas (Oates)',
      'Avaliar as hipóteses do modelo de Tiebout de mobilidade interjurisdicional e provisão local de bens',
      'Examinar a anatomia das transferências redistributivas brasileiras (FPE e FPM) e o Efeito Flypaper',
      'Analisar a dinâmica de guerra fiscal do ICMS e os impactos da Reforma Tributária (IBS/CBS)'
    ],
    referencias: [
      'OLIVEIRA (Seção 1, 4, 4.1 e 4.2, 2007)',
      'TULLOCK (1969, 1971)',
      'MATIAS-PEREIRA (Cap. 12 e 13, 2018)',
      'GIAMBIAGI e ALÉM (Cap. 12, 2011)'
    ]
  }
];

export const REFERENCIAS_OFICIAIS: ReferenciaOficial[] = [
  // ==========================================
  // REFERÊNCIAS BÁSICAS / PRINCIPAIS (1 a 15)
  // ==========================================
  {
    id: 1,
    categoria: 'Principal',
    autores: 'ARROW, Kenneth J.',
    ano: 1996,
    titulo: 'The Theory of Risk-Bearing: Small and Great Risks',
    detalhes: 'Journal of Risk and Uncertainty, v. 12, n. 2-3, p. 103-111, May 1996.',
    citacaoABNT: 'ARROW, Kenneth J. The Theory of Risk-Bearing: Small and Great Risks. Journal of Risk and Uncertainty, v. 12, n. 2-3, p. 103-111, May 1996.',
    unidadesRelacionadas: [2]
  },
  {
    id: 2,
    categoria: 'Principal',
    autores: 'ARROW, Kenneth J.; BOWLES, Samuel; DURLAUF, Steven N. (orgs.)',
    ano: 2000,
    titulo: 'Meritocracy and economic inequality',
    detalhes: 'Princeton: Princeton University Press, 2000.',
    citacaoABNT: 'ARROW, Kenneth J.; BOWLES, Samuel; DURLAUF, Steven N. (orgs.). Meritocracy and economic inequality. Princeton: Princeton University Press, 2000.',
    unidadesRelacionadas: [4]
  },
  {
    id: 3,
    categoria: 'Principal',
    autores: 'BUCHANAN, James M.',
    ano: 1993,
    titulo: 'Custo e escolha: uma indagação em teoria econômica',
    detalhes: 'Tradução de Luiz Antonio Pedroso Rafael. Rio de Janeiro: Instituto Liberal, 1993.',
    citacaoABNT: 'BUCHANAN, James M. Custo e escolha: uma indagação em teoria econômica. Tradução de Luiz Antonio Pedroso Rafael. Rio de Janeiro: Instituto Liberal, 1993.',
    unidadesRelacionadas: [1, 3]
  },
  {
    id: 4,
    categoria: 'Principal',
    autores: 'DOWNS, Anthony',
    ano: 1957,
    titulo: 'An Economic Theory of Political Action in a Democracy',
    detalhes: 'Journal of Political Economy, v. 65, n. 2, p. 135-150, Apr. 1957.',
    citacaoABNT: 'DOWNS, Anthony. An Economic Theory of Political Action in a Democracy. Journal of Political Economy, v. 65, n. 2, p. 135-150, Apr. 1957.',
    unidadesRelacionadas: [3]
  },
  {
    id: 5,
    categoria: 'Principal',
    autores: 'DOWNS, Anthony',
    ano: 1999,
    titulo: 'Uma teoria econômica da democracia',
    detalhes: 'Tradução de Fábio Wanderley Reis. São Paulo: Edusp, 1999.',
    citacaoABNT: 'DOWNS, Anthony. Uma teoria econômica da democracia. Tradução de Fábio Wanderley Reis. São Paulo: Edusp, 1999.',
    unidadesRelacionadas: [3]
  },
  {
    id: 6,
    categoria: 'Principal',
    autores: 'GIAMBIAGI, Fabio; ALÉM, Ana Cláudia',
    ano: 2011,
    titulo: 'Finanças públicas: teoria e prática no Brasil',
    detalhes: '4. ed. Rio de Janeiro: Elsevier, 2011.',
    citacaoABNT: 'GIAMBIAGI, Fabio; ALÉM, Ana Cláudia. Finanças públicas: teoria e prática no Brasil. 4. ed. Rio de Janeiro: Elsevier, 2011.',
    unidadesRelacionadas: [1, 3, 4, 5]
  },
  {
    id: 7,
    categoria: 'Principal',
    autores: 'MASKIN, Eric; SEN, Amartya',
    ano: 2014,
    titulo: 'The Arrow Impossibility Theorem',
    detalhes: 'New York: Columbia University Press, 2014.',
    citacaoABNT: 'MASKIN, Eric; SEN, Amartya. The Arrow Impossibility Theorem. New York: Columbia University Press, 2014.',
    unidadesRelacionadas: [3]
  },
  {
    id: 8,
    categoria: 'Principal',
    autores: 'MATIAS-PEREIRA, José',
    ano: 2018,
    titulo: 'Finanças públicas',
    detalhes: '7. ed. São Paulo: Atlas, 2018.',
    citacaoABNT: 'MATIAS-PEREIRA, José. Finanças públicas. 7. ed. São Paulo: Atlas, 2018.',
    unidadesRelacionadas: [1, 5]
  },
  {
    id: 9,
    categoria: 'Principal',
    autores: 'NISKANEN, William A.',
    ano: 1986,
    titulo: 'Economists and Politicians',
    detalhes: 'Journal of Policy Analysis and Management, v. 5, n. 2, p. 234-244, Winter 1986.',
    citacaoABNT: 'NISKANEN, William A. Economists and Politicians. Journal of Policy Analysis and Management, v. 5, n. 2, p. 234-244, Winter 1986.',
    unidadesRelacionadas: [3]
  },
  {
    id: 10,
    categoria: 'Principal',
    autores: 'OLIVEIRA, Fabrício Augusto de',
    ano: 2007,
    titulo: 'Teorias da federação e do federalismo fiscal: o caso brasileiro',
    detalhes: 'Belo Horizonte: Fundação João Pinheiro, Escola de Governo, 2007. (Texto para Discussão, n. 43).',
    citacaoABNT: 'OLIVEIRA, Fabrício Augusto de. Teorias da federação e do federalismo fiscal: o caso brasileiro. Belo Horizonte: Fundação João Pinheiro, Escola de Governo, 2007. (Texto para Discussão, n. 43).',
    unidadesRelacionadas: [5]
  },
  {
    id: 11,
    categoria: 'Principal',
    autores: 'RICARDO, David',
    ano: 1996,
    titulo: 'Princípios de economia política e tributação',
    detalhes: 'Tradução de Paulo Henrique Ribeiro Sandroni. São Paulo: Nova Cultural, 1996. (Coleção Os Economistas).',
    citacaoABNT: 'RICARDO, David. Princípios de economia política e tributação. Tradução de Paulo Henrique Ribeiro Sandroni. São Paulo: Nova Cultural, 1996. (Coleção Os Economistas).',
    unidadesRelacionadas: [4]
  },
  {
    id: 12,
    categoria: 'Principal',
    autores: 'ROWLEY, Charles K.; TOLLISON, Robert D.; TULLOCK, Gordon (orgs.)',
    ano: 1988,
    titulo: 'The Political Economy of Rent-Seeking',
    detalhes: 'Boston: Kluwer Academic Publishers, 1988.',
    citacaoABNT: 'ROWLEY, Charles K.; TOLLISON, Robert D.; TULLOCK, Gordon (orgs.). The Political Economy of Rent-Seeking. Boston: Kluwer Academic Publishers, 1988.',
    unidadesRelacionadas: [3]
  },
  {
    id: 13,
    categoria: 'Principal',
    autores: 'STIGLITZ, Joseph E.; ROSENGARD, Jay K.',
    ano: 2016,
    titulo: 'La economía del sector público',
    detalhes: '4. ed. Tradução de Mª. Esther Rabasco. Barcelona: Antoni Bosch, 2016.',
    citacaoABNT: 'STIGLITZ, Joseph E.; ROSENGARD, Jay K. La economía del sector público. 4. ed. Tradução de Mª. Esther Rabasco. Barcelona: Antoni Bosch, 2016.',
    unidadesRelacionadas: [1, 2, 4]
  },
  {
    id: 14,
    categoria: 'Principal',
    autores: 'TULLOCK, Gordon',
    ano: 1967,
    titulo: 'The Welfare Costs of Tariffs, Monopolies, and Theft',
    detalhes: 'Western Economic Journal, v. 5, n. 3, p. 224-232, June 1967.',
    citacaoABNT: 'TULLOCK, Gordon. The Welfare Costs of Tariffs, Monopolies, and Theft. Western Economic Journal, v. 5, n. 3, p. 224-232, June 1967.',
    unidadesRelacionadas: [2, 3]
  },
  {
    id: 15,
    categoria: 'Principal',
    autores: 'TULLOCK, Gordon',
    ano: 1998,
    titulo: 'Externalities and Government',
    detalhes: 'Public Choice, v. 96, n. 3-4, p. 411-415, Sep. 1998.',
    citacaoABNT: 'TULLOCK, Gordon. Externalities and Government. Public Choice, v. 96, n. 3-4, p. 411-415, Sep. 1998.',
    unidadesRelacionadas: [2]
  },

  // ==========================================
  // REFERÊNCIAS COMPLEMENTARES (16 a 28)
  // ==========================================
  {
    id: 16,
    categoria: 'Complementar',
    autores: 'ARROW, Kenneth J.',
    ano: 1962,
    titulo: 'Economic Welfare and the Allocation of Resources for Invention',
    detalhes: 'In: NATIONAL BUREAU OF ECONOMIC RESEARCH. The Rate and Direction of Inventive Activity: Economic and Social Factors. Princeton: Princeton University Press, 1962. p. 609-626.',
    citacaoABNT: 'ARROW, Kenneth J. Economic Welfare and the Allocation of Resources for Invention. In: NATIONAL BUREAU OF ECONOMIC RESEARCH. The Rate and Direction of Inventive Activity: Economic and Social Factors. Princeton: Princeton University Press, 1962. p. 609-626.',
    unidadesRelacionadas: [2]
  },
  {
    id: 17,
    categoria: 'Complementar',
    autores: 'ARROW, Kenneth J. et al.',
    ano: 1996,
    titulo: 'Economic Growth, Carrying Capacity, and the Environment',
    detalhes: 'Ecological Applications, v. 6, n. 1, p. 13-15, Feb. 1996.',
    citacaoABNT: 'ARROW, Kenneth J. et al. Economic Growth, Carrying Capacity, and the Environment. Ecological Applications, v. 6, n. 1, p. 13-15, Feb. 1996.',
    unidadesRelacionadas: [2]
  },
  {
    id: 18,
    categoria: 'Complementar',
    autores: 'ARVATE, Paulo Roberto; BIDERMAN, Ciro (orgs.)',
    ano: 2004,
    titulo: 'Economia do setor público no Brasil',
    detalhes: 'Rio de Janeiro: Elsevier, 2004.',
    citacaoABNT: 'ARVATE, Paulo Roberto; BIDERMAN, Ciro (orgs.). Economia do setor público no Brasil. Rio de Janeiro: Elsevier, 2004.',
    unidadesRelacionadas: [4, 5]
  },
  {
    id: 19,
    categoria: 'Complementar',
    autores: 'BÉNABOU, Roland',
    ano: 2000,
    titulo: 'Meritocracy, Redistribution, and the Size of the Pie',
    detalhes: 'In: ARROW, Kenneth J.; BOWLES, Samuel; DURLAUF, Steven N. (orgs.). Meritocracy and economic inequality. Princeton: Princeton University Press, 2000. p. 317-339.',
    citacaoABNT: 'BÉNABOU, Roland. Meritocracy, Redistribution, and the Size of the Pie. In: ARROW, Kenneth J.; BOWLES, Samuel; DURLAUF, Steven N. (orgs.). Meritocracy and economic inequality. Princeton: Princeton University Press, 2000. p. 317-339.',
    unidadesRelacionadas: [4]
  },
  {
    id: 20,
    categoria: 'Complementar',
    autores: 'NORDHAUS, William D.',
    ano: 1999,
    titulo: 'Biens publics globaux et changement climatique',
    detalhes: 'Revue française d\'économie, v. 14, n. 3, p. 11-32, 1999.',
    citacaoABNT: 'NORDHAUS, William D. Biens publics globaux et changement climatique. Revue française d\'économie, v. 14, n. 3, p. 11-32, 1999.',
    unidadesRelacionadas: [2]
  },
  {
    id: 21,
    categoria: 'Complementar',
    autores: 'SANSON, João R.',
    ano: 2011,
    titulo: 'Teoria das finanças públicas',
    detalhes: 'Florianópolis: Departamento de Ciências da Administração/UFSC; [Brasília]: CAPES: UAB, 2011.',
    citacaoABNT: 'SANSON, João R. Teoria das finanças públicas. Florianópolis: Departamento de Ciências da Administração/UFSC; [Brasília]: CAPES: UAB, 2011.',
    unidadesRelacionadas: [1, 3]
  },
  {
    id: 22,
    categoria: 'Complementar',
    autores: 'SEN, Amartya',
    ano: 2000,
    titulo: 'Merit and Justice',
    detalhes: 'In: ARROW, Kenneth J.; BOWLES, Samuel; DURLAUF, Steven N. (orgs.). Meritocracy and economic inequality. Princeton: Princeton University Press, 2000. p. 5-16.',
    citacaoABNT: 'SEN, Amartya. Merit and Justice. In: ARROW, Kenneth J.; BOWLES, Samuel; DURLAUF, Steven N. (orgs.). Meritocracy and economic inequality. Princeton: Princeton University Press, 2000. p. 5-16.',
    unidadesRelacionadas: [4]
  },
  {
    id: 23,
    categoria: 'Complementar',
    autores: 'TULLOCK, Gordon',
    ano: 1969,
    titulo: 'Federalism: Problems of Scale',
    detalhes: 'Public Choice, v. 6, p. 19-29, Spring 1969.',
    citacaoABNT: 'TULLOCK, Gordon. Federalism: Problems of Scale. Public Choice, v. 6, p. 19-29, Spring 1969.',
    unidadesRelacionadas: [5]
  },
  {
    id: 24,
    categoria: 'Complementar',
    autores: 'TULLOCK, Gordon',
    ano: 1971,
    titulo: 'The Cost of Transfers',
    detalhes: 'Kyklos, v. 24, n. 4, p. 629-643, Nov. 1971.',
    citacaoABNT: 'TULLOCK, Gordon. The Cost of Transfers. Kyklos, v. 24, n. 4, p. 629-643, Nov. 1971.',
    unidadesRelacionadas: [5]
  },
  {
    id: 25,
    categoria: 'Complementar',
    autores: 'TULLOCK, Gordon',
    ano: 1988,
    titulo: 'The Costs of Rent Seeking: A Metaphysical Problem',
    detalhes: 'Public Choice, v. 57, n. 1, p. 15-24, Apr. 1988.',
    citacaoABNT: 'TULLOCK, Gordon. The Costs of Rent Seeking: A Metaphysical Problem. Public Choice, v. 57, n. 1, p. 15-24, Apr. 1988.',
    unidadesRelacionadas: [3]
  },
  {
    id: 26,
    categoria: 'Complementar',
    autores: 'TULLOCK, Gordon',
    ano: 1990,
    titulo: 'On the Social Costs of Rent-Seeking Versus the Social Costs of Production Flexibility: Comment',
    detalhes: 'Public Choice, v. 66, n. 1, p. 79-81, July 1990.',
    citacaoABNT: 'TULLOCK, Gordon. On the Social Costs of Rent-Seeking Versus the Social Costs of Production Flexibility: Comment. Public Choice, v. 66, n. 1, p. 79-81, July 1990.',
    unidadesRelacionadas: [3]
  },
  {
    id: 27,
    categoria: 'Complementar',
    autores: 'TULLOCK, Gordon',
    ano: 1992,
    titulo: 'Hawks, Doves, and Free Riders',
    detalhes: 'Kyklos, v. 45, n. 1, p. 25-36, Feb. 1992.',
    citacaoABNT: 'TULLOCK, Gordon. Hawks, Doves, and Free Riders. Kyklos, v. 45, n. 1, p. 25-36, Feb. 1992.',
    unidadesRelacionadas: [2]
  },
  {
    id: 28,
    categoria: 'Complementar',
    autores: 'TULLOCK, Gordon',
    ano: 1996,
    titulo: 'Provision of Public Goods through Privatization',
    detalhes: 'Kyklos, v. 49, n. 2, p. 221-224, May 1996.',
    citacaoABNT: 'TULLOCK, Gordon. Provision of Public Goods through Privatization. Kyklos, v. 49, n. 2, p. 221-224, May 1996.',
    unidadesRelacionadas: [2]
  }
];

export const TOTAL_HORAS_CURSO = 60;
export const TOTAL_UNIDADES = 5;
export const TOTAL_REFERENCIAS = 28;
