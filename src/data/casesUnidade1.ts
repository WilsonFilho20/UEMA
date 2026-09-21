import { EstudoDeCaso } from '../types';

export const ESTUDOS_CASO_UNIDADE_1: EstudoDeCaso[] = [
  {
    id: 'CASO-U1-01',
    unidadeNumero: 1,
    numeroNaUnidade: 1,
    titulo: 'O Dilema da Regra de Ouro Fiscal e o Ajuste do Déficit Brasileiro',
    subtitulo: 'Financiamento do Estado, Função Estabilizadora e Limites Constitucionais do Endividamento',
    ambito: 'Federal',
    contextoEconomico: 'A Constituição Federal de 1988 estabelece, no art. 167, III, a chamada "Regra de Ouro", vedando a realização de operações de créditos que excedam o montante das despesas de capital, ressalvada a autorização mediante créditos suplementares ou especiais com finalidade precisa pelo Congresso Nacional. Nos últimos exercícios, o Tesouro Nacional enfrentou pressões crescentes para financiar despesas correntes (previdência e folha de pagamento) por meio de emissão de títulos da dívida pública mobiliária federal (DPMFi).',
    dilemaFiscal: 'Como o governo federal pode conciliar a necessidade de estabilização macroeconômica sem violar a regra de sustentabilidade fiscal intertemporal e sem sacrificar o investimento público estruturante?',
    teoriaAplicada: {
      conceito: 'Função Estabilizadora de Musgrave e Teorema da Equivalência Ricardiana (Barro, 1974)',
      autoresChave: 'Richard Musgrave (1959); Robert Barro (1974); Giambiagi & Além (2011)',
      mecanismo: 'A dívida pública transfere a carga tributária no tempo. Se os agentes econômicos forem ricardianos, anteciparão impostos futuros e pouparão o montante, neutralizando o multiplicador de gastos públicos. Caso haja ilusão fiscal, o endividamento corrente gera descompasso inflacionário ou elevação de prêmio de risco nos juros longos.'
    },
    dadosCenarios: [
      { indicador: 'Dívida Bruta do Governo Geral (DBGG)', valor: '78,6% do PIB', interpretacao: 'Elevado endividamento soberano exigindo primários positivos para estabilização.' },
      { indicador: 'Investimento Público Líquido Federal', valor: '0,4% do PIB', interpretacao: 'Piso histórico, insuficiente até para repor a depreciação do capital público existente.' },
      { indicador: 'Despesa Obrigatória / Despesa Total', valor: '93,2%', interpretacao: 'Altíssima rigidez orçamentária que restringe a discricionariedade alocativa.' }
    ],
    perguntasFixacao: [
      {
        id: 'P-U1-01-1',
        pergunta: 'Segundo a clássica taxonomia tripartite de Musgrave, a decisão de contrair dívida pública soberana para sustentar o nível de emprego em momento de recessão enquadra-se prioritariamente em qual função econômica do Estado?',
        opcoes: [
          { id: 'A', texto: 'Função Alocativa, porque visa alocar recursos em bens privados de primeira necessidade.', explicacao: 'Incorreto. Bens privados não são objeto da função alocativa governamental.' },
          { id: 'B', texto: 'Função Estabilizadora, que busca manter alto nível de emprego e estabilidade do poder de compra da moeda através de políticas fiscais anticíclicas.', explicacao: 'Correto! Musgrave define a função estabilizadora exatamente como o uso do orçamento para suavizar ciclos econômicos e combater recessões.' },
          { id: 'C', texto: 'Função Distributiva, porque automaticamente melhora o Coeficiente de Gini entre todas as classes sociais.', explicacao: 'Incorreto. A dívida pode inclusive ter impacto regressivo se os juros forem pagos a detentores de alta renda.' },
          { id: 'D', texto: 'Função Regulatória Coasiana, pois elimina custos de transação na emissão primária.', explicacao: 'Incorreto. Coase trata de externalidades e direitos de propriedade.' }
        ],
        respostaCorreta: 'B',
        conceitoChave: 'Tríplice Função Fiscal de Musgrave'
      },
      {
        id: 'P-U1-01-2',
        pergunta: 'Se a Proposição da Equivalência Ricardiana de Robert Barro (1974) se verificar plenamente no Brasil, o aumento dos gastos governamentais financiados por déficit fiscal causará:',
        opcoes: [
          { id: 'A', texto: 'Forte expansão da demanda agregada com grande efeito multiplicador keynesiano.', explicacao: 'Incorreto. A hipótese ricardiana anula o multiplicador do déficit.' },
          { id: 'B', texto: 'Aumento equivalente da poupança privada dos cidadãos em antecipação aos tributos futuros, anulando o estímulo sobre o consumo agregado.', explicacao: 'Correto! Sob antecipação perfeita das famílias, o corte de impostos presente ou gasto financiado por dívida é poupado para pagar os tributos futuros.' },
          { id: 'C', texto: 'Uma queda imediata na taxa básica de juros (Selic) sem qualquer alteração na poupança.', explicacao: 'Incorreto. A taxa de juros não cai por esse mecanismo.' },
          { id: 'D', texto: 'Hiperinflação garantida no curtíssimo prazo em qualquer nível de capacidade ociosa.', explicacao: 'Incorreto. O modelo ricardiano não prediz hiperinflação automática.' }
        ],
        respostaCorreta: 'B',
        conceitoChave: 'Equivalência Ricardiana'
      }
    ],
    simuladorRecomendadoId: 'ricardian',
    leituraRecomendadaDrive: {
      obra: 'Finanças Públicas: Teoria e Prática no Brasil',
      autor: 'Fabio Giambiagi e Ana Cláudia Além',
      capitulo: 'Capítulo 1 e Capítulo 13 (Regras Fiscais e Déficit)'
    }
  },
  {
    id: 'CASO-U1-02',
    unidadeNumero: 1,
    numeroNaUnidade: 2,
    titulo: 'O Programa Bolsa Família e a Curva de Lorenz: Eficiência vs. Equidade',
    subtitulo: 'A Função Distributiva do Estado e as Funções de Bem-Estar Social (Bentham vs. Rawls)',
    ambito: 'Federal',
    contextoEconomico: 'O Brasil apresenta historicamente um dos mais altos índices de concentração de renda do mundo. Programas de transferência direta condicionada de renda, como o Bolsa Família, utilizam recursos fiscais tributários arrecadados nacionalmente para prover renda mínima a famílias em extrema pobreza (com foco expressivo no Nordeste, inclusive no Maranhão). Avalia-se o impacto no Coeficiente de Gini contra as críticas clássicas de desestímulo à oferta de trabalho na margem.',
    dilemaFiscal: 'Deve o Estado priorizar a elevação do produto total mesmo que com maior desigualdade (visão utilitarista benthamiana) ou maximizar a utilidade do indivíduo mais vulnerável da sociedade (visão rawlsiana do Maximin)?',
    teoriaAplicada: {
      conceito: 'Funções de Bem-Estar Social (SWF) de Bentham e Rawls e 2º Teorema do Bem-Estar',
      autoresChave: 'John Rawls (1971); Jeremy Bentham (1789); Joseph Stiglitz (2016)',
      mecanismo: 'Sob o critério de Rawls (W = min{U_1, U_2, ..., U_n}), o bem-estar social só cresce se a condição do cidadão mais desprovido melhorar. Sob Bentham (W = sum U_i), importa apenas a soma total de utilidades, independentemente de quem as detenha.'
    },
    dadosCenarios: [
      { indicador: 'Coeficiente de Gini do Rendimento Médio Domiciliar', valor: '0,518 (Brasil) / 0,550 (Maranhão)', interpretacao: 'Alta desigualdade estrutural exigindo transferências para convergência.' },
      { indicador: 'Custo do Programa / PIB', valor: '1,5% do PIB', interpretacao: 'Elevada eficiência alocativa focalizada na base da pirâmide com multiplicador local de 1,4.' },
      { indicador: 'Redução da Extrema Pobreza Infantil', valor: '-38% no primeiro decênio', interpretacao: 'Ganhos intergeracionais em capital humano e frequência escolar.' }
    ],
    perguntasFixacao: [
      {
        id: 'P-U1-02-1',
        pergunta: 'Ao avaliar uma política distributiva que retira R$ 100 de um indivíduo rico e entrega R$ 80 a uma família em extrema pobreza (havendo perda de R$ 20 em custos administrativos e distorção tributária), como o filósofo John Rawls julgaria essa política?',
        opcoes: [
          { id: 'A', texto: 'Rejeitaria a política, porque houve perda líquida de R$ 20 de riqueza total na economia.', explicacao: 'Incorreto. Rawls não mede o bem-estar pela riqueza agregada, mas pela condição do pior situado.' },
          { id: 'B', texto: 'Aprovaria a política, desde que a utilidade do indivíduo mais pobre aumente com a renda adicional líquida, pois o critério é maximizar o bem-estar do menos favorecido.', explicacao: 'Correto! No princípio Maximin de Rawls, se o membro mais desfavorecido estiver melhor do que antes, o bem-estar social aumentou.' },
          { id: 'C', texto: 'Rejeitaria qualquer intervenção que altere a distribuição de mercado pré-existente.', explicacao: 'Incorreto. Essa é a postura libertária de Robert Nozick, não de Rawls.' },
          { id: 'D', texto: 'Consideraria a medida indiferente caso o coeficiente de Gini permaneça inalterado.', explicacao: 'Incorreto. A medida melhora a condição do estrato mais baixo.' }
        ],
        respostaCorreta: 'B',
        conceitoChave: 'Critério Maximin de Rawls'
      }
    ],
    simuladorRecomendadoId: 'social_welfare',
    leituraRecomendadaDrive: {
      obra: 'La Economía del Sector Público',
      autor: 'Joseph E. Stiglitz e Jay K. Rosengard',
      capitulo: 'Capítulo 7 (Eficiencia y Equidad)'
    }
  },
  {
    id: 'CASO-U1-03',
    unidadeNumero: 1,
    numeroNaUnidade: 3,
    titulo: 'Modernização da Infraestrutura do Corredor de Carajás e Porto do Itaqui',
    subtitulo: 'Investimento em Bens de Capital Público, Teoremas do Bem-Estar e Curva de Contrato de Pareto',
    ambito: 'Estadual (Maranhão)',
    contextoEconomico: 'O Porto do Itaqui, em São Luís do Maranhão, opera como hub de exportação de grãos e minério de ferro com conexão pela Ferrovia Carajás e ferrovia Norte-Sul. O aumento de calado e expansão de berços exigem investimentos estatais de grande porte da EMAP (Empresa Maranhense de Administração Portuária) articulados a concessionárias privadas. Avalia-se se a alocação de recursos públicos atinge uma alocação ótima de Pareto ou gera deslocamento de investimentos privados (crowding-out).',
    dilemaFiscal: 'Deve o governo estadual atuar como investidor direto em infraestrutura logística (Função Alocativa) ou apenas conceder o ativo à exploração privada cobrando outorga?',
    teoriaAplicada: {
      conceito: 'Primeiro e Segundo Teoremas Fundamentais da Economia do Bem-Estar e Eficiência de Pareto',
      autoresChave: 'Kenneth Arrow (1951); Vilfredo Pareto (1906); Richard Musgrave (1959)',
      mecanismo: 'O 1º Teorema garante que mercados competitivos sem falhas atingem o ótimo de Pareto. Havendo retornos crescentes de escala e indivisibilidades de capital, o mercado livre falha, justificando a intervenção alocativa estatal para alcançar a Fronteira de Possibilidades de Utilidade.'
    },
    dadosCenarios: [
      { indicador: 'Volume Anual Movimentado no Itaqui', valor: '35 milhões de toneladas', interpretacao: 'Corredor estratégico com forte ganho de produtividade sistêmica para a economia maranhense.' },
      { indicador: 'Multiplicador de Emprego Regional', valor: '3,2 postos indiretos por direto', interpretacao: 'Externalidade de rede e encadeamento produtivo à montante e à jusante.' },
      { indicador: 'Taxa Social de Retorno (TSR)', valor: '18,4% ao ano', interpretacao: 'Superior ao custo de oportunidade de capital público, comprovando viabilidade social.' }
    ],
    perguntasFixacao: [
      {
        id: 'P-U1-03-1',
        pergunta: 'Em uma Caixa de Edgeworth que representa a alocação de recursos em uma economia, o ponto em que a infraestrutura portuária e os bens privados atingem a Eficiência de Pareto é caracterizado matematicamente por:',
        opcoes: [
          { id: 'A', texto: 'Ponto onde a Taxa Marginal de Substituição Técnica (TMST) é igual entre os fatores produtivos e a Taxa Marginal de Substituição (TMS) se iguala entre os consumidores.', explicacao: 'Correto! A eficiência na produção ocorre na tangência das isoquantas (TMST_L,K iguais), e no consumo na tangência das curvas de indiferença (TMS_X,Y iguais).' },
          { id: 'B', texto: 'Ponto de receita tributária máxima no topo da Curva de Laffer.', explicacao: 'Incorreto. Laffer trata de arrecadação fiscal, não de eficiência de Pareto na Caixa de Edgeworth.' },
          { id: 'C', texto: 'Ponto onde o imposto pigouviano iguala o custo marginal privado.', explicacao: 'Incorreto. Isso diz respeito à correção de externalidades.' },
          { id: 'D', texto: 'Onde o orçamento burocrático atinge a igualdade entre Benefício Total e Custo Total.', explicacao: 'Incorreto. Esse é o modelo de Niskanen de sobredimensionamento da burocracia.' }
        ],
        respostaCorreta: 'A',
        conceitoChave: 'Eficiência de Pareto e Caixa de Edgeworth'
      }
    ],
    simuladorRecomendadoId: 'edgeworth',
    leituraRecomendadaDrive: {
      obra: 'Teoria das Finanças Públicas',
      autor: 'João R. Sanson',
      capitulo: 'Unidade 1 (O Setor Público na Economia e Critérios de Eficiência)'
    }
  },
  {
    id: 'CASO-U1-04',
    unidadeNumero: 1,
    numeroNaUnidade: 4,
    titulo: 'O Debate entre Liberalismo Clássico e Keynesianismo na Crise Sanitária',
    subtitulo: 'Intervenção Estatal na Saúde Pública, Custo de Oportunidade e o Pensamento de Buchanan',
    ambito: 'Internacional/Comparado',
    contextoEconomico: 'Durante a crise pandêmica global e o subsequente choque de oferta nas cadeias globais de suprimentos, governos de economias avançadas e emergentes adotaram pacotes de estímulos fiscais emergenciais (auxílios emergenciais, subsídios a empresas e compras estatais centralizadas de vacinas). Economistas liberais alertaram para o risco de endividamento descontrolado e expansão irrevogável do tamanho do Estado (efeito catraca de Peacock-Wiseman).',
    dilemaFiscal: 'O Estado deve retrair sua atuação tão logo a emergência passe ou manter permanentemente maior presença na provisão de redes de proteção social?',
    teoriaAplicada: {
      conceito: 'Teoria do Custo de Oportunidade de Buchanan e Efeito Catraca de Peacock & Wiseman',
      autoresChave: 'James M. Buchanan (1993); Alan Peacock e Jack Wiseman (1961); John M. Keynes (1936)',
      mecanismo: 'Em crises, o limiar de tolerância da sociedade à tributação e ao gasto sobe. Após o choque, os gastos públicos raramente retornam ao patamar inicial devido à consolidação de grupos de pressão e direitos adquiridos (efeito deslocamento).'
    },
    dadosCenarios: [
      { indicador: 'Gasto Público Federal / PIB no Brasil (2020)', valor: 'Salto de 19% para 26% do PIB', interpretacao: 'Maior expansão fiscal emergencial da história recente.' },
      { indicador: 'Déficit Primário Consolidado', valor: 'R$ 743 bilhões (9,8% do PIB)', interpretacao: 'Absorvido pelo endividamento soberano temporário.' }
    ],
    perguntasFixacao: [
      {
        id: 'P-U1-04-1',
        pergunta: 'Em "Custo e Escolha" (1993), James Buchanan argumenta que o custo econômico relevante para a tomada de decisão pública é:',
        opcoes: [
          { id: 'A', texto: 'O registro contábil explícito das despesas financeiras empenhadas pelo Tesouro.', explicacao: 'Incorreto. Custos contábeis passados não orientam a teoria da escolha.' },
          { id: 'B', texto: 'Subjetivo, representando o valor da melhor alternativa rejeitada pelo tomador de decisão no momento da escolha.', explicacao: 'Correto! Buchanan enfatiza que o verdadeiro custo é a oportunidade preterida na margem pelo decisor.' },
          { id: 'C', texto: 'Sempre igual a zero quando os recursos são provenientes de emissão de moeda soberana.', explicacao: 'Incorreto. A inflação e a realocação forçada de recursos representam custos reais.' },
          { id: 'D', texto: 'Idêntico ao preço de mercado cotado na Bolsa de Mercadorias e Futuros.', explicacao: 'Incorreto. Buchanan rejeita a redução do custo de escolha a preços objetivos de mercado.' }
        ],
        respostaCorreta: 'B',
        conceitoChave: 'Custo Subjetivo de Buchanan'
      }
    ],
    simuladorRecomendadoId: 'musgrave',
    leituraRecomendadaDrive: {
      obra: 'Custo e Escolha: Uma Indagação em Teoria Econômica',
      autor: 'James M. Buchanan',
      capitulo: 'Capítulo 3 e Capítulo 6'
    }
  },
  {
    id: 'CASO-U1-05',
    unidadeNumero: 1,
    numeroNaUnidade: 5,
    titulo: 'A Fronteira de Possibilidades de Utilidade e o "Ponto de Bliss" de Bergson-Samuelson',
    subtitulo: 'Trade-off entre Eficiência Produtiva e Bem-Estar Coletivo em Decisões Orçamentárias',
    ambito: 'Federal',
    contextoEconomico: 'O Ministério do Planejamento e Orçamento do Brasil precisa definir o teto de gastos discricionários entre políticas públicas com objetivos distintos: fomento à pesquisa científica e inovação (alto retorno de longo prazo, mas benefício difuso) versus subsídios diretos ao transporte coletivo urbano (alívio imediato no orçamento das famílias da periferia). A economia atua próxima da sua fronteira de possibilidades de produção.',
    dilemaFiscal: 'Como selecionar uma alocação específica na Fronteira de Possibilidades de Utilidade sem impor juízos de valor ditatoriais?',
    teoriaAplicada: {
      conceito: 'Função de Bem-Estar Social de Bergson-Samuelson e Tangência de Bliss',
      autoresChave: 'Abram Bergson (1938); Paul Samuelson (1947); Kenneth Arrow (1951)',
      mecanismo: 'A Fronteira de Utilidade delimita todos os equilíbrios ótimos de Pareto. Apenas com a introdução explícita de uma Função de Bem-Estar Social (SWF) é possível encontrar o "Ponto de Bliss" (tangência entre a fronteira e a mais alta curva de indiferença social).'
    },
    dadosCenarios: [
      { indicador: 'Trade-off Orçamentário Discricionário', valor: 'R$ 25 bilhões', interpretacao: 'Volume limitado que exige escolha explícita entre perfis distributivos.' },
      { indicador: 'Ganho Marginal da Inovação', valor: 'Multiplicador de 2,8 em 10 anos', interpretacao: 'Impacta a produtividade total dos fatores (PTF).' },
      { indicador: 'Ganho Imediato do Transporte Público', valor: 'Redução de 12% no custo de vida dos mais pobres', interpretacao: 'Impacto direto na função de bem-estar rawlsiana.' }
    ],
    perguntasFixacao: [
      {
        id: 'P-U1-05-1',
        pergunta: 'O Segundo Teorema Fundamental do Bem-Estar estabelece que qualquer alocação ótima de Pareto sobre a Fronteira de Utilidades pode ser alcançada como equilíbrio de mercado competitivo, desde que:',
        opcoes: [
          { id: 'A', texto: 'O governo controle centralmente todos os preços dos bens de consumo na economia.', explicacao: 'Incorreto. O 2º Teorema exige mecanismo de preços livres.' },
          { id: 'B', texto: 'Haja uma redistribuição prévia de dotações iniciais de riqueza por meio de transferências de soma fixa (lump-sum taxes).', explicacao: 'Correto! Com dotações iniciais adequadas e tributos não-distorcivos de soma fixa, o mecanismo de mercado atinge o ponto de Pareto desejado.' },
          { id: 'C', texto: 'A taxa de inflação seja mantida estritamente em zero por prazo indeterminado.', explicacao: 'Incorreto. O teorema é de natureza microeconômica real.' },
          { id: 'D', texto: 'Todos os bens da economia sejam bens públicos puros não-rivais e não-excludentes.', explicacao: 'Incorreto. Bens públicos puros quebram o 1º e 2º Teoremas (falha de mercado).' }
        ],
        respostaCorreta: 'B',
        conceitoChave: 'Segundo Teorema do Bem-Estar'
      }
    ],
    simuladorRecomendadoId: 'welfare_frontier',
    leituraRecomendadaDrive: {
      obra: 'La Economía del Sector Público',
      autor: 'Joseph E. Stiglitz e Jay K. Rosengard',
      capitulo: 'Capítulo 3 e 4 (Eficiencia del Mercado y Bienestar)'
    }
  }
];
