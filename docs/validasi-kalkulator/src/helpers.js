const docx = require('docx');
const {
  Document, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, ShadingType,
  AlignmentType, LevelFormat, BorderStyle, PageBreak, TableOfContents, Footer, PageNumber, Header, ImageRun, ExternalHyperlink,
} = docx;

const W = 9638, ACCENT = '1F4E79', ZEBRA = 'F5F8FB';

function runs(text, base = {}) {
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map(s => s.startsWith('**') ? new TextRun({ text: s.slice(2, -2), bold: true, ...base }) : new TextRun({ text: s, ...base }));
}
const p = (text, opts = {}) => new Paragraph({ spacing: { after: 120 }, ...opts, children: runs(text, opts.run) });
const h1 = (t, brk = true) => new Paragraph({ heading: HeadingLevel.HEADING_1, pageBreakBefore: brk, children: [new TextRun(t)] });
const h2 = t => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(t)] });
const h3 = t => new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun(t)] });
const bullet = (t, level = 0) => new Paragraph({ numbering: { reference: 'b', level }, spacing: { after: 60 }, children: runs(t) });
const bullets = arr => arr.map(t => bullet(t));
const numbered = (arr, ref = 'n') => arr.map(t => new Paragraph({ numbering: { reference: ref, level: 0 }, spacing: { after: 60 }, children: runs(t) }));
const note = (t, fill = 'FFF4E5', line = 'E69500') => new Paragraph({ spacing: { after: 160 }, shading: { type: ShadingType.CLEAR, fill, color: 'auto' },
  border: { left: { style: BorderStyle.SINGLE, size: 18, color: line, space: 6 } }, children: runs(t, { size: 20 }) });
const gap = () => new Paragraph({ spacing: { after: 120 }, children: [] });
const link = (text, url) => new Paragraph({ spacing: { after: 80 }, children: [new ExternalHyperlink({ link: url, children: [new TextRun({ text, style: 'Hyperlink', color: '0563C1', underline: {} })] })] });

function table(headers, rows, widths) {
  const total = widths.reduce((a, b) => a + b, 0);
  const cw = widths.map(w => Math.round(w * W / total));
  cw[cw.length - 1] += W - cw.reduce((a, b) => a + b, 0);
  const cell = (t, i, head, zebra) => new TableCell({
    width: { size: cw[i], type: WidthType.DXA },
    shading: head ? { type: ShadingType.CLEAR, fill: ACCENT, color: 'auto' } : zebra ? { type: ShadingType.CLEAR, fill: ZEBRA, color: 'auto' } : undefined,
    margins: { top: 60, bottom: 60, left: 90, right: 90 },
    children: String(t).split('\n').map(line => new Paragraph({ spacing: { after: 0 }, children: runs(line, head ? { bold: true, color: 'FFFFFF', size: 18 } : { size: 18 }) })),
  });
  return new Table({
    width: { size: W, type: WidthType.DXA }, columnWidths: cw,
    rows: [
      new TableRow({ tableHeader: true, children: headers.map((h, i) => cell(h, i, true)) }),
      ...rows.map((r, ri) => new TableRow({ children: r.map((c, i) => cell(c, i, false, ri % 2 === 1)) })),
    ],
  });
}

function image(buf, w, h, type = 'png') {
  const maxW = 600; const scale = Math.min(1, maxW / w);
  return new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [new ImageRun({ type, data: buf, transformation: { width: Math.round(w * scale), height: Math.round(h * scale) } })] });
}
const caption = t => new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: t, italics: true, size: 18, color: '595959' })] });

function cover(kicker, title, subtitle, meta, tocRange = '1-2') {
  return [
    new Paragraph({ spacing: { before: 2000, after: 200 }, children: [new TextRun({ text: kicker, bold: true, size: 26, color: '7F7F7F' })] }),
    new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: title, bold: true, size: 48, color: ACCENT })] }),
    new Paragraph({ spacing: { after: 500 }, children: [new TextRun({ text: subtitle, size: 26 })] }),
    table(['Butir', 'Keterangan'], meta, [25, 75]),
    new Paragraph({ children: [new PageBreak()] }),
    new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: 'Daftar Isi', bold: true, size: 32, color: ACCENT })] }),
    new TableOfContents('Daftar Isi', { hyperlink: true, headingStyleRange: tocRange }),
  ];
}

function makeDoc(title, headerText, children) {
  return new Document({
    creator: 'Claude Code', title,
    styles: {
      default: { document: { run: { font: 'Arial', size: 21 } } },
      paragraphStyles: [
        { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 32, bold: true, font: 'Arial', color: ACCENT }, paragraph: { spacing: { before: 240, after: 200 }, outlineLevel: 0 } },
        { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 26, bold: true, font: 'Arial', color: ACCENT }, paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 } },
        { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 22, bold: true, font: 'Arial', color: '404040' }, paragraph: { spacing: { before: 180, after: 80 }, outlineLevel: 2 } },
      ],
    },
    numbering: { config: [
      { reference: 'b', levels: [
        { level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 270 } } } },
        { level: 1, format: LevelFormat.BULLET, text: '◦', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 1080, hanging: 270 } } } },
      ] },
      ...['n', 'n2', 'n3', 'n4', 'n5', 'n6'].map(r => ({ reference: r, levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 300 } } } }] })),
    ] },
    sections: [{
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } } },
      headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: headerText, size: 16, color: '7F7F7F' })] })] }) },
      footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Halaman ', size: 16, color: '7F7F7F' }), new TextRun({ children: [PageNumber.CURRENT], size: 16, color: '7F7F7F' })] })] }) },
      children,
    }],
  });
}

module.exports = { docx, p, h1, h2, h3, bullet, bullets, numbered, note, gap, link, table, image, caption, cover, makeDoc, runs };
