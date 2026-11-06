import type { DifficultyLevel, PatternAccent, PatternPreview } from '@/types/pattern-preview';

export type HistoryItemKind = 'pattern' | 'tutorial';

export type HistoryItemPreview = {
  historyId: string;
  contentId: string;
  kind: HistoryItemKind;
  title: string;
  difficulty: DifficultyLevel;
  isComplete: boolean;
  thumbnail: PatternPreview['thumbnail'];
  accent: PatternAccent;
};
