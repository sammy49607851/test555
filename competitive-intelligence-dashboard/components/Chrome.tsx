'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const PILLARS = [
  { href: '/competitive', no: '01', label: '競合インテリジェンス' },
  { href: '/patterns', no: '02', label: '型化ライブラリ' },
];

export function BrandMark({ size = 34 }: { size?: number }) {
  return (
    <div
      className="brand-mark"
      style={{ width: size, height: size, fontSize: size * 0.42 }}
    >
      AI
    </div>
  );
}

export function TopBar() {
  const path = usePathname();
  return (
    <div className="topbar">
      <div className="topbar-inner">
        <Link href="/" className="brand">
          <BrandMark size={34} />
          <div>
            <div className="brand-name">AIBP CI &amp; PATTERN</div>
            <div className="brand-sub">競合インテリジェンス ・ 型化ライブラリ</div>
          </div>
        </Link>
        <nav className="topnav">
          {PILLARS.map((p) => (
            <Link key={p.href} href={p.href} className={path?.startsWith(p.href) ? 'active' : ''}>
              {p.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

export function PageHead({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="page-head">
      <span className="eyebrow">{eyebrow}</span>
      <h1 className="page-title">{title}</h1>
      <p className="page-desc">{desc}</p>
    </div>
  );
}

export function Foot() {
  return (
    <div className="foot">
      <span>
        AIBP局 競合インテリジェンス &amp; 型化ライブラリ ダッシュボード（プロトタイプ）。データはすべてデモ用ダミー値です。
      </span>
    </div>
  );
}
