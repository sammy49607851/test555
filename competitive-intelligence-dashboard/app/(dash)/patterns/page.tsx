import { PageHead } from '@/components/Chrome';
import { getPatterns } from '@/lib/data/patterns';
import PatternsExplorer from '@/components/PatternsExplorer';

export default async function PatternsPage() {
  const patterns = await getPatterns();
  return (
    <>
      <PageHead
        eyebrow="AIBP局 Pattern Library"
        title="型化ライブラリ"
        desc="競合インテリジェンスで見つけた博報堂との差分と、Notion得意先案件DB／型化ライブラリ（AIBP局）DBから抽出した新しさ・面白さのある案件。2つの入口から蓄積された「型」を検索・閲覧できる。"
      />
      <PatternsExplorer patterns={patterns} />
    </>
  );
}
