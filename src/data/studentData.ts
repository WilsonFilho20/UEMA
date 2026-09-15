import { AlunoDesempenho, TurmaKPIs } from '../types';

export const TURMA_KPIS_MOCK: TurmaKPIs = {
  totalAlunos: 42,
  taxaConclusaoAulas: 68.5,
  mediaGeralTurma: 7.42,
  totalQuestoesResolvidas: 1845,
  questoesPorDificuldadeAcerto: [
    { dificuldade: 'Baixa', taxa: 88.4 },
    { dificuldade: 'Média-Baixa', taxa: 79.1 },
    { dificuldade: 'Média', taxa: 66.8 },
    { dificuldade: 'Média-Alta', taxa: 51.3 },
    { dificuldade: 'Alta', taxa: 38.6 }
  ],
  desempenhoPorUnidade: [
    {
      unidade: 'Módulo I: Fundamentos e Falhas',
      media: 8.1,
      taxaAcerto: 78.4,
      topicoCritico: 'Condição de Samuelson & Edgeworth (Aula 2 e 5)'
    },
    {
      unidade: 'Módulo II: Teoria da Tributação',
      media: 7.2,
      taxaAcerto: 67.2,
      topicoCritico: 'Regra da Elasticidade Inversa de Ramsey (Aula 8)'
    },
    {
      unidade: 'Módulo III: Escolha Pública & Federação',
      media: 6.9,
      taxaAcerto: 61.5,
      topicoCritico: 'Axiomas de Arrow & Efeito Flypaper (Aula 10 e 12)'
    }
  ]
};

export const ALUNOS_MOCK: AlunoDesempenho[] = [
  {
    id: 'ALU-202601',
    nome: 'Ana Beatriz Silveira',
    matricula: '2026.2.ECO.0014',
    email: 'anabeatriz.silveira@aluno.uema.br',
    progressoAulas: 92,
    mediaSimulados: 8.9,
    questoesRespondidas: 78,
    taxaAcerto: 84.6,
    taxaPorDificuldade: { baixa: 95, mediaBaixa: 90, media: 85, mediaAlta: 75, alta: 60 },
    pontosFracos: ['Derivação de Ramsey (Aula 8)'],
    statusRisco: 'Estável',
    ultimoAcesso: 'Hoje às 09:30',
    simuladosConcluidos: 8
  },
  {
    id: 'ALU-202602',
    nome: 'Carlos Eduardo Meireles',
    matricula: '2026.2.ECO.0028',
    email: 'carlos.meireles@aluno.uema.br',
    progressoAulas: 83,
    mediaSimulados: 7.8,
    questoesRespondidas: 65,
    taxaAcerto: 73.8,
    taxaPorDificuldade: { baixa: 90, mediaBaixa: 80, media: 70, mediaAlta: 55, alta: 40 },
    pontosFracos: ['Axioma IIA de Arrow (Aula 10)', 'Monopólio Natural P=CMg (Aula 4)'],
    statusRisco: 'Estável',
    ultimoAcesso: 'Ontem às 18:15',
    simuladosConcluidos: 6
  },
  {
    id: 'ALU-202603',
    nome: 'Fernanda Caroline Ribeiro',
    matricula: '2026.2.ECO.0041',
    email: 'fernanda.ribeiro@aluno.uema.br',
    progressoAulas: 96,
    mediaSimulados: 9.4,
    questoesRespondidas: 94,
    taxaAcerto: 91.2,
    taxaPorDificuldade: { baixa: 100, mediaBaixa: 95, media: 92, mediaAlta: 88, alta: 78 },
    pontosFracos: ['Custos de Transação de Coase (Aula 3)'],
    statusRisco: 'Estável',
    ultimoAcesso: 'Hoje às 11:05',
    simuladosConcluidos: 11
  },
  {
    id: 'ALU-202604',
    nome: 'Gabriel Antunes Pinheiro',
    matricula: '2026.2.ECO.0009',
    email: 'gabriel.pinheiro@aluno.uema.br',
    progressoAulas: 45,
    mediaSimulados: 5.4,
    questoesRespondidas: 32,
    taxaAcerto: 46.8,
    taxaPorDificuldade: { baixa: 75, mediaBaixa: 60, media: 40, mediaAlta: 25, alta: 10 },
    pontosFracos: ['Peso Morto de Harberger (Aula 6)', 'Modelo de Niskanen BT=CT (Aula 9)', 'Teorema de Arrow (Aula 10)'],
    statusRisco: 'Crítico',
    ultimoAcesso: 'Há 5 dias',
    simuladosConcluidos: 3
  },
  {
    id: 'ALU-202605',
    nome: 'Juliana Costa Ferreira',
    matricula: '2026.2.ECO.0033',
    email: 'juliana.ferreira@aluno.uema.br',
    progressoAulas: 71,
    mediaSimulados: 6.8,
    questoesRespondidas: 54,
    taxaAcerto: 64.8,
    taxaPorDificuldade: { baixa: 85, mediaBaixa: 75, media: 62, mediaAlta: 45, alta: 28 },
    pontosFracos: ['Guerra Fiscal do ICMS (Aula 12)', 'Incidência Econômica (Aula 7)'],
    statusRisco: 'Atenção',
    ultimoAcesso: 'Anteontem',
    simuladosConcluidos: 5
  },
  {
    id: 'ALU-202606',
    nome: 'Lucas Vinicius Saraiva',
    matricula: '2026.2.ECO.0022',
    email: 'lucas.saraiva@aluno.uema.br',
    progressoAulas: 88,
    mediaSimulados: 8.2,
    questoesRespondidas: 72,
    taxaAcerto: 80.5,
    taxaPorDificuldade: { baixa: 95, mediaBaixa: 88, media: 80, mediaAlta: 65, alta: 50 },
    pontosFracos: ['Modelo de Tiebout e Oates (Aula 11)'],
    statusRisco: 'Estável',
    ultimoAcesso: 'Hoje às 08:40',
    simuladosConcluidos: 7
  },
  {
    id: 'ALU-202607',
    nome: 'Mariana Duarte Alencar',
    matricula: '2026.2.ECO.0019',
    email: 'mariana.alencar@aluno.uema.br',
    progressoAulas: 52,
    mediaSimulados: 5.9,
    questoesRespondidas: 38,
    taxaAcerto: 52.6,
    taxaPorDificuldade: { baixa: 80, mediaBaixa: 65, media: 50, mediaAlta: 30, alta: 15 },
    pontosFracos: ['Equilíbrio de Edgeworth (Aula 2)', 'Regra de Ramsey (Aula 8)'],
    statusRisco: 'Atenção',
    ultimoAcesso: 'Há 3 dias',
    simuladosConcluidos: 4
  },
  {
    id: 'ALU-202608',
    nome: 'Rodrigo Mendonça Santos',
    matricula: '2026.2.ECO.0005',
    email: 'rodrigo.santos@aluno.uema.br',
    progressoAulas: 38,
    mediaSimulados: 4.8,
    questoesRespondidas: 26,
    taxaAcerto: 42.3,
    taxaPorDificuldade: { baixa: 70, mediaBaixa: 50, media: 35, mediaAlta: 20, alta: 0 },
    pontosFracos: ['Funções de Musgrave (Aula 2)', 'Efeito Flypaper (Aula 12)', 'Burocracia de Niskanen (Aula 9)'],
    statusRisco: 'Crítico',
    ultimoAcesso: 'Há 8 dias',
    simuladosConcluidos: 2
  }
];
