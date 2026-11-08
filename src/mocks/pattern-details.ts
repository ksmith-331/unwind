import type { PatternDetail } from '@/types/pattern-detail';
import { patternHeartsReviews } from '@/mocks/pattern-hearts-reviews';
import { patternChevronReviews } from '@/mocks/pattern-chevron-reviews';

// Development-only detail data; this is not fetched or persisted.
export const patternDetails: Record<string, PatternDetail> = {
  'pattern-hearts': {
    patternId: 'pattern-hearts',
    title: 'Hearts',
    creator: 'luna_forest',
    type: 'Regular Friendship Bracelet',
    difficulty: 3,
    description:
      'Make a row of colorful hearts with this beginner-friendly friendship bracelet pattern. Adjust the colors to create a bracelet that feels like your own.',
    reviews: patternHeartsReviews,
    aggregateRating: 4.7,
    reviewCount: 57,
    media: 'placeholder',
    status: 'not-started',
    isInToDo: true,
    isOwnedByCurrentUser: false,
  },
  'pattern-harbor-chevron': {
    patternId: 'pattern-harbor-chevron',
    title: 'Chevron',
    creator: 'clothes33',
    type: 'Regular Friendship Bracelet',
    difficulty: 2,
    description:
      'A simple friendship bracelet pattern for beginners. Practice clean chevrons and color changes.',
    reviews: patternChevronReviews,
    aggregateRating: 4,
    reviewCount: 200,
    media: require('../../assets/images/chevron-pattern-preview.png'),
    status: 'in-progress',
    isInToDo: false,
    isOwnedByCurrentUser: false,
    percentProgress: 12,
  },
};
