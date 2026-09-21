export interface OpcaoDilema {
  id: string;
  rotulo: string;
  descricao: string;
  consequencia: string;
  avaliacao: 'Ótima Escolha' | 'Solução com Trade-off Crítico' | 'Ineficiente ou com Risco de Captura';
  diagnostico: string;
}

export interface DilemaPoliticaPublica {
  titulo: string;
  contexto: string;
  perguntaDecisao: string;
  opcoes: OpcaoDilema[];
}

export interface DesafioInterativo {
  enunciado: string;
  alternativas: string[];
  indiceCorreto: number;
  explicacao: string;
  dica: string;
}

export interface AulaInterativaInfo {
  aulaNumero: number;
  dilema: DilemaPoliticaPublica;
  desafio: DesafioInterativo;
  simuladoresSugeridos: string[];
  metaAprendizado: string;
}

export const AULAS_INTERATIVAS_DATA: Record<number, AulaInterativaInfo> = {
  1: {
    aulaNumero: 1,
    metaAprendizado: 'Diferenciar o papel alocativo, distributivo e estabilizador do Estado e calibrar o orçamento anticíclico.',
    simuladoresSugeridos: ['musgrave', 'ricardian'],
    dilema: {
      titulo: 'O Dilema da Calibração Orçamentária no Estado do Maranhão',
      contexto: 'Durante uma desaceleração econômica no Maranhão com queda na arrecadação do ICMS, o governo estadual precisa decidir como destinar R$ 2 bilhões de superávit de anos anteriores.',
      perguntaDecisao: 'Como Secretário de Estado da Fazenda e do Planejamento, qual destinação orçamentária você priorizaria?',
      opcoes: [
        {
          id: 'A',
          rotulo: 'Priorizar Função Alocativa (Obras de Infraestrutura e Portos)',
          descricao: 'Investir 75% dos recursos na expansão da infraestrutura viária e logística no entorno do Porto do Itaqui e saneamento básico.',
          consequencia: 'Aumenta o PIB potencial e a produtividade de longo prazo, mas tem efeito amortecedor lento sobre a pobreza imediata no curto prazo.',
          avaliacao: 'Solução com Trade-off Crítico',
          diagnostico: 'A função alocativa gera bens semipúblicos com altas externalidades positivas na produtividade, expandindo a capacidade de longo prazo do Estado.'
        },
        {
          id: 'B',
          rotulo: 'Priorizar Função Distributiva (Transferências Diretas de Renda)',
          descricao: 'Canalizar 80% do montante para programas estaduais complementares de transferência de renda e segurança alimentar para famílias no CadÚnico.',
          consequencia: 'Reduz instantaneamente a desigualdade extrema e o índice de Gini, mas não cria ativos físicos permanentes.',
          avaliacao: 'Solução com Trade-off Crítico',
          diagnostico: 'A função distributiva atua sobre a utilidade marginal decrescente da renda dos vulneráveis, aumentando o bem-estar social agregado.'
        },
        {
          id: 'C',
          rotulo: 'Composição Ótima de Musgrave (Alocação + Distribuição + Poupança Anticíclica)',
          descricao: 'Dividir em: 45% Alocativa (saneamento e escolas), 35% Distributiva focalizada e 20% Fundo de Estabilização Fiscal.',
          consequencia: 'Garante investimentos duradouros, alívio aos mais pobres e um colchão de liquidez para amortecer novos choques de receita.',
          avaliacao: 'Ótima Escolha',
          diagnostico: 'Segundo Musgrave (1989), a intervenção pública equilibrada atua simultaneamente nas três dimensões, evitando desequilíbrios crônicos.'
        }
      ]
    },
    desafio: {
      enunciado: 'Segundo a Proposição de Equivalência Ricardiana desenvolvida por Robert Barro (1974), um corte de tributos financiado por emissão de dívida pública terá qual efeito sobre a Demanda Agregada?',
      alternativas: [
        'Aumentará fortemente a demanda pelo efeito multiplicador keynesiano clássico.',
        'Não alterará a demanda agregada, pois as famílias racionais pouparão integralmente o alívio tributário para pagar a dívida futura.',
        'Reduzirá a demanda imediatamente devido à inflação descontrolada.',
        'Eliminará a perda de peso morto de Harberger no sistema financeiro.'
      ],
      indiceCorreto: 1,
      dica: 'Lembre-se da restrição orçamentária intertemporal e da neutralidade ricardiana.',
      explicacao: 'Barro demonstra que se os agentes econômicos possuem expectativas racionais e horizonte intertemporal infinito (altruísmo geracional), a dívida pública é percebida apenas como imposto futuro adiado. As famílias poupam o valor hoje para honrar os tributos futuros, resultando em impacto líquido nulo na demanda agregada.'
    }
  },

  2: {
    aulaNumero: 2,
    metaAprendizado: 'Dominar o equilíbrio geral de Pareto na Caixa de Edgeworth e a conciliação entre eficiência e critérios de justiça distributiva.',
    simuladoresSugeridos: ['edgeworth', 'social_welfare', 'welfare_frontier'],
    dilema: {
      titulo: 'Eficiência de Pareto vs. Equidade na Distribuição de Terras Públicas',
      contexto: 'Um plano estatal de regularização fundiária no sul do Maranhão atinge uma alocação onde qualquer mudança que melhore a situação dos pequenos agricultores familiares prejudicará os grandes produtores exportadores.',
      perguntaDecisao: 'A alocação atual é Pareto-eficiente. O que a Teoria do Bem-Estar prescreve para o formulador de políticas?',
      opcoes: [
        {
          id: 'A',
          rotulo: 'Manter a alocação intocada porque qualquer intervenção viola o Ótimo de Pareto',
          descricao: 'Não realizar nenhuma redistribuição, priorizando a estabilidade dos direitos adquiridos.',
          consequencia: 'Preserva a eficiência alocativa técnica, mas pode perpetuar uma distribuição inicial de dotações extremamente injusta.',
          avaliacao: 'Ineficiente ou com Risco de Captura',
          diagnostico: 'Um ponto Pareto-eficiente pode ser socialmente repulsivo (por exemplo, um único agente deter 99% da riqueza). A eficiência não substitui o juízo ético.'
        },
        {
          id: 'B',
          rotulo: 'Aplicar o 2º Teorema do Bem-Estar: Redistribuir dotações iniciais via transferências lump-sum',
          descricao: 'Redistribuir títulos e transferências neutras sem distorcer preços relativos e deixar o mercado competitivo alcançar o novo equilíbrio ótimo.',
          consequencia: 'Alcança o ponto de bliss social desejado sem destruir os incentivos de produtividade do mercado competitivo.',
          avaliacao: 'Ótima Escolha',
          diagnostico: 'O Segundo Teorema Fundamental do Bem-Estar prova que qualquer alocação Pareto-eficiente pode ser sustentada como equilíbrio competitivo se o Estado ajustar as dotações iniciais de modo não distorcivo.'
        },
        {
          id: 'C',
          rotulo: 'Fixar preços máximos obrigatórios de arrendamento e proibir negociações voluntárias',
          descricao: 'Tabelar administrativamente os contratos para forçar barateamento artificial.',
          consequencia: 'Cria escassez, mercado negro, insegurança jurídica e empurra a economia para fora da Curva de Contrato de Pareto.',
          avaliacao: 'Ineficiente ou com Risco de Captura',
          diagnostico: 'Distorcer preços relativos rompe a igualdade das Taxas Marginais de Substituição (TMS_A ≠ TMS_B), gerando perda pura de bem-estar.'
        }
      ]
    },
    desafio: {
      enunciado: 'Na Caixa de Edgeworth para uma economia com dois consumidores (A e B) e dois bens (X e Y), qual é a condição matemática que define os pontos ao longo da Curva de Contrato de Pareto?',
      alternativas: [
        'TMS_A(X,Y) = TMS_B(X,Y) (Igualdade das Taxas Marginais de Substituição)',
        'Custo Marginal de A = Preço de Venda de B',
        'TMS_A = Preço do Bem X + Preço do Bem Y',
        'Utilidade de A + Utilidade de B = 100%'
      ],
      indiceCorreto: 0,
      dica: 'Pense no ponto de tangência entre as curvas de indiferença dos dois agentes.',
      explicacao: 'Na troca pura, a eficiência de Pareto exige que não haja mais ganhos mútuos de comércio. Isso ocorre quando as curvas de indiferença dos agentes se tangenciam, implicando TMS_A = TMS_B.'
    }
  },

  3: {
    aulaNumero: 3,
    metaAprendizado: 'Avaliar instrumentos de mitigação de externalidades: Teorema de Coase vs Imposto Pigouviano vs Regulação Direta.',
    simuladoresSugeridos: ['coase', 'pigou'],
    dilema: {
      titulo: 'Poluição Atmosférica Industrial e Saúde Comunitária na Grande São Luís',
      contexto: 'Uma usina metalúrgica gera emissão de particulados no ar que afeta 40.000 moradores de bairros vizinhos. Os custos hospitalares comunitários anuais são de R$ 50 milhões, enquanto a instalação de filtros industriais custa R$ 25 milhões à usina.',
      perguntaDecisao: 'Como Secretário de Meio Ambiente e Regulação Econômica, qual solução institucional você aplica?',
      opcoes: [
        {
          id: 'A',
          rotulo: 'Deixar para Negociação Privada Coaseana sem interferência do Estado',
          descricao: 'Esperar que os 40.000 moradores se reúnam espontaneamente para pagar os R$ 25 milhões para a usina instalar os filtros.',
          consequencia: 'Falha completa: com 40.000 moradores, os custos de transação e o problema do carona inviabilizam a barganha coaseana.',
          avaliacao: 'Ineficiente ou com Risco de Captura',
          diagnostico: 'Coase (1960) advertiu que seu teorema só é válido sob custos de transação nulos ou desprezíveis. Em externalidades de massa, os custos de negociação são proibitivos.'
        },
        {
          id: 'B',
          rotulo: 'Imposto Pigouviano sobre Emissões calibrado no Dano Marginal Externo',
          descricao: 'Tributar a usina em R$ 1.250 por tonelada emitida (exatamente o DMg causado à saúde), induzindo-a economicamente a instalar o filtro de R$ 25 milhões.',
          consequencia: 'A usina prefere instalar o filtro porque R$ 25 mi < R$ 50 mi de imposto, alcançando a solução ótima via sistema de preços com flexibilidade técnica.',
          avaliacao: 'Ótima Escolha',
          diagnostico: 'Arthur Pigou (1920) demonstrou que a alíquota ótima t* = DMg iguala o Custo Marginal Privado ao Custo Marginal Social, eliminando o peso morto.'
        },
        {
          id: 'C',
          rotulo: 'Fechamento Imediato da Fábrica por Decreto',
          descricao: 'Interditar permanentemente as atividades produtivas da usina.',
          consequencia: 'Elimina a poluição, mas destrói milhares de empregos industriais e cadeias de fornecedores locais desnecessariamente.',
          avaliacao: 'Solução com Trade-off Crítico',
          diagnostico: 'O objetivo da política pública não é poluição zero a qualquer custo social, mas a quantidade socialmente ótima Q* onde benefício social líquido é maximizado.'
        }
      ]
    },
    desafio: {
      enunciado: 'Segundo o Teorema de Coase (1960), quando os custos de transação são nulos e os direitos de propriedade estão bem definidos:',
      alternativas: [
        'A intervenção do Estado através de impostos é estritamente obrigatória para haver equilíbrio.',
        'A alocação final de recursos será Pareto-eficiente, independentemente de quem seja o titular inicial do direito de propriedade.',
        'O poluidor sempre pagará indenização à vítima em qualquer circunstância.',
        'O equilíbrio de mercado resultará em superprodução ineficiente.'
      ],
      indiceCorreto: 1,
      dica: 'A atribuição do direito afeta a distribuição de riqueza, mas não a eficiência da alocação.',
      explicacao: 'Coase demonstrou que com custos de transação nulos, as partes negociarão até alcançar o ponto eficiente independentemente da titularidade jurídica do direito (poluir vs ar limpo). Apenas a distribuição de renda entre eles é afetada.'
    }
  },

  4: {
    aulaNumero: 4,
    metaAprendizado: 'Compreender a não-rivalidade e não-excludibilidade dos bens públicos puros e a condição de Samuelson.',
    simuladoresSugeridos: ['samuelson', 'monopoly'],
    dilema: {
      titulo: 'Provisão de Faróis e Balizamento Náutico na Baía de São Marcos',
      contexto: 'O tráfego de embarcações na Baía de São Marcos necessita de um sistema moderno de balizamento digital náutico de R$ 30 milhões anuais para evitar encalhes.',
      perguntaDecisao: 'Qual modelo de financiamento e provisão garante a alocação socialmente correta?',
      opcoes: [
        {
          id: 'A',
          rotulo: 'Privatização e Cobrança de Pedágio por Sinal de Rádio/Luz',
          descricao: 'Empresa privada instala o farol e tenta cobrar de navios que avistam o sinal luminoso à distância.',
          consequencia: 'Inexequível devido à não-excludibilidade: navios não pagantes continuam enxergando a luz e usufruindo da navegação segura (free-rider).',
          avaliacao: 'Ineficiente ou com Risco de Captura',
          diagnostico: 'Bens públicos puros não admitem exclusão a custo razoável. O mercado colapsa porque as firmas privadas não conseguem capturar a receita.'
        },
        {
          id: 'B',
          rotulo: 'Provisão Pública Financiada por Tributos Gerais com Base na Condição de Samuelson',
          descricao: 'O Estado provê o balizamento cobrindo o custo através de taxas portuárias obrigatórias ou receita tributária geral.',
          consequencia: 'Garante a segurança de toda a navegação marítima sem excluir nenhum usuário, respeitando a soma vertical das utilidades (∑TMS = TMT).',
          avaliacao: 'Ótima Escolha',
          diagnostico: 'A condição de Samuelson estabelece que, como o bem é não-rival (consumo por um navio não diminui a luz disponível aos outros), a soma das disposições a pagar deve cobrir o custo de provisão.'
        },
        {
          id: 'C',
          rotulo: 'Financiamento Voluntário por Doações de Armadores',
          descricao: 'Abrir um fundo filantrópico para as companhias de navegação contribuírem espontaneamente.',
          consequencia: 'Subprovisão severa: cada armador racional prefere ocultar sua verdadeira disposição a pagar esperando que os concorrentes financiem a obra.',
          avaliacao: 'Ineficiente ou com Risco de Captura',
          diagnostico: 'O problema do carona (free-rider) é dominante em bens públicos sob financiamento voluntário.'
        }
      ]
    },
    desafio: {
      enunciado: 'Qual a principal diferença entre a regra de agregação de demanda para Bens Privados e para Bens Públicos Puros?',
      alternativas: [
        'Bens privados somam verticalmente os preços; bens públicos somam horizontalmente as quantidades.',
        'Bens privados somam horizontalmente as quantidades consumidas ao mesmo preço de mercado; bens públicos somam verticalmente a disposição marginal a pagar (preços) pela mesma quantidade ofertada.',
        'Bens públicos não possuem curva de demanda calculável.',
        'Bens privados não dependem da renda dos consumidores.'
      ],
      indiceCorreto: 1,
      dica: 'Lembre-se da não-rivalidade: a mesma quantidade Q é usufruída conjuntamente por todos.',
      explicacao: 'Para bens privados (rivais), cada indivíduo consome sua parcela (Q = q1 + q2), somando as demandas horizontalmente. Para bens públicos (não-rivais), todos consomem a mesma quantidade total G, e a sociedade agrega verticalmente o que cada um está disposto a pagar: P = P1 + P2, gerando ∑TMS = TMT.'
    }
  },

  5: {
    aulaNumero: 5,
    metaAprendizado: 'Analisar falhas de informação: Seleção Adversa e Risco Moral na estruturação da Seguridade Social.',
    simuladoresSugeridos: ['asymmetric_info', 'monopoly'],
    dilema: {
      titulo: 'Regulação do Sistema de Saúde Complementar vs. Fortalecimento do SUS',
      contexto: 'No mercado privado de planos de saúde, operadoras aumentam drasticamente as mensalidades para idosos e pessoas com doenças preexistentes, expulsando 300.000 usuários para a rede pública de hospitais.',
      perguntaDecisao: 'Qual intervenção regulatória do Estado corrige a falha de seleção adversa?',
      opcoes: [
        {
          id: 'A',
          rotulo: 'Liberar as operadoras para precificar livremente e excluir usuários crônicos',
          descricao: 'Deixar as seguradoras recusarem clientes doentes para maximizar sua lucratividade contábil.',
          consequencia: 'Agrava a espiral da morte, sobrecarrega o SUS e priva os cidadãos mais vulneráveis de proteção securitária básica.',
          avaliacao: 'Ineficiente ou com Risco de Captura',
          diagnostico: 'A seleção adversa (Akerlof, 1970) faz com que o mercado desregulado atenda apenas riscos baixos, deixando os que mais precisam sem cobertura.'
        },
        {
          id: 'B',
          rotulo: 'Proibição de Exclusão por Doença Preexistente + Pooling Solidário + Fortalecimento do SUS',
          descricao: 'Regulamentar a cobertura universal sem exclusões pelas operadoras com mecanismos de câmara de compensação de risco e financiamento robusto do SUS.',
          consequencia: 'Estabiliza a carteira de risco, protege a população idosa e mantém a viabilidade atuarial do sistema híbrido.',
          avaliacao: 'Ótima Escolha',
          diagnostico: 'Mercados de seguro com assimetria de informação exigem agregação mandatória de risco (pooling) e padrões regulatórios para evitar seleção de clientes rentáveis (cream skimming).'
        },
        {
          id: 'C',
          rotulo: 'Abolir a coparticipação em qualquer procedimento médico',
          descricao: 'Determinar que todo exame e consulta seja 100% gratuito sem qualquer taxa moderadora.',
          consequencia: 'Explosão do risco moral (moral hazard): superutilização desnecessária de exames de alto custo gerando déficit atuarial agudo.',
          avaliacao: 'Solução com Trade-off Crítico',
          diagnostico: 'A coparticipação moderada é um instrumento essencial para mitigar o risco moral pós-contratual sem restringir o acesso a cuidados necessários.'
        }
      ]
    },
    desafio: {
      enunciado: 'No contexto da teoria dos contratos e seguros públicos, qual a diferença essencial entre Seleção Adversa e Risco Moral?',
      alternativas: [
        'Seleção Adversa é um problema pós-contratual de ação oculta; Risco Moral é pré-contratual de informação oculta.',
        'Seleção Adversa é um problema pré-contratual de assimetria de informação (tipos ocultos); Risco Moral é um problema pós-contratual de incentivo e comportamento descuidado (ações ocultas).',
        'Ambos os termos são sinônimos perfeitos na economia do setor público.',
        'Risco Moral só ocorre em monopólios estatais.'
      ],
      indiceCorreto: 1,
      dica: 'Pense no momento em que a assimetria atua: antes de assinar o contrato vs depois de assinar o contrato.',
      explicacao: 'A Seleção Adversa decorre de características ocultas prévias (o indivíduo conhece seu estado de saúde melhor que a seguradora). O Risco Moral surge após a celebração do contrato, quando o segurado altera seu comportamento por saber que o custo do sinistro será compartilhado pelo fundo.'
    }
  },

  6: {
    aulaNumero: 6,
    metaAprendizado: 'Distinguir com precisão a incidência formal (de jure) da incidência econômica (de facto) com base nas elasticidades.',
    simuladoresSugeridos: ['tax_incidence', 'harberger'],
    dilema: {
      titulo: 'Incidência do ICMS sobre Óleo Diesel e Transporte Intermunicipal no Maranhão',
      contexto: 'O governo estadual avalia aumentar a alíquota sobre o óleo diesel. O sindicato dos postos de combustíveis argumenta que não pagará o imposto, transferindo 100% do reajuste para o frete dos caminhoneiros e donos de frotas.',
      perguntaDecisao: 'Qual é o verdadeiro padrão de repasse tributário esperado?',
      opcoes: [
        {
          id: 'A',
          rotulo: 'O imposto será pago integralmente por quem emite a nota fiscal (postos de gasolina)',
          descricao: 'A lei determina o posto como substituto tributário, logo ele absorve o ônus econômico integral.',
          consequencia: 'Erro analítico grave: confunde a obrigação formal de recolhimento com a incidência econômica real.',
          avaliacao: 'Ineficiente ou com Risco de Captura',
          diagnostico: 'A incidência legal nunca determina quem suporta o sacrifício financeiro do imposto. As forças de oferta e demanda e as elasticidades relativas governam a partilha.'
        },
        {
          id: 'B',
          rotulo: 'O consumidor de transporte absorve a maior parte devido à extrema inelasticidade do combustível',
          descricao: 'Como o frete de alimentos e insumos essenciais não possui substitutos imediatos no curto prazo (|ε_d| < ε_s), a maior fatia do imposto é repassada no preço final.',
          consequencia: 'Análise correta: o repasse ao consumidor é inversamente proporcional à sua elasticidade de demanda.',
          avaliacao: 'Ótima Escolha',
          diagnostico: 'A regra clássica de incidência estabelece que a fração suportada pelo comprador é ε_s / (ε_s + |ε_d|). Quanto mais inelástica a demanda, maior o fardo sobre o consumidor.'
        },
        {
          id: 'C',
          rotulo: 'Impor um tabelamento que proíba repassar qualquer centavo ao preço da bomba',
          descricao: 'Obrigar os postos a manter o preço anterior por meio de fiscalização policial.',
          consequencia: 'Desabastecimento imediato, fechamento de postos em cidades do interior do Maranhão e criação de mercado paralelo clandestino.',
          avaliacao: 'Ineficiente ou com Risco de Captura',
          diagnostico: 'Controles artificiais de preços com custos elevados destroem o equilíbrio de mercado e geram racionamento forçado.'
        }
      ]
    },
    desafio: {
      enunciado: 'Se a elasticidade-preço da demanda de um bem essencial for |ε_d| = 0,2 e a elasticidade-preço da oferta for ε_s = 1,8, qual grupo arcará com a maior parte de um novo tributo unitário instituído?',
      alternativas: [
        'Os produtores pagarão 90% do tributo.',
        'Os consumidores arcarão com 90% do ônus econômico do tributo (1,8 / [1,8 + 0,2] = 0,90).',
        'O tributo será dividido em exatos 50% para cada parte.',
        'Nenhum dos dois, pois o governo absorve a cobrança.'
      ],
      indiceCorreto: 1,
      dica: 'Aplique a fórmula do repasse tributário ao consumidor: Es / (Es + Ed).',
      explicacao: 'A fração de incidência sobre os consumidores é dada por Es / (Es + |Ed|) = 1,8 / (1,8 + 0,2) = 1,8 / 2,0 = 90%. Como os consumidores têm pouca flexibilidade de substituição (demanda rígida), suportam quase a totalidade da carga.'
    }
  },

  7: {
    aulaNumero: 7,
    metaAprendizado: 'Calcular a perda de peso morto de Harberger e entender a distorção quadrática (t²) na eficiência econômica.',
    simuladoresSugeridos: ['harberger', 'ramsey'],
    dilema: {
      titulo: 'Duplicação de Alíquotas Tributárias vs. Ampliação da Base de Contribuintes',
      contexto: 'Para cobrir um déficit fiscal emergencial de R$ 500 milhões, o Ministério da Fazenda avalia duas alternativas: duplicar a alíquota de um imposto existente de 10% para 20% sobre poucos setores, ou manter a alíquota em 10% e tributar uma base ampla antes isenta.',
      perguntaDecisao: 'Qual opção produz menor perda de eficiência econômica segundo o modelo de Harberger?',
      opcoes: [
        {
          id: 'A',
          rotulo: 'Duplicar a alíquota de 10% para 20% no setor atual',
          descricao: 'Concentrar o esforço de arrecadação nos contribuintes que já estão cadastrados e pagando.',
          consequencia: 'Multiplica a perda de peso morto por quatro! (DWL cresce com t², logo dobrar a alíquota eleva o peso morto em 400%).',
          avaliacao: 'Ineficiente ou com Risco de Captura',
          diagnostico: 'Harberger demonstrou que o custo de bem-estar de um tributo é proporcional ao quadrado da alíquota (DWL ≈ 0,5 · η · t² · P · Q). Alíquotas altas em bases estreitas destroem a eficiência.'
        },
        {
          id: 'B',
          rotulo: 'Base Ampla com Alíquota Moderada e Uniforme (10% sobre todos)',
          descricao: 'Tributar mais agentes com alíquota baixa, eliminando regimes especiais e renúncias setoriais.',
          consequencia: 'Arrecada os R$ 500 milhões com a menor perda de peso morto possível para o sistema econômico nacional.',
          avaliacao: 'Ótima Escolha',
          diagnostico: 'O princípio fundamental da boa tributação preconiza: bases amplas e alíquotas baixas e uniformes minimizam o triângulo de Harberger.'
        },
        {
          id: 'C',
          rotulo: 'Substituir por um imposto confiscatório de 50% sobre bens de luxo importados',
          descricao: 'Sobrecarregar seletivamente as importações de luxo.',
          consequencia: 'Cria evasão maciça, contrabando nos portos e perda drástica de receita e bem-estar.',
          avaliacao: 'Ineficiente ou com Risco de Captura',
          diagnostico: 'Alíquotas extremas geram desincentivos severos e peso morto exponencial sem garantia de arrecadação efetiva.'
        }
      ]
    },
    desafio: {
      enunciado: 'Se a alíquota de um imposto seletivo for triplicada (de t para 3t), o que ocorre com a perda de peso morto de Harberger (DWL), mantidas as demais variáveis constantes?',
      alternativas: [
        'A perda de peso morto triplica (cresce 3 vezes).',
        'A perda de peso morto é multiplicada por nove (3² = 9 vezes maior).',
        'A perda de peso morto cai pela metade.',
        'Permanece inalterada se a demanda for elástica.'
      ],
      indiceCorreto: 1,
      dica: 'Lembre-se da propriedade quadrática do triângulo de Harberger.',
      explicacao: 'A fórmula de Harberger é DWL = 1/2 · η · t² · P0 · Q0. Como a alíquota t entra elevada ao quadrado, triplicar t resulta em (3t)² = 9t², ou seja, a ineficiência cresce 9 vezes. Essa é a razão de economistas defenderem alíquotas moderadas e uniformes.'
    }
  },

  8: {
    aulaNumero: 8,
    metaAprendizado: 'Aplicar a regra da elasticidade inversa de Ramsey, a Curva de Laffer e os pilares da Reforma Tributária (EC 132/2023).',
    simuladoresSugeridos: ['ramsey', 'laffer', 'reforma_tributaria'],
    dilema: {
      titulo: 'Desenho do IBS/CBS na Reforma Tributária: Cesta Básica vs Alíquota Padrão',
      contexto: 'No debate de regulamentação do IBS e da CBS (EC 132/2023), surge a disputa: desonerar 100% dos alimentos da cesta básica (favorecendo a equidade social) ou manter alíquota uniforme para que a alíquota padrão geral da economia seja menor (25% em vez de 27,9%).',
      perguntaDecisao: 'Qual arquitetura de política tributária maximiza o bem-estar e a equidade real?',
      opcoes: [
        {
          id: 'A',
          rotulo: 'Isenção ampla generalizada de alimentos sem qualquer controle de renda',
          descricao: 'Desonerar toda carne nobre, vinhos e queijos finos sob a justificativa de alimentação.',
          consequencia: 'Beneficia desproporcionalmente as famílias mais ricas (que gastam muito mais em valor absoluto com alimentos caros) e força a alíquota padrão da indústria a subir para 29%.',
          avaliacao: 'Ineficiente ou com Risco de Captura',
          diagnostico: 'Desonerações amplas de produtos são regressivas em valor monetário transferido: os 10% mais ricos capturam 40% do subsídio da cesta básica.'
        },
        {
          id: 'B',
          rotulo: 'Cesta Básica Nacional Focada em Alimentos Essenciais + Cashback Direto para Pobres (CadÚnico)',
          descricao: 'Restringir a alíquota zero aos itens básicos indispensáveis à nutrição e devolver 100% da CBS e 20% do IBS diretamente na conta dos beneficiários vulneráveis.',
          consequencia: 'Focalização perfeita: protege os pobres sem inflacionar a alíquota geral da economia, com total transparência e neutralidade produtiva.',
          avaliacao: 'Ótima Escolha',
          diagnostico: 'O modelo de IVA moderno com cashback (devolução personalizada) supera a isenção genérica, conciliando a eficiência de Ramsey com equidade distributiva real.'
        },
        {
          id: 'C',
          rotulo: 'Restaurar a cumulatividade com impostos sobre movimentação financeira em cascata',
          descricao: 'Voltar ao modelo da CPMF para eliminar notas fiscais.',
          consequencia: 'Destrói a competitividade das cadeias produtivas complexas brasileiras, onera exportações e penaliza a indústria nacional.',
          avaliacao: 'Ineficiente ou com Risco de Captura',
          diagnostico: 'Impostos em cascata acumulam resíduos tributários ocultos ao longo da cadeia de valor, violando todos os preceitos de transparência e neutralidade.'
        }
      ]
    },
    desafio: {
      enunciado: 'Segundo a Regra de Ramsey (1927) para minimização da perda de eficiência alocativa em um sistema de tributação sobre o consumo:',
      alternativas: [
        'Todos os bens devem ser tributados com alíquotas exatamente idênticas.',
        'As alíquotas tributárias relativas devem ser inversamente proporcionais às elasticidades-preço de demanda dos bens (t_A / t_B = Ed_B / Ed_A).',
        'Bens de luxo devem ter alíquotas infinitas.',
        'Apenas os produtores de bens intermediários devem recolher tributos.'
      ],
      indiceCorreto: 1,
      dica: 'Para minimizar a distorção nas quantidades consumidas, tribute mais o que os consumidores têm menor capacidade de substituir.',
      explicacao: 'Frank Ramsey provou que para minimizar a perda agregada de peso morto, o imposto deve provocar uma redução percentual equiproporcional na demanda de todos os bens, o que exige alíquotas mais altas em bens de demanda inelástica (Regra da Elasticidade Inversa).'
    }
  },

  9: {
    aulaNumero: 9,
    metaAprendizado: 'Compreender o modelo de burocracia de Niskanen, a troca de votos (logrolling) e a dissipação de recursos por rent-seeking.',
    simuladoresSugeridos: ['niskanen', 'logrolling', 'rent_seeking'],
    dilema: {
      titulo: 'Contenção de Expansão Burocrática e Emendas Parlamentares no Orçamento',
      contexto: 'Em um órgão regulador de transporte, a diretoria solicita um aumento de 40% em seu orçamento anual, prometendo novas fiscalizações. Simultaneamente, deputados propõem aprovar o aumento em troca da liberação de emendas para obras locais em seus distritos eleitorais.',
      perguntaDecisao: 'Como Secretário de Orçamento e Controle Governamental, como você avalia esse processo à luz da Teoria da Escolha Pública?',
      opcoes: [
        {
          id: 'A',
          rotulo: 'Aprovar o pedido integralmente, pois burocratas e políticos são servidores desinteressados do bem comum',
          descricao: 'Confiar na premissa clássica do "déspota esclarecido" benévolo.',
          consequencia: 'Expansão desmedida do aparelho estatal até o ponto de Niskanen onde BT = CT, com sobreoferta de serviços e ineficiência alocativa severa.',
          avaliacao: 'Ineficiente ou com Risco de Captura',
          diagnostico: 'A Escola da Escolha Pública (Buchanan e Niskanen) rejeita o mito do burocrata desinteressado: agentes públicos também respondem a incentivos de maximização de orçamento, poder e prestígio.'
        },
        {
          id: 'B',
          rotulo: 'Instituir Orçamento por Desempenho (Avaliação BMG = CMG) e Transparência em Emendas',
          descricao: 'Exigir comprovação de Benefício Marginal igual a Custo Marginal para cada projeto e vetar emendas sem estudo prévio de viabilidade técnica.',
          consequencia: 'Contém a sobreoferta burocrática, restringe o logrolling predatório e preserva os recursos escassos do contribuinte.',
          avaliacao: 'Ótima Escolha',
          diagnostico: 'Regras constitucionais de controle fiscal e avaliação rigorosa de impacto são os principais antídotos contra as falhas intrínsecas de governo modeladas por Niskanen e Tullock.'
        },
        {
          id: 'C',
          rotulo: 'Permitir a troca de votos livremente sem qualquer divulgação no Portal da Transparência',
          descricao: 'Operar o orçamento secreto para garantir governabilidade rápida.',
          consequencia: 'Multiplicação de projetos ineficientes de benefício concentrado e custo difuso que drenam as contas públicas (pork-barrel politics).',
          avaliacao: 'Ineficiente ou com Risco de Captura',
          diagnostico: 'A opacidade em barganhas orçamentárias potencializa a dissipação de recursos sociais por rent-seeking.'
        }
      ]
    },
    desafio: {
      enunciado: 'No modelo de maximização orçamentária de William Niskanen (1971), em que ponto o burocrata racional busca operar a provisão do serviço público?',
      alternativas: [
        'No ponto socialmente ótimo onde o Benefício Marginal iguala o Custo Marginal (BMg = CMg).',
        'No ponto onde o Benefício Total iguala o Custo Total (BT = CT), resultando em sobreprovisão de serviços.',
        'No ponto de menor orçamento possível para economizar recursos públicos.',
        'No ponto onde o lucro contábil da agência é maximizado.'
      ],
      indiceCorreto: 1,
      dica: 'O burocrata não pode se apropriar do lucro, logo seu incentivo é maximizar o tamanho da agência e do orçamento total.',
      explicacao: 'Niskanen modelou que o burocrata utiliza a assimetria de informação que possui perante o parlamento para ofertar um pacote "tudo ou nada" no ponto de orçamento máximo onde todo o excedente social é absorvido (BT = CT), gerando o dobro da produção eficiente.'
    }
  },

  10: {
    aulaNumero: 10,
    metaAprendizado: 'Entender a competição eleitoral pelo Teorema do Eleitor Mediano e as limitações democráticas do Teorema de Arrow.',
    simuladoresSugeridos: ['downs', 'arrow'],
    dilema: {
      titulo: 'Estratégia Partidária de Gastos Públicos em Ano Eleitoral',
      contexto: 'Dois candidatos disputam a prefeitura de uma capital. O candidato A defende alíquotas extremas e estatização total; o candidato B defende zero serviços públicos e desregulamentação absoluta. Pesquisas mostram que a grande maioria do eleitorado está no centro (preferência moderada por saúde, transporte e escolas).',
      perguntaDecisao: 'O que o Teorema do Eleitor Mediano de Anthony Downs prediz sobre a convergência das plataformas?',
      opcoes: [
        {
          id: 'A',
          rotulo: 'Os partidos manterão suas posições nos extremos e o eleitorado se dividirá 50/50',
          descricao: 'Não haverá ajuste de discurso.',
          consequencia: 'Se um candidato migrar em direção ao centro, capturará imediatamente toda a metade central e vencerá a eleição por ampla maioria.',
          avaliacao: 'Ineficiente ou com Risco de Captura',
          diagnostico: 'Posições extremas são instáveis na presença de um eleitorado mediano centrado em sistemas de maioria simples com preferências unimodais.'
        },
        {
          id: 'B',
          rotulo: 'Convergência Centrípeta em Direção à Preferência do Eleitor Mediano',
          descricao: 'Ambos os concorrentes suavizarão suas plataformas para capturar o eleitor mediano (50º percentil), tornando suas propostas quase indistinguíveis no centro.',
          consequencia: 'Equilíbrio estável de Downs: a plataforma que refletir a preferência do eleitor mediano garante a vitória eleitoral.',
          avaliacao: 'Ótima Escolha',
          diagnostico: 'Anthony Downs (1957) provou que em votações majoritárias com preferências unimodais sobre uma única dimensão, o resultado final coincide exatamente com a preferência do eleitor mediano.'
        },
        {
          id: 'C',
          rotulo: 'O sistema entrará necessariamente em ciclo de Condorcet sem vencedor possível',
          descricao: 'Nenhum resultado pode ser apurado.',
          consequencia: 'Conclusão incorreta: o Teorema de Black e Downs garante que sob preferências unimodais unidimensionais NÃO há ciclos intransitivos.',
          avaliacao: 'Solução com Trade-off Crítico',
          diagnostico: 'Os ciclos de Condorcet modelados por Arrow exigem preferências multimodais ou multidimensionais.'
        }
      ]
    },
    desafio: {
      enunciado: 'O que estabelece o célebre Teorema da Impossibilidade de Kenneth Arrow (1951)?',
      alternativas: [
        'Nenhum governo consegue arrecadar tributos suficientes para pagar suas despesas.',
        'É impossível conceber uma regra de votação democrática que satisfaça simultaneamente condições básicas de racionalidade (Domínio Irrestrito, Não-Ditadura, Eficiência de Pareto, Transitividade e Independência de Alternativas Irrelevantes).',
        'A democracia sempre produz resultados economicamente idênticos aos de uma ditadura.',
        'O eleitor mediano sempre escolhe a pior opção orçamentária.'
      ],
      indiceCorreto: 1,
      dica: 'Arrow investigou os axiomas ideais de agregação democrática de preferências.',
      explicacao: 'Arrow provou matematicamente que nenhuma regra de escolha coletiva baseada em votos ordinais consegue satisfazer conjuntamente os postulados de não-ditadura, transitividade, independência de alternativas irrelevantes e eficiência de Pareto quando há 3 ou mais alternativas.'
    }
  },

  11: {
    aulaNumero: 11,
    metaAprendizado: 'Compreender o Teorema da Descentralização de Oates, o modelo de Tiebout ("votar com os pés") e o Efeito Flypaper.',
    simuladoresSugeridos: ['oates', 'tiebout', 'federalism'],
    dilema: {
      titulo: 'Provisão Descentralizada de Educação vs Padrão Nacional Uniforme',
      contexto: 'O Ministério da Educação propõe uniformizar rigorosamente a matriz curricular e os investimentos em todas as escolas do país com regras idênticas para o sertão do Maranhão e para a capital paulista. Prefeitos e governadores argumentam que conhecem melhor as realidades e vocações locais.',
      perguntaDecisao: 'Qual é a prescrição do Teorema da Descentralização de Wallace Oates (1972)?',
      opcoes: [
        {
          id: 'A',
          rotulo: 'Centralização absoluta em Brasília de todos os gastos educacionais',
          descricao: 'Impor um pacote padronizado uniforme de gasto por aluno para todo o território nacional.',
          consequencia: 'Cria perda severa de bem-estar social nas regiões cujas preferências divergem da média nacional.',
          avaliacao: 'Ineficiente ou com Risco de Captura',
          diagnostico: 'A provisão uniforme centralizada gera sobreoferta em locais que demandavam menos e subprovisão onde a demanda é maior, violando a eficiência.'
        },
        {
          id: 'B',
          rotulo: 'Descentralização da Provisão Local com Transferências Federais Redistributivas (FUNDEB)',
          descricao: 'Permitir que os governos locais adaptem a oferta às preferências regionais, combinada com complementação federal equalizadora para garantir padrão mínimo de qualidade.',
          consequencia: 'Alcança o ganho de bem-estar de Oates respeitando a autonomia federativa sem abandonar a equidade inter-regional.',
          avaliacao: 'Ótima Escolha',
          diagnostico: 'Oates provou que na ausência de economias de escala ou transbordamentos significativos, a provisão descentralizada é sempre estritamente superior ou igual à provisão centralizada.'
        },
        {
          id: 'C',
          rotulo: 'Eliminar qualquer transferência da União e deixar os municípios entregues à própria arrecadação',
          descricao: 'Extinguir o FPM e o FUNDEB.',
          consequencia: 'Colapso dos serviços públicos essenciais na maioria dos municípios do interior do Nordeste que dependem em mais de 80% do FPM.',
          avaliacao: 'Ineficiente ou com Risco de Captura',
          diagnostico: 'O federalismo fiscal brasileiro exige mecanismos de equalização fiscal para compensar disparidades territoriais severas.'
        }
      ]
    },
    desafio: {
      enunciado: 'O que descreve o "Efeito Flypaper" no estudo das transferências intergovernamentais do Federalismo Fiscal?',
      alternativas: [
        'O dinheiro transferido pela União desaparece sem registro fiscal.',
        'Uma transferência governamental incondicional (como FPE ou FPM) estimula o gasto público local com muito mais força do que um aumento equivalente na renda privada dos munícipes ("o dinheiro gruda onde cai").',
        'As transferências atraem empresas industriais como papel pega-moscas.',
        'Os municípios ricos recebem proporcionalmente mais recursos federais.'
      ],
      indiceCorreto: 1,
      dica: 'Pense na expressão em inglês "money sticks where it hits".',
      explicacao: 'A teoria microeconômica tradicional previa que uma transferência não vinculada deveria ter o mesmo efeito que um acréscimo de renda da comunidade. No entanto, estudos empíricos revelam que burocratas e gestores locais expandem os gastos públicos substancialmente mais quando recebem repasses do que quando a renda local cresce (Efeito Flypaper).'
    }
  },

  12: {
    aulaNumero: 12,
    metaAprendizado: 'Dominar os limites da LRF (LC 101/2000), os gatilhos de ajuste da despesa com pessoal e os impactos da Guerra Fiscal.',
    simuladoresSugeridos: ['fiscal_war', 'lrf_engine'],
    dilema: {
      titulo: 'Gasto com Pessoal atingindo o Limite Prudencial no Estado do Maranhão',
      contexto: 'O Relatório de Gestão Fiscal (RGF) do Estado do Maranhão aponta que a Despesa Total com Pessoal (DTP) do Poder Executivo alcançou 47,2% da Receita Corrente Líquida (RCL), superando o Limite Prudencial de 46,55% (95% do teto máximo de 49%). Servidores estaduais exigem reajuste salarial linear de 10%.',
      perguntaDecisao: 'Como Procurador-Geral e Secretário de Fazenda, qual orientação jurídica e fiscal você determina?',
      opcoes: [
        {
          id: 'A',
          rotulo: 'Conceder o reajuste salarial e emitir títulos de dívida para cobrir a folha',
          descricao: 'Acatar a reivindicação para evitar greve geral no funcionalismo público.',
          consequencia: 'Violação frontal da LRF: acarreta crime de responsabilidade fiscal (art. 10 da Lei 10.028/2000), suspensão de transferências voluntárias federais e bloqueio de empréstimos do BID/Banco Mundial.',
          avaliacao: 'Ineficiente ou com Risco de Captura',
          diagnostico: 'Ultrapassado o limite prudencial, o art. 22 da LC 101/2000 veda expressamente qualquer reajuste, criação de cargo, contratação ou alteração de plano de carreira.'
        },
        {
          id: 'B',
          rotulo: 'Acionar imediatamente os Gatilhos Automáticos da LRF e Plano de Contingenciamento',
          descricao: 'Congelar contratações, vedar concessão de novas vantagens, cortar horas extras e cargos comissionados para reconduzir a despesa abaixo do limite de alerta em até dois quadrimestres.',
          consequencia: 'Preserva a solvência fiscal do Estado do Maranhão, atende às exigências do Tribunal de Contas (TCE-MA) e garante a continuidade de investimentos essenciais.',
          avaliacao: 'Ótima Escolha',
          diagnostico: 'A LRF impõe medidas graduais de freio de despesa pública. A obediência aos gatilhos prudenciais protege as finanças contra o colapso e a insolvência fiscal.'
        },
        {
          id: 'C',
          rotulo: 'Criar empresas estatais dependentes para transferir servidores e maquiar a folha',
          descricao: 'Contabilidade criativa para retirar servidores da conta da DTP.',
          consequencia: 'Rejeição imediata das contas pelo Tribunal de Contas da União (TCU) e TCE-MA por dolo e fraude fiscal, além de sanções financeiras severas.',
          avaliacao: 'Ineficiente ou com Risco de Captura',
          diagnostico: 'A LRF define expressamente que a despesa de pessoal engloba toda e qualquer empresa estatal dependente e qualquer subterfúgio contábil.'
        }
      ]
    },
    desafio: {
      enunciado: 'Nos termos da Lei de Responsabilidade Fiscal (Lei Complementar nº 101/2000), qual é o Limite Máximo estabelecido para a Despesa Total com Pessoal do Poder Executivo Estadual como porcentagem da Receita Corrente Líquida (RCL)?',
      alternativas: [
        '60% da RCL.',
        '49% da RCL (enquanto o limite global de todo o Estado, somando Legislativo, Judiciário e MP, é de 60%).',
        '25% da RCL.',
        '80% da RCL.'
      ],
      indiceCorreto: 1,
      dica: 'Lembre-se da repartição entre os Poderes: o Executivo fica com a maior fatia (49%), e os demais órgãos dividem os 11% restantes.',
      explicacao: 'O art. 19 e 20 da LRF fixam o teto global de 60% da RCL para os Estados, sendo 49% para o Executivo, 6% para o Judiciário, 3% para o Legislativo (incluindo Tribunal de Contas) e 2% para o Ministério Público.'
    }
  }
};
