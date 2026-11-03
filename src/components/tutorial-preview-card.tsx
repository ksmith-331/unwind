import { ContentPreviewCard } from '@/components/content-preview-card';
import type { TutorialPreview } from '@/types/tutorial-preview';

type TutorialPreviewCardProps = {
  tutorial: TutorialPreview;
};

export function TutorialPreviewCard({ tutorial }: TutorialPreviewCardProps) {
  return (
    <ContentPreviewCard
      accent={tutorial.accent}
      difficulty={tutorial.difficulty}
      href={{
        pathname: '/tutorial/[tutorialId]',
        params: { tutorialId: tutorial.id },
      }}
      title={tutorial.title}
    />
  );
}
