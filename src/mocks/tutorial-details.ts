import { tutorialAlphaReviews } from '@/mocks/tutorial-alpha-reviews';
import type { TutorialDetail } from '@/types/tutorial-detail';

// Development-only detail data; this is not fetched or persisted.
export const tutorialDetails: Record<string, TutorialDetail> = {
  'community-guide-alpha-patterns': {
    tutorialId: 'community-guide-alpha-patterns',
    title: 'Guide to Alpha Patterns',
    creator: 'sweet_aelynn',
    difficulty: 2,
    description:
      'Looking to up your friendship bracelet skills? Look no further! Alpha patterns bring a whole new level of creativity to every design.',
    aggregateRating: 4,
    reviewCount: 734,
    reviews: tutorialAlphaReviews,
    media: 'placeholder',
    status: 'in-progress',
    percentProgress: 71,
    isInToDo: false,
    isOwnedByCurrentUser: false,
  },
};
