import React from 'react';
import { EstudoDeCaso } from '../types';

// Import all 25 modular simulators
import { EdgeworthSimulator } from './simulators/EdgeworthSimulator';
import { CoaseSimulator } from './simulators/CoaseSimulator';
import { MonopolySimulator } from './simulators/MonopolySimulator';
import { HarbergerSimulator } from './simulators/HarbergerSimulator';
import { NiskanenSimulator } from './simulators/NiskanenSimulator';
import { ArrowSimulator } from './simulators/ArrowSimulator';
import { FederalismSimulator } from './simulators/FederalismSimulator';

import {
  MusgraveSimulator,
  SocialWelfareSimulator,
  RicardianSimulator,
  WelfareFrontierSimulator
} from './simulators/Unit1Simulators';

import {
  PigouSimulator,
  SamuelsonSimulator,
  AsymmetricInfoSimulator
} from './simulators/Unit2Simulators';

import {
  DownsSimulator,
  LogrollingSimulator,
  RentSeekingSimulator
} from './simulators/Unit3Simulators';

import {
  TaxIncidenceSimulator,
  RamseySimulator,
  LafferSimulator,
  ReformaTributariaSimulator
} from './simulators/Unit4Simulators';

import {
  OatesSimulator,
  TieboutSimulator,
  FiscalWarSimulator,
  LrfSimulator
} from './simulators/Unit5Simulators';

import {
  Sliders,
  Sparkles,
  Target,
  ArrowRight,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface CaseSimulatorGuideData {
  objetivo: string;
  variaveisPrincipais: { parametro: string; impacto: string }[];
  cenariosMultiplasRespostas: {
    nome: string;
    ajusteNoSimulador: string;
    resultado: string;
    conclusao: string;
  }[];
  conclusaoPedagogica: string;
}

// 25 pedagogical guides matching the 25 cases and 25 simulators
const GUIAS_SIMULADORES_CASOS: Record<string, CaseSimulatorGuideData> = {
  // UNIDADE 1
  ricardian: {
    objetivo: 'Simular se um aumento do déficit público financiado por dívida expande o consumo presente ou se as famílias aumentam a poupança privada para pagar impostos futuros (Equivalência Ricardiana vs Ilusão Fiscal).',
    variaveisPrincipais: [
      { parametro: 'Propensão Marginal a Poupar', impacto: 'Quanto maior a poupança, menor o multiplicador keynesiano e mais forte a reação ricardiana.' },
      { parametro: 'Grau de Racionalidade / Horizonte Intertemporal', impacto: 'Se as famílias forem altruístas intergeracionais, o déficit presente não altera a riqueza percebida.' },
      { parametro: 'Déficit Fiscal Primário', impacto: 'Mede o choque fiscal aplicado na economia e a trajetória futura de endividamento.' }
    ],
    cenariosMultiplasRespostas: [
      {
        nome: 'Resposta A: Ilusão Fiscal Keynesiana',
        ajusteNoSimulador: 'Reduza a poupança privada e o horizonte de planejamento.',
        resultado: 'O consumo sobe fortemente no curto prazo, mas a dívida pública acumula juros explosivos.',
        conclusao: 'Justifica políticas de estímulo anticíclico com custos fiscais postergados.'
      },
      {
        nome: 'Resposta B: Equivalência Ricardiana Pura (Robert Barro)',
        ajusteNoSimulador: 'Aumente o horizonte intertemporal e a sensibilidade a tributos futuros.',
        resultado: 'O consumo agregado fica estagnado; a poupança privada absorve exatamente 100% da emissão de dívida.',
        conclusao: 'Comprova a ineficácia alocativa de déficits orçamentários sob neutralidade fiscal.'
      },
      {
        nome: 'Resposta C: Restrição de Liquidez e Regra de Ouro',
        ajusteNoSimulador: 'Simule gastos com investimento produtivo vs custeio.',
        resultado: 'Se o endividamento financiar infraestrutura de alto retorno, o PIB potencial futuro compensa a dívida.',
        conclusao: 'Fundamento teórico da Regra de Ouro do Art. 167, III da Constituição Federal de 1988.'
      }
    ],
    conclusaoPedagogica: 'A simulação demonstra que no Brasil, com alta proporção de famílias com restrição de liquidez, a Equivalência Ricardiana é imperfeita, mas a restrição orçamentária intertemporal do governo continua implacável.'
  },

  social_welfare: {
    objetivo: 'Testar diferentes Funções de Bem-Estar Social (SWF Benthamiana vs Rawlsiana) avaliando a curva de redistribuição de renda e o custo de ineficiência (Okun).',
    variaveisPrincipais: [
      { parametro: 'Parâmetro de Aversão à Desigualdade', impacto: 'Define a sensibilidade ética da sociedade à dispersão de renda entre ricos e pobres.' },
      { parametro: 'Volume de Transferência Social', impacto: 'Mede a magnitude das transferências fiscais e seu impacto no Coeficiente de Gini.' },
      { parametro: 'Vazamento do Balde de Okun', impacto: 'Representa custos administrativos e distorções tributárias na redistribuição.' }
    ],
    cenariosMultiplasRespostas: [
      {
        nome: 'Resposta Benthamiana (Utilitarista Clássica)',
        ajusteNoSimulador: 'Defina a aversão à desigualdade como zero (soma linear de utilidades).',
        resultado: 'O bem-estar depende apenas do produto total; aceita grande desigualdade se a produção for alta.',
        conclusao: 'Prioriza a eficiência alocativa pura em detrimento da justiça distributiva.'
      },
      {
        nome: 'Resposta Rawlsiana (Maximin)',
        ajusteNoSimulador: 'Eleve o parâmetro de aversão ao máximo para focar no estrato mais pobre.',
        resultado: 'O bem-estar social é estritamente medido pela utilidade do cidadão no decil mais vulnerável.',
        conclusao: 'Justifica transferências focalizadas de alívio da pobreza extrema mesmo com pequeno peso morto.'
      },
      {
        nome: 'Resposta de Compromisso Social (Bernoulli-Nash)',
        ajusteNoSimulador: 'Defina aversão moderada à desigualdade com custo tributário controlado.',
        resultado: 'Equilíbrio que reduz a pobreza sem desestimular a poupança e o investimento produtivo.',
        conclusao: 'Modelo que fundamenta programas modernos de renda mínima e transferências condicionadas no Brasil.'
      }
    ],
    conclusaoPedagogica: 'A escolha de políticas redistributivas é essencialmente normativa: não existe uma única resposta tecnocrática sem uma prévia função de bem-estar social definida coletivamente.'
  },

  edgeworth: {
    objetivo: 'Simular a alocação de recursos na Caixa de Edgeworth e encontrar a Curva de Contrato e o equilíbrio Pareto-eficiente entre setores econômicos.',
    variaveisPrincipais: [
      { parametro: 'Dotações Iniciais de Capital e Trabalho', impacto: 'Posicionam o ponto inicial de trocas no interior da caixa.' },
      { parametro: 'Taxa Marginal de Substituição (TMS)', impacto: 'Indica a disposição a trocar insumos; a igualdade define a tangência eficiente.' },
      { parametro: 'Tamanho Relativo da Caixa', impacto: 'Mede a disponibilidade total de fatores de produção na economia.' }
    ],
    cenariosMultiplasRespostas: [
      {
        nome: 'Resposta Ineficiente (Fora da Curva de Contrato)',
        ajusteNoSimulador: 'Posicione as dotações em ponto com curvas de indiferença secantes.',
        resultado: 'Existe uma lente de Pareto onde ambos os setores podem produzir mais sem prejuízo recíproco.',
        conclusao: 'Evidencia o desperdício alocativo de recursos ociosos em infraestrutura logística.'
      },
      {
        nome: 'Resposta de Pareto (Na Curva de Contrato)',
        ajusteNoSimulador: 'Mova a alocação para a tangência perfeita das curvas de indiferença.',
        resultado: 'É impossível elevar a produção de um setor sem reduzir a do outro (TMS_A = TMS_B).',
        conclusao: 'Comprova o 1º Teorema do Bem-Estar em equilíbrio de trocas voluntárias.'
      },
      {
        nome: 'Resposta com Redistribuição Lump-Sum (2º Teorema)',
        ajusteNoSimulador: 'Altere as dotações iniciais mantendo os preços de mercado livres.',
        resultado: 'A economia atinge um novo ponto Pareto-eficiente com perfil distributivo alterado.',
        conclusao: 'Mostra a viabilidade teórica de conciliar equidade inicial com eficiência de mercado.'
      }
    ],
    conclusaoPedagogica: 'A Caixa de Edgeworth ilustra matematicamente por que intervenções arbitrárias de preços geram ineficiência, enquanto transferências de dotação preservam a eficiência de Pareto.'
  },

  musgrave: {
    objetivo: 'Simular o equilíbrio orçamentário entre as três funções fiscais do Estado: Alocativa (bens públicos), Distributiva (equidade) e Estabilizadora (demanda e emprego).',
    variaveisPrincipais: [
      { parametro: 'Fatia Alocativa (%)', impacto: 'Gastos em infraestrutura, segurança, saneamento e bens públicos.' },
      { parametro: 'Fatia Distributiva (%)', impacto: 'Transferências de renda, subsídios sociais e saúde básica.' },
      { parametro: 'Fatia Estabilizadora (%)', impacto: 'Reservas fiscais anticíclicas e estímulos automáticos.' }
    ],
    cenariosMultiplasRespostas: [
      {
        nome: 'Resposta Ortodoxa Clássica',
        ajusteNoSimulador: 'Maximize a alocação em bens essenciais com neutralidade distributiva.',
        resultado: 'Orçamento equilibrado com baixo endividamento, porém desproteção social em recessões.',
        conclusao: 'Visão liberal do Estado mínimo com ênfase na eficiência de mercado.'
      },
      {
        nome: 'Resposta de Estímulo Anticíclico em Crises',
        ajusteNoSimulador: 'Amplie a função estabilizadora e distributiva durante choques negativos.',
        resultado: 'Manutenção do nível de emprego e demanda agregada com expansão temporária do déficit.',
        conclusao: 'Aplicação prática da abordagem funcional keynesiana na gestão fiscal.'
      },
      {
        nome: 'Resposta de Equilíbrio Estrutural',
        ajusteNoSimulador: 'Harmonize as três funções em proporções equilibradas sustentadas por receitas.',
        resultado: 'Crescimento de longo prazo com amortecimento de choques e coesão social.',
        conclusao: 'Síntese musgraviana aplicada ao planejamento orçamentário plurianual (PPA).'
      }
    ],
    conclusaoPedagogica: 'As três funções de Musgrave competem pelo mesmo bolo de arrecadação; um orçamento público eficiente calibra essas funções de acordo com a fase do ciclo econômico.'
  },

  welfare_frontier: {
    objetivo: 'Simular a Fronteira de Possibilidades de Utilidade (UPF) e o Ponto de Bliss de Bergson-Samuelson nas decisões coletivas de alocação social.',
    variaveisPrincipais: [
      { parametro: 'Curvatura da Fronteira de Utilidade', impacto: 'Representa a capacidade tecnológica e produtiva da economia.' },
      { parametro: 'Ponderação Social entre Grupos', impacto: 'Reflete as preferências políticas e éticas da sociedade.' },
      { parametro: 'Taxa Marginal de Transformação de Utilidade', impacto: 'Mostra o custo de oportunidade em bem-estar de beneficiar um grupo em relação ao outro.' }
    ],
    cenariosMultiplasRespostas: [
      {
        nome: 'Resposta de Maximização de Riqueza Agregada',
        ajusteNoSimulador: 'Posicione o ponto de bliss no trecho com maior utilidade absoluta somada.',
        resultado: 'Beneficia os setores com maior retorno marginal, mesmo que aumente a disparidade territorial.',
        conclusao: 'Abordagem tecnocrática comumente criticada por agravar desigualdades regionais.'
      },
      {
        nome: 'Resposta de Equalização Territorial',
        ajusteNoSimulador: 'Ajuste os pesos sociais para aproximar o ponto da bissetriz de 45°.',
        resultado: 'Reduz o abismo socioeconômico entre capital e interior a custo de leve perda de produto potencial.',
        conclusao: 'Fundamenta políticas regionais de desenvolvimento e fundos constitucionais de equalização.'
      },
      {
        nome: 'Resposta de Ponto Inalcançável vs Ineficiente',
        ajusteNoSimulador: 'Compare pontos fora da fronteira com pontos no interior.',
        resultado: 'Pontos além da UPF são inviáveis com a tecnologia atual; pontos internos são ineficientes.',
        conclusao: 'Mostra que a eficiência de Pareto é condição necessária, mas não suficiente, para a justiça social.'
      }
    ],
    conclusaoPedagogica: 'A economia positiva descreve a fronteira UPF de possibilidades; a escolha do ponto de bliss sobre ela é um ato democrático fundado em valores éticos e políticos.'
  },

  // UNIDADE 2
  pigou: {
    objetivo: 'Simular o imposto pigouviano ótimo (t* = DMg) para internalizar externalidades negativas de poluição e comparar com limites regulatórios de comando e controle.',
    variaveisPrincipais: [
      { parametro: 'Alíquota do Tributo Pigouviano (R$/ton)', impacto: 'Cria a cunha fiscal que força o poluidor a internalizar o dano ambiental.' },
      { parametro: 'Custo Marginal Privado vs Social', impacto: 'A distância entre CMgP e CMgS representa o dano marginal externo (DMg).' },
      { parametro: 'Capacidade de Abatimento Tecnológico', impacto: 'Elasticidade de reação da indústria na adoção de tecnologias limpas.' }
    ],
    cenariosMultiplasRespostas: [
      {
        nome: 'Resposta Ótima de Pigou (t* = DMg no ponto ótimo)',
        ajusteNoSimulador: 'Fixe o imposto no valor exato do dano marginal no nível de produção eficiente.',
        resultado: 'A produção cai para a quantidade socialmente ótima Q*; o peso morto é totalmente eliminado.',
        conclusao: 'Solução mais eficiente que atinge a meta ambiental ao menor custo para a sociedade.'
      },
      {
        nome: 'Resposta de Subtributação',
        ajusteNoSimulador: 'Fixe o imposto abaixo do dano marginal.',
        resultado: 'A produção poluidora continua excessiva gerando perda de bem-estar social líquido.',
        conclusao: 'Ilustra a ineficácia de multas ambientais simbólicas ou defasadas pela inflação.'
      },
      {
        nome: 'Resposta de Padrão Regulatório Rígido (Cotejamento)',
        ajusteNoSimulador: 'Compare o resultado do imposto com a cota fixa de emissão.',
        resultado: 'O padrão atinge a redução física, mas sem incentivo à inovação contínua além da meta.',
        conclusao: 'Demonstra a superioridade de instrumentos de mercado (tributos) sobre cotas burocráticas.'
      }
    ],
    conclusaoPedagogica: 'O imposto pigouviano restaura o sistema de preços ao fazer o poluidor arcar com o custo total que impõe a terceiros, sem proibir a atividade econômica.'
  },

  samuelson: {
    objetivo: 'Simular a Condição de Samuelson (soma vertical dos BMg = CMg) para bens públicos puros e evidenciar a falha do mecanismo voluntário de mercado decorrente do carona (free-rider).',
    variaveisPrincipais: [
      { parametro: 'Número de Beneficiários', impacto: 'Multiplica a agregação vertical das utilidades individuais não-rivais.' },
      { parametro: 'Disposição a Pagar Individual', impacto: 'Avaliação marginal subjetiva de cada cidadão pelo bem público.' },
      { parametro: 'Custo Marginal de Provisão', impacto: 'Custo técnico de implantação e manutenção do bem público.' }
    ],
    cenariosMultiplasRespostas: [
      {
        nome: 'Resposta de Mercado Privado / Carona (Free-Rider)',
        ajusteNoSimulador: 'Permita que os cidadãos contribuam voluntariamente sem coerção.',
        resultado: 'Cada indivíduo subdeclara sua disposição real a pagar; a provisão despenca para perto de zero.',
        conclusao: 'Comprova por que bens não-excludentes e não-rivais não podem ser ofertados pelo livre mercado.'
      },
      {
        nome: 'Resposta Eficiente da Condição de Samuelson',
        ajusteNoSimulador: 'Some verticalmente as curvas de demanda individuais (Σ BMg = CMg).',
        resultado: 'Identifica a quantidade ótima Q* que maximiza o excedente coletivo da sociedade.',
        conclusao: 'Justifica a cobrança compulsória de tributos para custear infraestruturas essenciais.'
      },
      {
        nome: 'Resposta de Superprovisão Burocrática',
        ajusteNoSimulador: 'Expanda a provisão além de Q* onde Σ BMg < CMg.',
        resultado: 'O custo marginal de financiamento supera os benefícios sociais percebidos pelos usuários.',
        conclusao: 'Alerta contra o gigantismo estatal e obras públicas descoladas da demanda cidadã.'
      }
    ],
    conclusaoPedagogica: 'Bens públicos exigem soma vertical de demandas porque todos consomem a mesma unidade conjuntamente, tornando a coerção tributária indispensável para superar o free-rider.'
  },

  monopoly: {
    objetivo: 'Simular as alternativas de precificação regulatória em monopólios naturais (saneamento, água, energia): First-Best (P = CMg) vs Second-Best (P = CMe) e Tarifa Bipartida.',
    variaveisPrincipais: [
      { parametro: 'Estrutura de Custos Fixos', impacto: 'Gera economias de escala e custos médios decrescentes em toda a extensão do mercado.' },
      { parametro: 'Regra de Precificação Adotada', impacto: 'Define se a tarifa segue custo marginal, custo médio ou tarifa em duas partes.' },
      { parametro: 'Elasticidade da Demanda do Serviço', impacto: 'Mede a sensibilidade dos consumidores residenciais e comerciais a reajustes tarifários.' }
    ],
    cenariosMultiplasRespostas: [
      {
        nome: 'Resposta First-Best (P = CMg)',
        ajusteNoSimulador: 'Fixe a tarifa no custo marginal da água tratada.',
        resultado: 'Eficiência alocativa perfeita, porém a concessionária opera com prejuízo financeiro crônico.',
        conclusao: 'Exige subsídios do Tesouro que podem gerar distorções tributárias em outras áreas.'
      },
      {
        nome: 'Resposta Second-Best de Ramsey (P = CMe)',
        ajusteNoSimulador: 'Fixe o preço onde a receita total empata exatamente com o custo total.',
        resultado: 'Equilíbrio contábil sustentável sem subsídio público, gerando pequeno peso morto alocativo.',
        conclusao: 'Regra clássica adotada pela maioria das agências reguladoras no saneamento básico.'
      },
      {
        nome: 'Resposta de Tarifa em Duas Partes (Coase-Hotelling)',
        ajusteNoSimulador: 'Combine taxa fixa de disponibilidade de rede + tarifa variável por m³ a P = CMg.',
        resultado: 'Concilia eficiência na margem de consumo com cobertura integral dos investimentos fixos.',
        conclusao: 'Modelo ótimo utilizado nas faturas modernas de água e energia elétrica.'
      }
    ],
    conclusaoPedagogica: 'Em infraestruturas de rede, a regulação econômica busca evitar preços de monopólio sem levar a concessionária à insolvência operacional.'
  },

  asymmetric_info: {
    objetivo: 'Simular a seleção adversa (Akerlof) e o risco moral em fundos de saúde e previdência pública, observando a espiral da morte atuarial.',
    variaveisPrincipais: [
      { parametro: 'Valor da Contribuição / Prêmio', impacto: 'Preço cobrado dos servidores para adesão ao plano de saúde.' },
      { parametro: 'Grau de Assimetria de Informação', impacto: 'Desconhecimento do plano sobre o real estado de saúde dos inscritos.' },
      { parametro: 'Caráter Voluntário vs Compulsório', impacto: 'Permite ou proíbe a saída seletiva de usuários jovens e saudáveis.' }
    ],
    cenariosMultiplasRespostas: [
      {
        nome: 'Resposta de Espiral da Morte (Adesão Voluntária)',
        ajusteNoSimulador: 'Eleve o prêmio em regime estritamente voluntário.',
        resultado: 'Segurados saudáveis abandonam o plano; a sinistralidade média sobe e o fundo entra em colapso.',
        conclusao: 'Comprova o modelo dos limões de George Akerlof aplicado a seguros e planos coletivos.'
      },
      {
        nome: 'Resposta de Pool Solidário Compulsório',
        ajusteNoSimulador: 'Torne a adesão automática com desconto em folha para todos os servidores.',
        resultado: 'Estabilização atuarial com subsidiação cruzada dos mais saudáveis para os mais vulneráveis.',
        conclusao: 'Fundamento teórico da seguridade social pública universal e solidária.'
      },
      {
        nome: 'Resposta com Coparticipação Moderada',
        ajusteNoSimulador: 'Introduza coparticipação sobre consultas eletivas mantendo internações cobertas.',
        resultado: 'Redução substancial do risco moral sem comprometer o acesso a tratamentos de alta complexidade.',
        conclusao: 'Desenho de incentivos que combate o desperdício sem criar barreiras excludentes.'
      }
    ],
    conclusaoPedagogica: 'A assimetria de informação impede o funcionamento de mercados de seguros privados perfeitos, justificando a intervenção regulatória e pools públicos compulsórios.'
  },

  coase: {
    objetivo: 'Simular o Teorema de Coase em disputas socioambientais, testando a barganha privada sob baixos vs altos custos de transação.',
    variaveisPrincipais: [
      { parametro: 'Nível de Custos de Transação', impacto: 'Custos contratuais, jurídicos, de coordenação e assimetria entre as partes.' },
      { parametro: 'Definição dos Direitos de Propriedade', impacto: 'Atribui o direito legal inicial ao poluidor ou à vítima afetada.' },
      { parametro: 'Número de Agentes Envolvidos', impacto: 'Quanto maior o número de partes, mais difícil a cooperação voluntária.' }
    ],
    cenariosMultiplasRespostas: [
      {
        nome: 'Resposta Coaseana (Custos de Transação Nulos)',
        ajusteNoSimulador: 'Zere os custos de transação e permita negociação direta.',
        resultado: 'As partes alcançam a quantidade socialmente ótima Q*, qualquer que seja a atribuição jurídica inicial.',
        conclusao: 'O direito inicial afeta apenas quem paga a compensação (distribuição de renda), não a eficiência.'
      },
      {
        nome: 'Resposta de Fracasso Coasiano (Altos Custos de Transação)',
        ajusteNoSimulador: 'Aumente os custos de transação e o número de litigantes.',
        resultado: 'A barganha privada é inviabilizada; a alocação permanece presa em ineficiência e degradação.',
        conclusao: 'Justifica a intervenção estatal direta via regulação pública e tributos pigouvianos.'
      },
      {
        nome: 'Resposta de Governança Comunitária de Ostrom',
        ajusteNoSimulador: 'Adicione regras locais com monitoramento mútuo e sanções graduadas.',
        resultado: 'Superação da tragédia dos comuns sem privatização irrestrita nem tutela estatal excessiva.',
        conclusao: 'Solução premiada de Elinor Ostrom para a gestão sustentável de bens comuns.'
      }
    ],
    conclusaoPedagogica: 'Coase demonstrou que o dano é de natureza recíproca; quando os custos de transação são altos, a escolha da lei e das instituições define se haverá ou não eficiência.'
  },

  // UNIDADE 3
  niskanen: {
    objetivo: 'Simular o modelo de Niskanen de maximização orçamentária dos burocratas e comparar o ponto de equilíbrio burocrático (BT = CT) com o ponto ótimo social (BMg = CMg).',
    variaveisPrincipais: [
      { parametro: 'Poder de Monopólio da Burocracia', impacto: 'Capacidade do órgão governamental de apresentar orçamentos "pegar ou largar".' },
      { parametro: 'Assimetria de Informação Legislativa', impacto: 'Dificuldade dos parlamentares em fiscalizarem os custos reais de execução dos programas.' },
      { parametro: 'Escala Orçamentária Requerida', impacto: 'Volume de recursos pleiteados pela secretaria em relação à demanda social.' }
    ],
    cenariosMultiplasRespostas: [
      {
        nome: 'Resposta Ótima da Sociedade (BMg = CMg)',
        ajusteNoSimulador: 'Equilibre o benefício marginal com o custo marginal de provisão.',
        resultado: 'Excedente líquido da sociedade maximizado com alocação estritamente eficiente.',
        conclusao: 'O tamanho ideal do setor público na ótica do bem-estar social.'
      },
      {
        nome: 'Resposta de Niskanen (Equilíbrio BT = CT)',
        ajusteNoSimulador: 'Permita que a burocracia expanda o orçamento até a margem zero de excedente.',
        resultado: 'A produção de serviços públicos dobra em relação ao ótimo; todo o ganho social é dissipado em ineficiência interna.',
        conclusao: 'Explica o gigantismo orçamentário crônico de órgãos públicos autônomos.'
      },
      {
        nome: 'Resposta de Governança por Resultados',
        ajusteNoSimulador: 'Introduza metas de desempenho, auditorias do Tribunal de Contas e transparência.',
        resultado: 'Redução substancial da folga orçamentária burocrática aproximando o orçamento do ótimo.',
        conclusao: 'Princípio da eficiência administrativa preconizado pela Nova Gestão Pública.'
      }
    ],
    conclusaoPedagogica: 'Burocratas públicos maximizam utilidade expandindo o orçamento de suas pastas; freios e contrapesos institucionais são vitais para evitar a dissipação do excedente público.'
  },

  downs: {
    objetivo: 'Simular o Teorema do Eleitor Mediano de Anthony Downs na disputa eleitoral majoritária e verificar a convergência de propostas ao centro do espectro fiscal.',
    variaveisPrincipais: [
      { parametro: 'Distribuição de Preferências dos Eleitores', impacto: 'Simétrica (unimodal), enviesada ou polarizada (bimodal).' },
      { parametro: 'Posicionamento Inicial dos Candidatos', impacto: 'Alocação ideológica entre Estado Mínimo (baixa tributação) e Estado Social Amplo.' },
      { parametro: 'Sensibilidade e Abstenção Eleitoral', impacto: 'Reação dos eleitores que deixam de votar caso os candidatos se afastem de suas convicções.' }
    ],
    cenariosMultiplasRespostas: [
      {
        nome: 'Resposta de Convergência ao Eleitor Mediano',
        ajusteNoSimulador: 'Distribuição unimodal com busca estrita de votos majoritários.',
        resultado: 'Ambos os candidatos convergem suas propostas fiscais exatamente para a posição do eleitor mediano.',
        conclusao: 'Explica a moderação das plataformas fiscais de grandes coalizões governamentais.'
      },
      {
        nome: 'Resposta sob Distribuição Bimodal (Polarização)',
        ajusteNoSimulador: 'Aumente a concentração de eleitores nos extremos.',
        resultado: 'O centro perde estabilidade; os candidatos preferem mobilizar suas bases radicais.',
        conclusao: 'Explica a paralisia fiscal em parlamentos e sociedades politicamente fragmentadas.'
      },
      {
        nome: 'Resposta de Exploração da Minoria',
        ajusteNoSimulador: 'Observe a alocação de tributos sobre a cauda de maior renda para financiar a mediana.',
        resultado: 'O eleitor mediano vota por tributação progressiva e benefícios concentrados na classe média/baixa.',
        conclusao: 'Fundamento da hipótese de Meltzer e Richard sobre a expansão do Estado de bem-estar.'
      }
    ],
    conclusaoPedagogica: 'Na democracia representativa unidimensional, a preferência do eleitor que divide o eleitorado em duas metades iguais define o nível de equilíbrio dos gastos públicos.'
  },

  arrow: {
    objetivo: 'Simular o Paradoxo de Condorcet e o Teorema da Impossibilidade de Arrow em escolhas orçamentárias com múltiplos agentes e preferências circulares.',
    variaveisPrincipais: [
      { parametro: 'Ordenação de Preferências dos Blocos', impacto: 'Prioridades dos grupos parlamentares sobre projetos fiscais concorrentes (A, B, C).' },
      { parametro: 'Regra de Maioria Simples em Pares', impacto: 'Mecanismo de confronto direto entre propostas orçamentárias.' },
      { parametro: 'Controle da Pauta Legislativa (Agenda Setting)', impacto: 'Poder do presidente da mesa em definir a ordem cronológica de votação dos projetos.' }
    ],
    cenariosMultiplasRespostas: [
      {
        nome: 'Resposta com Preferências de Pico Único',
        ajusteNoSimulador: 'Ordene as preferências de modo que todos tenham um único ponto ótimo.',
        resultado: 'Existe um vencedor de Condorcet estável que derrota todos os concorrentes em confrontos diretos.',
        conclusao: 'Condição matemática de Duncan Black que garante a estabilidade democrática.'
      },
      {
        nome: 'Resposta do Paradoxo de Condorcet (Ciclos Intransitivos)',
        ajusteNoSimulador: 'Introduza preferências multimodais entre os 3 blocos parlamentares.',
        resultado: 'A derrota B por 2 a 1; B derrota C por 2 a 1; e C derrota A por 2 a 1 (ciclo sem fim: A > B > C > A).',
        conclusao: 'Comprova a impossibilidade de agregar preferências individuais em uma ordenação social racional.'
      },
      {
        nome: 'Resposta de Poder de Pauta (Manipulação de Agenda)',
        ajusteNoSimulador: 'Altere a ordem de votação mantendo o mesmo ciclo de preferências.',
        resultado: 'O projeto vencedor depende exclusivamente de qual proposta é votada por último.',
        conclusao: 'Demonstra o enorme poder dos presidentes da Câmara e do Senado na condução das leis orçamentárias.'
      }
    ],
    conclusaoPedagogica: 'O Teorema de Arrow prova que nenhum sistema democrático de votação pode satisfazer simultaneamente universalidade, não-ditadura, Pareto e independência de alternativas irrelevantes.'
  },

  logrolling: {
    objetivo: 'Simular o Logrolling (troca de votos entre deputados) e o fenômeno do Pork-Barrel (emendas paroquiais) na aprovação de gastos com custos difusos e benefícios concentrados.',
    variaveisPrincipais: [
      { parametro: 'Benefício Local de Cada Emenda', impacto: 'Valor percebido pelos eleitores no reduto eleitoral de cada parlamentar.' },
      { parametro: 'Custo Tributário Compartilhado', impacto: 'Ônus fiscal distribuído igualmente entre todos os contribuintes do Estado.' },
      { parametro: 'Formação de Coalizão de Troca', impacto: 'Aliança onde Deputado 1 vota na obra do Deputado 2 em troca de reciprocidade.' }
    ],
    cenariosMultiplasRespostas: [
      {
        nome: 'Resposta com Votação Isolada (Sem Troca de Votos)',
        ajusteNoSimulador: 'Submeta projetos ineficientes (custo total > benefício total) a votos individuais.',
        resultado: 'Todos os projetos paroquiais ineficientes são sumariamente rejeitados pela maioria.',
        conclusao: 'Mostra a eficácia da fiscalização parlamentar independente.'
      },
      {
        nome: 'Resposta de Logrolling Explícito (Pork-Barrel)',
        ajusteNoSimulador: 'Permita que os parlamentares combinem apoio mútuo.',
        resultado: 'A coalizão aprova ambos os projetos; cada deputado agrada sua base, mas a sociedade sofre perda líquida de riqueza.',
        conclusao: 'Explica o crescimento exponencial das emendas orçamentárias individuais e de relator.'
      },
      {
        nome: 'Resposta com Teto Constitucional de Emendas',
        ajusteNoSimulador: 'Fixe uma trava de conformidade percentual rígida sobre a RCL.',
        resultado: 'A barganha legislativa é contida dentro de limites fiscais previsíveis sem desequilibrar as contas públicas.',
        conclusao: 'Fundamento das regras de conformidade e transparência exigidas pelo STF para emendas impositivas.'
      }
    ],
    conclusaoPedagogica: 'O logrolling transforma projetos economicamente deficitários em vitórias políticas locais porque os custos são difusos enquanto os benefícios eleitorais são altamente concentrados.'
  },

  rent_seeking: {
    objetivo: 'Simular a teoria de Rent-Seeking de Gordon Tullock e calcular a perda social gerada pelo lobby por privilégios tributários e regimes fiscais especiais.',
    variaveisPrincipais: [
      { parametro: 'Valor da Renda de Monopólio / Isenção (R)', impacto: 'Montante financeiro do privilégio estatal disputado pelos grupos de interesse.' },
      { parametro: 'Número de Empresas no Concurso de Lobby', impacto: 'Quantidade de grupos empresariais disputando o mesmo benefício governamental.' },
      { parametro: 'Eficiência e Custos de Dissipação', impacto: 'Gastos com advogados, consultorias de relações institucionais e publicidade.' }
    ],
    cenariosMultiplasRespostas: [
      {
        nome: 'Resposta Sem Concessões Especiais (Mercado Concorrencial)',
        ajusteNoSimulador: 'Zere os benefícios fiscais discricionários e privilégios regulatórios.',
        resultado: 'As empresas investem seus recursos exclusivamente em produtividade, inovação e redução de preços.',
        conclusao: 'Equilíbrio eficiente que maximiza a geração real de PIB e riqueza.'
      },
      {
        nome: 'Resposta de Dissipação Total de Tullock',
        ajusteNoSimulador: 'Abra a disputa por uma isenção tributária bilionária exclusiva.',
        resultado: 'A soma dos gastos de todos os competidores em lobby se iguala ao valor da própria isenção disputada.',
        conclusao: 'Comprova que a perda de bem-estar social vai muito além do simples triângulo de Harberger.'
      },
      {
        nome: 'Resposta de Regras Fiscais Neutras e Gerais',
        ajusteNoSimulador: 'Adote tributação horizontal uniforme sem exceções setoriais.',
        resultado: 'O retorno esperado do lobby cai a zero; o rent-seeking é economicamente asfixiado.',
        conclusao: 'Principal mérito da Reforma Tributária da EC 132/2023 ao extinguir incentivos casuísticos.'
      }
    ],
    conclusaoPedagogica: 'Rent-seeking é o uso de recursos produtivos escassos para capturar transferências governamentais de riqueza sem criar nenhum valor novo para a sociedade.'
  },

  // UNIDADE 4
  tax_incidence: {
    objetivo: 'Simular a incidência econômica vs jurídica do imposto e comprovar que a repartição do ônus depende da razão entre as elasticidades de demanda e oferta (Es / Ed).',
    variaveisPrincipais: [
      { parametro: 'Elasticidade-Preço da Demanda (|Ed|)', impacto: 'Mede a sensibilidade dos compradores a variações de preços.' },
      { parametro: 'Elasticidade-Preço da Oferta (Es)', impacto: 'Mede a capacidade dos produtores em ajustar a produção ou redirecionar estoques.' },
      { parametro: 'Lado Legal da Cobrança', impacto: 'Define se a obrigação jurídica recai sobre o vendedor ou sobre o comprador.' }
    ],
    cenariosMultiplasRespostas: [
      {
        nome: 'Resposta do Cenário Real do Maranhão (Demanda Inelástica)',
        ajusteNoSimulador: 'Defina |Ed| = 0,28 (gasolina inelástica) e Es = 1,45 (distribuição elástica).',
        resultado: 'O consumidor suporta 83,8% do imposto; o repasse na bomba é quase instantâneo.',
        conclusao: 'Evidencia a ilusão de que tributar distribuidoras protege o consumidor final.'
      },
      {
        nome: 'Resposta com Oferta Inelástica',
        ajusteNoSimulador: 'Inverta as elasticidades (oferta rígida e compradores com alternativas).',
        resultado: 'O produtor absorve a quase totalidade do tributo via redução de suas margens de lucro líquidas.',
        conclusao: 'Mostra quando a tributação incide verdadeiramente sobre o capital da firma.'
      },
      {
        nome: 'Resposta do Teorema da Invariância Tributária',
        ajusteNoSimulador: 'Mude a obrigação legal do imposto do posto para o motorista no caixa.',
        resultado: 'O preço final pago e a parcela suportada por cada lado do mercado permanecem idênticos.',
        conclusao: 'O ônus econômico final é determinado pelas forças de mercado, jamais pelo texto da lei.'
      }
    ],
    conclusaoPedagogica: 'O legislador pode escolher quem emite a guia de recolhimento, mas as elasticidades de mercado decidem irrevogavelmente quem paga a conta final do tributo.'
  },

  harberger: {
    objetivo: 'Simular o Triângulo de Harberger e demonstrar a propriedade quadrática do peso morto tributário em relação à alíquota (DW proporcional a t²).',
    variaveisPrincipais: [
      { parametro: 'Alíquota Tributária (t)', impacto: 'Percentual cobrado sobre o preço do bem ou serviço.' },
      { parametro: 'Elasticidade-Preço do Bem', impacto: 'Intensidade da retração na quantidade demandada provocada pela cunha fiscal.' },
      { parametro: 'Base Tributária Inicial', impacto: 'Volume de vendas e receitas sobre os quais o tributo é aplicado.' }
    ],
    cenariosMultiplasRespostas: [
      {
        nome: 'Resposta com Alíquota Moderada (t = 10%)',
        ajusteNoSimulador: 'Fixe alíquota moderada e ampla.',
        resultado: 'Peso morto desprezível (0,25% da base); arrecadação limpa com distorção mínima.',
        conclusao: 'Modelo ideal para um imposto sobre valor agregado de base ampla e neutra.'
      },
      {
        nome: 'Resposta com Alíquota Elevada (t = 30%)',
        ajusteNoSimulador: 'Triplique a alíquota tributária para 30%.',
        resultado: 'O peso morto não triplica: ele é multiplicado por 9 (efeito t²), gerando perda colossal de bem-estar.',
        conclusao: 'Explica o prejuízo histórico de alíquotas abusivas sobre energia elétrica e telecomunicações.'
      },
      {
        nome: 'Resposta de Alíquota Única vs Múltiplas Alíquotas',
        ajusteNoSimulador: 'Compare uma taxa uniforme de 15% com duas taxas (0% e 30%) arrecadando o mesmo total.',
        resultado: 'A alíquota uniforme gera peso morto 50% menor para o mesmo montante arrecadado.',
        conclusao: 'Fundamento macroeconômico do IVA padrão uniforme estabelecido na Reforma Tributária.'
      }
    ],
    conclusaoPedagogica: 'Como o peso morto cresce com o quadrado da alíquota, duplicar a taxa quadruplica a ineficiência econômica, recomendando alíquotas moderadas sobre bases amplas.'
  },

  ramsey: {
    objetivo: 'Simular a Regra de Elasticidade Inversa de Ramsey (t_i / t_j = Ed_j / Ed_i) e analisar o conflito entre eficiência pura de arrecadação e equidade social.',
    variaveisPrincipais: [
      { parametro: 'Elasticidade dos Bens de Primeira Necessidade', impacto: 'Alimentos básicos e medicamentos com demanda rígida (|Ed| baixo).' },
      { parametro: 'Elasticidade dos Bens Supérfluos / Luxo', impacto: 'Eletrônicos e viagens com demanda elástica (|Ed| alto).' },
      { parametro: 'Ponderador de Justiça Social', impacto: 'Peso ético atribuído ao bem-estar das famílias de menor poder aquisitivo.' }
    ],
    cenariosMultiplasRespostas: [
      {
        nome: 'Resposta de Ramsey Pura (Eficiência Máxima)',
        ajusteNoSimulador: 'Zere o peso distributivo e busque o menor peso morto total.',
        resultado: 'Alíquotas altíssimas sobre alimentos essenciais e alíquotas mínimas sobre bens de luxo.',
        conclusao: 'Alcança eficiência alocativa ao custo de intolerável injustiça e regressividade social.'
      },
      {
        nome: 'Resposta com Considerações de Equidade (Diamond-Mirrlees)',
        ajusteNoSimulador: 'Eleve o ponderador de justiça distributiva.',
        resultado: 'Isenção de alimentos básicos e sobretaxação compensatória de artigos de luxo.',
        conclusao: 'A sociedade aceita leve peso morto para proteger o poder de compra dos vulneráveis.'
      },
      {
        nome: 'Resposta Moderna da Reforma Tributária (Cashback)',
        ajusteNoSimulador: 'Mantenha a alíquota uniforme com devolução direta do imposto aos mais pobres.',
        resultado: 'Neutralidade alocativa na produção com justiça social integral na distribuição de renda.',
        conclusao: 'Mecanismo inovador que supera o dilema de Ramsey sem criar frestas de sonegação.'
      }
    ],
    conclusaoPedagogica: 'A regra de Ramsey mostra que a eficiência pura sobretaxa bens inelásticos; sistemas tributários modernos corrigem isso via cashback e transferências focalizadas.'
  },

  laffer: {
    objetivo: 'Simular a Curva de Laffer identificando a alíquota ótima t* que maximiza a receita e a entrada na zona proibitiva onde aumentos de alíquota derrubam a arrecadação.',
    variaveisPrincipais: [
      { parametro: 'Alíquota Tributária Aplicada (%)', impacto: 'Percentual do imposto sobre a renda ou receita das empresas.' },
      { parametro: 'Elasticidade da Base Tributável', impacto: 'Sensibilidade de fuga de capitais, elisão, sonegação e desincentivo ao trabalho.' },
      { parametro: 'Efeito Taxa vs Efeito Base', impacto: 'O imposto arrecada mais por unidade, mas reduz a quantidade total de unidades declaradas.' }
    ],
    cenariosMultiplasRespostas: [
      {
        nome: 'Resposta na Zona Normal (t < t*)',
        ajusteNoSimulador: 'Fixe alíquotas moderadas abaixo do ponto de inflexão.',
        resultado: 'O efeito taxa predomina; elevar a alíquota gera receitas públicas crescentes.',
        conclusao: 'Espaço fiscal legítimo para custear investimentos e serviços públicos fundamentais.'
      },
      {
        nome: 'Resposta na Zona Proibitiva (t > t*)',
        ajusteNoSimulador: 'Eleve a alíquota além do ponto crítico (ex: acima de 45%).',
        resultado: 'A arrecadação total despenca devido à contração da atividade formal e explosão da informalidade.',
        conclusao: 'Provar que reduzir impostos nessa zona eleva paradoxalmente a receita pública arrecadada.'
      },
      {
        nome: 'Resposta de Alíquota Máxima de Equilíbrio (t*)',
        ajusteNoSimulador: 'Identifique o topo da parábola da Curva de Laffer.',
        resultado: 'Ponto onde a receita é máxima, mas com perda de eficiência econômica significativa.',
        conclusao: 'Alerta de que o objetivo do Estado de direito não é maximizar a extração tributária, mas o bem-estar.'
      }
    ],
    conclusaoPedagogica: 'A Curva de Laffer ensina que tributar não é um ato aritmético linear: a reação dos agentes econômicos determina o limite real da capacidade contributiva de um país.'
  },

  reforma_tributaria: {
    objetivo: 'Simular a Reforma Tributária sobre o Consumo (EC 132/2023) comparando o sistema antigo (PIS/COFINS, IPI, ICMS, ISS cumulativos) com o IVA Dual (IBS e CBS no destino com cashback).',
    variaveisPrincipais: [
      { parametro: 'Alíquota Padrão do IVA Dual (IBS + CBS)', impacto: 'Alíquota de referência estimada entre 26,5% e 27,9% com não-cumulatividade plena.' },
      { parametro: 'Princípio do Destino vs Origem', impacto: 'Muda a arrecadação do local da fábrica (origem) para o local do consumidor final (destino).' },
      { parametro: 'Percentual de Cashback para Baixa Renda', impacto: 'Mecanismo de devolução de até 100% da CBS e 20% do IBS para famílias do CadÚnico.' }
    ],
    cenariosMultiplasRespostas: [
      {
        nome: 'Resposta do Sistema Anterior (Cumulativo e Fragmentado)',
        ajusteNoSimulador: 'Simule o regime antigo com 5 tributos e incidência na origem.',
        resultado: 'Guerra fiscal, contencioso judicial de trilhões, cumulatividade e perda de competitividade externa.',
        conclusao: 'Diagnóstico do "Custo Brasil" que travou o crescimento nas últimas três décadas.'
      },
      {
        nome: 'Resposta do IVA Dual no Destino (EC 132/2023)',
        ajusteNoSimulador: 'Ative a transição para o IBS e CBS com princípio do destino.',
        resultado: 'Fim da guerra fiscal, desoneração total de exportações e investimentos, ganho líquido para o Maranhão.',
        conclusao: 'Como estado consumidor líquido, o Maranhão ganha arrecadação estrutural e transparência.'
      },
      {
        nome: 'Resposta com Cashback Social Ampliado',
        ajusteNoSimulador: 'Ative a devolução máxima para energia, botijão de gás e telecomunicações da baixa renda.',
        resultado: 'Eliminação da regressividade do imposto sem criar furos de alíquotas seletivas na lei.',
        conclusao: 'Consolidação de um dos sistemas tributários mais tecnologicamente modernos do mundo.'
      }
    ],
    conclusaoPedagogica: 'A EC 132/2023 substitui um modelo caótico por um IVA Dual de padrão internacional, garantindo que o imposto pertença à sociedade onde ocorre o consumo real.'
  },

  // UNIDADE 5
  oates: {
    objetivo: 'Simular o Teorema da Descentralização de Wallace Oates e quantificar o ganho de excedente social da provisão local descentralizada vs provisão uniforme centralizada.',
    variaveisPrincipais: [
      { parametro: 'Heterogeneidade de Preferências Regionais', impacto: 'Dispersão de demandas entre capitais urbanas e municípios agrícolas ou fluviais.' },
      { parametro: 'Economias de Escala na Provisão', impacto: 'Vantagem de custo do governo central em compras ou contratos padronizados massivos.' },
      { parametro: 'Transbordamentos Interjurisdicionais (Spillovers)', impacto: 'Benefícios ou custos gerados por uma cidade que recaem sobre a cidade vizinha.' }
    ],
    cenariosMultiplasRespostas: [
      {
        nome: 'Resposta Descentralizada de Oates (Preferências Heterogêneas)',
        ajusteNoSimulador: 'Eleve a dispersão de preferências com baixos spillovers intermunicipais.',
        resultado: 'Cada jurisdição oferta a quantidade exata demandada por seus cidadãos; enorme ganho de bem-estar.',
        conclusao: 'Demonstra a superioridade alocativa da gestão descentralizada na educação e saúde municipal.'
      },
      {
        nome: 'Resposta Centralizada Uniforme (Perda de Oates)',
        ajusteNoSimulador: 'Imponha um pacote federal padronizado para todo o país.',
        resultado: 'Subatendimento nas regiões que queriam mais e desperdício de recursos onde a demanda era nula.',
        conclusao: 'Explica o insucesso de programas federais rígidos que desconsideram as peculiaridades regionais.'
      },
      {
        nome: 'Resposta com Fortes Economias de Escala ou Pandemia',
        ajusteNoSimulador: 'Eleve as economias de escala e o risco de spillovers interjurisdicionais.',
        resultado: 'A centralização da compra de vacinas e defesa nacional supera a provisão descentralizada.',
        conclusao: 'Mostra o limite técnico do teorema de Oates quando há ganhos colossais de escala.'
      }
    ],
    conclusaoPedagogica: 'Oates provou que, sob preferências diversas e sem economias de escala ou transbordamentos, governos locais ofertam bem-estar superior a qualquer governo central uniforme.'
  },

  tiebout: {
    objetivo: 'Simular a Hipótese de Tiebout ("votar com os pés") e verificar como a mobilidade espacial dos cidadãos entre municípios gera revelação de preferências e competição fiscal eficiente.',
    variaveisPrincipais: [
      { parametro: 'Mobilidade dos Cidadãos / Custo de Mudança', impacto: 'Facilidade com que as famílias trocam de município para buscar melhor custo-benefício fiscal.' },
      { parametro: 'Diferencial de Pacotes Fiscais (IPTU vs Serviços)', impacto: 'Combinações de alíquotas de tributos locais e qualidade de serviços públicos urbanos.' },
      { parametro: 'Número de Prefeituras Concorrentes', impacto: 'Jurisdições locais conurbadas disputando moradores e empresas.' }
    ],
    cenariosMultiplasRespostas: [
      {
        nome: 'Resposta de Tiebout com Plena Mobilidade',
        ajusteNoSimulador: 'Reduza o custo de mudança entre os municípios vizinhos da Grande Ilha de São Luís.',
        resultado: 'Famílias se agrupam nos municípios que atendem seus perfis; prefeituras ineficientes perdem receita.',
        conclusao: 'A concorrência horizontal simula as forças de mercado e força prefeitos a reduzirem desperdícios.'
      },
      {
        nome: 'Resposta com Inflexibilidade Habitacional (Falta de Mobilidade)',
        ajusteNoSimulador: 'Eleve o custo de mudança residencial e transporte.',
        resultado: 'A competição fiscal cessa; governos locais ineficientes mantêm cobranças abusivas sem punição.',
        conclusao: 'Explica a quebra da eficiência de Tiebout em áreas com rigidez de transporte e moradia.'
      },
      {
        nome: 'Resposta de Segregação Socioespacial',
        ajusteNoSimulador: 'Simule zoneamento excludente em condomínios de alto padrão.',
        resultado: 'Famílias ricas se isolam em enclaves com baixa alíquota de IPTU, enfraquecendo a base dos vizinhos.',
        conclusao: 'Crítica fundamental da literatura moderna ao modelo desregulado de Tiebout.'
      }
    ],
    conclusaoPedagogica: 'Tiebout demonstrou que a mobilidade dos munícipes transforma a escolha residencial em um mecanismo de quase-mercado capaz de revelar preferências por bens públicos locais.'
  },

  federalism: {
    objetivo: 'Simular transferências intergovernamentais equalizadoras (FPE e FPM) e o Efeito Flypaper ("o dinheiro gruda onde ele cai") nas finanças dos municípios maranhenses.',
    variaveisPrincipais: [
      { parametro: 'Volume de Repasses do Fundo de Participação (FPM)', impacto: 'Transferências incondicionais da União baseadas na população municipal.' },
      { parametro: 'Esforço de Arrecadação Própria (IPTU / ISS)', impacto: 'Capacidade do município de cobrar tributos de sua própria base econômica.' },
      { parametro: 'Propensão Marginal a Gastar da Burocracia Local', impacto: 'Percentual do dinheiro transferido canalizado para folha e contratações.' }
    ],
    cenariosMultiplasRespostas: [
      {
        nome: 'Resposta da Teoria Tradicional (Efeito Renda Puro)',
        ajusteNoSimulador: 'Simule o comportamento microeconômico clássico das famílias.',
        resultado: 'A prefeitura usaria o repasse federal para desonerar o IPTU local dos cidadãos.',
        conclusao: 'Predição teórica que quase nunca se verifica na prática fiscal brasileira.'
      },
      {
        nome: 'Resposta do Efeito Flypaper Empírico',
        ajusteNoSimulador: 'Observe a reação real dos gastos públicos frente ao ingresso de FPM.',
        resultado: 'Mais de 90% do recurso é absorvido pela máquina pública; a arrecadação local fica estagnada ("preguiça fiscal").',
        conclusao: 'Comprova o fenômeno comprovado por Hines e Thaler nas finanças subnacionais.'
      },
      {
        nome: 'Resposta com Regras de Incentivo ao Esforço Próprio',
        ajusteNoSimulador: 'Condicione parte das transferências ao aumento na arrecadação de IPTU e nota fiscal eletrônica.',
        resultado: 'Os municípios multiplicam a arrecadação própria e reduzem a dependência crônica de Brasília.',
        conclusao: 'Mecanismo adotado nos novos critérios do rateio do ICMS da Educação (FUNDEB).'
      }
    ],
    conclusaoPedagogica: 'Transferências incondicionais geram o efeito flypaper; equalizar desigualdades regionais exige transferências que estimulem, e não punam, o esforço arrecadatório local.'
  },

  fiscal_war: {
    objetivo: 'Simular a Guerra Fiscal do ICMS como um Dilema dos Prisioneiros na Teoria dos Jogos e testar estratégias de cooperação federativa vs defecção predatória.',
    variaveisPrincipais: [
      { parametro: 'Benefício da Atração de Investimento Privado', impacto: 'Empregos e dinamismo econômico trazidos pela nova fábrica instalada.' },
      { parametro: 'Renúncia Tributária de ICMS Concedida', impacto: 'Créditos presumidos e diferimentos fiscais que esvaziam o caixa estadual.' },
      { parametro: 'Estratégia do Estado Vizinho (Cooperar vs Desertar)', impacto: 'Decisão do estado concorrente de cumprir o CONFAZ ou conceder benefício pirata.' }
    ],
    cenariosMultiplasRespostas: [
      {
        nome: 'Resposta Cooperativa (Pacto Federativo / CONFAZ Pleno)',
        ajusteNoSimulador: 'Ambos os estados se recusam a conceder renúncias fiscais casuísticas.',
        resultado: 'A fábrica se instala onde a logística for melhor; ambos os governos mantêm suas receitas tributárias intactas.',
        conclusao: 'Ótimo de Pareto com máximo bem-estar social para o país como um todo.'
      },
      {
        nome: 'Resposta de Equilíbrio de Nash (Guerra Fiscal Predatória)',
        ajusteNoSimulador: 'Deixe ambos os governadores competirem livremente por atração unilateral.',
        resultado: 'Ambos concedem 100% de isenção ("race to the bottom"); as finanças públicas quebram e a fábrica se instalaria de qualquer forma.',
        conclusao: 'O clássico Dilema dos Prisioneiros que assolou os estados brasileiros nas últimas décadas.'
      },
      {
        nome: 'Resposta com Tributação no Destino (Solução EC 132/2023)',
        ajusteNoSimulador: 'Mude a cobrança para o local de consumo do bem (IBS no destino).',
        resultado: 'O estado de origem perde a capacidade de conceder isenções de ICMS; a guerra fiscal é estruturalmente erradicada.',
        conclusao: 'Fim definitivo da guerra fiscal predatória com resgate da segurança jurídica federativa.'
      }
    ],
    conclusaoPedagogica: 'Na guerra fiscal descentralizada, o equilíbrio individualmente racional para cada governador gera um resultado coletivamente ruinoso para a federação.'
  },

  lrf_engine: {
    objetivo: 'Simular os limites prudenciais e máximos de despesa com pessoal da Lei de Responsabilidade Fiscal (LC 101/2000) e as sanções do Tribunal de Contas (TCE-MA).',
    variaveisPrincipais: [
      { parametro: 'Receita Corrente Líquida (RCL)', impacto: 'Base constitucional de cálculo para apuração dos limites de gastos.' },
      { parametro: 'Despesa Total com Pessoal (DTP)', impacto: 'Soma dos gastos com servidores ativos, inativos, pensionistas e encargos sociais.' },
      { parametro: 'Reajustes e Contratações Pleiteadas', impacto: 'Pressão corporativa sobre a folha salarial do Poder Executivo.' }
    ],
    cenariosMultiplasRespostas: [
      {
        nome: 'Resposta em Limite Seguro (DTP < 44,1% da RCL)',
        ajusteNoSimulador: 'Mantenha a despesa de pessoal sob controle com crescimento da receita.',
        resultado: 'Gestão fiscal saudável, certidões negativas em dia e margem para novos investimentos em obras.',
        conclusao: 'Cumprimento integral dos objetivos de solvência intertemporal da LRF.'
      },
      {
        nome: 'Resposta em Limite Prudencial (DTP > 46,55% da RCL)',
        ajusteNoSimulador: 'Aumente a folha até alcançar o gatilho prudencial do Poder Executivo.',
        resultado: 'Alertas formais do TCE-MA; proibição imediata de reajustes, criação de cargos e pagamento de horas extras.',
        conclusao: 'Gatilhos automáticos constitucionais que impedem a insolvência fiscal do Estado.'
      },
      {
        nome: 'Resposta em Descumprimento do Limite Máximo (DTP > 49% da RCL)',
        ajusteNoSimulador: 'Simule queda na arrecadação combinada com reajuste salarial concedido.',
        resultado: 'Crime de responsabilidade fiscal, bloqueio de repasses voluntários da União e obrigação de demissão de comissionados.',
        conclusao: 'Rigor coercitivo da LC 101/2000 que estabilizou as finanças subnacionais no Brasil.'
      }
    ],
    conclusaoPedagogica: 'A LRF impõe restrições orçamentárias rígidas para evitar que o custeio de curto prazo da máquina administrativa canibalize os investimentos sociais de longo prazo.'
  }
};

interface CaseSimulatorRendererProps {
  caso: EstudoDeCaso;
  onNavigateToSimulatorHub?: (simuladorId: string) => void;
}

export const CaseSimulatorRenderer: React.FC<CaseSimulatorRendererProps> = ({
  caso,
  onNavigateToSimulatorHub
}) => {
  const simuladorId = caso.simuladorRecomendadoId || 'ricardian';
  const guia = GUIAS_SIMULADORES_CASOS[simuladorId];

  // Map simulator ID to active component
  const renderInteractiveSimulator = () => {
    switch (simuladorId) {
      // Unidade 1
      case 'ricardian':
        return <RicardianSimulator />;
      case 'social_welfare':
        return <SocialWelfareSimulator />;
      case 'edgeworth':
        return <EdgeworthSimulator />;
      case 'musgrave':
        return <MusgraveSimulator />;
      case 'welfare_frontier':
        return <WelfareFrontierSimulator />;

      // Unidade 2
      case 'pigou':
        return <PigouSimulator />;
      case 'samuelson':
        return <SamuelsonSimulator />;
      case 'monopoly':
        return <MonopolySimulator />;
      case 'asymmetric_info':
        return <AsymmetricInfoSimulator />;
      case 'coase':
        return <CoaseSimulator />;

      // Unidade 3
      case 'niskanen':
        return <NiskanenSimulator />;
      case 'downs':
        return <DownsSimulator />;
      case 'arrow':
        return <ArrowSimulator />;
      case 'logrolling':
        return <LogrollingSimulator />;
      case 'rent_seeking':
        return <RentSeekingSimulator />;

      // Unidade 4
      case 'tax_incidence':
        return <TaxIncidenceSimulator />;
      case 'harberger':
        return <HarbergerSimulator />;
      case 'ramsey':
        return <RamseySimulator />;
      case 'laffer':
        return <LafferSimulator />;
      case 'reforma_tributaria':
        return <ReformaTributariaSimulator />;

      // Unidade 5
      case 'oates':
        return <OatesSimulator />;
      case 'tiebout':
        return <TieboutSimulator />;
      case 'federalism':
        return <FederalismSimulator />;
      case 'fiscal_war':
        return <FiscalWarSimulator />;
      case 'lrf_engine':
        return <LrfSimulator />;

      default:
        return <RicardianSimulator />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner de Conexão: Caso Real + Simulador Interativo */}
      <div className="bg-linear-to-r from-[#002752] to-[#003875] text-white p-5 rounded-2xl border-l-4 border-[#ebc000] shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#ebc000] text-[#002752] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Simulador Aplicado ao Caso #{caso.numeroNaUnidade}
          </span>
          <span className="text-xs text-slate-300">
            Unidade {caso.unidadeNumero} • {caso.ambito}
          </span>
        </div>

        <h3 className="text-lg font-bold">
          Laboratório Interativo: Simulação de Múltiplas Respostas para o Caso
        </h3>
        <p className="text-xs text-slate-200 mt-1 max-w-3xl leading-relaxed">
          {guia?.objetivo || 'Use o simulador abaixo para alterar os parâmetros do problema real e observar os equilíbrios alternativos de política pública.'}
        </p>
      </div>

      {/* Painel do Guia de Múltiplas Respostas e Hipóteses a Testar */}
      {guia && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#002752]" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#002752]">
              Roteiro de Simulação: Como Chegar às Múltiplas Respostas
            </h4>
          </div>

          {/* Variáveis para ajustar no simulador */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {guia.variaveisPrincipais.map((v, i) => (
              <div key={i} className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                <span className="font-bold text-[#002752] flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-[#00733f]" />
                  {v.parametro}
                </span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {v.impacto}
                </p>
              </div>
            ))}
          </div>

          {/* Cenários de Múltiplas Respostas para testar */}
          <div className="space-y-2.5 pt-2 border-t border-slate-200">
            <span className="text-[11px] font-bold text-slate-700 block">
              3 Cenários de Resposta para Você Simular Agora:
            </span>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              {guia.cenariosMultiplasRespostas.map((c, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#002752]/40 transition-colors space-y-2 text-xs"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#002752] text-[#ebc000] text-[10px] font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <h5 className="font-bold text-[#002752] line-clamp-1">
                      {c.nome}
                    </h5>
                  </div>

                  <div className="text-[11px] text-slate-700 space-y-1">
                    <p>
                      <strong>Ação no Simulador:</strong> {c.ajusteNoSimulador}
                    </p>
                    <p className="text-emerald-800">
                      <strong>Resultado Observado:</strong> {c.resultado}
                    </p>
                    <p className="text-slate-500 italic text-[10px]">
                      <strong>Diagnóstico:</strong> {c.conclusao}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* O Simulador Interativo Renderizado Diretamente */}
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-200">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#00733f]">
              Simulador Ativo Conectado ao Caso
            </span>
            <h4 className="text-sm sm:text-base font-bold text-[#002752]">
              {caso.titulo}
            </h4>
          </div>

          {onNavigateToSimulatorHub && (
            <button
              onClick={() => onNavigateToSimulatorHub(simuladorId)}
              className="text-xs text-slate-500 hover:text-[#002752] font-semibold flex items-center gap-1 cursor-pointer"
              title="Abrir este simulador no modo avançado da aba Simuladores"
            >
              Abrir no Hub Geral <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Instância do Simulador */}
        <div className="simulator-case-embed">
          {renderInteractiveSimulator()}
        </div>
      </div>

      {/* Conclusão Pedagógica da Simulação */}
      {guia?.conclusaoPedagogica && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div className="space-y-1 leading-relaxed">
            <strong className="block text-emerald-900 font-bold">
              Síntese Econômica da Simulação para o Caso:
            </strong>
            <p>{guia.conclusaoPedagogica}</p>
          </div>
        </div>
      )}
    </div>
  );
};
