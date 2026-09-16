import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
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
