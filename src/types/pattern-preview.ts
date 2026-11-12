import type { ContentMediaSource } from '@/types/content-media';

export type DifficultyLevel = 1 | 2 | 3 | 4;

export type PatternPreview = {
  id: string;
  title: string;
  difficulty: DifficultyLevel;
  thumbnail: ContentMediaSource;
};
