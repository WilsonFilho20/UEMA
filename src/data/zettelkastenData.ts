import { ZettelkastenCard } from '../types';

export const ZETTELKASTEN_CARDS: ZettelkastenCard[] = [
  // =========================================================================
  // AULA 01: O Papel do Estado e a Evolução do Pensamento Econômico
  // =========================================================================
  {
    id: 'Z-01.01',
    aulaNumero: 1,
    conceito: 'Finanças Públicas Neutras vs. Funcionais',
    teseCentral: 'A doutrina clássica defende o orçamento equilibrado e a não-intervenção; a ótica moderna utiliza a política fiscal como instrumento ativo de pleno emprego e bem-estar.',
    fundamentacaoTeorica: 'Adam Smith e os economistas clássicos postulavam que qualquer tributação distorce a alocação natural da "mão invisível" (neutralidade fiscal). Com a Grande Depressão e Keynes (1936), consolidou-se a visão das Finanças Funcionais (Abba Lerner), onde déficits ou superávits orçamentários são ajustados deliberadamente para manter a demanda agregada no nível de pleno emprego, sem a rigidez do dogma do equilíbrio contábil anual.',
    aplicabilidadePratica: 'No Brasil, o debate entre a austeridade fiscal rígida (Novo Arcabouço Fiscal / LRF) e o uso do investimento público em infraestrutura (como no Maranhão para conexões logísticas do Porto do Itaqui) reflete essa tensão entre neutralidade orçamentária e política fiscal anticíclica.',
    equacaoOuRegra: 'Saldo\\ Or\\c{c}ament\\acute{a}rio = f(Ciclo\\ Econ\\hat{o}mico) \\implies G > T\\ em\\ recess\\~{a}o',
    conexoes: ['Z-01.02', 'Z-02.01', 'Z-09.01'],
    referenciaBibliografica: 'Giambiagi & Além (2011, Cap. 1); Lerner (1943, Functional Finance)',
    tags: ['#Fundamentos', '#PoliticaFiscal', '#HistoriaDoPensamento', '#Keynesianismo']
  },
  {
    id: 'Z-01.02',
    aulaNumero: 1,
    conceito: 'Dilema entre Eficiência Alocativa e Equidade Distributiva',
    teseCentral: 'Políticas públicas frequentemente enfrentam o trade-off de Okun ("o balde furado"): transferências que ampliam a equidade social podem gerar custos de ineficiência e desincentivos ao trabalho e capital.',
    fundamentacaoTeorica: 'Arthur Okun (1975) demonstrou que a redistribuição de renda impõe custos administrativos, desincentivos fiscais e peso morto tributário. O Estado deve sopesar a taxa marginal de substituição social entre um aumento na igualdade de renda e a perda líquida no produto agregado gerada pelas distorções tributárias.',
    aplicabilidadePratica: 'No desenho de programas sociais como o Bolsa Família e programas estaduais maranhenses de transferência de renda, os economistas públicos calibram a taxa de descontinuidade do benefício para evitar a "armadilha da pobreza" (desincentivo à formalização do trabalho).',
    equacaoOuRegra: 'W = W(U_1, U_2, \\dots, U_n) \\quad \\text{sob} \\quad TMT_{efici\\hat{e}ncia, equidade}',
    conexoes: ['Z-01.01', 'Z-02.03', 'Z-06.02'],
    referenciaBibliografica: 'Stiglitz & Rosengard (2016, Cap. 3); Okun (1975, Equality and Efficiency)',
    tags: ['#Equidade', '#Eficiencia', '#BemEstarSocial', '#TradeOff']
  },
  {
    id: 'Z-01.03',
    aulaNumero: 1,
    conceito: 'Constitucionalismo Fiscal e Limites do Estado (Buchanan)',
    teseCentral: 'O Estado não é um planejador benevolente benevolente ilimitado; regras constitucionais prévias são indispensáveis para restringir o poder coercitivo de tributar e gastar.',
    fundamentacaoTeorica: 'James Buchanan propõe que, no estágio pré-constitucional, os cidadãos concordem sob um "véu da incerteza" com regras fiscais estritas (quórum qualificado para tributos, tetos de endividamento). Sem amarras constitucionais, grupos de pressão e coalizões majoritárias expropriam minorias e expandem o Leviatã fiscal indefinidamente.',
    aplicabilidadePratica: 'O princípio da anterioridade tributária (Art. 150, III, b da CF/88) e a Lei de Responsabilidade Fiscal (LC 101/2000) constituem aplicações diretas do constitucionalismo fiscal buchaniano no ordenamento jurídico-financeiro brasileiro.',
    equacaoOuRegra: 'Custo\\ Coletivo\\ M\\acute{i}nimo = \\min(Custos\\ Externos + Custos\\ de\\ Decis\\~{a}o)',
    conexoes: ['Z-09.01', 'Z-09.02', 'Z-10.03'],
    referenciaBibliografica: 'Buchanan (1993, Os Limites da Liberdade); Buchanan & Tullock (1962, Cap. 6)',
    tags: ['#EscolhaPublica', '#ConstitucionalismoFiscal', '#RegrasFiscais']
  },

  // =========================================================================
  // AULA 02: As Funções Clássicas do Estado e Eficiência de Pareto
  // =========================================================================
  {
    id: 'Z-02.01',
    aulaNumero: 2,
    conceito: 'A Tríade Musgraviana das Funções do Estado',
    teseCentral: 'O setor público atua por meio de três funções econômicas distintas: Alocativa (bens públicos e falhas), Distributiva (equidade e transferências) e Estabilizadora (demanda, inflação e emprego).',
    fundamentacaoTeorica: 'Richard Musgrave (1959) sistematizou as justificativas da intervenção pública. A função alocativa corrige a subprovisão de bens não-rivais e não-excludentes; a função distributiva corrige a dispersão moralmente inaceitável de riqueza inicial de mercado; e a estabilizadora ajusta as variáveis macroeconômicas contra flutuações cíclicas.',
    aplicabilidadePratica: 'No orçamento do Estado do Maranhão: os investimentos em rodovias estaduais e iluminação correspondem à função alocativa; restaurantes populares e o cartão gás à distributiva; e incentivos anticíclicos a polos produtivos locais à estabilizadora.',
    equacaoOuRegra: 'Or\\c{c}amento = F_{Alocativa} + F_{Distributiva} + F_{Estabilizadora}',
    conexoes: ['Z-01.01', 'Z-02.02', 'Z-05.01'],
    referenciaBibliografica: 'Musgrave (1959, The Theory of Public Finance, Cap. 1); Sanson (2011, Unidade 1)',
    tags: ['#Musgrave', '#FuncaoAlocativa', '#FuncaoDistributiva', '#FuncaoEstabilizadora']
  },
  {
    id: 'Z-02.02',
    aulaNumero: 2,
    conceito: 'Eficiência de Pareto e Curva de Contrato na Caixa de Edgeworth',
    teseCentral: 'Uma alocação é Pareto-eficiente quando é impossível melhorar o bem-estar de um indivíduo sem reduzir o bem-estar de outro. Ocorre na tangência das curvas de indiferença.',
    fundamentacaoTeorica: 'Na Caixa de Edgeworth com dois agentes (A e B) e dois bens (X e Y), o equilíbrio de trocas ocorre onde as Taxas Marginais de Substituição se igualam: TMS_A = TMS_B = Px/Py. O conjunto de todos os pontos de tangência forma a Curva de Contrato, cuja projeção no espaço de utilidades gera a Fronteira de Possibilidades de Utilidade (FPU).',
    aplicabilidadePratica: 'Serve de base analítica para leilões de bens públicos e alocação de recursos escassos em concessões reguladas pelo poder público, demonstrando que interferências arbitrárias de preços criam perdas de eficiência realizáveis.',
    equacaoOuRegra: 'TMS_{xy}^A = TMS_{xy}^B = \\frac{P_x}{P_y}',
    conexoes: ['Z-02.03', 'Z-06.01', 'Z-08.01'],
    referenciaBibliografica: 'Stiglitz & Rosengard (2016, Cap. 3); Varian (Microeconomia Intermediária)',
    tags: ['#Pareto', '#Edgeworth', '#EquilibrioGeral', '#Microeconomia']
  },
  {
    id: 'Z-02.03',
    aulaNumero: 2,
    conceito: 'Primeiro e Segundo Teoremas Fundamentais do Bem-Estar',
    teseCentral: 'O 1º Teorema garante que mercados competitivos geram alocações Pareto-eficientes; o 2º Teorema demonstra que qualquer ótimo social pode ser alcançado via transferências lump-sum sem distorcer o sistema de preços.',
    fundamentacaoTeorica: 'O 1º Teorema requer ausência de externalidades, informação perfeita e mercados completos. O 2º Teorema separa a questão da eficiência da questão da distribuição: o governo pode redistribuir dotações iniciais através de transferências não-distorcivas (lump-sum) e permitir que as forças concorrenciais encontrem o equilíbrio eficiente.',
    aplicabilidadePratica: 'Justifica por que economistas preferem transferências diretas em dinheiro (renda básica cidadã ou tributação sobre patrimônio fixo) em vez de controle de preços (como tabelamento de combustíveis ou alimentos), que destrói a eficiência do 1º Teorema.',
    equacaoOuRegra: 'Equil\\acute{i}brio\\ Walrasiano \\implies \\text{\\O}timo\\ de\\ Pareto; \\quad \\forall\\ \\text{\\O}timo, \\exists\\ T_{lump-sum}',
    conexoes: ['Z-02.02', 'Z-06.01', 'Z-07.01'],
    referenciaBibliografica: 'Stiglitz & Rosengard (2016, Cap. 3); Arrow (1951, An Extension of the Basic Theorems)',
    tags: ['#TeoremasDoBemEstar', '#LumpSum', '#Eficiencia', '#PrecosRelativos']
  },

  // =========================================================================
  // AULA 03: Teorema de Coase e Custos de Transação
  // =========================================================================
  {
    id: 'Z-03.01',
    aulaNumero: 3,
    conceito: 'Teorema de Coase e Negociação Privada de Externalidades',
    teseCentral: 'Na ausência de custos de transação e com direitos de propriedade bem delimitados, a negociação entre as partes conduzirá à alocação eficiente, independentemente da atribuição jurídica inicial do direito.',
    fundamentacaoTeorica: 'Ronald Coase (1960) provou que o dano é de natureza recíproca (evitar o dano ao poluidor também lhe causa prejuízo). Se a barganha não tiver custo, o gerador da externalidade e a vítima negociarão compensações até o ponto onde o benefício marginal iguale o dano marginal. O resultado alocativo é idêntico, mudando apenas a distribuição de renda entre eles.',
    aplicabilidadePratica: 'No agronegócio de grãos no Sul do Maranhão (Balsas), vizinhos de propriedades rurais negociam servidões de passagem e faixas de proteção de mananciais hídricos privadamente quando os custos cartorários e judiciais são baixos.',
    equacaoOuRegra: 'BMg_{Poluidor}(Q^*) = DMg_{V\\acute{i}tima}(Q^*) \\quad \\text{se} \\quad Custos\\ de\\ Transa\\c{c}\\~{a}o = 0',
    conexoes: ['Z-03.02', 'Z-03.03', 'Z-05.02'],
    referenciaBibliografica: 'Coase (1960, The Problem of Social Cost); Arvate & Biderman (2004, Cap. 2)',
    tags: ['#Coase', '#Externalidades', '#DireitosDePropriedade', '#Barganha']
  },
  {
    id: 'Z-03.02',
    aulaNumero: 3,
    conceito: 'Custos de Transação e Falha do Mecanismo Coasiano',
    teseCentral: 'Quando os custos de busca, barganha e monitoramento são elevados, a solução privada de Coase falha, justificando a intervenção regulatória ou tributária estatal.',
    fundamentacaoTeorica: 'Oliver Williamson e Coase demonstraram que à medida que o número de agentes afetados se multiplica (como milhares de cidadãos afetados pela poluição atmosférica de um complexo industrial), surgem comportamentos de carona (free-rider), assimetria de informação e custos de litígio proibitivos, impedindo qualquer acordo voluntário.',
    aplicabilidadePratica: 'No licenciamento ambiental do complexo portuário de São Luís, o elevado número de comunidades pesqueiras e ribeirinhas inviabiliza negociação direta individual, demandando a atuação da SEMA-MA e do Ministério Público como intermediadores institucionais.',
    equacaoOuRegra: 'Se\\ C_{transa\\c{c}\\~{a}o} > Excedente\\ Potencial \\implies Falha\\ de\\ Mercado',
    conexoes: ['Z-03.01', 'Z-04.03', 'Z-05.03'],
    referenciaBibliografica: 'Williamson (1985, The Economic Institutions of Capitalism); Coase (1960)',
    tags: ['#CustosDeTransacao', '#FreeRider', '#Instituicoes', '#FalhasDeMercado']
  },
  {
    id: 'Z-03.03',
    aulaNumero: 3,
    conceito: 'Tributação Pigouviana e Criação de Mercados de Créditos',
    teseCentral: 'Quando Coase não se aplica, o Estado corrige a externalidade negativa impondo um tributo exatamente igual ao Custo Marginal Externo, alinhando custo privado ao custo social.',
    fundamentacaoTeorica: 'Arthur Cecil Pigou propôs que uma taxa por unidade poluída t* = CME(Q*) internaliza o dano. Alternativamente, a criação de mercados de licenças transferíveis (Cap-and-Trade) combina regulação quantitativa estatal com incentivos coasianos de eficiência de mercado.',
    aplicabilidadePratica: 'A Contribuição de Intervenção no Domínio Econômico (CIDE-Combustíveis) e a Taxa de Controle e Fiscalização Ambiental (TCFA-IBAMA) operam sob a lógica pigouviana do princípio do poluidor-pagador no Brasil.',
    equacaoOuRegra: 't^* = CME(Q^*) \\implies CMg_{Privado} + t^* = CMg_{Social}',
    conexoes: ['Z-03.01', 'Z-06.01', 'Z-07.03'],
    referenciaBibliografica: 'Pigou (1920, The Economics of Welfare); Baumol (1972, On Taxation and the Control of Externalities)',
    tags: ['#ImpostoPigouviano', '#PoluidorPagador', '#ExternalidadesNegativas']
  },

  // =========================================================================
  // AULA 04: Monopólios Naturais, Regulação e Cenário de "Second Best"
  // =========================================================================
  {
    id: 'Z-04.01',
    aulaNumero: 4,
    conceito: 'Monopólio Natural e Subaditividade de Custos',
    teseCentral: 'Um monopólio natural existe quando uma única empresa consegue atender toda a demanda de mercado com custos totais inferiores aos de duas ou mais empresas concorrentes.',
    fundamentacaoTeorica: 'Diferente de economias de escala puras, a subaditividade da função de custo (Baumol, Panzar e Willig) é a condição necessária e suficiente para o monopólio natural: C(Q) < ∑ C(q_i). É comum em setores de redes com custos fixos irrecuperáveis colossais (sunk costs) e custos marginais baixos (saneamento, linhas de transmissão, ferrovias).',
    aplicabilidadePratica: 'A rede de abastecimento de água tratada e esgotamento sanitário gerida pela CAEMA no Maranhão constitui clássico monopólio natural: duplicar redes de tubulação subterrânea geraria enorme desperdício de capital para a sociedade.',
    equacaoOuRegra: 'C\\left(\\sum_{i=1}^k q_i\\right) < \\sum_{i=1}^k C(q_i) \\quad \\forall\\ q_i',
    conexoes: ['Z-04.02', 'Z-04.03', 'Z-02.01'],
    referenciaBibliografica: 'Baumol, Panzar & Willig (1982, Contestable Markets); Stiglitz & Rosengard (2016, Cap. 8)',
    tags: ['#MonopolioNatural', '#Subaditividade', '#EconomiasDeEscala', '#Infraestrutura']
  },
  {
    id: 'Z-04.02',
    aulaNumero: 4,
    conceito: 'Dilema de Precificação: Primeiro Melhor (P=CMg) vs. Segundo Melhor (P=CMe)',
    teseCentral: 'Fixar o preço igual ao Custo Marginal gera eficiência alocativa, mas produz déficit operacional crônico em monopólios naturais; a precificação de Custo Médio garante sustentabilidade orçamentária.',
    fundamentacaoTeorica: 'Com custos médios decrescentes, o Custo Marginal situa-se estritamente abaixo do Custo Médio: CMg < CMe. Se o regulador impõe P = CMg, a firma opera com prejuízo unitário (CMe - P > 0) e precisa de subsídios fiscais públicos. A solução de Ramsey-Boiteux ou P = CMe permite lucro econômico nulo, cobrindo os custos totais sem sangria orçamentária do Tesouro.',
    aplicabilidadePratica: 'Metodologia tarifária adotada pelas agências reguladoras no Brasil (ANEEL, ANATEL e agências estaduais de saneamento), que utilizam tarifas de custo do serviço (cost of service) ou tetos de preço (price cap) garantindo retorno justo sobre o capital investido.',
    equacaoOuRegra: 'P = CMg \\implies \\text{Preju\\acute{i}zo} = (CMe - CMg) \\cdot Q; \\quad P = CMe \\implies Lucro\\ Econ\\hat{o}mico = 0',
    conexoes: ['Z-04.01', 'Z-08.01', 'Z-02.03'],
    referenciaBibliografica: 'Stiglitz & Rosengard (2016, Cap. 8); Armstrong, Cowan & Vickers (1994, Regulatory Reform)',
    tags: ['#RegulacaoTarifaria', '#PrimeiroMelhor', '#SegundoMelhor', '#PriceCap']
  },
  {
    id: 'Z-04.03',
    aulaNumero: 4,
    conceito: 'Teoria da Captura Regulatória e Assimetria de Informação',
    teseCentral: 'Agências reguladoras estatais correm o risco permanente de serem "capturadas" pelos interesses organizados das empresas que deveriam fiscalizar, em detrimento dos consumidores dispersos.',
    fundamentacaoTeorica: 'George Stigler (1971) e Jean-Jacques Laffont demonstraram que as firmas reguladas possuem informação privada sobre seus custos reais (seleção adversa e risco moral). Devido à concentração de benefícios para as empresas e dispersão de custos para o público consumidor, as firmas têm fortes incentivos para fazer lobby, pagar pareceres técnicos e influenciar a agência.',
    aplicabilidadePratica: 'No controle de contratos de concessão de rodovias ou transportes metropolitanos no Maranhão, a AGERP (Agência Estadual de Mobilidade Urbana) precisa de governança técnica independente, mandatos fixos para dirigentes e transparência de dados para mitigar o risco de captura regulatória.',
    equacaoOuRegra: '\\max U_{firma} \\implies \\text{Lobby\\ sobre\\ par\\hat{a}metros\\ da\\ ag\\hat{e}ncia}',
    conexoes: ['Z-04.01', 'Z-10.03', 'Z-09.01'],
    referenciaBibliografica: 'Stigler (1971, The Theory of Economic Regulation); Laffont & Tirole (1993, A Theory of Incentives)',
    tags: ['#CapturaRegulatoria', '#Stigler', '#AssimetriaDeInformacao', '#GovernancaPublica']
  },

  // =========================================================================
  // AULA 05: Externalidades e Bens Públicos
  // =========================================================================
  {
    id: 'Z-05.01',
    aulaNumero: 5,
    conceito: 'A Taxonomia dos Bens e a Condição de Samuelson',
    teseCentral: 'Bens públicos puros possuem não-rivalidade e não-excludibilidade. A condição de eficiência de Samuelson exige que a soma das TMS individuais iguale a TMT da economia.',
    fundamentacaoTeorica: 'Paul Samuelson (1954) formulou a teoria pura dos gastos públicos. Ao contrário de bens privados (onde a demanda de mercado é a soma horizontal das quantidades), para bens públicos a demanda é a soma vertical das disposições marginais a pagar dos cidadãos por uma mesma quantidade ofertada: ∑ TMS_i = TMT.',
    aplicabilidadePratica: 'A defesa nacional pelo Exército Brasileiro, a segurança pública estadual (Polícia Militar do MA) e o sistema de sinalização náutica da Baía de São Marcos são bens públicos puros indivisíveis e não-excludentes.',
    equacaoOuRegra: '\\sum_{i=1}^n TMS_{xy}^i = TMT_{xy} = \\frac{CMg_{bem\\ p\\acute{u}blico}}{CMg_{bem\\ privado}}',
    conexoes: ['Z-02.01', 'Z-05.02', 'Z-05.03'],
    referenciaBibliografica: 'Samuelson (1954, Pure Theory of Public Expenditure); Stiglitz (2000, Cap. 6)',
    tags: ['#BensPublicos', '#Samuelson', '#NaoRivalidade', '#NaoExcludibilidade']
  },
  {
    id: 'Z-05.02',
    aulaNumero: 5,
    conceito: 'O Problema do Carona (Free-Rider) e Falha de Revelação',
    teseCentral: 'Devido à impossibilidade de excluir não-pagadores, agentes racionais têm incentivos estritamente dominantes para ocultar sua verdadeira disposição a pagar por bens públicos.',
    fundamentacaoTeorica: 'Em uma estrutura de teoria dos jogos análoga ao Dilema dos Prisioneiros, a estratégia dominante de cada indivíduo é consumir o bem público sem contribuir financeiramente para sua provisão ("pegar carona" no esforço alheio). Como todos raciocinam assim, o mercado privado oferta zero ou volume subótimo, exigindo o poder de coerção tributária estatal.',
    aplicabilidadePratica: 'Iluminação pública e saneamento básico nas cidades maranhenses só se sustentam financeiramente mediante instituição de taxas ou contribuições compulsórias no IPTU/energia (como a COSIP), pois a contribuição voluntária dos moradores colapsaria.',
    equacaoOuRegra: 'Estrat\\acute{e}gia\\ Dominante: \\quad Contribuir = 0 \\implies Q_{mercado} < Q_{socialmente\\ \\acute{o}timo}',
    conexoes: ['Z-05.01', 'Z-03.02', 'Z-02.01'],
    referenciaBibliografica: 'Olson (1965, The Logic of Collective Action); Stiglitz & Rosengard (2016, Cap. 6)',
    tags: ['#FreeRider', '#Carona', '#TeoriaDosJogos', '#CoercaoFiscal']
  },
  {
    id: 'Z-05.03',
    aulaNumero: 5,
    conceito: 'Tragédia dos Comuns vs. Governança Comunitária de Ostrom',
    teseCentral: 'Bens de uso comum (rivais, porém não-excludentes) sofrem sobre-exploração predatória se de livre acesso; Elinor Ostrom provou que instituições locais cooperativas evitam o colapso sem privatização forçada.',
    fundamentacaoTeorica: 'Garrett Hardin (1968) postulou a destruição inevitável de pastos e recursos pesqueiros comuns. Elinor Ostrom (Prêmio Nobel 2009) refutou a falsa dicotomia entre "estatização total" ou "privatização", demonstrando empiricamente que comunidades com regras endógenas de monitoramento, sanções graduadas e resolução de conflitos geram sustentabilidade duradoura.',
    aplicabilidadePratica: 'As Reservas Extrativistas no litoral maranhense (como nos Lençóis e Delta das Américas) e o manejo tradicional de babaçuais pelas quebradeiras de coco no Maranhão exemplificam a governança ostromiana de recursos comuns.',
    equacaoOuRegra: 'Rivalidade = 1 \\land Excludibilidade = 0 \\implies \\text{Risco\\ de\\ Sobre-explora\\c{c}\\~{a}o}',
    conexoes: ['Z-05.01', 'Z-03.01', 'Z-03.02'],
    referenciaBibliografica: 'Hardin (1968, The Tragedy of the Commons); Ostrom (1990, Governing the Commons)',
    tags: ['#TragediaDosComuns', '#Ostrom', '#RecursosComuns', '#MeioAmbiente']
  },

  // =========================================================================
  // AULA 06: Eficiência e Equidade na Tributação
  // =========================================================================
  {
    id: 'Z-06.01',
    aulaNumero: 6,
    conceito: 'Peso Morto Tributário e o Triângulo de Harberger',
    teseCentral: 'A tributação sobre preços distorce escolhas de consumo e produção, gerando perda líquida de bem-estar (Deadweight Loss) que cresce com o quadrado da alíquota tributária.',
    fundamentacaoTeorica: 'Arnold Harberger (1964) derivou a aproximação analítica do triângulo de peso morto: DWL = 0.5 · [ε_d · ε_s / (ε_d + ε_s)] · P · Q · t². Como o peso morto varia com t², duplicar uma alíquota tributária quadruplica a ineficiência econômica, recomendando alíquotas moderadas incidentes sobre bases amplas em vez de alíquotas punitivas concentradas.',
    aplicabilidadePratica: 'O princípio basilar que norteia a Reforma Tributária da EC 132/2023 no Brasil: unificar impostos fragmentados (PIS, COFINS, IPI, ICMS, ISS) em uma alíquota padrão uniforme (IBS e CBS) de base ampla para reduzir o peso morto decorrente da dispersão tarifária.',
    equacaoOuRegra: 'DWL \\approx \\frac{1}{2} \\cdot \\frac{\\varepsilon_d \\cdot \\varepsilon_s}{\\varepsilon_d + \\varepsilon_s} \\cdot P \\cdot Q \\cdot t^2',
    conexoes: ['Z-02.02', 'Z-06.02', 'Z-07.01', 'Z-08.01'],
    referenciaBibliografica: 'Harberger (1964, The Measurement of Waste); Rosen (1998, Public Finance, Cap. 13)',
    tags: ['#PesoMorto', '#Harberger', '#EficienciaTributaria', '#DistorcaoFiscal']
  },
  {
    id: 'Z-06.02',
    aulaNumero: 6,
    conceito: 'Custo Marginal dos Fundos Públicos (MCF)',
    teseCentral: 'Arrecadar R$ 1,00 de receita para o Tesouro custa à sociedade mais de R$ 1,00 (tipicamente entre R$ 1,15 e R$ 1,40), devido ao peso morto e custos administrativos de cobrança.',
    fundamentacaoTeorica: 'O Marginal Cost of Funds (MCF) incorpora o valor monetário recolhido acrescido do peso morto marginal e dos custos de conformidade da Receita Federal e dos contribuintes. Portanto, um projeto de investimento público só se justifica sob a ótica da economia do bem-estar se seu benefício marginal for estritamente superior ao MCF.',
    aplicabilidadePratica: 'Em avaliações de custo-benefício de grandes obras públicas pelo Tribunal de Contas do Estado (TCE-MA) e Ministério do Planejamento, os projetos devem gerar taxas de retorno econômico-social que cubram o MCF da matriz tributária brasileira.',
    equacaoOuRegra: 'MCF = 1 + \\frac{d(DWL)}{dR} > 1.0',
    conexoes: ['Z-06.01', 'Z-01.02', 'Z-02.01'],
    referenciaBibliografica: 'Browning (1976, The Marginal Cost of Public Funds); Dahlby (2008, The Marginal Cost of Funds)',
    tags: ['#MCF', '#FundosPublicos', '#AvaliacaoDeProjetos', '#AnaliseCustoBeneficio']
  },
  {
    id: 'Z-06.03',
    aulaNumero: 6,
    conceito: 'Equidade Tributária Horizontal e Vertical',
    teseCentral: 'Equidade horizontal exige que contribuintes em condições econômicas idênticas paguem o mesmo tributo; equidade vertical prescreve que contribuintes com maior capacidade suportem alíquotas progressivamente maiores.',
    fundamentacaoTeorica: 'Fundamentada no princípio da capacidade contributiva (Art. 145, §1º da CF/88). A equidade vertical fundamenta a progressividade do Imposto de Renda Pessoa Física (IRPF), orientada pelo princípio do sacrifício marginal igual ou proporcional de utilidade (Edgeworth e Pigou).',
    aplicabilidadePratica: 'No Brasil, a isenção de lucros e dividendos distribuídos a pessoas físicas (Lei 9.249/95) tem sido criticada por economistas como uma severa violação da equidade horizontal (trabalhadores assalariados pagam 27,5% na fonte enquanto rendas de capital eram isentas).',
    equacaoOuRegra: '\\text{Capacidade}(A) = \\text{Capacidade}(B) \\implies T_A = T_B; \\quad \\text{Renda}_A > \\text{Renda}_B \\implies \\frac{T_A}{Y_A} > \\frac{T_B}{Y_B}',
    conexoes: ['Z-01.02', 'Z-07.02', 'Z-08.02'],
    referenciaBibliografica: 'Musgrave (1959); Rosen (1998, Cap. 12); Arvate & Biderman (2004, Cap. 7)',
    tags: ['#EquidadeHorizontal', '#EquidadeVertical', '#Progressividade', '#CapacidadeContributiva']
  },

  // =========================================================================
  // AULA 07: Incidência e Carga Tributária Brasileira
  // =========================================================================
  {
    id: 'Z-07.01',
    aulaNumero: 7,
    conceito: 'Incidência Econômica vs. Jurídica e Repasse por Elasticidades',
    teseCentral: 'Quem suporta a carga de um imposto não é determinado pela lei fiscal, mas sim pela rigidez relativa das curvas de oferta e demanda no mercado.',
    fundamentacaoTeorica: 'O legislador pode determinar que o vendedor recolha o tributo (contribuinte de jure), mas a incidência de facto depende das elasticidades-preço: a parte com comportamento mais inelástico (menor capacidade de substituição) absorve a maior fração do ônus. A variação no preço ao consumidor é dada por ΔP_c / t = ε_s / (ε_s + ε_d).',
    aplicabilidadePratica: 'Na tributação do óleo diesel e gasolina: como o transporte rodoviário no Maranhão e no Brasil tem demanda no curto prazo altamente inelástica, quase 100% dos aumentos de ICMS e CIDE são repassados diretamente às bombas dos postos e fretes de alimentos.',
    equacaoOuRegra: '\\frac{\\Delta P_c}{t} = \\frac{\\varepsilon_s}{\\varepsilon_s + |\\varepsilon_d|}, \\quad \\frac{\\Delta P_v}{t} = \\frac{|\\varepsilon_d|}{\\varepsilon_s + |\\varepsilon_d|}',
    conexoes: ['Z-06.01', 'Z-07.02', 'Z-08.01'],
    referenciaBibliografica: 'Kotlikoff & Summers (1987, Tax Incidence); Giambiagi & Além (2011, Cap. 7)',
    tags: ['#IncidenciaEconomica', '#Elasticidade', '#RepasseTributario', '#ContribuinteDeFacto']
  },
  {
    id: 'Z-07.02',
    aulaNumero: 7,
    conceito: 'Regressividade Estrutural da Carga Tributária Brasileira',
    teseCentral: 'A concentração atípica da arrecadação brasileira em tributos indiretos sobre o consumo (ICMS, PIS/COFINS, ISS) impõe alíquotas efetivas superiores às famílias de baixa renda em relação aos mais ricos.',
    fundamentacaoTeorica: 'Como a propensão marginal a consumir das famílias de baixa renda aproxima-se de 100% de seus proventos, tributar bens e serviços equivale a tributar a totalidade de sua renda. Já as classes de renda alta poupam parcelas expressivas, tornando o sistema tributário nacional fortemente regressivo e ampliador da desigualdade pós-tributação.',
    aplicabilidadePratica: 'Estudos do IPEA e SEPLAN-MA mostram que famílias maranhenses que recebem até 2 salários mínimos chegam a comprometer 26% de sua renda total em tributos indiretos embutidos na cesta básica e utilidades domésticas.',
    equacaoOuRegra: '\\frac{\\partial (T / Y)}{\\partial Y} < 0 \\implies \\text{Regressividade\\ Fiscal}',
    conexoes: ['Z-06.03', 'Z-07.03', 'Z-01.02'],
    referenciaBibliografica: 'Giambiagi & Além (2011, Cap. 7); Matias-Pereira (2018, Cap. 8); IPEA (2020)',
    tags: ['#Regressividade', '#CargaTributaria', '#Desigualdade', '#ConsumoVsRenda']
  },
  {
    id: 'Z-07.03',
    aulaNumero: 7,
    conceito: 'A Reforma Tributária sobre o Consumo (EC 132/2023): IBS, CBS e Imposto Seletivo',
    teseCentral: 'A emenda constitucional 132/23 extingue tributos cumulativos e fragmentados, instituindo o modelo de IVA Dual com crédito financeiro amplo e princípio do destino.',
    fundamentacaoTeorica: 'Substitui cinco tributos (ICMS, ISS, IPI, PIS, COFINS) por dois IVAs complementares: o Imposto sobre Bens e Serviços (IBS - estadual/municipal) e a Contribuição sobre Bens e Serviços (CBS - federal), além do Imposto Seletivo ("imposto do pecado"). Adota a tributação no local de consumo final (destino), eliminando a guerra fiscal e créditos podres.',
    aplicabilidadePratica: 'Para o Estado do Maranhão, que é predominantemente consumidor líquido de produtos industrializados vindos do Centro-Sul, a migração para o princípio do destino amplia significativamente sua base de arrecadação própria a médio prazo.',
    equacaoOuRegra: 'IVA\\ Dual = IBS_{subnacional} + CBS_{federal} \\quad \\text{com\\ Cobran\\c{c}a\\ no\\ Destino}',
    conexoes: ['Z-06.01', 'Z-12.03', 'Z-11.02'],
    referenciaBibliografica: 'Appy (2020, Reforma Tributária no Brasil); Brasil (Emenda Constitucional nº 132/2023)',
    tags: ['#ReformaTributaria', '#EC132', '#IVADual', '#IBS', '#PrincipioDoDestino']
  },

  // =========================================================================
  // AULA 08: Impostos sobre Renda vs. Consumo e Tributação Ótima
  // =========================================================================
  {
    id: 'Z-08.01',
    aulaNumero: 8,
    conceito: 'A Regra da Elasticidade Inversa de Ramsey',
    teseCentral: 'Para minimizar o peso morto total na arrecadação de tributos sobre mercadorias, as alíquotas devem ser inversamente proporcionais às elasticidades-preço da demanda dos bens.',
    fundamentacaoTeorica: 'Frank Ramsey (1927) equacionou o problema do planejador social que busca levantar uma meta de receita fiscal R minimizando a soma dos pesos mortos. Assumindo demandas não-correlacionadas, a alíquota de cada bem i obedece a t_i ∝ 1 / |ε_i|. Essa regra garante que a contração percentual na quantidade demandada de todas as mercadorias seja rigorosamente idêntica.',
    aplicabilidadePratica: 'Apresenta um conflito frontal com a equidade: bens essenciais (alimentos, remédios, energia) possuem demanda inelástica e, pela regra de Ramsey pura, deveriam pagar alíquotas altíssimas, motivo pelo qual governos criam isenções para proteger a subsistência básica.',
    equacaoOuRegra: '\\frac{t_i}{t_j} = \\frac{\\varepsilon_j}{\\varepsilon_i} \\implies t_i \\cdot |\\varepsilon_i| = \\text{constante}',
    conexoes: ['Z-06.01', 'Z-08.02', 'Z-01.02'],
    referenciaBibliografica: 'Ramsey (1927, A Contribution to the Theory of Taxation); Stiglitz & Rosengard (2016, Cap. 16)',
    tags: ['#RegraDeRamsey', '#TributacaoOtima', '#ElasticidadeInversa', '#EficienciaAlocativa']
  },
  {
    id: 'Z-08.02',
    aulaNumero: 8,
    conceito: 'Teorema de Corlett-Hague e Tributação do Lazer',
    teseCentral: 'Como o lazer não pode ser tributado diretamente pelo Estado, bens e serviços que são fortemente complementares ao lazer devem sofrer alíquotas tributárias mais elevadas.',
    fundamentacaoTeorica: 'Corlett & Hague (1953) identificaram que a existência de um bem não-tributável (o lazer do trabalhador) cria uma distorção inevitável entre trabalho e descanso (second-best). Ao sobretaxar bens complementares ao tempo livre (resorts, cruzeiros, lanchas, equipamentos de esqui/jogos), o governo desestimula indiretamente a substituição do trabalho pelo lazer.',
    aplicabilidadePratica: 'Justifica alíquotas superiores de Imposto Seletivo e IPI sobre jet-skis, aeronaves particulares de recreio e resorts turísticos de luxo na legislação tributária brasileira.',
    equacaoOuRegra: 't_k > t_m \\iff \\sigma_{k, lazer} > \\sigma_{m, lazer} \\quad (\\text{maior\\ complementariedade})',
    conexoes: ['Z-04.02', 'Z-08.01', 'Z-08.03'],
    referenciaBibliografica: 'Corlett & Hague (1953, Complementarity and the Theory of Taxation); Atkinson & Stiglitz (1980)',
    tags: ['#CorlettHague', '#SegundoMelhor', '#ComplementaresAoLazer', '#TrabalhoVsLazer']
  },
  {
    id: 'Z-08.03',
    aulaNumero: 8,
    conceito: 'Tributação Ótima da Renda de Mirrlees',
    teseCentral: 'A curva de alíquotas marginais de imposto de renda deve equilibrar a necessidade social de redistribuição com a elasticidade da oferta de trabalho dos indivíduos mais produtivos.',
    fundamentacaoTeorica: 'James Mirrlees (Prêmio Nobel 1996) modelou o governo sob assimetria de informação: o Estado conhece a renda declarada dos indivíduos, mas não sua capacidade ou esforço inato. Se as alíquotas marginais no topo forem excessivas, os mais produtivos reduzem o esforço de trabalho ou evadem, derrubando a arrecadação agregada (o formato em "U" invertido da alíquota marginal).',
    aplicabilidadePratica: 'Fornece o arcabouço para a fixação do teto de 27,5% da tabela progressiva do IRPF no Brasil e baliza discussões sobre a tributação de super-ricos e fundos exclusivos (Lei 14.754/2023).',
    equacaoOuRegra: 'T\'(y) = \\frac{1 - F(n)}{n \\cdot f(n)} \\cdot \\frac{1 - g(n)}{1 + e_w} \\quad (\\text{F\\acute{o}rmula\\ de\\ Mirrlees-Diamond})',
    conexoes: ['Z-08.01', 'Z-06.03', 'Z-01.02'],
    referenciaBibliografica: 'Mirrlees (1971, An Exploration in the Theory of Optimum Income Taxation); Diamond (1998)',
    tags: ['#Mirrlees', '#TributacaoOtimaRenda', '#AssimetriaDeInformacao', '#OfertaDeTrabalho']
  },

  // =========================================================================
  // AULA 09: Teoria da Escolha Pública e Burocracia
  // =========================================================================
  {
    id: 'Z-09.01',
    aulaNumero: 9,
    conceito: 'Premissa Metodológica da Public Choice e Individualismo Metodológico',
    teseCentral: 'Políticos, eleitores e burocratas são motivados pelo mesmo autointeresse racional maximizador que guia consumidores e empresários no mercado privado.',
    fundamentacaoTeorica: 'James Buchanan e Gordon Tullock (Escola da Virgínia) rejeitaram a visão romântica de que os governantes são "déspotas esclarecidos" devotados unicamente ao interesse público. Ao entrar no setor público, os indivíduos não sofrem uma metamorfose moral: buscam poder, reeleição, prestígio e segurança orçamentária.',
    aplicabilidadePratica: 'Ajuda a explicar por que recursos públicos de emendas parlamentares frequentemente priorizam festividades locais ou obras de alta visibilidade eleitoral em vez de investimentos estruturais de saneamento subterrâneo.',
    equacaoOuRegra: '\\max U_{agente\\ p\\acute{u}blico}(Votos, Rendas, Poder, Or\\c{c}amento)',
    conexoes: ['Z-01.03', 'Z-09.02', 'Z-10.01'],
    referenciaBibliografica: 'Buchanan & Tullock (1962, The Calculus of Consent); Tullock (1987, Public Choice)',
    tags: ['#PublicChoice', '#EscolaDaVirginia', '#Buchanan', '#AutointeresseRacional']
  },
  {
    id: 'Z-09.02',
    aulaNumero: 9,
    conceito: 'O Modelo do Burocrata Maximizador de Orçamento de Niskanen',
    teseCentral: 'Agências públicas monopolistas tendem a ofertar uma quantidade de serviços duas vezes superior ao ótimo social, exaurindo todo o excedente do consumidor.',
    fundamentacaoTeorica: 'William Niskanen (1971) postulou que a utilidade do dirigente burocrático depende do tamanho do seu orçamento departamental. Usando seu monopólio informacional de custos, a agência apresenta propostas orçamentárias "pegar ou largar" ao parlamento. O equilíbrio ocorre onde o Benefício Total iguala o Custo Total (BT = CT), em vez de BMg = CMg, levando a um inchaço orçamentário.',
    aplicabilidadePratica: 'A resistência histórica de órgãos públicos brasileiros a reformas de digitalização ou cortes de estruturas redundantes reflete a lógica niskaneniana de preservação de orçamentos e cargos comissionados.',
    equacaoOuRegra: 'BT(Q_{niskanen}) = CT(Q_{niskanen}) \\implies Q_{niskanen} \\approx 2 \\cdot Q^*',
    conexoes: ['Z-09.01', 'Z-04.03', 'Z-10.03'],
    referenciaBibliografica: 'Niskanen (1971, Bureaucracy and Representative Government); Mueller (2003, Public Choice III)',
    tags: ['#Niskanen', '#Burocracia', '#MaximizacaoDeOrcamento', '#Superprovisao']
  },
  {
    id: 'Z-09.03',
    aulaNumero: 9,
    conceito: 'Custos de Decisão Coletiva e a Regra Ótima de Maioria',
    teseCentral: 'A regra de votação ótima para uma sociedade minimiza a soma dos custos de decisão (tempo para negociar) e dos custos externos (danos impostos pela maioria à minoria).',
    fundamentacaoTeorica: 'No Cálculo do Consenso, Buchanan e Tullock demonstraram que a regra da unanimidade tem custo externo zero, mas custos de decisão infinitos devido a chantagens de minorias. Conforme o quórum de aprovação se reduz para maioria simples (50% + 1), os custos de negociação caem, mas os custos externos sobem.',
    aplicabilidadePratica: 'Justifica por que a Constituição Federal exige maioria qualificada de 3/5 dos votos para Emendas Constitucionais (matérias com alto custo externo potencial) e apenas maioria simples para leis ordinárias rotineiras.',
    equacaoOuRegra: 'Custo\\ Total(K) = Custos\\ Externos(K) + Custos\\ de\\ Decis\\~{a}o(K)',
    conexoes: ['Z-01.03', 'Z-09.01', 'Z-10.02'],
    referenciaBibliografica: 'Buchanan & Tullock (1962, Cap. 6); Arvate & Biderman (2004, Cap. 10)',
    tags: ['#CustosDeDecisao', '#CustosExternos', '#RegraDeMaioria', '#VotacaoColetiva']
  },

  // =========================================================================
  // AULA 10: Comportamento Eleitoral, Rent-Seeking e Teorema de Arrow
  // =========================================================================
  {
    id: 'Z-10.01',
    aulaNumero: 10,
    conceito: 'O Teorema do Eleitor Mediano de Downs',
    teseCentral: 'Em uma disputa eleitoral majoritária bipartidária ao longo de uma escala ideológica unidimensional, os partidos convergem suas plataformas para a preferência do eleitor mediano.',
    fundamentacaoTeorica: 'Anthony Downs (1957) aplicou a concorrência espacial de Hotelling à política. Se as preferências dos eleitores tiverem pico único (single-peaked), qualquer partido que se afaste do centro perderá a eleição para o adversário que ocupar a mediana das preferências do corpo eleitoral.',
    aplicabilidadePratica: 'Explica o movimento recorrente de partidos e candidatos a cargos majoritários no Maranhão e no Brasil em direção ao centro pragmático durante o segundo turno das campanhas eleitorais.',
    equacaoOuRegra: 'Plataforma\\ Vencedora \\to M, \\quad \\text{onde} \\quad \\int_{-\\infty}^M f(x) dx = 0.5',
    conexoes: ['Z-09.01', 'Z-10.02', 'Z-11.02'],
    referenciaBibliografica: 'Downs (1957, An Economic Theory of Democracy); Black (1948)',
    tags: ['#EleitorMediano', '#Downs', '#CompeticaoEleitoral', '#PicoUnico']
  },
  {
    id: 'Z-10.02',
    aulaNumero: 10,
    conceito: 'O Teorema da Impossibilidade de Arrow e Paradoxo de Condorcet',
    teseCentral: 'Não existe sistema de votação democrático que agregue preferências individuais em uma ordenação social que respeite simultaneamente Pareto, Não-Ditadura, Transitividade e Independência de Alternativas Irrelevantes.',
    fundamentacaoTeorica: 'Kenneth Arrow (1951) demonstrou matematicamente que a votação democrática por maioria está sujeita a ciclos de intransitividade (A vence B, B vence C, mas C vence A - Paradoxo de Condorcet). O resultado final depende do poder de quem define a ordem da pauta (agenda-setter), e não de uma "vontade geral" unívoca.',
    aplicabilidadePratica: 'O papel decisivo do Presidente da Assembleia Legislativa do Maranhão (ALEMA) ou do Congresso Nacional ao pautar ou arquivar projetos tributários ilustra como o controle da agenda dita o resultado legislativo.',
    equacaoOuRegra: 'A \\succ B \\land B \\succ C \\land C \\succ A \\implies \\text{Ciclo\\ Social\\ Intransitivo}',
    conexoes: ['Z-10.01', 'Z-09.03', 'Z-02.02'],
    referenciaBibliografica: 'Arrow (1951, Social Choice and Individual Values); Condorcet (1785)',
    tags: ['#TeoremaDeArrow', '#ParadoxoDeCondorcet', '#EscolhaSocial', '#AgendaSetter']
  },
  {
    id: 'Z-10.03',
    aulaNumero: 10,
    conceito: 'Custos Econômicos do Rent-Seeking (Tullock)',
    teseCentral: 'O custo social de um privilégio estatal ou monopólio legal não é apenas o triângulo de Harberger, mas todo o retângulo de rendas dissipado em lobby, advogados e propinas.',
    fundamentacaoTeorica: 'Gordon Tullock (1967) e Anne Krueger (1974) mostraram que agentes econômicos competem ferozmente pelas rendas econômicas criadas artificialmente pela regulação governamental (isenções, subsídios, cotas de importação). Os recursos produtivos alocados nessa disputa constituem desperdício social puro, pois não geram nenhum valor novo.',
    aplicabilidadePratica: 'A concessão discricionária de regimes especiais de tributação a setores corporativos específicos através de lobbies parlamentares drena capital humano e financeiro que poderiam ser aplicados em inovação produtiva.',
    equacaoOuRegra: 'Custo\\ Social_{total} = Peso\\ Morto(DWL) + Rendas\\ Dissipadas(Rent-Seeking)',
    conexoes: ['Z-06.01', 'Z-04.03', 'Z-09.01'],
    referenciaBibliografica: 'Tullock (1967, The Welfare Costs of Tariffs, Monopolies, and Theft); Krueger (1974)',
    tags: ['#RentSeeking', '#Tullock', '#Lobby', '#DesperdicioSocial']
  },

  // =========================================================================
  // AULA 11: Descentralização e Federalismo Fiscal
  // =========================================================================
  {
    id: 'Z-11.01',
    aulaNumero: 11,
    conceito: 'Teorema da Descentralização de Wallace Oates',
    teseCentral: 'Na ausência de economias de escala e transbordamentos, a provisão descentralizada e diferenciada de um bem público local é sempre Pareto-superior à provisão uniforme de um governo central.',
    fundamentacaoTeorica: 'Wallace Oates (1972) demonstrou que cidadãos de diferentes regiões possuem preferências heterogêneas por bens públicos (ex: pavimentação rural vs. creches urbanas). Um governo central tende a impor pacotes padronizados e uniformes para toda a nação, gerando perda de bem-estar para aqueles cujas demandas locais divergem da média nacional.',
    aplicabilidadePratica: 'Justifica por que a gestão do ensino fundamental e da atenção básica em saúde deve ficar sob competência dos municípios maranhenses, que conhecem a realidade geográfica de sua população melhor do que ministérios em Brasília.',
    equacaoOuRegra: 'W_{descentralizado} \\ge W_{centralizado\\ uniforme} \\quad (\\text{Teorema\\ de\\ Oates})',
    conexoes: ['Z-11.02', 'Z-12.01', 'Z-05.01'],
    referenciaBibliografica: 'Oates (1972, Fiscal Federalism, Cap. 2); Arvate & Biderman (2004, Cap. 14)',
    tags: ['#TeoremaDeOates', '#FederalismoFiscal', '#Descentralizacao', '#Heterogeneidade']
  },
  {
    id: 'Z-11.02',
    aulaNumero: 11,
    conceito: 'A Hipótese de Tiebout e a Votação com os Pés',
    teseCentral: 'A mobilidade espacial dos cidadãos entre diferentes jurisdições municipais gera uma revelação de preferências análoga ao mecanismo de preços de mercado para bens públicos locais.',
    fundamentacaoTeorica: 'Charles Tiebout (1956) solucionou o problema da carona de Samuelson para o nível local. Se houver livre mobilidade, informação perfeita e multiplicidade de municípios ofertando diferentes combinações de impostos locais (IPTU/ISS) e serviços públicos, cada família "vota com os pés", escolhendo residir no município que maximiza sua utilidade.',
    aplicabilidadePratica: 'Famílias que optam por morar em São Luís, São José de Ribamar, Paço do Lumiar ou Raposa (Região Metropolitana) sopesam a relação entre IPTU, custo de vida e a oferta de escolas e segurança pública em cada prefeitura.',
    equacaoOuRegra: '\\max_j U_i(G_j, T_j) \\implies \\text{Sele\\c{c}\\~{a}o\\ Espacial\\ de\\ Tiebout}',
    conexoes: ['Z-11.01', 'Z-05.01', 'Z-05.02'],
    referenciaBibliografica: 'Tiebout (1956, A Pure Theory of Local Expenditures); Stiglitz & Rosengard (2016, Cap. 26)',
    tags: ['#Tiebout', '#VotacaoComOsPes', '#BensPublicosLocais', '#MobilidadeEspacial']
  },
  {
    id: 'Z-11.03',
    aulaNumero: 11,
    conceito: 'Desequilíbrios Fiscais Verticais e Horizontais',
    teseCentral: 'O federalismo fiscal gera disparidades estruturais: o gap vertical entre bases de arrecadação e encargos por nível de governo, e o gap horizontal entre regiões com diferentes capacidades fiscais.',
    fundamentacaoTeorica: 'O desequilíbrio vertical surge porque a União detém bases tributárias elásticas e volumosas (IR, contribuições sociais), enquanto estados e municípios arcam com despesas crescentes em saúde e educação. O desequilíbrio horizontal ocorre porque estados industrializados (como SP) possuem PIB per capita muito superior a estados periféricos, demandando transferências equalizadoras.',
    aplicabilidadePratica: 'O Fundo de Participação dos Estados (FPE) e o Fundo de Participação dos Municípios (FPM) são os instrumentos constitucionais primordiais destinados a mitigar o desequilíbrio horizontal entre os estados do Norte/Nordeste e o Centro-Sul.',
    equacaoOuRegra: 'Gap_{Vertical} = Despesas_{subnacionais} - Receitas_{pr\\acute{o}prias}; \\quad Gap_{Horizontal} = Base_{rica} - Base_{pobre}',
    conexoes: ['Z-11.01', 'Z-12.01', 'Z-12.02'],
    referenciaBibliografica: 'Oates (1972); World Bank (1997); Giambiagi & Além (2011, Cap. 12)',
    tags: ['#DesequilibrioVertical', '#DesequilibrioHorizontal', '#TransferenciasIntergovernamentais', '#FPE']
  },

  // =========================================================================
  // AULA 12: O Sistema Federativo no Brasil, Guerra Fiscal e Reformas
  // =========================================================================
  {
    id: 'Z-12.01',
    aulaNumero: 12,
    conceito: 'O Efeito Flypaper ("O Dinheiro Gruda Onde Ele Cai")',
    teseCentral: 'Transferências intergovernamentais incondicionais em bloco estimulam a expansão dos gastos públicos locais com muito mais intensidade do que um aumento equivalente na renda privada dos munícipes.',
    fundamentacaoTeorica: 'Pela teoria microeconômica clássica, uma transferência de R$ 100 ao governo local deveria ter efeito idêntico a um aumento de R$ 100 na renda média das famílias locais (efeito renda puro, com alívio tributário). Empiricamente, Courant, Gramlich & Rubinfeld comprovaram que prefeitos quase não reduzem tributos locais e gastam a verba diretamente na máquina pública: ∂G/∂Transferência >> ∂G/∂RendaPrivada.',
    aplicabilidadePratica: 'A dependência crônica de municípios maranhenses de pequeno porte em relação às cotas do FPM: o ingresso da verba federal infla contratações e folhas de pagamento municipais sem contrapartida de esforço de arrecadação do IPTU/ISS local.',
    equacaoOuRegra: '\\frac{\\partial G_{local}}{\\partial Transfer\\hat{e}ncia} > \\frac{\\partial G_{local}}{\\partial Renda_{pr\\acute{o}pria}}',
    conexoes: ['Z-11.03', 'Z-09.02', 'Z-12.02'],
    referenciaBibliografica: 'Gramlich (1977, Intergovernmental Grants); Hines & Thaler (1995, The Flypaper Effect)',
    tags: ['#EfeitoFlypaper', '#Transferencias', '#FPM', '#IlusaoFiscal']
  },
  {
    id: 'Z-12.02',
    aulaNumero: 12,
    conceito: 'Guerra Fiscal Interestadual do ICMS e "Race to the Bottom"',
    teseCentral: 'A concessão descentralizada e unilateral de renúncias fiscais de ICMS para atrair plantas industriais configura um dilema dos prisioneiros com perda líquida agregada de arrecadação para todos os estados.',
    fundamentacaoTeorica: 'Na ausência de coordenação pelo CONFAZ, cada estado concede incentivos tributários crescentes (créditos presumidos, diferimentos de ICMS). No equilíbrio de Nash resultante, as indústrias teriam se instalado no país de qualquer forma, mas os governos subnacionais sacrificam sua arrecadação líquida coletiva em benefício de investidores privados.',
    aplicabilidadePratica: 'Disputas tributárias históricas entre o Maranhão, Ceará e Bahia para atração de montadoras automotivas e indústrias de celulose através de Termos de Acordo de Regime Especial (TARE).',
    equacaoOuRegra: 'Estrat\\acute{e}gia\\ de\\ Nash: \\quad Ren\\acute{u}ncia_A \\land Ren\\acute{u}ncia_B \\implies Arrecada\\c{c}\\~{a}o\\ M\\acute{i}nima',
    conexoes: ['Z-07.03', 'Z-11.03', 'Z-05.02'],
    referenciaBibliografica: 'Oliveira in Arvate & Biderman (2004, p. 415-442); Giambiagi & Além (2011, Cap. 12)',
    tags: ['#GuerraFiscal', '#ICMS', '#RaceToTheBottom', '#DilemaDosPrisioneiros']
  },
  {
    id: 'Z-12.03',
    aulaNumero: 12,
    conceito: 'Rigidez Orçamentária e a Lei de Responsabilidade Fiscal (LRF)',
    teseCentral: 'A Constituição de 1988 vinculou a quase totalidade das receitas a despesas obrigatórias (saúde, FUNDEB, previdência), limitando a margem discricionária dos governadores e prefeitos.',
    fundamentacaoTeorica: 'A Lei Complementar nº 101/2000 (LRF) estabeleceu limites rígidos para despesas de pessoal (máximo 60% da Receita Corrente Líquida para estados e municípios), vedações de endividamento e regras para restos a pagar no final de mandatos, buscando estancar a trajetória de insolvência dos governos subnacionais.',
    aplicabilidadePratica: 'No Governo do Maranhão, as despesas de pessoal com servidores ativos e inativos da educação, segurança e saúde são monitoradas trimestralmente no Relatório de Gestão Fiscal (RGF) para evitar ultrapassar o limite prudencial de 46,55% do Poder Executivo.',
    equacaoOuRegra: '\\text{Despesa\\ Total\\ com\\ Pessoal} \\le 60\\% \\times RCL',
    conexoes: ['Z-01.03', 'Z-09.02', 'Z-12.01'],
    referenciaBibliografica: 'Brasil (Lei Complementar nº 101/2000 - LRF); Giambiagi & Além (2011, Cap. 13)',
    tags: ['#LRF', '#RigidezOrcamentaria', '#RCL', '#GestaoFiscalResponsavel']
  },

  // =========================================================================
  // FICHAS EXPANDIDAS DE CONCEITOS ESTRUTURANTES (TOTALIZANDO 50 CONCEITOS)
  // =========================================================================
  {
    id: 'Z-01.04',
    aulaNumero: 1,
    conceito: 'Lei de Wagner e a Elasticidade-Renda do Gasto Público',
    teseCentral: 'À medida que a renda per capita de uma nação industrializada cresce, a proporção do gasto público em relação ao PIB expande-se a taxas ainda maiores (elasticidade-renda superior à unidade).',
    fundamentacaoTeorica: 'Adolph Wagner (1890) postulou que a modernização econômica acarreta maior divisão do trabalho, complexidade jurídica e urbanização acelerada, demandando expansão contínua em regulação, infraestrutura e serviços educacionais e de seguridade social. A elasticidade-renda do setor público é maior que 1: η_G > 1.',
    aplicabilidadePratica: 'No Brasil e no Maranhão nas últimas cinco décadas, a transição de uma economia eminentemente agrária para urbana e de serviços multiplicou a demanda orçamentária por saneamento básico, malha rodoviária e ensino técnico/superior.',
    equacaoOuRegra: '\\eta_{G,Y} = \\frac{\\partial G / G}{\\partial Y / Y} > 1 \\implies \\frac{G}{PIB} \\uparrow \\text{com o desenvolvimento}',
    conexoes: ['Z-01.01', 'Z-01.05', 'Z-09.04'],
    referenciaBibliografica: 'Wagner (1890); Giambiagi & Além (2011, Cap. 1); Musgrave & Musgrave (1989)',
    tags: ['#LeiDeWagner', '#CrescimentoDoEstado', '#ElasticidadeRenda', '#HistoriaEconomica']
  },
  {
    id: 'Z-01.05',
    aulaNumero: 1,
    conceito: 'Efeito Deslocamento e Efeito Catraca (Peacock & Wiseman)',
    teseCentral: 'Crises e choques exógenos severos elevam abruptamente a tolerância dos cidadãos à tributação; após a crise, o gasto público não retorna ao patamar anterior, consolidando-se num novo patamar estrutural mais elevado.',
    fundamentacaoTeorica: 'Alan Peacock e Jack Wiseman (1961) desafiaram a visão puramente organicista de Wagner. Em tempos de paz, o teto de tolerância tributária da sociedade restringe os governantes. Em crises sanitárias, guerras ou depressões, os governos realizam um "deslocamento" (displacement effect) dos gastos e tributos. Findo o choque, novas obrigações burocráticas e direitos adquiridos impedem o recuo das despesas.',
    aplicabilidadePratica: 'A resposta fiscal brasileira e maranhense à pandemia de COVID-19: os auxílios emergenciais e despesas hospitalares expandiram os orçamentos e criaram uma expectativa social permanente por transferências maiores de renda mínima.',
    equacaoOuRegra: 'G_{p\\acute{o}s-choque} > G_{pr\\acute{e}-choque} \\quad (\\text{Catraca\\ Or\\c{c}ament\\acute{a}ria})',
    conexoes: ['Z-01.01', 'Z-01.04', 'Z-09.02'],
    referenciaBibliografica: 'Peacock & Wiseman (1961, The Growth of Public Expenditure in the UK); Giambiagi (2011)',
    tags: ['#PeacockWiseman', '#EfeitoDeslocamento', '#EfeitoCatraca', '#CrisesFiscais']
  },
  {
    id: 'Z-02.04',
    aulaNumero: 2,
    conceito: 'Bens Meritórios e Deméritos na Visão de Musgrave',
    teseCentral: 'Bens meritórios são aqueles cuja provisão é incentivada pelo Estado com base em preferências sociais informadas que superam a miopia ou a falta de informação dos próprios indivíduos.',
    fundamentacaoTeorica: 'Richard Musgrave (1959) introduziu o conceito de bens meritórios (ex: vacinação, educação básica, cinto de segurança) e bens de demérito (ex: cigarros, bebidas alcoólicas, jogos de azar). Trata-se de uma exceção fundamentada ao postulado da soberania irrestrita do consumidor, justificando subsídios, obrigatoriedade de consumo ou sobretaxação desincentivadora.',
    aplicabilidadePratica: 'A vacinação infantil obrigatória no SUS e a gratuidade de livros didáticos nas escolas públicas maranhenses são clássicos bens meritórios; o imposto seletivo ("imposto do pecado") da EC 132/2023 sobre fumo e bebidas é o antídoto a bens de demérito.',
    equacaoOuRegra: 'U_{Social}(Q_{m\\acute{e}rito}) > U_{Privada}(Q_{m\\acute{e}rito}) \\implies Subsidiar\\ ou\\ Obrigar',
    conexoes: ['Z-02.01', 'Z-05.01', 'Z-07.03'],
    referenciaBibliografica: 'Musgrave (1959, The Theory of Public Finance); Stiglitz & Rosengard (2016, Cap. 4)',
    tags: ['#BensMeritorios', '#Paternalismo', '#Musgrave', '#SaudePublica', '#Educacao']
  },
  {
    id: 'Z-02.05',
    aulaNumero: 2,
    conceito: 'Fronteira de Possibilidades de Utilidade e o Ponto de Bliss',
    teseCentral: 'A eficiência de Pareto define apenas uma infinidade de combinações ótimas; para escolher uma única alocação socialmente ótima (Ponto de Bliss), a sociedade requer uma Função de Bem-Estar Social (SWF).',
    fundamentacaoTeorica: 'A projeção da Curva de Contrato da Caixa de Edgeworth no plano cartesiano de utilidades (U_A x U_B) gera a Fronteira de Possibilidades de Utilidade (UPF). Bergson (1938) e Samuelson (1947) provaram que o ponto de máxima bem-estar coletivo (Ponto de Bliss) ocorre exclusivamente na tangência entre a UPF e a mais alta curva de indiferença social.',
    aplicabilidadePratica: 'Ilustra por que decisões orçamentárias do PPA e da LOA não podem ser puramente tecnocráticas: escolher entre gastar R$ 100 milhões no ensino infantil ou no agronegócio de exportação exige um juízo político explícito de prioridade distributiva.',
    equacaoOuRegra: '\\max W(U_A, U_B) \\quad \\text{s.a.} \\quad \\Phi(U_A, U_B) = 0 \\implies TMS_{Social} = TMT_{UPF}',
    conexoes: ['Z-02.02', 'Z-02.03', 'Z-10.02'],
    referenciaBibliografica: 'Bergson (1938); Samuelson (1947, Foundations of Economic Analysis); Sanson (2011)',
    tags: ['#PontoDeBliss', '#UPF', '#BergsonSamuelson', '#EconomiaDoBemEstar']
  },
  {
    id: 'Z-03.04',
    aulaNumero: 3,
    conceito: 'Hipótese do Duplo Dividendo da Tributação Ambiental',
    teseCentral: 'A cobrança de tributos pigouvianos sobre atividades poluentes produz dois ganhos simultâneos: melhora a qualidade ambiental (1º dividendo) e arrecada receitas para desonerar tributos distorcivos sobre trabalho e investimento (2º dividendo).',
    fundamentacaoTeorica: 'Formulada por David Pearce (1991) e Lawrence Goulder (1995), a hipótese do duplo dividendo argumenta que a receita de taxas de carbono e multas ecológicas permite ao governo reduzir a perda de peso morto decorrente da incidência do imposto sobre a renda da pessoa física ou folha de pagamentos, gerando ganho líquido macroeconômico.',
    aplicabilidadePratica: 'No Maranhão, a aplicação de royalties e taxas ecológicas sobre exploração mineral e portuária para financiar a redução de taxas cadastrais de microempreendedores locais e desonerações no agronegócio sustentável.',
    equacaoOuRegra: 'Ganho_{L\\acute{i}quido} = \\Delta Qualidade_{Ambiental} + \\Delta Efici\\hat{e}ncia_{Tribut\\acute{a}ria} (\\downarrow t_{trabalho})',
    conexoes: ['Z-03.03', 'Z-06.01', 'Z-07.03'],
    referenciaBibliografica: 'Pearce (1991); Goulder (1995, Environmental and Energy Economics); Stiglitz (2016)',
    tags: ['#DuploDividendo', '#TributacaoVerde', '#Pigou', '#Sustentabilidade']
  },
  {
    id: 'Z-04.04',
    aulaNumero: 4,
    conceito: 'Tarifação em Duas Partes e Regulação de Coase-Hotelling',
    teseCentral: 'Em monopólios naturais com custos médios decrescentes, a cobrança de uma tarifa em duas partes (tarifa fixa de acesso + tarifa variável igual ao custo marginal) concilia eficiência alocativa com equilíbrio financeiro.',
    fundamentacaoTeorica: 'Ronald Coase (1946) e Harold Hotelling (1938) propuseram a tarifa bipartida. Como P = CMg geraria prejuízo operacional à concessionária, o componente variável é fixado em P = CMg (assegurando que o usuário decida consumir até o ponto onde BMg = CMg), enquanto uma taxa fixa de disponibilidade (assinatura mensal) rateia os custos fixos da infraestrutura.',
    aplicabilidadePratica: 'O modelo de contas de energia elétrica da Equatorial Maranhão e de água tratada da CAEMA: o consumidor paga uma taxa de disponibilidade fixa de conexão à rede e uma tarifa por quilowatt-hora ou metro cúbico consumido.',
    equacaoOuRegra: 'Tarifa_{Total} = Taxa\\ Fixa (F / N) + P_{CMg} \\times Q',
    conexoes: ['Z-04.01', 'Z-04.02', 'Z-02.03'],
    referenciaBibliografica: 'Coase (1946, The Marginal Cost Controversy); Viscusi et al. (Economics of Regulation)',
    tags: ['#TarifaEmDuasPartes', '#MonopolioNatural', '#Coase', '#Regulacao']
  },
  {
    id: 'Z-05.04',
    aulaNumero: 5,
    conceito: 'O Equilíbrio de Lindahl e a Troca Voluntária por Bens Públicos',
    teseCentral: 'O mecanismo de Lindahl propõe que os bens públicos sejam financiados por preços personalizados (preços de imposto) onde a contribuição de cada cidadão iguala exatamente o seu benefício marginal.',
    fundamentacaoTeorica: 'Erik Lindahl (1919) formulou um equilíbrio de troca voluntária para bens públicos. Em um modelo com indivíduos A e B, se A pagar uma fração h dos custos do bem público e B pagar (1 - h), o equilíbrio é alcançado no ponto onde ambos concordam unanimemente com a quantidade exata de bem público a ser provida. A soma dos preços de imposto iguala o custo marginal total (Condição de Samuelson).',
    aplicabilidadePratica: 'Associações de produtores rurais ou moradores de condomínios fechados em São Luís que rateiam custos de vigilância armada ou dragagem de canais na proporção direta da metragem de testada de seus lotes.',
    equacaoOuRegra: 'h_A \\times CMg + (1 - h_A) \\times CMg = CMg \\iff BMg_A + BMg_B = CMg',
    conexoes: ['Z-05.01', 'Z-05.02', 'Z-02.02'],
    referenciaBibliografica: 'Lindahl (1919, Die Gerechtigkeit der Besteuerung); Musgrave (1959); Stiglitz (2016)',
    tags: ['#Lindahl', '#PrecosPersonalizados', '#BensPublicos', '#TrocaVoluntaria']
  },
  {
    id: 'Z-05.05',
    aulaNumero: 5,
    conceito: 'Teoria dos Bens de Clube e Congestão Ótima de Buchanan',
    teseCentral: 'Bens de clube são excludentes, mas não-rivais até que a capacidade da infraestrutura atinja a saturação, gerando custos de congestão que determinam o tamanho ótimo da comunidade.',
    fundamentacaoTeorica: 'James M. Buchanan (1965) superou a dicotomia rígida entre bens 100% públicos e 100% privados. Em rodovias com pedágio, pontes ou redes de fibra óptica, a entrada de novos usuários reduz o custo médio por membro, mas após certo limiar gera atrito e lentidão (congestão). O tamanho ótimo do clube equilibra o ganho marginal de diluição de custo com o custo marginal de congestão.',
    aplicabilidadePratica: 'A concessão rodoviária da BR-135 e o serviço de travessia aquaviária de ferry-boat na Baía de São Marcos (Terminal da Ponta da Espera ao Cujupe): serviço tarifado privadamente com gargalos sazonais de capacidade na maré.',
    equacaoOuRegra: '\\frac{\\partial C_{m\\acute{e}dio}}{\\partial N} + \\frac{\\partial Congest\\~{a}o}{\\partial N} = 0 \\implies N^* \\text{(\\O}timo\\ de\\ Clube)',
    conexoes: ['Z-05.01', 'Z-05.03', 'Z-11.02'],
    referenciaBibliografica: 'Buchanan (1965, An Economic Theory of Clubs); Cornes & Sandler (1996)',
    tags: ['#BensDeClube', '#Buchanan', '#Congestao', '#Infraestrutura']
  },
  {
    id: 'Z-06.04',
    aulaNumero: 6,
    conceito: 'Teorema da Invariância da Incidência Tributária (Stiglitz)',
    teseCentral: 'A repartição do ônus econômico final do tributo entre consumidores e produtores independe inteiramente de a obrigação legal recair sobre o comprador ou sobre o vendedor.',
    fundamentacaoTeorica: 'Se o governo tributa a venda de uma mercadoria cobrando R$ 5 do fornecedor, a curva de oferta se desloca para cima em R$ 5. Se tributar a compra cobrando R$ 5 do consumidor, a curva de demanda se desloca para baixo em R$ 5. O novo preço líquido recebido pelo vendedor e o preço total pago pelo comprador são matematicamente rigorosos e idênticos em ambos os arranjos regulatórios.',
    aplicabilidadePratica: 'O debate sobre o ICMS e o futuro IBS sobre combustíveis no Maranhão: transferir formalmente a obrigação jurídica da refinaria para o posto revendedor ou para o motorista no cupom fiscal não altera quem realmente suporta o ônus econômico.',
    equacaoOuRegra: '\\Delta P_{comprador} = \\frac{E_s}{E_s + |E_d|} \\times t \\quad (\\text{Independe\\ do\\ Sujeito\\ Passivo})',
    conexoes: ['Z-07.01', 'Z-06.01', 'Z-08.01'],
    referenciaBibliografica: 'Stiglitz & Rosengard (2016, Cap. 17); Varian (Microeconomia Intermediária)',
    tags: ['#InvarianciaTributaria', '#IncidenciaEconomica', '#Elasticidade', '#Stiglitz']
  },
  {
    id: 'Z-07.04',
    aulaNumero: 7,
    conceito: 'Teorema do Second-Best de Lipsey e Lancaster',
    teseCentral: 'Se uma das condições necessárias para a eficiência ótima de Pareto for violada e não puder ser corrigida, tentar satisfazer as demais condições isoladamente não garante o segundo melhor bem-estar, podendo reduzi-lo.',
    fundamentacaoTeorica: 'Richard Lipsey e Kelvin Lancaster (1956) provaram que as condições de Pareto são interdependentes. Se um mercado na economia já possui uma imperfeição irremovível (ex: monopólio ou imposto pré-existente inalterável), impor marginalmente preços competitivos (P = CMg) em outros setores interconectados pode aumentar a distorção agregada.',
    aplicabilidadePratica: 'Ao planejar incentivos fiscais estaduais para a cadeia de beneficiamento de soja e milho no Maranhão: desonerar apenas um elo da cadeia enquanto outros permanecem sobretaxados pode desarticular fornecedores locais.',
    equacaoOuRegra: '\\text{Se } \\exists\\ i: P_i \\ne CMg_i, \\quad \\text{ent\\~{a}o impor } P_j = CMg_j \\not\\implies \\max W',
    conexoes: ['Z-02.02', 'Z-04.02', 'Z-08.01'],
    referenciaBibliografica: 'Lipsey & Lancaster (1956, The General Theory of Second Best); Stiglitz (2016)',
    tags: ['#SecondBest', '#LipseyLancaster', '#DistorcoesTributarias', '#Eficiencia']
  },
  {
    id: 'Z-08.04',
    aulaNumero: 8,
    conceito: 'Teorema de Diamond e Mirrlees de Eficiência na Produção',
    teseCentral: 'O sistema tributário socialmente ótimo deve preservar a eficiência na produção (igualdade de TMST entre firmas), tributando apenas os bens de consumo final e desonerando bens intermediários e matérias-primas.',
    fundamentacaoTeorica: 'Peter Diamond e James Mirrlees (1971) demonstraram que a economia deve permanecer sempre sobre a Fronteira de Possibilidades de Produção (PPF). Tributos em cascata ou impostos que incidem sobre insumos intermediários criam distorções cumulativas na escolha tecnológica das firmas, destruindo a eficiência produtiva antes mesmo que o produto chegue ao consumidor.',
    aplicabilidadePratica: 'É o alicerce teórico internacional que justifica a eliminação do PIS, COFINS, ICMS e ISS no Brasil pela EC 132/2023, substituindo-os pelo IBS e CBS com princípio da não-cumulatividade plena e crédito financeiro amplo.',
    equacaoOuRegra: 'TMST_{LK}^X = TMST_{LK}^Y \\quad \\text{garantida\\ com\\ isen\\c{c}\\~{a}o\\ de\\ insumos}',
    conexoes: ['Z-08.01', 'Z-07.03', 'Z-06.01'],
    referenciaBibliografica: 'Diamond & Mirrlees (1971, Optimal Taxation and Public Production); Stiglitz (2016)',
    tags: ['#DiamondMirrlees', '#EficienciaNaProducao', '#NaoCumulatividade', '#IBS', '#CBS']
  },
  {
    id: 'Z-09.04',
    aulaNumero: 9,
    conceito: 'Doença dos Custos de Baumol no Setor Público',
    teseCentral: 'Setores intensivos em trabalho artesanal e contato humano (saúde, educação, segurança) sofrem aumentos crônicos de custos porque seus salários sobem acompanhando os ganhos de produtividade da indústria automatizada sem ganho tecnológico equivalente.',
    fundamentacaoTeorica: 'William Baumol (1967) explicou o crescimento secular dos custos do setor público. Enquanto na indústria fabril e na agropecuária de grãos o avanço de maquinários reduz o custo unitário por hora trabalhada, ensinar alunos ou atender pacientes em postos de saúde requer praticamente a mesma quantidade de tempo de médicos e professores, forçando o aumento do orçamento público em proporção ao PIB.',
    aplicabilidadePratica: 'A folha salarial dos professores da rede estadual maranhense e dos policiais militares consome fatias crescentes da arrecadação, mesmo com esforços de informatização da gestão pública.',
    equacaoOuRegra: '\\frac{Custo_{Educa\\c{c}\\~{a}o, Sa\\acute{u}de}}{Custo_{Manufatura}} \\uparrow \\text{ao\\ longo\\ do\\ tempo}',
    conexoes: ['Z-01.04', 'Z-09.02', 'Z-12.03'],
    referenciaBibliografica: 'Baumol (1967, Macroeconomics of Unbalanced Growth); Stiglitz & Rosengard (2016)',
    tags: ['#DoencaDeBaumol', '#SetorPublico', '#CustosCrescentes', '#Produtividade']
  },
  {
    id: 'Z-10.04',
    aulaNumero: 10,
    conceito: 'Logrolling, Votação Estratégica e Pork-Barrel (Buchanan-Tullock)',
    teseCentral: 'A troca explícita de votos entre parlamentares (logrolling) viabiliza a aprovação de projetos de interesse paroquial com benefícios altamente concentrados e custos difusos suportados por todos os contribuintes.',
    fundamentacaoTeorica: 'James Buchanan e Gordon Tullock (1962, The Calculus of Consent) demonstraram que a regra de maioria simples sem intensidade de preferência estimula barganhas legislativas: o Deputado A apoia uma ponte ineficiente no feudo do Deputado B em troca do apoio de B para um aeródromo ineficiente no feudo de A. A soma dos dois projetos gera perda líquida de riqueza social.',
    aplicabilidadePratica: 'As emendas parlamentares individuais e de comissão impositivas no Congresso Nacional e na ALEMA destinadas a obras municipais de pavimentação asfáltica sem prévia avaliação de custo-benefício socioeconômico.',
    equacaoOuRegra: '\\sum Benef\\acute{i}cio_{Local} < \\sum Custo_{Tribut\\acute{a}rio\\ Difuso} \\quad (\\text{Aprovado\\ por\\ Logrolling})',
    conexoes: ['Z-10.01', 'Z-10.03', 'Z-09.01'],
    referenciaBibliografica: 'Buchanan & Tullock (1962, The Calculus of Consent, Cap. 10); Arvate & Biderman (2004)',
    tags: ['#Logrolling', '#PorkBarrel', '#EmendasParlamentares', '#EscolhaPublica']
  },
  {
    id: 'Z-11.04',
    aulaNumero: 11,
    conceito: 'Teorema da Equivalência Fiscal de Mancur Olson',
    teseCentral: 'Existe eficiência alocativa máxima quando os limites geográficos da jurisdição que toma a decisão de gastar coincidem rigorosamente com os limites geográficos dos cidadãos que usufruem do benefício e pagam os custos.',
    fundamentacaoTeorica: 'Mancur Olson (1969) demonstrou que descompassos espaciais geram graves ineficiências: se a jurisdição for menor que a área de benefício, haverá transbordamentos (spillovers) e subprovisão; se a jurisdição for maior, cidadãos pagarão por serviços de que não usufruem (externalidade fiscal e exploração regional). A "equivalência fiscal" requer uma estrutura institucional multicêntrica calibrada para cada raio de bem público.',
    aplicabilidadePratica: 'A gestão de bacias hidrográficas compartilhadas (como a do Rio Itapecuru e Rio Parnaíba no Maranhão) que exige comitês intermunicipais/interestaduais específicos, pois uma única prefeitura não internaliza os efeitos de montante e jusante.',
    equacaoOuRegra: '\\text{Espa\\c{c}o\\ de\\ Benef\\acute{i}cio} = \\text{Espa\\c{c}o\\ de\\ Decis\\~{a}o} = \\text{Espa\\c{c}o\\ Tribut\\acute{a}rio}',
    conexoes: ['Z-11.01', 'Z-11.02', 'Z-05.01'],
    referenciaBibliografica: 'Olson (1969, The Principle of Fiscal Equivalence); Oates (1972, Fiscal Federalism)',
    tags: ['#EquivalenciaFiscal', '#MancurOlson', '#FederalismoFiscal', '#Spillovers']
  }
];
