import React, { useState, useEffect, useMemo } from 'react';
import {
  MessageSquare,
  HelpCircle,
  CheckCircle2,
  Sparkles,
  Send,
  ThumbsUp,
  Filter,
  Search,
  PlusCircle,
  Tag,
  GraduationCap,
  User,
  ShieldCheck,
  Calendar,
  Layers,
  ArrowRight,
  Trash2,
  X,
  ExternalLink,
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import { UsuarioAutenticado, DuvidaForum, RespostaForum } from '../types';
import { firestoreDataService } from '../services/firestoreDataService';
import { AULAS_PROGRAMADAS } from '../data/lessonsData';
import { LISTA_25_SIMULADORES } from './SimulatorsHub';

interface ForumModuleProps {
  usuarioAtual: UsuarioAutenticado;
  filtroAulaInicial?: string | null;
  onNavigateToSimulator?: (simulatorId: string) => void;
  onNavigateToLesson?: (aulaNumero: number) => void;
}

export const ForumModule: React.FC<ForumModuleProps> = ({
  usuarioAtual,
  filtroAulaInicial,
  onNavigateToSimulator,
  onNavigateToLesson
}) => {
  const [duvidas, setDuvidas] = useState<DuvidaForum[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [termoBusca, setTermoBusca] = useState<string>('');
  const [filtroAula, setFiltroAula] = useState<string>(filtroAulaInicial || 'todas');
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  const [duvidaAbertaId, setDuvidaAbertaId] = useState<string | null>(null);

  // Estado para nova dúvida
  const [modalNovaDuvida, setModalNovaDuvida] = useState<boolean>(false);
  const [novaAulaId, setNovaAulaId] = useState<string>('aula-01');
  const [novoTitulo, setNovoTitulo] = useState<string>('');
  const [novaDescricao, setNovaDescricao] = useState<string>('');
  const [novasTagsTexto, setNovasTagsTexto] = useState<string>('');
  const [novoSimuladorSugerido, setNovoSimuladorSugerido] = useState<string>('');
  const [salvandoDuvida, setSalvandoDuvida] = useState<boolean>(false);

  // Estado para nova resposta no tópico aberto
  const [textoResposta, setTextoResposta] = useState<{ [duvidaId: string]: string }>({});
  const [enviandoResposta, setEnviandoResposta] = useState<boolean>(false);
  const [mensagemSucesso, setMensagemSucesso] = useState<string | null>(null);

  // Carregar dúvidas ao iniciar ou trocar filtros
  const carregarDuvidas = async () => {
    setCarregando(true);
    try {
      const dados = await firestoreDataService.obterDuvidasForum({
        aulaId: filtroAula,
        status: filtroStatus,
        busca: termoBusca
      });
      setDuvidas(dados);
    } catch (e) {
      console.error('Erro ao buscar dúvidas do fórum:', e);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarDuvidas();
  }, [filtroAula, filtroStatus]);

  // Se o filtro inicial mudou via prop
  useEffect(() => {
    if (filtroAulaInicial) {
      setFiltroAula(filtroAulaInicial);
    }
  }, [filtroAulaInicial]);

  // Executar busca local instantânea para agilidade
  const duvidasFiltradas = useMemo(() => {
    return duvidas.filter((d) => {
      const bateFiltroAula = filtroAula === 'todas' || d.aulaId === filtroAula;
      const bateFiltroStatus =
        filtroStatus === 'todos' ||
        (filtroStatus === 'respondido_professor' && (d.status === 'respondido_professor' || d.respostas?.some(r => r.isProfessor))) ||
        (filtroStatus === 'aberto' && d.status === 'aberto' && (!d.respostas || d.respostas.length === 0)) ||
        (filtroStatus === 'minhas' && d.autorId === usuarioAtual.uid);

      if (!bateFiltroAula || !bateFiltroStatus) return false;

      if (!termoBusca.trim()) return true;

      const t = termoBusca.toLowerCase();
      return (
        d.titulo.toLowerCase().includes(t) ||
        d.descricao.toLowerCase().includes(t) ||
        d.autorNome.toLowerCase().includes(t) ||
        d.tags.some((tag) => tag.toLowerCase().includes(t)) ||
        d.respostas?.some((r) => r.texto.toLowerCase().includes(t) || r.autorNome.toLowerCase().includes(t))
      );
    });
  }, [duvidas, filtroAula, filtroStatus, termoBusca, usuarioAtual.uid]);

  // Ações de Votação
  const handleVotar = async (duvidaId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await firestoreDataService.votarDuvidaForum(duvidaId, 1);
      setDuvidas((prev) =>
        prev.map((d) => (d.id === duvidaId ? { ...d, votos: (d.votos || 0) + 1 } : d))
      );
    } catch (err) {
      console.error('Erro ao votar:', err);
    }
  };

  // Submeter Nova Dúvida
  const handleCriarDuvida = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoTitulo.trim() || !novaDescricao.trim()) return;

    setSalvandoDuvida(true);
    try {
      // Descobrir título da aula
      let aulaTitulo = 'Dúvida Geral / Estudos de Caso';
      const aulaObj = AULAS_PROGRAMADAS.find((a) => `aula-${String(a.numero).padStart(2, '0')}` === novaAulaId);
      if (aulaObj) {
        aulaTitulo = `Aula ${String(aulaObj.numero).padStart(2, '0')}: ${aulaObj.titulo}`;
      } else if (novaAulaId.startsWith('caso-u')) {
        const uNum = novaAulaId.replace('caso-u', '');
        aulaTitulo = `Estudos de Caso • Unidade ${uNum}`;
      }

      // Separar tags por vírgula ou espaço
      const tagsArray = novasTagsTexto
        .split(/[,#\s]+/)
        .map((t) => t.trim())
        .filter((t) => t.length > 1);

      const nova = await firestoreDataService.criarDuvidaForum({
        aulaId: novaAulaId,
        aulaTitulo,
        unidadeNumero: aulaObj?.unidadeNumero || 1,
        titulo: novoTitulo.trim(),
        descricao: novaDescricao.trim(),
        autorId: usuarioAtual.uid,
        autorNome: usuarioAtual.nome,
        autorPapel: usuarioAtual.papel,
        autorMatricula: usuarioAtual.matriculaOuSiape,
        tags: tagsArray.length > 0 ? tagsArray : ['FinançasPúblicas', 'UEMA'],
        simuladorSugeridoId: novoSimuladorSugerido || undefined
      });

      setDuvidas((prev) => [nova, ...prev]);
      setModalNovaDuvida(false);
      setNovoTitulo('');
      setNovaDescricao('');
      setNovasTagsTexto('');
      setNovoSimuladorSugerido('');
      setDuvidaAbertaId(nova.id);
      setMensagemSucesso('Dúvida publicada com sucesso no fórum da turma!');
      setTimeout(() => setMensagemSucesso(null), 4000);
    } catch (err) {
      console.error('Erro ao criar dúvida:', err);
    } finally {
      setSalvandoDuvida(false);
    }
  };

  // Submeter Resposta
  const handleEnviarResposta = async (duvidaId: string) => {
    const texto = textoResposta[duvidaId]?.trim();
    if (!texto) return;

    setEnviandoResposta(true);
    try {
      const isProf = usuarioAtual.papel === 'professor';
      const novaResp = await firestoreDataService.adicionarRespostaForum(duvidaId, {
        autorId: usuarioAtual.uid,
        autorNome: isProf ? `${usuarioAtual.nome} (Docente UEMA)` : usuarioAtual.nome,
        autorPapel: usuarioAtual.papel,
        autorMatricula: usuarioAtual.matriculaOuSiape,
        texto,
        isProfessor: isProf
      });

      setDuvidas((prev) =>
        prev.map((d) => {
          if (d.id === duvidaId) {
            const respostas = [...(d.respostas || []), novaResp];
            return {
              ...d,
              respostas,
              totalRespostas: respostas.length,
              status: isProf ? 'respondido_professor' : d.status
            };
          }
          return d;
        })
      );

      setTextoResposta((prev) => ({ ...prev, [duvidaId]: '' }));
      setMensagemSucesso(isProf ? 'Resposta oficial docente registrada com sucesso!' : 'Sua resposta foi publicada na discussão!');
      setTimeout(() => setMensagemSucesso(null), 4000);
    } catch (err) {
      console.error('Erro ao enviar resposta:', err);
    } finally {
      setEnviandoResposta(false);
    }
  };

  // Excluir Dúvida (Docente ou Próprio Autor)
  const handleExcluirDuvida = async (duvidaId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Tem certeza de que deseja remover esta dúvida do fórum?')) return;

    try {
      await firestoreDataService.excluirDuvidaForum(duvidaId);
      setDuvidas((prev) => prev.filter((d) => d.id !== duvidaId));
      if (duvidaAbertaId === duvidaId) setDuvidaAbertaId(null);
      setMensagemSucesso('Tópico excluído com sucesso.');
      setTimeout(() => setMensagemSucesso(null), 3000);
    } catch (err) {
      console.error('Erro ao excluir:', err);
    }
  };

  // Estatísticas Rápidas
  const totalDuvidas = duvidas.length;
  const respondidasDocente = duvidas.filter((d) => d.status === 'respondido_professor' || d.respostas?.some(r => r.isProfessor)).length;
  const totalRespostasGeral = duvidas.reduce((acc, curr) => acc + (curr.totalRespostas || curr.respostas?.length || 0), 0);

  return (
    <div className="space-y-6" id="modulo-forum-duvidas">
      {/* Banner Principal com Identidade UEMA */}
      <div className="bg-gradient-to-r from-[#002752] via-[#003875] to-[#002752] text-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-700/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#ebc000] text-[#002752] flex items-center gap-1.5 shadow-xs">
                <MessageSquare className="w-3.5 h-3.5" />
                Fórum Acadêmico Oficial • UEMA
              </span>
              <span className="text-xs text-slate-300 font-mono">
                Ciências Econômicas • Finanças Públicas
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight text-white">
              Fórum de Dúvidas por Aula & Estudos de Caso
            </h2>
            <p className="text-sm text-slate-200 leading-relaxed">
              Tire dúvidas conceituais, discuta as simulações dos 25 estudos de caso práticos, compartilhe interpretações sobre as finanças do Maranhão e receba orientações validadas diretamente pelo corpo docente.
            </p>
          </div>

          <button
            id="btn-abrir-modal-nova-duvida"
            onClick={() => setModalNovaDuvida(true)}
            className="self-start md:self-center px-5 py-3 bg-[#ebc000] hover:bg-[#ffd51a] text-[#002752] rounded-xl font-bold text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0"
          >
            <PlusCircle className="w-5 h-5 text-[#002752]" />
            Postar Nova Dúvida
          </button>
        </div>

        {/* Métricas do Fórum */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-xs">
          <div className="bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
            <span className="text-slate-300 block text-[11px]">Tópicos Levantados</span>
            <span className="text-2xl font-black text-[#ebc000] font-mono mt-0.5 block">{totalDuvidas}</span>
          </div>
          <div className="bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
            <span className="text-slate-300 block text-[11px]">Respondidos pelo Professor</span>
            <span className="text-2xl font-black text-emerald-400 font-mono mt-0.5 block">{respondidasDocente}</span>
          </div>
          <div className="bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
            <span className="text-slate-300 block text-[11px]">Total de Interações & Respostas</span>
            <span className="text-2xl font-black text-white font-mono mt-0.5 block">{totalRespostasGeral}</span>
          </div>
          <div className="bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
            <span className="text-slate-300 block text-[11px]">Taxa de Resolução Docente</span>
            <span className="text-2xl font-black text-blue-300 font-mono mt-0.5 block">
              {totalDuvidas > 0 ? `${Math.round((respondidasDocente / totalDuvidas) * 100)}%` : '100%'}
            </span>
          </div>
        </div>
      </div>

      {/* Alerta de Feedback Temporário */}
      {mensagemSucesso && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl flex items-center justify-between text-sm animate-fade-in shadow-xs">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{mensagemSucesso}</span>
          </div>
          <button onClick={() => setMensagemSucesso(null)} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Barra de Filtros e Pesquisa */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Caixa de Busca */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Pesquisar por título, teoria (ex: Coase, Ramsey, ICMS), autor ou tag..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#002752] focus:bg-white"
            />
            {termoBusca && (
              <button
                onClick={() => setTermoBusca('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filtro por Aula / Caso */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500 shrink-0" />
            <select
              value={filtroAula}
              onChange={(e) => setFiltroAula(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-[#002752]"
            >
              <option value="todas">Todas as Aulas e Estudos de Caso</option>
              <optgroup label="Aulas Cronológicas">
                {AULAS_PROGRAMADAS.map((a) => (
                  <option key={a.numero} value={`aula-${String(a.numero).padStart(2, '0')}`}>
                    Aula {String(a.numero).padStart(2, '0')}: {a.titulo}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Estudos de Caso Aplicados">
                <option value="caso-u1">Estudos de Caso • Unidade 1 (Papel do Estado)</option>
                <option value="caso-u2">Estudos de Caso • Unidade 2 (Falhas de Mercado)</option>
                <option value="caso-u3">Estudos de Caso • Unidade 3 (Escolha Pública)</option>
                <option value="caso-u4">Estudos de Caso • Unidade 4 (Tributação & EC 132)</option>
                <option value="caso-u5">Estudos de Caso • Unidade 5 (Federalismo & LRF)</option>
              </optgroup>
            </select>
          </div>

          {/* Filtro por Status */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
            {[
              { id: 'todos', label: 'Todas' },
              { id: 'respondido_professor', label: 'Respondidas pelo Docente' },
              { id: 'aberto', label: 'Sem Resposta' },
              { id: 'minhas', label: 'Minhas Dúvidas' }
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setFiltroStatus(st.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  filtroStatus === st.id
                    ? 'bg-[#002752] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de Tópicos do Fórum */}
      {carregando ? (
        <div className="p-12 text-center bg-white rounded-xl border border-slate-200">
          <div className="w-8 h-8 border-3 border-[#002752] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-600">Carregando tópicos e debates acadêmicos...</p>
        </div>
      ) : duvidasFiltradas.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-slate-200 space-y-3">
          <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
          <h4 className="text-base font-bold text-slate-800">Nenhuma dúvida encontrada com estes filtros</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Seja o primeiro a levantar um debate conceitual ou dúvida de estudo de caso para a turma e o corpo docente!
          </p>
          <button
            onClick={() => setModalNovaDuvida(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#002752] hover:bg-[#003875] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-[#ebc000]" />
            Postar Pergunta Agora
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {duvidasFiltradas.map((duvida) => {
            const estaAberta = duvidaAbertaId === duvida.id;
            const temRespostaDocente = duvida.respostas?.some((r) => r.isProfessor) || duvida.status === 'respondido_professor';
            const totalResp = duvida.respostas?.length ?? duvida.totalRespostas ?? 0;

            return (
              <div
                key={duvida.id}
                id={`duvida-card-${duvida.id}`}
                className={`bg-white rounded-xl border transition-all ${
                  estaAberta
                    ? 'border-[#002752] ring-2 ring-[#002752]/20 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                {/* Cabeçalho do Card da Dúvida */}
                <div
                  onClick={() => setDuvidaAbertaId(estaAberta ? null : duvida.id)}
                  className="p-5 cursor-pointer flex flex-col sm:flex-row items-start justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    {/* Linha de Contexto da Aula & Status */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-[#002752]/10 text-[#002752] flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#002752]" />
                        {duvida.aulaTitulo}
                      </span>

                      {temRespostaDocente ? (
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                          Respondida pelo Professor
                        </span>
                      ) : totalResp > 0 ? (
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-blue-100 text-blue-800">
                          {totalResp} resposta(s) da turma
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-amber-100 text-amber-800">
                          Aguardando respostas
                        </span>
                      )}
                    </div>

                    {/* Título da Pergunta */}
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug hover:text-[#002752] transition-colors">
                      {duvida.titulo}
                    </h3>

                    {/* Descrição resumida ou integral */}
                    <p className={`text-xs sm:text-sm text-slate-600 leading-relaxed ${!estaAberta ? 'line-clamp-2' : ''}`}>
                      {duvida.descricao}
                    </p>

                    {/* Tags Conceituais */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {duvida.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-mono rounded hover:bg-slate-200"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Autor e Data */}
                    <div className="flex items-center gap-3 text-xs text-slate-500 pt-2 border-t border-slate-100">
                      <span className="flex items-center gap-1 font-medium text-slate-700">
                        {duvida.autorPapel === 'professor' ? (
                          <GraduationCap className="w-3.5 h-3.5 text-[#002752]" />
                        ) : (
                          <User className="w-3.5 h-3.5 text-slate-500" />
                        )}
                        {duvida.autorNome}
                        {duvida.autorMatricula && (
                          <span className="text-[10px] text-slate-400 font-mono">({duvida.autorMatricula})</span>
                        )}
                      </span>
                      <span>•</span>
                      <span>{duvida.criadoEm}</span>
                    </div>
                  </div>

                  {/* Coluna Lateral de Interação (Votos e Respostas) */}
                  <div className="flex sm:flex-col items-center gap-2 self-stretch sm:self-center shrink-0 border-t sm:border-t-0 sm:border-l border-slate-100 pt-3 sm:pt-0 sm:pl-4 justify-between sm:justify-center">
                    <button
                      onClick={(e) => handleVotar(duvida.id, e)}
                      title="Clique se você também tem essa dúvida ou achou pertinente"
                      className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-[#002752] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-[#002752]" />
                      <span>{duvida.votos || 0}</span>
                    </button>

                    <div className="text-xs font-bold text-slate-600 flex items-center gap-1 px-2 py-1 bg-slate-100 rounded-lg">
                      <MessageCircle className="w-3.5 h-3.5 text-slate-500" />
                      <span>{totalResp}</span>
                    </div>

                    {(usuarioAtual.papel === 'professor' || usuarioAtual.uid === duvida.autorId) && (
                      <button
                        onClick={(e) => handleExcluirDuvida(duvida.id, e)}
                        title="Excluir este tópico"
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Seção Aberta / Expandida com Respostas e Campo de Interação */}
                {estaAberta && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-4 bg-slate-50/50 rounded-b-xl">
                    {/* Link Rápido para Simulador ou Aula (se houver) */}
                    {duvida.simuladorSugeridoId && onNavigateToSimulator && (
                      <div className="p-3 bg-blue-50/80 border border-blue-200 rounded-xl flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2 text-[#002752]">
                          <Sparkles className="w-4 h-4 text-[#ebc000] shrink-0" />
                          <span>
                            Existe um simulador interativo associado a esta dúvida (
                            <strong>
                              {LISTA_25_SIMULADORES.find((s) => s.id === duvida.simuladorSugeridoId)?.titulo ||
                                duvida.simuladorSugeridoId}
                            </strong>
                            ).
                          </span>
                        </div>
                        <button
                          onClick={() => onNavigateToSimulator(duvida.simuladorSugeridoId!)}
                          className="px-3 py-1 bg-[#002752] text-white hover:bg-[#003875] rounded-lg font-bold text-[11px] flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
                        >
                          Abrir Simulador
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                    {/* Respostas Existentes */}
                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-[#002752]" />
                        Debate & Respostas ({totalResp})
                      </h4>

                      {(!duvida.respostas || duvida.respostas.length === 0) ? (
                        <div className="p-4 bg-white rounded-xl border border-dashed border-slate-300 text-center text-xs text-slate-500">
                          Ainda não há respostas para esta pergunta. Compartilhe seu raciocínio econômico abaixo!
                        </div>
                      ) : (
                        duvida.respostas.map((resp) => {
                          const isProf = resp.isProfessor || resp.autorPapel === 'professor';

                          return (
                            <div
                              key={resp.id}
                              className={`p-4 rounded-xl border space-y-2 transition-all ${
                                isProf
                                  ? 'bg-gradient-to-br from-amber-50/90 via-white to-blue-50/60 border-amber-300 ring-1 ring-amber-400/40 shadow-xs'
                                  : 'bg-white border-slate-200'
                              }`}
                            >
                              <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                  {isProf ? (
                                    <div className="flex items-center gap-1.5 font-bold text-[#002752] bg-[#ebc000] px-2.5 py-0.5 rounded-full shadow-2xs">
                                      <ShieldCheck className="w-3.5 h-3.5 text-[#002752]" />
                                      <span>Resposta Oficial do Professor</span>
                                    </div>
                                  ) : (
                                    <div className="flex items-center gap-1 font-semibold text-slate-800">
                                      <User className="w-3.5 h-3.5 text-slate-500" />
                                      <span>{resp.autorNome}</span>
                                      {resp.autorMatricula && (
                                        <span className="text-[10px] text-slate-400 font-mono">({resp.autorMatricula})</span>
                                      )}
                                    </div>
                                  )}
                                </div>
                                <span className="text-[11px] text-slate-400">{resp.criadoEm}</span>
                              </div>

                              <div className="text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed">
                                {resp.texto}
                              </div>

                              {isProf && (
                                <div className="pt-2 text-[10px] text-amber-900/80 font-medium flex items-center gap-1 border-t border-amber-200/60">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                  Validação Docente UEMA • Departamento de Ciências Econômicas
                                </div>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>

                    {/* Caixa de Texto para Adicionar Resposta */}
                    <div className="pt-3 border-t border-slate-200 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-700 flex items-center gap-1">
                          {usuarioAtual.papel === 'professor' ? (
                            <>
                              <GraduationCap className="w-4 h-4 text-[#002752]" />
                              Responder como Docente (Validação Oficial)
                            </>
                          ) : (
                            <>
                              <MessageSquare className="w-4 h-4 text-slate-600" />
                              Sua Contribuição ou Resposta:
                            </>
                          )}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {usuarioAtual.nome} ({usuarioAtual.papel === 'professor' ? 'Docente' : 'Discente'})
                        </span>
                      </div>

                      <div className="relative">
                        <textarea
                          rows={3}
                          placeholder={
                            usuarioAtual.papel === 'professor'
                              ? 'Escreva a explicação teórica, o mecanismo micro/macroeconômico e o desfecho analítico...'
                              : 'Contribua com seus apontamentos, cálculos ou interpretação do estudo de caso...'
                          }
                          value={textoResposta[duvida.id] || ''}
                          onChange={(e) =>
                            setTextoResposta((prev) => ({ ...prev, [duvida.id]: e.target.value }))
                          }
                          className="w-full p-3 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#002752]"
                        />
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={() => handleEnviarResposta(duvida.id)}
                          disabled={enviandoResposta || !textoResposta[duvida.id]?.trim()}
                          className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            usuarioAtual.papel === 'professor'
                              ? 'bg-[#002752] hover:bg-[#003875] text-[#ebc000]'
                              : 'bg-[#002752] hover:bg-[#003875] text-white'
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          <Send className="w-3.5 h-3.5" />
                          {enviandoResposta
                            ? 'Publicando...'
                            : usuarioAtual.papel === 'professor'
                            ? 'Publicar Resposta Docente'
                            : 'Enviar Resposta'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Modal / Formulário de Nova Dúvida */}
      {modalNovaDuvida && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#002752] text-[#ebc000] flex items-center justify-center font-bold">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Postar Nova Dúvida Acadêmica</h3>
                  <p className="text-xs text-slate-500">
                    Sua pergunta ficará visível para toda a turma e o corpo docente da UEMA
                  </p>
                </div>
              </div>
              <button
                onClick={() => setModalNovaDuvida(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCriarDuvida} className="space-y-4">
              {/* Seleção do Contexto (Aula ou Estudo de Caso) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Contexto Curricular (Aula ou Estudo de Caso) *
                </label>
                <select
                  value={novaAulaId}
                  onChange={(e) => setNovaAulaId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#002752]"
                >
                  <optgroup label="Aulas Teóricas">
                    {AULAS_PROGRAMADAS.map((a) => (
                      <option key={a.numero} value={`aula-${String(a.numero).padStart(2, '0')}`}>
                        Aula {String(a.numero).padStart(2, '0')}: {a.titulo}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Estudos de Caso Aplicados">
                    <option value="caso-u1">Estudos de Caso • Unidade 1: Papel do Estado na Economia</option>
                    <option value="caso-u2">Estudos de Caso • Unidade 2: Falhas de Mercado & Bens Públicos</option>
                    <option value="caso-u3">Estudos de Caso • Unidade 3: Teoria da Escolha Pública</option>
                    <option value="caso-u4">Estudos de Caso • Unidade 4: Tributação, Eficiência & EC 132/2023</option>
                    <option value="caso-u5">Estudos de Caso • Unidade 5: Federalismo Fiscal & LRF</option>
                  </optgroup>
                  <optgroup label="Outro">
                    <option value="geral">Dúvida Geral de Teoria das Finanças Públicas</option>
                  </optgroup>
                </select>
              </div>

              {/* Título da Pergunta */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Título Claro da Dúvida *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Por que a condição de Samuelson iguala a soma das TMS ao CMTg?"
                  value={novoTitulo}
                  onChange={(e) => setNovoTitulo(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#002752]"
                />
              </div>

              {/* Descrição Detalhada */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Explicação Detalhada do Problema / Raciocínio *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Explique o que você entendeu, em qual parte do texto ou do simulador surgiu a dúvida e quais foram suas hipóteses..."
                  value={novaDescricao}
                  onChange={(e) => setNovaDescricao(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#002752]"
                />
              </div>

              {/* Simulador Opcional Associado */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Simulador Relacionado (Opcional)
                </label>
                <select
                  value={novoSimuladorSugerido}
                  onChange={(e) => setNovoSimuladorSugerido(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#002752]"
                >
                  <option value="">Nenhum simulador específico</option>
                  {LISTA_25_SIMULADORES.map((sim) => (
                    <option key={sim.id} value={sim.id}>
                      {sim.icone} {sim.titulo} (Unidade {sim.unidade})
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags Conceituais */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Tags Conceituais (separadas por vírgula ou espaço)
                </label>
                <input
                  type="text"
                  placeholder="Ex: Coase, Externalidades, Samuelson, ICMS, Harberger, Ramsey"
                  value={novasTagsTexto}
                  onChange={(e) => setNovasTagsTexto(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#002752]"
                />
              </div>

              {/* Ações */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalNovaDuvida(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={salvandoDuvida || !novoTitulo.trim() || !novaDescricao.trim()}
                  className="px-5 py-2 bg-[#002752] hover:bg-[#003875] text-[#ebc000] font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  {salvandoDuvida ? 'Publicando...' : 'Publicar Dúvida no Fórum'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
