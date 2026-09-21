import { EstudoDeCaso } from '../types';

export const ESTUDOS_CASO_UNIDADE_2: EstudoDeCaso[] = [
  {
    id: 'CASO-U2-01',
    unidadeNumero: 2,
    numeroNaUnidade: 1,
    titulo: 'O Polo Siderúrgico de Açailândia e as Queimadas: Teorema de Coase vs. Imposto Pigouviano',
    subtitulo: 'Externalidades Negativas Ambientais, Custos de Transação e Titularidade de Direitos de Propriedade',
    ambito: 'Estadual (Maranhão)',
    contextoEconomico: 'Na região tocantina maranhense (município de Açailândia e vizinhanças), indústrias guseiras e carvoarias emitem material particulado e fuligem, afetando agricultores familiares e comunidades locais com problemas respiratórios e depreciação imobiliária. A dispersão de milhares de moradores e centenas de produtores rurais eleva consideravelmente os custos de transação para acordos privados voluntários.',
    dilemaFiscal: 'Deve o Estado do Maranhão intervir tributando a emissão de poluentes com alíquota pigouviana (taxação igual ao dano marginal) ou permitir a barganha privada definindo previamente a titularidade jurídica dos direitos de poluir?',
    teoriaAplicada: {
      conceito: 'Teorema de Coase (1960) e Teoria das Externalidades de Pigou (1920)',
      autoresChave: 'Ronald Coase (1960); Arthur C. Pigou (1920); Joseph Stiglitz (2016)',
      mecanismo: 'Se os custos de transação forem nulos e os direitos bem definidos, a negociação privada alcança o ótimo social independente de quem possua o direito inicial. Quando os custos de transação são altos (como em poluição atmosférica difusa), o Teorema de Coase falha e o imposto pigouviano igual ao Dano Marginal (t* = DMg) restaura a eficiência alocativa.'
    },
    dadosCenarios: [
      { indicador: 'Dano Marginal Externo Estimado (DMg)', valor: 'R$ 85 por tonelada de ferro-gusa', interpretacao: 'Custo social suportado pela saúde pública municipal.' },
      { indicador: 'Número de Indivíduos Atingidos', valor: 'Mais de 45.000 moradores', interpretacao: 'Inviabiliza barganha privada direta devido a assimetrias e custos de reunião.' },
      { indicador: 'Custo Marginal de Abatimento da Poluição (CMgA)', valor: 'R$ 60 por tonelada', interpretacao: 'Menor que o dano, tornando socialmente vantajoso instalar filtros catalíticos.' }
    ],
    perguntasFixacao: [
      {
        id: 'P-U2-01-1',
        pergunta: 'Segundo Ronald Coase em "The Problem of Social Cost" (1960), por que a barganha privada voluntária muitas vezes não resolve o problema da poluição ambiental entre milhares de cidadãos e indústrias?',
        opcoes: [
          { id: 'A', texto: 'Porque a taxa de juros básica da economia é fixada acima do retorno marginal do capital.', explicacao: 'Incorreto. A taxa de juros não é o cerne do modelo coasiano.' },
          { id: 'B', texto: 'Devido à presença de elevados custos de transação, busca de informações e comportamento de carona (free-rider) entre as partes atingidas.', explicacao: 'Correto! Coase demonstra que o teorema só funciona na ausência de custos de transação; na prática ambiental, estes custos impedem a negociação direta.' },
          { id: 'C', texto: 'Porque o imposto pigouviano sempre gera peso morto superior ao benefício social.', explicacao: 'Incorreto. O imposto pigouviano bem calibrado elimina o peso morto da externalidade.' },
          { id: 'D', texto: 'Porque todas as indústrias operam obrigatoriamente como monopólios naturais puros.', explicacao: 'Incorreto. A estrutura de mercado aqui é de oligopólio/concorrência com externalidades.' }
        ],
        respostaCorreta: 'B',
        conceitoChave: 'Custos de Transação de Coase'
      }
    ],
    simuladorRecomendadoId: 'pigou',
    leituraRecomendadaDrive: {
      obra: 'La Economía del Sector Público',
      autor: 'Joseph E. Stiglitz e Jay K. Rosengard',
      capitulo: 'Capítulo 6 (Externalidades y Medio Ambiente)'
    }
  },
  {
    id: 'CASO-U2-02',
    unidadeNumero: 2,
    numeroNaUnidade: 2,
    titulo: 'Iluminação Pública, Segurança Marítima e a Condição de Samuelson em São Luís',
    subtitulo: 'Bens Públicos Puros, Não-Rivalidade, Não-Excludibilidade e o Problema do Carona (Free-Rider)',
    ambito: 'Municipal',
    contextoEconomico: 'A sinalização náutica da Baía de São Marcos (faróis e boias) e a iluminação pública das avenidas litorâneas beneficiam simultaneamente todos os navios de carga, pescadores artesanais e munícipes. O consumo de luz por um pedestre não diminui a luz disponível para outrem (não-rivalidade), e é técnica e economicamente inviável excluir quem não pague pelo serviço (não-excludibilidade). Empregou-se taxa de iluminação (CIP/COSIP) no IPTU/energia para financiar o serviço.',
    dilemaFiscal: 'Por que o mecanismo de preços de mercado privado falha completamente na provisão desse serviço, e qual a regra matemática que determina a oferta socialmente ótima?',
    teoriaAplicada: {
      conceito: 'Condição de Samuelson de Provisão Ótima de Bens Públicos Puros (ΣTMS = TMT)',
      autoresChave: 'Paul A. Samuelson (1954); Gordon Tullock (1992); Joseph Stiglitz (2016)',
      mecanismo: 'Em bens públicos puros, o Custo Marginal de atender um usuário adicional é zero (não-rivalidade). Como o preço de mercado competitivo ótimo deveria ser P = CMg = 0, empresas privadas teriam prejuízo total. A regra de Samuelson requer a soma vertical das curvas de demanda (disposição marginal a pagar): sum TMS_i = TMT.'
    },
    dadosCenarios: [
      { indicador: 'Custo Marginal de Admissão de Novo Usuário (CMg)', valor: 'R$ 0,00', interpretacao: 'Característica de Não-Rivalidade estrita.' },
      { indicador: 'Custo de Exclusão por Cancelas ou Catracas', valor: 'Infinito / Inviável', interpretacao: 'Não-Excludibilidade técnica na via pública.' },
      { indicador: 'Disposição Privada Voluntária a Pagar', valor: '< 3% do custo total', interpretacao: 'Subprovisão severa decorrente da postura de carona (free-rider).' }
    ],
    perguntasFixacao: [
      {
        id: 'P-U2-02-1',
        pergunta: 'Para um bem público puro, a condição de eficiência alocativa derivada por Paul Samuelson (1954) difere da condição clássica para bens privados porque:',
        opcoes: [
          { id: 'A', texto: 'A soma horizontal das demandas individuais deve igualar a oferta da firma monopolista.', explicacao: 'Incorreto. A soma horizontal é usada para bens privados rivais.' },
          { id: 'B', texto: 'Realiza-se a soma vertical das Taxas Marginais de Substituição de todos os indivíduos (ΣTMS), igualando-a à Taxa Marginal de Transformação (TMT).', explicacao: 'Correto! Como todos consomem a mesma quantidade do bem simultaneamente, somam-se verticalmente as disposições marginais a pagar (ΣTMS = TMT).' },
          { id: 'C', texto: 'O preço cobrado dos consumidores deve ser igual ao Custo Médio total multiplicado pela elasticidade.', explicacao: 'Incorreto. Isso violaria a condição de não-rivalidade (CMg=0).' },
          { id: 'D', texto: 'O bem deve ser obrigatoriamente produzido por empresas estatais com lucro contábil positivo.', explicacao: 'Incorreto. A provisão pode ser pública com contratação de execução privada.' }
        ],
        respostaCorreta: 'B',
        conceitoChave: 'Condição de Samuelson'
      }
    ],
    simuladorRecomendadoId: 'samuelson',
    leituraRecomendadaDrive: {
      obra: 'La Economía del Sector Público',
      autor: 'Joseph E. Stiglitz e Jay K. Rosengard',
      capitulo: 'Capítulo 5 (Bienes Públicos y Bienes Privados Suministrados por el Estado)'
    }
  },
  {
    id: 'CASO-U2-03',
    unidadeNumero: 2,
    numeroNaUnidade: 3,
    titulo: 'O Monopólio Natural do Saneamento Básico (CAEMA) e o Dilema da Tarifação',
    subtitulo: 'Economias de Escala, Custos Médios Decrescentes e Soluções de First-Best vs. Second-Best',
    ambito: 'Estadual (Maranhão)',
    contextoEconomico: 'A distribuição de água tratada e coleta de esgoto em São Luís e municípios do Maranhão exige uma rede física subterrânea de tubulações com altíssimo custo fixo irrecuperável (sunk cost) e custo marginal de adução reduzido. Duplicar tubulações por empresas concorrentes seria um desperdício produtivo evidente, caracterizando um Monopólio Natural com custos médios estritamente decrescentes em toda a demanda relevante.',
    dilemaFiscal: 'Se a agência reguladora (AGEMS/AGERP) fixar a tarifa pelo critério de máxima eficiência (First-Best, P = CMg), a concessionária sofrerá prejuízo contábil crônico. Como equilibrar eficiência e viabilidade econômico-financeira?',
    teoriaAplicada: {
      conceito: 'Regulação de Monopólio Natural: Tarifação First-Best vs. Second-Best e Teoria da Captura',
      autoresChave: 'Gordon Tullock (1967); Kenneth Arrow (1996); Joseph Stiglitz (2016)',
      mecanismo: 'Como CMe > CMg devido à escala, P = CMg gera prejuízo operacional igual à área (CMe - CMg)*Q, exigindo subsídio fiscal com recursos de impostos (que geram peso morto em outros setores). A solução de Second-Best (P = CMe) elimina o déficit orçamentário da empresa, mas induz ligeira perda de bem-estar.'
    },
    dadosCenarios: [
      { indicador: 'Custo Fixo de Infraestrutura da Rede', valor: 'R$ 1,2 bilhão', interpretacao: 'Barreira absoluta à entrada concorrencial e retornos crescentes de escala.' },
      { indicador: 'Custo Marginal por Metro Cúbico (CMg)', valor: 'R$ 1,80 / m³', interpretacao: 'Custo puramente de tratamento químico e energia elétrica de bombeamento.' },
      { indicador: 'Custo Médio Operacional (CMe)', valor: 'R$ 4,10 / m³', interpretacao: 'CMe superior ao CMg, tornando P = CMg insustentável sem aporte orçamentário do Tesouro.' }
    ],
    perguntasFixacao: [
      {
        id: 'P-U2-03-1',
        pergunta: 'Ao regular um monopólio natural de distribuição de água, por que a imposição de uma tarifa no padrão First-Best (P = CMg) obriga o poder concedente a fornecer subsídios governamentais?',
        opcoes: [
          { id: 'A', texto: 'Porque com custos médios decrescentes na escala de produção, o Custo Marginal é estritamente inferior ao Custo Médio, gerando receita total inferior aos custos totais.', explicacao: 'Correto! Em monopólios naturais com economias de escala, CMg < CMe. Cobrar P = CMg significa que a receita cobrirá apenas os custos variáveis, deixando o custo fixo em déficit.' },
          { id: 'B', texto: 'Porque a elasticidade-preço da demanda de água tratada é perfeitamente inelástica ao infinito.', explicacao: 'Incorreto. A demanda é inelástica, mas a razão é a curva de custos decrescentes.' },
          { id: 'C', texto: 'Porque a empresa terá lucros extraordinários excessivos que devem ser confiscados pelo Tesouro.', explicacao: 'Incorreto. Em P = CMg a empresa tem prejuízo, não lucro.' },
          { id: 'D', texto: 'Porque o Teorema do Eleitor Mediano determina alíquota zero para serviços essenciais.', explicacao: 'Incorreto. Downs trata de votação política, não de curvas de custo de monopólio.' }
        ],
        respostaCorreta: 'A',
        conceitoChave: 'Tarifação de Monopólio Natural'
      }
    ],
    simuladorRecomendadoId: 'monopoly',
    leituraRecomendadaDrive: {
      obra: 'La Economía del Sector Público',
      autor: 'Joseph E. Stiglitz e Jay K. Rosengard',
      capitulo: 'Capítulo 8 e Capítulo 12 (Monopolio Natural y Regulación)'
    }
  },
  {
    id: 'CASO-U2-04',
    unidadeNumero: 2,
    numeroNaUnidade: 4,
    titulo: 'Assimetria de Informação e Seleção Adversa nos Planos de Saúde dos Servidores Públicos',
    subtitulo: 'O Mercado de "Lemons" de Akerlof, Risco Moral (Moral Hazard) e a Intervenção Estatal na Seguridade',
    ambito: 'Estadual (Maranhão)',
    contextoEconomico: 'O Fundo de Benefícios dos Servidores do Estado do Maranhão (FUNBEN) oferece assistência à saúde suplementar com coparticipação voluntária. Servidores jovens e saudáveis tendem a cancelar a adesão quando o valor da contribuição mensal sobe, permanecendo no plano preferencialmente os servidores mais idosos ou com doenças pré-existentes. Isso eleva a sinistralidade média e força novo aumento na mensalidade.',
    dilemaFiscal: 'Como evitar a espiral da morte (death spiral) decorrente da seleção adversa sem transformar a adesão em compulsória ou impor subsídio estatal crescente?',
    teoriaAplicada: {
      conceito: 'Seleção Adversa (Akerlof, 1970) e Risco Moral (Arrow, 1963; 1996)',
      autoresChave: 'George Akerlof (1970); Kenneth Arrow (1963, 1996); Joseph Stiglitz (1976)',
      mecanismo: 'A assimetria de informação antes da celebração do contrato leva ao desaparecimento do mercado competitivo para bons riscos (seleção adversa). Já o risco moral (moral hazard) ocorre após o contrato, quando o segurado aumenta a utilização de consultas e exames por não arcar com o custo marginal.'
    },
    dadosCenarios: [
      { indicador: 'Sinistralidade da Carteira de Servidores', valor: '94,2%', interpretacao: 'Muito acima do patamar de equilíbrio atuarial sustentável (75%).' },
      { indicador: 'Idade Média dos Beneficiários Ativos', valor: '56 anos', interpretacao: 'Envelhecimento da base de segurados com saída de servidores jovens (seleção adversa).' },
      { indicador: 'Coparticipação Moderadora em Consultas', valor: '20% do valor do procedimento', interpretacao: 'Instrumento microeconômico para mitigar risco moral de uso supérfluo.' }
    ],
    perguntasFixacao: [
      {
        id: 'P-U2-04-1',
        pergunta: 'A justificativa microeconômica para a obrigatoriedade universal de filiação à Seguridade Social pública (Previdência e SUS) repousa fundamentalmente em:',
        opcoes: [
          { id: 'A', texto: 'Superar o colapso de mercado provocado pela seleção adversa, forçando o agrupamento (pooling) de riscos de indivíduos saudáveis e vulneráveis.', explicacao: 'Correto! Sem compulsoriedade, os indivíduos de menor risco deixam o plano, desestabilizando o mutualismo atuarial (modelo de Akerlof/Rothschild-Stiglitz).' },
          { id: 'B', texto: 'Maximizar o excedente do consumidor no modelo de Bertrand de guerra de preços.', explicacao: 'Incorreto. Bertrand trata de oligopólio homogêneo.' },
          { id: 'C', texto: 'Garantir que a taxa de desconto social seja idêntica à taxa Selic de curto prazo.', explicacao: 'Incorreto. A seguridade se apoia no seguro social contra assimetrias de informação.' },
          { id: 'D', texto: 'Permitir a captura orçamentária descrita no modelo de burocracia de Niskanen.', explicacao: 'Incorreto. A compulsoriedade visa resolver falha de mercado de seguro, não atender à burocracia.' }
        ],
        respostaCorreta: 'A',
        conceitoChave: 'Seleção Adversa e Seguro Social'
      }
    ],
    simuladorRecomendadoId: 'asymmetric_info',
    leituraRecomendadaDrive: {
      obra: 'The Theory of Risk-Bearing: Small and Great Risks',
      autor: 'Kenneth J. Arrow',
      capitulo: 'Journal of Risk and Uncertainty, 1996'
    }
  },
  {
    id: 'CASO-U2-05',
    unidadeNumero: 2,
    numeroNaUnidade: 5,
    titulo: 'A Tragédia dos Comuns nos Lençóis Maranhenses: Recursos de Acesso Comum e Regulação',
    subtitulo: 'Rivalidade sem Excludibilidade: O Dilema da Superutilização e Direitos de Exploração Ecoturística',
    ambito: 'Estadual (Maranhão)',
    contextoEconomico: 'O Parque Nacional dos Lençóis Maranhenses (Patrimônio Natural da Humanidade pela UNESCO) atrai fluxos crescentes de veículos 4x4, quadriciclos e visitantes nas lagoas costeiras. O recurso hídrico e visual é não-excludente (difícil cercar centenas de quilômetros de dunas), mas altamente rival (a superlotação degrada a fauna, destrói dunas e reduz a utilidade dos turistas). Operadores privados disputam o acesso imediato sem considerar o esgotamento do ativo.',
    dilemaFiscal: 'Como o setor público deve intervir: cobrando taxas de visitação (precificação de congestão), impondo cotas de capacidade de carga ou licitando concessões privadas com outorgas?',
    teoriaAplicada: {
      conceito: 'Tragédia dos Comuns (Hardin, 1968) e Bens Comuns (Elinor Ostrom, 1990)',
      autoresChave: 'Garrett Hardin (1968); Elinor Ostrom (1990); Joseph Stiglitz (2016)',
      mecanismo: 'Bens de uso comum (Common-Pool Resources) possuem rivalidade no consumo, mas baixa excludibilidade. Cada agente extrai o benefício médio privado integral e repassa o custo marginal de congestão para toda a coletividade, levando ao equilíbrio sub-ótimo de sobre-exploração até que o benefício líquido caia a zero.'
    },
    dadosCenarios: [
      { indicador: 'Número de Visitantes na Alta Temporada', valor: '350.000 pessoas/ano', interpretacao: 'Acima da capacidade de suporte ecológico calculada pelo ICMBio.' },
      { indicador: 'Custo de Degradação Ecológica por Visita', valor: 'R$ 42,00', interpretacao: 'Externalidade negativa de congestão transferida ao ecossistema local.' },
      { indicador: 'Taxa de Conservação Ambiental Cobrada', valor: 'R$ 0,00 (acesso livre em certas rotas)', interpretacao: 'Ausência de mecanismo de preços gerando equilíbrio de Hardin.' }
    ],
    perguntasFixacao: [
      {
        id: 'P-U2-05-1',
        pergunta: 'Em relação à taxonomia dos bens na teoria microeconômica do setor público, um Parque Ambiental com acesso livre mas sujeito a forte congestão e desgaste ecológico classifica-se como:',
        opcoes: [
          { id: 'A', texto: 'Bem Público Puro (Não-rival e não-excludente).', explicacao: 'Incorreto. A presença de congestão destrói a não-rivalidade.' },
          { id: 'B', texto: 'Bem de Uso Comum ou Recurso Comum (Rival no consumo, porém Não-Excludente no acesso).', explicacao: 'Correto! Os bens comuns sofrem com a tragédia dos comuns exatamente porque não se consegue excluir usuários, mas o uso de um prejudica o dos demais.' },
          { id: 'C', texto: 'Bem de Clube (Não-rival e excludente por pedágio).', explicacao: 'Incorreto. Bem de clube é não-rival até a capacidade da infraestrutura.' },
          { id: 'D', texto: 'Bem Privado Puro (Rival e estritamente excludente).', explicacao: 'Incorreto. As dunas abertas impedem a excludibilidade privada perfeita.' }
        ],
        respostaCorreta: 'B',
        conceitoChave: 'Classificação de Bens Comuns'
      }
    ],
    simuladorRecomendadoId: 'coase',
    leituraRecomendadaDrive: {
      obra: 'La Economía del Sector Público',
      autor: 'Joseph E. Stiglitz e Jay K. Rosengard',
      capitulo: 'Capítulo 6 (Externalidades y Recursos Comunes)'
    }
  }
];
