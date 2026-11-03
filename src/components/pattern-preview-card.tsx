import { ContentPreviewCard } from '@/components/content-preview-card';

import type { PatternPreview } from '@/types/pattern-preview';

type PatternPreviewCardProps = {
  pattern: PatternPreview;
};

export function PatternPreviewCard({ pattern }: PatternPreviewCardProps) {
  return (
    <ContentPreviewCard
      accent={pattern.accent}
      difficulty={pattern.difficulty}
      href={{
        pathname: '/pattern/[patternId]',
        params: { patternId: pattern.id },
      }}
      title={pattern.title}
    />
  );
}
