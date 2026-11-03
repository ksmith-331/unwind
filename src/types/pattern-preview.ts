export type DifficultyLevel = 1 | 2 | 3 | 4;

export type PatternAccent = 'primaryAction' | 'secondaryAction' | 'highlight';

export type PatternPreview = {
  id: string;
  title: string;
  difficulty: DifficultyLevel;
  thumbnail: 'placeholder';
  accent: PatternAccent;
};
