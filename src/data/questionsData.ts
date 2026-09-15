import { Questao } from '../types';

export const GOOGLE_DRIVE_REPO = 'https://drive.google.com/drive/folders/1egAu3S9uHMBkXJftl-T4pI0g470GRpW3';

export const QUESTOES_BANCO: Questao[] = [
  // ==========================================
  // LOTE DEMONSTRATIVO: 5 NÍVEIS DE DIFICULDADE
  // ==========================================
  {
    id: 'Q-0001',
    unidade: 1,
    aula_relacionada: 2,
    topico: 'Funções Clássicas do Estado de Musgrave',
    dificuldade: 'Baixa',
    enunciado: 'Segundo a clássica taxonomia tripartite proposta por Richard Musgrave (1959), o setor público intervém na economia de mercado por meio de três funções econômicas fundamentais. Assinale a alternativa que descreve corretamente a "Função Alocativa":',
    alternativas: {
      A: 'Consiste na atuação governamental voltada a mitigar as flutuações cíclicas da atividade econômica, garantindo alto nível de emprego e estabilidade de preços.',
      B: 'Corresponde à intervenção do Estado para fornecer bens públicos e corrigir falhas de mercado decorrentes de externalidades e assimetrias de informação, assegurando o uso eficiente dos recursos da sociedade.',
      C: 'Refere-se ao ajuste na distribuição da renda e da riqueza nacional mediante transferências fiscais e tributação progressiva, visando a uma sociedade considerada mais justa.',
      D: 'Representa a prerrogativa exclusiva do Banco Central na definição da taxa básica de juros e da meta de inflação para equalizar o balanço de pagamentos.',
      E: 'Limita-se à garantia estrita da segurança nacional e do poder de polícia, vedada qualquer intervenção na provisão de infraestrutura física.'
    },
    resposta_correta: 'B',
    justificativa: 'Conforme estabelecido por Musgrave (1959) e reiterado por Sanson (2011, Unidade 1) e Giambiagi & Além (2011, Cap. 1), a Função Alocativa justifica-se pela presença de falhas no mecanismo de preços (bens públicos, externalidades e monopólios naturais), cabendo ao Estado direcionar a alocação de recursos onde o mercado privado opera com sub-ótimo de Pareto.',
    referencia_bibliografica: 'Musgrave, R. (1959). The Theory of Public Finance; Sanson, J. R. (2011, p. 14-22); Giambiagi & Além (2011, Cap. 1).'
  },
  {
    id: 'Q-0002',
    unidade: 2,
    aula_relacionada: 5,
    topico: 'Tipologia de Bens e Rivalidade/Excludibilidade',
    dificuldade: 'Média-Baixa',
    enunciado: 'A microeconomia do setor público classifica os bens de acordo com dois atributos essenciais: rivalidade no consumo e excludibilidade no acesso. A respeito da distinção conceitual entre Bens Públicos Puros e Bens de Clube (ou de Tarifário), assinale a opção correta:',
    alternativas: {
      A: 'Bens públicos puros são rivais e não excludentes; bens de clube são não rivais e não excludentes.',
      B: 'Bens públicos puros são não rivais e não excludentes; já os bens de clube caracterizam-se pela não rivalidade (até o ponto de congestionamento) associada à viabilidade técnica de excludibilidade.',
      C: 'Bens de clube sofrem necessariamente da tragédia dos comuns devido à impossibilidade de exclusão de usuários não pagantes.',
      D: 'A defesa nacional é um bem de clube típico, pois somente cidadãos alistados têm acesso aos benefícios da segurança territorial.',
      E: 'A transmissão de sinal de televisão por assinatura codificado via satélite exemplifica um recurso comum de livre acesso.'
    },
    resposta_correta: 'B',
    justificativa: 'De acordo com Samuelson (1954) e Stiglitz & Rosengard (2016, Cap. 5), um bem público puro apresenta não rivalidade estrita (o consumo de um agente não reduz a disponibilidade para os demais) e não excludibilidade (custo proibitivo para excluir free-riders). Os bens de clube (Buchanan, 1965) possuem consumo não rival entre seus membros, porém com exclusão exequível por preço ou barreira física.',
    referencia_bibliografica: 'Samuelson, P. (1954). Pure Theory of Public Expenditure; Buchanan, J. (1965). An Economic Theory of Clubs; Stiglitz & Rosengard (2016, Cap. 5).'
  },
  {
    id: 'Q-0003',
    unidade: 2,
    aula_relacionada: 3,
    topico: 'Teorema de Coase e Custos de Transação',
    dificuldade: 'Média',
    enunciado: 'Considere um litígio entre uma destilaria de álcool que emite efluentes e uma associação de pescadores artesanais ribeirinhos. De acordo com o Teorema de Coase (1960), a negociação privada entre as partes conduzirá a uma alocação socialmente eficiente do uso do rio, INDEPENDENTEMENTE de a quem a lei atribua originariamente o direito de propriedade sobre as águas, desde que:',
    alternativas: {
      A: 'O governo estabeleça previamente um imposto pigouviano com alíquota exatamente igual ao custo marginal externo de despoluição.',
      B: 'Os direitos de propriedade estejam claramente delimitados, as preferências sejam transparentes e os custos de transação (busca, barganha e monitoramento) sejam estritamente nulos ou desprezíveis.',
      C: 'A associação de pescadores possua poder de mercado monopolista para impor o teto de emissões à destilaria.',
      D: 'O Judiciário arbitre o valor indenizatório com base no Segundo Teorema Fundamental da Economia do Bem-Estar.',
      E: 'Haja um número infinito de agentes econômicos em ambos os polos da disputa com assimetria de informação.'
    },
    resposta_correta: 'B',
    justificativa: 'Em "The Problem of Social Cost" (1960), Ronald Coase demonstra que, na ausência de custos de transação e com direitos de propriedade perfeitamente atribuídos e protegidos, as partes internalizam o dano recíproco mediante compensações bilaterais, atingindo a fronteira de Pareto sem necessidade de coerção regulatória direta (Arvate & Biderman, 2004).',
    referencia_bibliografica: 'Coase, R. H. (1960). The Problem of Social Cost; Arvate & Biderman (2004, Teoria das Finanças Públicas, Cap. 2).'
  },
  {
    id: 'Q-0004',
    unidade: 3,
    aula_relacionada: 9,
    topico: 'Modelo de Burocracia de Niskanen',
    dificuldade: 'Média-Alta',
    enunciado: 'Na Teoria da Escolha Pública (Public Choice), William Niskanen (1971) desenvolveu o modelo econômico da burocracia governamental, rompendo com o paradigma weberiano do funcionário público benevolentemente neutro. Ao comparar a alocação de equilíbrio alcançada por um burocrata maximizador de orçamento com o ótimo social de Pareto, constata-se que o burocrata:',
    alternativas: {
      A: 'Opera no ponto onde o Benefício Marginal se iguala ao Custo Marginal (BMg = CMg), garantindo o máximo excedente líquido para a sociedade.',
      B: 'Expande a provisão do serviço público até o nível em que o Benefício Total da agência iguala seu Custo Total (BT = CT), absorvendo todo o excedente do consumidor e gerando sobreoferta sistemática.',
      C: 'Minimiza o orçamento operacional para favorecer o pagamento de dividendos orçamentários diretos aos legisladores.',
      D: 'Fixa a produção no nível ótimo de Ramsey, eliminando qualquer peso morto decorrente da assimetria informacional perante o Parlamento.',
      E: 'Restringe artificialmente a oferta do serviço a fim de operar sob lucro monopolista transferível para a iniciativa privada.'
    },
    resposta_correta: 'B',
    justificativa: 'Niskanen (1971) e Buchanan & Tullock (1962) modelam o burocrata com função utilidade dependente de poder, prestígio e remuneração indireta, fatores proporcionais ao tamanho do seu orçamento. Usando seu monopólio de informação técnica frente ao Parlamento, ele propõe orçamentos em bloco (take-it-or-leave-it), expandindo a produção até que BT = CT (Benefício Líquido = 0), quase duplicando o tamanho ótimo social onde BMg = CMg.',
    referencia_bibliografica: 'Niskanen, W. A. (1971). Bureaucracy and Representative Government; Arvate & Biderman (2004, Cap. 10); Stiglitz (2000, p. 195-208).'
  },
  {
    id: 'Q-0005',
    unidade: 3,
    aula_relacionada: 10,
    topico: 'Teorema da Impossibilidade de Arrow',
    dificuldade: 'Alta',
    enunciado: 'No contexto da agregação de preferências sociais e da Teoria da Escolha Pública, o Teorema da Impossibilidade de Kenneth Arrow (1951, 1963) demonstra matematicamente que nenhuma regra de decisão coletiva ou sistema de votação pode satisfazer simultaneamente um conjunto mínimo de axiomas democráticos razoáveis. A violação do axioma da "Independência das Alternativas Irrelevantes" (IIA) manifesta-se quando:',
    alternativas: {
      A: 'A preferência estrita de um único indivíduo impõe-se de forma sistemática e compulsória sobre as preferências agregadas de todos os demais membros da sociedade.',
      B: 'A introdução ou exclusão de uma terceira opção de escolha altera a ordenação relativa de preferência social entre duas alternativas originárias já analisadas.',
      C: 'O processo decisório por regra de maioria conduz obrigatoriamente a uma alocação de recursos que não satisfaz a Condição de Otimalidade de Pareto.',
      D: 'As preferências individuais revelam-se intransitivas no nível psicológico fundamental, inviabilizando a existência do Equilíbrio de Nash no jogo eleitoral.',
      E: 'O sistema eleitoral gera um ciclo de Condorcet exclusivamente em votações com apenas dois candidatos em disputa.'
    },
    resposta_correta: 'B',
    justificativa: 'Segundo a demonstração formal de Arrow (1963) e discussões em Arvate & Biderman (2004, p. 235-248) e Downs (1999), o axioma IIA estipula que a escolha social entre a alternativa X e a alternativa Y deve depender estritamente de como cada cidadão ordena X versus Y individualmente. Se o surgimento de um candidato Z (uma alternativa irrelevante para a disputa estrita entre X e Y) inverter a vitória entre X e Y (como ocorre com frequência em contagens de Borda), a regra de agregação viola o postulado da IIA.',
    referencia_bibliografica: 'Arrow, K. J. (1963). Social Choice and Individual Values; Downs, A. (1999). Uma Teoria Econômica da Democracia; Arvate & Biderman (2004, p. 235-248).'
  },

  // =========================================================================
  // QUESTÕES ADICIONAIS EXPANDIDAS COBRINDO AS 12 AULAS E OS TRÊS MÓDULOS
  // =========================================================================
  {
    id: 'Q-0006',
    unidade: 1,
    aula_relacionada: 1,
    topico: 'Evolução do Pensamento e Falhas de Mercado',
    dificuldade: 'Baixa',
    enunciado: 'Na evolução histórica da Teoria das Finanças Públicas, a transição da visão do Estado Mínimo clássico (Adam Smith) para o modelo de Bem-Estar Social do pós-Segunda Guerra deveu-se fundamentalmente à:',
    alternativas: {
      A: 'Eliminação da cobrança de impostos indiretos nos países desenvolvidos.',
      B: 'Reconhecimento sistemático da existência de falhas de mercado (crises cíclicas, monopólios, desemprego e pobreza) que a "mão invisível" não é capaz de corrigir espontaneamente.',
      C: 'Criação do Banco Mundial com o objetivo de centralizar a arrecadação tributária global.',
      D: 'Substituição integral da moeda fiduciária pelo padrão-ouro multilateral.',
      E: 'Extinção do debate entre intervenção governamental e livre iniciativa.'
    },
    resposta_correta: 'B',
    justificativa: 'Giambiagi & Além (2011, Cap. 1) e Matias-Pereira (2018, Cap. 1) salientam que as crises do século XX (notadamente a Grande Depressão de 1929) demonstraram a incapacidade do mercado autorregulado de garantir pleno emprego e distribuição equitativa, legitimando a atuação ativa das finanças públicas modernas.',
    referencia_bibliografica: 'Giambiagi, F. & Além, A. C. (2011). Finanças Públicas, Cap. 1; Matias-Pereira, J. (2018, Cap. 1).'
  },
  {
    id: 'Q-0007',
    unidade: 1,
    aula_relacionada: 2,
    topico: 'Caixa de Edgeworth e Teoremas do Bem-Estar',
    dificuldade: 'Média-Alta',
    enunciado: 'Na análise microeconômica do equilíbrio geral através da Caixa de Edgeworth, os pontos situados sobre a Curva de Contrato de Consumo caracterizam-se geometricamente pela:',
    alternativas: {
      A: 'Interseção perpendicular das restrições orçamentárias dos dois consumidores em autarquia.',
      B: 'Tangência entre as curvas de indiferença dos dois indivíduos, implicando igualdade entre suas Taxas Marginais de Substituição (TMS_A = TMS_B).',
      C: 'Igualdade matemática entre o Produto Interno Bruto e a Carga Tributária Bruta.',
      D: 'Nulidade dos preços relativos dos dois bens na economia sem moeda.',
      E: 'Taxa Marginal de Transformação estritamente superior ao custo unitário dos insumos de capital.'
    },
    resposta_correta: 'B',
    justificativa: 'Conforme Stiglitz & Rosengard (2016, Cap. 3) e Sanson (2011), o Primeiro Teorema do Bem-Estar estabelece que o equilíbrio concorrencial é Pareto-eficiente. Na Caixa de Edgeworth, a eficiência na troca exige a igualdade das taxas marginais de substituição subjetivas de todos os indivíduos com a razão dos preços de mercado (TMS_xy^A = TMS_xy^B = Px/Py).',
    referencia_bibliografica: 'Stiglitz, J. E. & Rosengard, J. K. (2016). Economics of the Public Sector, Cap. 3; Sanson, J. R. (2011).'
  },
  {
    id: 'Q-0008',
    unidade: 2,
    aula_relacionada: 4,
    topico: 'Monopólio Natural e Teoria do Second Best',
    dificuldade: 'Média',
    enunciado: 'Em indústrias caracterizadas como monopólios naturais (subaditividade de custos e economias de escala com Custos Marginais decrescentes e inferiores aos Custos Médios), impor a precificação de primeiro melhor (Preço = Custo Marginal) gera:',
    alternativas: {
      A: 'Lucros econômicos extraordinários para a concessionária monopolista.',
      B: 'Déficit financeiro operacional contínuo (prejuízo da firma), exigindo subsídios fiscais governamentais ou adoção da precificação de Custo Médio (Second Best).',
      C: 'Ineficiência alocativa superior à do monopólio não regulado desimpedido.',
      D: 'Aumento imediato do peso morto tributário em bens perfeitamente inelásticos.',
      E: 'Eliminação da assimetria informacional entre o regulador e a empresa concessionária.'
    },
    resposta_correta: 'B',
    justificativa: 'Quando o Custo Médio (CMe) é estritamente decrescente, o Custo Marginal (CMg) situa-se abaixo do CMe. Se o regulador obriga P = CMg, a receita unitária é inferior ao custo unitário (P < CMe), gerando prejuízo crônico. O regulador adota frequentemente a regra de Second Best (P = CMe com lucro normal zero) ou tarifa bipartida (Stiglitz & Rosengard, 2016, Cap. 8; Arrow, 1996).',
    referencia_bibliografica: 'Stiglitz & Rosengard (2016, Cap. 8); Arrow, K. (1996); Arvate & Biderman (2004, p. 23).'
  },
  {
    id: 'Q-0009',
    unidade: 4,
    aula_relacionada: 6,
    topico: 'Peso Morto de Harberger e Eficiência Tributária',
    dificuldade: 'Média',
    enunciado: 'O triângulo do "Peso Morto" (Deadweight Loss) demonstrado por Arnold Harberger mede a perda líquida de bem-estar provocada pela distorção tributária nos preços relativos. De acordo com a teoria neoclássica da tributação, o peso morto de um imposto específico:',
    alternativas: {
      A: 'Diminui quadraticamente com a elevação da alíquota do imposto.',
      B: 'Aumenta na razão direta do quadrado da alíquota tributária (DWL ∝ t²) e proporcionalmente à elasticidade-preço da demanda e da oferta do bem taxado.',
      C: 'Ocorre exclusivamente sobre bens com demanda perfeitamente inelástica (elasticidade zero).',
      D: 'É integralmente restituído aos cofres públicos sob a forma de arrecadação adicional.',
      E: 'Não depende da elasticidade de substituição entre consumo presente e poupança.'
    },
    resposta_correta: 'B',
    justificativa: 'Rosen (1998, p. 302-325) e Arvate & Biderman (2004, Cap. 7) demonstram a fórmula do triângulo de Harberger: DWL ≈ 0.5 · η · P · Q · t². O peso morto cresce com o quadrado da alíquota t (dobrar a alíquota quadruplica o peso morto) e é tão maior quanto maiores forem as elasticidades de mercado η.',
    referencia_bibliografica: 'Rosen, H. S. (1998). Public Finance, p. 302-325; Harberger, A. (1964); Arrow, Bowles & Durlauf (2000, Cap. 8).'
  },
  {
    id: 'Q-0010',
    unidade: 4,
    aula_relacionada: 8,
    topico: 'Regra de Ramsey de Tributação Ótima',
    dificuldade: 'Alta',
    enunciado: 'A clássica Regra da Elasticidade Inversa formulada por Frank Ramsey (1927) para a tributação ótima indireta de mercadorias estabelece que, para minimizar o peso morto agregado na arrecadação de uma dada meta de receita:',
    alternativas: {
      A: 'As alíquotas de imposto devem incidir com maior intensidade sobre os bens de luxo com demanda altamente elástica.',
      B: 'As alíquotas devem ser inversamente proporcionais às elasticidades-preço de demanda dos bens, tributando mais pesadamente mercadorias essenciais e inelásticas, gerando um trade-off clássico entre eficiência alocativa e equidade distributiva.',
      C: 'Todos os bens de consumo final devem ser taxados sob uma única alíquota ad valorem estritamente uniforme.',
      D: 'O imposto sobre o capital produtivo deve ser superior ao imposto sobre o trabalho não qualificado.',
      E: 'A carga tributária deve concentrar-se exclusivamente em bens intermediários e insumos industriais.'
    },
    resposta_correta: 'B',
    justificativa: 'Ramsey (1927) provou matematicamente que a minimização da perda de peso morto exige que a redução percentual compensada na quantidade demandada seja igual para todos os bens (ti · εi = constante). Em bens sem cruzamento de demanda, isso resulta em ti ∝ 1/εi: bens mais inelásticos (alimentos, remédios) recebem maior alíquota, o que pode agravar a regressividade social se não houver correções distributivas (Stiglitz & Rosengard, 2016, Cap. 18; Arvate & Biderman, 2004, p. 195).',
    referencia_bibliografica: 'Ramsey, F. P. (1927). A Contribution to the Theory of Taxation; Stiglitz & Rosengard (2016, Cap. 18); Arvate & Biderman (2004, p. 182-210).'
  },
  {
    id: 'Q-0011',
    unidade: 4,
    aula_relacionada: 7,
    topico: 'Carga Tributária e Incidência Fiscal no Brasil',
    dificuldade: 'Média-Baixa',
    enunciado: 'Ao analisar a estrutura da Carga Tributária Bruta (CTB) brasileira em comparação com os países membros da OCDE, a literatura econômica especializada (Giambiagi & Além, 2000/2011) destaca como traço marcante:',
    alternativas: {
      A: 'A forte predominância da tributação sobre renda, lucros e patrimônio em detrimento da tributação sobre o consumo.',
      B: 'A elevadíssima participação dos tributos indiretos incidentes sobre bens e serviços (ICMS, PIS/Cofins, IPI, ISS), gerando um perfil de incidência tributária regressivo sobre as famílias de menor renda.',
      C: 'A inexistência de contribuições sociais vinculadas à Seguridade Social.',
      D: 'Uma carga tributária global historicamente inferior a 15% do Produto Interno Bruto.',
      E: 'A ausência de cumulatividade no sistema tributário anterior à reforma tributária de 2023.'
    },
    resposta_correta: 'B',
    justificativa: 'Giambiagi & Além (2000, p. 145-170; 2011) apontam que no Brasil quase metade da arrecadação total advém de tributos sobre o consumo, enquanto a média da OCDE concentra-se em impostos sobre a renda pessoal e lucros corporativos. Essa configuração onera proporcionalmente mais a renda dos estratos mais vulneráveis.',
    referencia_bibliografica: 'Giambiagi, F. & Além, A. C. (2000/2011). Finanças Públicas: Teoria e Prática no Brasil, p. 145-170.'
  },
  {
    id: 'Q-0012',
    unidade: 5,
    aula_relacionada: 11,
    topico: 'Federalismo Fiscal e Modelo de Tiebout',
    dificuldade: 'Média',
    enunciado: 'O modelo de Charles Tiebout (1956), denominado na literatura como "Votando com os Pés" (Voting with your feet), sugere que a descentralização fiscal na esfera municipal é capaz de atingir uma provisão eficiente de bens públicos locais porque:',
    alternativas: {
      A: 'O governo central fixa compulsoriamente os mesmos pacotes tributários para todas as cidades da federação.',
      B: 'Os cidadãos possuem mobilidade espacial perfeita e revelam suas preferências ao migrar para a localidade que oferece a combinação ótima de impostos locais e serviços públicos condizente com seu padrão de utilidade.',
      C: 'O imposto sobre valor agregado é recolhido e rateado linearmente por habitante.',
      D: 'Os municípios operam sob economias de escala idênticas às da defesa aeroespacial federal.',
      E: 'A livre circulação de capitais anula a capacidade dos municípios de cobrar taxas imobiliárias.'
    },
    resposta_correta: 'B',
    justificativa: 'Tiebout (1956) e Oates (1972) formularam a alternativa competitiva de mercado para os bens públicos locais: a diversidade de governos subnacionais permite aos cidadãos-consumidores "comprar" o pacote fiscal preferido por meio de sua escolha de residência, superando o problema do carona inerente aos bens públicos nacionais.',
    referencia_bibliografica: 'Tiebout, C. M. (1956). A Pure Theory of Local Expenditures; Oates, W. E. (1972). Fiscal Federalism; Matias-Pereira (2018, Cap. 12).'
  },
  {
    id: 'Q-0013',
    unidade: 5,
    aula_relacionada: 12,
    topico: 'Efeito Flypaper e Transferências Constitucionais',
    dificuldade: 'Média-Alta',
    enunciado: 'Em estudos empíricos sobre federalismo fiscal brasileiro, a expressão "Efeito Flypaper" (o dinheiro gruda onde ele cai) designa a constatação econométrica de que:',
    alternativas: {
      A: 'O aumento de transferências intergovernamentais incondicionais (como o Fundo de Participação dos Municípios - FPM) estimula um aumento nos gastos públicos locais sensivelmente maior do que um aumento equivalente na renda privada dos munícipes.',
      B: 'As verbas destinadas à educação básica no FUNDEB são integralmente convertidas em abatimento de IPTU para os contribuintes.',
      C: 'A dívida pública dos estados da federação é zerada automaticamente a cada ciclo eleitoral de quatro anos.',
      D: 'A guerra fiscal do ICMS atrai capitais industriais sem qualquer perda de receita arrecadatória para o estado de origem.',
      E: 'Os gastos públicos das capitais são imunes aos cortes orçamentários exigidos pela Lei de Responsabilidade Fiscal.'
    },
    resposta_correta: 'A',
    justificativa: 'Conforme analisado por Oliveira in Arvate & Biderman (2004, p. 415-442) e literatura de federalismo fiscal, a teoria microeconômica convencional previa que uma transferência em bloco seria tratada como um choque de renda na comunidade. Na prática observada, os burocratas e gestores locais expandem a despesa pública local numa magnitude até 5 vezes superior à propensão marginal a consumir a partir da renda própria dos contribuintes.',
    referencia_bibliografica: 'Oliveira, F. A. in Arvate & Biderman (2004, p. 415-442); World Bank (1997).'
  },
  {
    id: 'Q-0014',
    unidade: 3,
    aula_relacionada: 10,
    topico: 'Teorema do Eleitor Mediano de Anthony Downs',
    dificuldade: 'Média-Baixa',
    enunciado: 'No modelo espacial de competição eleitoral bipartidária proposto por Anthony Downs (1957, 1999), assumindo preferências unidimensionais e unimodais (single-peaked) dos eleitores, a estratégia dominante dos partidos políticos que buscam maximizar votos é:',
    alternativas: {
      A: 'Adotar plataformas ideologicamente extremadas para fidelizar as minorias mais ativistas.',
      B: 'Convergirem suas propostas de política pública em direção à posição de preferência do "Eleitor Mediano", situado no centro da distribuição de preferências da população.',
      C: 'Renunciar à disputa eleitoral quando houver dispersão na variância dos eleitores.',
      D: 'Propor orçamentos fiscais estritamente deficitários em todos os cenários.',
      E: 'Substituir a regra de maioria simples pela regra da unanimidade de Wicksell.'
    },
    resposta_correta: 'B',
    justificativa: 'Anthony Downs (1999, Cap. 8) demonstra que, com dois partidos disputando votos em um espectro unidimensional e eleitores com preferências de pico único, o candidato que se posicionar exatamente na mediana das preferências assegura mais de 50% dos votos, pois vence o adversário em qualquer lado que este se posicione fora da mediana.',
    referencia_bibliografica: 'Downs, A. (1999). Uma Teoria Econômica da Democracia, Cap. 2, 3 e 8; Arvate & Biderman (2004, Cap. 9).'
  },
  {
    id: 'Q-0015',
    unidade: 2,
    aula_relacionada: 5,
    topico: 'Condição de Samuelson para Bens Públicos',
    dificuldade: 'Alta',
    enunciado: 'A provisão eficiente de um bem público puro difere radicalmente daquela de um bem privado comum. Enquanto para bens privados a eficiência de Pareto requer a igualdade das Taxas Marginais de Substituição individuais com a Taxa Marginal de Transformação (TMS_i = TMT), a clássica "Condição de Samuelson" (1954) para bens públicos estabelece que:',
    alternativas: {
      A: 'A soma vertical das Taxas Marginais de Substituição de todos os indivíduos da sociedade deve se igualar à Taxa Marginal de Transformação (∑ TMS_i = TMT).',
      B: 'A soma horizontal das quantidades demandadas deve superar o Custo Médio de longo prazo.',
      C: 'A Taxa Marginal de Substituição do indivíduo mais rico deve cobrir o custo total de provisão do bem.',
      D: 'O preço de equilíbrio deve ser fixado estritamente acima do custo marginal para evitar o congestionamento.',
      E: 'O provimento de bens públicos deve ser financiado exclusivamente por meio de emissão de moeda fiduciária sem respaldo fiscal.'
    },
    resposta_correta: 'A',
    justificativa: 'Paul Samuelson (1954) deduziu formalmente que, devido à não rivalidade, uma unidade adicional do bem público beneficia todos os cidadãos simultaneamente. Logo, o benefício social marginal é a soma vertical das avaliações marginais de todos os membros da sociedade (∑ TMS_i), que em equilíbrio ótimo de Pareto deve igualar o custo social marginal de produzi-la (TMT).',
    referencia_bibliografica: 'Samuelson, P. A. (1954). The Pure Theory of Public Expenditure; Stiglitz (2000, p. 128-154); Arvate & Biderman (2004, p. 45-62).'
  }
];

export const DISTRIBUICAO_QUESTOES = [
  { nivel: 'Baixa', percentual: 20, descricao: 'Questões conceituais diretas de definição e vocabulário econômico' },
  { nivel: 'Média-Baixa', percentual: 25, descricao: 'Diferenciação entre conceitos teóricos e classificações clássicas' },
  { nivel: 'Média', percentual: 30, descricao: 'Aplicação prática em cenários econômicos, fiscais e institucionais' },
  { nivel: 'Média-Alta', percentual: 15, descricao: 'Análise comparativa entre modelos, escolas e teoremas microeconômicos' },
  { nivel: 'Alta', percentual: 10, descricao: 'Problemas complexos de política pública, derivações formais e teoremas centrais' }
];
