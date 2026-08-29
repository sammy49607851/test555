// 型化ライブラリのデータアクセス層。
// 現在はダミーデータを返すだけだが、将来 Notion の
// 「得意先案件DB」「型化ライブラリ（AIBP局）」DB と接続する際は
// この getPatterns() の中身を Notion API 呼び出しに差し替えるだけで済むようにしてある。
// （呼び出し側 = app/(dash)/patterns/** は Pattern 型としてしか触らない）

export type PatternSourceType = 'competitive' | 'client_case';

export type Pattern = {
  id: string;
  name: string; // 型の名前
  summary: string; // 一行要約
  scenes: string[]; // 適用場面
  sourceType: PatternSourceType; // 出典タイプ：競合事例 or 自社案件
  sourceName: string; // 出典名（競合会社名 or 得意先・案件名）
  sourceUrl: string; // 元のリンク（Notionページ／競合リリースURL等）
  industry: string; // 業種
  differentiation: string; // 博報堂との差分／新しさの言語化
  horizontalIdeas: string[]; // 他の案件への水平展開アイデア
  registeredAt: string; // 登録日 YYYY-MM-DD
  relatedMonth?: string; // 競合由来の場合、元になった月次レポートの月
};

// ---- 競合インテリジェンス由来の型（月次レポートの「！」欄の蓄積） ----
const competitivePatterns: Pattern[] = [
  {
    id: 'cp-001',
    name: '類推型ID連携×配信一気通貫',
    summary: '直接IDを突合せず類推でつなぎ、そのまま配信・効果検証まで一気通貫で受注する型。',
    scenes: ['1stパーティデータ活用の提案', 'CDP導入直後の得意先', 'データ資産が薄い得意先'],
    sourceType: 'competitive',
    sourceName: 'People Fusion（電通グループ）',
    sourceUrl: 'https://www.notion.so/aibp/competitive-2026-07-people-fusion',
    industry: '業種横断',
    differentiation:
      '博報堂DATA GEAR Enrichmentは顧客理解までを担うのに対し、この型は配信・効果検証まで含めて受注される。データ整理の入口から配信・検証まで切れ目なく取ることで、後工程の受注機会を先に握られる。',
    horizontalIdeas: [
      'DATA GEAR Enrichmentの出口を配信・効果検証まで拡張し、同じ切れ目のなさを作る',
      '自社パネル（HABIT等）を「なぜ買うのか」の根拠付けとして配信提案に組み込む',
    ],
    registeredAt: '2026-08-05',
    relatedMonth: '2026年7月号',
  },
  {
    id: 'cp-002',
    name: '運用自動化の周辺工程まとめ売り',
    summary: '広告運用の自動化そのものより、前後の周辺工程（クリエイティブ生成・レポーティング）を束ねて提案する型。',
    scenes: ['運用型広告の内製化支援', '複数媒体の統合レポーティング提案'],
    sourceType: 'competitive',
    sourceName: 'サイバーエージェント',
    sourceUrl: 'https://www.notion.so/aibp/competitive-2026-07-ca-automation',
    industry: '業種横断',
    differentiation:
      '運用の自動化そのものは差別化点になりにくくなっているため、前後工程（素材生成・レポート）まで束ねてワンストップ化している点が受注の決め手になっている。',
    horizontalIdeas: [
      '博報堂側も運用+クリエイティブ生成+レポーティングの3点セット提案フォーマットを型化する',
      '得意先の運用内製化支援メニューとして、移行期の伴走部分を明示的に商品化する',
    ],
    registeredAt: '2026-08-05',
    relatedMonth: '2026年7月号',
  },
  {
    id: 'cp-003',
    name: '診断×スコアリングで現状可視化してから提案',
    summary: '得意先のDX成熟度を独自スコア（100点満点等）で可視化し、伸びしろを起点に提案する型。',
    scenes: ['DX推進部門への最初のアプローチ', '中期経営計画とのすり合わせ'],
    sourceType: 'competitive',
    sourceName: 'アクセンチュア×OpenAI',
    sourceUrl: 'https://www.notion.so/aibp/competitive-2026-07-accenture-openai',
    industry: '業種横断',
    differentiation:
      '配点の重みづけ（システム機能・データ層に重点を置く等）に相手の狙いが表れる。同種の診断ツールを持たない場合、まず「診断」という会話の入口を奪われる。',
    horizontalIdeas: [
      'AIBP局として業種別の簡易診断シート（ヒアリング10問＋レーダーチャート）を型化し、初回提案の共通ツールにする',
    ],
    registeredAt: '2026-08-06',
    relatedMonth: '2026年7月号',
  },
  {
    id: 'cp-004',
    name: 'エージェンティックコマースの提供メニュー化',
    summary: 'AIエージェント経由の購買導線を単発PoCではなく「提供メニュー」として掲げ、対外的に旗を立てる型。',
    scenes: ['ECサイトを持つ得意先へのAI活用提案', '中長期のコマース戦略協議'],
    sourceType: 'competitive',
    sourceName: 'WPP',
    sourceUrl: 'https://www.notion.so/aibp/competitive-2026-07-wpp-agentic-commerce',
    industry: '小売・EC',
    differentiation:
      '海外大手が先にメニュー化を発表しており、公表の早さそのものが商談の起点になっている。自社のAgentic Commerce ONEも同種の狙いを持つため、対外発信のタイミングを比較検証する必要がある型。',
    horizontalIdeas: [
      '自社の新メニューも「PoC」ではなく「提供メニュー」として先に旗を立てる発信フォーマットを型化する',
    ],
    registeredAt: '2026-08-06',
    relatedMonth: '2026年7月号',
  },
  {
    id: 'cp-005',
    name: '自社パネル基点の「なぜ買うか」根拠付け',
    summary: '大規模自社パネル（意識×行動データ）を根拠に、購買理由の説明力で差別化する型。',
    scenes: ['商品開発・マーケティング戦略への提言', '得意先の意思決定層への説得材料'],
    sourceType: 'competitive',
    sourceName: '博報堂買物研究所（自社トピック）',
    sourceUrl: 'https://www.notion.so/aibp/competitive-2026-06-aishopper',
    industry: '消費財全般',
    differentiation:
      '競合が配信・実行力で先行する場面でも、「なぜ買うのか」を説明できる自社パネル（HABIT約7,000人×約1,700項目、Querida等）は競合が公表していない強み。ただし発表の早さでは負けることがあるため、定点調査の発表タイミングも型として運用する。',
    horizontalIdeas: [
      '自社パネルの定点調査を四半期ごとに「発表する」運用リズムに型化し、先出しを恒常化する',
    ],
    registeredAt: '2026-08-07',
    relatedMonth: '2026年6月号',
  },
  {
    id: 'cp-006',
    name: '系譜の年表化による新規性の見極め',
    summary: '新製品発表を単独で見ず、その会社の過去の基盤の延長線上に位置づけて評価する型。',
    scenes: ['競合の新製品発表への反応検討', '得意先から「競合の新サービスをどう見るか」と聞かれた時'],
    sourceType: 'competitive',
    sourceName: '電通グループ（People Driven Marketing系譜）',
    sourceUrl: 'https://www.notion.so/aibp/competitive-2026-07-lineage',
    industry: '業種横断',
    differentiation:
      '2017年からのデータ基盤の延長線上にあるものを「新規参入」と見誤ると、対応の優先順位を誤る。系譜を年表化して初めて「作り直し」なのか「新規」なのかを判断できる。',
    horizontalIdeas: [
      '主要競合5社について自社基盤の系譜年表を常設で更新し、新製品発表のたびに位置づけを即答できるようにする',
    ],
    registeredAt: '2026-08-07',
    relatedMonth: '2026年7月号',
  },
];

// ---- Notion「得意先案件DB」「型化ライブラリ（AIBP局）」由来の型 ----
const clientCasePatterns: Pattern[] = [
  {
    id: 'cc-001',
    name: 'AIパーソナライズ×店頭体験の融合型',
    summary: 'ECの購買データをAIで解析し、店頭の接客トークにその場で反映させる型。',
    scenes: ['D2Cブランドの店頭連携', 'OMO施策の起点提案'],
    sourceType: 'client_case',
    sourceName: '得意先案件：化粧品ブランドA社 店頭AIレコメンド',
    sourceUrl: 'https://www.notion.so/aibp/case-cosmetics-a-omo',
    industry: '化粧品',
    differentiation:
      '競合の同種提案はEC内で完結するものが多く、店頭スタッフの接客言語にまで落とし込んだ事例は少ない。「使えるデータ」から「使える接客トーク」への翻訳工程を型として持つのが新しさ。',
    horizontalIdeas: ['住宅の展示場接客トークへの応用', '自動車ディーラーの試乗接客への応用'],
    registeredAt: '2026-07-10',
  },
  {
    id: 'cc-002',
    name: '生活者データ起点のカテゴリー再定義',
    summary: '既存の商品カテゴリーの枠を外し、生活者の利用文脈でカテゴリーを再定義してから広告設計する型。',
    scenes: ['成熟カテゴリーでの新規需要創出', 'カテゴリーエントリーポイント(CEP)の再設計'],
    sourceType: 'client_case',
    sourceName: '得意先案件：食品メーカーB社 新カテゴリー創出',
    sourceUrl: 'https://www.notion.so/aibp/case-food-b-category',
    industry: '食品',
    differentiation:
      '競合はスペック訴求の延長で終わることが多いが、この案件は生活者の利用シーン言語から逆算してカテゴリー名自体を作った点が他にない新しさ。',
    horizontalIdeas: ['自動車のコンクエスト施策（CEPジャーニー設計）への転用', '金融商品の新カテゴリー命名への応用'],
    registeredAt: '2026-07-12',
  },
  {
    id: 'cc-003',
    name: 'バーチャル生活者による事前定性検証',
    summary: 'AIペルソナに配信前クリエイティブを見せ、購入しない理由を先回りでヒアリングする型。',
    scenes: ['クリエイティブの事前検証', 'グルインの代替・補完'],
    sourceType: 'client_case',
    sourceName: '型化ライブラリ：バーチャル生活者インタビュー標準型',
    sourceUrl: 'https://www.notion.so/aibp/library-virtual-resident-interview',
    industry: '業種横断',
    differentiation:
      '競合のAI活用は分析・予測が中心で、定性的な「買わなかった理由」の言語化まで踏み込む事例は確認できていない。実施までのリードタイムを圧縮できる点も差分。',
    horizontalIdeas: ['金融商品の説明文言の事前検証', '自治体広報のメッセージ事前検証'],
    registeredAt: '2026-07-15',
  },
  {
    id: 'cc-004',
    name: '関係人口KGIのファネル型可視化',
    summary: '購買ではなく「関係人口」を KGI に置き、認知→交流→継続のファネルで自治体施策を可視化する型。',
    scenes: ['自治体・公共案件のKPI設計', '非購買KGIの合意形成'],
    sourceType: 'client_case',
    sourceName: '得意先案件：自治体C 関係人口ダッシュボード',
    sourceUrl: 'https://www.notion.so/aibp/case-public-c-kgi',
    industry: '公共・自治体',
    differentiation:
      '民間の購買ファネルをそのまま持ち込むと自治体には刺さらないため、寄付・移住・交流人口といった非購買KGIに専用のファネルを作った点が新しい。',
    horizontalIdeas: ['NPO・寄付団体の支援者育成ファネルへの転用', 'BtoB SaaSのリード育成ファネルの語彙変換'],
    registeredAt: '2026-07-18',
  },
  {
    id: 'cc-005',
    name: 'エージェント型対話コマースのデモ実演',
    summary: '対話AIが要件を聞き取り、商品選定から決済代行まで自動再生で見せる提案デモの型。',
    scenes: ['大型競合提案の目玉デモ', 'コマース戦略の説得材料'],
    sourceType: 'client_case',
    sourceName: '型化ライブラリ：Agentic Commerceデモ標準型',
    sourceUrl: 'https://www.notion.so/aibp/library-agentic-commerce-demo',
    industry: '小売・EC',
    differentiation:
      '競合が「エージェンティックコマース」を言葉として掲げるにとどまる中、実際に動く対話デモまで用意して見せている点が実務上の差。得意先の意思決定を「話ではなく画面」で進められる。',
    horizontalIdeas: ['車内エージェント（自動車）のデモへの型流用', '法人向けFAQデモへの型流用'],
    registeredAt: '2026-07-20',
  },
  {
    id: 'cc-006',
    name: '3D可視化によるデータ基盤の説明簡略化',
    summary: '複雑なデータ統合構成をThree.jsの3D空間（コア＋ノード＋粒子フロー）で直感的に見せる型。',
    scenes: ['データ基盤・CDP構想の説明', '経営層向けの技術説明の翻訳'],
    sourceType: 'client_case',
    sourceName: '型化ライブラリ：AIオーケストレーション3D標準型',
    sourceUrl: 'https://www.notion.so/aibp/library-3d-orchestration',
    industry: '業種横断',
    differentiation:
      '競合の技術資料は図解が静的なポンチ絵にとどまることが多く、触って動かせる3D説明資料を提案時点で用意する事例は少ない。理解速度と印象の両方で差がつく。',
    horizontalIdeas: ['通信キャリアの回線網説明への応用', '金融のポイント経済圏の説明への応用'],
    registeredAt: '2026-07-22',
  },
  {
    id: 'cc-007',
    name: '採用×AI診断による人材マッチング型',
    summary: '応募者の価値観をAI診断で可視化し、企業文化とのマッチングスコアを提示する型。',
    scenes: ['HR・採用領域の新規提案', '人手不足業種への打ち手'],
    sourceType: 'client_case',
    sourceName: '得意先案件：人材サービスD社 価値観マッチング診断',
    sourceUrl: 'https://www.notion.so/aibp/case-hr-d-matching',
    industry: 'BtoB・HR',
    differentiation:
      '一般的な適性診断はスキル・経歴中心だが、価値観の言語化まで踏み込みマッチングスコアとして返す点が新しい。職業安定法上の表示配慮も型の中に組み込んでいる。',
    horizontalIdeas: ['住宅業界の工務店採用支援への転用', '自治体の移住者マッチングへの転用'],
    registeredAt: '2026-07-25',
  },
];

export const allPatterns: Pattern[] = [...competitivePatterns, ...clientCasePatterns];

export async function getPatterns(): Promise<Pattern[]> {
  // TODO: Notion連携が有効化されたら、ここを
  //   得意先案件DB + 型化ライブラリ（AIBP局）DB への問い合わせに差し替える。
  return allPatterns;
}

export async function getPatternById(id: string): Promise<Pattern | undefined> {
  const list = await getPatterns();
  return list.find((p) => p.id === id);
}

export function uniqueIndustries(list: Pattern[]): string[] {
  return Array.from(new Set(list.map((p) => p.industry))).sort();
}

export function uniqueScenes(list: Pattern[]): string[] {
  return Array.from(new Set(list.flatMap((p) => p.scenes))).sort();
}
