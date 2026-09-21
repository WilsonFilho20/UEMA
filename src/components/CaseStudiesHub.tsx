import React, { useState } from 'react';
import { EstudoDeCaso } from '../types';
import { TODOS_ESTUDOS_DE_CASO } from '../data/casesData';
import { GOOGLE_DRIVE_REPO } from '../data/questionsData';
import { CaseSimulatorRenderer } from './CaseSimulatorRenderer';
import {
  Briefcase,
  Layers,
  Search,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Play,
  BookOpen,
  Building2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Award,
  RotateCcw,
  Scale,
  Sliders,
  Eye,
  ArrowRight,
  MessageSquare
} from 'lucide-react';

interface CaseStudiesHubProps {
  initialUnidade?: number | 'Todas';
  onNavigateToSimulator?: (simulatorId: string) => void;
  onNavigateToForum?: (aulaId?: string) => void;
}

export const CaseStudiesHub: React.FC<CaseStudiesHubProps> = ({
  initialUnidade = 'Todas',
  onNavigateToSimulator,
  onNavigateToForum
}) => {
  const [unidadeFiltro, setUnidadeFiltro] = useState<number | 'Todas'>(initialUnidade);
  const [buscaTexto, setBuscaTexto] = useState<string>('');
  const [casoSelecionadoId, setCasoSelecionadoId] = useState<string>(TODOS_ESTUDOS_DE_CASO[0].id);
  const [modoVisualizacaoCaso, setModoVisualizacaoCaso] = useState<'integrado' | 'diagnostico' | 'simulador' | 'fixacao'>('integrado');

  // Armazenamento de respostas das perguntas de fixação no componente
  // chave: "perguntaId", valor: { resposta: 'A' | 'B' | 'C' | 'D', correta: boolean }
  const [respostasUsuario, setRespostasUsuario] = useState<
    Record<string, { resposta: 'A' | 'B' | 'C' | 'D'; respondida: boolean }>
  >(() => {
    try {
      const saved = localStorage.getItem('uema_casos_respostas');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const responderPergunta = (perguntaId: string, resposta: 'A' | 'B' | 'C' | 'D') => {
    const atualizado = {
      ...respostasUsuario,
      [perguntaId]: { resposta, respondida: true }
    };
    setRespostasUsuario(atualizado);
    try {
      localStorage.setItem('uema_casos_respostas', JSON.stringify(atualizado));
    } catch (e) {
      console.error(e);
    }
  };

  const reiniciarRespostasDoCaso = (caso: EstudoDeCaso) => {
    const novo = { ...respostasUsuario };
    caso.perguntasFixacao.forEach((p) => {
      delete novo[p.id];
    });
    setRespostasUsuario(novo);
    try {
      localStorage.setItem('uema_casos_respostas', JSON.stringify(novo));
    } catch (e) {
      console.error(e);
    }
  };

  // Filtragem dos estudos de caso
  const casosFiltrados = TODOS_ESTUDOS_DE_CASO.filter((caso) => {
    const matchUnidade = unidadeFiltro === 'Todas' || caso.unidadeNumero === unidadeFiltro;
    const matchBusca =
      buscaTexto.trim() === '' ||
      caso.titulo.toLowerCase().includes(buscaTexto.toLowerCase()) ||
      caso.subtitulo.toLowerCase().includes(buscaTexto.toLowerCase()) ||
      caso.contextoEconomico.toLowerCase().includes(buscaTexto.toLowerCase()) ||
      caso.dilemaFiscal.toLowerCase().includes(buscaTexto.toLowerCase()) ||
      caso.teoriaAplicada.conceito.toLowerCase().includes(buscaTexto.toLowerCase()) ||
      caso.ambito.toLowerCase().includes(buscaTexto.toLowerCase());
    return matchUnidade && matchBusca;
  });

  const casoAtivo =
    casosFiltrados.find((c) => c.id === casoSelecionadoId) || casosFiltrados[0] || TODOS_ESTUDOS_DE_CASO[0];

  // Cálculo de progresso de fixação dos 25 casos
  const totalPerguntas = TODOS_ESTUDOS_DE_CASO.reduce((acc, c) => acc + c.perguntasFixacao.length, 0);
  const totalRespondidas = Object.keys(respostasUsuario).length;
  const totalAcertos = Object.entries(respostasUsuario).filter(([pId, v]: [string, { resposta: 'A' | 'B' | 'C' | 'D'; respondida: boolean }]) => {
    const pergunta = TODOS_ESTUDOS_DE_CASO.flatMap((c) => c.perguntasFixacao).find((p) => p.id === pId);
    return pergunta && pergunta.respostaCorreta === v.resposta;
  }).length;

  return (
    <div className="space-y-6" id="estudos-de-caso-hub">
      {/* Banner Principal com Identidade Institucional UEMA */}
      <div className="bg-[#002752] text-white p-6 rounded-2xl shadow-sm border-b-4 border-[#ebc000] flex flex-wrap items-center justify-between gap-4">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ebc000] text-[#002752] uppercase tracking-wider">
              Metodologia de Estudo Ativo de Casos
            </span>
            <span className="text-xs text-slate-300">
              UEMA • Ciências Econômicas • 25 Casos Práticos (5 por Unidade)
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight">
            Laboratório de Estudos de Caso & Fixação Conceitual
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
            Dilemas reais de finanças públicas no Brasil e no Estado do Maranhão (Porto do Itaqui, ICMS, LRF, CAEMA, seguridade e escolha pública). Cada caso apresenta diagnóstico microeconômico, dados de cenário, conexão com simuladores computacionais e desafios para fixação.
          </p>
        </div>

        {/* Indicadores de Fixação do Estudante */}
        <div className="flex items-center gap-3 bg-white/10 p-3.5 rounded-xl border border-white/20">
          <div className="text-center px-3 border-r border-white/20">
            <span className="text-[10px] text-slate-300 uppercase block font-semibold">Total de Casos</span>
            <span className="text-2xl font-black text-[#ebc000] font-mono">25</span>
          </div>
          <div className="text-center px-3 border-r border-white/20">
            <span className="text-[10px] text-slate-300 uppercase block font-semibold">Respondidas</span>
            <span className="text-2xl font-black text-white font-mono">{totalRespondidas}/{totalPerguntas}</span>
          </div>
          <div className="text-center px-3">
            <span className="text-[10px] text-slate-300 uppercase block font-semibold">Taxa de Acerto</span>
            <span className="text-2xl font-black text-emerald-400 font-mono">
              {totalRespondidas > 0 ? `${Math.round((totalAcertos / totalRespondidas) * 100)}%` : '0%'}
            </span>
          </div>
        </div>
      </div>

      {/* Barra de Filtros por Unidade e Busca */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-bold text-slate-700 mr-1 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-[#002752]" />
            Unidades Curriculares:
          </span>
          {[
            { id: 'Todas', rotulo: 'Todos os 25 Casos' },
            { id: 1, rotulo: 'U1: Papel do Estado (5)' },
            { id: 2, rotulo: 'U2: Falhas & Regulação (5)' },
            { id: 3, rotulo: 'U3: Escolha Pública (5)' },
            { id: 4, rotulo: 'U4: Tributação (5)' },
            { id: 5, rotulo: 'U5: Federalismo (5)' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setUnidadeFiltro(item.id as any);
                const primeiroDaUnidade = TODOS_ESTUDOS_DE_CASO.find(
                  (c) => item.id === 'Todas' || c.unidadeNumero === item.id
                );
                if (primeiroDaUnidade) setCasoSelecionadoId(primeiroDaUnidade.id);
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                unidadeFiltro === item.id
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
            placeholder="Buscar por termo, autor, tema..."
            value={buscaTexto}
            onChange={(e) => setBuscaTexto(e.target.value)}
            className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#002752] w-64"
          />
        </div>
      </div>

      {/* Grade Principal: Lista Lateral de Navegação + Detalhe do Caso Ativo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Painel Esquerdo: Menu de Navegação dos Casos Filtrados */}
        <div className="lg:col-span-4 space-y-2.5 max-h-[820px] overflow-y-auto pr-1">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Selecione o Caso ({casosFiltrados.length} disponíveis)
            </span>
          </div>

          {casosFiltrados.map((caso) => {
            const isAtivo = caso.id === casoAtivo.id;
            const perguntasCaso = caso.perguntasFixacao;
            const respondidasCaso = perguntasCaso.filter((p) => respostasUsuario[p.id]?.respondida).length;
            const concluiuCaso = respondidasCaso === perguntasCaso.length && respondidasCaso > 0;

            return (
              <div
                key={caso.id}
                onClick={() => setCasoSelecionadoId(caso.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                  isAtivo
                    ? 'bg-[#002752] text-white border-[#002752] shadow-sm ring-2 ring-[#002752]/20'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        isAtivo
                          ? 'bg-[#ebc000] text-[#002752]'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      U{caso.unidadeNumero} • Caso #{caso.numeroNaUnidade}
                    </span>
                    <span
                      className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${
                        isAtivo
                          ? 'bg-white/20 text-slate-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {caso.ambito}
                    </span>
                  </div>

                  {concluiuCaso && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded">
                      <CheckCircle2 className="w-3 h-3" />
                      Fixado
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-xs line-clamp-2 leading-tight">
                  {caso.titulo}
                </h4>

                <p
                  className={`text-[10px] mt-1 line-clamp-1 ${
                    isAtivo ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  {caso.teoriaAplicada.conceito}
                </p>
              </div>
            );
          })}
        </div>

        {/* Painel Direito: Conteúdo Completo, Diagnóstico e Questões de Fixação */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            {/* Cabeçalho do Estudo de Caso Ativo */}
            <div className="p-6 bg-slate-50 border-b border-slate-200">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#002752] text-[#ebc000]">
                    Unidade Curricular {casoAtivo.unidadeNumero}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                    Âmbito: {casoAtivo.ambito}
                  </span>
                </div>

                <span className="text-xs text-slate-500 font-mono font-bold">
                  {casoAtivo.id}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#002752] leading-tight">
                {casoAtivo.titulo}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                {casoAtivo.subtitulo}
              </p>
            </div>

            {/* Sub-Abas do Caso Selecionado */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 bg-slate-100/90 border-b border-slate-200">
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => setModoVisualizacaoCaso('integrado')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    modoVisualizacaoCaso === 'integrado'
                      ? 'bg-[#002752] text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" /> Visão Integrada (Tudo)
                </button>

                <button
                  type="button"
                  onClick={() => setModoVisualizacaoCaso('diagnostico')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    modoVisualizacaoCaso === 'diagnostico'
                      ? 'bg-[#002752] text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 text-[#00733f]" /> 1. Contexto & Diagnóstico
                </button>

                <button
                  type="button"
                  onClick={() => setModoVisualizacaoCaso('simulador')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    modoVisualizacaoCaso === 'simulador'
                      ? 'bg-[#00733f] text-white shadow-xs'
                      : 'bg-white text-[#00733f] hover:bg-emerald-50 border border-emerald-300'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5 text-[#ebc000]" /> 2. Simulador Interativo do Caso
                </button>

                <button
                  type="button"
                  onClick={() => setModoVisualizacaoCaso('fixacao')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    modoVisualizacaoCaso === 'fixacao'
                      ? 'bg-[#002752] text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Award className="w-3.5 h-3.5 text-[#ebc000]" /> 3. Desafio ({casoAtivo.perguntasFixacao.length})
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                {onNavigateToForum && (
                  <button
                    type="button"
                    onClick={() => onNavigateToForum(`caso-u${casoAtivo.unidadeNumero}`)}
                    className="px-3 py-1 bg-amber-50 hover:bg-amber-100 text-[#002752] border border-amber-300 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#002752]" />
                    Debater no Fórum
                  </button>
                )}
                <span>Simulador:</span>
                <span className="font-mono font-bold text-[#002752] bg-white px-2 py-0.5 rounded border border-slate-300">
                  {casoAtivo.simuladorRecomendadoId}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* SEÇÃO 1: Diagnóstico e Contexto Real */}
              {(modoVisualizacaoCaso === 'integrado' || modoVisualizacaoCaso === 'diagnostico') && (
                <div className="space-y-6">
                  {/* Contexto Prático Real */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#002752] flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#00733f]" />
                      Contexto Econômico & Situação Prática
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                      {casoAtivo.contextoEconomico}
                    </p>
                  </div>

                  {/* Dilema Fiscal a ser Resolvido */}
                  <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                      <Scale className="w-4 h-4 text-amber-700" />
                      Dilema Fiscal Central (Conflito de Política Pública):
                    </span>
                    <p className="text-xs sm:text-sm text-amber-950 font-serif font-medium leading-relaxed">
                      {casoAtivo.dilemaFiscal}
                    </p>
                  </div>

                  {/* Fundamentação Teórica Aplicada */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#002752] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#ebc000]" />
                      Fundamentação Micro/Macroeconômica Aplicada
                    </h4>
                    <div className="p-4 bg-[#002752]/5 border border-[#002752]/15 rounded-xl space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className="font-bold text-[#002752]">
                          Conceito: {casoAtivo.teoriaAplicada.conceito}
                        </span>
                        <span className="text-[11px] text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                          Autores de Referência: {casoAtivo.teoriaAplicada.autoresChave}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {casoAtivo.teoriaAplicada.mecanismo}
                      </p>
                    </div>
                  </div>

                  {/* Dados e Indicadores de Cenário */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[#002752]" />
                      Indicadores Econômico-Fiscais do Cenário
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {casoAtivo.dadosCenarios.map((dado, i) => (
                        <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                          <span className="text-[10px] font-bold text-slate-500 uppercase block">
                            {dado.indicador}
                          </span>
                          <div className="text-sm font-extrabold text-[#002752] font-mono">
                            {dado.valor}
                          </div>
                          <p className="text-[10px] text-slate-600 leading-tight">
                            {dado.interpretacao}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Leitura no Drive e Chamada para o Simulador */}
                  <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-100 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-2 text-xs text-slate-700">
                      <BookOpen className="w-4 h-4 text-[#00733f]" />
                      <span>
                        Texto Obrigatório: <strong>{casoAtivo.leituraRecomendadaDrive.obra}</strong> ({casoAtivo.leituraRecomendadaDrive.autor}) • {casoAtivo.leituraRecomendadaDrive.capitulo}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <a
                        href={GOOGLE_DRIVE_REPO}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-[#002752] rounded-lg text-xs font-bold border border-slate-300 transition-colors shadow-2xs"
                      >
                        Abrir no Drive <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <button
                        type="button"
                        onClick={() => setModoVisualizacaoCaso('simulador')}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#00733f] hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
                      >
                        <Sliders className="w-3.5 h-3.5 text-[#ebc000]" />
                        Simular Múltiplas Respostas no Simulador →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* SEÇÃO 2: Simulador Interativo do Caso */}
              {(modoVisualizacaoCaso === 'integrado' || modoVisualizacaoCaso === 'simulador') && (
                <div className="pt-4 border-t border-slate-200 space-y-6">
                  <CaseSimulatorRenderer
                    caso={casoAtivo}
                    onNavigateToSimulatorHub={onNavigateToSimulator}
                  />

                  {/* Atalho para ir ao Desafio de Fixação */}
                  {modoVisualizacaoCaso === 'simulador' && (
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-4">
                      <div className="text-xs text-slate-700">
                        <strong>Simulação concluída?</strong> Teste sua compreensão e valide as respostas encontradas no desafio do caso.
                      </div>
                      <button
                        type="button"
                        onClick={() => setModoVisualizacaoCaso('fixacao')}
                        className="px-4 py-2 bg-[#002752] hover:bg-[#003875] text-[#ebc000] font-bold rounded-lg text-xs flex items-center gap-2 cursor-pointer shadow-xs shrink-0"
                      >
                        <Award className="w-4 h-4 text-[#ebc000]" />
                        Responder Desafio ({casoAtivo.perguntasFixacao.length} questões) →
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* SEÇÃO 3: Desafios de Fixação & Perguntas com Feedback */}
              {(modoVisualizacaoCaso === 'integrado' || modoVisualizacaoCaso === 'fixacao') && (
                <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-[#002752] flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#ebc000]" />
                      Desafio de Fixação Conceitual do Caso ({casoAtivo.perguntasFixacao.length} questões)
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Responda para testar sua capacidade de diagnóstico e fixar a teoria.
                    </p>
                  </div>

                  <button
                    onClick={() => reiniciarRespostasDoCaso(casoAtivo)}
                    className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Refazer Desafio
                  </button>
                </div>

                <div className="space-y-4">
                  {casoAtivo.perguntasFixacao.map((pergunta, idx) => {
                    const respostaAtual = respostasUsuario[pergunta.id];
                    const respondida = respostaAtual?.respondida;

                    return (
                      <div
                        key={pergunta.id}
                        className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3.5"
                      >
                        <div className="flex items-start gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-[#002752] text-[#ebc000] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <div className="flex-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                              Conceito-Chave: {pergunta.conceitoChave}
                            </span>
                            <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                              {pergunta.pergunta}
                            </p>
                          </div>
                        </div>

                        {/* Alternativas */}
                        <div className="space-y-2 pt-1 pl-8">
                          {pergunta.opcoes.map((opcao) => {
                            const isSelected = respostaAtual?.resposta === opcao.id;
                            const isCorrect = opcao.id === pergunta.respostaCorreta;

                            let btnStyle = 'border-slate-200 bg-white hover:bg-slate-100 text-slate-800';

                            if (respondida) {
                              if (isCorrect) {
                                btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium ring-1 ring-emerald-500';
                              } else if (isSelected && !isCorrect) {
                                btnStyle = 'border-rose-400 bg-rose-50 text-rose-950 font-medium';
                              } else {
                                btnStyle = 'border-slate-200 bg-white/60 text-slate-400 opacity-70';
                              }
                            }

                            return (
                              <div key={opcao.id} className="space-y-1">
                                <button
                                  disabled={respondida}
                                  onClick={() => responderPergunta(pergunta.id, opcao.id)}
                                  className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 cursor-pointer ${btnStyle}`}
                                >
                                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                                    {opcao.id}
                                  </span>
                                  <span className="flex-1 leading-relaxed">
                                    {opcao.texto}
                                  </span>

                                  {respondida && isCorrect && (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                                  )}
                                  {respondida && isSelected && !isCorrect && (
                                    <XCircle className="w-4 h-4 text-rose-600 shrink-0 ml-2" />
                                  )}
                                </button>

                                {/* Justificativa detalhada ao responder */}
                                {respondida && (isSelected || isCorrect) && (
                                  <div
                                    className={`p-2.5 rounded-lg text-[11px] leading-relaxed ml-7 ${
                                      isCorrect
                                        ? 'bg-emerald-100/70 text-emerald-900 border border-emerald-200'
                                        : 'bg-rose-100/70 text-rose-900 border border-rose-200'
                                    }`}
                                  >
                                    <strong>{isCorrect ? 'Explicação Correta:' : 'Diagnóstico:'}</strong>{' '}
                                    {opcao.explicacao}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
