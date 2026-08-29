import { NextRequest, NextResponse } from 'next/server';
import PptxGenJS from 'pptxgenjs';
import { getPatternById } from '@/lib/data/patterns';

export const runtime = 'nodejs';

// AIBP局 競合インテリジェンス月次レポートのデザイントークン（references/design-system.md 準拠）
const FONT = 'BIZ UDPGothic';
const BAND = '1E3A5F';
const EYE = 'F59E0B';
const WHITE = 'FFFFFF';
const LEAD_BG = 'FFF7ED';
const LEAD_TX = '1A2C4A';
const CARD = 'F7F8FA';
const HAIR = 'D9E1EC';
const INK = '1F2933';
const EXCL_BG = 'ECECEC';
const YELLOW = 'F5C13C';
const SLATE = '64748B';

const sourceLabel: Record<string, string> = {
  competitive: '競合事例由来',
  client_case: '自社案件由来',
};

export async function POST(req: NextRequest) {
  const { id } = await req.json().catch(() => ({ id: null }));
  if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 });

  const pattern = await getPatternById(id);
  if (!pattern) return NextResponse.json({ error: 'not found' }, { status: 404 });

  const pptx = new PptxGenJS();
  pptx.defineLayout({ name: 'A16x9', width: 13.333, height: 7.5 });
  pptx.layout = 'A16x9';

  const slide = pptx.addSlide();
  slide.background = { color: WHITE };

  // 見出し帯
  slide.addShape('rect', { x: 0, y: 0, w: 13.333, h: 0.95, fill: { color: BAND } });
  slide.addText('型化ライブラリ ｜ ' + (sourceLabel[pattern.sourceType] ?? ''), {
    x: 0.5, y: 0.13, w: 8.0, h: 0.3,
    fontFace: FONT, fontSize: 13, bold: true, color: EYE, margin: 0,
  });
  slide.addText(pattern.name, {
    x: 0.5, y: 0.41, w: 12.3, h: 0.48,
    fontFace: FONT, fontSize: 22, bold: true, color: WHITE, valign: 'middle', margin: 0,
  });

  // リード（一行要約）
  slide.addShape('roundRect', {
    x: 0.52, y: 1.16, w: 12.3, h: 0.72, rectRadius: 0.06, fill: { color: LEAD_BG },
  });
  slide.addText(pattern.summary, {
    x: 0.69, y: 1.22, w: 12.13, h: 0.6,
    fontFace: FONT, fontSize: 15, bold: true, color: LEAD_TX, valign: 'middle', margin: 0, lineSpacingMultiple: 1.05,
  });

  // 左：適用場面 + 出典
  slide.addShape('roundRect', {
    x: 0.52, y: 2.05, w: 5.9, h: 1.55, rectRadius: 0.05, fill: { color: CARD }, line: { color: HAIR, width: 1 },
  });
  slide.addText('適用場面', {
    x: 0.72, y: 2.15, w: 5.5, h: 0.28, fontFace: FONT, fontSize: 12.5, bold: true, color: BAND, margin: 0,
  });
  slide.addText(pattern.scenes.map((s) => `・${s}`).join('\n'), {
    x: 0.72, y: 2.46, w: 5.5, h: 1.05,
    fontFace: FONT, fontSize: 12, color: INK, margin: 0, lineSpacingMultiple: 1.2,
  });

  slide.addShape('roundRect', {
    x: 0.52, y: 3.72, w: 5.9, h: 1.05, rectRadius: 0.05, fill: { color: CARD }, line: { color: HAIR, width: 1 },
  });
  slide.addText('出典', {
    x: 0.72, y: 3.82, w: 5.5, h: 0.26, fontFace: FONT, fontSize: 12.5, bold: true, color: BAND, margin: 0,
  });
  slide.addText(
    `${pattern.sourceName}\n${pattern.sourceType === 'competitive' ? `競合インテリジェンス月次レポート（${pattern.relatedMonth ?? '―'}）` : 'Notion 得意先案件DB／型化ライブラリ（AIBP局）DB'}`,
    {
      x: 0.72, y: 4.08, w: 5.5, h: 0.6,
      fontFace: FONT, fontSize: 11.5, color: SLATE, margin: 0, lineSpacingMultiple: 1.3,
    }
  );

  // 右：水平展開アイデア
  slide.addShape('roundRect', {
    x: 6.62, y: 2.05, w: 6.2, h: 2.72, rectRadius: 0.05, fill: { color: CARD }, line: { color: HAIR, width: 1 },
  });
  slide.addText('他の案件への水平展開アイデア', {
    x: 6.82, y: 2.15, w: 5.8, h: 0.28, fontFace: FONT, fontSize: 12.5, bold: true, color: BAND, margin: 0,
  });
  slide.addText(pattern.horizontalIdeas.map((s) => `・${s}`).join('\n\n'), {
    x: 6.82, y: 2.46, w: 5.8, h: 2.2,
    fontFace: FONT, fontSize: 12, color: INK, margin: 0, lineSpacingMultiple: 1.25,
  });

  // ！枠：博報堂との差分・新しさ
  const exY = 4.98;
  const exH = 1.9;
  slide.addShape('rect', { x: 0.52, y: exY, w: 12.3, h: exH, fill: { color: EXCL_BG } });
  slide.addShape('ellipse', { x: 0.74, y: exY + (exH - 0.64) / 2, w: 0.64, h: 0.64, fill: { color: YELLOW } });
  slide.addText('！', {
    x: 0.74, y: exY + (exH - 0.64) / 2, w: 0.64, h: 0.64,
    fontFace: FONT, fontSize: 26, bold: true, color: '1A1A1A', align: 'center', valign: 'middle', margin: 0,
  });
  slide.addText(pattern.differentiation, {
    x: 1.6, y: exY + 0.12, w: 11.0, h: exH - 0.24,
    fontFace: FONT, fontSize: 13, color: LEAD_TX, valign: 'middle', margin: 0, lineSpacingMultiple: 1.15,
  });

  // 出所・ページ番号
  slide.addText(`登録日：${pattern.registeredAt}　出典：${pattern.sourceName}`, {
    x: 0.5, y: 7.14, w: 11.7, h: 0.22, fontFace: FONT, fontSize: 12, color: SLATE, margin: 0,
  });
  slide.addText('AIBP局 型化ライブラリ（デモ用ダミー値）', {
    x: 9.5, y: 7.22, w: 3.3, h: 0.22, fontFace: FONT, fontSize: 9, color: '6B7280', align: 'right', margin: 0,
  });

  const buffer = (await pptx.write({ outputType: 'nodebuffer' })) as Buffer;

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'Content-Disposition': `attachment; filename="pattern_${pattern.id}.pptx"`,
    },
  });
}
