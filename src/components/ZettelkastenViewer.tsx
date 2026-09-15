import React, { useState, useMemo } from 'react';
import { ZettelkastenCard } from '../types';
import { ZETTELKASTEN_CARDS } from '../data/zettelkastenData';
import { GOOGLE_DRIVE_REPO } from '../data/questionsData';
import {
  Layers,
  Search,
  BookOpen,
  Link2,
  Tag,
  Sparkles,
  Eye,
  EyeOff,
  Sigma,
  Building2,
  ExternalLink,
  ChevronRight,
  Filter,
  CheckCircle2,
  Bookmark
} from 'lucide-react';

interface ZettelkastenViewerProps {
  initialAula?: number | 'Todas';
  cards?: ZettelkastenCard[];
  onSelectAula?: (aulaNumero: number) => void;
}

export const ZettelkastenViewer: React.FC<ZettelkastenViewerProps> = ({
  initialAula = 'Todas',
  cards = ZETTELKASTEN_CARDS,
  onSelectAula
}) => {
  const [aulaFiltro, setAulaFiltro] = useState<number | 'Todas'>(initialAula);
  const [tagSelecionada, setTagSelecionada] = useState<string | null>(null);
  const [buscaTexto, setBuscaTexto] = useState<string>('');
  const [modoFixacaoAtiva, setModoFixacaoAtiva] = useState<boolean>(false);
  const [cartoesRevelados, setCartoesRevelados] = useState<Record<string, boolean>>({});
  const [cardEmFoco, setCardEmFoco] = useState<string | null>(null);

  // Extract all unique tags
  const todasTags = useMemo(() => {
    const set = new Set<string>();
    cards.forEach((c) => c.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [cards]);

  // Filtered cards
  const cartoesFiltrados = useMemo(() => {
    return cards.filter((c) => {
      // Aula filter
      if (aulaFiltro !== 'Todas' && c.aulaNumero !== aulaFiltro) return false;

      // Tag filter
      if (tagSelecionada && !c.tags.includes(tagSelecionada)) return false;

      // Text search
      if (buscaTexto.trim()) {
        const query = buscaTexto.toLowerCase();
        const noId = c.id.toLowerCase().includes(query);
        const noConceito = c.conceito.toLowerCase().includes(query);
        const naTese = c.teseCentral.toLowerCase().includes(query);
        const naFundamentacao = c.fundamentacaoTeorica.toLowerCase().includes(query);
        const naAplicabilidade = c.aplicabilidadePratica.toLowerCase().includes(query);
        const nasTags = c.tags.some((t) => t.toLowerCase().includes(query));
        if (!noId && !noConceito && !naTese && !naFundamentacao && !naAplicabilidade && !nasTags) {
          return false;
        }
      }

      return true;
    });
  }, [cards, aulaFiltro, tagSelecionada, buscaTexto]);

  const alternarRevelacao = (id: string) => {
    setCartoesRevelados((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const pularParaCard = (cardId: string) => {
    setCardEmFoco(cardId);
    setAulaFiltro('Todas');
    setTagSelecionada(null);
    setBuscaTexto('');

    setTimeout(() => {
      const elem = document.getElementById(`zettel-${cardId}`);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        elem.classList.add('ring-4', 'ring-[#ebc000]', 'scale-[1.01]');
        setTimeout(() => {
          elem.classList.remove('ring-4', 'ring-[#ebc000]', 'scale-[1.01]');
        }, 2500);
      }
    }, 100);
  };

  return (
    <div className="space-y-6" id="zettelkasten-slipbox">
      {/* Top Banner & Control Bar */}
      <div className="bg-[#002752] text-white p-5 sm:p-6 rounded-2xl shadow-sm border-b-4 border-[#ebc000] flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-[260px]">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ebc000] text-[#002752] uppercase tracking-wider flex items-center gap-1">
              <Bookmark className="w-3.5 h-3.5" /> Metodologia Zettelkasten (Slip-Box)
            </span>
            <span className="text-xs text-slate-300 hidden sm:inline">
              {cards.length} Fichas Conceituais Atômicas Interligadas
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif">
            Fichário de Conceitos Atômicos & Conexões
          </h2>
          <p className="text-slate-200 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Cada ficha condensa um conceito elementar de Finanças Públicas com rigor teórico, formulação matemática, caso prático no Brasil e links cruzados com outras fichas para máxima fixação cognitiva.
          </p>
        </div>

        {/* Active recall toggle */}
        <div className="flex items-center gap-3 bg-white/10 px-4 py-2.5 rounded-xl border border-white/20">
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-[#ebc000] block">
              Fixação Ativa (Active Recall)
            </span>
            <span className="text-xs text-slate-200 block">
              {modoFixacaoAtiva ? 'Respostas Ocultadas' : 'Modo Leitura Direta'}
            </span>
          </div>
          <button
            onClick={() => setModoFixacaoAtiva(!modoFixacaoAtiva)}
            className={`p-2 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-bold ${
              modoFixacaoAtiva ? 'bg-[#ebc000] text-[#002752]' : 'bg-white/20 text-white hover:bg-white/30'
            }`}
            title="Ocultar definições para testar sua memória antes de revelar"
          >
            {modoFixacaoAtiva ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{modoFixacaoAtiva ? 'Ativo' : 'Ocultar'}</span>
          </button>
        </div>
      </div>

      {/* Filter and Tag Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        {/* Row 1: Search and Aulas */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-1 min-w-[260px]">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Pesquisar conceito, tese, LRF, autor, ID..."
                value={buscaTexto}
                onChange={(e) => setBuscaTexto(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#002752]"
              />
            </div>
            {buscaTexto && (
              <button
                onClick={() => setBuscaTexto('')}
                className="text-slate-400 hover:text-slate-600 text-xs px-2 py-1"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Selector of Aula */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            <span className="font-semibold text-slate-700 shrink-0 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[#002752]" /> Aula:
            </span>
            <select
              value={aulaFiltro}
              onChange={(e) => setAulaFiltro(e.target.value === 'Todas' ? 'Todas' : Number(e.target.value))}
              className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-700 font-medium focus:ring-1 focus:ring-[#002752]"
            >
              <option value="Todas">Todas as 12 Aulas ({cards.length} fichas)</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                <option key={num} value={num}>
                  Aula {num.toString().padStart(2, '0')} ({cards.filter((c) => c.aulaNumero === num).length} fichas)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: Tag Chips */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-semibold text-slate-500 mr-1 flex items-center gap-1">
            <Tag className="w-3 h-3" /> Tags:
          </span>
          <button
            onClick={() => setTagSelecionada(null)}
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-colors ${
              tagSelecionada === null
                ? 'bg-[#002752] text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todas as Tags
          </button>
          {todasTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setTagSelecionada(tagSelecionada === tag ? null : tag)}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-colors ${
                tagSelecionada === tag
                  ? 'bg-[#ebc000] text-[#002752] font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <div>
          Mostrando <strong>{cartoesFiltrados.length}</strong> de <strong>{cards.length}</strong> fichas Zettelkasten
          {tagSelecionada && <span> com tag <strong>{tagSelecionada}</strong></span>}
          {aulaFiltro !== 'Todas' && <span> na <strong>Aula {aulaFiltro}</strong></span>}
        </div>
        {(tagSelecionada || buscaTexto || aulaFiltro !== 'Todas') && (
          <button
            onClick={() => {
              setAulaFiltro('Todas');
              setTagSelecionada(null);
              setBuscaTexto('');
            }}
            className="text-[#00733f] font-semibold hover:underline"
          >
            Restaurar Filtros
          </button>
        )}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cartoesFiltrados.map((card) => {
          const estaOculto = modoFixacaoAtiva && !cartoesRevelados[card.id];
          const isFoco = cardEmFoco === card.id;

          return (
            <div
              key={card.id}
              id={`zettel-${card.id}`}
              className={`bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md ${
                isFoco
                  ? 'border-[#ebc000] ring-2 ring-[#ebc000]/60'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Slip Card Top Edge / Index Header */}
              <div>
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded font-mono font-black text-xs bg-[#002752] text-[#ebc000] tracking-wider">
                      {card.id}
                    </span>
                    <button
                      onClick={() => onSelectAula && onSelectAula(card.aulaNumero)}
                      className="text-[11px] font-bold text-slate-600 hover:text-[#002752] hover:underline"
                    >
                      Aula {card.aulaNumero.toString().padStart(2, '0')}
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {modoFixacaoAtiva && (
                      <button
                        onClick={() => alternarRevelacao(card.id)}
                        className={`p-1 rounded text-[10px] font-bold flex items-center gap-1 ${
                          estaOculto
                            ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                            : 'bg-emerald-100 text-emerald-900'
                        }`}
                        title={estaOculto ? 'Revelar conteúdo' : 'Ocultar conteúdo'}
                      >
                        {estaOculto ? <Eye className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                        <span>{estaOculto ? 'Revelar' : 'Lembrado'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Card Title & Content */}
                <div className="p-4 sm:p-5 space-y-3.5">
                  <div>
                    <h3 className="text-base font-bold text-[#002752] font-serif leading-snug">
                      {card.conceito}
                    </h3>
                  </div>

                  {/* Core Thesis Box */}
                  <div className="p-3 bg-amber-50/70 border-l-3 border-[#ebc000] rounded-r-lg text-xs leading-relaxed text-slate-800">
                    <span className="font-bold text-[#002752] block text-[10px] uppercase tracking-wider mb-0.5">
                      💡 Tese Central Atômica
                    </span>
                    {estaOculto ? (
                      <div className="py-2 text-slate-400 italic text-center select-none">
                        [Conteúdo oculto no modo de fixação ativa. Tente recordar a ideia central antes de revelar!]
                      </div>
                    ) : (
                      <p className="font-medium text-slate-900">{card.teseCentral}</p>
                    )}
                  </div>

                  {/* Deep Theoretical Mechanism */}
                  {!estaOculto && (
                    <div className="text-xs text-slate-700 leading-relaxed space-y-1">
                      <span className="font-bold text-[10px] uppercase tracking-wider text-slate-500 block">
                        Mecanismo Microeconômico & Fundamentação
                      </span>
                      <p>{card.fundamentacaoTeorica}</p>
                    </div>
                  )}

                  {/* Mathematical Formulation / Rule if exists */}
                  {card.equacaoOuRegra && !estaOculto && (
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 font-mono text-xs font-semibold text-[#002752] flex items-center gap-2">
                      <Sigma className="w-3.5 h-3.5 text-[#ebc000] shrink-0" />
                      <span className="overflow-x-auto whitespace-nowrap">{card.equacaoOuRegra}</span>
                    </div>
                  )}

                  {/* Real World Practical Applicability */}
                  {!estaOculto && (
                    <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-[#00733f] text-[11px]">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>Aplicabilidade Prática (Brasil / Maranhão):</span>
                      </div>
                      <p className="text-slate-800 text-[11px] leading-relaxed">
                        {card.aplicabilidadePratica}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Slip Card Bottom Edge: Cross-Links & Citation */}
              <div className="p-4 bg-slate-50/70 border-t border-slate-100 space-y-2.5 text-[11px]">
                {/* Cross-links to other Zettels */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-slate-500 font-semibold flex items-center gap-1 mr-0.5">
                    <Link2 className="w-3 h-3 text-[#002752]" /> Conecta-se a:
                  </span>
                  {card.conexoes.map((connId) => {
                    const linkedCard = cards.find((c) => c.id === connId);
                    return (
                      <button
                        key={connId}
                        onClick={() => pularParaCard(connId)}
                        className="px-2 py-0.5 rounded bg-white hover:bg-[#002752] hover:text-white border border-slate-200 text-slate-700 font-mono font-bold transition-all flex items-center gap-1"
                        title={linkedCard ? `${linkedCard.id}: ${linkedCard.conceito}` : connId}
                      >
                        <span>{connId}</span>
                        {linkedCard && <span className="text-[10px] font-sans font-normal opacity-80 max-w-[100px] truncate">{linkedCard.conceito}</span>}
                      </button>
                    );
                  })}
                </div>

                {/* Bibliographic Citation */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                  <span className="truncate max-w-[200px]" title={card.referenciaBibliografica}>
                    📖 {card.referenciaBibliografica}
                  </span>
                  <a
                    href={GOOGLE_DRIVE_REPO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00733f] hover:underline flex items-center gap-0.5 shrink-0 font-medium"
                  >
                    Drive <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>

                {/* Tag chips */}
                <div className="flex flex-wrap items-center gap-1 pt-1">
                  {card.tags.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTagSelecionada(tagSelecionada === t ? null : t)}
                      className="text-[10px] text-slate-600 hover:text-[#002752] hover:underline"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {cartoesFiltrados.length === 0 && (
        <div className="p-10 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h4 className="text-base font-bold text-slate-700">Nenhuma ficha encontrada</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Não encontramos fichas para os critérios pesquisados. Tente limpar a busca ou selecionar outra tag temática.
          </p>
          <button
            onClick={() => {
              setAulaFiltro('Todas');
              setTagSelecionada(null);
              setBuscaTexto('');
            }}
            className="px-4 py-2 bg-[#002752] text-white text-xs font-bold rounded-xl"
          >
            Ver Todas as Fichas
          </button>
        </div>
      )}
    </div>
  );
};
