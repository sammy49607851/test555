import Link from 'next/link';
import { BrandMark } from '@/components/Chrome';
import { allPatterns } from '@/lib/data/patterns';
import { monthlyOverview, reportMonth } from '@/lib/data/competitive';

const PILLARS = [
  {
    href: '/competitive',
    no: '01',
    title: '競合の動きを把握する',
    tool: '競合インテリジェンス',
    desc: '電通・CA・アクセンチュア・PwC・海外勢・博報堂DYグループの当月の動きを、3軸採点（構造・影響・実務）に基づくランキングと事実整理で確認する。',
    metric: `${reportMonth}`,
    accent: '#1e3a5f',
  },
  {
    href: '/patterns',
    no: '02',
    title: '型を探す・積み上げる',
    tool: '型化ライブラリ',
    desc: '競合インテリジェンスで見つけた差分と、Notion得意先案件DB／型化ライブラリDBの新しい案件から抽出した「型」を横断的に検索・閲覧する。',
    metric: `${allPatterns.length}件の型を収録（ダミー）`,
    accent: '#f59e0b',
  },
];

export default function Portal() {
  return (
    <main>
      <div className="portal-topbar">
        <span className="portal-lockup">
          <BrandMark size={36} />
          <span>
            <div className="pl-name">AIBP CI &amp; PATTERN</div>
            <div className="pl-sub">競合インテリジェンス ・ 型化ライブラリ</div>
          </span>
        </span>
      </div>
      <div className="portal-hero">
        <div className="portal-hero-inner">
          <BrandMark size={66} />
          <span className="eyebrow" style={{ marginTop: 24 }}>
            AIBP局 · Competitive Intelligence &amp; Pattern Library
          </span>
          <h1 className="portal-title">AIBP CI &amp; PATTERN</h1>
          <p className="portal-tagline">競合の動きを追い、型に変え、次の提案に活かす。</p>
          <p className="portal-lead">
            月次の競合インテリジェンスで見えた差分と、得意先案件から見つけた新しさ・面白さ。
            <br />
            2つの入口から生まれる「型」を、1つのライブラリに蓄積する。
          </p>
        </div>
      </div>

      <div className="shell">
        <div className="kgi-strip">
          <div className="kgi-strip-h">
            今月のサマリー
            <span>{reportMonth}・デモ用ダミー値</span>
          </div>
          <div className="kgi-strip-grid">
            <div className="kgi-cell">
              <div className="kgi-cell-l">当月の収集件数</div>
              <div className="kgi-cell-v">
                {monthlyOverview.totalCount}
                <span>件</span>
              </div>
              <div className="kgi-cell-s">
                前月比 <b>+{monthlyOverview.prevMonthDelta}件</b>
              </div>
            </div>
            <div className="kgi-cell">
              <div className="kgi-cell-l">A判定（本編で扱う）</div>
              <div className="kgi-cell-v">
                {monthlyOverview.aCount}
                <span>件</span>
              </div>
              <div className="kgi-cell-s">一次ピックアップ50件のうち</div>
            </div>
            <div className="kgi-cell">
              <div className="kgi-cell-l">登録済みの型</div>
              <div className="kgi-cell-v">
                {allPatterns.length}
                <span>件</span>
              </div>
              <div className="kgi-cell-s">競合由来・自社案件由来の合計</div>
            </div>
            <div className="kgi-cell">
              <div className="kgi-cell-l">今月の幹トレンド</div>
              <div className="kgi-cell-v" style={{ fontSize: 15, lineHeight: 1.5 }}>
                {monthlyOverview.keyTrends[0]}
              </div>
            </div>
          </div>
        </div>

        <div className="section-label">2つの入口</div>
        <div className="grid g2 portal-grid">
          {PILLARS.map((p) => (
            <Link key={p.href} href={p.href} className="pillar-card">
              <div className="pillar-top">
                <span className="pillar-no" style={{ color: p.accent }}>
                  {p.no}
                </span>
                <span className="pillar-bar" style={{ background: p.accent }} />
              </div>
              <div className="pillar-title">{p.title}</div>
              <p className="pillar-desc">{p.desc}</p>
              <div className="pillar-foot">
                <span className="pillar-tool" style={{ color: p.accent, borderColor: p.accent }}>
                  {p.tool}
                </span>
                <span className="pillar-arrow">→</span>
              </div>
              <div style={{ marginTop: 10, fontSize: 12, color: 'var(--ink-3)' }}>{p.metric}</div>
            </Link>
          ))}
        </div>

        <div className="foot">
          <span>
            AIBP CI &amp; PATTERN — AIBP局向けプロトタイプ。データはすべてデモ用ダミー値です。Notion連携が有効化され次第、実データに接続します。
          </span>
        </div>
      </div>
    </main>
  );
}
