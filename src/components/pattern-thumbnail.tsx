import { ContentThumbnail } from '@/components/content-thumbnail';

import type { PatternPreview } from '@/types/pattern-preview';

type PatternThumbnailProps = {
  pattern: PatternPreview;
};

export function PatternThumbnail({ pattern }: PatternThumbnailProps) {
  return (
    <ContentThumbnail
      accent={pattern.accent}
      href={{
        pathname: '/pattern/[patternId]',
        params: { patternId: pattern.id },
      }}
      title={pattern.title}
    />
  );
}
