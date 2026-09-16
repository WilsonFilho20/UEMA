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
