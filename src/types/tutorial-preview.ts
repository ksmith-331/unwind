import type { DifficultyLevel } from '@/types/pattern-preview';

export type TutorialPreview = {
  id: string;
  title: string;
  difficulty: DifficultyLevel;
  thumbnail: 'placeholder';
};

export type ContinueTutorialPreview = TutorialPreview & {
  progress: number;
};
