import { tutorialAlphaReviews } from '@/mocks/tutorial-alpha-reviews';
import { tutorialMacrameEndingReviews } from '@/mocks/tutorial-macrame-ending-reviews';
import { tutorialCrochetLeafBorderReviews } from '@/mocks/tutorial-crochet-leaf-border-reviews';
import { tutorialStartEndingLoopsReviews } from '@/mocks/tutorial-start-ending-loops-reviews';
import type { TutorialDetail } from '@/types/tutorial-detail';
import { getTutorialMedia } from '@/mocks/content-media';

// Development-only detail data; this is not fetched or persisted.
export const guideToAlphaPatterns = {
  tutorialId: 'community-guide-alpha-patterns',
  title: 'Guide to Alpha Patterns',
  creator: 'sweet_aelynn',
  difficulty: 2,
  description:
    'Looking to up your friendship bracelet skills? Look no further! Alpha patterns bring a whole new level of creativity to every design.',
  aggregateRating: 4,
  reviewCount: 734,
  reviews: tutorialAlphaReviews,
  media: getTutorialMedia('community-guide-alpha-patterns'),
  status: 'in-progress',
  percentProgress: 71,
  isInToDo: false,
  isOwnedByCurrentUser: false,
} satisfies TutorialDetail & { status: 'in-progress'; percentProgress: number };

export const tutorialDetails: Record<string, TutorialDetail> = {
  'profile-crochet-leaf-border': {
    tutorialId: 'profile-crochet-leaf-border',
    title: 'Crochet Leaf Border',
    difficulty: 2,
    description:
      'Add a delicate leaf border to your crochet project with this step-by-step tutorial.',
    aggregateRating: 4.8,
    reviewCount: 24,
    reviews: tutorialCrochetLeafBorderReviews,
    media: getTutorialMedia('profile-crochet-leaf-border'),
    status: 'not-started',
    isInToDo: false,
    isOwnedByCurrentUser: true,
    publicationStatus: 'published',
  },
  'community-start-ending-loops': {
    tutorialId: 'community-start-ending-loops',
    title: 'Start + Ending Loops',
    creator: 'woven.willow',
    difficulty: 2,
    description:
      'Learn to create neat starting and ending loops for a polished bracelet finish.',
    aggregateRating: 4.7,
    reviewCount: 48,
    reviews: tutorialStartEndingLoopsReviews,
    media: getTutorialMedia('community-start-ending-loops'),
    status: 'not-started',
    isInToDo: false,
    isOwnedByCurrentUser: false,
  },
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
    media: getTutorialMedia('tutorial-macrame-ending'),
    status: 'not-started',
    isInToDo: true,
    isOwnedByCurrentUser: false,
  },
  [guideToAlphaPatterns.tutorialId]: guideToAlphaPatterns,
};
