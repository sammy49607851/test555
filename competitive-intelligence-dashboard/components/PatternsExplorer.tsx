'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Pattern } from '@/lib/data/patterns';

const sourceLabel: Record<string, string> = {
  competitive: '競合事例',
  client_case: '自社案件',
};
const sourceColor: Record<string, string> = {
  competitive: '#1e3a5f',
  client_case: '#00b050',
};

export default function PatternsExplorer({ patterns }: { patterns: Pattern[] }) {
  const [q, setQ] = useState('');
  const [source, setSource] = useState<'all' | 'competitive' | 'client_case'>('all');
  const [industry, setIndustry] = useState<string>('all');

  const industries = useMemo(
    () => Array.from(new Set(patterns.map((p) => p.industry))).sort(),
    [patterns]
  );

  const filtered = patterns.filter((p) => {
    if (source !== 'all' && p.sourceType !== source) return false;
    if (industry !== 'all' && p.industry !== industry) return false;
    if (q.trim()) {
      const hay = `${p.name} ${p.summary} ${p.scenes.join(' ')} ${p.sourceName}`.toLowerCase();
      if (!hay.includes(q.trim().toLowerCase())) return false;
    }
    return true;
  });

  return (
    <>
      <div className="grid g3" style={{ marginBottom: 22, alignItems: 'end' }}>
        <div>
          <span className="field-label">キーワード検索</span>
          <input
            className="sel"
            style={{ width: '100%' }}
            placeholder="型の名前・要約・適用場面で検索"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div>
          <span className="field-label">出典タイプ</span>
          <div className="seg">
            <button className={source === 'all' ? 'on' : ''} onClick={() => setSource('all')}>
              すべて
            </button>
            <button className={source === 'competitive' ? 'on' : ''} onClick={() => setSource('competitive')}>
              競合事例
            </button>
            <button className={source === 'client_case' ? 'on' : ''} onClick={() => setSource('client_case')}>
              自社案件
            </button>
          </div>
        </div>
        <div>
          <span className="field-label">業種</span>
          <select className="sel" style={{ width: '100%' }} value={industry} onChange={(e) => setIndustry(e.target.value)}>
            <option value="all">すべての業種</option>
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="card-note" style={{ marginBottom: 14 }}>
        {filtered.length}件 / 全{patterns.length}件
      </div>

      <div className="grid g3">
        {filtered.map((p) => (
          <Link key={p.id} href={`/patterns/${p.id}`} className="card" style={{ display: 'block' }}>
            <div className="card-pad">
              <div className="card-h">
                <span className="tag" style={{ color: sourceColor[p.sourceType], borderColor: sourceColor[p.sourceType] }}>
                  {sourceLabel[p.sourceType]}
                </span>
                <span className="tag">{p.industry}</span>
              </div>
              <div style={{ fontWeight: 800, fontSize: 15.5, color: 'var(--ink)', lineHeight: 1.5 }}>{p.name}</div>
              <div style={{ fontSize: 12.5, color: 'var(--ink-2)', marginTop: 8, lineHeight: 1.7 }}>{p.summary}</div>
              <div className="pill-row" style={{ marginTop: 12 }}>
                {p.scenes.slice(0, 2).map((s) => (
                  <span key={s} className="pill">
                    {s}
                  </span>
                ))}
              </div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 12 }}>出典：{p.sourceName}</div>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="card card-pad" style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--ink-3)' }}>
            条件に一致する型が見つかりませんでした。
          </div>
        )}
      </div>
    </>
  );
}
