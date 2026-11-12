import { ContentPreviewCard } from '@/components/content-preview-card';

import type { PatternPreview } from '@/types/pattern-preview';
import type { PreviewAccent } from '@/utils/preview-accent';

type PatternPreviewCardProps = {
  pattern: PatternPreview;
  accent: PreviewAccent;
};

export function PatternPreviewCard({ pattern, accent }: PatternPreviewCardProps) {
  return (
    <ContentPreviewCard
      accent={accent}
      difficulty={pattern.difficulty}
      href={{
        pathname: '/pattern/[patternId]',
        params: { patternId: pattern.id },
      }}
      thumbnail={pattern.thumbnail}
      title={pattern.title}
    />
  );
}
