import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { ResultadoSimulado, Questao, Dificuldade } from '../types';

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
  }
};
