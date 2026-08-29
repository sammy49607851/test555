'use client';
import React from 'react';

export function Card({
  title,
  note,
  tag,
  tagClass,
  children,
  className = '',
  pad = true,
}: {
  title?: string;
  note?: string;
  tag?: string;
  tagClass?: string;
  children: React.ReactNode;
  className?: string;
  pad?: boolean;
}) {
  return (
    <div className={`card ${className}`}>
      <div className={pad ? 'card-pad' : ''}>
        {(title || tag) && (
          <div className="card-h">
            <div>
              {title && <div className="card-title">{title}</div>}
              {note && <div className="card-note">{note}</div>}
            </div>
            {tag && <span className={`tag ${tagClass || ''}`}>{tag}</span>}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

export function Stat({
  label,
  value,
  unit,
  delta,
  deltaDir = 'flat',
  sub,
  progress,
}: {
  label: string;
  value: string | number;
  unit?: string;
  delta?: string;
  deltaDir?: 'up' | 'down' | 'flat';
  sub?: string;
  progress?: number;
}) {
  return (
    <div className="card stat">
      <div className="stat-label">{label}</div>
      <div className="stat-val">
        {value}
        {unit && <span className="unit">{unit}</span>}
      </div>
      <div className="stat-sub">
        {delta && <span className={`delta ${deltaDir}`}>{delta}</span>}
        {sub && <span>{sub}</span>}
      </div>
      {progress !== undefined && (
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${Math.min(100, progress)}%` }} />
        </div>
      )}
    </div>
  );
}

// AIBP局レポートのデザイントークンに準拠した配色（紺×オレンジ、readable on white）
export const C = {
  amber: '#f59e0b',   // primary accent（小見出しオレンジ）
  amber2: '#d97706',  // secondary highlight（論点ページの上罫オレンジ）
  oak: '#1e3a5f',     // 紺（メインカラー）
  sage: '#2e9e5b',    // CA系グリーン
  rust: '#c0774e',
  blue: '#1561a7',    // 電通・CA・アクセンチュア チップ色
  plum: '#8a6b9e',
  green: '#00b050',   // 博報堂DYチップ色
  red: '#cf6b5e',
  grid: '#d9e1ec',    // light grid
  ink3: '#64748b',
};

export function fmt(n: number) {
  return n.toLocaleString('en-US');
}
