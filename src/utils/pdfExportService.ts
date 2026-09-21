import { jsPDF } from 'jspdf';
import { Questao } from '../types';

export interface OpcoesExportacaoPDF {
  titulo: string;
  questoes: Questao[];
  unidadesSelecionadas?: number[];
  dificuldadeEscolhida?: string;
  incluirGabarito?: boolean;
  incluirJustificativas?: boolean;
  professorNome?: string;
}

// Mapeamento dos Nomes Oficiais das Unidades do PPC UEMA
const NOMES_UNIDADES: Record<number, string> = {
  1: 'O Papel do Estado na Economia e Funções Fiscais de Musgrave',
  2: 'Falhas de Mercado: Bens Públicos, Externalidades e Recursos Comuns',
  3: 'Teoria da Escolha Pública (Public Choice) e Burocracia Governamental',
  4: 'Teoria da Tributação: Princípios, Incidência e Eficiência Tributária',
  5: 'Federalismo Fiscal, Gastos Públicos e Orçamento no Brasil'
};

export function exportarProvaParaPDF({
  titulo,
  questoes,
  unidadesSelecionadas = [],
  dificuldadeEscolhida = 'Mista',
  incluirGabarito = true,
  incluirJustificativas = true,
  professorNome = 'Prof. Dr. Ricardo Arvate'
}: OpcoesExportacaoPDF) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 14;
  const contentWidth = pageWidth - marginX * 2;
  let cursorY = 12;

  // Auxiliar para rodapé institucional numerado
  const desenharRodape = (numPagina: number) => {
    doc.setDrawColor(215, 222, 230);
    doc.setLineWidth(0.3);
    doc.line(marginX, pageHeight - 11, marginX + contentWidth, pageHeight - 11);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(115, 125, 140);
    doc.text(
      'UNIVERSIDADE ESTADUAL DO MARANHÃO • CENTRO DE CIÊNCIAS SOCIAIS APLICADAS • CURSO DE CIÊNCIAS ECONÔMICAS',
      marginX,
      pageHeight - 6.5
    );
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 39, 82);
    doc.text(`Página ${numPagina}`, pageWidth - marginX - 14, pageHeight - 6.5);
  };

  // Auxiliar para quebra de página
  const checarQuebraPagina = (espacoNecessario: number) => {
    if (cursorY + espacoNecessario > pageHeight - 15) {
      doc.addPage();
      cursorY = 14;
      return true;
    }
    return false;
  };

  // ==========================================
  // 1. CABEÇALHO INSTITUCIONAL UEMA
  // ==========================================
  const cabecalhoAltura = 28;
  // Barra azul escura principal (#002752)
  doc.setFillColor(0, 39, 82);
  doc.rect(marginX, cursorY, contentWidth, cabecalhoAltura, 'F');

  // Friso dourado UEMA (#ebc000)
  doc.setFillColor(235, 192, 0);
  doc.rect(marginX, cursorY + cabecalhoAltura, contentWidth, 2, 'F');

  // Desenho Vetorial do Brasão / Selo Acadêmico UEMA Economia (círculo com engrenagem e globo estilizados)
  const sealX = marginX + 13;
  const sealY = cursorY + 14;
  const sealR = 10;

  // Círculo dourado de borda
  doc.setDrawColor(235, 192, 0);
  doc.setLineWidth(0.8);
  doc.setFillColor(0, 28, 59);
  doc.circle(sealX, sealY, sealR, 'FD');

  // Detalhes internos do brasão vetorial
  doc.setDrawColor(235, 192, 0);
  doc.setLineWidth(0.4);
  doc.circle(sealX, sealY, sealR - 2.5, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text('UEMA', sealX - 6.2, sealY + 1.2);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5);
  doc.setTextColor(235, 192, 0);
  doc.text('ECONOMIA', sealX - 6.5, sealY + 5.2);

  // Textos Institucionais do Cabeçalho
  const textLeft = marginX + 28;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text('UNIVERSIDADE ESTADUAL DO MARANHÃO — UEMA', textLeft, cursorY + 7);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(235, 192, 0);
  doc.text('CENTRO DE CIÊNCIAS SOCIAIS APLICADAS • DEPARTAMENTO DE ECONOMIA', textLeft, cursorY + 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(220, 230, 245);
  doc.text('CURSO DE CIÊNCIAS ECONÔMICAS • DISCIPLINA: TEORIA DAS FINANÇAS PÚBLICAS', textLeft, cursorY + 18.5);
  doc.text('CÓDIGO: ECO-310 • CARGA HORÁRIA: 60H • SEMESTRE LETIVO REGULAR', textLeft, cursorY + 23.5);

  cursorY += cabecalhoAltura + 5;

  // ==========================================
  // 2. BLOCO DE IDENTIFICAÇÃO FORMAL DO DISCENTE
  // ==========================================
  const blocoIdentAltura = 22;
  doc.setDrawColor(190, 205, 220);
  doc.setLineWidth(0.4);
  doc.setFillColor(252, 253, 255);
  doc.roundedRect(marginX, cursorY, contentWidth, blocoIdentAltura, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(0, 39, 82);
  doc.text(`AVALIAÇÃO ACADÊMICA: ${titulo.toUpperCase()}`, marginX + 4, cursorY + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(60, 70, 85);
  doc.text(`Docente Responsável: ${professorNome}`, marginX + 4, cursorY + 10.5);
  doc.text('Semestre: 2026.2   |   Turma: Presencial Noturno/Vespertino', marginX + 90, cursorY + 10.5);

  doc.setDrawColor(170, 185, 200);
  doc.setLineWidth(0.3);
  doc.text('Nome do(a) Acadêmico(a):', marginX + 4, cursorY + 16.5);
  doc.line(marginX + 43, cursorY + 17, marginX + 115, cursorY + 17);

  doc.text('Matrícula:', marginX + 118, cursorY + 16.5);
  doc.line(marginX + 133, cursorY + 17, marginX + 155, cursorY + 17);

  doc.text('Nota:', marginX + 158, cursorY + 16.5);
  doc.line(marginX + 167, cursorY + 17, marginX + contentWidth - 3, cursorY + 17);

  cursorY += blocoIdentAltura + 4;

  // ==========================================
  // 3. TABELA DE METADADOS DA AVALIAÇÃO (DIFICULDADE & TEMAS)
  // ==========================================
  // Apuração de estatísticas reais das questões selecionadas
  const contagemDificuldade: Record<string, number> = {
    Baixa: 0,
    'Média-Baixa': 0,
    Média: 0,
    'Média-Alta': 0,
    Alta: 0
  };
  const unidadesPresentesSet = new Set<number>();

  questoes.forEach((q) => {
    if (contagemDificuldade[q.dificuldade] !== undefined) {
      contagemDificuldade[q.dificuldade]++;
    } else {
      contagemDificuldade[q.dificuldade] = 1;
    }
    unidadesPresentesSet.add(q.unidade);
  });

  const unidadesLista =
    unidadesSelecionadas.length > 0
      ? unidadesSelecionadas
      : Array.from(unidadesPresentesSet).sort((a, b) => a - b);

  // Faixa de cabeçalho da tabela de metadados
  doc.setFillColor(235, 241, 248);
  doc.setDrawColor(180, 198, 218);
  doc.setLineWidth(0.4);
  doc.rect(marginX, cursorY, contentWidth, 7, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(0, 39, 82);
  doc.text('ESTRUTURA PEDAGÓGICA DA PROVA — METADADOS, TEMAS E CALIBRAÇÃO DE DIFICULDADE', marginX + 3, cursorY + 4.8);

  cursorY += 7;

  // Duas colunas na tabela de metadados:
  // Coluna 1 (45mm): Distribuição por Nível de Dificuldade
  // Coluna 2 (resto): Temas / Unidades Selecionadas e Especificação
  const col1Width = 58;
  const col2Width = contentWidth - col1Width;
  const metaBodyY = cursorY;

  // Calcular altura necessária para listar as unidades e tópicos
  const linhasTemas: { unidadeNum: number; tituloUnidade: string; qtd: number }[] = [];
  unidadesLista.forEach((u) => {
    const qtdQuestoes = questoes.filter((q) => q.unidade === u).length;
    linhasTemas.push({
      unidadeNum: u,
      tituloUnidade: NOMES_UNIDADES[u] || `Unidade ${u}: Conteúdo Programático do PPC`,
      qtd: qtdQuestoes
    });
  });

  const metaHeight = Math.max(26, 8 + linhasTemas.length * 4.8);

  // Caixa da Coluna 1 (Dificuldade)
  doc.setFillColor(255, 255, 255);
  doc.rect(marginX, metaBodyY, col1Width, metaHeight, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(0, 39, 82);
  doc.text('Distribuição por Complexidade:', marginX + 3, metaBodyY + 4.5);

  let difY = metaBodyY + 8.5;
  const labelsDif = [
    { label: 'Fácil (Baixa)', key: 'Baixa', corBadge: [0, 115, 63] },
    { label: 'Média-Baixa', key: 'Média-Baixa', corBadge: [30, 90, 160] },
    { label: 'Média / Padrão', key: 'Média', corBadge: [180, 100, 0] },
    { label: 'Média-Alta / Avançada', key: 'Média-Alta', corBadge: [190, 40, 40] },
    { label: 'Alta (PosGrad/ANPEC)', key: 'Alta', corBadge: [130, 20, 100] }
  ];

  labelsDif.forEach((d) => {
    const qtd = contagemDificuldade[d.key] || 0;
    const pct = questoes.length > 0 ? Math.round((qtd / questoes.length) * 100) : 0;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(60, 70, 80);
    doc.text(`• ${d.label}:`, marginX + 3, difY);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 39, 82);
    doc.text(`${qtd} q. (${pct}%)`, marginX + 41, difY);
    difY += 3.4;
  });

  // Caixa da Coluna 2 (Temas e Eixos Avaliados)
  doc.setFillColor(255, 255, 255);
  doc.rect(marginX + col1Width, metaBodyY, col2Width, metaHeight, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(0, 39, 82);
  doc.text(
    `Eixos Temáticos Avaliados (Total: ${questoes.length} Questões | Calibração: ${dificuldadeEscolhida}):`,
    marginX + col1Width + 3,
    metaBodyY + 4.5
  );

  let temaY = metaBodyY + 9;
  linhasTemas.forEach((item) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(0, 115, 63);
    doc.text(`[Unidade ${item.unidadeNum}]`, marginX + col1Width + 3, temaY);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 50, 60);
    const textoTema = `${item.tituloUnidade} — ${item.qtd} questão(ões)`;
    const linhasQuebradas = doc.splitTextToSize(textoTema, col2Width - 28);
    doc.text(linhasQuebradas, marginX + col1Width + 21, temaY);

    temaY += Math.max(linhasQuebradas.length * 3.3, 4.4);
  });

  cursorY += metaHeight + 3.5;

  // Faixa de Orientações para a Prova
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(210, 220, 230);
  doc.setLineWidth(0.3);
  doc.rect(marginX, cursorY, contentWidth, 7, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(0, 39, 82);
  doc.text('INSTRUÇÕES:', marginX + 2.5, cursorY + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(70, 80, 95);
  doc.text(
    '1. Cada questão possui 5 alternativas (A a E) e apenas uma correta.  2. Duração máxima sugerida: 2h30min.  3. É vedado uso de material alheio.',
    marginX + 22,
    cursorY + 4.5
  );

  cursorY += 10;

  // ==========================================
  // 4. QUESTÕES FORMATADAS E ESTILIZADAS
  // ==========================================
  questoes.forEach((q, index) => {
    // Estimativa de espaço para garantir que a questão comece com cabeçalho limpo
    checarQuebraPagina(38);

    // Barra de Título da Questão estilizada com fundo azul claro e borda esquerda destacada
    const barraQuestaoH = 6.5;
    doc.setFillColor(242, 246, 251);
    doc.rect(marginX, cursorY, contentWidth, barraQuestaoH, 'F');

    // Tarja lateral azul escura (#002752)
    doc.setFillColor(0, 39, 82);
    doc.rect(marginX, cursorY, 2.5, barraQuestaoH, 'F');

    // Número da questão em destaque
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(0, 39, 82);
    doc.text(`QUESTÃO ${index + 1 < 10 ? '0' + (index + 1) : index + 1}`, marginX + 4.5, cursorY + 4.5);

    // Pill de Identificador do Banco
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(100, 115, 130);
    doc.text(`(${q.id})`, marginX + 28, cursorY + 4.5);

    // Badge com Unidade, Aula e Tópico
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(70, 80, 95);
    doc.text(`Unidade ${q.unidade} • Aula ${q.aula_relacionada} • Tópico: ${q.topico}`, marginX + 42, cursorY + 4.5);

    // Badge de Dificuldade alinhada à direita
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    if (q.dificuldade === 'Alta') {
      doc.setTextColor(160, 20, 20);
    } else if (q.dificuldade === 'Média-Alta') {
      doc.setTextColor(190, 80, 0);
    } else if (q.dificuldade === 'Média') {
      doc.setTextColor(0, 70, 150);
    } else {
      doc.setTextColor(0, 115, 63);
    }
    const difLabel = `Grau: ${q.dificuldade}`;
    doc.text(difLabel, marginX + contentWidth - 26, cursorY + 4.5);

    cursorY += barraQuestaoH + 3.2;

    // Enunciado da questão estilizado
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(20, 25, 35);
    const linhasEnunciado = doc.splitTextToSize(q.enunciado, contentWidth - 4);

    checarQuebraPagina(linhasEnunciado.length * 3.9 + 2);
    doc.text(linhasEnunciado, marginX + 2, cursorY);
    cursorY += linhasEnunciado.length * 3.9 + 3;

    // Alternativas (A, B, C, D, E) com formatação em blocos legíveis
    const letras = ['A', 'B', 'C', 'D', 'E'] as const;
    letras.forEach((letra) => {
      const textoAlt = q.alternativas[letra];
      if (!textoAlt) return;

      const altCompleta = textoAlt;
      const linhasAlt = doc.splitTextToSize(altCompleta, contentWidth - 14);

      checarQuebraPagina(linhasAlt.length * 3.6 + 2);

      // Círculo / Caixa da letra da alternativa
      doc.setFillColor(245, 247, 250);
      doc.setDrawColor(200, 210, 225);
      doc.setLineWidth(0.3);
      doc.roundedRect(marginX + 2, cursorY - 3.2, 5.8, 5.2, 1, 1, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(0, 39, 82);
      doc.text(letra, marginX + 3.8, cursorY + 0.4);

      // Texto da Alternativa
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(45, 55, 65);
      doc.text(linhasAlt, marginX + 9.5, cursorY + 0.3);

      cursorY += linhasAlt.length * 3.6 + 2.2;
    });

    // Linha sutil separadora entre questões
    cursorY += 1.5;
    doc.setDrawColor(230, 235, 242);
    doc.setLineWidth(0.3);
    doc.line(marginX + 2, cursorY, marginX + contentWidth - 2, cursorY);
    cursorY += 4.5;
  });

  // ==========================================
  // 5. PÁGINA ANEXA: GABARITO OFICIAL E FUNDAMENTAÇÃO TEÓRICA
  // ==========================================
  if (incluirGabarito) {
    doc.addPage();
    cursorY = 14;

    // Cabeçalho da folha de gabarito
    const gabHeaderH = 16;
    doc.setFillColor(0, 39, 82);
    doc.rect(marginX, cursorY, contentWidth, gabHeaderH, 'F');

    doc.setFillColor(235, 192, 0);
    doc.rect(marginX, cursorY + gabHeaderH, contentWidth, 1.8, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(255, 255, 255);
    doc.text('GABARITO OFICIAL & JUSTIFICATIVAS TEÓRICAS (USO DOCENTE)', marginX + 5, cursorY + 6.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(220, 230, 245);
    doc.text(
      'Documento avaliativo institucional • Departamento de Ciências Econômicas • UEMA 2026.2',
      marginX + 5,
      cursorY + 11.5
    );

    cursorY += gabHeaderH + 6;

    // Tabela rápida de gabarito (Grid com badges visuais)
    doc.setFillColor(242, 246, 251);
    doc.setDrawColor(190, 205, 220);
    doc.setLineWidth(0.4);
    doc.rect(marginX, cursorY, contentWidth, 6.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(0, 39, 82);
    doc.text('MAPA CONSOLIDADO DE RESPOSTAS CORRETAS:', marginX + 3, cursorY + 4.5);

    cursorY += 7.5;

    // Grid de respostas
    const colCardW = 29.5;
    let currX = marginX;
    questoes.forEach((q, i) => {
      if (currX + colCardW > marginX + contentWidth) {
        currX = marginX;
        cursorY += 8.5;
      }
      doc.setDrawColor(195, 210, 225);
      doc.setFillColor(252, 254, 255);
      doc.roundedRect(currX, cursorY, colCardW - 2, 7.5, 1, 1, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(0, 39, 82);
      doc.text(`Questão ${i + 1 < 10 ? '0' + (i + 1) : i + 1}:`, currX + 2, cursorY + 4.8);

      // Caixa verde com a letra certa
      doc.setFillColor(0, 115, 63);
      doc.roundedRect(currX + 19, cursorY + 1.2, 6, 5.2, 1, 1, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);
      doc.text(q.resposta_correta, currX + 20.8, cursorY + 5);

      currX += colCardW;
    });

    cursorY += 13;

    // Justificativas detalhadas com fundamentação bibliográfica
    if (incluirJustificativas) {
      doc.setFillColor(242, 246, 251);
      doc.setDrawColor(190, 205, 220);
      doc.setLineWidth(0.4);
      doc.rect(marginX, cursorY, contentWidth, 6.5, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(0, 39, 82);
      doc.text('FUNDAMENTAÇÃO TEÓRICA, LEGISLAÇÃO E REFERÊNCIAS BIBLIOGRÁFICAS:', marginX + 3, cursorY + 4.5);

      cursorY += 8;

      questoes.forEach((q, idx) => {
        checarQuebraPagina(24);

        // Bloco da questão
        doc.setFillColor(247, 249, 252);
        doc.setDrawColor(215, 225, 235);
        doc.setLineWidth(0.3);
        doc.roundedRect(marginX, cursorY, contentWidth, 6, 1, 1, 'FD');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(0, 39, 82);
        doc.text(
          `Questão ${idx + 1 < 10 ? '0' + (idx + 1) : idx + 1} (${q.id}) — Alternativa Correta: [ ${q.resposta_correta} ]`,
          marginX + 3,
          cursorY + 4.2
        );

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(90, 100, 115);
        doc.text(`Tópico: ${q.topico} • Unidade ${q.unidade}`, marginX + 90, cursorY + 4.2);

        cursorY += 8;

        // Texto da Justificativa
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(40, 50, 60);
        const linhasJust = doc.splitTextToSize(`Justificativa Econômica: ${q.justificativa}`, contentWidth - 4);
        checarQuebraPagina(linhasJust.length * 3.4);
        doc.text(linhasJust, marginX + 2, cursorY);
        cursorY += linhasJust.length * 3.4 + 2.5;

        // Referência bibliográfica recomendada
        if (q.referencia_bibliografica) {
          doc.setFont('helvetica', 'italic');
          doc.setFontSize(7);
          doc.setTextColor(100, 110, 125);
          const linhasRef = doc.splitTextToSize(
            `Referência Bibliográfica / Doutrina: ${q.referencia_bibliografica}`,
            contentWidth - 4
          );
          checarQuebraPagina(linhasRef.length * 3.2);
          doc.text(linhasRef, marginX + 2, cursorY);
          cursorY += linhasRef.length * 3.2 + 3.5;
        } else {
          cursorY += 2;
        }
      });
    }
  }

  // Desenhar rodapé numerado em todas as páginas geradas
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    desenharRodape(i);
  }

  // Salvar o arquivo PDF
  const nomeArquivoSanitizado = titulo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '_')
    .slice(0, 35);
  doc.save(`uema_prova_${nomeArquivoSanitizado}_${Date.now()}.pdf`);
}

export interface DadosRelatorioTurmaPDF {
  titulo: string;
  turmaNome: string;
  professorNome: string;
  totalAlunos: number;
  totalSimulados: number;
  mediaGeral: number;
  taxaAcertoGeral: number;
  desempenhoPorUnidade: {
    numero: number;
    titulo: string;
    taxaAcerto: number;
    mediaNota: number;
    topicoCritico: string;
  }[];
  alunos: {
    nome: string;
    matricula: string;
    totalSimulados: number;
    media: number;
    taxaAcerto: number;
    statusRisco: string;
    nivelDominio: string;
  }[];
  questoesCriticas?: {
    id: string;
    topico: string;
    taxaErro: number;
    motivo: string;
  }[];
  planoIntervencao?: string[];
}

export function exportarDashboardPedagogicoTurmaPDF(dados: DadosRelatorioTurmaPDF) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 14;
  const contentWidth = pageWidth - marginX * 2;
  let cursorY = 12;

  const desenharRodape = (numPagina: number) => {
    doc.setDrawColor(215, 222, 230);
    doc.setLineWidth(0.3);
    doc.line(marginX, pageHeight - 11, marginX + contentWidth, pageHeight - 11);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(115, 125, 140);
    doc.text(
      'UNIVERSIDADE ESTADUAL DO MARANHÃO • CENTRO DE CIÊNCIAS SOCIAIS APLICADAS • DEPARTAMENTO DE ECONOMIA',
      marginX,
      pageHeight - 6.5
    );
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 39, 82);
    doc.text(`Página ${numPagina}`, pageWidth - marginX - 14, pageHeight - 6.5);
  };

  const checarQuebraPagina = (espacoNecessario: number) => {
    if (cursorY + espacoNecessario > pageHeight - 15) {
      doc.addPage();
      cursorY = 14;
      return true;
    }
    return false;
  };

  // 1. Cabeçalho Institucional
  doc.setFillColor(0, 39, 82);
  doc.rect(marginX, cursorY, contentWidth, 1.2, 'F');
  cursorY += 4;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(0, 39, 82);
  doc.text('UNIVERSIDADE ESTADUAL DO MARANHÃO — UEMA', marginX, cursorY);
  cursorY += 4.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(50, 60, 75);
  doc.text('Centro de Ciências Sociais Aplicadas (CCSA) • Curso de Ciências Econômicas', marginX, cursorY);
  cursorY += 4;
  doc.text('Disciplina: Finanças Públicas (60h / 4 Créditos) • Relatório Pedagógico Consolidado da Turma', marginX, cursorY);
  cursorY += 5;

  doc.setDrawColor(220, 226, 235);
  doc.setLineWidth(0.4);
  doc.line(marginX, cursorY, marginX + contentWidth, cursorY);
  cursorY += 5;

  // 2. Título do Relatório & Metadados
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(0, 39, 82);
  doc.text(dados.titulo, marginX, cursorY);
  cursorY += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(90, 100, 115);
  const dataHoje = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  doc.text(`Turma: ${dados.turmaNome}  •  Docente: ${dados.professorNome}  •  Emissão: ${dataHoje}`, marginX, cursorY);
  cursorY += 6;

  // 3. Cartões de Métricas Gerais da Turma
  const cardWidth = (contentWidth - 9) / 4;
  const cardHeight = 16;
  const cards = [
    { label: 'MÉDIA DA TURMA', valor: `${dados.mediaGeral.toFixed(1)} / 10`, cor: dados.mediaGeral >= 7 ? [0, 115, 63] : [195, 140, 0] },
    { label: 'TAXA DE ACERTO', valor: `${dados.taxaAcertoGeral.toFixed(1)}%`, cor: [0, 39, 82] },
    { label: 'SIMULADOS TOTAIS', valor: `${dados.totalSimulados}`, cor: [0, 39, 82] },
    { label: 'ALUNOS AVALIADOS', valor: `${dados.totalAlunos}`, cor: [0, 39, 82] }
  ];

  cards.forEach((card, idx) => {
    const cardX = marginX + idx * (cardWidth + 3);
    doc.setFillColor(247, 249, 252);
    doc.setDrawColor(215, 225, 235);
    doc.setLineWidth(0.3);
    doc.roundedRect(cardX, cursorY, cardWidth, cardHeight, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(115, 125, 140);
    doc.text(card.label, cardX + 3, cursorY + 5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(card.cor[0], card.cor[1], card.cor[2]);
    doc.text(card.valor, cardX + 3, cursorY + 12);
  });

  cursorY += cardHeight + 7;

  // 4. Diagnóstico por Unidade Curricular
  checarQuebraPagina(40);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(0, 39, 82);
  doc.text('1. Diagnóstico de Competências por Unidade Curricular (Ementa 60h)', marginX, cursorY);
  cursorY += 4.5;

  // Tabela de unidades
  const tableHeaderY = cursorY;
  doc.setFillColor(0, 39, 82);
  doc.rect(marginX, tableHeaderY, contentWidth, 6, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text('UNIDADE CURRICULAR', marginX + 3, tableHeaderY + 4.2);
  doc.text('TAXA ACERTO', marginX + 90, tableHeaderY + 4.2);
  doc.text('MÉDIA', marginX + 115, tableHeaderY + 4.2);
  doc.text('TÓPICO CRÍTICO REQUERENDO ATENÇÃO', marginX + 132, tableHeaderY + 4.2);

  cursorY += 6;

  dados.desempenhoPorUnidade.forEach((u, i) => {
    checarQuebraPagina(8);
    const rowY = cursorY;
    doc.setFillColor(i % 2 === 0 ? 255 : 248, i % 2 === 0 ? 255 : 250, i % 2 === 0 ? 255 : 252);
    doc.rect(marginX, rowY, contentWidth, 7, 'F');
    doc.setDrawColor(230, 235, 242);
    doc.line(marginX, rowY + 7, marginX + contentWidth, rowY + 7);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(0, 39, 82);
    doc.text(`Unidade ${u.numero}:`, marginX + 3, rowY + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(45, 55, 72);
    const tituloCortado = u.titulo.length > 46 ? u.titulo.slice(0, 44) + '...' : u.titulo;
    doc.text(tituloCortado, marginX + 18, rowY + 4.5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(u.taxaAcerto >= 75 ? 0 : u.taxaAcerto >= 60 ? 160 : 190, u.taxaAcerto >= 75 ? 115 : u.taxaAcerto >= 60 ? 110 : 30, u.taxaAcerto >= 75 ? 63 : 0);
    doc.text(`${u.taxaAcerto}%`, marginX + 90, rowY + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(45, 55, 72);
    doc.text(`${u.mediaNota.toFixed(1)}`, marginX + 115, rowY + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(100, 110, 125);
    const topicoCortado = u.topicoCritico.length > 36 ? u.topicoCritico.slice(0, 34) + '...' : u.topicoCritico;
    doc.text(topicoCortado, marginX + 132, rowY + 4.5);

    cursorY += 7;
  });

  cursorY += 5;

  // 5. Relação Nominal de Desempenho e Perfil Pedagógico dos Alunos
  checarQuebraPagina(40);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(0, 39, 82);
  doc.text('2. Desempenho Individual & Perfil Pedagógico dos Discentes', marginX, cursorY);
  cursorY += 4.5;

  doc.setFillColor(0, 39, 82);
  doc.rect(marginX, cursorY, contentWidth, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text('DISCENTE / MATRÍCULA', marginX + 3, cursorY + 4.2);
  doc.text('SIMULADOS', marginX + 85, cursorY + 4.2);
  doc.text('MÉDIA NOTAS', marginX + 107, cursorY + 4.2);
  doc.text('TAXA ACERTO', marginX + 130, cursorY + 4.2);
  doc.text('STATUS / DIAGNÓSTICO', marginX + 155, cursorY + 4.2);

  cursorY += 6;

  dados.alunos.forEach((aluno, i) => {
    checarQuebraPagina(7.5);
    const rowY = cursorY;
    doc.setFillColor(i % 2 === 0 ? 255 : 248, i % 2 === 0 ? 255 : 250, i % 2 === 0 ? 255 : 252);
    doc.rect(marginX, rowY, contentWidth, 7, 'F');
    doc.setDrawColor(230, 235, 242);
    doc.line(marginX, rowY + 7, marginX + contentWidth, rowY + 7);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(0, 39, 82);
    doc.text(aluno.nome, marginX + 3, rowY + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(115, 125, 140);
    doc.text(`Mat: ${aluno.matricula}`, marginX + 56, rowY + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(45, 55, 72);
    doc.text(`${aluno.totalSimulados}`, marginX + 88, rowY + 4.5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(aluno.media >= 7 ? 0 : aluno.media >= 5 ? 160 : 190, aluno.media >= 7 ? 115 : aluno.media >= 5 ? 110 : 30, aluno.media >= 7 ? 63 : 0);
    doc.text(`${aluno.media.toFixed(1)}`, marginX + 110, rowY + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(45, 55, 72);
    doc.text(`${aluno.taxaAcerto.toFixed(1)}%`, marginX + 133, rowY + 4.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    if (aluno.statusRisco === 'Estável') {
      doc.setTextColor(0, 115, 63);
      doc.text(`[ESTÁVEL] ${aluno.nivelDominio}`, marginX + 155, rowY + 4.5);
    } else if (aluno.statusRisco === 'Atenção') {
      doc.setTextColor(170, 120, 0);
      doc.text(`[ATENÇÃO] ${aluno.nivelDominio}`, marginX + 155, rowY + 4.5);
    } else {
      doc.setTextColor(190, 30, 30);
      doc.text(`[CRÍTICO] Risco de Reprovação`, marginX + 155, rowY + 4.5);
    }

    cursorY += 7;
  });

  cursorY += 6;

  // 6. Plano de Ação Pedagógica & Intervenções
  checarQuebraPagina(35);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(0, 39, 82);
  doc.text('3. Diretrizes de Intervenção Pedagógica Recomendadas', marginX, cursorY);
  cursorY += 4.5;

  const planos = dados.planoIntervencao || [
    'Reforço com resolução de questões comentadas nas unidades com taxa inferior a 70%.',
    'Aplicação de simulados formativos curtos (10 questões) focados nos temas mais errados da turma.',
    'Agendamento de plantão de monitoria acadêmica direcionado para discentes com status de Atenção e Crítico.',
    'Utilização dos simuladores visuais de equilíbrio tributário e peso morto de Harberger nas aulas presenciais.'
  ];

  planos.forEach((p, idx) => {
    checarQuebraPagina(7);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(0, 39, 82);
    doc.text(`• Ação ${idx + 1}:`, marginX + 2, cursorY + 3.5);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(45, 55, 72);
    const textoAcao = doc.splitTextToSize(p, contentWidth - 20);
    doc.text(textoAcao, marginX + 18, cursorY + 3.5);
    cursorY += textoAcao.length * 4 + 2;
  });

  // Numeração de páginas
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    desenharRodape(i);
  }

  doc.save(`uema_relatorio_pedagogico_turma_${Date.now()}.pdf`);
}

export interface DadosPerfilAlunoPDF {
  aluno: {
    nome: string;
    matricula: string;
    email: string;
    turma?: string;
  };
  totalSimulados: number;
  totalQuestoes: number;
  mediaGeral: number;
  taxaAcerto: number;
  tempoMedio: string;
  statusRisco: string;
  nivelDominio: string;
  desempenhoUnidades: {
    unidade: number;
    nome: string;
    acertos: number;
    total: number;
    taxa: number;
  }[];
  pontosFortes: string[];
  pontosAtencao: string[];
  recomendacoes: string[];
  historico: {
    data: string;
    nota: number;
    simulado: string;
  }[];
}

export function exportarPerfilPedagogicoAlunoPDF(dados: DadosPerfilAlunoPDF) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 14;
  const contentWidth = pageWidth - marginX * 2;
  let cursorY = 12;

  const desenharRodape = (numPagina: number) => {
    doc.setDrawColor(215, 222, 230);
    doc.setLineWidth(0.3);
    doc.line(marginX, pageHeight - 11, marginX + contentWidth, pageHeight - 11);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(115, 125, 140);
    doc.text(
      'UNIVERSIDADE ESTADUAL DO MARANHÃO • CURSO DE CIÊNCIAS ECONÔMICAS • BOLETIM PEDAGÓGICO INDIVIDUAL',
      marginX,
      pageHeight - 6.5
    );
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 39, 82);
    doc.text(`Página ${numPagina}`, pageWidth - marginX - 14, pageHeight - 6.5);
  };

  const checarQuebraPagina = (espacoNecessario: number) => {
    if (cursorY + espacoNecessario > pageHeight - 15) {
      doc.addPage();
      cursorY = 14;
      return true;
    }
    return false;
  };

  // 1. Cabeçalho Institucional
  doc.setFillColor(0, 39, 82);
  doc.rect(marginX, cursorY, contentWidth, 1.2, 'F');
  cursorY += 4;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(0, 39, 82);
  doc.text('UNIVERSIDADE ESTADUAL DO MARANHÃO — UEMA', marginX, cursorY);
  cursorY += 4.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(50, 60, 75);
  doc.text('Centro de Ciências Sociais Aplicadas • Departamento de Economia', marginX, cursorY);
  cursorY += 4;
  doc.text('Finanças Públicas (60h) • Relatório & Perfil Pedagógico Individual de Aprendizagem', marginX, cursorY);
  cursorY += 5;

  doc.setDrawColor(220, 226, 235);
  doc.setLineWidth(0.4);
  doc.line(marginX, cursorY, marginX + contentWidth, cursorY);
  cursorY += 5;

  // 2. Dados do Discente
  doc.setFillColor(247, 249, 252);
  doc.setDrawColor(215, 225, 235);
  doc.setLineWidth(0.3);
  doc.roundedRect(marginX, cursorY, contentWidth, 20, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(0, 39, 82);
  doc.text(dados.aluno.nome, marginX + 4, cursorY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(70, 80, 95);
  doc.text(`Matrícula: ${dados.aluno.matricula}   •   Email: ${dados.aluno.email}   •   Turma: ${dados.aluno.turma || 'Graduação em Ciências Econômicas'}`, marginX + 4, cursorY + 11.5);

  const statusCor = dados.statusRisco === 'Estável' ? [0, 115, 63] : dados.statusRisco === 'Atenção' ? [180, 120, 0] : [190, 30, 30];
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(statusCor[0], statusCor[1], statusCor[2]);
  doc.text(`Nível de Domínio: ${dados.nivelDominio}  |  Status: ${dados.statusRisco}`, marginX + 4, cursorY + 16.5);

  cursorY += 25;

  // 3. Resumo de Métricas Individuais
  const cardW = (contentWidth - 9) / 4;
  const cards = [
    { label: 'MÉDIA INDIVIDUAL', val: `${dados.mediaGeral.toFixed(1)} / 10`, cor: dados.mediaGeral >= 7 ? [0, 115, 63] : [180, 120, 0] },
    { label: 'TAXA DE ACERTO', val: `${dados.taxaAcerto.toFixed(1)}%`, cor: [0, 39, 82] },
    { label: 'SIMULADOS FEITOS', val: `${dados.totalSimulados}`, cor: [0, 39, 82] },
    { label: 'TEMPO MÉDIO', val: dados.tempoMedio, cor: [0, 39, 82] }
  ];

  cards.forEach((c, idx) => {
    const x = marginX + idx * (cardW + 3);
    doc.setFillColor(247, 249, 252);
    doc.setDrawColor(215, 225, 235);
    doc.setLineWidth(0.3);
    doc.roundedRect(x, cursorY, cardW, 15, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(115, 125, 140);
    doc.text(c.label, x + 3, cursorY + 5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(c.cor[0], c.cor[1], c.cor[2]);
    doc.text(c.val, x + 3, cursorY + 11.5);
  });

  cursorY += 21;

  // 4. Domínio por Unidade Curricular
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(0, 39, 82);
  doc.text('1. Domínio de Competências por Unidade da Ementa', marginX, cursorY);
  cursorY += 4.5;

  dados.desempenhoUnidades.forEach((u) => {
    checarQuebraPagina(10);
    doc.setFillColor(252, 253, 255);
    doc.setDrawColor(230, 235, 245);
    doc.rect(marginX, cursorY, contentWidth, 8, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(0, 39, 82);
    doc.text(`Unidade ${u.unidade}: ${u.nome.slice(0, 48)}`, marginX + 3, cursorY + 5.2);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(80, 90, 105);
    doc.text(`${u.acertos} / ${u.total} acertos`, marginX + 115, cursorY + 5.2);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(u.taxa >= 75 ? 0 : u.taxa >= 60 ? 170 : 190, u.taxa >= 75 ? 115 : u.taxa >= 60 ? 110 : 30, u.taxa >= 75 ? 63 : 0);
    doc.text(`${u.taxa.toFixed(1)}%`, marginX + 155, cursorY + 5.2);

    cursorY += 9.5;
  });

  cursorY += 4;

  // 5. Pontos Fortes e Pontos de Atenção
  checarQuebraPagina(35);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(0, 39, 82);
  doc.text('2. Diagnóstico Pedagógico Qualitativo', marginX, cursorY);
  cursorY += 4.5;

  // Pontos Fortes
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(0, 115, 63);
  doc.text('✓ Pontos Fortes Identificados:', marginX, cursorY);
  cursorY += 4;
  dados.pontosFortes.forEach((pf) => {
    checarQuebraPagina(6);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(45, 55, 72);
    doc.text(`• ${pf}`, marginX + 4, cursorY);
    cursorY += 4;
  });

  cursorY += 2;

  // Pontos de Atenção
  checarQuebraPagina(20);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(190, 30, 30);
  doc.text('⚠ Tópicos que Necessitam de Revisão & Fixação:', marginX, cursorY);
  cursorY += 4;
  dados.pontosAtencao.forEach((pa) => {
    checarQuebraPagina(6);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(45, 55, 72);
    doc.text(`• ${pa}`, marginX + 4, cursorY);
    cursorY += 4;
  });

  cursorY += 4;

  // 6. Recomendações de Estudo
  checarQuebraPagina(30);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(0, 39, 82);
  doc.text('3. Roteiro de Estudos Personalizado Recomendado', marginX, cursorY);
  cursorY += 4.5;

  dados.recomendacoes.forEach((rec, i) => {
    checarQuebraPagina(7);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(0, 39, 82);
    doc.text(`${i + 1}.`, marginX + 2, cursorY);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(45, 55, 72);
    const l = doc.splitTextToSize(rec, contentWidth - 10);
    doc.text(l, marginX + 7, cursorY);
    cursorY += l.length * 3.8 + 2;
  });

  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    desenharRodape(i);
  }

  doc.save(`uema_perfil_pedagogico_${dados.aluno.matricula}_${Date.now()}.pdf`);
}

export interface DadosRoteiroEstudoPDF {
  aluno: {
    nome: string;
    matricula: string;
    email?: string;
    turma?: string;
  };
  simuladoInfo: {
    data: string;
    nota: number;
    acertos: number;
    total: number;
    tempoGasto: string;
    unidadesTestadas: string;
    conteudosTestados: string;
  };
  diagnosticoUnidades: {
    unidade: number;
    nome: string;
    acertos: number;
    total: number;
    taxa: number;
  }[];
  diagnosticoConteudos: {
    topico: string;
    unidade: number;
    aulaNumero: number;
    acertos: number;
    total: number;
    taxa: number;
    status: 'Forte' | 'Neutro' | 'Fraco';
  }[];
  pontosFortes: string[];
  pontosFracos: string[];
  questoesParaRevisao: {
    id: string;
    enunciado: string;
    suaResposta: string;
    respostaCorreta: string;
    textoCorreto: string;
    justificativa: string;
    referencia?: string;
    topico?: string;
  }[];
  etapasRoteiro: {
    etapa: number;
    titulo: string;
    acao: string;
    aulasRecomendadas: string;
    leituras: string;
    simuladorRecomendado?: string;
  }[];
  professorResponsavel?: string;
}

export function exportarRoteiroEstudosPersonalizadoPDF(dados: DadosRoteiroEstudoPDF) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 14;
  const contentWidth = pageWidth - marginX * 2;
  let cursorY = 12;

  const desenharRodape = (numPagina: number) => {
    doc.setDrawColor(215, 222, 230);
    doc.setLineWidth(0.3);
    doc.line(marginX, pageHeight - 11, marginX + contentWidth, pageHeight - 11);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(115, 125, 140);
    doc.text(
      'UEMA • CENTRO DE CIÊNCIAS SOCIAIS APLICADAS • DEPARTAMENTO DE CIÊNCIAS ECONÔMICAS • ROTEIRO PERSONALIZADO',
      marginX,
      pageHeight - 6.5
    );
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 39, 82);
    doc.text(`Página ${numPagina}`, pageWidth - marginX - 14, pageHeight - 6.5);
  };

  const checarQuebraPagina = (espacoNecessario: number) => {
    if (cursorY + espacoNecessario > pageHeight - 15) {
      doc.addPage();
      cursorY = 14;
      return true;
    }
    return false;
  };

  // 1. Cabeçalho Institucional
  const cabecalhoAltura = 28;
  doc.setFillColor(0, 39, 82);
  doc.rect(marginX, cursorY, contentWidth, cabecalhoAltura, 'F');

  doc.setFillColor(235, 192, 0);
  doc.rect(marginX, cursorY + cabecalhoAltura, contentWidth, 2, 'F');

  const sealX = marginX + 13;
  const sealY = cursorY + 14;
  const sealR = 10;
  doc.setDrawColor(235, 192, 0);
  doc.setLineWidth(0.8);
  doc.setFillColor(0, 28, 59);
  doc.circle(sealX, sealY, sealR, 'FD');
  doc.setDrawColor(235, 192, 0);
  doc.setLineWidth(0.4);
  doc.circle(sealX, sealY, sealR - 2.5, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(235, 192, 0);
  doc.text('UEMA', sealX, sealY - 1, { align: 'center' });
  doc.setFontSize(5);
  doc.setTextColor(255, 255, 255);
  doc.text('ECONOMIA', sealX, sealY + 3.2, { align: 'center' });

  const textStartX = marginX + 28;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(255, 255, 255);
  doc.text('UNIVERSIDADE ESTADUAL DO MARANHÃO - UEMA', textStartX, cursorY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(215, 225, 240);
  doc.text('CENTRO DE CIÊNCIAS SOCIAIS APLICADAS • CURSO DE CIÊNCIAS ECONÔMICAS', textStartX, cursorY + 12);
  doc.text('DISCIPLINA: TEORIA DAS FINANÇAS PÚBLICAS (60 HORAS)', textStartX, cursorY + 16.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(235, 192, 0);
  doc.text('PLANO DE ESTUDOS PERSONALIZADO & GUIA DE RECUPERAÇÃO DE RENDIMENTO', textStartX, cursorY + 22.5);

  cursorY += cabecalhoAltura + 6;

  // 2. Dados do Aluno e Resumo do Simulado
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(215, 225, 235);
  doc.setLineWidth(0.4);
  doc.roundedRect(marginX, cursorY, contentWidth, 22, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(0, 39, 82);
  doc.text(`Discente: ${dados.aluno.nome.toUpperCase()}`, marginX + 4, cursorY + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(60, 70, 85);
  doc.text(`Matrícula: ${dados.aluno.matricula}  |  Turma: ${dados.aluno.turma || 'Ciências Econômicas'}  |  Emissão: ${new Date().toLocaleDateString('pt-BR')}`, marginX + 4, cursorY + 10.5);
  doc.text(`Unidades Testadas: ${dados.simuladoInfo.unidadesTestadas.slice(0, 75)}`, marginX + 4, cursorY + 15);
  doc.text(`Conteúdos Selecionados: ${dados.simuladoInfo.conteudosTestados.slice(0, 80)}`, marginX + 4, cursorY + 19.5);

  // Box com nota no canto direito
  const notaBoxX = marginX + contentWidth - 36;
  doc.setFillColor(dados.simuladoInfo.nota >= 7 ? 240 : 255, dados.simuladoInfo.nota >= 7 ? 253 : 243, dados.simuladoInfo.nota >= 7 ? 244 : 243);
  doc.setDrawColor(dados.simuladoInfo.nota >= 7 ? 0 : 220, dados.simuladoInfo.nota >= 7 ? 115 : 50, dados.simuladoInfo.nota >= 7 ? 63 : 50);
  doc.setLineWidth(0.6);
  doc.roundedRect(notaBoxX, cursorY + 3, 32, 16, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(80, 90, 100);
  doc.text('NOTA DO SIMULADO', notaBoxX + 16, cursorY + 7.5, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(dados.simuladoInfo.nota >= 7 ? 0 : 190, dados.simuladoInfo.nota >= 7 ? 115 : 30, dados.simuladoInfo.nota >= 7 ? 63 : 30);
  doc.text(`${dados.simuladoInfo.nota.toFixed(1)} / 10`, notaBoxX + 16, cursorY + 13, { align: 'center' });

  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 110, 120);
  doc.text(`${dados.simuladoInfo.acertos}/${dados.simuladoInfo.total} (${((dados.simuladoInfo.acertos / (dados.simuladoInfo.total || 1)) * 100).toFixed(0)}%)`, notaBoxX + 16, cursorY + 17.5, { align: 'center' });

  cursorY += 26;

  // 3. Diagnóstico por Unidade e Conteúdo
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(0, 39, 82);
  doc.text('1. Diagnóstico de Desempenho por Unidade e Conteúdo', marginX, cursorY);
  cursorY += 4.5;

  // Tabela de unidades
  doc.setFillColor(0, 39, 82);
  doc.rect(marginX, cursorY, contentWidth, 5.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text('UNIDADE CURRICULAR', marginX + 3, cursorY + 3.8);
  doc.text('ACERTOS / TOTAL', marginX + 120, cursorY + 3.8);
  doc.text('TAXA', marginX + 155, cursorY + 3.8);
  doc.text('STATUS', marginX + 170, cursorY + 3.8);
  cursorY += 5.5;

  dados.diagnosticoUnidades.forEach((u) => {
    checarQuebraPagina(7);
    doc.setFillColor(252, 253, 255);
    doc.setDrawColor(225, 232, 240);
    doc.rect(marginX, cursorY, contentWidth, 6, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(0, 39, 82);
    doc.text(`Unidade ${u.unidade}: ${u.nome.slice(0, 55)}`, marginX + 3, cursorY + 4.2);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(60, 70, 85);
    doc.text(`${u.acertos} / ${u.total}`, marginX + 120, cursorY + 4.2);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(u.taxa >= 70 ? 0 : u.taxa >= 50 ? 180 : 190, u.taxa >= 70 ? 115 : u.taxa >= 50 ? 110 : 30, u.taxa >= 70 ? 63 : 0);
    doc.text(`${u.taxa.toFixed(1)}%`, marginX + 155, cursorY + 4.2);

    const statusTexto = u.taxa >= 70 ? 'Consolidado' : u.taxa >= 50 ? 'Atenção' : 'Crítico';
    doc.text(statusTexto, marginX + 170, cursorY + 4.2);

    cursorY += 6;
  });

  cursorY += 4;

  // Detalhamento por conteúdo específico
  checarQuebraPagina(15);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(0, 39, 82);
  doc.text('Detalhamento por Tópico Específico Avaliado:', marginX, cursorY);
  cursorY += 4;

  dados.diagnosticoConteudos.slice(0, 8).forEach((ct) => {
    checarQuebraPagina(6.5);
    doc.setFillColor(ct.status === 'Forte' ? 245 : ct.status === 'Fraco' ? 255 : 252, ct.status === 'Forte' ? 253 : ct.status === 'Fraco' ? 245 : 250, ct.status === 'Forte' ? 247 : ct.status === 'Fraco' ? 245 : 255);
    doc.setDrawColor(220, 228, 238);
    doc.rect(marginX, cursorY, contentWidth, 5.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.setTextColor(0, 39, 82);
    doc.text(`[U${ct.unidade} • Aula ${ct.aulaNumero.toString().padStart(2, '0')}] ${ct.topico.slice(0, 60)}`, marginX + 3, cursorY + 3.8);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    const cor = ct.status === 'Forte' ? [0, 115, 63] : ct.status === 'Fraco' ? [190, 30, 30] : [180, 110, 0];
    doc.setTextColor(cor[0], cor[1], cor[2]);
    doc.text(`${ct.acertos}/${ct.total} (${ct.taxa.toFixed(0)}%) - ${ct.status === 'Forte' ? 'Ponto Forte' : ct.status === 'Fraco' ? 'Lacuna Crítica' : 'Em Desenvolvimento'}`, marginX + 130, cursorY + 3.8);

    cursorY += 5.5;
  });

  cursorY += 5;

  // 4. Seção Qualitativa: Pontos Fortes e Pontos a Melhorar
  checarQuebraPagina(30);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(0, 39, 82);
  doc.text('2. Síntese de Forças e Oportunidades de Melhoria', marginX, cursorY);
  cursorY += 4.5;

  // Pontos Fortes
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(0, 115, 63);
  doc.text('✓ CONCEITOS E UNIDADES ONDE VOCÊ SE DESTACOU (PONTOS FORTES):', marginX, cursorY);
  cursorY += 4;
  dados.pontosFortes.forEach((pf) => {
    checarQuebraPagina(5.5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(40, 50, 65);
    doc.text(`• ${pf}`, marginX + 3, cursorY);
    cursorY += 3.8;
  });

  cursorY += 2;

  // Pontos Fracos
  checarQuebraPagina(20);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(190, 30, 30);
  doc.text('⚠ LACUNAS CONCEITUAIS E PONTOS FRACOS A REVISAR COM URGÊNCIA:', marginX, cursorY);
  cursorY += 4;
  dados.pontosFracos.forEach((pa) => {
    checarQuebraPagina(5.5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(40, 50, 65);
    doc.text(`• ${pa}`, marginX + 3, cursorY);
    cursorY += 3.8;
  });

  cursorY += 4;

  // 5. Roteiro Passo a Passo de Estudos
  checarQuebraPagina(40);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(0, 39, 82);
  doc.text('3. Roteiro de Estudos Estruturado Passo a Passo', marginX, cursorY);
  cursorY += 4.5;

  dados.etapasRoteiro.forEach((et) => {
    checarQuebraPagina(22);
    doc.setFillColor(248, 250, 253);
    doc.setDrawColor(215, 225, 238);
    doc.roundedRect(marginX, cursorY, contentWidth, 18, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(0, 39, 82);
    doc.text(`ETAPA ${et.etapa}: ${et.titulo.toUpperCase()}`, marginX + 3, cursorY + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(45, 55, 72);
    const l1 = doc.splitTextToSize(`Ação: ${et.acao}`, contentWidth - 8);
    doc.text(l1, marginX + 3, cursorY + 8.5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 115, 63);
    doc.text(`Aulas no AVA/Plataforma: ${et.aulasRecomendadas}`, marginX + 3, cursorY + 13);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(90, 100, 115);
    doc.text(`Leituras & Bibliografia: ${et.leituras.slice(0, 85)}`, marginX + 3, cursorY + 16.5);

    cursorY += 21;
  });

  // 6. Caderno de Questões Erradas Comentadas (se houver erros)
  if (dados.questoesParaRevisao.length > 0) {
    checarQuebraPagina(35);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(0, 39, 82);
    doc.text(`4. Caderno de Correção Comentada dos Erros (${dados.questoesParaRevisao.length} Questões)`, marginX, cursorY);
    cursorY += 4.5;

    dados.questoesParaRevisao.forEach((q, idx) => {
      checarQuebraPagina(28);
      doc.setFillColor(254, 250, 250);
      doc.setDrawColor(240, 215, 215);
      doc.roundedRect(marginX, cursorY, contentWidth, 24, 1.5, 1.5, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(190, 30, 30);
      doc.text(`Questão ${idx + 1} (${q.id}) - ${q.topico || 'Conteúdo do Simulado'}`, marginX + 3, cursorY + 4);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(45, 55, 72);
      const enun = doc.splitTextToSize(q.enunciado, contentWidth - 8);
      doc.text(enun.slice(0, 2), marginX + 3, cursorY + 7.5);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(190, 30, 30);
      doc.text(`Sua Resposta: (${q.suaResposta})`, marginX + 3, cursorY + 14);

      doc.setTextColor(0, 115, 63);
      doc.text(`Gabarito Correto: (${q.respostaCorreta}) ${q.textoCorreto.slice(0, 50)}`, marginX + 45, cursorY + 14);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.2);
      doc.setTextColor(70, 80, 95);
      const just = doc.splitTextToSize(`Fundamentação: ${q.justificativa}`, contentWidth - 8);
      doc.text(just.slice(0, 2), marginX + 3, cursorY + 18.5);

      cursorY += 27;
    });
  }

  // 7. Encerramento e Assinatura
  checarQuebraPagina(20);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(6.5);
  doc.setTextColor(100, 110, 120);
  doc.text('Documento de apoio pedagógico gerado automaticamente pela plataforma acadêmica de Teoria das Finanças Públicas.', marginX, cursorY + 4);
  doc.text('Recomenda-se a revisão dos pontos fracos antes da data oficial das avaliações regimentais da UEMA.', marginX, cursorY + 7.5);

  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    desenharRodape(i);
  }

  doc.save(`uema_roteiro_estudos_${dados.aluno.matricula}_${Date.now()}.pdf`);
}

export interface DadosRelatorioUnidadePDF {
  unidadeNumero: number;
  unidadeTitulo: string;
  turmaNome: string;
  professorNome: string;
  dataGeracao?: string;
  totalAlunosAvaliados: number;
  totalQuestoesRespondidas: number;
  taxaMediaAcerto: number;
  mediaNota: number;
  distribuicaoNotas?: {
    excelente: number;
    bom: number;
    regular: number;
    critico: number;
  };
  topicosDesempenho: {
    nome: string;
    taxaAcerto: number;
    totalQuestoes: number;
  }[];
  questoesCriticas?: {
    id: string;
    topico: string;
    taxaErro: number;
    motivo?: string;
  }[];
  alunos: {
    nome: string;
    matricula: string;
    totalQuestoes: number;
    acertos: number;
    taxaAcerto: number;
    nota: number;
    status: string;
  }[];
  parecerPedagogico: string;
  recomendacoesDidaticas: string[];
}

export function exportarRelatorioDesempenhoUnidadePDF(dados: DadosRelatorioUnidadePDF) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 14;
  const contentWidth = pageWidth - marginX * 2;
  let cursorY = 12;

  const desenharRodape = (numPagina: number) => {
    doc.setDrawColor(215, 222, 230);
    doc.setLineWidth(0.3);
    doc.line(marginX, pageHeight - 11, marginX + contentWidth, pageHeight - 11);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(115, 125, 140);
    doc.text(
      'UEMA • CENTRO DE CIÊNCIAS SOCIAIS APLICADAS • CURSO DE CIÊNCIAS ECONÔMICAS • FINANÇAS PÚBLICAS',
      marginX,
      pageHeight - 6.5
    );
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 39, 82);
    doc.text(`Página ${numPagina}`, pageWidth - marginX - 14, pageHeight - 6.5);
  };

  const checarQuebraPagina = (espacoNecessario: number) => {
    if (cursorY + espacoNecessario > pageHeight - 15) {
      doc.addPage();
      cursorY = 14;
      return true;
    }
    return false;
  };

  // 1. Cabeçalho Institucional
  doc.setFillColor(0, 39, 82); // Azul Marinho UEMA
  doc.rect(marginX, cursorY, contentWidth, 24, 'F');

  doc.setFillColor(235, 192, 0); // Amarelo Dourado
  doc.rect(marginX, cursorY + 23, contentWidth, 1.2, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('UNIVERSIDADE ESTADUAL DO MARANHÃO — UEMA', marginX + 6, cursorY + 6.5);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(215, 228, 245);
  doc.text('CENTRO DE CIÊNCIAS SOCIAIS APLICADAS • CURSO DE CIÊNCIAS ECONÔMICAS', marginX + 6, cursorY + 11.5);
  doc.text('DEPARTAMENTO DE ECONOMIA • TEORIA DAS FINANÇAS PÚBLICAS', marginX + 6, cursorY + 16);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(235, 192, 0);
  doc.text(`RELATÓRIO SETORIAL: UNIDADE ${dados.unidadeNumero}`, pageWidth - marginX - 48, cursorY + 8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(255, 255, 255);
  doc.text(dados.dataGeracao || new Date().toLocaleDateString('pt-BR'), pageWidth - marginX - 48, cursorY + 13.5);

  cursorY += 28;

  // 2. Título do Relatório
  doc.setFillColor(245, 248, 252);
  doc.setDrawColor(210, 220, 235);
  doc.roundedRect(marginX, cursorY, contentWidth, 17, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(0, 39, 82);
  doc.text(`RELATÓRIO DE DESEMPENHO CURRICULAR — UNIDADE ${dados.unidadeNumero}`, marginX + 4, cursorY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(60, 75, 95);
  doc.text(`Ementa: ${dados.unidadeTitulo}`, marginX + 4, cursorY + 11.5);

  cursorY += 21;

  // 3. Indicadores Gerais da Unidade (Cards de Métricas)
  const cardW = (contentWidth - 6) / 4;
  const kpis = [
    { label: 'TAXA MÉDIA DE ACERTO', val: `${dados.taxaMediaAcerto}%`, cor: [0, 115, 63] },
    { label: 'MÉDIA DA UNIDADE', val: `${dados.mediaNota.toFixed(1)} / 10`, cor: [0, 39, 82] },
    { label: 'QUESTÕES RESOLVIDAS', val: `${dados.totalQuestoesRespondidas}`, cor: [110, 60, 160] },
    { label: 'DISCENTES AVALIADOS', val: `${dados.totalAlunosAvaliados}`, cor: [180, 80, 20] }
  ];

  kpis.forEach((k, idx) => {
    const xPos = marginX + idx * (cardW + 2);
    doc.setFillColor(250, 252, 255);
    doc.setDrawColor(220, 228, 238);
    doc.roundedRect(xPos, cursorY, cardW, 16, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6);
    doc.setTextColor(100, 115, 130);
    doc.text(k.label, xPos + 2.5, cursorY + 4.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(k.cor[0], k.cor[1], k.cor[2]);
    doc.text(k.val, xPos + 2.5, cursorY + 11.5);
  });

  cursorY += 20;

  // 4. Desempenho por Tópico da Unidade
  checarQuebraPagina(40);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(0, 39, 82);
  doc.text(`1. DIAGNÓSTICO TEMÁTICO POR TÓPICO DA UNIDADE ${dados.unidadeNumero}`, marginX, cursorY);
  cursorY += 3;

  doc.setFillColor(0, 39, 82);
  doc.rect(marginX, cursorY, contentWidth, 5.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(255, 255, 255);
  doc.text('Tópico Curricular / Objeto do Conhecimento', marginX + 3, cursorY + 3.8);
  doc.text('Resolvidas', marginX + 115, cursorY + 3.8);
  doc.text('Taxa Acerto (%)', marginX + 138, cursorY + 3.8);
  doc.text('Diagnóstico Pedagógico', marginX + 162, cursorY + 3.8);
  cursorY += 5.5;

  dados.topicosDesempenho.forEach((t, i) => {
    checarQuebraPagina(6);
    doc.setFillColor(i % 2 === 0 ? 255 : 248, i % 2 === 0 ? 255 : 250, i % 2 === 0 ? 255 : 252);
    doc.rect(marginX, cursorY, contentWidth, 5.5, 'F');
    doc.setDrawColor(230, 235, 242);
    doc.line(marginX, cursorY + 5.5, marginX + contentWidth, cursorY + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(30, 41, 59);
    doc.text(t.nome.slice(0, 65), marginX + 3, cursorY + 3.8);

    doc.text(String(t.totalQuestoes), marginX + 118, cursorY + 3.8);

    doc.setFont('helvetica', 'bold');
    if (t.taxaAcerto >= 70) {
      doc.setTextColor(0, 115, 63);
    } else if (t.taxaAcerto >= 50) {
      doc.setTextColor(180, 100, 0);
    } else {
      doc.setTextColor(190, 30, 30);
    }
    doc.text(`${t.taxaAcerto}%`, marginX + 143, cursorY + 3.8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.2);
    const diag = t.taxaAcerto >= 75 ? 'Domínio Consolidado' : t.taxaAcerto >= 60 ? 'Regular / Em Fixação' : 'Alerta / Retomar Conteúdo';
    doc.text(diag, marginX + 162, cursorY + 3.8);

    cursorY += 5.5;
  });

  cursorY += 5;

  // 5. Tabela de Discentes na Unidade
  checarQuebraPagina(40);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(0, 39, 82);
  doc.text(`2. RENDIMENTO DOS DISCENTES NA UNIDADE ${dados.unidadeNumero}`, marginX, cursorY);
  cursorY += 3;

  doc.setFillColor(0, 39, 82);
  doc.rect(marginX, cursorY, contentWidth, 5.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(255, 255, 255);
  doc.text('Nome do Estudante', marginX + 3, cursorY + 3.8);
  doc.text('Matrícula', marginX + 75, cursorY + 3.8);
  doc.text('Questões', marginX + 110, cursorY + 3.8);
  doc.text('Acertos', marginX + 130, cursorY + 3.8);
  doc.text('Aprov. (%)', marginX + 147, cursorY + 3.8);
  doc.text('Nota (0-10)', marginX + 166, cursorY + 3.8);
  cursorY += 5.5;

  dados.alunos.slice(0, 25).forEach((al, i) => {
    checarQuebraPagina(5.5);
    doc.setFillColor(i % 2 === 0 ? 255 : 249, i % 2 === 0 ? 255 : 250, i % 2 === 0 ? 255 : 252);
    doc.rect(marginX, cursorY, contentWidth, 5.5, 'F');
    doc.setDrawColor(230, 235, 242);
    doc.line(marginX, cursorY + 5.5, marginX + contentWidth, cursorY + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(30, 41, 59);
    doc.text(al.nome.slice(0, 42), marginX + 3, cursorY + 3.8);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(90, 100, 115);
    doc.text(al.matricula, marginX + 75, cursorY + 3.8);

    doc.setTextColor(30, 41, 59);
    doc.text(String(al.totalQuestoes), marginX + 115, cursorY + 3.8);
    doc.text(String(al.acertos), marginX + 133, cursorY + 3.8);

    doc.setFont('helvetica', 'bold');
    doc.text(`${al.taxaAcerto}%`, marginX + 150, cursorY + 3.8);

    if (al.nota >= 7) {
      doc.setTextColor(0, 115, 63);
    } else if (al.nota >= 5) {
      doc.setTextColor(180, 100, 0);
    } else {
      doc.setTextColor(190, 30, 30);
    }
    doc.text(al.nota.toFixed(1), marginX + 170, cursorY + 3.8);

    cursorY += 5.5;
  });

  cursorY += 6;

  // 6. Parecer Pedagógico Institucional Formativo & Recomendações
  checarQuebraPagina(38);
  doc.setFillColor(248, 250, 254);
  doc.setDrawColor(190, 205, 225);
  doc.roundedRect(marginX, cursorY, contentWidth, 32, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(0, 39, 82);
  doc.text(`3. PARECER FORMATIVO E RECOMENDAÇÕES DIDÁTICAS — UNIDADE ${dados.unidadeNumero}`, marginX + 4, cursorY + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(50, 65, 80);
  const parecerLinhas = doc.splitTextToSize(dados.parecerPedagogico, contentWidth - 8);
  doc.text(parecerLinhas.slice(0, 3), marginX + 4, cursorY + 9.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(0, 115, 63);
  doc.text('Diretrizes para as Próximas Aulas:', marginX + 4, cursorY + 19);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(60, 75, 90);
  dados.recomendacoesDidaticas.slice(0, 2).forEach((rec, rIdx) => {
    doc.text(`• ${rec.slice(0, 110)}`, marginX + 5, cursorY + 23.5 + rIdx * 4);
  });

  cursorY += 38;

  // 7. Campo de Assinatura Docente
  checarQuebraPagina(22);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(80, 90, 105);
  doc.text('São Luís — Maranhão, Universidade Estadual do Maranhão (UEMA).', marginX, cursorY + 4);

  doc.setDrawColor(160, 175, 195);
  doc.setLineWidth(0.3);
  doc.line(marginX + 60, cursorY + 16, marginX + contentWidth - 60, cursorY + 16);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(0, 39, 82);
  doc.text(dados.professorNome || 'Docente Responsável — Teoria das Finanças Públicas', pageWidth / 2, cursorY + 19.5, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(110, 120, 135);
  doc.text('Departamento de Economia / CCSA / UEMA', pageWidth / 2, cursorY + 23, { align: 'center' });

  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    desenharRodape(i);
  }

  doc.save(`uema_relatorio_desempenho_unidade_${dados.unidadeNumero}_${Date.now()}.pdf`);
}
