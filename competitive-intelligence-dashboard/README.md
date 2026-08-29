# AIBP CI & PATTERN — 競合インテリジェンス & 型化ライブラリ ダッシュボード

AIBP局向けのプロトタイプ。Next.js 14 + Recharts + pptxgenjs。Basic認証つき。

## 構成（2ピラー）

| ピラー | パス | 内容 |
|---|---|---|
| 競合インテリジェンス | `/competitive` | 月次レポートの構成要素（今月の全体像／ランキング①電通・CA／ランキング②それ以外の競合／今月の博報堂DYグループ主要トピック／各社の動き／世界の潮流）をダッシュボード化 |
| 型化ライブラリ | `/patterns`, `/patterns/[id]` | 「型（パターン）」を検索・閲覧。出典タイプ（競合事例／自社案件）・業種で絞り込み。詳細ページからPPTX（1枚もの、月次レポートと同じデザイントークン）を書き出せる |

型化には2つの入口がある。
1. **競合由来**：競合インテリジェンス月次レポートの「！」欄（博報堂との差分）を書く中で見つかったパターン
2. **自社案件由来**：Notion「得意先案件DB」「型化ライブラリ（AIBP局）」DBにある案件から、新しさ・面白さのあるものを抽出したパターン

## データについて（現状はダミー）

このセッションではNotion連携がチャットで有効化されていなかったため、`lib/data/patterns.ts` と
`lib/data/competitive.ts` はすべて決定論的なダミーデータを返す。

Notion連携が有効化されたら、以下の関数の中身をNotion API呼び出しに差し替えるだけでよいように
データアクセス層を分離してある。呼び出し側（ページコンポーネント）は `Pattern` / 各種型にしか依存しない。

- `lib/data/patterns.ts` の `getPatterns()` / `getPatternById()`
  → Notion「得意先案件DB」「型化ライブラリ（AIBP局）」DBへの問い合わせに置き換える
- `lib/data/competitive.ts` の各定数（`ranking1`, `ranking2`, `companyMoves` など）
  → 月次の一次ピックアップ50件シートやNotion側の集計結果に置き換える

## セットアップ

```bash
npm install
npm run dev      # http://localhost:3000  (Basic認証 aibp/aibp。環境変数 BASIC_AUTH_USER / BASIC_AUTH_PASS で変更可)
npm run build && npm run start
```

## PPTXエクスポート

型化ライブラリの詳細ページ（`/patterns/[id]`）の「この型をPPTXで書き出す」ボタンから、
`POST /api/export-pattern` を叩いて1枚もののPPTXをダウンロードできる。
デザイントークンは AIBP局 競合インテリジェンス月次レポート（`competitive-intel-report` スキルの
`references/design-system.md`）に準拠（紺 `1E3A5F`・オレンジ `F59E0B`・BIZ UDPゴシック・16:9）。

このサンドボックス環境ではLibreOffice(soffice)のheadless変換が動作しないPPTX/PDF変換ができず
（既知の環境問題。スキル同梱の検証済みPPTXでも同じエラーが再現するため、生成物固有の問題ではない）、
PDF化しての目視確認は行えていない。生成物自体は以下で確認済み：

- APIが200を返しContent-Typeが正しいこと
- 出力zipが破損していないこと（`zipfile.testzip()`）、`[Content_Types].xml` を含むこと
- スライドXML（`ppt/slides/slide1.xml`）が整形式（well-formed）であること

実運用に入れる前に、実際のPowerPoint／スマホアプリで開けるか一度確認することを推奨する。

## 関連ドキュメント

- `../competitive-intelligence/docs/process-guide.md` … 競合インテリジェンス月次レポートの業務プロセス型化ガイド（収集→3軸採点→事実確認→制作→検証→納品）
