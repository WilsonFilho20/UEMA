import { EstudoDeCaso } from '../types';

export const ESTUDOS_CASO_UNIDADE_4: EstudoDeCaso[] = [
  {
    id: 'CASO-U4-01',
    unidadeNumero: 4,
    numeroNaUnidade: 1,
    titulo: 'Incidência Econômica vs. Jurídica do ICMS dos Combustíveis no Maranhão',
    subtitulo: 'Elasticidade-Preço Relativa da Demanda e da Oferta e Repasse da Carga aos Consumidores',
    ambito: 'Estadual (Maranhão)',
    contextoEconomico: 'A legislação tributária estadual maranhense define os postos de combustíveis e as refinarias/distribuidoras como contribuintes de direito (sujeitos passivos da obrigação jurídica tributária do ICMS sobre a gasolina e o diesel). No entanto, motoristas e transportadores de carga observam reajustes imediatos nas bombas sempre que ocorrem alterações nas alíquotas ad rem ou no valor de pauta fiscal.',
    dilemaFiscal: 'Quem realmente suporta o ônus econômico final do tributo (incidência de fato): as distribuidoras oligopolizadas ou os consumidores de baixa elasticidade?',
    teoriaAplicada: {
      conceito: 'Teoria da Incidência Tributária e Elasticidades Relativas',
      autoresChave: 'Joseph Stiglitz (2016); David Ricardo (1817); Fabio Giambiagi (2011)',
      mecanismo: 'A incidência econômica depende exclusivamente da razão das elasticidades de demanda e oferta (Es / Ed). Como a demanda por combustíveis é rígida e inelástica (|Ed| < 1) devido à ausência de substitutos perfeitos para o transporte urbano e escoamento da safra maranhense, a maior fração do imposto é repassada para frente (consumidor final).'
    },
    dadosCenarios: [
      { indicador: 'Elasticidade-Preço da Demanda por Gasolina (|Ed|)', valor: '0,28 (Inelástica)', interpretacao: 'Pouca reação na quantidade consumida frente à alta do preço.' },
      { indicador: 'Elasticidade-Preço da Oferta (Es)', valor: '1,45 (Elástica)', interpretacao: 'Capacidade de redirecionar fluxos de venda ou margens.' },
      { indicador: 'Fração do ICMS Suportada pelo Consumidor (Es / (Es + |Ed|))', valor: '83,8%', interpretacao: 'O contribuinte de fato arca com mais de 8/10 do imposto.' }
    ],
    perguntasFixacao: [
      {
        id: 'P-U4-01-1',
        pergunta: 'Em conformidade com a teoria microeconômica da tributação, se o governo estadual alterar a lei determinando que o imposto passe a ser recolhido pelo consumidor no caixa em vez do dono do posto:',
        opcoes: [
          { id: 'A', texto: 'A carga tributária final recairá integralmente sobre o posto, aliviando o motorista.', explicacao: 'Incorreto. A incidência econômica independe do sujeito passivo legal.' },
          { id: 'B', texto: 'O preço de equilíbrio final e a distribuição da carga econômica entre comprador e vendedor permanecerão exatamente os mesmos, pois a incidência independe de quem a lei designa.', explicacao: 'Correto! O Teorema da Invariância da Incidência Tributária prova que a repartição do ônus depende das elasticidades, e não do lado do mercado sobre o qual incide a obrigação legal.' },
          { id: 'C', texto: 'A arrecadação do Estado cairá a zero imediatamente.', explicacao: 'Incorreto. O equilíbrio de mercado continuará arrecadando o montante.' },
          { id: 'D', texto: 'A elasticidade da demanda se tornará automaticamente infinita.', explicacao: 'Incorreto. As preferências dos consumidores não mudam com a técnica de cobrança.' }
        ],
        respostaCorreta: 'B',
        conceitoChave: 'Invariância da Incidência Tributária'
      }
    ],
    simuladorRecomendadoId: 'tax_incidence',
    leituraRecomendadaDrive: {
      obra: 'La Economía del Sector Público',
      autor: 'Joseph E. Stiglitz e Jay K. Rosengard',
      capitulo: 'Capítulo 17 (La Incidencia de los Impuestos)'
    }
  },
  {
    id: 'CASO-U4-02',
    unidadeNumero: 4,
    numeroNaUnidade: 2,
    titulo: 'O Triângulo de Harberger e o Peso Morto da Tributação sobre o Consumo',
    subtitulo: 'Distorção de Preços Relativos, Efeito Quadrático da Alíquota e Perda de Eficiência',
    ambito: 'Federal',
    contextoEconomico: 'A cumulatividade histórica do PIS/Cofins e do IPI no Brasil produziu distorções profundas nos preços relativos, gerando o chamado "triângulo de Harberger" de peso morto. Como o peso morto da tributação cresce com o quadrado da alíquota tributária (DW proporcional a t²), a dispersão de alíquotas setoriais elevadas em telecomunicações e energia elétrica gerou perdas colossais de bem-estar.',
    dilemaFiscal: 'Por que uma alíquota moderada e uniforme sobre ampla base de consumo gera infinitamente menos peso morto do que múltiplas alíquotas seletivas elevadas?',
    teoriaAplicada: {
      conceito: 'Triângulo de Harberger e Perda de Eficiência Alocativa (DW = 0,5 * η * t² * P0 * Q0)',
      autoresChave: 'Arnold Harberger (1964); Joseph Stiglitz (2016); Fabio Giambiagi (2011)',
      mecanismo: 'O tributo cria uma cunha fiscal entre o preço pago pelo comprador e o recebido pelo vendedor, impedindo transações benéficas de ocorrerem. Como o peso morto é função quadrática de t (t²), dobrar a alíquota quadruplica a perda líquida da sociedade.'
    },
    dadosCenarios: [
      { indicador: 'Alíquota Vigente de 30% em Energia', valor: 'Peso Morto = 0,5 * 0,5 * (0,30)² * Base = 2,25% da base', interpretacao: 'Distorção multiplicada pelo expoente quadrático.' },
      { indicador: 'Alíquota Uniforme Neutra de 15%', valor: 'Peso Morto = 0,5 * 0,5 * (0,15)² * Base = 0,56% da base', interpretacao: 'Redução de 75% no peso morto total da economia.' },
      { indicador: 'Perda Total de Eficiência Sistêmica Estimada', valor: '1,8% do PIB brasileiro ao ano', interpretacao: 'Riqueza destruída que nem os contribuintes nem o governo aproveitam.' }
    ],
    perguntasFixacao: [
      {
        id: 'P-U4-02-1',
        pergunta: 'Com base na fórmula microeconômica do peso morto de Harberger, se o governo decide triplicar a alíquota do imposto seletivo sobre determinado setor da economia, a perda líquida de bem-estar social (peso morto):',
        opcoes: [
          { id: 'A', texto: 'Aumentará na mesma proporção de três vezes.', explicacao: 'Incorreto. O crescimento do peso morto não é linear, mas exponencial de segunda ordem.' },
          { id: 'B', texto: 'Aumentará em nove vezes (fator de 3² = 9), mantidas constantes as elasticidades.', explicacao: 'Correto! O peso morto é estritamente proporcional ao quadrado da alíquota (t²). Se t triplica, o peso morto se multiplica por 9.' },
          { id: 'C', texto: 'Permanecerá invariável se a receita tributária for integralmente gasta em saúde.', explicacao: 'Incorreto. O peso morto decorre da distorção na margem das decisões de mercado.' },
          { id: 'D', texto: 'Cairá pela metade devido à escala das receitas arrecadadas.', explicacao: 'Incorreto. Mais imposto com distorção gera mais peso morto.' }
        ],
        respostaCorreta: 'B',
        conceitoChave: 'Efeito Quadrático do Peso Morto'
      }
    ],
    simuladorRecomendadoId: 'harberger',
    leituraRecomendadaDrive: {
      obra: 'La Economía del Sector Público',
      autor: 'Joseph E. Stiglitz e Jay K. Rosengard',
      capitulo: 'Capítulo 18 (Los Impuestos y la Eficiencia Económica)'
    }
  },
  {
    id: 'CASO-U4-03',
    unidadeNumero: 4,
    numeroNaUnidade: 3,
    titulo: 'A Regra da Elasticidade Inversa de Ramsey e o Conflito com a Equidade da Cesta Básica',
    subtitulo: 'Tributação Ótima de Mercadorias, Eficiência Alocativa e Justiça Social',
    ambito: 'Federal',
    contextoEconomico: 'A teoria da tributação ótima de Frank Ramsey (1927) prescreve que, para minimizar a perda total de eficiência alocativa da sociedade ao arrecadar uma meta de receita, o Estado deve tributar com alíquotas mais altas os bens com menor elasticidade-preço da demanda (regra da elasticidade inversa: t_i proporcional a 1/|Ed_i|). Aplicada cegamente, essa regra ditaria cobrar tributos altíssimos sobre alimentos básicos (arroz, feijão, farinha) e remédios, por serem itens de primeira necessidade inelásticos.',
    dilemaFiscal: 'Como conciliar a recomendação de eficiência de Ramsey com o princípio da equidade vertical e o combate à fome das famílias mais pobres?',
    teoriaAplicada: {
      conceito: 'Regra de Ramsey de Tributação Ótima (1927) e Trade-off Eficiência vs. Equidade',
      autoresChave: 'Frank P. Ramsey (1927); Joseph Stiglitz (2016); Kenneth Arrow et al. (2000)',
      mecanismo: 'Ramsey assumiu um único consumidor representativo. Quando se introduzem múltiplos consumidores heterogêneos de diferentes rendas (visão de Diamond-Mirrlees), tributar bens inelásticos que comprometem 80% da renda dos pobres é altamente regressivo, exigindo desonerações ou mecanismos compensatórios (cashback tributário).'
    },
    dadosCenarios: [
      { indicador: 'Elasticidade-Preço de Alimentos Básicos', valor: '0,20 (Altamente inelástica)', interpretacao: 'Regra de Ramsey pura recomendaria alíquota alta para poupar eficiência.' },
      { indicador: 'Comprometimento da Renda Familiar Pobre', valor: '35% em alimentos', interpretacao: 'Geraria regressividade severa e violação da dignidade humana.' },
      { indicador: 'Solução da Reforma Tributária (EC 132/2023)', valor: 'Cesta Básica Nacional com Alíquota Zero + Cashback', interpretacao: 'Compatibiliza neutralidade geral com equidade vertical focalizada.' }
    ],
    perguntasFixacao: [
      {
        id: 'P-U4-03-1',
        pergunta: 'A principal crítica social e distributiva formulada contra a aplicação estrita da Regra de Ramsey de tributação ótima de mercadorias no Brasil reside no fato de que:',
        opcoes: [
          { id: 'A', texto: 'A regra penalizaria desproporcionalmente as famílias de baixa renda, que gastam a maior fração de seus orçamentos em bens inelásticos (alimentos e medicamentos).', explicacao: 'Correto! Tributar inversamente à elasticidade atinge exatamente os bens essenciais dos quais os mais vulneráveis não podem abrir mão.' },
          { id: 'B', texto: 'A regra viola o Teorema de Coase por não considerar custos de transação nulos.', explicacao: 'Incorreto. Ramsey trata de tributos sobre bens de consumo, não de externalidades.' },
          { id: 'C', texto: 'A regra impede o Banco Central de fixar a taxa de juros básica da moeda.', explicacao: 'Incorreto. A política monetária não é afetada pela regra de Ramsey de bens.' },
          { id: 'D', texto: 'A regra obriga todas as alíquotas da economia a serem idênticas a zero.', explicacao: 'Incorreto. Ramsey deriva alíquotas positivas para financiar o governo.' }
        ],
        respostaCorreta: 'A',
        conceitoChave: 'Regra da Elasticidade Inversa de Ramsey'
      }
    ],
    simuladorRecomendadoId: 'ramsey',
    leituraRecomendadaDrive: {
      obra: 'La Economía del Sector Público',
      autor: 'Joseph E. Stiglitz e Jay K. Rosengard',
      capitulo: 'Capítulo 18 (Tributación Óptima)'
    }
  },
  {
    id: 'CASO-U4-04',
    unidadeNumero: 4,
    numeroNaUnidade: 4,
    titulo: 'A Curva de Laffer e a Zona Proibitiva na Tributação de Empresas no Brasil',
    subtitulo: 'Alíquota Maximizadora de Receita, Evasão Fiscal, Informalidade e a Proposição de Arthur Laffer',
    ambito: 'Federal',
    contextoEconomico: 'A carga tributária nominal combinada sobre o lucro corporativo no Brasil (IRPJ + CSLL) atinge 34%, uma das maiores entre os países do G20 e da OCDE. Aliada a um sistema tributário complexo e de alto custo de conformidade (custos de compliance), empresários apontam desestímulo ao investimento produtivo formal, crescimento da elisão fiscal agressiva e fuga de capitais para jurisdições com alíquotas moderadas.',
    dilemaFiscal: 'O Brasil se encontra no lado normal da Curva de Laffer (onde o aumento da alíquota ainda eleva a receita) ou já penetrou na "zona proibitiva" (onde alíquotas adicionais destroem a base e reduzem a arrecadação)?',
    teoriaAplicada: {
      conceito: 'Curva de Laffer e Alíquota Maximizadora de Receita Fiscal (t*)',
      autoresChave: 'Arthur Laffer (1974); Fabio Giambiagi (2011); Joseph Stiglitz (2016)',
      mecanismo: 'A receita tributária é R(t) = t * B(t). Quando a alíquota t sobe, ocorrem dois efeitos opostos: o efeito aritmético/arrecadatório positivo e o efeito econômico negativo de erosão da base B(t) por informalidade, desestímulo ao trabalho e evasão. No ponto onde a elasticidade da base tributária em relação à alíquota ultrapassa a unidade, ingressa-se na zona proibitiva.'
    },
    dadosCenarios: [
      { indicador: 'Carga Tributária Bruta / PIB no Brasil', valor: '33,7% do PIB', interpretacao: 'Patamar comparável a países desenvolvidos com serviços públicos em nível intermediário.' },
      { indicador: 'Economia Informal Estimada no Maranhão', valor: 'Superior a 40% da força de trabalho', interpretacao: 'Válvula de escape imediata diante de alíquotas percebidas como confiscatórias.' },
      { indicador: 'Alíquota Maximizadora Média Teórica Estimada (t*)', valor: '35% a 38%', interpretacao: 'Próxima do limiar superior para a tributação da renda corporativa.' }
    ],
    perguntasFixacao: [
      {
        id: 'P-U4-04-1',
        pergunta: 'Em relação à Curva de Laffer, define-se a "Zona Proibitiva" como a faixa de alíquotas tributárias em que:',
        opcoes: [
          { id: 'A', texto: 'A alíquota é igual a zero e a arrecadação do governo é nula.', explicacao: 'Incorreto. A alíquota zero é a origem da curva, não a zona proibitiva.' },
          { id: 'B', texto: 'O aumento adicional da alíquota reduz a receita tributária total do governo, devido à severa contração na base tributável decorrente de desestímulo à produção e evasão.', explicacao: 'Correto! Na zona proibitiva, a derivada da receita em relação à alíquota é negativa (dR/dt < 0). Uma redução da alíquota aumentaria a arrecadação.' },
          { id: 'C', texto: 'O imposto incide exclusivamente sobre mercadorias perfeitamente inelásticas.', explicacao: 'Incorreto. Isso se refere à regra de Ramsey.' },
          { id: 'D', texto: 'O orçamento público atinge o superávit primário permanente de 5% do PIB.', explicacao: 'Incorreto. A zona proibitiva gera frustração de receitas fiscais.' }
        ],
        respostaCorreta: 'B',
        conceitoChave: 'Zona Proibitiva de Laffer'
      }
    ],
    simuladorRecomendadoId: 'laffer',
    leituraRecomendadaDrive: {
      obra: 'Finanças Públicas: Teoria e Prática no Brasil',
      autor: 'Fabio Giambiagi e Ana Cláudia Além',
      capitulo: 'Capítulo 10 (Estrutura Tributária e Efeitos Econômicos)'
    }
  },
  {
    id: 'CASO-U4-05',
    unidadeNumero: 4,
    numeroNaUnidade: 5,
    titulo: 'A Reforma Tributária do Consumo (EC 132/2023): O IVA Dual (IBS e CBS) e a Transição Federativa',
    subtitulo: 'Tributação no Destino, Não-Cumulatividade Plena, Fim da Guerra Fiscal e o Fundo de Desenvolvimento Regional',
    ambito: 'Federal',
    contextoEconomico: 'A aprovação da Emenda Constitucional nº 132/2023 remodelou integralmente a tributação do consumo no Brasil, substituindo cinco tributos arcaicos e cumulativos (PIS, Cofins, IPI, ICMS estadual e ISS municipal) por um IVA Dual de padrão internacional: a CBS (federal) e o IBS (estados e municípios). A arrecadação migra do princípio da origem para o princípio do destino, e é criado o Fundo Nacional de Desenvolvimento Regional (FNDR) com R$ 60 bilhões/ano.',
    dilemaFiscal: 'Como o Estado do Maranhão (tradicional importador líquido de mercadorias industrializadas e exportador de commodities sem incidência tributária) será impactado pela tributação exclusiva no destino?',
    teoriaAplicada: {
      conceito: 'Tributação pelo Princípio do Destino vs. Origem e IVA Não-Cumulativo de Base Ampla',
      autoresChave: 'Joseph Stiglitz (2016); Fabio Giambiagi (2011); Bernard Appy (2023)',
      mecanismo: 'Sob o princípio da origem, o tributo ficava onde a fábrica se localizava (estados ricos do Centro-Sul). No princípio do destino, a receita pertence ao Estado onde o bem é efetivamente consumido. Como o Maranhão consome mais do que industrializa, a migração do ICMS para o IBS no destino gera ganho estrutural permanente de receita fiscal para o Tesouro Maranhense.'
    },
    dadosCenarios: [
      { indicador: 'Saldo Líquido Estimado para o Maranhão no Destino', valor: '+R$ 2,8 bilhões/ano', interpretacao: 'Ganho expressivo por ser estado predominantemente consumidor.' },
      { indicador: 'Participação do Maranhão no FNDR', valor: 'Aprox. 6,8% do Fundo', interpretacao: 'Compensação financeira para investimentos em infraestrutura e atração industrial.' },
      { indicador: 'Período de Transição Gradual das Receitas', valor: '50 anos (2029 a 2078)', interpretacao: 'Amortecedor federativo para evitar perdas abruptas aos estados de origem.' }
    ],
    perguntasFixacao: [
      {
        id: 'P-U4-05-1',
        pergunta: 'A principal vantagem econômica da transição para a cobrança do IVA Dual (IBS e CBS) sob o Princípio do Destino, instituída pela Reforma Tributária (EC 132/2023), consiste em:',
        opcoes: [
          { id: 'A', texto: 'Incentivar os estados a realizarem guerra fiscal predatória concedendo isenções unilaterais de ICMS.', explicacao: 'Incorreto. A tributação no destino extingue a guerra fiscal de origem.' },
          { id: 'B', texto: 'Garantir a neutralidade concorrencial entre regiões produtoras e destinar a receita fiscal ao local onde os bens e serviços são consumidos, beneficiando estados importadores líquidos como o Maranhão.', explicacao: 'Correto! O princípio do destino elimina distorções de localização geográfica de fábricas e aloca o imposto onde a população efetivamente reside e demanda serviços públicos.' },
          { id: 'C', texto: 'Tornar os tributos cumulativos em cascata sobre todas as etapas da cadeia.', explicacao: 'Incorreto. O IVA Dual tem não-cumulatividade plena (crédito financeiro total).' },
          { id: 'D', texto: 'Extinguir o Imposto de Renda das pessoas físicas e jurídicas.', explicacao: 'Incorreto. A EC 132 reformou apenas os tributos indiretos sobre o consumo.' }
        ],
        respostaCorreta: 'B',
        conceitoChave: 'Princípio do Destino no IVA'
      }
    ],
    simuladorRecomendadoId: 'reforma_tributaria',
    leituraRecomendadaDrive: {
      obra: 'Finanças Públicas: Teoria e Prática no Brasil',
      autor: 'Fabio Giambiagi e Ana Cláudia Além',
      capitulo: 'Capítulo 18 (Reformas Tributárias e Modernização Fiscal)'
    }
  }
];
