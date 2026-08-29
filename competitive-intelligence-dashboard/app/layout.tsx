import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AIBP CI & PATTERN INTELLIGENCE',
  description: 'AIBP局 競合インテリジェンス & 型化ライブラリ ダッシュボード',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
