import React, { useState } from 'react';
import { Database, ShieldCheck, FileCode, HardDrive, Copy, Check } from 'lucide-react';
import { FIRESTORE_SCHEMAS } from '../data/dbSchemaDocs';
import { SUPABASE_SQL_DDL } from '../data/dbSchemaDocs';
import { GOOGLE_DRIVE_REPO } from '../data/questionsData';

export const DatabaseSchemaView: React.FC = () => {
  const [tabAtiva, setTabAtiva] = useState<'firestore' | 'supabase' | 'rules' | 'drive'>('firestore');
  const [copiado, setCopiado] = useState<boolean>(false);

  const copiarCodigo = (texto: string) => {
    navigator.clipboard.writeText(texto);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const firestoreRulesMock = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function: autenticado
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Helper function: professor/docente
    function isDocente() {
      return isAuthenticated() && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.perfil == 'docente';
    }

    // Coleção: users
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow write: if request.auth.uid == userId || isDocente();
    }

    // Coleção: cronograma (12 aulas)
    match /cronograma/{aulaId} {
      allow read: if isAuthenticated();
      allow write: if isDocente();
    }

    // Coleção: questoes (Banco de 1.000 questões)
    match /questoes/{questaoId} {
      allow read: if isAuthenticated();
      allow write: if isDocente();
    }

    // Coleção: simulados_realizados
    match /simulados_realizados/{simuladoId} {
      allow read: if isAuthenticated() && 
        (resource.data.alunoId == request.auth.uid || isDocente());
      allow create: if isAuthenticated() && 
        request.resource.data.alunoId == request.auth.uid;
      allow update, delete: if isDocente();
    }

    // Coleção: desempenho_alunos (KPIs agregados)
    match /desempenho_alunos/{alunoId} {
      allow read: if isAuthenticated() && 
        (request.auth.uid == alunoId || isDocente());
      allow write: if isDocente();
    }
  }
}`;

  return (
    <div className="space-y-6" id="arquitetura-banco-dados">
      {/* Header Banner */}
      <div className="bg-[#002752] text-white p-6 rounded-2xl shadow-sm border-b-4 border-[#ebc000] flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ebc000] text-[#002752] uppercase tracking-wider">
              Arquitetura de Dados & Backend
            </span>
            <span className="text-xs text-slate-300">
              Modelagem NoSQL (Firestore) & Relacional (Supabase PostgreSQL)
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight">
            Esquemas de Dados & Segurança (RBAC)
          </h2>
          <p className="text-sm text-slate-200 mt-1 max-w-2xl">
            Estrutura escalável para suportar o banco de 1.000 questões categorizadas, sincronização de aulas, submissões com timer e telemetria de desempenho pedagógico.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setTabAtiva('firestore')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            tabAtiva === 'firestore'
              ? 'bg-[#002752] text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Database className="w-4 h-4 text-[#ebc000]" />
          Coleções Firestore (NoSQL)
        </button>

        <button
          onClick={() => setTabAtiva('supabase')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            tabAtiva === 'supabase'
              ? 'bg-[#002752] text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <FileCode className="w-4 h-4 text-[#00733f]" />
          Supabase DDL (PostgreSQL)
        </button>

        <button
          onClick={() => setTabAtiva('rules')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            tabAtiva === 'rules'
              ? 'bg-[#002752] text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-indigo-400" />
          Segurança (firestore.rules)
        </button>

        <button
          onClick={() => setTabAtiva('drive')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            tabAtiva === 'drive'
              ? 'bg-[#002752] text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <HardDrive className="w-4 h-4 text-amber-500" />
          Mapeamento Google Drive
        </button>
      </div>

      {/* Tab Content 1: Firestore Collections */}
      {tabAtiva === 'firestore' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FIRESTORE_SCHEMAS.map((col) => (
              <div key={col.colecao} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#002752]" />
                    <span className="font-mono font-bold text-sm text-[#002752]">
                      /{col.colecao}
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono">
                    PK: {col.chavePrimaria}
                  </span>
                </div>

                <p className="text-xs text-slate-600">{col.descricao}</p>

                {/* Fields Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-[11px] text-left">
                    <thead className="text-slate-500 border-b border-slate-100">
                      <tr>
                        <th className="py-1">Campo</th>
                        <th className="py-1">Tipo</th>
                        <th className="py-1">Obrigatório</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {col.campos.slice(0, 5).map((campo, i) => (
                        <tr key={i}>
                          <td className="py-1 font-mono font-medium text-slate-900">{campo.nome}</td>
                          <td className="py-1 font-mono text-indigo-700">{campo.tipo}</td>
                          <td className="py-1">
                            {campo.obrigatorio ? (
                              <span className="text-[#00733f] font-semibold">Sim</span>
                            ) : (
                              <span className="text-slate-400">Opcional</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {col.indicesRecomendados.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-500">
                    <strong>Índices Compostos:</strong> {col.indicesRecomendados.join(' | ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 2: Supabase SQL DDL */}
      {tabAtiva === 'supabase' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-slate-300">
              schema_public_finance_uema.sql (PostgreSQL 15+)
            </span>
            <button
              onClick={() => copiarCodigo(SUPABASE_SQL_DDL)}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs transition-colors"
            >
              {copiado ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiado ? 'Copiado!' : 'Copiar DDL'}
            </button>
          </div>
          <pre className="p-5 bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto max-h-[500px]">
            {SUPABASE_SQL_DDL}
          </pre>
        </div>
      )}

      {/* Tab Content 3: Firestore Rules */}
      {tabAtiva === 'rules' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-slate-300">
              firestore.rules (Regras de Segurança com RBAC)
            </span>
            <button
              onClick={() => copiarCodigo(firestoreRulesMock)}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs transition-colors"
            >
              {copiado ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiado ? 'Copiado!' : 'Copiar Regras'}
            </button>
          </div>
          <pre className="p-5 bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto max-h-[500px]">
            {firestoreRulesMock}
          </pre>
        </div>
      )}

      {/* Tab Content 4: Google Drive Mapping */}
      {tabAtiva === 'drive' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-[#002752]">Repositório Oficial do Curso no Google Drive</h3>
              <p className="text-slate-500 text-xs">
                Todas as 12 aulas e o banco de questões estão indexados nas seguintes obras:
              </p>
            </div>
            <a
              href={GOOGLE_DRIVE_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#002752] text-white rounded-lg font-semibold hover:bg-[#001c3d]"
            >
              Abrir Pasta Raiz ↗
            </a>
          </div>

          <div className="space-y-2 pt-2">
            {[
              {
                arquivo: 'Arvate & Biderman (2004) - Economia do Setor Público no Brasil.pdf',
                tamanho: '45.2 MB',
                aulas: 'Aulas 1, 3, 5, 6, 7, 8, 9, 10, 11, 12',
                topicos: 'Bens públicos, Teorema de Coase, Regra de Ramsey, Niskanen, Arrow e Federalismo'
              },
              {
                arquivo: 'Musgrave & Musgrave - Finanças Públicas: Teoria e Prática.pdf',
                tamanho: '32.1 MB',
                aulas: 'Aulas 1, 2, 6, 8',
                topicos: 'As 3 funções do Estado (Alocativa, Distributiva, Estabilizadora), Incidência'
              },
              {
                arquivo: 'Stiglitz, J. E. - Economics of the Public Sector.pdf',
                tamanho: '28.7 MB',
                aulas: 'Aulas 2, 4, 5',
                topicos: 'Teoremas do Bem-Estar, Assimetria de Informação e Regulação de Monopólios'
              },
              {
                arquivo: 'Downs, Anthony (1957) - Uma Teoria Econômica da Democracia.pdf',
                tamanho: '14.3 MB',
                aulas: 'Aula 9',
                topicos: 'Eleitor Mediano, ignorância racional e maximização de votos'
              },
              {
                arquivo: 'Giambiagi & Além (2018) - Finanças Públicas no Brasil Contemporâneo.pdf',
                tamanho: '21.0 MB',
                aulas: 'Aulas 6, 7, 11, 12',
                topicos: 'Sistema tributário nacional (ICMS, ISS, IPI), transferências constitucionais e LRF'
              }
            ].map((doc, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-bold text-slate-800 text-xs block">{doc.arquivo}</span>
                  <span className="text-slate-500 text-[11px] block mt-0.5">
                    <strong>Cobertura:</strong> {doc.aulas} • {doc.topicos}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] text-slate-500">{doc.tamanho}</span>
                  <a
                    href={GOOGLE_DRIVE_REPO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 bg-white border border-slate-300 rounded text-[11px] text-[#002752] font-semibold hover:bg-slate-100"
                  >
                    Visualizar ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
