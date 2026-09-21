import React, { useState } from 'react';
import { AULAS_CURSO } from '../data/lessonsData';
import { UNIDADES_CURRICULARES, REFERENCIAS_OFICIAIS, TOTAL_HORAS_CURSO, TOTAL_UNIDADES, TOTAL_REFERENCIAS } from '../data/unidadesData';
import { GOOGLE_DRIVE_REPO } from '../data/questionsData';
import { Aula, UnidadeCurricular, ReferenciaOficial } from '../types';
import { UemaEconomiaLogo } from './UemaEconomiaLogo';
import { ZettelkastenViewer } from './ZettelkastenViewer';
import { InteractiveLessonModule } from './InteractiveLessonModule';
import { CaseStudiesHub } from './CaseStudiesHub';
import { OBTER_CASOS_POR_UNIDADE } from '../data/casesData';
import {
  BookOpen,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Play,
  Layers,
  Sparkles,
  Search,
  Sigma,
  Building2,
  Bookmark,
  Link2,
  CheckCircle,
  FileText,
  Copy,
  Check,
  Clock,
  Award,
  Library,
  GraduationCap,
  Briefcase
} from 'lucide-react';

interface LessonsViewProps {
  onOpenSimulator?: (simuladorId?: string) => void;
  onOpenQuiz?: (aulaNumero?: number) => void;
}

export const LessonsView: React.FC<LessonsViewProps> = ({ onOpenSimulator, onOpenQuiz }) => {
  const [abaAtiva, setAbaAtiva] = useState<'unidades' | 'casos' | 'aulas' | 'referencias' | 'zettelkasten'>('unidades');
  const [unidadeFiltroCasos, setUnidadeFiltroCasos] = useState<number | 'Todas'>('Todas');
  
  // Filtros da aba de Aulas
  const [unidadeFiltroAulas, setUnidadeFiltroAulas] = useState<number | 'Todas'>('Todas');
  const [buscaTextoAulas, setBuscaTextoAulas] = useState<string>('');
  const [aulaAberta, setAulaAberta] = useState<number | null>(1); // Aula 1 aberta por padrão

  // Filtros da aba de Unidades
  const [unidadeSelecionadaId, setUnidadeSelecionadaId] = useState<number | 'Todas'>('Todas');

  // Filtros da aba de Referências
  const [categoriaRefFiltro, setCategoriaRefFiltro] = useState<'Todas' | 'Principal' | 'Complementar'>('Todas');
  const [unidadeRefFiltro, setUnidadeRefFiltro] = useState<number | 'Todas'>('Todas');
  const [buscaRefTexto, setBuscaRefTexto] = useState<string>('');
  const [copiadoId, setCopiadoId] = useState<number | null>(null);

  const copiarCitacao = (id: number, texto: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(texto);
      setCopiadoId(id);
      setTimeout(() => setCopiadoId(null), 2500);
    }
  };

  // Filtragem de Aulas
  const aulasFiltradas = AULAS_CURSO.filter((aula) => {
    const matchUnidade = unidadeFiltroAulas === 'Todas' || aula.unidadeNumero === unidadeFiltroAulas;
    const matchTexto =
      aula.titulo.toLowerCase().includes(buscaTextoAulas.toLowerCase()) ||
      aula.subtitulo.toLowerCase().includes(buscaTextoAulas.toLowerCase()) ||
      aula.foco.toLowerCase().includes(buscaTextoAulas.toLowerCase()) ||
      aula.topicosChave.some((c) => c.toLowerCase().includes(buscaTextoAulas.toLowerCase())) ||
      (aula.aplicabilidadeSetorPublico?.impactoPoliticaPublica &&
        aula.aplicabilidadeSetorPublico.impactoPoliticaPublica.toLowerCase().includes(buscaTextoAulas.toLowerCase()));
    return matchUnidade && matchTexto;
  });

  // Filtragem de Unidades
  const unidadesFiltradas = UNIDADES_CURRICULARES.filter((u) => {
    if (unidadeSelecionadaId === 'Todas') return true;
    return u.numero === unidadeSelecionadaId;
  });

  // Filtragem de Referências
  const referenciasFiltradas = REFERENCIAS_OFICIAIS.filter((ref) => {
    const matchCat = categoriaRefFiltro === 'Todas' || ref.categoria === categoriaRefFiltro;
    const matchUni = unidadeRefFiltro === 'Todas' || ref.unidadesRelacionadas.includes(unidadeRefFiltro as number);
    const termo = buscaRefTexto.toLowerCase();
    const matchTexto =
      !termo ||
      ref.autores.toLowerCase().includes(termo) ||
      ref.titulo.toLowerCase().includes(termo) ||
      ref.citacaoABNT.toLowerCase().includes(termo) ||
      ref.detalhes.toLowerCase().includes(termo);
    return matchCat && matchUni && matchTexto;
  });

  return (
    <div className="space-y-6" id="cronograma-aulas">
      {/* Header Banner */}
      <div className="bg-[#002752] text-white p-5 sm:p-6 rounded-2xl shadow-sm border-b-4 border-[#ebc000] flex flex-wrap items-center justify-between gap-5">
        <div className="flex-1 min-w-[280px]">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ebc000] text-[#002752] uppercase tracking-wider">
              Estrutura Pedagógica 60 Horas
            </span>
            <span className="text-xs text-slate-300">
              Curso de Ciências Econômicas • UEMA 2026
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif tracking-tight text-white">
            Ementa Curricular & Plano de Ensino
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-3xl leading-relaxed">
            Disciplina de <strong>Economia do Setor Público (Cód. 0403036)</strong> organizada em <strong>5 Unidades Temáticas (60h)</strong>, 
            articuladas a 12 aulas cronológicas, laboratórios econométricos e 28 referências bibliográficas normatizadas em ABNT.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <UemaEconomiaLogo className="h-12 w-auto bg-white/10 p-1.5 rounded-xl backdrop-blur-xs border border-white/20" />
          <a
            href={GOOGLE_DRIVE_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-xs transition-colors border border-white/20"
          >
            <BookOpen className="w-4 h-4 text-[#ebc000]" />
            Repositório Google Drive ↗
          </a>
        </div>
      </div>

      {/* Main View Mode Selector (Tabs) */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-200/70 rounded-xl">
        <button
          onClick={() => setAbaAtiva('unidades')}
          className={`py-2 px-3.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            abaAtiva === 'unidades'
              ? 'bg-[#002752] text-[#ebc000] shadow-xs'
              : 'text-slate-700 hover:text-slate-900 bg-white/60 hover:bg-white'
          }`}
        >
          <Layers className="w-4 h-4 text-[#ebc000]" />
          <span>Ementa por Unidades (5 Unidades • 60h)</span>
        </button>

        <button
          onClick={() => {
            setAbaAtiva('casos');
            setUnidadeFiltroCasos('Todas');
          }}
          className={`py-2 px-3.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            abaAtiva === 'casos'
              ? 'bg-[#002752] text-[#ebc000] shadow-xs'
              : 'text-slate-700 hover:text-slate-900 bg-white/60 hover:bg-white'
          }`}
        >
          <Briefcase className="w-4 h-4 text-[#00733f]" />
          <span>Estudos de Caso (25 Casos • 5/Unid)</span>
        </button>

        <button
          onClick={() => setAbaAtiva('aulas')}
          className={`py-2 px-3.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            abaAtiva === 'aulas'
              ? 'bg-white text-[#002752] shadow-xs'
              : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-[#002752]" />
          <span>Plano de Ensino (12 Aulas)</span>
        </button>

        <button
          onClick={() => setAbaAtiva('referencias')}
          className={`py-2 px-3.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            abaAtiva === 'referencias'
              ? 'bg-white text-[#002752] shadow-xs'
              : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          <Library className="w-4 h-4 text-[#00733f]" />
          <span>Referências Bibliográficas ({TOTAL_REFERENCIAS} Obras ABNT)</span>
        </button>

        <button
          onClick={() => setAbaAtiva('zettelkasten')}
          className={`py-2 px-3.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            abaAtiva === 'zettelkasten'
              ? 'bg-white text-[#002752] shadow-xs'
              : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          <Bookmark className="w-4 h-4 text-[#002752]" />
          <span>Fichas Zettelkasten (50 Conceitos)</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* ABA 1: EMENTA POR UNIDADES (5 UNIDADES • 60H)                             */}
      {/* ========================================================================= */}
      {abaAtiva === 'unidades' && (
        <div className="space-y-6">
          {/* Carga Horária Breakdown Ribbon */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#002752]" />
                  Distribuição Oficial da Carga Horária (Total: 60h)
                </h4>
                <p className="text-[11px] text-slate-500">
                  Estrutura curricular aprovada pelo Colegiado de Ciências Econômicas da UEMA.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold">
                <span className="px-2.5 py-1 bg-[#002752] text-white rounded-lg">
                  {TOTAL_UNIDADES} Unidades
                </span>
                <span className="px-2.5 py-1 bg-[#00733f] text-white rounded-lg">
                  {TOTAL_HORAS_CURSO}h Totais
                </span>
              </div>
            </div>

            {/* Visual Progress / Distribution Bar */}
            <div className="grid grid-cols-5 gap-2 text-center text-xs">
              {UNIDADES_CURRICULARES.map((u) => {
                const percentual = Math.round((u.cargaHorariaHoras / TOTAL_HORAS_CURSO) * 100);
                return (
                  <button
                    key={u.numero}
                    onClick={() => setUnidadeSelecionadaId(u.numero)}
                    className={`p-2.5 rounded-lg border transition-all text-left ${
                      unidadeSelecionadaId === u.numero
                        ? 'bg-[#002752] text-white border-[#002752] shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-mono font-bold uppercase ${
                        unidadeSelecionadaId === u.numero ? 'text-[#ebc000]' : 'text-[#002752]'
                      }`}>
                        Unid. {u.numero}
                      </span>
                      <span className={`text-[11px] font-bold px-1.5 py-0.2 rounded ${
                        unidadeSelecionadaId === u.numero ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {u.cargaHoraria}
                      </span>
                    </div>
                    <div className="text-[11px] font-medium line-clamp-1">
                      {u.titulo}
                    </div>
                    <div className={`text-[10px] mt-1 ${
                      unidadeSelecionadaId === u.numero ? 'text-slate-300' : 'text-slate-500'
                    }`}>
                      {percentual}% da ementa
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Filter Pill Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 pt-3 mt-3 border-t border-slate-100 text-xs">
              <span className="text-slate-500 font-semibold mr-1">Filtrar Exibição:</span>
              <button
                onClick={() => setUnidadeSelecionadaId('Todas')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                  unidadeSelecionadaId === 'Todas'
                    ? 'bg-[#002752] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Todas as 5 Unidades
              </button>
              {UNIDADES_CURRICULARES.map((u) => (
                <button
                  key={u.numero}
                  onClick={() => setUnidadeSelecionadaId(u.numero)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                    unidadeSelecionadaId === u.numero
                      ? 'bg-[#002752] text-[#ebc000]'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Unidade {u.numero} ({u.cargaHoraria})
                </button>
              ))}
            </div>
          </div>

          {/* Cards das Unidades */}
          <div className="space-y-6">
            {unidadesFiltradas.map((unidade) => (
              <div
                key={unidade.numero}
                id={`unidade-card-${unidade.numero}`}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden"
              >
                {/* Header da Unidade */}
                <div className="p-5 sm:p-6 bg-slate-50/70 border-b border-slate-200 flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-1.5 flex-1 min-w-[280px]">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-black font-mono bg-[#002752] text-[#ebc000]">
                        UNIDADE {unidade.numero.toString().padStart(2, '0')}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-[#00733f] text-white flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {unidade.cargaHoraria}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                        <Award className="w-3 h-3 text-amber-700" />
                        {unidade.avaliacaoRelacionada}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-[#002752] font-serif pt-1">
                      Unidade {unidade.numero}: {unidade.titulo}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {unidade.descricao}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                    {onOpenQuiz && (
                      <button
                        onClick={() => onOpenQuiz(unidade.aulasRelacionadas[0])}
                        className="px-3 py-2 bg-[#00733f] hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#ebc000]" />
                        Praticar Questões da Unidade {unidade.numero}
                      </button>
                    )}
                  </div>
                </div>

                {/* Conteúdo da Unidade */}
                <div className="p-5 sm:p-6 space-y-6">
                  {/* Subtópicos Oficiais e Referências da Unidade */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-[#002752]" />
                      Conteúdo Programático Oficial & Referências Específicas
                    </h4>

                    <div className="space-y-3">
                      {unidade.subtopicos.map((sub) => (
                        <div
                          key={sub.numero}
                          className="p-4 bg-slate-50/90 rounded-xl border border-slate-200 space-y-2 hover:border-slate-300 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-[#002752] text-[#ebc000] font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                              {sub.numero}
                            </span>
                            <div className="flex-1 space-y-1">
                              <h5 className="font-bold text-xs sm:text-sm text-slate-800">
                                {sub.titulo}
                              </h5>

                              {/* Referências em destaque (exatamente como solicitado) */}
                              <div className="p-2.5 bg-amber-50/80 rounded-lg border border-amber-200/80 text-[11px] text-amber-950 font-medium">
                                <span className="font-bold text-amber-900 block mb-0.5 flex items-center gap-1">
                                  <BookOpen className="w-3 h-3 text-amber-700" />
                                  Bibliografia Indicada:
                                </span>
                                <code>{sub.referenciasTexto}</code>
                              </div>

                              {/* Referências Detalhadas em ABNT */}
                              {sub.referenciasDetalhadas && sub.referenciasDetalhadas.length > 0 && (
                                <div className="pt-1 text-[11px] text-slate-600 space-y-1">
                                  <span className="font-semibold text-slate-500 block text-[10px] uppercase tracking-wider">
                                    Citação ABNT Completa:
                                  </span>
                                  <ul className="list-disc list-inside space-y-0.5 pl-1">
                                    {sub.referenciasDetalhadas.map((refAbt, idx) => (
                                      <li key={idx} className="leading-relaxed">
                                        {refAbt}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Competências Desenvolvidas */}
                  {unidade.competencias && unidade.competencias.length > 0 && (
                    <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200/70 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#00733f] flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-[#00733f]" />
                        Competências e Habilidades a Serem Desenvolvidas
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700">
                        {unidade.competencias.map((comp, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-[#00733f] font-bold">✓</span>
                            <span>{comp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Aulas do Plano de Ensino Associadas a esta Unidade */}
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4 text-[#002752]" />
                        Aulas Cronológicas do Plano de Ensino Vinculadas ({unidade.aulasRelacionadas.length} aulas)
                      </h4>
                      <button
                        onClick={() => {
                          setAbaAtiva('aulas');
                          setUnidadeFiltroAulas(unidade.numero);
                        }}
                        className="text-xs text-[#002752] font-bold hover:underline flex items-center gap-1"
                      >
                        Ver no Plano Completo →
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {unidade.aulasRelacionadas.map((numAula) => {
                        const aulaObj = AULAS_CURSO.find((a) => a.numero === numAula);
                        if (!aulaObj) return null;

                        return (
                          <div
                            key={numAula}
                            onClick={() => {
                              setAbaAtiva('aulas');
                              setUnidadeFiltroAulas('Todas');
                              setAulaAberta(numAula);
                              setTimeout(() => {
                                const el = document.getElementById(`aula-card-${numAula}`);
                                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              }, 150);
                            }}
                            className="p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-[#002752]/40 rounded-xl cursor-pointer transition-all space-y-2 group shadow-2xs"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono font-bold text-xs bg-[#002752] text-[#ebc000] px-2 py-0.5 rounded">
                                Aula {numAula.toString().padStart(2, '0')}
                              </span>
                              <span className="text-[10px] text-slate-500 font-medium">
                                4h/aula
                              </span>
                            </div>
                            <h5 className="font-bold text-xs text-[#002752] group-hover:text-[#001c3d] line-clamp-1">
                              {aulaObj.titulo}
                            </h5>
                            <p className="text-[11px] text-slate-500 line-clamp-2">
                              {aulaObj.subtitulo}
                            </p>
                            <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[10px] text-slate-600">
                              <span>{aulaObj.zettelkasten?.length || 0} Fichas Slip-Box</span>
                              <span className="text-[#002752] font-semibold group-hover:underline">Detalhes →</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Estudos de Caso da Unidade (5 Casos) */}
                  <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200/60 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-[#00733f] flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-[#00733f]" />
                          5 Estudos de Caso & Fixação Conceitual (Unidade {unidade.numero}):
                        </span>
                        <p className="text-[11px] text-slate-600">
                          Casos empíricos aplicados à realidade brasileira e maranhense com dados e dilemas fiscais.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setAbaAtiva('casos');
                          setUnidadeFiltroCasos(unidade.numero);
                        }}
                        className="px-3 py-1.5 bg-[#00733f] hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        Abrir os 5 Casos no Hub →
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-1">
                      {OBTER_CASOS_POR_UNIDADE(unidade.numero).map((caso) => (
                        <div
                          key={caso.id}
                          onClick={() => {
                            setAbaAtiva('casos');
                            setUnidadeFiltroCasos(unidade.numero);
                          }}
                          className="p-2.5 bg-white hover:bg-emerald-50/50 border border-emerald-100 hover:border-emerald-300 rounded-lg cursor-pointer transition-all space-y-1 text-left shadow-2xs"
                        >
                          <div className="flex items-center justify-between text-[9px]">
                            <span className="font-bold text-[#00733f] bg-emerald-100/60 px-1.5 py-0.5 rounded">
                              Caso #{caso.numeroNaUnidade}
                            </span>
                            <span className="text-slate-500 font-medium">{caso.ambito}</span>
                          </div>
                          <h6 className="text-[11px] font-bold text-slate-800 line-clamp-1">
                            {caso.titulo}
                          </h6>
                          <p className="text-[10px] text-slate-500 line-clamp-1">
                            {caso.teoriaAplicada.conceito}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Simuladores Interativos Associados */}
                  {unidade.simuladores && unidade.simuladores.length > 0 && onOpenSimulator && (
                    <div className="p-4 bg-[#002752]/5 rounded-xl border border-[#002752]/15 flex flex-wrap items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-[#002752] flex items-center gap-1.5">
                          <Play className="w-3.5 h-3.5 text-[#ebc000]" />
                          Laboratórios Computacionais Aplicados a esta Unidade:
                        </span>
                        <p className="text-[11px] text-slate-600">
                          Simule modelos microeconômicos com parâmetros calibrados em tempo real.
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {unidade.simuladores.map((simId) => (
                          <button
                            key={simId}
                            onClick={() => onOpenSimulator(simId)}
                            className="px-3 py-1.5 bg-[#002752] hover:bg-[#001c3d] text-[#ebc000] rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs uppercase tracking-wider"
                          >
                            <Play className="w-3 h-3" />
                            Simulador: {simId}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ABA DE ESTUDOS DE CASO (25 CASOS PRÁTICOS • 5 POR UNIDADE)                */}
      {/* ========================================================================= */}
      {abaAtiva === 'casos' && (
        <CaseStudiesHub
          initialUnidade={unidadeFiltroCasos}
          onNavigateToSimulator={onOpenSimulator}
        />
      )}

      {/* ========================================================================= */}
      {/* ABA 2: PLANO DE ENSINO (12 AULAS CRONOLÓGICAS)                             */}
      {/* ========================================================================= */}
      {abaAtiva === 'aulas' && (
        <div className="space-y-6">
          {/* Filter and Search Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5 mr-1">
                <Layers className="w-4 h-4 text-[#002752]" />
                Filtrar por Unidade:
              </span>
              {[
                { id: 'Todas', rotulo: 'Todas (12 Aulas)' },
                { id: 1, rotulo: 'Unidade 1: Papel do Estado (1-2)' },
                { id: 2, rotulo: 'Unidade 2: Falhas de Mercado (3-5)' },
                { id: 3, rotulo: 'Unidade 3: Escolha Pública (9-10)' },
                { id: 4, rotulo: 'Unidade 4: Tributação (6-8)' },
                { id: 5, rotulo: 'Unidade 5: Federalismo Fiscal (11-12)' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setUnidadeFiltroAulas(item.id as any)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    unidadeFiltroAulas === item.id
                      ? 'bg-[#002752] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {item.rotulo}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Pesquisar por conceito, autor, LRF..."
                value={buscaTextoAulas}
                onChange={(e) => setBuscaTextoAulas(e.target.value)}
                className="pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#002752] w-56 sm:w-64"
              />
            </div>
          </div>

          {/* Lessons Accordion List */}
          <div className="space-y-5">
            {aulasFiltradas.map((aula) => {
              const estaAberta = aulaAberta === aula.numero;

              return (
                <div
                  key={aula.numero}
                  id={`aula-card-${aula.numero}`}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                    estaAberta
                      ? 'border-[#002752]/40 shadow-md ring-1 ring-[#002752]/10'
                      : 'border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  {/* Header Toggle */}
                  <div
                    onClick={() => setAulaAberta(estaAberta ? null : aula.numero)}
                    className="p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none bg-slate-50/50 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#002752] text-[#ebc000] font-mono font-black text-base flex items-center justify-center shrink-0 shadow-xs">
                        {aula.numero.toString().padStart(2, '0')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#002752] text-[#ebc000]">
                            Unidade {aula.unidadeNumero}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                            {aula.moduloNome}
                          </span>
                          <span className="text-[11px] text-slate-500 font-medium">
                            4h/aula • {aula.zettelkasten?.length || 0} Fichas Zettelkasten
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-[#002752] font-serif truncate">
                          {aula.titulo}
                        </h3>
                        <p className="text-xs text-slate-500 truncate">{aula.subtitulo}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-700">
                        {estaAberta ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Lesson Details */}
                  {estaAberta && (
                    <div className="p-4 sm:p-6 border-t border-slate-200 space-y-6 text-xs sm:text-sm">
                      {/* Vínculo com a Ementa Oficial por Unidades */}
                      <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-[#002752] text-[#ebc000] font-mono font-bold text-[11px]">
                            UNIDADE {aula.unidadeNumero}
                          </span>
                          <span className="font-semibold text-amber-950">
                            {aula.unidadeNome}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setAbaAtiva('unidades');
                            setUnidadeSelecionadaId(aula.unidadeNumero || 1);
                          }}
                          className="text-[#002752] font-bold text-[11px] hover:underline"
                        >
                          Ver Detalhes da Unidade {aula.unidadeNumero} →
                        </button>
                      </div>

                      {/* Foco Pedagógico & Síntese */}
                      <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200 space-y-1.5">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-[#002752] flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-[#00733f]" />
                          Foco Pedagógico & Síntese Teórica
                        </h4>
                        <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">
                          {aula.foco}
                        </p>
                      </div>

                      {/* Tópicos Centrais Estruturados */}
                      <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5">
                        <h5 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#ebc000]" />
                          Tópicos Centrais do Conteúdo Programático
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700">
                          {aula.topicosChave.map((topico, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <CheckCircle className="w-3.5 h-3.5 text-[#00733f] shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{topico}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* APLICABILIDADE PRÁTICA NO SETOR PÚBLICO */}
                      {aula.aplicabilidadeSetorPublico && (
                        <div className="p-4 sm:p-5 bg-emerald-50/50 rounded-xl border border-emerald-200/80 space-y-3">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-[#00733f]" />
                            <h5 className="font-bold text-xs uppercase tracking-wider text-[#00733f]">
                              Aplicabilidade Prática no Setor Público (Brasil & Maranhão)
                            </h5>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
                            {aula.aplicabilidadeSetorPublico.ambitoFederal && (
                              <div className="p-3 bg-white rounded-lg border border-emerald-100 space-y-1">
                                <span className="font-bold text-[#002752] block text-[11px]">
                                  🏛️ Âmbito Federal & Políticas Nacionais:
                                </span>
                                <p className="text-slate-700 text-[11px] leading-relaxed">
                                  {aula.aplicabilidadeSetorPublico.ambitoFederal}
                                </p>
                              </div>
                            )}

                            {aula.aplicabilidadeSetorPublico.ambitoEstadualMaranhao && (
                              <div className="p-3 bg-white rounded-lg border border-emerald-100 space-y-1">
                                <span className="font-bold text-[#002752] block text-[11px]">
                                  🌴 Contexto do Estado do Maranhão:
                                </span>
                                <p className="text-slate-700 text-[11px] leading-relaxed">
                                  {aula.aplicabilidadeSetorPublico.ambitoEstadualMaranhao}
                                </p>
                              </div>
                            )}
                          </div>

                          <div className="p-2.5 bg-emerald-100/60 rounded-lg text-emerald-950 text-[11px] leading-relaxed font-medium">
                            <strong>Impacto na Decisão Pública:</strong> {aula.aplicabilidadeSetorPublico.impactoPoliticaPublica}
                          </div>
                        </div>
                      )}

                      {/* FICHAS ZETTELKASTEN DESTA AULA */}
                      {aula.zettelkasten && aula.zettelkasten.length > 0 && (
                        <div className="space-y-3 pt-2 border-t border-slate-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Bookmark className="w-4 h-4 text-[#ebc000]" />
                              <h5 className="font-bold text-xs uppercase tracking-wider text-[#002752]">
                                Fichas de Conceitos Atômicos (Zettelkasten desta Aula)
                              </h5>
                            </div>
                            <span className="text-[11px] text-slate-500 font-medium">
                              {aula.zettelkasten.length} fichas interligadas
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {aula.zettelkasten.map((card) => (
                              <div
                                key={card.id}
                                className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between space-y-3 hover:border-[#002752]/30 transition-all shadow-xs"
                              >
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="px-2 py-0.5 rounded font-mono font-black text-xs bg-[#002752] text-[#ebc000]">
                                      {card.id}
                                    </span>
                                    <div className="flex items-center gap-1">
                                      {card.tags.slice(0, 1).map((t) => (
                                        <span key={t} className="text-[10px] text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                                          {t}
                                        </span>
                                      ))}
                                    </div>
                                  </div>

                                  <h6 className="font-bold text-xs text-[#002752] font-serif">
                                    {card.conceito}
                                  </h6>

                                  <p className="text-[11px] text-slate-700 leading-relaxed font-medium bg-white p-2 rounded border border-slate-200">
                                    {card.teseCentral}
                                  </p>

                                  <p className="text-[11px] text-slate-600 leading-relaxed">
                                    {card.fundamentacaoTeorica}
                                  </p>
                                </div>

                                <div className="pt-2 border-t border-slate-200 text-[10px] space-y-1.5">
                                  <div className="flex flex-wrap items-center gap-1 text-slate-500">
                                    <Link2 className="w-3 h-3 text-[#002752]" />
                                    <span>Conecta-se a:</span>
                                    {card.conexoes.map((c) => (
                                      <span key={c} className="font-mono font-bold text-[#002752] bg-white px-1 rounded border border-slate-200">
                                        {c}
                                      </span>
                                    ))}
                                  </div>
                                  <div className="text-slate-500 truncate" title={card.referenciaBibliografica}>
                                    📖 {card.referenciaBibliografica}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Equação / Formulação Matemática se existir */}
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

                      {/* MÓDULO DE AULA INTERATIVA: DILEMAS, TOMADA DE DECISÃO E SIMULADORES */}
                      <InteractiveLessonModule
                        aula={aula}
                        onOpenSimulator={onOpenSimulator ?? (() => {})}
                        onOpenQuiz={onOpenQuiz ?? (() => {})}
                      />

                      {/* Bibliografia Recomendada e Detalhada */}
                      <div className="space-y-2.5 pt-2 border-t border-slate-100">
                        <h5 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-[#00733f]" />
                          Referências Bibliográficas Catalogadas no Repositório do Curso
                        </h5>

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

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                        <div className="text-[11px] text-slate-500">
                          Conteúdo alinhado aos simuladores interativos e banco de questões da UEMA.
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          {aula.simuladorAssociado && onOpenSimulator && (
                            <button
                              onClick={() => onOpenSimulator(aula.simuladorAssociado)}
                              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#002752] hover:bg-[#001c3d] text-white rounded-xl text-xs font-bold transition-colors"
                            >
                              <Play className="w-3.5 h-3.5 text-[#ebc000]" />
                              Abrir Laboratório ({aula.simuladorAssociado})
                            </button>
                          )}

                          {onOpenQuiz && (
                            <button
                              onClick={() => onOpenQuiz(aula.numero)}
                              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#00733f] hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-[#ebc000]" />
                              Resolver Questões Desta Aula
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
      )}

      {/* ========================================================================= */}
      {/* ABA 3: REFERÊNCIAS BIBLIOGRÁFICAS (28 OBRAS ABNT)                         */}
      {/* ========================================================================= */}
      {abaAtiva === 'referencias' && (
        <div className="space-y-6">
          {/* Header e Filtros */}
          <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-[#002752] flex items-center gap-2">
                  <Library className="w-5 h-5 text-[#00733f]" />
                  Catálogo Bibliográfico Geral da Disciplina
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  28 obras normatizadas conforme ABNT NBR 6023, separadas entre bibliografia principal e complementar.
                </p>
              </div>

              <a
                href={GOOGLE_DRIVE_REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-[#002752] text-white hover:bg-[#001c3d] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <BookOpen className="w-4 h-4 text-[#ebc000]" />
                Pasta Completa de PDFs no Drive ↗
              </a>
            </div>

            {/* Controles de Filtro */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
              {/* Categoria */}
              <div className="space-y-1">
                <span className="font-semibold text-slate-700">Categoria:</span>
                <div className="flex items-center gap-1">
                  {[
                    { id: 'Todas', label: 'Todas (28)' },
                    { id: 'Principal', label: 'Básica / Principal (15)' },
                    { id: 'Complementar', label: 'Complementar (13)' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCategoriaRefFiltro(cat.id as any)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        categoriaRefFiltro === cat.id
                          ? 'bg-[#002752] text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Unidade */}
              <div className="space-y-1">
                <span className="font-semibold text-slate-700">Filtrar por Unidade:</span>
                <select
                  value={unidadeRefFiltro}
                  onChange={(e) => setUnidadeRefFiltro(e.target.value === 'Todas' ? 'Todas' : Number(e.target.value))}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:ring-1 focus:ring-[#002752]"
                >
                  <option value="Todas">Todas as Unidades (1 a 5)</option>
                  <option value={1}>Unidade 1: O Papel do Estado na Economia</option>
                  <option value={2}>Unidade 2: Falhas de Mercado e Função Alocativa</option>
                  <option value={3}>Unidade 3: Teoria da Escolha Pública</option>
                  <option value={4}>Unidade 4: Princípios Teóricos da Tributação</option>
                  <option value={5}>Unidade 5: Introdução ao Federalismo Fiscal</option>
                </select>
              </div>

              {/* Busca Textual */}
              <div className="space-y-1">
                <span className="font-semibold text-slate-700">Buscar por Autor ou Título:</span>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Ex: Stiglitz, Buchanan, Musgrave, Coase..."
                    value={buscaRefTexto}
                    onChange={(e) => setBuscaRefTexto(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#002752]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Lista de Referências Filtradas */}
          <div className="space-y-3">
            <div className="text-xs text-slate-500 font-medium px-1">
              Exibindo {referenciasFiltradas.length} de {TOTAL_REFERENCIAS} obras catalogadas
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {referenciasFiltradas.map((ref) => {
                const foiCopiado = copiadoId === ref.id;

                return (
                  <div
                    key={ref.id}
                    className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 shadow-xs flex flex-col justify-between space-y-3 transition-colors"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                            #{ref.id.toString().padStart(2, '0')}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            ref.categoria === 'Principal'
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                              : 'bg-slate-100 text-slate-700 border border-slate-300'
                          }`}>
                            {ref.categoria === 'Principal' ? 'Básica / Principal' : 'Complementar'}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          {ref.unidadesRelacionadas.map((u) => (
                            <span
                              key={u}
                              className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#002752] text-[#ebc000]"
                              title={`Vinculada à Unidade ${u}`}
                            >
                              U{u}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Citação Formatada ABNT */}
                      <div className="text-xs text-slate-800 leading-relaxed font-sans select-text">
                        <strong>{ref.autores}</strong> ({ref.ano}). <em>{ref.titulo}</em>. {ref.detalhes}
                      </div>
                    </div>

                    {/* Botões de Ação */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => copiarCitacao(ref.id, ref.citacaoABNT)}
                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${
                          foiCopiado
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {foiCopiado ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-700" />
                            Copiado!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-500" />
                            Copiar Citação ABNT
                          </>
                        )}
                      </button>

                      <a
                        href={GOOGLE_DRIVE_REPO}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[11px] font-semibold text-[#002752] hover:text-[#001c3d] hover:underline"
                      >
                        Acessar no Drive <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ABA 4: EXPLORADOR ZETTELKASTEN                                            */}
      {/* ========================================================================= */}
      {abaAtiva === 'zettelkasten' && (
        <ZettelkastenViewer
          onSelectAula={(aulaNum) => {
            setAbaAtiva('aulas');
            setAulaAberta(aulaNum);
            setTimeout(() => {
              const el = document.getElementById(`aula-card-${aulaNum}`);
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
          }}
        />
      )}
    </div>
  );
};
