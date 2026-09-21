import React, { useState, useMemo } from 'react';
import { AULAS_CURSO } from '../data/lessonsData';
import { UNIDADES_CURRICULARES, REFERENCIAS_OFICIAIS } from '../data/unidadesData';
import { BANCO_COMPLETO_1000_QUESTOES } from '../data/questionBankEngine';
import { LISTA_25_SIMULADORES } from './SimulatorsHub';
import { GOOGLE_DRIVE_REPO } from '../data/questionsData';
import { RegistroSimuladoFirestore } from '../services/firestoreDataService';
import {
  BookOpen,
  Calendar,
  Layers,
  Sparkles,
  Search,
  Sigma,
  Building2,
  Printer,
  ChevronDown,
  ChevronUp,
  FileDown,
  ExternalLink,
  Award,
  GraduationCap,
  Play,
  CheckCircle2,
  Bookmark,
  Link2,
  HelpCircle,
  FileText,
  Briefcase
} from 'lucide-react';
import { TODOS_ESTUDOS_DE_CASO } from '../data/casesData';

interface ProfessorLessonsCatalogProps {
  simuladosTurma?: RegistroSimuladoFirestore[];
  onCriarProvaParaAula?: (aulaNumero: number, unidadeNumero: number) => void;
  onNavegarParaSimulador?: (simId: string) => void;
}

export const ProfessorLessonsCatalog: React.FC<ProfessorLessonsCatalogProps> = ({
  simuladosTurma = [],
  onCriarProvaParaAula,
  onNavegarParaSimulador
}) => {
  const [unidadeFiltro, setUnidadeFiltro] = useState<number | 'Todas'>('Todas');
  const [buscaTexto, setBuscaTexto] = useState<string>('');
  const [aulaAberta, setAulaAberta] = useState<number | null>(1); // Aula 1 expandida por padrão
  const [expandirTodas, setExpandirTodas] = useState<boolean>(false);

  // Mapear desempenho da turma por aula com base nos simulados
  const estatisticasPorAula = useMemo(() => {
    const mapa: Record<number, { acertos: number; total: number; taxa: number }> = {};
    for (let i = 1; i <= 12; i++) {
      mapa[i] = { acertos: 0, total: 0, taxa: 0 };
    }

    simuladosTurma.forEach((s) => {
      if (s.aulaNumero && mapa[s.aulaNumero]) {
        mapa[s.aulaNumero].acertos += s.acertos;
        mapa[s.aulaNumero].total += s.total;
      }
    });

    for (let i = 1; i <= 12; i++) {
      if (mapa[i].total > 0) {
        mapa[i].taxa = Number(((mapa[i].acertos / mapa[i].total) * 100).toFixed(1));
      }
    }
    return mapa;
  }, [simuladosTurma]);

  // Contagem de questões no banco por aula
  const questoesPorAula = useMemo(() => {
    const mapa: Record<number, number> = {};
    for (let i = 1; i <= 12; i++) {
      mapa[i] = 0;
    }
    BANCO_COMPLETO_1000_QUESTOES.forEach((q) => {
      const numAula = q.aula_relacionada;
      if (numAula && mapa[numAula] !== undefined) {
        mapa[numAula]++;
      }
    });
    return mapa;
  }, []);

  // Filtragem das aulas
  const aulasFiltradas = useMemo(() => {
    return AULAS_CURSO.filter((aula) => {
      const matchUnidade = unidadeFiltro === 'Todas' || aula.unidadeNumero === unidadeFiltro;
      const matchBusca =
        buscaTexto.trim() === '' ||
        aula.titulo.toLowerCase().includes(buscaTexto.toLowerCase()) ||
        aula.subtitulo.toLowerCase().includes(buscaTexto.toLowerCase()) ||
        aula.foco.toLowerCase().includes(buscaTexto.toLowerCase()) ||
        aula.topicosChave.some((t) => t.toLowerCase().includes(buscaTexto.toLowerCase())) ||
        (aula.aplicabilidadeSetorPublico?.impactoPoliticaPublica &&
          aula.aplicabilidadeSetorPublico.impactoPoliticaPublica.toLowerCase().includes(buscaTexto.toLowerCase()));
      return matchUnidade && matchBusca;
    });
  }, [unidadeFiltro, buscaTexto]);

  const imprimirRelacaoAulas = () => {
    window.print();
  };

  return (
    <div className="space-y-6" id="relacao-aulas-docente">
      {/* Banner de Apresentação Docente */}
      <div className="bg-[#002752] text-white p-6 rounded-2xl shadow-sm border-b-4 border-[#ebc000] flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ebc000] text-[#002752] uppercase tracking-wider">
              Plano de Ensino & Relação Detalhada de Aulas
            </span>
            <span className="text-xs text-slate-300">
              Curso de Ciências Econômicas • UEMA • Teoria das Finanças Públicas
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight">
            Relação Completa das 12 Aulas do Curso
          </h2>
          <p className="text-sm text-slate-200 mt-1 max-w-3xl">
            Catálogo curricular exaustivo detalhado por objetivos pedagógicos, matriz de conteúdos, formulações matemáticas, aplicabilidade pública (Brasil & Maranhão), simuladores computacionais e bibliografia de referência.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={imprimirRelacaoAulas}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all cursor-pointer shadow-xs"
          >
            <Printer className="w-4 h-4 text-[#ebc000]" />
            Imprimir Relação de Aulas
          </button>

          <a
            href={GOOGLE_DRIVE_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#ebc000] hover:bg-amber-400 text-[#002752] text-xs font-bold transition-all shadow-xs"
          >
            <BookOpen className="w-4 h-4" />
            Repositório de Textos (Nuvem)
          </a>
        </div>
      </div>

      {/* Cartões de Indicadores Curriculares do Curso */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Carga Horária Total
          </span>
          <div className="text-2xl font-black text-[#002752] mt-1 font-serif">60 horas</div>
          <span className="text-[10px] text-slate-500">12 Aulas • 4 créditos</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Unidades Curriculares
          </span>
          <div className="text-2xl font-black text-[#002752] mt-1 font-serif">5 Unidades</div>
          <span className="text-[10px] text-slate-500">Estrutura oficial UEMA</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Estudos de Caso
          </span>
          <div className="text-2xl font-black text-[#00733f] mt-1 font-serif">{TODOS_ESTUDOS_DE_CASO.length} Casos</div>
          <span className="text-[10px] text-slate-500">5 por Unidade Curricular</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Laboratório Interativo
          </span>
          <div className="text-2xl font-black text-[#002752] mt-1 font-serif">25 Simuladores</div>
          <span className="text-[10px] text-slate-500">5 por Unidade Curricular</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Banco de Questões
          </span>
          <div className="text-2xl font-black text-[#002752] mt-1 font-serif">2.000 Itens</div>
          <span className="text-[10px] text-slate-500">Todas com justificativa</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Simulados Realizados
          </span>
          <div className="text-2xl font-black text-amber-600 mt-1 font-serif">
            {simuladosTurma.length}
          </div>
          <span className="text-[10px] text-slate-500">Registrados na turma</span>
        </div>
      </div>

      {/* Barra de Filtros, Busca e Ações Rápidas */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-bold text-slate-700 mr-1 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-[#002752]" />
            Filtrar Unidade:
          </span>
          {[
            { id: 'Todas', rotulo: 'Todas as Aulas (12)' },
            { id: 1, rotulo: 'U1: Papel do Estado (1-2)' },
            { id: 2, rotulo: 'U2: Falhas & Regulação (3-5)' },
            { id: 3, rotulo: 'U3: Escolha Pública (9-10)' },
            { id: 4, rotulo: 'U4: Tributação (6-8)' },
            { id: 5, rotulo: 'U5: Federalismo (11-12)' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setUnidadeFiltro(item.id as any)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                unidadeFiltro === item.id
                  ? 'bg-[#002752] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {item.rotulo}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por conteúdo, autor, LRF..."
              value={buscaTexto}
              onChange={(e) => setBuscaTexto(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#002752] w-56 sm:w-64"
            />
          </div>

          <button
            onClick={() => {
              setExpandirTodas(!expandirTodas);
              setAulaAberta(null);
            }}
            className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold cursor-pointer shrink-0"
          >
            {expandirTodas ? 'Recolher Todas' : 'Expandir Todas'}
          </button>
        </div>
      </div>

      {/* Relação Detalhada das 12 Aulas */}
      <div className="space-y-4">
        {aulasFiltradas.map((aula) => {
          const isAberta = expandirTodas || aulaAberta === aula.numero;
          const simuladoresDaAula = LISTA_25_SIMULADORES.filter(
            (sim) => sim.aulaNumero === aula.numero
          );
          const totalQuestoes = questoesPorAula[aula.numero] || 0;
          const stats = estatisticasPorAula[aula.numero];

          return (
            <div
              key={aula.numero}
              id={`aula-detalhe-docente-${aula.numero}`}
              className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-xs ${
                isAberta
                  ? 'border-[#002752] ring-1 ring-[#002752]/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Cabeçalho do Card da Aula (Clicável) */}
              <div
                onClick={() => {
                  if (expandirTodas) {
                    setExpandirTodas(false);
                    setAulaAberta(aula.numero);
                  } else {
                    setAulaAberta(isAberta ? null : aula.numero);
                  }
                }}
                className="p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none bg-slate-50/60 hover:bg-slate-100/70 transition-colors"
              >
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-[#002752] text-[#ebc000] font-mono font-black text-lg flex items-center justify-center shrink-0 shadow-xs">
                    {aula.numero.toString().padStart(2, '0')}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#002752] text-[#ebc000]">
                        Unidade {aula.unidadeNumero}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                        {aula.moduloNome}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        4h/aula • {aula.topicosChave.length} Tópicos Centrais
                      </span>
                      {simuladoresDaAula.length > 0 && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          {simuladoresDaAula.length} Simuladores Interativos
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#002752] font-serif truncate">
                      {aula.titulo}
                    </h3>
                    <p className="text-xs text-slate-600 truncate">{aula.subtitulo}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 ml-3">
                  {stats && stats.total > 0 && (
                    <div className="hidden md:flex flex-col items-end">
                      <span className="text-[10px] text-slate-500 font-semibold uppercase">
                        Taxa de Acerto
                      </span>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded ${
                          stats.taxa >= 75
                            ? 'bg-emerald-100 text-emerald-800'
                            : stats.taxa >= 60
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {stats.taxa}% ({stats.total} resp.)
                      </span>
                    </div>
                  )}

                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-700">
                    {isAberta ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Corpo Detalhado da Aula (Expandido) */}
              {isAberta && (
                <div className="p-5 sm:p-6 space-y-6 border-t border-slate-200 bg-white">
                  {/* Foco Pedagógico & Síntese Docente */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#002752] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#ebc000]" />
                      Foco Pedagógico e Síntese Teórica da Aula
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-serif">
                      {aula.foco}
                    </p>
                  </div>

                  {/* Matriz de Tópicos Centrais do Conteúdo Programático */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#002752]" />
                      Tópicos Centrais do Conteúdo Programático ({aula.topicosChave.length} itens)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {aula.topicosChave.map((topico, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 text-xs flex items-start gap-2.5"
                        >
                          <span className="w-5 h-5 rounded-full bg-[#002752] text-[#ebc000] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="text-slate-800 leading-relaxed font-medium">
                            {topico}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Aplicabilidade Prática no Setor Público (Brasil & Maranhão) */}
                  {aula.aplicabilidadeSetorPublico && (
                    <div className="space-y-3 p-4 bg-emerald-50/50 rounded-xl border border-emerald-200">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-emerald-700" />
                        Aplicabilidade no Setor Público (Estudo de Caso & Políticas Reais)
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-white rounded-lg border border-emerald-100 space-y-1">
                          <span className="font-bold text-[#002752] block text-[11px]">
                            🇧🇷 Âmbito Federal / Nacional:
                          </span>
                          <p className="text-slate-700 leading-relaxed text-[11px]">
                            {aula.aplicabilidadeSetorPublico.ambitoNacional}
                          </p>
                        </div>

                        {aula.aplicabilidadeSetorPublico.ambitoEstadualMaranhao && (
                          <div className="p-3 bg-white rounded-lg border border-emerald-100 space-y-1">
                            <span className="font-bold text-[#002752] block text-[11px]">
                              🌴 Âmbito do Estado do Maranhão:
                            </span>
                            <p className="text-slate-700 leading-relaxed text-[11px]">
                              {aula.aplicabilidadeSetorPublico.ambitoEstadualMaranhao}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="p-2.5 bg-emerald-100/70 rounded-lg text-emerald-950 text-[11px] leading-relaxed font-semibold">
                        Impacto na Tomada de Decisão: {aula.aplicabilidadeSetorPublico.impactoPoliticaPublica}
                      </div>
                    </div>
                  )}

                  {/* Formulação Matemática & Equação Chave */}
                  {aula.equacaoChave && (
                    <div className="p-4 bg-[#002752]/5 rounded-xl border border-[#002752]/15 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#002752]">
                        <Sigma className="w-4 h-4 text-[#ebc000]" />
                        <span>Formulação Matemática & Modelo de Equilíbrio:</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200 font-mono font-bold text-xs sm:text-sm text-[#002752] overflow-x-auto">
                        {aula.equacaoChave.formula}
                      </div>
                      <p className="text-[11px] text-slate-600">
                        {aula.equacaoChave.descricao}
                      </p>
                    </div>
                  )}

                  {/* Simuladores Computacionais Associados à Aula */}
                  {simuladoresDaAula.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                        <Play className="w-3.5 h-3.5 text-[#002752]" />
                        Simuladores Interativos Mapeados para Esta Aula ({simuladoresDaAula.length})
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {simuladoresDaAula.map((sim) => (
                          <div
                            key={sim.id}
                            className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-xl">{sim.icone}</span>
                                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                                  U{sim.unidade} • A{sim.aulaNumero}
                                </span>
                              </div>
                              <h5 className="font-bold text-xs text-slate-900">
                                {sim.titulo}
                              </h5>
                              <p className="text-[10px] text-slate-600 line-clamp-2">
                                {sim.subtitulo}
                              </p>
                            </div>

                            <div className="mt-3 pt-2 border-t border-slate-200/70 flex items-center justify-between text-[11px]">
                              <span className="text-slate-500 text-[10px]">
                                {sim.tags[0]}
                              </span>
                              {onNavegarParaSimulador && (
                                <button
                                  onClick={() => onNavegarParaSimulador(sim.id)}
                                  className="text-xs font-bold text-[#002752] hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                                >
                                  Abrir Modelo →
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bibliografia Obrigatória e Complementar Catalogada */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-[#00733f]" />
                      Leituras Obrigatórias e Bibliografia de Referência
                    </h4>

                    <div className="space-y-2">
                      {(aula.referenciasDetalhadas || []).map((ref, i) => (
                        <div
                          key={i}
                          className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-700"
                        >
                          <div className="space-y-0.5">
                            <div>
                              <strong>{ref.autor}</strong> ({ref.ano}). <em>{ref.obra}</em>.
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {ref.capituloOuPaginas} • <strong>Contribuição:</strong> {ref.contribuicaoChave}
                            </div>
                          </div>

                          <a
                            href={ref.linkDrive || aula.drivePath || GOOGLE_DRIVE_REPO}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-[#002752] font-semibold border border-slate-200 text-[11px] shrink-0 self-start sm:self-center transition-colors"
                          >
                            Abrir Texto no Drive <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Barra de Ações do Professor para Esta Aula */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200 bg-slate-50 -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 p-4 rounded-b-2xl">
                    <div className="text-xs text-slate-600 font-medium">
                      📦 Banco de Questões Disponíveis: <strong>{totalQuestoes} questões</strong> vinculadas
                    </div>

                    <div className="flex items-center gap-2">
                      {onCriarProvaParaAula && (
                        <button
                          onClick={() => onCriarProvaParaAula(aula.numero, aula.unidadeNumero)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#002752] hover:bg-blue-950 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-[#ebc000]" />
                          Elaborar Prova Desta Aula no Gerador
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
