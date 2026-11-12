import type { DifficultyLevel } from '@/types/pattern-preview';
import type { ContentMediaSource } from '@/types/content-media';

export type TutorialPreview = {
  id: string;
  title: string;
  difficulty: DifficultyLevel;
  thumbnail: ContentMediaSource;
};

export type ContinueTutorialPreview = TutorialPreview & {
  progress: number;
};
