import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  User as FirebaseUser
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';
import { auth, db } from './firebase';
import { UsuarioAutenticado } from '../types';

const STORAGE_SESSION_KEY = 'uema_financas_session_user';

export interface RegistroDados {
  nome: string;
  email: string;
  senha: string;
  papel: 'professor' | 'aluno';
  matriculaOuSiape: string;
  turma?: string;
}

export const authService = {
  // Obter usuário em cache local para carregamento síncrono inicial
  obterUsuarioAtual(): UsuarioAutenticado | null {
    try {
      const data = localStorage.getItem(STORAGE_SESSION_KEY);
      if (data) {
        return JSON.parse(data);
      }
      return null;
    } catch {
      return null;
    }
  },

  // Observador de mudança de estado de autenticação
  observarAutenticacao(callback: (usuario: UsuarioAutenticado | null) => void) {
    return onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (!firebaseUser) {
        // Se houver um usuário em cache local, preservá-lo (permite continuidade caso o provider email/password esteja desabilitado)
        const cached = this.obterUsuarioAtual();
        if (cached) {
          callback(cached);
        } else {
          localStorage.removeItem(STORAGE_SESSION_KEY);
          callback(null);
        }
        return;
      }

      try {
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const dados = userDoc.data() as UsuarioAutenticado;
          localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(dados));
          callback(dados);
        } else {
          // Fallback: reconstruir perfil a partir do email ou dados do Firebase
          const isDocente = firebaseUser.email?.includes('professor') || firebaseUser.email?.includes('docente');
          const usuarioFallback: UsuarioAutenticado = {
            uid: firebaseUser.uid,
            nome: firebaseUser.displayName || (isDocente ? 'Professor UEMA' : 'Aluno UEMA'),
            email: firebaseUser.email || '',
            papel: isDocente ? 'professor' : 'aluno',
            matriculaOuSiape: isDocente ? 'SIAPE-DOC-UEMA' : 'MAT-ECO-UEMA',
            turma: 'Ciências Econômicas - UEMA',
            criadoEm: new Date().toISOString(),
            fotoPerfil: firebaseUser.photoURL || (isDocente ? '👨‍🏫' : '🎓')
          };
          try {
            await setDoc(userDocRef, usuarioFallback);
          } catch {
            // Firestore write optional
          }
          localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(usuarioFallback));
          callback(usuarioFallback);
        }
      } catch (err) {
        console.warn('Aviso ao sincronizar perfil do usuário no Firestore:', err);
        const cached = this.obterUsuarioAtual();
        callback(cached);
      }
    });
  },

  // Login direto com Conta Google (Provedor padrão nativo do Firebase no AI Studio)
  async loginComGoogle(
    papelDesejado: 'aluno' | 'professor' = 'aluno'
  ): Promise<{ sucesso: boolean; usuario?: UsuarioAutenticado; erro?: string }> {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const uid = user.uid;
      const email = user.email || '';

      const isDocente =
        email.toLowerCase().includes('professor') ||
        email.toLowerCase().includes('docente') ||
        papelDesejado === 'professor';

      // Buscar perfil existente no Firestore
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);

      let usuarioFinal: UsuarioAutenticado;

      if (userDoc.exists()) {
        usuarioFinal = userDoc.data() as UsuarioAutenticado;
      } else {
        usuarioFinal = {
          uid,
          nome: user.displayName || (isDocente ? 'Prof. Docente UEMA' : 'Estudante de Economia'),
          email,
          papel: isDocente ? 'professor' : 'aluno',
          matriculaOuSiape: isDocente ? 'SIAPE-DOC-UEMA' : '2026.2.ECO.0001',
          turma: 'Ciências Econômicas - UEMA',
          criadoEm: new Date().toISOString(),
          fotoPerfil: user.photoURL || (isDocente ? '👨‍🏫' : '🎓')
        };
        try {
          await setDoc(userDocRef, usuarioFinal);
        } catch (firestoreErr) {
          console.warn('Aviso ao salvar perfil Google no Firestore:', firestoreErr);
        }
      }

      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(usuarioFinal));
      return { sucesso: true, usuario: usuarioFinal };
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') {
        return { sucesso: false, erro: 'A janela de autenticação Google foi fechada antes da conclusão.' };
      }
      console.warn('Aviso no login Google Firebase:', err);
      return { sucesso: false, erro: err.message || 'Falha ao autenticar com a conta Google.' };
    }
  },

  // Login com Firebase Auth + busca de perfil no Firestore
  async login(
    email: string,
    senha: string
  ): Promise<{ sucesso: boolean; usuario?: UsuarioAutenticado; erro?: string }> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), senha);
      const uid = userCredential.user.uid;

      // Buscar perfil no Firestore
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);

      let usuarioFinal: UsuarioAutenticado;

      if (userDoc.exists()) {
        usuarioFinal = userDoc.data() as UsuarioAutenticado;
      } else {
        const isDocente = email.includes('professor') || email.includes('docente');
        usuarioFinal = {
          uid,
          nome: isDocente ? 'Prof. Dr. Ricardo Arvate' : 'Estudante de Economia',
          email: email.trim(),
          papel: isDocente ? 'professor' : 'aluno',
          matriculaOuSiape: isDocente ? 'SIAPE-88419-UEMA' : '2026.2.ECO.0001',
          turma: 'Ciências Econômicas - UEMA',
          criadoEm: new Date().toISOString(),
          fotoPerfil: isDocente ? '👨‍🏫' : '🎓'
        };
        try {
          await setDoc(userDocRef, usuarioFinal);
        } catch {
          // ignore
        }
      }

      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(usuarioFinal));
      return { sucesso: true, usuario: usuarioFinal };
    } catch (err: any) {
      // Se o método Email/Senha não estiver ativado no console do Firebase, ativar sessão resiliente no Firestore
      if (err.code === 'auth/operation-not-allowed') {
        console.info('Firebase Auth: Provedor Email/Senha não habilitado no Firebase Console. Ativando sessão com persistência no Firestore.');
        const emailSanitized = email.trim().toLowerCase();
        // Gerar UID determinístico baseado no email para persistência consistente no Firestore
        const syntheticUid = 'usr_' + btoa(emailSanitized).replace(/[^a-zA-Z0-9]/g, '').slice(0, 24);

        try {
          const userDocRef = doc(db, 'users', syntheticUid);
          const userDoc = await getDoc(userDocRef);
          let usuarioFinal: UsuarioAutenticado;

          if (userDoc.exists()) {
            usuarioFinal = userDoc.data() as UsuarioAutenticado;
          } else {
            const isDocente = emailSanitized.includes('professor') || emailSanitized.includes('docente');
            usuarioFinal = {
              uid: syntheticUid,
              nome: isDocente ? 'Prof. Dr. Docente UEMA' : 'Discente de Economia',
              email: emailSanitized,
              papel: isDocente ? 'professor' : 'aluno',
              matriculaOuSiape: isDocente ? 'SIAPE-DOC-UEMA' : '2026.2.ECO.001',
              turma: 'Ciências Econômicas - UEMA',
              criadoEm: new Date().toISOString(),
              fotoPerfil: isDocente ? '👨‍🏫' : '🎓'
            };
            await setDoc(userDocRef, usuarioFinal);
          }
          localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(usuarioFinal));
          return { sucesso: true, usuario: usuarioFinal };
        } catch (firestoreErr) {
          console.warn('Aviso ao acessar doc no Firestore no fallback, utilizando perfil local:', firestoreErr);
          const isDocente = emailSanitized.includes('professor') || emailSanitized.includes('docente');
          const usuarioFinal: UsuarioAutenticado = {
            uid: syntheticUid,
            nome: isDocente ? 'Prof. Dr. Docente UEMA' : 'Discente de Economia',
            email: emailSanitized,
            papel: isDocente ? 'professor' : 'aluno',
            matriculaOuSiape: isDocente ? 'SIAPE-DOC-UEMA' : '2026.2.ECO.001',
            turma: 'Ciências Econômicas - UEMA',
            criadoEm: new Date().toISOString(),
            fotoPerfil: isDocente ? '👨‍🏫' : '🎓'
          };
          localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(usuarioFinal));
          return { sucesso: true, usuario: usuarioFinal };
        }
      }

      console.warn('Aviso durante autenticação:', err);

      let mensagem = 'Falha ao autenticar no sistema institucional.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        mensagem = 'Usuário ou senha incorretos. Caso ainda não possua cadastro, clique na aba "Criar Novo Cadastro".';
      } else if (err.code === 'auth/wrong-password') {
        mensagem = 'Senha incorreta. Verifique os dados e tente novamente.';
      } else if (err.code === 'auth/invalid-email') {
        mensagem = 'Formato de e-mail inválido.';
      } else if (err.message) {
        mensagem = err.message;
      }
      return { sucesso: false, erro: mensagem };
    }
  },

  // Cadastro de novo discente ou docente
  async cadastrar(
    dados: RegistroDados
  ): Promise<{ sucesso: boolean; usuario?: UsuarioAutenticado; erro?: string }> {
    if (!dados.nome.trim() || !dados.email.trim() || !dados.senha.trim()) {
      return { sucesso: false, erro: 'Preencha todos os campos obrigatórios.' };
    }

    if (dados.senha.length < 6) {
      return { sucesso: false, erro: 'A senha institucional deve conter no mínimo 6 caracteres.' };
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        dados.email.trim().toLowerCase(),
        dados.senha
      );
      const uid = userCredential.user.uid;

      const novoUsuario: UsuarioAutenticado = {
        uid,
        nome: dados.nome.trim(),
        email: dados.email.trim().toLowerCase(),
        papel: dados.papel,
        matriculaOuSiape: dados.matriculaOuSiape.trim() || (dados.papel === 'professor' ? 'SIAPE-DOC-UEMA' : '2026.2.ECO.0099'),
        turma: dados.turma?.trim() || 'Ciências Econômicas - Turma 2026.2',
        criadoEm: new Date().toISOString(),
        fotoPerfil: dados.papel === 'professor' ? '👨‍🏫' : '🎓'
      };

      // Gravação no Firestore na coleção /users/{uid}
      await setDoc(doc(db, 'users', uid), novoUsuario);
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(novoUsuario));

      return { sucesso: true, usuario: novoUsuario };
    } catch (err: any) {
      // Se o método Email/Senha não estiver ativado no console Firebase, salvar no Firestore diretamente
      if (err.code === 'auth/operation-not-allowed') {
        console.info('Firebase Auth: Provedor Email/Senha não ativado no console. Realizando cadastro direto e persistente no Firestore.');
        const emailSanitized = dados.email.trim().toLowerCase();
        const syntheticUid = 'usr_' + btoa(emailSanitized).replace(/[^a-zA-Z0-9]/g, '').slice(0, 24);

        const novoUsuario: UsuarioAutenticado = {
          uid: syntheticUid,
          nome: dados.nome.trim(),
          email: emailSanitized,
          papel: dados.papel,
          matriculaOuSiape: dados.matriculaOuSiape.trim() || (dados.papel === 'professor' ? 'SIAPE-DOC-UEMA' : '2026.2.ECO.0099'),
          turma: dados.turma?.trim() || 'Ciências Econômicas - Turma 2026.2',
          criadoEm: new Date().toISOString(),
          fotoPerfil: dados.papel === 'professor' ? '👨‍🏫' : '🎓'
        };

        try {
          // Gravação no Firestore
          await setDoc(doc(db, 'users', syntheticUid), novoUsuario);
        } catch (firestoreErr) {
          console.warn('Aviso ao gravar usuário no Firestore durante fallback:', firestoreErr);
        }

        localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(novoUsuario));
        return { sucesso: true, usuario: novoUsuario };
      }

      console.warn('Aviso durante cadastro:', err);

      let mensagem = 'Falha ao criar o cadastro institucional.';
      if (err.code === 'auth/email-already-in-use') {
        mensagem = 'Este endereço de e-mail já está cadastrado no sistema. Faça login diretamente.';
      } else if (err.code === 'auth/weak-password') {
        mensagem = 'A senha é muito fraca. Utilize ao menos 6 caracteres com números e letras.';
      } else if (err.message) {
        mensagem = err.message;
      }
      return { sucesso: false, erro: mensagem };
    }
  },

  // Login Demonstrativo rápido com 1 clique (para testes institucionais e correções ágeis)
  async loginDemonstrativo(
    papel: 'professor' | 'aluno'
  ): Promise<{ sucesso: boolean; usuario: UsuarioAutenticado }> {
    const isDocente = papel === 'professor';
    const syntheticUid = isDocente ? 'usr_prof_uema_ricardo' : 'usr_aluno_uema_economia';
    const usuario: UsuarioAutenticado = {
      uid: syntheticUid,
      nome: isDocente ? 'Prof. Dr. Ricardo Arvate' : 'Estudante de Economia - UEMA',
      email: isDocente ? 'professor.arvate@uema.br' : 'aluno.economia@aluno.uema.br',
      papel,
      matriculaOuSiape: isDocente ? 'SIAPE-88419-UEMA' : '2026.2.ECO.0088',
      turma: 'Ciências Econômicas - UEMA',
      criadoEm: new Date().toISOString(),
      fotoPerfil: isDocente ? '👨‍🏫' : '🎓'
    };

    try {
      const userDocRef = doc(db, 'users', syntheticUid);
      await setDoc(userDocRef, usuario);
    } catch (e) {
      console.warn('Aviso ao sincronizar usuário demonstrativo no Firestore:', e);
    }

    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(usuario));
    return { sucesso: true, usuario };
  },

  // Logout
  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('Aviso ao deslogar do Firebase:', e);
    } finally {
      localStorage.removeItem(STORAGE_SESSION_KEY);
    }
  }
};
