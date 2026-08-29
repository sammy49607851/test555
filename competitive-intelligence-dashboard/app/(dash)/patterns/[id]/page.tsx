import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHead } from '@/components/Chrome';
import { Card } from '@/components/ui';
import { getPatternById, getPatterns } from '@/lib/data/patterns';
import ExportPatternButton from '@/components/ExportPatternButton';

const sourceLabel: Record<string, string> = {
  competitive: '競合事例',
  client_case: '自社案件',
};

export async function generateStaticParams() {
  const patterns = await getPatterns();
  return patterns.map((p) => ({ id: p.id }));
}

export default async function PatternDetailPage({ params }: { params: { id: string } }) {
  const pattern = await getPatternById(params.id);
  if (!pattern) return notFound();

  return (
    <>
      <Link href="/patterns" style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>
        ← 型化ライブラリ一覧へ
      </Link>
      <PageHead
        eyebrow={`${sourceLabel[pattern.sourceType]} ／ ${pattern.industry}`}
        title={pattern.name}
        desc={pattern.summary}
      />

      <div className="grid g2">
        <div>
          <Card title="適用場面">
            <div className="pill-row">
              {pattern.scenes.map((s) => (
                <span key={s} className="pill">
                  {s}
                </span>
              ))}
            </div>
          </Card>

          <div style={{ height: 18 }} />

          <Card title="博報堂との差分／新しさの言語化">
            <p style={{ fontSize: 13.5, lineHeight: 1.9, color: 'var(--ink-2)' }}>{pattern.differentiation}</p>
          </Card>

          <div style={{ height: 18 }} />

          <Card title="他の案件への水平展開アイデア">
            <ul style={{ paddingLeft: 18, fontSize: 13, lineHeight: 1.9, color: 'var(--ink-2)' }}>
              {pattern.horizontalIdeas.map((idea, i) => (
                <li key={i}>{idea}</li>
              ))}
            </ul>
          </Card>
        </div>

        <div>
          <Card title="出典">
            <div style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 700 }}>{pattern.sourceName}</div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 6 }}>
              {pattern.sourceType === 'competitive'
                ? `競合インテリジェンス月次レポート（${pattern.relatedMonth ?? '―'}）由来`
                : 'Notion 得意先案件DB／型化ライブラリ（AIBP局）DB 由来'}
            </div>
            <a
              href={pattern.sourceUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-block',
                marginTop: 12,
                fontSize: 12.5,
                color: 'var(--blue)',
                textDecoration: 'underline',
              }}
            >
              元のリンクを開く →
            </a>
            <div className="divider" />
            <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>登録日：{pattern.registeredAt}</div>
          </Card>

          <div style={{ height: 18 }} />

          <Card title="提案資料への出力">
            <p style={{ fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.8, marginBottom: 14 }}>
              この型を、AIBP局の月次レポートと同じデザイントークン（紺×オレンジ、BIZ UDPゴシック、16:9）の
              1枚ものPPTXとして書き出せる。
            </p>
            <ExportPatternButton patternId={pattern.id} />
          </Card>
        </div>
      </div>
    </>
  );
}
