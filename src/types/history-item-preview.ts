import type { DifficultyLevel } from '@/types/pattern-preview';
import type { ContentMediaSource } from '@/types/content-media';

export type HistoryItemKind = 'pattern' | 'tutorial';

export type HistoryItemPreview = {
  historyId: string;
  contentId: string;
  kind: HistoryItemKind;
  title: string;
  difficulty: DifficultyLevel;
  isComplete: boolean;
  thumbnail: ContentMediaSource;
};
