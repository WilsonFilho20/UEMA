import { EstudoDeCaso } from '../types';

export const ESTUDOS_CASO_UNIDADE_3: EstudoDeCaso[] = [
  {
    id: 'CASO-U3-01',
    unidadeNumero: 3,
    numeroNaUnidade: 1,
    titulo: 'O Orçamento da Secretaria de Estado e a Maximização Burocrática de Niskanen',
    subtitulo: 'Falhas de Governo, Assimetria de Informação com o Legislativo e Expansão do Gasto Público',
    ambito: 'Estadual (Maranhão)',
    contextoEconomico: 'Ao elaborar a Lei Orçamentária Anual (LOA) do Estado do Maranhão, os secretários e diretores de órgãos estaduais possuem informações técnicas detalhadas sobre os custos de suas pastas que os deputados da Assembleia Legislativa (ALEMA) não conseguem auditar com precisão. Seguindo a premissa da Teoria da Escolha Pública, o corpo burocrático apresenta propostas "tudo-ou-nada", buscando maximizar o tamanho total de suas dotações e o quadro de pessoal.',
    dilemaFiscal: 'Como o Parlamento ou o Tribunal de Contas (TCE-MA) pode conter a expansão excessiva do orçamento quando o burocrata tem incentivo racional para produzir no ponto onde o Benefício Total iguala o Custo Total (BT = CT), em vez do ótimo social onde BMg = CMg?',
    teoriaAplicada: {
      conceito: 'Modelo de Burocracia de William Niskanen (1971; 1986)',
      autoresChave: 'William A. Niskanen (1971, 1986); Gordon Tullock (1988); James M. Buchanan (1993)',
      mecanismo: 'Diferente da firma privada que maximiza lucro (RMg = CMg), o burocrata não pode se apropriar do lucro contábil. Sua utilidade depende de prestígio, poder, tamanho da equipe e orçamento gerido. Ele explora o monopólio da informação para ofertar a quantidade máxima onde o benefício total iguala o custo total (BT = CT), gerando sobreprodução crônica e peso morto burocrático.'
    },
    dadosCenarios: [
      { indicador: 'Ponto Ótimo Social (BMg = CMg)', valor: 'Orçamento de R$ 180 milhões', interpretacao: 'Nível que maximiza o excedente líquido da sociedade.' },
      { indicador: 'Ponto de Equilíbrio de Niskanen (BT = CT)', valor: 'Orçamento de R$ 320 milhões', interpretacao: 'Quase o dobro do ótimo, com dissipação integral do excedente social.' },
      { indicador: 'Assimetria Informacional na ALEMA', valor: 'Elevada (poucos analistas fiscais legislativos)', interpretacao: 'Facilita a aprovação de propostas de pacote fechado.' }
    ],
    perguntasFixacao: [
      {
        id: 'P-U3-01-1',
        pergunta: 'No modelo de burocracia formulado por William Niskanen (1971), a quantidade de serviços públicos ofertada pelo burocrata monopolista é caracterizada por:',
        opcoes: [
          { id: 'A', texto: 'Ser inferior à quantidade socialmente ótima, gerando escassez semelhante ao monopólio privado.', explicacao: 'Incorreto. O monopólio privado restringe quantidade para subir preço; o burocrata quer orçamento grande, logo expande a quantidade.' },
          { id: 'B', texto: 'Ser sistematicamente superior à quantidade ótima, situando-se no ponto onde o Benefício Total iguala o Custo Total (BT = CT), dissipando todo o excedente social.', explicacao: 'Correto! Niskanen prova que o burocrata maximizador de orçamento expande o serviço até que o benefício líquido da sociedade se reduza a zero.' },
          { id: 'C', texto: 'Coincidir com a taxa de imposto ótima da Regra de Ramsey.', explicacao: 'Incorreto. Ramsey trata de tributação de mercadorias, não de burocracia.' },
          { id: 'D', texto: 'Eliminar qualquer tipo de custo de agência ou assimetria informacional.', explicacao: 'Incorreto. A assimetria informacional é a causa do poder do burocrata.' }
        ],
        respostaCorreta: 'B',
        conceitoChave: 'Maximização Orçamentária de Niskanen'
      }
    ],
    simuladorRecomendadoId: 'niskanen',
    leituraRecomendadaDrive: {
      obra: 'The Political Economy of Rent-Seeking',
      autor: 'Charles K. Rowley, Robert D. Tollison e Gordon Tullock',
      capitulo: 'Capítulo 20 e Niskanen (1986)'
    }
  },
  {
    id: 'CASO-U3-02',
    unidadeNumero: 3,
    numeroNaUnidade: 2,
    titulo: 'A Disputa Eleitoral e a Convergência ao Centro: O Teorema do Eleitor Mediano',
    subtitulo: 'Competição Espacial de Downs, Distribuição de Preferências dos Eleitores e Plataformas Políticas',
    ambito: 'Estadual (Maranhão)',
    contextoEconomico: 'Durante as eleições para o governo estadual e prefeituras do Maranhão, candidatos de diferentes espectros ideológicos disputam os votos dos cidadãos em torno de temas fiscais: volume de gastos sociais versus desoneração fiscal e rigor contra a corrupção. Assumindo que as preferências dos eleitores sejam unimodais ao longo do eixo unidimensional de tamanho do Estado (esquerda-direita fiscal).',
    dilemaFiscal: 'Por que candidatos de polos opostos tendem a moderar seus discursos e convergir suas propostas econômicas para o centro do espectro político durante o segundo turno?',
    teoriaAplicada: {
      conceito: 'Teorema do Eleitor Mediano (Median Voter Theorem) de Anthony Downs (1957)',
      autoresChave: 'Anthony Downs (1957, 1999); Duncan Black (1948); Fabio Giambiagi (2011)',
      mecanismo: 'Sob regras de votação majoritária e preferências unimodais, a plataforma vencedora será aquela preferida pelo Eleitor Mediano (aquele que divide o eleitorado exatamente em duas metades de 50%). Qualquer candidato que se afastar do mediano perderá a maioria para o adversário que se posicionar mais próximo deste centro de gravidade.'
    },
    dadosCenarios: [
      { indicador: 'Posição do Eleitor Mediano', valor: 'Orçamento com foco em Saúde e Emprego Local', interpretacao: 'Ponto focal que decide a maioria dos sufrágios.' },
      { indicador: 'Eleitorado com Preferências Unimodais', valor: '82% da amostra eleitoral', interpretacao: 'Atende às premissas de consistência e estabilidade do Teorema de Downs.' }
    ],
    perguntasFixacao: [
      {
        id: 'P-U3-02-1',
        pergunta: 'Segundo a teoria econômica da democracia desenvolvida por Anthony Downs (1957), a principal razão pela qual partidos políticos formulam políticas públicas é:',
        opcoes: [
          { id: 'A', texto: 'Implementar a função de bem-estar social altruísta de Platão independentemente dos votos.', explicacao: 'Incorreto. A premissa central de Public Choice é o interesse próprio dos políticos.' },
          { id: 'B', texto: 'Ganhar eleições para desfrutar do poder e prestígio dos cargos, formulando políticas públicas como meio para maximizar votos do eleitorado.', explicacao: 'Correto! Como sintetizou Downs: "os partidos formulam políticas com o objetivo de ganhar eleições, em vez de ganhar eleições para formular políticas".' },
          { id: 'C', texto: 'Reduzir a alíquota tributária até o ponto de benefício marginal zero.', explicacao: 'Incorreto. Downs não assume que políticos queiram minimizar impostos, mas vencer eleições.' },
          { id: 'D', texto: 'Internalizar custos de Coase em transações bilaterais mercantis.', explicacao: 'Incorreto. Downs analisa o mercado político de sufrágio.' }
        ],
        respostaCorreta: 'B',
        conceitoChave: 'Teorema do Eleitor Mediano de Downs'
      }
    ],
    simuladorRecomendadoId: 'downs',
    leituraRecomendadaDrive: {
      obra: 'Uma Teoria Econômica da Democracia',
      autor: 'Anthony Downs',
      capitulo: 'Capítulo 2, 3 e Capítulo 8 (A Dinâmica da Competição Partidária)'
    }
  },
  {
    id: 'CASO-U3-03',
    unidadeNumero: 3,
    numeroNaUnidade: 3,
    titulo: 'O Paradoxo de Condorcet e a Impossibilidade de Agregação Social de Kenneth Arrow',
    subtitulo: 'Intransitividade Coletiva, Votação Majoritária Cíclica e o Controle da Pauta Legislativa',
    ambito: 'Federal',
    contextoEconomico: 'A Comissão de Assuntos Econômicos do Congresso Nacional precisa deliberar sobre a destinação prioritária do superávit financeiro federal entre três opções excludentes: (A) Abate imediato da dívida pública; (B) Investimento em infraestrutura de transportes; (C) Redução linear de alíquotas do imposto de renda. Três blocos parlamentares de pesos semelhantes possuem ordenamentos de preferências cruzadas estritamente transitivas a nível individual, gerando paradoxo de votação.',
    dilemaFiscal: 'Como a ordem da votação por pares (agenda setting) pode determinar arbitrariamente o resultado final, confirmando a impossibilidade de agregação democrática perfeita?',
    teoriaAplicada: {
      conceito: 'Teorema da Impossibilidade de Kenneth Arrow (1951) e Paradoxo de Condorcet',
      autoresChave: 'Kenneth J. Arrow (1951); Marquis de Condorcet (1785); Eric Maskin & Amartya Sen (2014)',
      mecanismo: 'Arrow demonstrou matematicamente que nenhuma regra de votação coletiva pode satisfazer simultaneamente cinco axiomas mínimos de racionalidade (Transitividade, Não-Ditadura, Princípio de Pareto fraco, Domínio Irrestrito e Independência de Alternativas Irrelevantes). Em certas configurações de preferências, A vence B, B vence C e C vence A, criando um ciclo perpétuo.'
    },
    dadosCenarios: [
      { indicador: 'Bloco Liberal (33% dos votos)', valor: 'Ordem de Preferência: A > B > C', interpretacao: 'Prioriza dívida, depois estradas, por fim corte fiscal difuso.' },
      { indicador: 'Bloco Desenvolvimentista (33%)', valor: 'Ordem de Preferência: B > C > A', interpretacao: 'Prioriza investimento público, depois corte de imposto, rejeita amortização.' },
      { indicador: 'Bloco Contribuinte (34%)', valor: 'Ordem de Preferência: C > A > B', interpretacao: 'Prioriza corte de impostos, depois dívida, rejeita obra pública.' }
    ],
    perguntasFixacao: [
      {
        id: 'P-U3-03-1',
        pergunta: 'Ao aplicar o Teorema da Impossibilidade de Arrow ao processo de votação orçamentária, conclui-se que:',
        opcoes: [
          { id: 'A', texto: 'A regra da maioria simples é à prova de manipulação por quem define a pauta da votação (agenda-setter).', explicacao: 'Incorreto. Na presença de ciclos, quem controla a pauta escolhe o vencedor final.' },
          { id: 'B', texto: 'É impossível construir uma função de bem-estar social democrática que agregue preferências individuais de forma invariavelmente transitiva e livre de ditadura sob qualquer conjunto de preferências.', explicacao: 'Correto! Este é o enunciado exato do celebrado Teorema de Arrow (Prêmio Nobel de 1972).' },
          { id: 'C', texto: 'Todos os eleitores possuem preferências perfeitamente idênticas.', explicacao: 'Incorreto. O teorema lida exatamente com o conflito de preferências.' },
          { id: 'D', texto: 'O resultado de mercado livre resolve a escolha social sem nenhum preço relativo.', explicacao: 'Incorreto. Arrow analisa a agregação política de votos.' }
        ],
        respostaCorreta: 'B',
        conceitoChave: 'Teorema da Impossibilidade de Arrow'
      }
    ],
    simuladorRecomendadoId: 'arrow',
    leituraRecomendadaDrive: {
      obra: 'The Arrow Impossibility Theorem',
      autor: 'Eric Maskin e Amartya Sen',
      capitulo: 'Columbia University Press, 2014'
    }
  },
  {
    id: 'CASO-U3-04',
    unidadeNumero: 3,
    numeroNaUnidade: 4,
    titulo: 'Logrolling (Troca de Votos) e Emendas Parlamentares Impositivas no Brasil',
    subtitulo: 'Pork-Barrel Politics, Benefícios Concentrados e Custos Difusos na Alocação Orçamentária',
    ambito: 'Federal',
    contextoEconomico: 'O Congresso Nacional expandiu vertiginosamente o volume de emendas parlamentares individuais, de bancada e de comissões (RP6, RP7, RP8 e RP9), atingindo mais de R$ 50 bilhões anuais. Parlamentares trocam votos entre si para aprovar projetos locais específicos em seus redutos eleitorais ("pork barrel"), cujos benefícios são concentrados geograficamente, enquanto o custo tributário é rateado difusamente por toda a população brasileira.',
    dilemaFiscal: 'Por que o logrolling legislativo gera expansão sistemática e ineficiente do gasto público agregado, mesmo quando cada projeto isolado possui benefício social menor que o custo total?',
    teoriaAplicada: {
      conceito: 'Teoria da Escolha Pública do Logrolling e Pork-Barrel Politics',
      autoresChave: 'James M. Buchanan e Gordon Tullock (1962); Mancur Olson (1965)',
      mecanismo: 'Em votações independentes, projetos ineficientes seriam rejeitados. Pelo logrolling (troca de apoio mútuo: "eu voto na sua ponte se você votar na minha estrada"), deputados aprovam um pacote de gastos onde a soma dos custos supera os benefícios reais para a sociedade, devido à dispersão da fatura fiscal sobre a base tributária nacional.'
    },
    dadosCenarios: [
      { indicador: 'Volume Total de Emendas no Orçamento Federal', valor: 'Superior a R$ 50 bilhões/ano', interpretacao: 'Maior proporção discricionária de emendas parlamentares do mundo ocidental.' },
      { indicador: 'Relação Benefício/Custo dos Projetos Locais', valor: '0,65 a 0,80', interpretacao: 'Ineficiência alocativa compensada puramente pela troca política de votos.' },
      { indicador: 'Concentração Eleitoral de Votos', valor: 'Elevada nos redutos dos relatores', interpretacao: 'Rent-seeking político maximizando a reeleição parlamentar.' }
    ],
    perguntasFixacao: [
      {
        id: 'P-U3-04-1',
        pergunta: 'Em "O Cálculo do Consenso" (1962), Buchanan e Tullock demonstram que a prática do logrolling (troca de votos legislativa):',
        opcoes: [
          { id: 'A', texto: 'Garante que apenas projetos com taxa social de retorno acima de 20% sejam aprovados.', explicacao: 'Incorreto. Projetos ineficientes são viabilizados pelo rateio difuso dos custos.' },
          { id: 'B', texto: 'Permite aos parlamentares expressarem a intensidade relativa de suas preferências, mas tende a aprovar gastos excessivos quando os benefícios são concentrados e os custos difusos.', explicacao: 'Correto! A troca de votos viabiliza projetos de forte interesse local financiado pelo bolso geral de todos os contribuintes.' },
          { id: 'C', texto: 'Elimina integralmente o déficit público primário da União.', explicacao: 'Incorreto. O logrolling historicamente pressiona os gastos para cima.' },
          { id: 'D', texto: 'Torna desnecessária qualquer arrecadação de tributos.', explicacao: 'Incorreto. Exige mais receitas para cobrir os pactos de despesa.' }
        ],
        respostaCorreta: 'B',
        conceitoChave: 'Logrolling e Pork-Barrel'
      }
    ],
    simuladorRecomendadoId: 'logrolling',
    leituraRecomendadaDrive: {
      obra: 'The Calculus of Consent: Logical Foundations of Constitutional Democracy',
      autor: 'James M. Buchanan e Gordon Tullock',
      capitulo: 'Capítulo 10 e 11 (Simple Majority Voting and Logrolling)'
    }
  },
  {
    id: 'CASO-U3-05',
    unidadeNumero: 3,
    numeroNaUnidade: 5,
    titulo: 'A Disputa por Regimes Especiais de Tributação e o "Rent-Seeking" de Tullock',
    subtitulo: 'Busca de Renda Privilegiada, Dissipação de Excedente e Desperdício de Recursos Sociais',
    ambito: 'Federal',
    contextoEconomico: 'Entidades empresariais e sindicatos patronais contratam escritórios de advocacia tributária, realizam campanhas de lobby em Brasília e financiam eventos para obter benefícios fiscais e alíquotas reduzidas na regulamentação da Reforma Tributária (IBS/CBS). Estima-se que as despesas despendidas pelos grupos de interesse no lobby alcancem centenas de milhões de reais com o único fim de transferir renda para seus setores.',
    dilemaFiscal: 'Por que o custo social do rent-seeking para a economia é muito mais nocivo do que a simples perda de peso morto tradicional de Harberger?',
    teoriaAplicada: {
      conceito: 'Teoria do Rent-Seeking e Dissipação de Riqueza de Gordon Tullock (1967; 1988)',
      autoresChave: 'Gordon Tullock (1967, 1988); Anne O. Krueger (1974); Mancur Olson (1965)',
      mecanismo: 'Tullock demonstrou que a perda social de um privilégio monopolista ou benefício fiscal não é apenas o pequeno triângulo de Harberger. O retângulo do monopólio (o lucro extraordinário potencial da isenção) atrai recursos reais (advogados, lobistas, consultorias) que disputam o privilégio até que o valor gasto iguale o lucro esperado, dissipando riqueza social em atividades improdutivas.'
    },
    dadosCenarios: [
      { indicador: 'Valor do Benefício Fiscal Disputado', valor: 'R$ 8,5 bilhões/ano', interpretacao: 'Retângulo de renda artificial criada pela concessão regulatória.' },
      { indicador: 'Gastos Estimados dos Setores em Lobby e Articulação', valor: 'R$ 450 milhões', interpretacao: 'Recursos produtivos intelectuais desviados de inovação para captura de renda.' },
      { indicador: 'Perda de Eficiência Sistêmica para a Sociedade', valor: 'Aumento na alíquota padrão dos demais setores', interpretacao: 'Externalidade fiscal negativa sobre a indústria e serviços comuns.' }
    ],
    perguntasFixacao: [
      {
        id: 'P-U3-05-1',
        pergunta: 'Em seu artigo seminal de 1967, Gordon Tullock revolucionou a teoria econômica ao provar que o verdadeiro custo de monopólios criados por favores estatais e tarifas protecionistas reside em:',
        opcoes: [
          { id: 'A', texto: 'Apenas no pequeno triângulo de Harberger associado à redução do consumo marginal.', explicacao: 'Incorreto. Essa era a visão neoclássica anterior que Tullock superou.' },
          { id: 'B', texto: 'Na dissipação de recursos reais produtivos (tempo, dinheiro de lobby, advogados) que as empresas gastam disputando o privilégio concedido pelo Estado (retângulo de Tullock).', explicacao: 'Correto! Rent-seeking consome recursos que poderiam gerar novos bens, desperdiçando-os na mera disputa pela transferência de renda governamental.' },
          { id: 'C', texto: 'No aumento obrigatório da taxa básica de juros pelo Banco Central.', explicacao: 'Incorreto. A questão é de microeconomia política de apropriação de renda.' },
          { id: 'D', texto: 'Na redução voluntária dos salários dos funcionários públicos de carreira.', explicacao: 'Incorreto. Rent-seeking não implica corte salarial de servidores.' }
        ],
        respostaCorreta: 'B',
        conceitoChave: 'Retângulo de Rent-Seeking de Tullock'
      }
    ],
    simuladorRecomendadoId: 'rent_seeking',
    leituraRecomendadaDrive: {
      obra: 'The Political Economy of Rent-Seeking',
      autor: 'Gordon Tullock',
      capitulo: 'The Welfare Costs of Tariffs, Monopolies, and Theft (1967)'
    }
  }
];
