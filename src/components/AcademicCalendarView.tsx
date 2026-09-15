import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  BookOpen,
  Award,
  CheckCircle2,
  AlertCircle,
  Search,
  ExternalLink,
  Cpu,
  Printer,
  ChevronRight,
  Sparkles,
  GraduationCap,
  Download,
  CheckSquare,
  Square
} from 'lucide-react';
import { CALENDARIO_ACADEMICO, RESUMO_DATAS_CHAVE, EventoCalendario, TipoEventoCalendario } from '../data/calendarData';
import { GOOGLE_DRIVE_REPO } from '../data/questionsData';
import { UemaEconomiaLogo } from './UemaEconomiaLogo';

interface AcademicCalendarViewProps {
  modo?: 'aluno' | 'docente';
  onNavigateToLesson?: (aulaNum: number) => void;
  onNavigateToSimulator?: (simId: string) => void;
  onNavigateToQuiz?: (unidade?: number) => void;
}

export const AcademicCalendarView: React.FC<AcademicCalendarViewProps> = ({
  modo = 'aluno',
  onNavigateToLesson,
  onNavigateToSimulator,
  onNavigateToQuiz
}) => {
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [filtroMes, setFiltroMes] = useState<string>('todos');
  const [filtroModulo, setFiltroModulo] = useState<string>('todos');
  const [busca, setBusca] = useState<string>('');
  const [aulasConcluidasAluno, setAulasConcluidasAluno] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('uema_aulas_concluidas_calendario');
      return saved ? JSON.parse(saved) : ['cal-01', 'cal-02', 'cal-03', 'cal-04', 'cal-05'];
    } catch {
      return ['cal-01', 'cal-02', 'cal-03', 'cal-04', 'cal-05'];
    }
  });

  const toggleAulaConcluida = (id: string) => {
    setAulasConcluidasAluno((prev) => {
      const novo = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('uema_aulas_concluidas_calendario', JSON.stringify(novo));
      } catch (e) {
        console.error(e);
      }
      return novo;
    });
  };

  const eventosFiltrados = useMemo(() => {
    return CALENDARIO_ACADEMICO.filter((evento) => {
      // Filtro de tipo
      if (filtroTipo === 'aulas' && evento.tipo !== 'aula') return false;
      if (filtroTipo === 'provas' && evento.tipo !== 'prova' && evento.tipo !== 'prova_final') return false;
      if (filtroTipo === 'revisoes' && evento.tipo !== 'revisao') return false;

      // Filtro de mês
      if (filtroMes !== 'todos' && evento.mes !== filtroMes) return false;

      // Filtro de módulo
      if (filtroModulo !== 'todos') {
        if (filtroModulo === '1' && evento.modulo !== 1) return false;
        if (filtroModulo === '2' && evento.modulo !== 2) return false;
        if (filtroModulo === '3' && evento.modulo !== 3) return false;
      }

      // Busca textual
      if (busca.trim() !== '') {
        const termo = busca.toLowerCase();
        const noTitulo = evento.titulo.toLowerCase().includes(termo);
        const noSubtitulo = evento.subtitulo.toLowerCase().includes(termo);
        const noResumo = evento.resumoConteudo.toLowerCase().includes(termo);
        const nosTopicos = evento.topicosChave.some((t) => t.toLowerCase().includes(termo));
        const naData = evento.data.includes(termo) || evento.diaMes.includes(termo);
        return noTitulo || noSubtitulo || noResumo || nosTopicos || naData;
      }

      return true;
    });
  }, [filtroTipo, filtroMes, filtroModulo, busca]);

  const imprimirCalendario = () => {
    window.print();
  };

  const exportarCalendarioICS = () => {
    // Gerar arquivo .ics compatível com Google Calendar, Apple Calendar e Outlook
    let icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//UEMA//Financas Publicas//PT\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\nX-WR-CALNAME:Finanças Públicas - UEMA\n`;

    CALENDARIO_ACADEMICO.forEach((ev) => {
      // Data formato YYYYMMDD
      const partes = ev.data.split('/');
      const dtStr = `${partes[2]}${partes[1]}${partes[0]}`;
      icsContent += `BEGIN:VEVENT\n`;
      icsContent += `UID:${ev.id}-financas-uema@uema.br\n`;
      icsContent += `DTSTART;VALUE=DATE:${dtStr}\n`;
      icsContent += `SUMMARY:${ev.titulo}\n`;
      icsContent += `DESCRIPTION:${ev.subtitulo} - ${ev.resumoConteudo}\n`;
      icsContent += `LOCATION:${ev.local}\n`;
      icsContent += `END:VEVENT\n`;
    });

    icsContent += `END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'cronograma_financas_publicas_uema.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6" id="calendario-academico">
      {/* Banner Principal */}
      <div className="bg-[#002752] text-white p-6 rounded-2xl shadow-sm border-b-4 border-[#ebc000] flex flex-wrap items-center justify-between gap-6">
        <div className="flex-1 min-w-[280px]">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ebc000] text-[#002752] uppercase tracking-wider">
              {modo === 'docente' ? 'Painel Docente • Cronograma' : 'Área do Discente • Cronograma'}
            </span>
            <span className="text-xs text-slate-300">
              Semestre Letivo Oficial 2026 • Quintas-feiras (14h às 18h)
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight flex items-center gap-3">
            <Calendar className="w-8 h-8 text-[#ebc000]" />
            Calendário de Aulas & Avaliações (2026)
          </h2>
          <p className="text-sm text-slate-200 mt-1.5 max-w-3xl leading-relaxed">
            Acompanhamento completo de todas as datas, conteúdos programáticos, dias de revisão e avaliações presenciais. As aulas ocorrem semanalmente no CCSA/UEMA às quintas-feiras, com início em <strong>13/08/2026</strong> e término em <strong>03/12/2026</strong>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="p-2 bg-white/10 rounded-xl border border-white/20 hidden md:block">
            <UemaEconomiaLogo variant="compact" color="white" className="h-10" />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportarCalendarioICS}
              title="Baixar arquivo iCalendar (.ics) para sincronizar com Google Agenda"
              className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 transition-colors"
            >
              <Download className="w-4 h-4 text-[#ebc000]" />
              Sincronizar Agenda
            </button>
            <button
              onClick={imprimirCalendario}
              title="Imprimir calendário"
              className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Imprimir
            </button>
          </div>
        </div>
      </div>

      {/* Destaque das 4 Datas de Avaliações Solicitadas */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-[#002752] uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-[#ebc000]" />
            Datas Oficiais das Avaliações & Exame Final
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Horário padrão: 14:00 às 18:00
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Prova 1 */}
          <div className="bg-gradient-to-br from-amber-50 to-white p-4 rounded-xl border-2 border-amber-300 shadow-xs relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -right-2 -bottom-2 text-amber-200/50 pointer-events-none font-serif font-black text-6xl select-none">
              P1
            </div>
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-500 text-white">
                  1ª Avaliação
                </span>
                <span className="font-mono text-sm font-black text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                  24/09
                </span>
              </div>
              <h4 className="font-bold text-xs text-slate-900 leading-snug">
                Fundamentos e Falhas de Mercado
              </h4>
              <p className="text-[11px] text-slate-600 mt-1">
                Aulas 01 a 04 • Papel do Estado, Musgrave, Pareto, Coase e Monopólios Naturais.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-amber-200/60 flex items-center justify-between text-[11px]">
              <span className="text-amber-800 font-bold">Mesmo Peso (33,33%)</span>
              {onNavigateToQuiz && (
                <button
                  onClick={() => onNavigateToQuiz(1)}
                  className="text-xs text-[#002752] font-black hover:underline inline-flex items-center gap-0.5"
                >
                  Simulado P1 <ChevronRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Prova 2 */}
          <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl border-2 border-blue-300 shadow-xs relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -right-2 -bottom-2 text-blue-200/40 pointer-events-none font-serif font-black text-6xl select-none">
              P2
            </div>
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-[#002752] text-white">
                  2ª Avaliação
                </span>
                <span className="font-mono text-sm font-black text-[#002752] bg-blue-100 px-2 py-0.5 rounded">
                  22/10
                </span>
              </div>
              <h4 className="font-bold text-xs text-slate-900 leading-snug">
                Bens Públicos & Teoria da Tributação
              </h4>
              <p className="text-[11px] text-slate-600 mt-1">
                Aulas 05 a 08 • Samuelson, Harberger, Incidência Econômica, Ramsey e EC 132/23.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-blue-200/60 flex items-center justify-between text-[11px]">
              <span className="text-[#002752] font-bold">Mesmo Peso (33,33%)</span>
              {onNavigateToQuiz && (
                <button
                  onClick={() => onNavigateToQuiz(2)}
                  className="text-xs text-[#002752] font-black hover:underline inline-flex items-center gap-0.5"
                >
                  Simulado P2 <ChevronRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Prova 3 */}
          <div className="bg-gradient-to-br from-emerald-50 to-white p-4 rounded-xl border-2 border-emerald-300 shadow-xs relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -right-2 -bottom-2 text-emerald-200/40 pointer-events-none font-serif font-black text-6xl select-none">
              P3
            </div>
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-[#00733f] text-white">
                  3ª Avaliação
                </span>
                <span className="font-mono text-sm font-black text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                  26/11
                </span>
              </div>
              <h4 className="font-bold text-xs text-slate-900 leading-snug">
                Escolha Pública & Federalismo
              </h4>
              <p className="text-[11px] text-slate-600 mt-1">
                Aulas 09 a 12 • Niskanen, Arrow, Downs, Oates, Tiebout, FPE e LRF.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-emerald-200/60 flex items-center justify-between text-[11px]">
              <span className="text-emerald-800 font-bold">Mesmo Peso (33,33%)</span>
              {onNavigateToQuiz && (
                <button
                  onClick={() => onNavigateToQuiz(3)}
                  className="text-xs text-[#00733f] font-black hover:underline inline-flex items-center gap-0.5"
                >
                  Simulado P3 <ChevronRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Prova Final */}
          <div className="bg-gradient-to-br from-purple-50 to-white p-4 rounded-xl border-2 border-purple-300 shadow-xs relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -right-2 -bottom-2 text-purple-200/40 pointer-events-none font-serif font-black text-6xl select-none">
              PF
            </div>
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-purple-700 text-white">
                  Exame Final
                </span>
                <span className="font-mono text-sm font-black text-purple-900 bg-purple-100 px-2 py-0.5 rounded">
                  03/12
                </span>
              </div>
              <h4 className="font-bold text-xs text-slate-900 leading-snug">
                Prova Final & Encerramento
              </h4>
              <p className="text-[11px] text-slate-600 mt-1">
                Conteúdo Integral • 12 Aulas de programa e consolidação das notas no SIGAA.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-purple-200/60 flex items-center justify-between text-[11px]">
              <span className="text-purple-900 font-bold">Exame Substitutivo</span>
              <span className="text-[10px] font-bold text-purple-700 uppercase">Encerramento</span>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de Filtros e Pesquisa */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Busca Textual */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por tópico, data (ex: 24/09, 22/10), conceito ou professor..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002752]"
            />
          </div>

          {/* Filtro por Tipo */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setFiltroTipo('todos')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                filtroTipo === 'todos' ? 'bg-white text-[#002752] shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos ({CALENDARIO_ACADEMICO.length})
            </button>
            <button
              onClick={() => setFiltroTipo('aulas')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                filtroTipo === 'aulas' ? 'bg-white text-[#002752] shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Aulas (12)
            </button>
            <button
              onClick={() => setFiltroTipo('provas')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                filtroTipo === 'provas' ? 'bg-[#ebc000] text-[#002752] shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Provas (4)
            </button>
            <button
              onClick={() => setFiltroTipo('revisoes')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                filtroTipo === 'revisoes' ? 'bg-white text-[#002752] shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Revisão (1)
            </button>
          </div>
        </div>

        {/* Filtros Secundários: Mês e Módulo */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-500 font-medium">Filtrar Mês:</span>
          {['todos', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'].map((m) => (
            <button
              key={m}
              onClick={() => setFiltroMes(m)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                filtroMes === m
                  ? 'bg-[#002752] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {m === 'todos' ? 'Todos os Meses' : m}
            </button>
          ))}

          <span className="text-slate-300 mx-1">|</span>

          <span className="text-slate-500 font-medium">Módulo:</span>
          {[
            { id: 'todos', label: 'Todos' },
            { id: '1', label: 'Módulo I' },
            { id: '2', label: 'Módulo II' },
            { id: '3', label: 'Módulo III' }
          ].map((mod) => (
            <button
              key={mod.id}
              onClick={() => setFiltroModulo(mod.id)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                filtroModulo === mod.id
                  ? 'bg-[#00733f] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {mod.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Cronológica dos Encontros */}
      <div className="space-y-4">
        {eventosFiltrados.length === 0 ? (
          <div className="bg-white p-8 rounded-xl border border-slate-200 text-center space-y-2">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="font-bold text-sm text-slate-700">Nenhum evento encontrado com os filtros selecionados</h4>
            <p className="text-xs text-slate-500">Tente limpar a pesquisa ou selecionar "Todos os Meses".</p>
          </div>
        ) : (
          eventosFiltrados.map((evento, idx) => {
            const isConcluida = aulasConcluidasAluno.includes(evento.id);
            const isProva = evento.tipo === 'prova';
            const isProvaFinal = evento.tipo === 'prova_final';
            const isRevisao = evento.tipo === 'revisao';

            return (
              <div
                key={evento.id}
                className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden shadow-xs hover:shadow-md ${
                  isProvaFinal
                    ? 'border-purple-400 ring-2 ring-purple-100 bg-purple-50/20'
                    : isProva
                    ? 'border-amber-400 ring-2 ring-amber-100 bg-amber-50/20'
                    : isRevisao
                    ? 'border-blue-300 bg-blue-50/20'
                    : isConcluida
                    ? 'border-emerald-200'
                    : 'border-slate-200'
                }`}
              >
                <div className="p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  {/* Bloco 1: Data e Identificador */}
                  <div className="flex items-start gap-3.5 min-w-[200px]">
                    {/* Folha de Calendário */}
                    <div
                      className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center border text-center shrink-0 shadow-xs ${
                        isProvaFinal
                          ? 'bg-purple-900 border-purple-800 text-white'
                          : isProva
                          ? 'bg-amber-500 border-amber-600 text-white'
                          : isRevisao
                          ? 'bg-[#002752] border-blue-900 text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      <span className="text-[10px] font-black uppercase tracking-wider opacity-90">
                        {evento.mes.substring(0, 3)}
                      </span>
                      <span className="text-xl font-black font-mono leading-none my-0.5">
                        {evento.diaMes.split('/')[0]}
                      </span>
                      <span className="text-[9px] font-semibold opacity-80">
                        {evento.diaSemana ? evento.diaSemana.replace('-feira', '') : 'Quinta'}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        {isProvaFinal ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-purple-800 text-white uppercase tracking-wider">
                            Prova Final
                          </span>
                        ) : isProva ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-500 text-white uppercase tracking-wider">
                            Avaliação Presencial
                          </span>
                        ) : isRevisao ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-blue-700 text-white uppercase tracking-wider">
                            Revisão Intensiva
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 uppercase tracking-wider">
                            Aula {evento.aulaNumero ? String(evento.aulaNumero).padStart(2, '0') : ''}
                          </span>
                        )}

                        <span className="text-[11px] font-mono text-slate-500 font-bold">
                          {evento.data}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1.5">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {evento.horario}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#00733f]" />
                        <span>{evento.local}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bloco 2: Conteúdo e Tópicos */}
                  <div className="flex-1 min-w-[280px] space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      {evento.unidadeNumero && evento.unidadeNumero > 0 ? (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#002752] text-[#ebc000]">
                          Unidade {evento.unidadeNumero}
                        </span>
                      ) : null}
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {evento.moduloNome}
                      </span>
                      {evento.pesoAvaliacao && (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                          {evento.pesoAvaliacao}
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-sm sm:text-base text-[#002752] leading-snug">
                      {evento.titulo}
                    </h4>
                    <p className="text-xs text-slate-600 font-medium">
                      {evento.subtitulo}
                    </p>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {evento.resumoConteudo}
                    </p>

                    {/* Tópicos Chave */}
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {evento.topicosChave.map((topico, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-slate-50 text-slate-700 border border-slate-200"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#002752]" />
                          {topico}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bloco 3: Ações e Status */}
                  <div className="flex flex-col sm:flex-row md:flex-col items-end gap-2 shrink-0 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                    {/* Botão de Estudo / Aula */}
                    {evento.aulaNumero && onNavigateToLesson && (
                      <button
                        onClick={() => onNavigateToLesson(evento.aulaNumero!)}
                        className="w-full md:w-auto px-3 py-1.5 bg-[#002752] hover:bg-[#001c3d] text-white rounded-lg text-xs font-bold transition-colors inline-flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-[#ebc000]" />
                        Ver Conteúdo Completo
                      </button>
                    )}

                    {/* Botão para Prova */}
                    {(isProva || isProvaFinal) && onNavigateToQuiz && (
                      <button
                        onClick={() =>
                          onNavigateToQuiz(
                            typeof evento.modulo === 'number' ? evento.modulo : undefined
                          )
                        }
                        className="w-full md:w-auto px-3 py-1.5 bg-[#ebc000] hover:bg-amber-400 text-[#002752] rounded-lg text-xs font-black transition-transform hover:scale-105 inline-flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <Award className="w-3.5 h-3.5" />
                        Treinar Questões Desta Prova
                      </button>
                    )}

                    {/* Botão para Simulador */}
                    {evento.simuladorAssociado && onNavigateToSimulator && (
                      <button
                        onClick={() => onNavigateToSimulator(evento.simuladorAssociado!)}
                        className="w-full md:w-auto px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-[#00733f] border border-emerald-200 rounded-lg text-[11px] font-bold inline-flex items-center justify-center gap-1"
                      >
                        <Cpu className="w-3 h-3" />
                        Abrir Simulador
                      </button>
                    )}

                    {/* Checkbox de acompanhamento do aluno */}
                    {modo === 'aluno' && (
                      <button
                        onClick={() => toggleAulaConcluida(evento.id)}
                        className={`w-full md:w-auto mt-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold border flex items-center justify-center gap-1.5 transition-colors ${
                          isConcluida
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {isConcluida ? (
                          <>
                            <CheckSquare className="w-3.5 h-3.5 text-[#00733f]" />
                            <span>Concluída / Estudada</span>
                          </>
                        ) : (
                          <>
                            <Square className="w-3.5 h-3.5 text-slate-400" />
                            <span>Marcar como Estudada</span>
                          </>
                        )}
                      </button>
                    )}

                    {/* Visão de gestão docente */}
                    {modo === 'docente' && (
                      <div className="text-[10px] text-slate-500 text-right mt-1">
                        <span className="inline-block px-2 py-0.5 rounded bg-slate-100 font-mono">
                          Código: {evento.id}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Rodapé do Card: Bibliografia Rápida */}
                <div className="bg-slate-50/75 px-4 py-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-700">Leituras Obrigatórias:</span>
                    <span>{evento.referencias.join(' • ')}</span>
                  </div>
                  <a
                    href={GOOGLE_DRIVE_REPO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#002752] hover:text-[#00733f] font-semibold inline-flex items-center gap-1 text-[11px]"
                  >
                    Google Drive CCSA <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Resumo Estatístico do Cronograma */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#002752]/10 text-[#002752] flex items-center justify-center font-bold">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-slate-800 block">
              Carga Horária Total: 68 Horas/Aula
            </span>
            <span className="text-slate-500 text-[11px]">
              17 Encontros Presenciais de 4h/aula (13/08 a 03/12) • 12 Aulas de Conteúdo + 1 Revisão + 3 Provas + Exame Final
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500">Local das Aulas:</span>
          <span className="font-bold text-[#002752] bg-slate-100 px-2 py-1 rounded">
            CCSA • Prédio de Economia • Campus Paulo VI
          </span>
        </div>
      </div>
    </div>
  );
};
