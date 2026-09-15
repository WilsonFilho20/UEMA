export interface SchemaItem {
  colecao: string;
  descricao: string;
  chavePrimaria: string;
  campos: {
    nome: string;
    tipo: string;
    obrigatorio: boolean;
    descricao: string;
    exemplo: string;
  }[];
  indicesRecomendados: string[];
}

export const FIRESTORE_SCHEMAS: SchemaItem[] = [
  {
    colecao: 'users',
    descricao: 'Armazena credenciais e perfis de professores, alunos e monitores da UEMA.',
    chavePrimaria: 'uid (Firebase Auth UID)',
    campos: [
      { nome: 'uid', tipo: 'string', obrigatorio: true, descricao: 'ID único do usuário gerado pelo Firebase Auth', exemplo: 'usr_uema_7719a' },
      { nome: 'nome', tipo: 'string', obrigatorio: true, descricao: 'Nome completo do aluno ou docente', exemplo: 'Carlos Eduardo Meireles' },
      { nome: 'email', tipo: 'string', obrigatorio: true, descricao: 'Email institucional ou pessoal cadastrado', exemplo: 'carlos.meireles@aluno.uema.br' },
      { nome: 'papel', tipo: 'string (aluno | professor | monitor)', obrigatorio: true, descricao: 'Nível de controle de acesso (RBAC)', exemplo: 'aluno' },
      { nome: 'matricula', tipo: 'string', obrigatorio: false, descricao: 'Código de matrícula no curso de Ciências Econômicas', exemplo: '2022.1.ECO.0028' },
      { nome: 'turmaId', tipo: 'string', obrigatorio: true, descricao: 'Identificador da turma/semestre', exemplo: '2026_2_ECO_UEMA' },
      { nome: 'criadoEm', tipo: 'timestamp', obrigatorio: true, descricao: 'Data e hora do cadastro', exemplo: '2026-08-01T10:00:00Z' },
      { nome: 'ultimoAcesso', tipo: 'timestamp', obrigatorio: true, descricao: 'Registro do último login ou atividade', exemplo: '2026-09-15T14:30:00Z' }
    ],
    indicesRecomendados: ['papel ASC, turmaId ASC', 'email ASC']
  },
  {
    colecao: 'cronograma',
    descricao: 'Ementa oficial e planejamento cronológico das 12 aulas da disciplina.',
    chavePrimaria: 'aulaId (número inteiro de 1 a 12)',
    campos: [
      { nome: 'aulaId', tipo: 'number', obrigatorio: true, descricao: 'Ordem sequencial da aula no semestre (1 a 12)', exemplo: '2' },
      { nome: 'modulo', tipo: 'number', obrigatorio: true, descricao: 'Módulo acadêmico (1, 2 ou 3)', exemplo: '1' },
      { nome: 'titulo', tipo: 'string', obrigatorio: true, descricao: 'Título principal da aula conforme plano de ensino', exemplo: 'As Funções Clássicas do Estado e Eficiência de Pareto' },
      { nome: 'subtitulo', tipo: 'string', obrigatorio: true, descricao: 'Subtópicos teóricos abordados', exemplo: 'Alocativa, Distributiva, Estabilizadora e Caixa de Edgeworth' },
      { nome: 'referencias', tipo: 'array<string>', obrigatorio: true, descricao: 'Citações formais das obras na pasta do Google Drive', exemplo: '["Musgrave (1959)", "Stiglitz & Rosengard (2016)"]' },
      { nome: 'simuladorId', tipo: 'string', obrigatorio: false, descricao: 'Identificador do simulador econômico associado', exemplo: 'edgeworth' },
      { nome: 'status', tipo: 'string', obrigatorio: true, descricao: 'Status pedagógico (Concluída | Em Andamento | Programada)', exemplo: 'Concluída' },
      { nome: 'dataPrevista', tipo: 'timestamp', obrigatorio: true, descricao: 'Data de realização da aula', exemplo: '2026-08-20T14:00:00Z' }
    ],
    indicesRecomendados: ['modulo ASC, aulaId ASC']
  },
  {
    colecao: 'questoes',
    descricao: 'Banco com 1.000 questões categorizadas em 5 níveis de dificuldade e vinculadas às aulas.',
    chavePrimaria: 'id (ex: Q-0001)',
    campos: [
      { nome: 'id', tipo: 'string', obrigatorio: true, descricao: 'Identificador padronizado da questão', exemplo: 'Q-0005' },
      { nome: 'unidade', tipo: 'number', obrigatorio: true, descricao: 'Unidade temático-curricular (1, 2 ou 3)', exemplo: '3' },
      { nome: 'aula_relacionada', tipo: 'number', obrigatorio: true, descricao: 'Número da aula correspondente (1 a 12)', exemplo: '10' },
      { nome: 'topico', tipo: 'string', obrigatorio: true, descricao: 'Conceito econômico avaliado', exemplo: 'Teorema da Impossibilidade de Arrow' },
      { nome: 'dificuldade', tipo: 'string (Baixa | Média-Baixa | Média | Média-Alta | Alta)', obrigatorio: true, descricao: 'Nível na matriz de avaliação pedagógica', exemplo: 'Alta' },
      { nome: 'enunciado', tipo: 'string', obrigatorio: true, descricao: 'Texto descritivo do problema microeconômico', exemplo: 'No contexto da agregação de preferências sociais...' },
      { nome: 'alternativas', tipo: 'map { A, B, C, D, E }', obrigatorio: true, descricao: 'Dicionário com os cinco itens de múltipla escolha', exemplo: '{"A": "...", "B": "...", ...}' },
      { nome: 'resposta_correta', tipo: 'string', obrigatorio: true, descricao: 'Letra da alternativa correta (A, B, C, D, E)', exemplo: 'B' },
      { nome: 'justificativa', tipo: 'string', obrigatorio: true, descricao: 'Gabarito comentado com embasamento teórico detalhado', exemplo: 'Conforme detalhado em Arvate & Biderman (2004)...' },
      { nome: 'referencia_bibliografica', tipo: 'string', obrigatorio: true, descricao: 'Citação bibliográfica e capítulo de referência', exemplo: 'Arrow (1963); Arvate & Biderman (2004, p. 235)' }
    ],
    indicesRecomendados: ['dificuldade ASC, aula_relacionada ASC', 'unidade ASC, dificuldade ASC']
  },
  {
    colecao: 'desempenho_alunos',
    descricao: 'Histórico agregado de notas, acertos por nível e acompanhamento do professor.',
    chavePrimaria: 'alunoId (referência ao UID do user)',
    campos: [
      { nome: 'alunoId', tipo: 'string', obrigatorio: true, descricao: 'Chave estrangeira do usuário aluno', exemplo: 'ALU-202602' },
      { nome: 'progressoAulas', tipo: 'number', obrigatorio: true, descricao: 'Percentual de aulas concluídas (0 a 100%)', exemplo: '83' },
      { nome: 'mediaSimulados', tipo: 'number', obrigatorio: true, descricao: 'Média ponderada nas avaliações simuladas (0 a 10)', exemplo: '7.8' },
      { nome: 'questoesRespondidas', tipo: 'number', obrigatorio: true, descricao: 'Quantidade cumulativa de questões resolvidas', exemplo: '65' },
      { nome: 'taxaAcerto', tipo: 'number', obrigatorio: true, descricao: 'Percentual geral de acerto (0 a 100%)', exemplo: '73.8' },
      { nome: 'taxaPorDificuldade', tipo: 'map { baixa, mediaBaixa, media, mediaAlta, alta }', obrigatorio: true, descricao: 'Acurácia discriminada por grau de complexidade', exemplo: '{"baixa": 90, "alta": 40}' },
      { nome: 'pontosFracos', tipo: 'array<string>', obrigatorio: true, descricao: 'Tópicos com acerto inferior a 50% para intervenção docente', exemplo: '["Axioma IIA de Arrow", "Monopólio P=CMg"]' },
      { nome: 'statusRisco', tipo: 'string (Estável | Atenção | Crítico)', obrigatorio: true, descricao: 'Classificação de risco de reprovação', exemplo: 'Estável' },
      { nome: 'simuladosConcluidos', tipo: 'number', obrigatorio: true, descricao: 'Total de baterias de simulado finalizadas', exemplo: '6' }
    ],
    indicesRecomendados: ['statusRisco ASC, mediaSimulados ASC', 'progressoAulas DESC']
  },
  {
    colecao: 'user_progress',
    descricao: 'Rastreamento granular de aulas lidas, tempo de estudo e uso de simuladores.',
    chavePrimaria: 'userId',
    campos: [
      { nome: 'userId', tipo: 'string', obrigatorio: true, descricao: 'Identificador do estudante', exemplo: 'usr_uema_7719a' },
      { nome: 'aulasConcluidas', tipo: 'array<number>', obrigatorio: true, descricao: 'Lista de IDs das aulas concluídas', exemplo: '[1, 2, 3, 4, 5, 6]' },
      { nome: 'simuladoresExplorados', tipo: 'array<string>', obrigatorio: true, descricao: 'Ferramentas de simulação testadas pelo aluno', exemplo: '["edgeworth", "harberger", "niskanen"]' },
      { nome: 'tempoTotalEstudoMinutos', tipo: 'number', obrigatorio: true, descricao: 'Tempo total dedicado na plataforma', exemplo: '420' },
      { nome: 'ultimaAtividade', tipo: 'timestamp', obrigatorio: true, descricao: 'Carimbo de data/hora do evento mais recente', exemplo: '2026-09-12T16:45:00Z' }
    ],
    indicesRecomendados: ['ultimaAtividade DESC']
  },
  {
    colecao: 'exam_history',
    descricao: 'Registro de cada tentativa de simulado individual, com gabarito e tempo decorrido.',
    chavePrimaria: 'simuladoId (UUID)',
    campos: [
      { nome: 'simuladoId', tipo: 'string', obrigatorio: true, descricao: 'Identificador único da sessão de simulado', exemplo: 'sim_b247fc91' },
      { nome: 'userId', tipo: 'string', obrigatorio: true, descricao: 'Aluno que realizou a prova', exemplo: 'usr_uema_7719a' },
      { nome: 'dataInicio', tipo: 'timestamp', obrigatorio: true, descricao: 'Início da sessão de resolução', exemplo: '2026-09-10T14:00:00Z' },
      { nome: 'duracaoSegundos', tipo: 'number', obrigatorio: true, descricao: 'Tempo total decorrido na resolução', exemplo: '1380' },
      { nome: 'filtroDificuldade', tipo: 'string', obrigatorio: true, descricao: 'Configuração de dificuldade selecionada', exemplo: 'Média' },
      { nome: 'questoesIds', tipo: 'array<string>', obrigatorio: true, descricao: 'Vetor de IDs das questões apresentadas', exemplo: '["Q-0001", "Q-0003", "Q-0008"]' },
      { nome: 'respostasMarcadas', tipo: 'map<id, string>', obrigatorio: true, descricao: 'Respostas assinaladas pelo estudante', exemplo: '{"Q-0001": "B", "Q-0003": "A"}' },
      { nome: 'acertos', tipo: 'number', obrigatorio: true, descricao: 'Total de questões corretas', exemplo: '8' },
      { nome: 'total', tipo: 'number', obrigatorio: true, descricao: 'Total de questões da prova', exemplo: '10' },
      { nome: 'notaFinal', tipo: 'number', obrigatorio: true, descricao: 'Nota em escala decimal de 0 a 10', exemplo: '8.0' }
    ],
    indicesRecomendados: ['userId ASC, dataInicio DESC']
  }
];

export const SUPABASE_SQL_DDL = `
-- ========================================================================
-- SCHEMA SQL PARA SUPABASE / POSTGRESQL (CIÊNCIAS ECONÔMICAS - UEMA)
-- Disciplina: Teoria das Finanças Públicas
-- ========================================================================

-- Habilitar extensão UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TABELA DE USUÁRIOS
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  papel VARCHAR(50) NOT NULL CHECK (papel IN ('aluno', 'professor', 'monitor')),
  matricula VARCHAR(50),
  turma_id VARCHAR(50) DEFAULT '2026_2_ECO_UEMA',
  criado_em TIMESTAMPTZ DEFAULT NOW(),
  ultimo_acesso TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABELA DO CRONOGRAMA DAS 12 AULAS
CREATE TABLE cronograma (
  aula_id INTEGER PRIMARY KEY,
  modulo INTEGER NOT NULL CHECK (modulo IN (1, 2, 3)),
  titulo VARCHAR(255) NOT NULL,
  subtitulo TEXT,
  referencias JSONB NOT NULL DEFAULT '[]',
  simulador_id VARCHAR(100),
  status VARCHAR(50) DEFAULT 'Programada' CHECK (status IN ('Concluída', 'Em Andamento', 'Programada')),
  data_prevista DATE NOT NULL
);

-- 3. TABELA DO BANCO DE 1.000 QUESTÕES
CREATE TABLE questoes (
  id VARCHAR(50) PRIMARY KEY,
  unidade INTEGER NOT NULL CHECK (unidade IN (1, 2, 3)),
  aula_relacionada INTEGER REFERENCES cronograma(aula_id),
  topico VARCHAR(255) NOT NULL,
  dificuldade VARCHAR(50) NOT NULL CHECK (dificuldade IN ('Baixa', 'Média-Baixa', 'Média', 'Média-Alta', 'Alta')),
  enunciado TEXT NOT NULL,
  alternativas JSONB NOT NULL,
  resposta_correta CHAR(1) NOT NULL CHECK (resposta_correta IN ('A', 'B', 'C', 'D', 'E')),
  justificativa TEXT NOT NULL,
  referencia_bibliografica TEXT
);

CREATE INDEX idx_questoes_dificuldade ON questoes(dificuldade);
CREATE INDEX idx_questoes_aula ON questoes(aula_relacionada);
CREATE INDEX idx_questoes_unidade ON questoes(unidade);

-- 4. TABELA DE DESEMPENHO E ACOMPANHAMENTO DO PROFESSOR
CREATE TABLE desempenho_alunos (
  aluno_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  progresso_aulas NUMERIC(5, 2) DEFAULT 0.0 CHECK (progresso_aulas BETWEEN 0 AND 100),
  media_simulados NUMERIC(4, 2) DEFAULT 0.0 CHECK (media_simulados BETWEEN 0 AND 10),
  questoes_respondidas INTEGER DEFAULT 0,
  taxa_acerto NUMERIC(5, 2) DEFAULT 0.0 CHECK (taxa_acerto BETWEEN 0 AND 100),
  taxa_por_dificuldade JSONB DEFAULT '{"baixa": 0, "mediaBaixa": 0, "media": 0, "mediaAlta": 0, "alta": 0}',
  pontos_fracos JSONB DEFAULT '[]',
  status_risco VARCHAR(50) DEFAULT 'Estável' CHECK (status_risco IN ('Estável', 'Atenção', 'Crítico')),
  simulados_concluidos INTEGER DEFAULT 0,
  atualizado_em TIMESTAMPTZ DEFAULT NOW()
);

-- 5. HISTÓRICO DE SIMULADOS
CREATE TABLE historico_simulados (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  data_inicio TIMESTAMPTZ DEFAULT NOW(),
  duracao_segundos INTEGER NOT NULL,
  filtro_dificuldade VARCHAR(50),
  questoes_ids JSONB NOT NULL,
  respostas_marcadas JSONB NOT NULL,
  acertos INTEGER NOT NULL,
  total INTEGER NOT NULL,
  nota_final NUMERIC(4, 2) NOT NULL,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_simulados_user ON historico_simulados(user_id, data_inicio DESC);
`;

export const FIRESTORE_RULES_SPEC = `
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isProfessor() {
      return isAuthenticated() && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.papel == 'professor';
    }

    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    // Usuários podem ler seus dados; professores têm acesso de leitura geral
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow write: if isOwner(userId) || isProfessor();
    }

    // Cronograma e questões são de leitura livre para autenticados e escrita restrita ao professor
    match /cronograma/{aulaId} {
      allow read: if isAuthenticated();
      allow write: if isProfessor();
    }

    match /questoes/{questaoId} {
      allow read: if isAuthenticated();
      allow write: if isProfessor();
    }

    // Desempenho dos alunos: aluno lê o seu; professor lê e altera todos
    match /desempenho_alunos/{alunoId} {
      allow read: if isOwner(alunoId) || isProfessor();
      allow write: if isOwner(alunoId) || isProfessor();
    }

    // Histórico de simulados
    match /exam_history/{examId} {
      allow create: if isAuthenticated();
      allow read: if isOwner(resource.data.userId) || isProfessor();
      allow update, delete: if isProfessor();
    }
  }
}
`;
