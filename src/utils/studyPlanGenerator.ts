import { Questao } from '../types';
import { TOPICOS_CATALOGO } from '../data/questionBankEngine';
import { AULAS_CURSO } from '../data/lessonsData';
import { UNIDADES_CURRICULARES, GOOGLE_DRIVE_REPO } from '../data/questionsData';

export interface DiagnosticoUnidade {
  unidade: number;
  nome: string;
  acertos: number;
  total: number;
  taxa: number;
  status: 'Consolidado' | 'Atenção' | 'Crítico';
}

export interface DiagnosticoConteudo {
  topico: string;
  unidade: number;
  aulaNumero: number;
  acertos: number;
  total: number;
  taxa: number;
  status: 'Forte' | 'Neutro' | 'Fraco';
  descricao: string;
}

export interface EtapaRoteiroEstudo {
  etapa: number;
  titulo: string;
  acao: string;
  aulasRecomendadas: string;
  aulasIds: number[];
  leituras: string;
  simuladorRecomendado?: string;
  simuladorId?: string;
  conceitosChave: string[];
}

export interface QuestaoRevisao {
  id: string;
  enunciado: string;
  suaResposta: string;
  respostaCorreta: string;
  textoCorreto: string;
  justificativa: string;
  referencia: string;
  topico: string;
  unidade: number;
  aulaNumero: number;
}

export interface AnaliseDesempenhoCompleta {
  acertos: number;
  total: number;
  taxaGeral: number;
  nota: number;
  tempoGastoFormatado: string;
  diagnosticoUnidades: DiagnosticoUnidade[];
  diagnosticoConteudos: DiagnosticoConteudo[];
  pontosFortes: string[];
  pontosFracos: string[];
  etapasRoteiro: EtapaRoteiroEstudo[];
  questoesParaRevisao: QuestaoRevisao[];
  topicosParaRecuperacaoIds: string[];
  unidadesParaRecuperacao: number[];
}

export function gerarAnaliseDesempenhoERoteiro(
  questoes: Questao[],
  respostas: Record<string, 'A' | 'B' | 'C' | 'D' | 'E'>,
  tempoGastoSegundos: number
): AnaliseDesempenhoCompleta {
  let acertos = 0;
  const total = questoes.length;

  // 1. Agrupamento por Unidade
  const mapaUnidades: Record<number, { acertos: number; total: number }> = {};
  // 2. Agrupamento por Tópico / Conteúdo
  const mapaConteudos: Record<string, { acertos: number; total: number; unidade: number; aula: number }> = {};
  // 3. Questões com Erro para Revisão
  const questoesParaRevisao: QuestaoRevisao[] = [];

  questoes.forEach((q) => {
    // Unidade
    if (!mapaUnidades[q.unidade]) {
      mapaUnidades[q.unidade] = { acertos: 0, total: 0 };
    }
    mapaUnidades[q.unidade].total++;

    // Conteúdo / Tópico
    const topicoNome = q.topico || `Conteúdo Unidade ${q.unidade}`;
    if (!mapaConteudos[topicoNome]) {
      mapaConteudos[topicoNome] = {
        acertos: 0,
        total: 0,
        unidade: q.unidade,
        aula: q.aula_relacionada || 1
      };
    }
    mapaConteudos[topicoNome].total++;

    const resp = respostas[q.id];
    const estaCorreta = resp === q.resposta_correta;

    if (estaCorreta) {
      acertos++;
      mapaUnidades[q.unidade].acertos++;
      mapaConteudos[topicoNome].acertos++;
    } else {
      questoesParaRevisao.push({
        id: q.id,
        enunciado: q.enunciado,
        suaResposta: resp || 'Em branco',
        respostaCorreta: q.resposta_correta,
        textoCorreto: q.alternativas[q.resposta_correta] || '',
        justificativa: q.justificativa,
        referencia: q.referencia_bibliografica || '',
        topico: topicoNome,
        unidade: q.unidade,
        aulaNumero: q.aula_relacionada || 1
      });
    }
  });

  const taxaGeral = total > 0 ? (acertos / total) * 100 : 0;
  const nota = total > 0 ? (acertos / total) * 10 : 0;

  // Montar lista de Diagnóstico de Unidades
  const diagnosticoUnidades: DiagnosticoUnidade[] = Object.keys(mapaUnidades).map((uStr) => {
    const uNum = Number(uStr);
    const dadosU = mapaUnidades[uNum];
    const taxa = dadosU.total > 0 ? (dadosU.acertos / dadosU.total) * 100 : 0;
    const unidadeObj = UNIDADES_CURRICULARES.find((u) => u.numero === uNum);
    const nome = unidadeObj ? unidadeObj.titulo : `Unidade ${uNum}`;

    let status: 'Consolidado' | 'Atenção' | 'Crítico' = 'Consolidado';
    if (taxa < 50) {
      status = 'Crítico';
    } else if (taxa < 70) {
      status = 'Atenção';
    }

    return {
      unidade: uNum,
      nome,
      acertos: dadosU.acertos,
      total: dadosU.total,
      taxa,
      status
    };
  });

  // Montar lista de Diagnóstico de Conteúdos
  const diagnosticoConteudos: DiagnosticoConteudo[] = Object.keys(mapaConteudos).map((topicoNome) => {
    const dadosC = mapaConteudos[topicoNome];
    const taxa = dadosC.total > 0 ? (dadosC.acertos / dadosC.total) * 100 : 0;

    const topicoInfo = TOPICOS_CATALOGO.find(
      (t) => t.nome.toLowerCase() === topicoNome.toLowerCase() || topicoNome.toLowerCase().includes(t.nome.toLowerCase())
    );

    let status: 'Forte' | 'Neutro' | 'Fraco' = 'Neutro';
    if (taxa >= 75) {
      status = 'Forte';
    } else if (taxa < 50 || (dadosC.total === 1 && dadosC.acertos === 0)) {
      status = 'Fraco';
    }

    return {
      topico: topicoNome,
      unidade: dadosC.unidade,
      aulaNumero: dadosC.aula,
      acertos: dadosC.acertos,
      total: dadosC.total,
      taxa,
      status,
      descricao: topicoInfo ? topicoInfo.descricao : 'Tópico integrante da ementa curricular de Finanças Públicas'
    };
  });

  // Ordenar conteúdos: primeiro os fracos (prioridade), depois neutros, depois fortes
  diagnosticoConteudos.sort((a, b) => a.taxa - b.taxa);

  // Identificar Pontos Fortes e Pontos Fracos
  const pontosFortes: string[] = [];
  const pontosFracos: string[] = [];
  const topicosParaRecuperacaoIds: string[] = [];
  const unidadesParaRecuperacaoSet = new Set<number>();

  diagnosticoConteudos.forEach((c) => {
    if (c.status === 'Forte') {
      pontosFortes.push(
        `Domínio consolidado em "${c.topico}" (Unidade ${c.unidade}, Aula ${c.aulaNumero}): ${c.taxa.toFixed(0)}% de acerto.`
      );
    } else if (c.status === 'Fraco') {
      pontosFracos.push(
        `Lacuna em "${c.topico}" (Unidade ${c.unidade}, Aula ${c.aulaNumero}): taxa de acerto de apenas ${c.taxa.toFixed(0)}%. Requer revisão conceitual imediata.`
      );
      unidadesParaRecuperacaoSet.add(c.unidade);
      const topicoInfo = TOPICOS_CATALOGO.find((t) => t.nome.toLowerCase() === c.topico.toLowerCase());
      if (topicoInfo) {
        topicosParaRecuperacaoIds.push(topicoInfo.id);
      }
    }
  });

  // Se o aluno acertou tudo
  if (pontosFortes.length === 0 && taxaGeral >= 70) {
    pontosFortes.push('Excelente aproveitamento geral nas questões respondidas.');
  }
  // Se o aluno não errou nada
  if (pontosFracos.length === 0) {
    pontosFracos.push('Nenhuma deficiência crítica identificada nesta amostragem. Continue revisando para manter o ritmo.');
  }

  // Montar Etapas do Roteiro de Estudos Personalizado
  const etapasRoteiro: EtapaRoteiroEstudo[] = [];
  let etapaContador = 1;

  // Se houver fraquezas na Unidade 1
  const fraquezaU1 = diagnosticoConteudos.some((c) => c.unidade === 1 && c.status === 'Fraco');
  if (fraquezaU1) {
    etapasRoteiro.push({
      etapa: etapaContador++,
      titulo: 'Revisão das Funções de Musgrave & Teoremas do Bem-Estar',
      acao: 'Estudar a distinção rigorosa entre Finanças Neutras e Finanças Funcionais, as 3 funções clássicas de Musgrave (Alocativa, Distributiva e Estabilizadora) e a Caixa de Edgeworth.',
      aulasRecomendadas: 'Aula 01 e Aula 02 do Plano de Ensino',
      aulasIds: [1, 2],
      leituras: 'Giambiagi & Além (2011, Cap. 1); Matias-Pereira (2018, Cap. 1); Buchanan (1993, Cap. 3 e 6).',
      simuladorRecomendado: 'Simulador das Funções Fiscais e Bem-Estar de Musgrave',
      simuladorId: 'musgrave',
      conceitosChave: ['Finanças Neutras vs Funcionais', 'Função Alocativa, Distributiva e Estabilizadora', '1º e 2º Teoremas do Bem-Estar', 'Equivalência Ricardiana']
    });
  }

  // Se houver fraquezas na Unidade 2
  const fraquezaU2 = diagnosticoConteudos.some((c) => c.unidade === 2 && c.status === 'Fraco');
  if (fraquezaU2) {
    etapasRoteiro.push({
      etapa: etapaContador++,
      titulo: 'Fixação de Falhas de Mercado, Bens Públicos e Coase',
      acao: 'Dominar a Condição de Samuelson (∑ TMS = TMT), a matriz de rivalidade/excludibilidade, o problema do Carona (Free-Rider), o Teorema de Coase e a regulação de monopólios naturais (P=CMg vs P=CMe).',
      aulasRecomendadas: 'Aula 03, Aula 04 e Aula 05 do Plano de Ensino',
      aulasIds: [3, 4, 5],
      leituras: 'Stiglitz (2000, Cap. 4 e 5); Coase (1960); Samuelson (1954); Arvate & Biderman (2004, Cap. 2).',
      simuladorRecomendado: 'Simulador do Teorema de Coase vs Imposto Pigouviano e Condição de Samuelson',
      simuladorId: 'coase',
      conceitosChave: ['Condição de Samuelson (∑ TMS = TMT)', 'Teorema de Coase e Custos de Transação', 'Subaditividade de Custos em Monopólios', 'Bens de Clube de Buchanan']
    });
  }

  // Se houver fraquezas na Unidade 3
  const fraquezaU3 = diagnosticoConteudos.some((c) => c.unidade === 3 && c.status === 'Fraco');
  if (fraquezaU3) {
    etapasRoteiro.push({
      etapa: etapaContador++,
      titulo: 'Aprofundamento na Teoria da Escolha Pública (Public Choice)',
      acao: 'Revisar os postulados da Escola da Virgínia, o modelo de burocrata maximizador de orçamento de Niskanen (BT=CT), o Teorema da Impossibilidade de Arrow e o Teorema do Eleitor Mediano de Anthony Downs.',
      aulasRecomendadas: 'Aula 09 e Aula 10 do Plano de Ensino',
      aulasIds: [9, 10],
      leituras: 'Downs (1999, Cap. 2, 3 e 8); Niskanen (1971); Arrow (1951); Tullock (1967, Rent-Seeking).',
      simuladorRecomendado: 'Simulador de Equilíbrio Eleitoral e Competição Bipartidária de Downs',
      simuladorId: 'downs',
      conceitosChave: ['Teorema do Eleitor Mediano de Downs', 'Maximizador de Orçamento de Niskanen (BT=CT)', 'Paradoxo de Condorcet e Axiomas de Arrow', 'Rent-Seeking e Desperdício Social']
    });
  }

  // Se houver fraquezas na Unidade 4
  const fraquezaU4 = diagnosticoConteudos.some((c) => c.unidade === 4 && c.status === 'Fraco');
  if (fraquezaU4) {
    etapasRoteiro.push({
      etapa: etapaContador++,
      titulo: 'Domínio de Eficiência Tributária, Harberger e Ramsey',
      acao: 'Praticar o cálculo da perda de peso morto de Harberger (DWL ∝ t²), a regra da elasticidade inversa de Ramsey, o repasse da incidência econômica (dependência das elasticidades de oferta e demanda) e a Reforma Tributária (EC 132/2023).',
      aulasRecomendadas: 'Aula 06, Aula 07 e Aula 08 do Plano de Ensino',
      aulasIds: [6, 7, 8],
      leituras: 'Harberger (1964); Ramsey (1927); Giambiagi & Além (Cap. 4); Appy (2017); EC 132/2023.',
      simuladorRecomendado: 'Simulador Microeconômico de Peso Morto de Harberger & Elasticidade Tributária',
      simuladorId: 'harberger',
      conceitosChave: ['Triângulo de Harberger (DWL ∝ t²)', 'Regra da Elasticidade Inversa de Ramsey', 'Incidência Econômica vs Jurídica', 'Dual IVA (IBS/CBS) na EC 132/2023']
    });
  }

  // Se houver fraquezas na Unidade 5
  const fraquezaU5 = diagnosticoConteudos.some((c) => c.unidade === 5 && c.status === 'Fraco');
  if (fraquezaU5) {
    etapasRoteiro.push({
      etapa: etapaContador++,
      titulo: 'Consolidação de Federalismo Fiscal, Efeito Flypaper e LRF',
      acao: 'Analisar o Teorema da Descentralização de Oates, o modelo de migração residencial de Tiebout ("votando com os pés"), as distorções do Efeito Flypaper em transferências FPE/FPM e os limites fiscais da LC 101/2000 e LC 200/2023.',
      aulasRecomendadas: 'Aula 11 e Aula 12 do Plano de Ensino',
      aulasIds: [11, 12],
      leituras: 'Oates (1972); Tiebout (1956); Giambiagi (Cap. 7 e 8); Lei de Responsabilidade Fiscal (LC 101/2000).',
      simuladorRecomendado: 'Simulador de Federalismo Fiscal e Alocação Local de Tiebout',
      simuladorId: 'tiebout',
      conceitosChave: ['Teorema da Descentralização de Oates', 'Modelo de Tiebout ("Votando com os Pés")', 'Efeito Flypaper nas Transferências Governamentais', 'Limites Fiscais da LRF']
    });
  }

  // Se não houver fraquezas específicas ou poucas questões
  if (etapasRoteiro.length === 0) {
    etapasRoteiro.push({
      etapa: 1,
      titulo: 'Revisão Geral e Manutenção do Alto Desempenho',
      acao: 'Realizar baterias de simulados com questões de complexidade Alta e Média-Alta para consolidar os teoremas centrais da disciplina antes das provas regimentais.',
      aulasRecomendadas: 'Aulas 01 a 12 do Plano de Ensino',
      aulasIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      leituras: 'Consulte os textos seminais no repositório oficial do Google Drive da disciplina.',
      simuladorRecomendado: 'Simuladores Interativos da UEMA',
      conceitosChave: ['Revisão Geral de Ementa 60h', 'Resolução de Casos Práticos de Finanças Públicas']
    });
  }

  // Adicionar etapa final de treinamento prático
  etapasRoteiro.push({
    etapa: etapaContador,
    titulo: 'Simulado de Fechamento Focado na Recuperação',
    acao: 'Executar novo simulado parametrizado especificamente nas unidades e tópicos com lacunas até atingir índice de acerto superior a 80%.',
    aulasRecomendadas: 'Módulo de Simulados Personalizados',
    aulasIds: [],
    leituras: 'Anotações pessoais e fichamentos de aula da disciplina.',
    conceitosChave: ['Recuperação Formativa', 'Autoavaliação Contínua']
  });

  const min = Math.floor(tempoGastoSegundos / 60);
  const s = tempoGastoSegundos % 60;
  const tempoGastoFormatado = `${min.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

  return {
    acertos,
    total,
    taxaGeral,
    nota,
    tempoGastoFormatado,
    diagnosticoUnidades,
    diagnosticoConteudos,
    pontosFortes,
    pontosFracos,
    etapasRoteiro,
    questoesParaRevisao,
    topicosParaRecuperacaoIds,
    unidadesParaRecuperacao: Array.from(unidadesParaRecuperacaoSet)
  };
}
