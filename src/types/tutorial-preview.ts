import type { DifficultyLevel, PatternAccent } from '@/types/pattern-preview';

export type TutorialPreview = {
  id: string;
  title: string;
  difficulty: DifficultyLevel;
  thumbnail: 'placeholder';
  accent: PatternAccent;
};

export type ContinueTutorialPreview = TutorialPreview & {
  progress: number;
};
