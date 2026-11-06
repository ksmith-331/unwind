import { ContentPreviewCard } from '@/components/content-preview-card';
import type { TutorialPreview } from '@/types/tutorial-preview';
import type { PreviewAccent } from '@/utils/preview-accent';

type TutorialPreviewCardProps = {
  tutorial: TutorialPreview;
  accent: PreviewAccent;
};

export function TutorialPreviewCard({ tutorial, accent }: TutorialPreviewCardProps) {
  return (
    <ContentPreviewCard
      accent={accent}
      difficulty={tutorial.difficulty}
      href={{
        pathname: '/tutorial/[tutorialId]',
        params: { tutorialId: tutorial.id },
      }}
      title={tutorial.title}
    />
  );
}
