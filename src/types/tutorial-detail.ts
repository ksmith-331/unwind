import type { DetailAction } from '@/types/detail-action';
import type { DifficultyLevel } from '@/types/pattern-preview';
import type { PublicationStatus } from '@/types/publication-status';
import type { Review } from '@/types/review';
import type { TutorialPreview } from '@/types/tutorial-preview';

export type TutorialDetailStatus = 'not-started' | 'in-progress' | 'completed';

export type TutorialDetail = {
  tutorialId: string;
  title: string;
  creator?: string;
  difficulty: DifficultyLevel;
  description: string;
  aggregateRating: number;
  reviewCount: number;
  reviews: readonly Review[];
  media: TutorialPreview['thumbnail'] | number;
  status: TutorialDetailStatus;
  percentProgress?: number;
  isInToDo: boolean;
  isOwnedByCurrentUser: boolean;
  publicationStatus?: PublicationStatus;
};

export type TutorialActionResolution =
  | {
      supported: true;
      actions: readonly DetailAction[];
    }
  | {
      supported: false;
      reason: string;
    };
