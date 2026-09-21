import { EstudoDeCaso } from '../types';

export const ESTUDOS_CASO_UNIDADE_5: EstudoDeCaso[] = [
  {
    id: 'CASO-U5-01',
    unidadeNumero: 5,
    numeroNaUnidade: 1,
    titulo: 'O Teorema da Descentralização de Oates e a Diversidade Regional Brasileira',
    subtitulo: 'Preferências Heterogêneas, Eficiência Alocativa e a Provisão Local de Bens Públicos',
    ambito: 'Federal',
    contextoEconomico: 'O Brasil abrange 26 estados, o Distrito Federal e 5.570 municípios, com discrepâncias socioeconômicas e culturais brutais entre a Região Sul e o Semiárido nordestino/Baixada Maranhense. Políticas públicas centralizadas e uniformizadas pelo governo federal em Brasília (por exemplo, parâmetros rígidos de cardápio de merenda ou transporte escolar fluvial) frequentemente geram inadequação alocativa e desperdício de recursos.',
    dilemaFiscal: 'Qual o fundamento microeconômico que comprova a superioridade de bem-estar da descentralização fiscal na provisão de bens públicos sob preferências locais heterogêneas?',
    teoriaAplicada: {
      conceito: 'Teorema da Descentralização de Wallace Oates (1972)',
      autoresChave: 'Wallace E. Oates (1972); Fabrício A. Oliveira (2007); Gordon Tullock (1969)',
      mecanismo: 'Oates demonstrou que, na ausência de economias de escala significativas e externalidades interjurisdicionais, a provisão descentralizada de bens públicos locais — que permite a cada jurisdição escolher a quantidade que iguala a demanda de seus próprios cidadãos — é Pareto-superior à provisão centralizada e uniforme imposta pelo governo central.'
    },
    dadosCenarios: [
      { indicador: 'Ganho Teórico de Bem-Estar da Descentralização', valor: 'Área triangular de excedente do consumidor recuperada', interpretacao: 'Evita subatendimento em áreas de alta preferência e sobreprovisão onde a demanda é nula.' },
      { indicador: 'Heterogeneidade de Preferências Regionais', valor: 'Elevada (índice de dispersão > 0,65)', interpretacao: 'Ambiente no qual as hipóteses do Teorema de Oates produzem o benefício máximo.' }
    ],
    perguntasFixacao: [
      {
        id: 'P-U5-01-1',
        pergunta: 'Segundo o Teorema da Descentralização formulado por Wallace Oates (1972), a provisão descentralizada de um bem público local é estritamente superior à provisão centralizada uniforme quando:',
        opcoes: [
          { id: 'A', texto: 'As preferências dos cidadãos das diferentes regiões são perfeitamente homogêneas e idênticas.', explicacao: 'Incorreto. Sob preferências idênticas, a provisão uniforme não geraria perda de bem-estar.' },
          { id: 'B', texto: 'As preferências locais forem heterogêneas e os custos de provisão não apresentarem fortes economias de escala ou transbordamentos (spillovers) interjurisdicionais.', explicacao: 'Correto! Essa é a essência do teorema: ajustar a oferta às preferências locais maximiza o bem-estar dos contribuintes.' },
          { id: 'C', texto: 'A taxa de câmbio for fixada pelo Banco Central com paridade estrita.', explicacao: 'Incorreto. O teorema é de finanças públicas fiscais subnacionais.' },
          { id: 'D', texto: 'Todos os governadores pertencerem ao mesmo partido do Presidente da República.', explicacao: 'Incorreto. O modelo independe de filiação partidária.' }
        ],
        respostaCorreta: 'B',
        conceitoChave: 'Teorema da Descentralização de Oates'
      }
    ],
    simuladorRecomendadoId: 'oates',
    leituraRecomendadaDrive: {
      obra: 'Teorias da Federação e do Federalismo Fiscal: O Caso Brasileiro',
      autor: 'Fabrício Augusto de Oliveira',
      capitulo: 'Seção 4.1 (O Teorema da Descentralização de Oates)'
    }
  },
  {
    id: 'CASO-U5-02',
    unidadeNumero: 5,
    numeroNaUnidade: 2,
    titulo: 'O Modelo de Tiebout: "Votando com os Pés" entre Municípios da Ilha de São Luís',
    subtitulo: 'Mobilidade Cidadã, Concorrência Fiscal Interjurisdicional e Revelação das Preferências por Bens Locais',
    ambito: 'Municipal',
    contextoEconomico: 'A Grande Ilha de São Luís compreende quatro municípios conurbados: São Luís, São José de Ribamar, Paço do Lumiar e Raposa. Famílias de classe média e investidores escolhem fixar residência em condomínios fechados ou zonas urbanas comparando ativamente o pacote fiscal: qualidade da pavimentação, segurança viária e limpeza urbana frente à alíquota e valor venal cobrado no IPTU e ITBI.',
    dilemaFiscal: 'Pode a mobilidade dos cidadãos criar um mecanismo de quase-mercado que força prefeitos a operarem com máxima eficiência para reter contribuintes?',
    teoriaAplicada: {
      conceito: 'Modelo de Tiebout: "A Pure Theory of Local Expenditures" (1956)',
      autoresChave: 'Charles Tiebout (1956); Wallace Oates (1972); Fabrício A. Oliveira (2007)',
      mecanismo: 'Tiebout demonstrou que, se os cidadãos puderem se locomover livremente sem custo entre jurisdições locais com diferentes pacotes de tributos e bens públicos ("votar com os pés"), o problema do carona é superado: os indivíduos revelam suas verdadeiras preferências escolhendo a comunidade que melhor satisfaz seu perfil tributário-alocativo.'
    },
    dadosCenarios: [
      { indicador: 'Mobilidade Residencial Intermunicipal na Ilha', valor: '32% mudaram de município em 10 anos', interpretacao: 'Evidência empírica de arbitragem de custo de vida e amenidades urbanas.' },
      { indicador: 'Diferencial de IPTU / metro quadrado', valor: 'Variação de até 180% entre as prefeituras', interpretacao: 'Concorrência tributária horizontal nos bairros limítrofes.' }
    ],
    perguntasFixacao: [
      {
        id: 'P-U5-02-1',
        pergunta: 'No modelo de Charles Tiebout (1956), a revelação das preferências individuais por bens públicos locais é alcançada porque:',
        opcoes: [
          { id: 'A', texto: 'O governo central impõe um sistema obrigatório de plebiscitos semanais.', explicacao: 'Incorreto. Tiebout não depende de votação em urnas, mas de mobilidade física.' },
          { id: 'B', texto: 'Os cidadãos "votam com os pés", migrando para o município cujo pacote fiscal (relação impostos cobrados / serviços públicos ofertados) melhor atenda à sua função de utilidade.', explicacao: 'Correto! A mobilidade interjurisdicional simula o mercado privado de escolha de bens.' },
          { id: 'C', texto: 'A regra da maioria simples de Condorcet é sempre transitiva.', explicacao: 'Incorreto. Condorcet trata de votação formal com paradoxo de ciclos.' },
          { id: 'D', texto: 'Os prefeitos municipais renunciam voluntariamente à cobrança de qualquer tributo.', explicacao: 'Incorreto. O IPTU funciona como o "preço de entrada" da comunidade.' }
        ],
        respostaCorreta: 'B',
        conceitoChave: 'Modelo de Tiebout ("Votando com os Pés")'
      }
    ],
    simuladorRecomendadoId: 'tiebout',
    leituraRecomendadaDrive: {
      obra: 'Teorias da Federação e do Federalismo Fiscal: O Caso Brasileiro',
      autor: 'Fabrício Augusto de Oliveira',
      capitulo: 'Seção 4 (O Paradigma Teórico de Tiebout e Oates)'
    }
  },
  {
    id: 'CASO-U5-03',
    unidadeNumero: 5,
    numeroNaUnidade: 3,
    titulo: 'Transferências Intergovernamentais (FPE/FPM) e o "Efeito Flypaper" no Maranhão',
    subtitulo: 'Assimetria Fiscal, Desestímulo à Arrecadação Própria e "O Dinheiro Gruda Onde Cai"',
    ambito: 'Estadual (Maranhão)',
    contextoEconomico: 'A grande maioria dos 217 municípios do Maranhão apresenta baixíssima capacidade arrecadatória tributária própria (IPTU e ISS representam menos de 5% de suas receitas totais), dependendo quase integralmente das transferências constitucionais redistributivas: Fundo de Participação dos Municípios (FPM), cota-parte do ICMS e FUNDEB. A teoria neoclássica preveria que o recebimento de transferências de soma fixa pelo município deveria gerar redução equivalente nos impostos locais dos cidadãos.',
    dilemaFiscal: 'Por que prefeitos utilizam os recursos recebidos de transferências para expandir o gasto público local em vez de desonerar os munícipes (o fenômeno empírico do Efeito Flypaper)?',
    teoriaAplicada: {
      conceito: 'Transferências Fiscais Redistributivas e o Fenômeno do Efeito Flypaper ("Money sticks where it hits")',
      autoresChave: 'Arthur Okun (1975); Bradford & Oates (1971); Fabrício A. Oliveira (2007); José Matias-Pereira (2018)',
      mecanismo: 'Teoricamente, R$ 1,00 de transferência incondicional deveria ter o mesmo efeito sobre o gasto de R$ 1,00 de aumento na renda da comunidade. Na prática empírica, a transferência governamental estimula o gasto público local com um multiplicador de 5 a 10 vezes maior do que um aumento na renda privada local, devido à ilusão fiscal dos eleitores e ao poder de barganha da burocracia.'
    },
    dadosCenarios: [
      { indicador: 'Dependência Média dos Municípios do Maranhão em FPM e Transferências', valor: '88% a 95% da Receita Corrente', interpretacao: 'Vulnerabilidade fiscal crônica e ausência de esforço de cobrança do IPTU/ISS.' },
      { indicador: 'Propensão Marginal a Gastar Transferências (Flypaper)', valor: '0,75 a 0,90', interpretacao: 'Quase todo o recurso do FPM é absorvido em contratação e custeio da máquina.' },
      { indicador: 'Propensão a Gastar com Base em Renda Local', valor: '0,08 a 0,12', interpretacao: 'Comprova a assimetria brutal formulada pela literatura de finanças subnacionais.' }
    ],
    perguntasFixacao: [
      {
        id: 'P-U5-03-1',
        pergunta: 'O chamado "Efeito Flypaper" (o dinheiro gruda onde cai) no federalismo fiscal representa a anomalia empírica segundo a qual:',
        opcoes: [
          { id: 'A', texto: 'As transferências intergovernamentais elevam os gastos do governo receptor em magnitude muito superior àquela que seria induzida por um aumento equivalente na renda da comunidade local.', explicacao: 'Correto! Essa é a definição consagrada na literatura por Bradford & Oates (1971): os governos gastam transferências em vez de repassar em alívio tributário aos eleitores.' },
          { id: 'B', texto: 'Todas as receitas arrecadadas pelo Estado são recolhidas diretamente pela União sem devolução.', explicacao: 'Incorreto. O FPE e FPM são transferências devolutivas automáticas da CF/88.' },
          { id: 'C', texto: 'O Coeficiente de Gini do município torna-se perfeitamente igual a zero.', explicacao: 'Incorreto. O efeito flypaper analisa o comportamento dos gastos governamentais.' },
          { id: 'D', texto: 'Os prefeitos são impedidos de contratar pessoal pela Lei de Responsabilidade Fiscal.', explicacao: 'Incorreto. A LRF estabelece tetos, mas o flypaper estimula a pressão de gastos.' }
        ],
        respostaCorreta: 'A',
        conceitoChave: 'Efeito Flypaper'
      }
    ],
    simuladorRecomendadoId: 'federalism',
    leituraRecomendadaDrive: {
      obra: 'Finanças Públicas: Teoria e Prática no Brasil',
      autor: 'Fabio Giambiagi e Ana Cláudia Além',
      capitulo: 'Capítulo 12 (Federalismo Fiscal e Finanças Subnacionais)'
    }
  },
  {
    id: 'CASO-U5-04',
    unidadeNumero: 5,
    numeroNaUnidade: 4,
    titulo: 'A Guerra Fiscal do ICMS e o Dilema dos Prisioneiros Federativo',
    subtitulo: 'Competição Fiscal Prejudicada, Concessão de Benefícios Unilaterais e Equilíbrio de Nash Sub-ótimo',
    ambito: 'Estadual (Maranhão)',
    contextoEconomico: 'Durante décadas, governadores de diversos estados brasileiros (inclusive Maranhão, Ceará, Bahia e Goiás) utilizaram incentivos unilaterais de ICMS (créditos presumidos, dilações de prazo e isenções) para atrair montadoras, cervejarias e indústrias calçadistas, sem a anuência unânime do Conselho Nacional de Política Fazendária (CONFAZ). A concessão recíproca de benefícios acabou por anular a vantagem comparativa de atração entre os estados vizinhos.',
    dilemaFiscal: 'Por que a guerra fiscal interestadual configura um Dilema dos Prisioneiros clássico da Teoria dos Jogos, onde a estratégia dominante de conceder incentivo leva todos os estados a perderem receita líquida?',
    teoriaAplicada: {
      conceito: 'Dilema dos Prisioneiros e Competição Tributária Prejudicada (Tax Competition)',
      autoresChave: 'Fabrício A. Oliveira (2007); Gordon Tullock (1969); John Nash (1950)',
      mecanismo: 'Se um estado concede incentivo e os vizinhos não, ele atrai a fábrica. No entanto, sabendo disso, todos os estados vizinhos também concedem benefícios iguais ou maiores (estratégia dominante). No Equilíbrio de Nash final, a indústria se instala onde teria escolhido de qualquer forma por logística de mercado, mas nenhum estado recolhe imposto, havendo perda coletiva de arrecadação para os cofres públicos.'
    },
    dadosCenarios: [
      { indicador: 'Renúncia de Receita Acumulada em ICMS', valor: 'Centenas de bilhões de reais consolidados', interpretacao: 'Erosão da capacidade de investimento em saúde, educação e segurança pública.' },
      { indicador: 'Equilíbrio Cooperativo vs. Equilíbrio de Nash', valor: 'Perda de 2,1% do PIB em receita tributária subnacional', interpretacao: 'Prova formal de ineficiência pareto-inferior do jogo não-cooperativo.' }
    ],
    perguntasFixacao: [
      {
        id: 'P-U5-04-1',
        pergunta: 'Ao analisar a Guerra Fiscal do ICMS entre os estados da federação brasileira sob a ótica da Teoria dos Jogos, o resultado em que todos os governos concedem isenções tributárias caracteriza:',
        opcoes: [
          { id: 'A', texto: 'Um ótimo de Pareto cooperativo com máxima arrecadação para todos os entes.', explicacao: 'Incorreto. O equilíbrio é sub-ótimo e reduz as receitas estaduais.' },
          { id: 'B', texto: 'Um Equilíbrio de Nash sub-ótimo derivado de um Dilema dos Prisioneiros, no qual a busca por vantagens individuais imediatas resulta em perda generalizada de receita para todos os estados.', explicacao: 'Correto! Cada estado tenta atrair a fábrica individualmente, mas quando todos fazem o mesmo, anulam-se os incentivos e sobra apenas a perda fiscal coletiva.' },
          { id: 'C', texto: 'A aplicação estrita da condição de Samuelson de soma vertical de preferências.', explicacao: 'Incorreto. Samuelson analisa provisão ótima de bens públicos.' },
          { id: 'D', texto: 'A eliminação permanente de qualquer custo de transação de Coase.', explicacao: 'Incorreto. Os conflitos federativos envolvem cooperação estratégica.' }
        ],
        respostaCorreta: 'B',
        conceitoChave: 'Guerra Fiscal como Dilema dos Prisioneiros'
      }
    ],
    simuladorRecomendadoId: 'fiscal_war',
    leituraRecomendadaDrive: {
      obra: 'Teorias da Federação e do Federalismo Fiscal: O Caso Brasileiro',
      autor: 'Fabrício Augusto de Oliveira',
      capitulo: 'Seção 4.2 e Análise da Guerra Fiscal Interestadual'
    }
  },
  {
    id: 'CASO-U5-05',
    unidadeNumero: 5,
    numeroNaUnidade: 5,
    titulo: 'A Lei de Responsabilidade Fiscal (LC 101/2000) e os Limites de Despesa com Pessoal no TCE-MA',
    subtitulo: 'Regras Fiscais Numéricas, Limite de Alerta, Limite Prudencial e Sanções Institucionais',
    ambito: 'Estadual (Maranhão)',
    contextoEconomico: 'O Tribunal de Contas do Estado do Maranhão (TCE-MA) emite relatórios quadrimestrais da Lei de Responsabilidade Fiscal (LRF) monitorando a Despesa Total com Pessoal (DTP) do Poder Executivo estadual e dos municípios em relação à Receita Corrente Líquida (RCL). Diversas prefeituras maranhenses ultrapassam o Limite Máximo legal de 54% da RCL para despesas com pessoal, acionando vedações a nomeações, horas extras e contratação de operações de crédito.',
    dilemaFiscal: 'Como os gestores públicos podem readequar os gastos com pessoal ao teto da LRF quando as pressões políticas por contratação eleitoral colidem com as sanções de inelegibilidade e bloqueio de transferências voluntárias?',
    teoriaAplicada: {
      conceito: 'Regras Fiscais Institucionais e Restrição Orçamentária Dura (Soft vs. Hard Budget Constraint)',
      autoresChave: 'Janos Kornai (1986); Fabio Giambiagi (2011); José Matias-Pereira (2018)',
      mecanismo: 'Historicamente, os estados e municípios operavam sob restrição orçamentária fraca (soft budget constraint), esperando que a União socorresse seus déficits. A LRF introduziu regras numéricas rígidas (Hard Budget Constraint) com gatilhos de alerta (90% do teto), prudencial (95%) e máximo (100%), impondo responsabilização civil, administrativa e penal ao gestor.'
    },
    dadosCenarios: [
      { indicador: 'Limite Máximo para Executivo Municipal', valor: '54% da RCL', interpretacao: 'Teto intransponível estabelecido pelo art. 20, III, da LRF.' },
      { indicador: 'Limite Prudencial (Gatilho de Vedações)', valor: '51,3% da RCL (95% do limite)', interpretacao: 'Proíbe aumento salarial, criação de cargos e contratação de horas extras.' },
      { indicador: 'Municípios Maranhenses Acima do Limite', valor: 'Aproximadamente 40% das prefeituras em anos pré-eleitorais', interpretacao: 'Exige planos quadrimestrais de exoneração de comissionados e contenção.' }
    ],
    perguntasFixacao: [
      {
        id: 'P-U5-05-1',
        pergunta: 'Conforme preceitua a Lei de Responsabilidade Fiscal (LC nº 101/2000), ao atingir o "Limite Prudencial" de despesas com pessoal (95% do limite máximo legal), o ente federativo fica expressamente proibido de:',
        opcoes: [
          { id: 'A', texto: 'Recolher os tributos municipais de sua competência privativa (IPTU e ISS).', explicacao: 'Incorreto. A cobrança de tributos próprios é dever funcional que jamais é suspenso.' },
          { id: 'B', texto: 'Conceder vantagens, aumentos ou reajustes salariais, criar novos cargos ou admitir pessoal (ressalvada reposição em saúde, educação e segurança por vacância).', explicacao: 'Correto! O art. 22, parágrafo único, da LRF impõe exatamente essa trava automática para impedir o rompimento do teto máximo.' },
          { id: 'C', texto: 'Pagar os benefícios previdenciários aos aposentados e pensionistas do regime próprio.', explicacao: 'Incorreto. Benefícios previdenciários constituem obrigações constitucionais de direito adquirido.' },
          { id: 'D', texto: 'Apresentar a prestação de contas quadrimestral ao Tribunal de Contas.', explicacao: 'Incorreto. A transparência e o envio de relatórios fiscais são obrigatórios.' }
        ],
        respostaCorreta: 'B',
        conceitoChave: 'Limite Prudencial da LRF'
      }
    ],
    simuladorRecomendadoId: 'lrf_engine',
    leituraRecomendadaDrive: {
      obra: 'Finanças Públicas',
      autor: 'José Matias-Pereira',
      capitulo: 'Capítulo 12 e Capítulo 13 (Responsabilidade Fiscal e Gestão das Finanças Públicas)'
    }
  }
];
