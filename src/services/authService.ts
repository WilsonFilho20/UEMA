import { UsuarioAutenticado } from '../types';

const STORAGE_USERS_KEY = 'uema_financas_users_v1';
const STORAGE_CURRENT_USER_KEY = 'uema_financas_current_user_v1';

export interface RegistroDados {
  nome: string;
  email: string;
  senha: string;
  papel: 'professor' | 'aluno';
  matriculaOuSiape: string;
  turma?: string;
}

// Contas padrão pré-cadastradas para conveniência
export const USUARIOS_INICIAIS: (UsuarioAutenticado & { senhaHash: string })[] = [
  {
    uid: 'prof_uema_01',
    nome: 'Prof. Dr. Ricardo Arvate',
    email: 'professor@uema.br',
    senhaHash: 'uema123',
    papel: 'professor',
    matriculaOuSiape: 'SIAPE-88419-UEMA',
    turma: 'Ciências Econômicas - Turma 2026.2',
    criadoEm: '2026-08-01T08:00:00Z',
    fotoPerfil: '👨‍🏫'
  },
  {
    uid: 'aluno_uema_01',
    nome: 'Ana Beatriz Silveira',
    email: 'aluno@aluno.uema.br',
    senhaHash: 'uema123',
    papel: 'aluno',
    matriculaOuSiape: '2026.2.ECO.0014',
    turma: 'Ciências Econômicas - 5º Período',
    criadoEm: '2026-08-10T10:00:00Z',
    fotoPerfil: '👩‍🎓'
  }
];

// Inicializa usuários no localStorage se vazio
function carregarUsuarios(): (UsuarioAutenticado & { senhaHash: string })[] {
  try {
    const data = localStorage.getItem(STORAGE_USERS_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(USUARIOS_INICIAIS));
      return USUARIOS_INICIAIS;
    }
    return JSON.parse(data);
  } catch (e) {
    return USUARIOS_INICIAIS;
  }
}

function salvarUsuarios(usuarios: (UsuarioAutenticado & { senhaHash: string })[]) {
  try {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(usuarios));
  } catch (e) {
    console.error('Erro ao persistir usuários', e);
  }
}

export const authService = {
  // Retorna usuário logado
  obterUsuarioAtual(): UsuarioAutenticado | null {
    try {
      const data = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
      if (data) {
        return JSON.parse(data);
      }
      return null;
    } catch (e) {
      return null;
    }
  },

  // Efetua login com email e senha
  login(email: string, senha: string): { sucesso: boolean; usuario?: UsuarioAutenticado; erro?: string } {
    const usuarios = carregarUsuarios();
    const usuarioEncontrado = usuarios.find(
      (u) => u.email.toLowerCase().trim() === email.toLowerCase().trim()
    );

    if (!usuarioEncontrado) {
      return {
        sucesso: false,
        erro: 'Email não encontrado no sistema institucional. Verifique os dados ou crie seu cadastro.'
      };
    }

    if (usuarioEncontrado.senhaHash !== senha) {
      return {
        sucesso: false,
        erro: 'Senha incorreta. Tente novamente ou use os botões de login rápido.'
      };
    }

    // Sucesso
    const { senhaHash, ...usuarioLimpo } = usuarioEncontrado;
    localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(usuarioLimpo));
    return {
      sucesso: true,
      usuario: usuarioLimpo
    };
  },

  // Cadastro de novo professor ou aluno
  cadastrar(dados: RegistroDados): { sucesso: boolean; usuario?: UsuarioAutenticado; erro?: string } {
    if (!dados.nome.trim() || !dados.email.trim() || !dados.senha.trim()) {
      return { sucesso: false, erro: 'Preencha todos os campos obrigatórios.' };
    }

    if (dados.senha.length < 4) {
      return { sucesso: false, erro: 'A senha deve conter no mínimo 4 caracteres.' };
    }

    const usuarios = carregarUsuarios();
    const jaExiste = usuarios.some(
      (u) => u.email.toLowerCase().trim() === dados.email.toLowerCase().trim()
    );

    if (jaExiste) {
      return { sucesso: false, erro: 'Este email já está cadastrado. Faça login na sua conta.' };
    }

    const novoUsuario: UsuarioAutenticado & { senhaHash: string } = {
      uid: `${dados.papel}_${Date.now()}`,
      nome: dados.nome.trim(),
      email: dados.email.toLowerCase().trim(),
      senhaHash: dados.senha,
      papel: dados.papel,
      matriculaOuSiape: dados.matriculaOuSiape.trim() || (dados.papel === 'professor' ? 'SIAPE-DOC-UEMA' : '2026.2.ECO.0099'),
      turma: dados.turma?.trim() || 'Ciências Econômicas - UEMA',
      criadoEm: new Date().toISOString(),
      fotoPerfil: dados.papel === 'professor' ? '👨‍🏫' : '🎓'
    };

    usuarios.push(novoUsuario);
    salvarUsuarios(usuarios);

    const { senhaHash, ...usuarioLimpo } = novoUsuario;
    localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(usuarioLimpo));

    return {
      sucesso: true,
      usuario: usuarioLimpo
    };
  },

  // Desconecta a sessão
  logout(): void {
    localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
  },

  // Atalho para demonstração rápida sem precisar digitar
  loginDemo(tipo: 'professor' | 'aluno'): UsuarioAutenticado {
    const usuarios = carregarUsuarios();
    const usuarioEncontrado = usuarios.find((u) => u.papel === tipo) || USUARIOS_INICIAIS.find((u) => u.papel === tipo)!;
    const { senhaHash, ...usuarioLimpo } = usuarioEncontrado;
    localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(usuarioLimpo));
    return usuarioLimpo;
  }
};
