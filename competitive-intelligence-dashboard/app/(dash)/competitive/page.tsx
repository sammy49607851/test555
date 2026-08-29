'use client';
import { PageHead } from '@/components/Chrome';
import { Card } from '@/components/ui';
import {
  reportMonth,
  monthlyOverview,
  ranking1,
  ranking2,
  ownTopics,
  companyMoves,
  worldTrends,
  RankingRow,
} from '@/lib/data/competitive';

const groupColor: Record<string, string> = {
  dentsu: '#1561a7',
  ca: '#2e9e5b',
  other: '#64748b',
  hdy: '#00b050',
};

function RankingTable({ rows, caption }: { rows: RankingRow[]; caption: string }) {
  return (
    <Card title={caption} note="構造・影響・実務の3軸×各10点＝30点満点。A判定（20点以上）が対象。">
      <table className="tbl">
        <thead>
          <tr>
            <th>順位</th>
            <th>会社</th>
            <th>媒体</th>
            <th>日付</th>
            <th>タイトル</th>
            <th className="num">構造</th>
            <th className="num">影響</th>
            <th className="num">実務</th>
            <th className="num">計</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.rank}>
              <td>{r.rank}</td>
              <td>
                <span className="dot" style={{ background: groupColor[r.group] }} />
                {r.company}
              </td>
              <td>{r.medium}</td>
              <td>{r.date}</td>
              <td style={{ fontWeight: r.rank <= 3 ? 700 : 400 }}>{r.title}</td>
              <td className="num">{r.structure}</td>
              <td className="num">{r.impact}</td>
              <td className="num">{r.practice}</td>
              <td className="num" style={{ fontWeight: 700 }}>
                {r.structure + r.impact + r.practice}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="card-note" style={{ marginTop: 12 }}>
        点数はAIによる一次評価の目安。最終的な重要度・順位・掲載可否は局長を含むメンバーで決定する。
      </div>
    </Card>
  );
}

export default function CompetitivePage() {
  return (
    <>
      <PageHead
        eyebrow="AIBP局 Intelligence"
        title="競合インテリジェンス"
        desc={`${reportMonth}の競合各社の動きを、収集→3軸採点（A/B/C判定）→事実整理のプロセスに沿って可視化する。博報堂・博報堂DYグループはランキング対象に含めない。`}
      />

      <div className="section-label">今月の全体像</div>
      <div className="grid g4">
        <div className="card stat">
          <div className="stat-label">収集件数</div>
          <div className="stat-val">
            {monthlyOverview.totalCount}
            <span className="unit">件</span>
          </div>
          <div className="stat-sub">
            <span className="delta up">+{monthlyOverview.prevMonthDelta}</span>
            <span>前月比</span>
          </div>
        </div>
        <div className="card stat">
          <div className="stat-label">A判定（本編掲載）</div>
          <div className="stat-val">
            {monthlyOverview.aCount}
            <span className="unit">件</span>
          </div>
          <div className="stat-sub">
            <span>50件中・20点以上</span>
          </div>
        </div>
        <div className="card stat">
          <div className="stat-label">B判定（アペンディクス）</div>
          <div className="stat-val">
            {monthlyOverview.bCount}
            <span className="unit">件</span>
          </div>
          <div className="stat-sub">
            <span>12〜19点</span>
          </div>
        </div>
        <div className="card stat">
          <div className="stat-label">C判定（記録のみ）</div>
          <div className="stat-val">
            {monthlyOverview.cCount}
            <span className="unit">件</span>
          </div>
          <div className="stat-sub">
            <span>11点以下</span>
          </div>
        </div>
      </div>

      <Card title="今月の幹トレンド" className="col-span-2" pad>
        <ul style={{ paddingLeft: 18, lineHeight: 1.9, fontSize: 13.5, color: 'var(--ink-2)' }}>
          {monthlyOverview.keyTrends.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </Card>

      <div className="section-label">ランキング</div>
      <div className="grid g2">
        <RankingTable rows={ranking1} caption="ランキング① 電通・サイバーエージェント" />
        <RankingTable rows={ranking2} caption="ランキング② 電通・CA以外の競合" />
      </div>

      <div className="section-label">今月の博報堂DYグループ 主要トピック</div>
      <Card pad>
        {ownTopics.map((t, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              gap: 16,
              alignItems: 'flex-start',
              padding: '14px 0',
              borderBottom: i === ownTopics.length - 1 ? 'none' : '1px solid var(--line-soft)',
            }}
          >
            <span
              className="tag"
              style={{
                background: t.highlighted ? 'rgba(0,176,80,.12)' : 'var(--panel-3)',
                color: t.highlighted ? '#00854a' : 'var(--ink-3)',
                borderColor: t.highlighted ? 'rgba(0,176,80,.3)' : 'var(--line)',
                flex: '0 0 auto',
              }}
            >
              {t.date}
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)' }}>{t.headline}</div>
              <div style={{ fontSize: 12.5, color: 'var(--ink-2)', marginTop: 4 }}>{t.desc}</div>
            </div>
            <span className="tag" style={{ flex: '0 0 auto' }}>
              {t.ref}
            </span>
          </div>
        ))}
      </Card>

      <div className="section-label">各社の動き</div>
      <div className="grid g3">
        {companyMoves.map((m) => (
          <Card key={m.company} title={m.company} tag={m.group.toUpperCase()}>
            <div style={{ fontWeight: 700, fontSize: 13.5, color: 'var(--ink)', marginBottom: 10 }}>{m.headline}</div>
            <ul style={{ paddingLeft: 16, fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.8, marginBottom: 14 }}>
              {m.facts.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
            <div
              style={{
                background: 'var(--panel-3)',
                border: '1px solid var(--line-soft)',
                borderRadius: 10,
                padding: '10px 12px',
                fontSize: 12,
                color: 'var(--ink-2)',
                lineHeight: 1.7,
              }}
            >
              <span style={{ fontWeight: 800, color: 'var(--amber-2)' }}>！ </span>
              {m.diffNote}
            </div>
          </Card>
        ))}
      </div>

      <div className="section-label">世界の潮流</div>
      <div className="grid g4">
        {worldTrends.map((w) => (
          <Card key={w.no} tag={w.date}>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--oak)', marginBottom: 6 }}>{w.no}</div>
            <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--ink)' }}>{w.company}</div>
            <div style={{ fontSize: 12.5, color: 'var(--ink)', margin: '6px 0', fontWeight: 600 }}>{w.headline}</div>
            <div style={{ fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.7 }}>{w.body}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 10, borderTop: '1px solid var(--line-soft)', paddingTop: 8 }}>
              出所：{w.source}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
