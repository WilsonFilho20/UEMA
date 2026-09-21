import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  setDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { ResultadoSimulado, Questao, Dificuldade, UsuarioAutenticado, DuvidaForum, RespostaForum } from '../types';

export const ALUNOS_TESTE_PADRAO = [
  'aluno_ana',
  'aluno_bruno',
  'aluno_clara',
  'aluno_diego',
  'aluno_eduardo'
];

export function isAlunoTeste(alunoId: string, alunoNome?: string, alunoMatricula?: string): boolean {
  const id = (alunoId || '').toLowerCase();
  const nome = (alunoNome || '').toLowerCase();
  const mat = (alunoMatricula || '').toLowerCase();

  if (ALUNOS_TESTE_PADRAO.includes(id)) return true;
  if (id.startsWith('aluno_') || id.startsWith('teste_') || id.includes('teste') || id.includes('mock')) return true;
  if (nome.includes('teste') || nome.includes('amostra') || nome.includes('simulado teste')) return true;
  if (['20231102901', '20231102914', '20231102928', '20231102933', '20231102947'].includes(mat)) return true;
  return false;
}

export interface RegistroSimuladoFirestore {
  id?: string;
  alunoId: string;
  alunoNome: string;
  alunoMatricula: string;
  data: string;
  timestamp: number;
  nota: number;
  acertos: number;
  total: number;
  dificuldade: string;
  unidadeFiltro: string | number;
  tempoGastoSegundos: number;
  detalhesPorUnidade?: Record<number, { acertos: number; total: number }>;
  errosQuestoesIds?: string[];
}

export interface ProvaElaboradaDocente {
  id?: string;
  titulo: string;
  professorId: string;
  unidadesSelecionadas: number[];
  dificuldadeEscolhida: string;
  qtdQuestoes: number;
  criadaEm: string;
  timestamp: number;
  questoes: Questao[];
  ajusteAutomaticoDificuldade?: {
    motivo: string;
    taxaAcertoTurma: number;
    dificuldadeSugerida: string;
  };
}

export const firestoreDataService = {
  // Salvar resultado de simulado concluído pelo discente
  async salvarResultadoSimulado(dados: {
    alunoId: string;
    alunoNome: string;
    alunoMatricula: string;
    resultado: ResultadoSimulado;
    unidadeFiltro: string | number;
    errosQuestoesIds: string[];
  }): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'simulados_realizados'), {
        alunoId: dados.alunoId,
        alunoNome: dados.alunoNome,
        alunoMatricula: dados.alunoMatricula,
        data: dados.resultado.data || new Date().toLocaleDateString('pt-BR'),
        timestamp: Date.now(),
        nota: dados.resultado.nota,
        acertos: dados.resultado.acertos,
        total: dados.resultado.total,
        dificuldade: dados.resultado.dificuldade,
        unidadeFiltro: dados.unidadeFiltro,
        tempoGastoSegundos: dados.resultado.tempoGastoSegundos,
        detalhesPorUnidade: dados.resultado.detalhesPorUnidade || {},
        errosQuestoesIds: dados.errosQuestoesIds || []
      });
      return docRef.id;
    } catch (e) {
      console.error('Erro ao salvar simulado no Firestore:', e);
      throw e;
    }
  },

  // Buscar todos os resultados de simulados da turma (para análise docente)
  async obterTodosSimulados(): Promise<RegistroSimuladoFirestore[]> {
    try {
      const snap = await getDocs(collection(db, 'simulados_realizados'));
      const lista: RegistroSimuladoFirestore[] = [];
      snap.forEach((doc) => {
        lista.push({ id: doc.id, ...(doc.data() as any) });
      });
      return lista;
    } catch (e) {
      console.error('Erro ao listar simulados do Firestore:', e);
      return [];
    }
  },

  // Escuta em tempo real dos simulados da turma conforme forem sendo realizados
  assinarSimuladosTurma(callback: (simulados: RegistroSimuladoFirestore[]) => void): () => void {
    const unsub = onSnapshot(
      collection(db, 'simulados_realizados'),
      (snapshot) => {
        const lista: RegistroSimuladoFirestore[] = [];
        snapshot.forEach((d) => {
          lista.push({ id: d.id, ...(d.data() as any) });
        });
        callback(lista.sort((a, b) => b.timestamp - a.timestamp));
      },
      (error) => {
        console.error('Erro na subscrição em tempo real de simulados:', error);
      }
    );
    return unsub;
  },

  // Simular submissões de exemplo para demonstração de telemetria em tempo real
  async simularSubmissoesAlunos(): Promise<void> {
    const amostraAlunos = [
      { id: 'aluno_ana', nome: 'Ana Carolina Ribeiro', matricula: '20231102901', nota: 8.5, acertos: 17, total: 20 },
      { id: 'aluno_bruno', nome: 'Bruno Santos Alcântara', matricula: '20231102914', nota: 5.5, acertos: 11, total: 20 },
      { id: 'aluno_clara', nome: 'Clara Beatriz Mendonça', matricula: '20231102928', nota: 9.0, acertos: 18, total: 20 },
      { id: 'aluno_diego', nome: 'Diego Carvalho Pires', matricula: '20231102933', nota: 4.0, acertos: 8, total: 20 },
      { id: 'aluno_eduardo', nome: 'Eduardo Maranhão Costa', matricula: '20231102947', nota: 7.0, acertos: 14, total: 20 }
    ];

    const dataHoje = new Date().toLocaleDateString('pt-BR');

    for (const a of amostraAlunos) {
      await addDoc(collection(db, 'simulados_realizados'), {
        alunoId: a.id,
        alunoNome: a.nome,
        alunoMatricula: a.matricula,
        data: dataHoje,
        timestamp: Date.now() - Math.floor(Math.random() * 3600000),
        nota: a.nota,
        acertos: a.acertos,
        total: a.total,
        dificuldade: 'Média',
        unidadeFiltro: 'Todas',
        tempoGastoSegundos: 1200 + Math.floor(Math.random() * 600),
        detalhesPorUnidade: {
          1: { acertos: Math.min(4, Math.round(a.acertos * 0.25)), total: 4 },
          2: { acertos: Math.min(4, Math.round(a.acertos * 0.2)), total: 4 },
          3: { acertos: Math.min(4, Math.round(a.acertos * 0.15)), total: 4 },
          4: { acertos: Math.min(4, Math.round(a.acertos * 0.2)), total: 4 },
          5: { acertos: Math.min(4, Math.round(a.acertos * 0.2)), total: 4 }
        },
        errosQuestoesIds: ['Q-0005', 'Q-0008', 'Q-0010'].slice(0, a.total - a.acertos)
      });
    }
  },

  // Buscar simulados de um discente específico
  async obterSimuladosDoAluno(alunoId: string): Promise<RegistroSimuladoFirestore[]> {
    try {
      const q = query(collection(db, 'simulados_realizados'), where('alunoId', '==', alunoId));
      const snap = await getDocs(q);
      const lista: RegistroSimuladoFirestore[] = [];
      snap.forEach((doc) => {
        lista.push({ id: doc.id, ...(doc.data() as any) });
      });
      return lista.sort((a, b) => b.timestamp - a.timestamp);
    } catch (e) {
      console.error('Erro ao buscar simulados do aluno:', e);
      return [];
    }
  },

  // Salvar prova gerada pelo professor
  async salvarProvaGerada(prova: ProvaElaboradaDocente): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'provas_geradas'), {
        ...prova,
        timestamp: Date.now()
      });
      return docRef.id;
    } catch (e) {
      console.error('Erro ao salvar prova no Firestore:', e);
      throw e;
    }
  },

  // Buscar provas salvas
  async obterProvasGeradas(): Promise<ProvaElaboradaDocente[]> {
    try {
      const snap = await getDocs(collection(db, 'provas_geradas'));
      const lista: ProvaElaboradaDocente[] = [];
      snap.forEach((doc) => {
        lista.push({ id: doc.id, ...(doc.data() as any) });
      });
      return lista.sort((a, b) => b.timestamp - a.timestamp);
    } catch (e) {
      console.error('Erro ao carregar provas geradas:', e);
      return [];
    }
  },

  // Excluir um simulado individual
  async excluirSimulado(simuladoId: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, 'simulados_realizados', simuladoId));
      return true;
    } catch (e) {
      console.error('Erro ao excluir simulado:', e);
      throw e;
    }
  },

  // Excluir um aluno e todos os seus simulados realizados do banco
  async excluirAlunoCompletamente(alunoId: string): Promise<{ simuladosRemovidos: number; usuarioRemovido: boolean }> {
    try {
      let simuladosRemovidos = 0;
      let usuarioRemovido = false;

      // 1. Localizar e deletar todos os simulados do aluno
      const snapSimulados = await getDocs(collection(db, 'simulados_realizados'));
      const deletesPromises: Promise<void>[] = [];

      snapSimulados.forEach((d) => {
        const data = d.data() as RegistroSimuladoFirestore;
        if (data.alunoId === alunoId) {
          deletesPromises.push(deleteDoc(doc(db, 'simulados_realizados', d.id)));
          simuladosRemovidos++;
        }
      });

      await Promise.all(deletesPromises);

      // 2. Deletar o documento de perfil na coleção 'users', se existir
      try {
        await deleteDoc(doc(db, 'users', alunoId));
        usuarioRemovido = true;
      } catch (errUser) {
        // Usuário pode não existir na coleção users se foi criado apenas em simulados_realizados
      }

      return { simuladosRemovidos, usuarioRemovido };
    } catch (e) {
      console.error('Erro ao excluir aluno do banco de dados:', e);
      throw e;
    }
  },

  // Excluir todos os alunos e submissões que foram gerados para teste
  async excluirTodosAlunosTeste(): Promise<{ simuladosRemovidos: number; usuariosRemovidos: number; nomesRemovidos: string[] }> {
    try {
      let simuladosRemovidos = 0;
      let usuariosRemovidos = 0;
      const nomesRemovidosSet = new Set<string>();

      // 1. Varrer simulados_realizados
      const snapSim = await getDocs(collection(db, 'simulados_realizados'));
      const promessasSim: Promise<void>[] = [];

      snapSim.forEach((d) => {
        const item = d.data() as RegistroSimuladoFirestore;
        if (isAlunoTeste(item.alunoId, item.alunoNome, item.alunoMatricula)) {
          promessasSim.push(deleteDoc(doc(db, 'simulados_realizados', d.id)));
          simuladosRemovidos++;
          if (item.alunoNome) nomesRemovidosSet.add(item.alunoNome);
        }
      });

      await Promise.all(promessasSim);

      // 2. Varrer coleção 'users' para perfis de teste
      try {
        const snapUsers = await getDocs(collection(db, 'users'));
        const promessasUsers: Promise<void>[] = [];

        snapUsers.forEach((uDoc) => {
          const uData = uDoc.data() as UsuarioAutenticado;
          if (
            uData.papel !== 'professor' &&
            isAlunoTeste(uDoc.id, uData.nome, uData.matriculaOuSiape)
          ) {
            promessasUsers.push(deleteDoc(doc(db, 'users', uDoc.id)));
            usuariosRemovidos++;
            if (uData.nome) nomesRemovidosSet.add(uData.nome);
          }
        });

        await Promise.all(promessasUsers);
      } catch (errUsers) {
        console.warn('Aviso ao varrer coleção users para alunos teste:', errUsers);
      }

      return {
        simuladosRemovidos,
        usuariosRemovidos,
        nomesRemovidos: Array.from(nomesRemovidosSet)
      };
    } catch (e) {
      console.error('Erro ao remover alunos teste:', e);
      throw e;
    }
  },

  // Obter todos os usuários cadastrados na coleção users
  async obterTodosUsuarios(): Promise<UsuarioAutenticado[]> {
    try {
      const snap = await getDocs(collection(db, 'users'));
      const lista: UsuarioAutenticado[] = [];
      snap.forEach((d) => {
        lista.push({ uid: d.id, ...(d.data() as any) });
      });
      return lista;
    } catch (e) {
      console.error('Erro ao carregar usuários:', e);
      return [];
    }
  },

  // Excluir um usuário específico pelo UID
  async excluirUsuario(uid: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, 'users', uid));
      return true;
    } catch (e) {
      console.error('Erro ao excluir usuário:', e);
      throw e;
    }
  },

  // Excluir uma prova gerada pelo ID
  async excluirProvaGerada(provaId: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, 'provas_geradas', provaId));
      return true;
    } catch (e) {
      console.error('Erro ao excluir prova gerada:', e);
      throw e;
    }
  },

  // Limpar todo o histórico de simulados (Reset total de avaliações)
  async limparTodoBancoSimulados(): Promise<number> {
    try {
      const snap = await getDocs(collection(db, 'simulados_realizados'));
      let removidos = 0;
      const promessas: Promise<void>[] = [];
      snap.forEach((d) => {
        promessas.push(deleteDoc(doc(db, 'simulados_realizados', d.id)));
        removidos++;
      });
      await Promise.all(promessas);
      return removidos;
    } catch (e) {
      console.error('Erro ao limpar todo histórico:', e);
      throw e;
    }
  },

  // =========================================================================
  // MÓDULO DO FÓRUM DE DÚVIDAS (AULAS & ESTUDOS DE CASO)
  // =========================================================================

  // Obter dúvidas com filtros opcionais
  async obterDuvidasForum(filtros?: {
    aulaId?: string;
    unidadeNumero?: number;
    status?: string;
    busca?: string;
  }): Promise<DuvidaForum[]> {
    try {
      // 1. Tentar buscar do Firestore
      const snap = await getDocs(collection(db, 'forum_duvidas'));
      const lista: DuvidaForum[] = [];

      snap.forEach((d) => {
        const data = d.data() as any;
        lista.push({
          id: d.id,
          ...data,
          respostas: data.respostas || []
        });
      });

      // Se o Firestore não tiver registros ainda, use os registros iniciais padrão
      let resultado = lista.length > 0 ? lista : DUVIDAS_FORUM_PADRAO;

      // Aplicar filtros em memória
      if (filtros) {
        if (filtros.aulaId && filtros.aulaId !== 'todas') {
          resultado = resultado.filter((item) => item.aulaId === filtros.aulaId);
        }
        if (filtros.unidadeNumero && filtros.unidadeNumero > 0) {
          resultado = resultado.filter((item) => item.unidadeNumero === filtros.unidadeNumero);
        }
        if (filtros.status && filtros.status !== 'todos') {
          resultado = resultado.filter((item) => item.status === filtros.status);
        }
        if (filtros.busca && filtros.busca.trim().length > 0) {
          const termo = filtros.busca.toLowerCase();
          resultado = resultado.filter(
            (item) =>
              item.titulo.toLowerCase().includes(termo) ||
              item.descricao.toLowerCase().includes(termo) ||
              item.autorNome.toLowerCase().includes(termo) ||
              item.tags.some((t) => t.toLowerCase().includes(termo))
          );
        }
      }

      // Ordenar por data decrescente (mais recentes primeiro)
      return resultado.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    } catch (e) {
      console.warn('Usando armazenamento local do fórum devido a conexão:', e);
      let local = DUVIDAS_FORUM_PADRAO;
      if (filtros?.aulaId && filtros.aulaId !== 'todas') {
        local = local.filter((item) => item.aulaId === filtros.aulaId);
      }
      return local;
    }
  },

  // Criar nova dúvida
  async criarDuvidaForum(dados: {
    aulaId: string;
    aulaTitulo: string;
    unidadeNumero?: number;
    titulo: string;
    descricao: string;
    autorId: string;
    autorNome: string;
    autorPapel: 'professor' | 'aluno';
    autorMatricula?: string;
    tags: string[];
    simuladorSugeridoId?: string;
  }): Promise<DuvidaForum> {
    const novaDuvida: DuvidaForum = {
      id: 'duvida_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      aulaId: dados.aulaId,
      aulaTitulo: dados.aulaTitulo,
      unidadeNumero: dados.unidadeNumero,
      titulo: dados.titulo,
      descricao: dados.descricao,
      autorId: dados.autorId,
      autorNome: dados.autorNome,
      autorPapel: dados.autorPapel,
      autorMatricula: dados.autorMatricula || '',
      criadoEm: new Date().toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now(),
      votos: 0,
      tags: dados.tags,
      status: 'aberto',
      totalRespostas: 0,
      respostas: [],
      simuladorSugeridoId: dados.simuladorSugeridoId
    };

    try {
      await setDoc(doc(db, 'forum_duvidas', novaDuvida.id), novaDuvida);
    } catch (e) {
      console.warn('Salvo localmente (offline fallback):', e);
      DUVIDAS_FORUM_PADRAO.unshift(novaDuvida);
    }

    return novaDuvida;
  },

  // Adicionar resposta (de aluno ou professor)
  async adicionarRespostaForum(
    duvidaId: string,
    resposta: {
      autorId: string;
      autorNome: string;
      autorPapel: 'professor' | 'aluno';
      autorMatricula?: string;
      texto: string;
      isProfessor: boolean;
    }
  ): Promise<RespostaForum> {
    const novaResposta: RespostaForum = {
      id: 'resp_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      duvidaId,
      autorId: resposta.autorId,
      autorNome: resposta.autorNome,
      autorPapel: resposta.autorPapel,
      autorMatricula: resposta.autorMatricula,
      texto: resposta.texto,
      criadoEm: new Date().toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now(),
      isProfessor: resposta.isProfessor,
      votos: 0,
      marcadaComoSolucao: resposta.isProfessor
    };

    try {
      const duvidaRef = doc(db, 'forum_duvidas', duvidaId);
      // Buscar documento atual para atualizar array de respostas
      const snap = await getDocs(query(collection(db, 'forum_duvidas')));
      let duvidaEncontrada: any = null;
      snap.forEach((d) => {
        if (d.id === duvidaId) duvidaEncontrada = d.data();
      });

      if (duvidaEncontrada) {
        const respostasAtualizadas = [...(duvidaEncontrada.respostas || []), novaResposta];
        const novoStatus = resposta.isProfessor ? 'respondido_professor' : duvidaEncontrada.status;
        await updateDoc(duvidaRef, {
          respostas: respostasAtualizadas,
          totalRespostas: respostasAtualizadas.length,
          status: novoStatus
        });
      }
    } catch (e) {
      console.warn('Erro ao salvar resposta no Firestore, atualizando em memória:', e);
      const item = DUVIDAS_FORUM_PADRAO.find((d) => d.id === duvidaId);
      if (item) {
        if (!item.respostas) item.respostas = [];
        item.respostas.push(novaResposta);
        item.totalRespostas = item.respostas.length;
        if (resposta.isProfessor) item.status = 'respondido_professor';
      }
    }

    return novaResposta;
  },

  // Votar em uma dúvida (upvote)
  async votarDuvidaForum(duvidaId: string, delta: number = 1): Promise<void> {
    try {
      const duvidaRef = doc(db, 'forum_duvidas', duvidaId);
      const snap = await getDocs(query(collection(db, 'forum_duvidas')));
      snap.forEach(async (d) => {
        if (d.id === duvidaId) {
          const atual = d.data() as DuvidaForum;
          await updateDoc(duvidaRef, { votos: (atual.votos || 0) + delta });
        }
      });
    } catch (e) {
      const item = DUVIDAS_FORUM_PADRAO.find((d) => d.id === duvidaId);
      if (item) item.votos = (item.votos || 0) + delta;
    }
  },

  // Atualizar status da dúvida (ex: 'resolvido', 'respondido_professor')
  async atualizarStatusDuvida(
    duvidaId: string,
    novoStatus: 'aberto' | 'respondido_professor' | 'resolvido'
  ): Promise<void> {
    try {
      await updateDoc(doc(db, 'forum_duvidas', duvidaId), { status: novoStatus });
    } catch (e) {
      const item = DUVIDAS_FORUM_PADRAO.find((d) => d.id === duvidaId);
      if (item) item.status = novoStatus;
    }
  },

  // Excluir dúvida (docente ou autor)
  async excluirDuvidaForum(duvidaId: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, 'forum_duvidas', duvidaId));
      return true;
    } catch (e) {
      const idx = DUVIDAS_FORUM_PADRAO.findIndex((d) => d.id === duvidaId);
      if (idx !== -1) {
        DUVIDAS_FORUM_PADRAO.splice(idx, 1);
        return true;
      }
      return false;
    }
  }
};

// =========================================================================
// BANCO INICIAL DE DÚVIDAS E RESPOSTAS ACADÊMICAS (UEMA ECONOMIA)
// =========================================================================
export const DUVIDAS_FORUM_PADRAO: DuvidaForum[] = [
  {
    id: 'duvida_01',
    aulaId: 'aula-03',
    aulaTitulo: 'Aula 03: Falhas de Mercado I - Externalidades e Teorema de Coase',
    unidadeNumero: 2,
    titulo: 'Por que o Teorema de Coase falha quando temos centenas de pescadores na Baía de São Marcos?',
    descricao: 'Professor, lendo o Estudo de Caso 2.1 e mexendo no Simulador de Coase, vi que quando há apenas 1 fábrica e 1 pescador, o acordo privado é 100% eficiente (excedente positivo). Mas por que no caso de centenas de famílias de pescadores em São Luís o simulador aponta falha de mercado inevitável?',
    autorId: 'aluno_marcos',
    autorNome: 'Marcos Vinícius Silva',
    autorPapel: 'aluno',
    autorMatricula: '20231102910',
    criadoEm: '18/09/2026 14:30',
    timestamp: 1726673400000,
    votos: 12,
    tags: ['Coase', 'CustosDeTransação', 'Carona', 'BaíaDeSãoMarcos', 'Externalidades'],
    status: 'respondido_professor',
    totalRespostas: 2,
    simuladorSugeridoId: 'coase',
    respostas: [
      {
        id: 'resp_01_prof',
        duvidaId: 'duvida_01',
        autorId: 'prof_uema_walter',
        autorNome: 'Prof. Me. Walter (Docente UEMA)',
        autorPapel: 'professor',
        autorMatricula: 'SIAPE-1892014',
        texto: 'Excelente colocação, Marcos! Esse é exatamente o ponto central de Ronald Coase (1960) e da crítica de Arvate & Biderman (2004). O Teorema de Coase assume custos de transação NULOS. Quando temos centenas de agentes dispersos (pescadores artesanais), surgem dois entraves monumentais:\n1. Custos de Organização e Negociação: reunir centenas de famílias para cotizar uma indenização tem custo altíssimo.\n2. O Problema do Carona (Free-Rider): cada pescador prefere não pagar, esperando que os outros banquem o filtro para desfrutar da água limpa.\nNessas circunstâncias de custos de transação positivos e elevados, o mercado livre falha, justificando a intervenção estatal via Imposto Pigouviano ou regulação ambiental de comando e controle!',
        criadoEm: '18/09/2026 15:15',
        timestamp: 1726676100000,
        isProfessor: true,
        votos: 9,
        marcadaComoSolucao: true
      },
      {
        id: 'resp_01_aluno',
        duvidaId: 'duvida_01',
        autorId: 'aluno_beatriz',
        autorNome: 'Beatriz Almeida Costa',
        autorPapel: 'aluno',
        autorMatricula: '20231102922',
        texto: 'Isso fica muito claro quando a gente mexe no slider "Custos de Transação" no simulador de Coase. Quando passa de R$ 350, o aviso fica vermelho: "Falha de Coase"! Muito bom!',
        criadoEm: '18/09/2026 16:40',
        timestamp: 1726681200000,
        isProfessor: false,
        votos: 4
      }
    ]
  },
  {
    id: 'duvida_02',
    aulaId: 'aula-08',
    aulaTitulo: 'Aula 08: Teoria da Tributação Ótima e Regra de Ramsey',
    unidadeNumero: 4,
    titulo: 'Conflito ético na Regra de Ramsey: devemos realmente tributar mais os alimentos básicos?',
    descricao: 'Na fórmula de Ramsey (ti / tj = ej / ei), itens com demanda muito inelástica recebem a maior alíquota para minimizar a perda de peso morto de Harberger. Mas isso não seria extremamente regressivo para a população de baixa renda do Maranhão?',
    autorId: 'aluno_lucas',
    autorNome: 'Lucas Gabriel Pereira',
    autorPapel: 'aluno',
    autorMatricula: '20231102941',
    criadoEm: '19/09/2026 10:20',
    timestamp: 1726744800000,
    votos: 15,
    tags: ['RegraDeRamsey', 'Equidade', 'Eficiência', 'CestaBásica', 'EC132'],
    status: 'respondido_professor',
    totalRespostas: 1,
    simuladorSugeridoId: 'ramsey',
    respostas: [
      {
        id: 'resp_02_prof',
        duvidaId: 'duvida_02',
        autorId: 'prof_uema_walter',
        autorNome: 'Prof. Me. Walter (Docente UEMA)',
        autorPapel: 'professor',
        autorMatricula: 'SIAPE-1892014',
        texto: 'Você tocou no âmago do clássico dilema entre Eficiência Alocativa e Equidade Social (Okun, 1975)! Sob a ótica estrita da microeconomia de Ramsey (1927), a alíquota deveria ser máxima em arroz, feijão e insulina, porque as pessoas não deixam de comprar (peso morto quase zero). Porém, sob a ótica da Função de Bem-Estar Social de Rawls (Maximin) ou de Bentham com utilidade marginal decrescente da renda, o sacrifício imposto às famílias pobres seria inaceitável. É por isso que todos os parlamentos civilizados e a Reforma Tributária Brasileira (EC 132/2023) desoneram a Cesta Básica Nacional e instituem o Cashback do Povo, sacrificando intencionalmente um pouco de eficiência alocativa pura para garantir a sobrevivência e a justiça distributiva.',
        criadoEm: '19/09/2026 11:10',
        timestamp: 1726747800000,
        isProfessor: true,
        votos: 11,
        marcadaComoSolucao: true
      }
    ]
  },
  {
    id: 'duvida_03',
    aulaId: 'aula-04',
    aulaTitulo: 'Aula 04: Falhas de Mercado II - Monopólio Natural e Teoria da Regulação',
    unidadeNumero: 2,
    titulo: 'Por que fixar P = CMg na distribuição de água e saneamento gera prejuízo para a concessionária?',
    descricao: 'No Primeiro Teorema do Bem-Estar a regra de eficiência paretiana é P = CMg. Por que quando aplicamos isso a um monopólio natural de rede (como água ou ferrovia), a empresa entra em déficit financeiro e quebra?',
    autorId: 'aluno_carolina',
    autorNome: 'Carolina Mendes Furtado',
    autorPapel: 'aluno',
    autorMatricula: '20231102930',
    criadoEm: '20/09/2026 09:15',
    timestamp: 1726827300000,
    votos: 8,
    tags: ['MonopólioNatural', 'FirstBest', 'SecondBest', 'CustoMarginal', 'TarifaEmDuasPartes'],
    status: 'respondido_professor',
    totalRespostas: 1,
    simuladorSugeridoId: 'monopoly',
    respostas: [
      {
        id: 'resp_03_prof',
        duvidaId: 'duvida_03',
        autorId: 'prof_uema_walter',
        autorNome: 'Prof. Me. Walter (Docente UEMA)',
        autorPapel: 'professor',
        autorMatricula: 'SIAPE-1892014',
        texto: 'Por causa da subaditividade de custos e dos colossais custos fixos iniciais (F), Carolina! No monopólio natural de rede, o Custo Médio CMe(Q) = F/Q + c é estritamente decrescente para toda a demanda relevante. Como o Custo Marginal CMg = c é inferior ao Custo Médio (CMg < CMe), se o regulador obrigar o preço P = CMg = c, a receita total P×Q cobrirá apenas os custos variáveis operacionais, deixando o custo fixo de infraestrutura F totalmente descoberto (Prejuízo = -F). Por isso a regulação recorre ao Segundo Melhor (P = CMe, lucro zero) ou à Tarifa em Duas Partes (uma taxa de disponibilidade fixa cobrindo F + consumo medido ao CMg).',
        criadoEm: '20/09/2026 10:05',
        timestamp: 1726830300000,
        isProfessor: true,
        votos: 7,
        marcadaComoSolucao: true
      }
    ]
  },
  {
    id: 'duvida_04',
    aulaId: 'aula-11',
    aulaTitulo: 'Aula 11: Federalismo Fiscal e Transferências Intergovernamentais',
    unidadeNumero: 5,
    titulo: 'O que explica o Efeito Flypaper nos municípios do Maranhão recebedores do FPM?',
    descricao: 'Por que quando uma prefeitura maranhense recebe R$ 1 milhão a mais de FPM, ela gasta cerca de R$ 720 mil em novos cargos e despesas públicas, enquanto um aumento de R$ 1 milhão na renda dos cidadãos só gera R$ 120 mil em demanda de serviços?',
    autorId: 'aluno_rodrigo',
    autorNome: 'Rodrigo Santana Gomes',
    autorPapel: 'aluno',
    autorMatricula: '20231102905',
    criadoEm: '21/09/2026 08:30',
    timestamp: 1726911000000,
    votos: 6,
    tags: ['EfeitoFlypaper', 'FPM', 'FederalismoFiscal', 'IlusãoFiscal', 'Niskanen'],
    status: 'aberto',
    totalRespostas: 0,
    simuladorSugeridoId: 'federalism'
  }
];

