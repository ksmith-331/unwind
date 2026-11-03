import { ContentThumbnail } from '@/components/content-thumbnail';
import type { TutorialPreview } from '@/types/tutorial-preview';

type TutorialThumbnailProps = {
  tutorial: TutorialPreview;
};

export function TutorialThumbnail({ tutorial }: TutorialThumbnailProps) {
  return (
    <ContentThumbnail
      accent={tutorial.accent}
      href={{
        pathname: '/tutorial/[tutorialId]',
        params: { tutorialId: tutorial.id },
      }}
      title={tutorial.title}
    />
  );
}
