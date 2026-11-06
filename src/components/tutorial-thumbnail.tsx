import { ContentThumbnail } from '@/components/content-thumbnail';
import type { TutorialPreview } from '@/types/tutorial-preview';
import type { PreviewAccent } from '@/utils/preview-accent';

type TutorialThumbnailProps = {
  tutorial: TutorialPreview;
  accent: PreviewAccent;
};

export function TutorialThumbnail({ tutorial, accent }: TutorialThumbnailProps) {
  return (
    <ContentThumbnail
      accent={accent}
      href={{
        pathname: '/tutorial/[tutorialId]',
        params: { tutorialId: tutorial.id },
      }}
      title={tutorial.title}
    />
  );
}
