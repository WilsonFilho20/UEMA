import React, { useState, useMemo } from 'react';
import {
  Database,
  Trash2,
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  Users,
  Search,
  FileText,
  ShieldAlert,
  X,
  History,
  Info,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import {
  firestoreDataService,
  RegistroSimuladoFirestore,
  isAlunoTeste,
  ALUNOS_TESTE_PADRAO
} from '../services/firestoreDataService';

interface DatabaseManagerViewProps {
  simulados: RegistroSimuladoFirestore[];
  onDataChanged: () => void;
}

export const DatabaseManagerView: React.FC<DatabaseManagerViewProps> = ({
  simulados,
  onDataChanged
}) => {
  const [buscaAluno, setBuscaAluno] = useState<string>('');
  const [filtroTipo, setFiltroTipo] = useState<'todos' | 'teste' | 'reais'>('todos');
  const [executandoAcao, setExecutandoAcao] = useState<boolean>(false);
  const [mensagemStatus, setMensagemStatus] = useState<{ tipo: 'sucesso' | 'erro' | 'info'; texto: string } | null>(null);

  // Modais de confirmação
  const [modalExcluirAluno, setModalExcluirAluno] = useState<{ id: string; nome: string; matricula: string } | null>(null);
  const [modalExcluirTodosTestes, setModalExcluirTodosTestes] = useState<boolean>(false);
  const [modalExcluirSimulado, setModalExcluirSimulado] = useState<RegistroSimuladoFirestore | null>(null);
  const [modalResetTotal, setModalResetTotal] = useState<boolean>(false);
  const [textoConfirmacaoReset, setTextoConfirmacaoReset] = useState<string>('');

  // Agrupar alunos únicos a partir dos registros de simulados
  const listaAlunosAgrupados = useMemo(() => {
    const mapa: Record<string, {
      id: string;
      nome: string;
      matricula: string;
      isTeste: boolean;
      totalSimulados: number;
      ultimoSimulado: string;
      mediaNotas: number;
    }> = {};

    simulados.forEach((s) => {
      const alunoTeste = isAlunoTeste(s.alunoId, s.alunoNome, s.alunoMatricula);
      if (!mapa[s.alunoId]) {
        mapa[s.alunoId] = {
          id: s.alunoId,
          nome: s.alunoNome || 'Discente sem nome',
          matricula: s.alunoMatricula || '—',
          isTeste: alunoTeste,
          totalSimulados: 0,
          ultimoSimulado: s.data,
          mediaNotas: 0
        };
      }
      mapa[s.alunoId].totalSimulados++;
      mapa[s.alunoId].mediaNotas += s.nota;
    });

    return Object.values(mapa).map((item) => ({
      ...item,
      mediaNotas: item.totalSimulados > 0 ? Number((item.mediaNotas / item.totalSimulados).toFixed(1)) : 0
    }));
  }, [simulados]);

  // Contagens para os cards de telemetria
  const alunosTesteCount = useMemo(() => {
    return listaAlunosAgrupados.filter((a) => a.isTeste).length;
  }, [listaAlunosAgrupados]);

  const simuladosTesteCount = useMemo(() => {
    return simulados.filter((s) => isAlunoTeste(s.alunoId, s.alunoNome, s.alunoMatricula)).length;
  }, [simulados]);

  const alunosFiltrados = useMemo(() => {
    return listaAlunosAgrupados.filter((a) => {
      if (filtroTipo === 'teste' && !a.isTeste) return false;
      if (filtroTipo === 'reais' && a.isTeste) return false;

      const t = buscaAluno.toLowerCase();
      return a.nome.toLowerCase().includes(t) || a.matricula.toLowerCase().includes(t);
    });
  }, [listaAlunosAgrupados, filtroTipo, buscaAluno]);

  // Excluir aluno individual e todo seu histórico
  const handleConfirmarExcluirAluno = async () => {
    if (!modalExcluirAluno) return;
    setExecutandoAcao(true);
    try {
      const res = await firestoreDataService.excluirAlunoCompletamente(modalExcluirAluno.id);
      setMensagemStatus({
        tipo: 'sucesso',
        texto: `Aluno "${modalExcluirAluno.nome}" e ${res.simuladosRemovidos} simulado(s) foram apagados do Firestore com sucesso.`
      });
      setModalExcluirAluno(null);
      onDataChanged();
    } catch (e: any) {
      setMensagemStatus({
        tipo: 'erro',
        texto: `Falha ao excluir aluno: ${e?.message || 'Erro de conexão ou permissão com o Firestore'}.`
      });
    } finally {
      setExecutandoAcao(false);
    }
  };

  // Excluir todos os alunos de teste e suas submissões
  const handleConfirmarExcluirTodosTestes = async () => {
    setExecutandoAcao(true);
    try {
      const res = await firestoreDataService.excluirTodosAlunosTeste();
      setMensagemStatus({
        tipo: 'sucesso',
        texto: `Limpeza concluída! Foram removidos ${res.simuladosRemovidos} simulado(s) de teste e ${res.usuariosRemovidos} conta(s) demonstrativa(s).`
      });
      setModalExcluirTodosTestes(false);
      onDataChanged();
    } catch (e: any) {
      setMensagemStatus({
        tipo: 'erro',
        texto: `Erro ao limpar alunos de teste: ${e?.message || 'Erro no Firestore'}.`
      });
    } finally {
      setExecutandoAcao(false);
    }
  };

  // Excluir simulado individual
  const handleConfirmarExcluirSimulado = async () => {
    if (!modalExcluirSimulado || !modalExcluirSimulado.id) return;
    setExecutandoAcao(true);
    try {
      await firestoreDataService.excluirSimulado(modalExcluirSimulado.id);
      setMensagemStatus({
        tipo: 'sucesso',
        texto: `Simulado do discente ${modalExcluirSimulado.alunoNome} removido com sucesso.`
      });
      setModalExcluirSimulado(null);
      onDataChanged();
    } catch (e: any) {
      setMensagemStatus({
        tipo: 'erro',
        texto: `Erro ao excluir simulado: ${e?.message || 'Erro no Firestore'}.`
      });
    } finally {
      setExecutandoAcao(false);
    }
  };

  // Injetar dados de teste (caso o professor queira retestar a telemetria)
  const handleInjetarAmostra = async () => {
    setExecutandoAcao(true);
    try {
      await firestoreDataService.simularSubmissoesAlunos();
      setMensagemStatus({
        tipo: 'sucesso',
        texto: '5 alunos de teste com notas demonstrativas foram inseridos no Firestore.'
      });
      onDataChanged();
    } catch (e: any) {
      setMensagemStatus({
        tipo: 'erro',
        texto: `Erro ao inserir amostras: ${e?.message}.`
      });
    } finally {
      setExecutandoAcao(false);
    }
  };

  // Reset total de todo o histórico de simulados
  const handleConfirmarResetTotal = async () => {
    if (textoConfirmacaoReset !== 'CONFIRMAR') return;
    setExecutandoAcao(true);
    try {
      const removidos = await firestoreDataService.limparTodoBancoSimulados();
      setMensagemStatus({
        tipo: 'sucesso',
        texto: `Banco de simulados resetado com sucesso! ${removidos} avaliações foram apagadas.`
      });
      setModalResetTotal(false);
      setTextoConfirmacaoReset('');
      onDataChanged();
    } catch (e: any) {
      setMensagemStatus({
        tipo: 'erro',
        texto: `Falha ao resetar banco: ${e?.message}.`
      });
    } finally {
      setExecutandoAcao(false);
    }
  };

  return (
    <div className="space-y-6" id="gestao-banco-view">
      {/* Cabeçalho do Módulo de Gerenciamento do Banco */}
      <div className="bg-[#002752] text-white p-5 sm:p-6 rounded-2xl border-b-4 border-[#ebc000] shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-700 text-white">
              Administração de Dados • Firestore
            </span>
            <span className="text-[11px] text-emerald-300 font-semibold flex items-center gap-1">
              <Database className="w-3.5 h-3.5" />
              Base de Dados Ativa
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
            <Database className="w-6 h-6 text-[#ebc000]" />
            Gerenciamento do Banco de Dados & Alunos de Teste
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Manipule os registros persistidos no Firestore. Exclua alunos de teste, limpe submissões demonstrativas e mantenha apenas os dados reais da turma para emissão dos relatórios oficiais da UEMA.
          </p>
        </div>

        {/* Ações Globais */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setModalExcluirTodosTestes(true)}
            disabled={executandoAcao || simuladosTesteCount === 0}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-40"
            title="Remove todos os alunos e submissões que foram gerados para teste"
          >
            <Trash2 className="w-4 h-4 text-white" />
            Apagar Todos Alunos de Teste ({alunosTesteCount})
          </button>

          <button
            onClick={handleInjetarAmostra}
            disabled={executandoAcao}
            className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
            title="Injeta 5 registros de teste para demonstração de relatórios"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${executandoAcao ? 'animate-spin' : ''}`} />
            Inserir Amostras Teste
          </button>
        </div>
      </div>

      {/* Alerta de Feedback de Ações */}
      {mensagemStatus && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between text-xs transition-all ${
            mensagemStatus.tipo === 'sucesso'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : mensagemStatus.tipo === 'erro'
              ? 'bg-rose-50 border-rose-300 text-rose-900'
              : 'bg-blue-50 border-blue-300 text-blue-900'
          }`}
        >
          <div className="flex items-center gap-2">
            {mensagemStatus.tipo === 'sucesso' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
            {mensagemStatus.tipo === 'erro' && <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />}
            {mensagemStatus.tipo === 'info' && <Info className="w-5 h-5 text-blue-600 shrink-0" />}
            <span className="font-semibold">{mensagemStatus.texto}</span>
          </div>
          <button
            onClick={() => setMensagemStatus(null)}
            className="text-slate-400 hover:text-slate-700 cursor-pointer ml-4"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Cartões Informativos de Status do Banco de Dados */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-500 block">
            Total de Alunos Registrados
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono text-[#002752]">
              {listaAlunosAgrupados.length}
            </span>
            <span className="text-xs text-slate-400">contas</span>
          </div>
          <span className="text-[11px] text-slate-500 block">
            {listaAlunosAgrupados.length - alunosTesteCount} discentes oficiais
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-amber-700 block">
            Alunos de Teste Detectados
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono text-amber-600">
              {alunosTesteCount}
            </span>
            <span className="text-xs text-amber-600 font-bold">para limpeza</span>
          </div>
          <span className="text-[11px] text-slate-500 block">
            {simuladosTesteCount} submissões vinculadas
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-500 block">
            Total de Simulados no Banco
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono text-[#00733f]">
              {simulados.length}
            </span>
            <span className="text-xs text-slate-400">registros</span>
          </div>
          <span className="text-[11px] text-slate-500 block">
            Em coleção `simulados_realizados`
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-500 block">
            Integridade da Amostra
          </span>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-black font-mono ${
              alunosTesteCount === 0 ? 'text-[#00733f]' : 'text-amber-600'
            }`}>
              {alunosTesteCount === 0 ? '100% Real' : 'Mista (Com Testes)'}
            </span>
          </div>
          <span className="text-[11px] text-slate-500 block">
            {alunosTesteCount === 0 ? 'Pronto para relatórios oficiais' : 'Recomenda-se apagar testes'}
          </span>
        </div>
      </div>

      {/* Tabela de Discentes com Botão de Exclusão Individual */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-base text-[#002752] flex items-center gap-2">
              <Users className="w-5 h-5 text-[#002752]" />
              Relação de Alunos no Banco de Dados
            </h3>
            <p className="text-xs text-slate-500">
              Gerencie cada discente individualmente e exclua cadastros ou submissões de teste.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por nome ou matrícula..."
                value={buscaAluno}
                onChange={(e) => setBuscaAluno(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden w-60"
              />
            </div>

            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value as any)}
              className="py-1.5 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg"
            >
              <option value="todos">Todos os Alunos</option>
              <option value="teste">Apenas Contas de Teste</option>
              <option value="reais">Apenas Alunos Oficiais</option>
            </select>
          </div>
        </div>

        {alunosFiltrados.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500 space-y-1">
            <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="font-semibold text-slate-700">Nenhum aluno encontrado.</p>
            <p className="text-slate-400">O banco está limpo ou o filtro não retornou resultados.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Estudante</th>
                  <th className="py-3 px-4">Matrícula</th>
                  <th className="py-3 px-4">Classificação</th>
                  <th className="py-3 px-4">Simulados Feitos</th>
                  <th className="py-3 px-4">Média de Notas</th>
                  <th className="py-3 px-4">Última Submissão</th>
                  <th className="py-3 px-4 text-center">Ações no Banco</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {alunosFiltrados.map((aluno) => (
                  <tr key={aluno.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {aluno.nome}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500">
                      {aluno.matricula}
                    </td>
                    <td className="py-3 px-4">
                      {aluno.isTeste ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          Conta de Teste
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          Discente Oficial
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-700">
                      {aluno.totalSimulados}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded font-black font-mono ${
                        aluno.mediaNotas >= 7.0 ? 'bg-emerald-100 text-emerald-800' :
                        aluno.mediaNotas >= 5.0 ? 'bg-amber-100 text-amber-900' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {aluno.mediaNotas.toFixed(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {aluno.ultimoSimulado}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => setModalExcluirAluno({ id: aluno.id, nome: aluno.nome, matricula: aluno.matricula })}
                        disabled={executandoAcao}
                        className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-bold inline-flex items-center gap-1 transition-colors cursor-pointer"
                        title="Apagar este aluno e todos os seus simulados do Firestore"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                        Apagar Aluno
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Tabela de Simulados Recentes no Firestore */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-[#002752] flex items-center gap-2">
              <History className="w-5 h-5 text-[#ebc000]" />
              Registros Individuais de Simulados Realizados ({simulados.length})
            </h3>
            <p className="text-xs text-slate-500">
              Lista direta da coleção `simulados_realizados`. Você pode excluir avaliações isoladas.
            </p>
          </div>

          <button
            onClick={() => setModalResetTotal(true)}
            className="text-xs font-bold text-rose-600 hover:text-rose-800 underline cursor-pointer"
          >
            Zerar Todo o Histórico de Simulados
          </button>
        </div>

        {simulados.length === 0 ? (
          <div className="py-10 text-center text-xs text-slate-400">
            Nenhum simulado registrado no Firestore.
          </div>
        ) : (
          <div className="overflow-x-auto max-h-80">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold sticky top-0 border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4">Data</th>
                  <th className="py-2.5 px-4">Estudante</th>
                  <th className="py-2.5 px-4">Matrícula</th>
                  <th className="py-2.5 px-4">Unidade</th>
                  <th className="py-2.5 px-4">Acertos</th>
                  <th className="py-2.5 px-4">Nota</th>
                  <th className="py-2.5 px-4">Dificuldade</th>
                  <th className="py-2.5 px-4 text-center">Excluir</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {simulados.slice(0, 30).map((sim) => {
                  const ehTeste = isAlunoTeste(sim.alunoId, sim.alunoNome, sim.alunoMatricula);
                  return (
                    <tr key={sim.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 text-slate-500">{sim.data}</td>
                      <td className="py-2.5 px-4 font-bold text-slate-800 flex items-center gap-1.5">
                        {sim.alunoNome}
                        {ehTeste && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold">
                            teste
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-4 font-mono text-slate-500">{sim.alunoMatricula}</td>
                      <td className="py-2.5 px-4 text-slate-700">U{sim.unidadeFiltro}</td>
                      <td className="py-2.5 px-4 text-slate-700">{sim.acertos}/{sim.total}</td>
                      <td className="py-2.5 px-4 font-mono font-bold text-slate-900">{sim.nota.toFixed(1)}</td>
                      <td className="py-2.5 px-4 text-slate-600">{sim.dificuldade}</td>
                      <td className="py-2.5 px-4 text-center">
                        <button
                          onClick={() => setModalExcluirSimulado(sim)}
                          disabled={executandoAcao}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                          title="Excluir este simulado"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de Confirmação: Excluir Aluno Individual */}
      {modalExcluirAluno && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Excluir Aluno do Banco de Dados?
                </h3>
                <p className="text-xs text-slate-500">
                  Esta ação é irreversível no Firestore.
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
              <p><strong>Estudante:</strong> {modalExcluirAluno.nome}</p>
              <p><strong>Matrícula:</strong> {modalExcluirAluno.matricula}</p>
              <p className="text-slate-500 pt-1">
                Todos os simulados e notas associados a este aluno serão removidos permanentemente.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setModalExcluirAluno(null)}
                disabled={executandoAcao}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmarExcluirAluno}
                disabled={executandoAcao}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                {executandoAcao ? 'Excluindo...' : 'Confirmar Exclusão'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação: Excluir Todos os Alunos de Teste */}
      {modalExcluirTodosTestes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Apagar Todos os Alunos de Teste?
                </h3>
                <p className="text-xs text-slate-500">
                  Limpeza automática de contas e avaliações demonstrativas.
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-2">
              <p className="font-semibold">
                Serão apagados:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-[11px]">
                <li><strong>{alunosTesteCount} contas de teste</strong> (ex: Ana Carolina, Bruno Santos, Clara Beatriz, Diego Carvalho, Eduardo Maranhão).</li>
                <li><strong>{simuladosTesteCount} submissões de teste</strong> gravadas na coleção `simulados_realizados`.</li>
                <li>Todos os alunos e cadastros reais de estudantes serão <strong>rigorosamente preservados</strong>.</li>
              </ul>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setModalExcluirTodosTestes(false)}
                disabled={executandoAcao}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmarExcluirTodosTestes}
                disabled={executandoAcao}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                {executandoAcao ? 'Limpando...' : 'Confirmar Limpeza de Testes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação: Excluir Simulado Individual */}
      {modalExcluirSimulado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Excluir Avaliação?
                </h3>
                <p className="text-xs text-slate-500">
                  O registro de nota será removido do Firestore.
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600">
              Deseja realmente apagar o simulado de <strong>{modalExcluirSimulado.alunoNome}</strong> ({modalExcluirSimulado.data}, nota {modalExcluirSimulado.nota.toFixed(1)})?
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setModalExcluirSimulado(null)}
                disabled={executandoAcao}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmarExcluirSimulado}
                disabled={executandoAcao}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl cursor-pointer shadow-xs"
              >
                {executandoAcao ? 'Excluindo...' : 'Excluir Simulado'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação: Reset Total com Palavra-Chave */}
      {modalResetTotal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Reset Total das Avaliações?
                </h3>
                <p className="text-xs text-slate-500">
                  Ação destrutiva e definitiva.
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-700">
              Esta ação apagará <strong>todos os {simulados.length} registros</strong> de simulados da turma no Firestore. Digite <strong>CONFIRMAR</strong> abaixo para prosseguir:
            </p>

            <input
              type="text"
              placeholder="Digite CONFIRMAR"
              value={textoConfirmacaoReset}
              onChange={(e) => setTextoConfirmacaoReset(e.target.value)}
              className="w-full px-3 py-2 text-xs font-mono font-bold bg-slate-50 border border-slate-300 rounded-lg uppercase tracking-wider focus:outline-hidden"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setModalResetTotal(false);
                  setTextoConfirmacaoReset('');
                }}
                disabled={executandoAcao}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmarResetTotal}
                disabled={executandoAcao || textoConfirmacaoReset !== 'CONFIRMAR'}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl cursor-pointer shadow-xs disabled:opacity-40"
              >
                {executandoAcao ? 'Resetando...' : 'Confirmar Reset Total'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
