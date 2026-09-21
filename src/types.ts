export type Dificuldade = 'Baixa' | 'Média-Baixa' | 'Média' | 'Média-Alta' | 'Alta';

export interface Alternativas {
  A: string;
  B: string;
  C: string;
  D: string;
  E: string;
}

export interface Questao {
  id: string;
  unidade: number; // 1: Fundamentos, 2: Tributação, 3: Escolha Pública & Federalismo
  aula_relacionada: number; // 1 a 12
  topico: string;
  dificuldade: Dificuldade;
  enunciado: string;
  alternativas: Alternativas;
  resposta_correta: 'A' | 'B' | 'C' | 'D' | 'E';
  justificativa: string;
  referencia_bibliografica?: string;
}

export interface ReferenciaDetalhada {
  autor: string;
  ano: number | string;
  obra: string;
  capituloOuPaginas: string;
  contribuicaoChave: string;
  linkDrive?: string;
}

export interface ZettelkastenCard {
  id: string; // Ex: "Z-01.01", "Z-02.01", etc.
  aulaNumero: number;
  conceito: string; // Título atômico do conceito
  teseCentral: string; // Definição rigorosa e concisa da ideia
  fundamentacaoTeorica: string; // Explicação aprofundada do mecanismo micro/macroeconômico
  aplicabilidadePratica: string; // Aplicação concreta no Setor Público (Brasil / Maranhão / Gestão Fiscal)
  equacaoOuRegra?: string; // Equação, condição ou teorema matemático
  conexoes: string[]; // IDs cruzados para outros Zettels (e.g. ["Z-02.01", "Z-05.01"])
  referenciaBibliografica: string; // Autor, ano e capítulo no Google Drive
  tags: string[]; // e.g. ["#FalhasDeMercado", "#Eficiencia", "#Equilibrio"]
}

export interface Aula {
  numero: number;
  modulo: number;
  moduloNome: string;
  unidadeNumero?: number;
  unidadeNome?: string;
  titulo: string;
  subtitulo: string;
  referencias: string[];
  referenciasDetalhadas?: ReferenciaDetalhada[];
  foco: string;
  topicosChave: string[];
  conceitosTeoricos: {
    termo: string;
    definicao: string;
  }[];
  aplicabilidadeSetorPublico?: {
    ambitoFederal?: string;
    ambitoEstadualMaranhao?: string;
    impactoPoliticaPublica: string;
  };
  equacaoChave?: {
    formula: string;
    descricao: string;
  };
  zettelkasten?: ZettelkastenCard[];
  simuladorAssociado?: string;
  drivePath?: string;
}

export interface SubtopicoUnidade {
  numero: number;
  titulo: string;
  referenciasTexto: string;
  referenciasDetalhadas?: string[];
}

export interface UnidadeCurricular {
  numero: number;
  titulo: string;
  cargaHoraria: string; // Ex: "10h", "12h", "16h"
  cargaHorariaHoras: number;
  descricao: string;
  subtopicos: SubtopicoUnidade[];
  aulasRelacionadas: number[]; // e.g. [1, 2]
  avaliacaoRelacionada: string; // e.g. "1ª Avaliação (P1)"
  simuladores: string[];
  competencias: string[];
  referencias: string[];
}

export interface ReferenciaOficial {
  id: number;
  categoria: 'Principal' | 'Complementar';
  autores: string;
  ano: number;
  titulo: string;
  detalhes: string;
  citacaoABNT: string;
  unidadesRelacionadas: number[];
}

export interface AlunoDesempenho {
  id: string;
  nome: string;
  matricula: string;
  email: string;
  progressoAulas: number; // percentual 0 - 100
  mediaSimulados: number; // nota 0 - 10
  questoesRespondidas: number;
  taxaAcerto: number; // percentual 0 - 100
  taxaPorDificuldade: {
    baixa: number;
    mediaBaixa: number;
    media: number;
    mediaAlta: number;
    alta: number;
  };
  pontosFracos: string[];
  statusRisco: 'Estável' | 'Atenção' | 'Crítico';
  ultimoAcesso: string;
  simuladosConcluidos: number;
}

export interface SimuladoConfig {
  dificuldade?: Dificuldade | 'Todas';
  unidade?: number | 'Todas';
  aula?: number | 'Todas';
  quantidade: number;
  tempoMinutos: number;
  modoEstudo: boolean; // se true, mostra gabarito na hora; se false, só ao finalizar
}

export interface ResultadoSimulado {
  id: string;
  data: string;
  respostas: Record<string, 'A' | 'B' | 'C' | 'D' | 'E'>;
  acertos: number;
  total: number;
  nota: number;
  tempoGastoSegundos: number;
  dificuldade: string;
  detalhesPorUnidade: Record<number, { acertos: number; total: number }>;
}

export interface TurmaKPIs {
  totalAlunos: number;
  taxaConclusaoAulas: number;
  mediaGeralTurma: number;
  totalQuestoesResolvidas: number;
  questoesPorDificuldadeAcerto: {
    dificuldade: string;
    taxa: number;
  }[];
  desempenhoPorUnidade: {
    unidade: string;
    media: number;
    taxaAcerto: number;
    topicoCritico: string;
  }[];
}

// Modelagem para Firestore / Supabase Schemas
export interface UserDocument {
  uid: string;
  nome: string;
  email: string;
  papel: 'aluno' | 'professor' | 'monitor';
  matricula?: string;
  criadoEm: string;
  ultimoLogin: string;
  avatarUrl?: string;
}

export interface CronogramaItem {
  aulaId: number;
  unidade: number;
  titulo: string;
  dataPrevista: string;
  status: 'Concluída' | 'Em Andamento' | 'Programada';
  materiaisDriveUrl: string;
}

export interface UserProgressDocument {
  userId: string;
  aulasConcluidas: number[]; // ids das aulas (1..12)
  simuladosRealizados: number;
  questoesCorretas: number;
  questoesIncorretas: number;
  ultimaAtividade: string;
  tempoTotalEstudoMinutos: number;
  simuladoresExplorados: string[];
}

export interface PerguntaFixacaoCaso {
  id: string;
  pergunta: string;
  opcoes: {
    id: 'A' | 'B' | 'C' | 'D';
    texto: string;
    explicacao: string;
  }[];
  respostaCorreta: 'A' | 'B' | 'C' | 'D';
  conceitoChave: string;
}

export interface GuiaSimulacaoCaso {
  objetivoSimulacao: string;
  instrucoesNoSimulador: string;
  variaveisParaAjustar: {
    parametro: string;
    efeitoNoCaso: string;
  }[];
  cenariosMultiplasRespostas: {
    cenario: string;
    ajusteRecomendado: string;
    respostaEsperada: string;
    diagnosticoPoliticaPublica: string;
  }[];
  conclusaoEconomica: string;
}

export interface EstudoDeCaso {
  id: string; // Ex: "CASO-U1-01"
  unidadeNumero: number; // 1 a 5
  numeroNaUnidade: number; // 1 a 5
  titulo: string;
  subtitulo: string;
  ambito: 'Federal' | 'Estadual (Maranhão)' | 'Municipal' | 'Internacional/Comparado';
  contextoEconomico: string; // Situação real/problema prático detalhado
  dilemaFiscal: string; // Qual o conflito econômico a ser resolvido
  teoriaAplicada: {
    conceito: string;
    autoresChave: string;
    mecanismo: string;
  };
  dadosCenarios: {
    indicador: string;
    valor: string;
    interpretacao: string;
  }[];
  perguntasFixacao: PerguntaFixacaoCaso[];
  simuladorRecomendadoId?: string;
  guiaSimulacao?: GuiaSimulacaoCaso;
  leituraRecomendadaDrive: {
    obra: string;
    autor: string;
    capitulo: string;
  };
}

export interface UsuarioAutenticado {
  uid: string;
  nome: string;
  email: string;
  papel: 'professor' | 'aluno';
  matriculaOuSiape: string;
  turma?: string;
  criadoEm: string;
  fotoPerfil?: string;
}

