import type { DifficultyLevel, PatternPreview } from '@/types/pattern-preview';
import type { DetailActionId } from '@/types/detail-action';
import type { Review } from '@/types/review';

export type PatternDetailStatus = 'not-started' | 'in-progress' | 'completed';
export type PatternPublicationStatus = 'published' | 'draft';

export type PatternDetail = {
  patternId: string;
  title: string;
  creator?: string;
  type: string;
  difficulty: DifficultyLevel;
  description: string;
  reviews: readonly Review[];
  aggregateRating: number;
  reviewCount: number;
  media: PatternPreview['thumbnail'] | number;
  mediaCrop?: {
    width: number;
    height: number;
    left: number;
    top: number;
  };
  status: PatternDetailStatus;
  isInToDo: boolean;
  isOwnedByCurrentUser: boolean;
  publicationStatus?: PatternPublicationStatus;
  percentProgress?: number;
};

export type PatternDetailActionId = Extract<
  DetailActionId,
  | 'start'
  | 'continue'
  | 'edit'
  | 'complete'
  | 'remove'
  | 'add-to-do'
  | 'remove-to-do'
  | 'delete'
>;

export type PatternDetailAction = {
  id: PatternDetailActionId;
  label: string;
};

export type PatternActionResolution =
  | {
      supported: true;
      actions: readonly PatternDetailAction[];
    }
  | {
      supported: false;
      reason: string;
    };
