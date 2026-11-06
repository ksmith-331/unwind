import { ContentThumbnail } from '@/components/content-thumbnail';

import type { PatternPreview } from '@/types/pattern-preview';
import type { PreviewAccent } from '@/utils/preview-accent';

type PatternThumbnailProps = {
  pattern: PatternPreview;
  accent: PreviewAccent;
};

export function PatternThumbnail({ pattern, accent }: PatternThumbnailProps) {
  return (
    <ContentThumbnail
      accent={accent}
      href={{
        pathname: '/pattern/[patternId]',
        params: { patternId: pattern.id },
      }}
      title={pattern.title}
    />
  );
}
