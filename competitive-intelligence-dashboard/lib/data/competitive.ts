// 競合インテリジェンス月次レポートの構成要素を再現したダミーデータ層。
// 将来的には月次で更新される一次ピックアップ50件シート（Excel）や
// Notion側の集計結果に差し替える想定。

export type RankingRow = {
  rank: number;
  company: string;
  group: 'dentsu' | 'ca' | 'other';
  medium: 'リリース' | '記事' | 'ウェビナー';
  date: string;
  title: string;
  structure: number; // 構造（10点満点）
  impact: number; // 影響（10点満点）
  practice: number; // 実務（10点満点）
};

export type CompanyMove = {
  company: string;
  group: 'dentsu' | 'ca' | 'other' | 'hdy';
  headline: string;
  facts: string[];
  diffNote: string; // 「！」欄：博報堂との差分
};

export type WorldTrend = {
  no: string;
  company: string;
  date: string;
  headline: string;
  body: string;
  source: string;
};

export const reportMonth = '2026年8月号（ダミー）';

export const monthlyOverview = {
  totalCount: 224,
  prevMonthDelta: 12,
  aCount: 25,
  bCount: 23,
  cCount: 2,
  keyTrends: [
    'エージェンティックコマース（AIが購買を代行する仕組み）の提供メニュー化が競合各社で進行',
    '1stパーティデータを類推でつなぐ「非直接突合型」のID連携が主流化',
    '診断・スコアリングを入口にした提案型のDX支援が増加',
  ],
};

export const ranking1: RankingRow[] = [
  { rank: 1, company: '電通デジタル', group: 'dentsu', medium: 'リリース', date: '2026/07/23', title: '生成AIを用いた購買予測モデルの提供開始', structure: 8, impact: 8, practice: 9 },
  { rank: 2, company: 'サイバーエージェント', group: 'ca', medium: 'リリース', date: '2026/07/18', title: '広告運用自動化とレポーティングの統合提供', structure: 7, impact: 8, practice: 8 },
  { rank: 3, company: '電通', group: 'dentsu', medium: '記事', date: '2026/07/15', title: 'People Fusion提供開始、類推型ID連携で配信最適化', structure: 9, impact: 8, practice: 7 },
  { rank: 4, company: 'CARTA ZERO', group: 'dentsu', medium: 'ウェビナー', date: '2026/07/10', title: 'グループ横断データ活用の運用体制刷新を解説', structure: 6, impact: 6, practice: 7 },
  { rank: 5, company: 'AJA', group: 'ca', medium: 'リリース', date: '2026/07/08', title: 'SNS発話分析AIの機能拡張', structure: 6, impact: 6, practice: 6 },
];

export const ranking2: RankingRow[] = [
  { rank: 1, company: 'アクセンチュア', group: 'other', medium: 'リリース', date: '2026/07/15', title: 'OpenAIと協業しDX成熟度診断メニューを提供開始', structure: 8, impact: 7, practice: 8 },
  { rank: 2, company: 'PwC', group: 'other', medium: '記事', date: '2026/07/20', title: '生成AIガバナンス支援サービスを拡充', structure: 6, impact: 6, practice: 7 },
  { rank: 3, company: 'トランスコスモス', group: 'other', medium: 'リリース', date: '2026/07/05', title: 'コンタクトセンターAI応対の対応言語拡大', structure: 5, impact: 5, practice: 6 },
];

export const ownTopics = [
  { date: '2026/07/07', headline: 'メディア環境研究所「情報行動7分類」を発表', desc: '生活者の情報行動を7つに分類し、AI活用文脈での接点設計に活用できる指標を提示。', highlighted: true, ref: '特集①（p.16）' },
  { date: '2026/06/02', headline: '買物研究所「AIショッパー調査」を発表', desc: '買物における生成AI利用率24.6%、信頼度51.7%等の実態調査。', highlighted: true, ref: '特集②（p.17）' },
  { date: '2026/07/15', headline: 'Agentic Commerce ONE クレデンシャルを更新', desc: '対話型購買支援エージェントの提供メニューを刷新。', highlighted: true, ref: '特集③（p.18）' },
  { date: '2026/07/29', headline: 'DATA GEAR Enrichment 導入事例を追加公開', desc: '1stパーティデータへの生活者データエンリッチメント提案の実績を紹介。', highlighted: false, ref: '―' },
];

export const companyMoves: CompanyMove[] = [
  {
    company: '電通・電通デジタル・CARTA ZERO',
    group: 'dentsu',
    headline: 'データ関連の発表が集中。類推型ID連携での配信最適化を前面に。',
    facts: [
      '7/23 電通デジタルが生成AIを用いた購買予測モデルを提供開始（同社公表値で精度は非開示）',
      '7/15 電通がPeople Fusionを提供開始。ゲート・ワン（ファミマTV）、Google、ドコモ等の外部データを類推でつなぐ',
      '7/10 CARTA ZEROがグループ横断データ活用の運用体制刷新をウェビナーで解説',
    ],
    diffNote:
      '同じ領域にあるのは博報堂のDATA GEAR Enrichment（1stパーティデータへの生活者データ付与）で、どちらもIDを直接突合しない類推型という点は共通する。違うのは出口で、博報堂は顧客理解までを担うのに対し、People Fusionは配信・効果検証まで含む。データ整理の入口から検証まで続けて受注されやすい一方、HABIT（約7,000人×約1,700項目）とQueridaで「なぜ買うのか」を根拠づけられる点は博報堂の側にある。',
  },
  {
    company: 'サイバーエージェント・AJA',
    group: 'ca',
    headline: '運用自動化と周辺工程（レポーティング・SNS分析）を束ねる動き。',
    facts: [
      '7/18 サイバーエージェントが広告運用の自動化とレポーティングを統合提供',
      '7/8 AJAがSNS発話分析AIの機能を拡張し、対応プラットフォームを拡大',
    ],
    diffNote:
      '運用自動化そのものは差別化点になりにくくなっており、前後工程を束ねてワンストップ化している点が受注の決め手になっている。博報堂DY ONEの運用実績を前提とした提案でも、周辺工程まで一体化したメニューとして見せられているかは公表資料からは確認できない。',
  },
  {
    company: 'アクセンチュア×OpenAI',
    group: 'other',
    headline: '診断・スコアリングを入口にしたDX支援メニューを拡充。',
    facts: [
      '7/15 アクセンチュアがOpenAIと協業し、DX成熟度診断メニューを提供開始',
      '診断は5要素（ブランド戦略15点／システム機能・実行層30点／システム機能・データ層30点／ガバナンス・運用体制10点／外部AI露出15点、合計100点）で評価',
    ],
    diffNote:
      '配点の重みづけ（システム機能・データ層に重点）に相手の狙いが表れている。同種の診断ツールを自社が持たない場合、初回提案の「会話の入口」を先に取られる可能性がある。',
  },
];

export const worldTrends: WorldTrend[] = [
  {
    no: '01',
    company: 'WPP',
    date: '2026/07/01',
    headline: 'エージェンティックコマースを正式な提供メニューに追加',
    body: '対話型AIによる購買代行を、PoCではなく提供メニューとして対外的に発表。ACO（自社）の7/7発表より6日早い。',
    source: 'WPP公式リリース（2026/7/1）',
  },
  {
    no: '02',
    company: 'Amazon',
    date: '2026/06/24',
    headline: 'Alexa+ の広告連携機能を拡充',
    body: '音声アシスタント経由の商品推薦に広告枠を統合。実装範囲・精度は非開示。',
    source: 'Amazon公式発表（2026/6/24）',
  },
  {
    no: '03',
    company: 'Jellyfish',
    date: '2026/06/25',
    headline: 'AI活用の広告運用に関する調査を公表',
    body: 'グローバル企業のAI活用実態調査。生成AIの活用が「実験段階」にとどまる企業が過半数という結果。',
    source: 'Jellyfish調査レポート（2026/6/25）',
  },
  {
    no: '04',
    company: 'Publicis',
    date: '2026/07/09',
    headline: '生成AIクリエイティブ制作基盤の対応言語を拡大',
    body: '多言語クリエイティブ生成の対応範囲を拡大したと発表。効果検証の指標は非開示。',
    source: 'Publicis公式リリース（2026/7/9）',
  },
];
