import { tutorialAlphaReviews } from '@/mocks/tutorial-alpha-reviews';
import { tutorialMacrameEndingReviews } from '@/mocks/tutorial-macrame-ending-reviews';
import type { TutorialDetail } from '@/types/tutorial-detail';

// Development-only detail data; this is not fetched or persisted.
export const tutorialDetails: Record<string, TutorialDetail> = {
  'tutorial-macrame-ending': {
    tutorialId: 'tutorial-macrame-ending',
    title: 'Macrame Ending Tutorial',
    creator: 'shadow2020',
    difficulty: 4,
    description:
      'This tutorial offers a unique way to complete your alpha patterns using macrame.',
    aggregateRating: 5,
    reviewCount: 36,
    reviews: tutorialMacrameEndingReviews,
    media: require('../../assets/images/tutorial-macrame-ending-preview.jpg'),
    mediaCrop: {
      width: 106.53,
      height: 181.14,
      left: 0.16,
      top: -60.26,
    },
    status: 'not-started',
    isInToDo: true,
    isOwnedByCurrentUser: false,
  },
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
