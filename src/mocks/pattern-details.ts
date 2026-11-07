import type { PatternDetail } from '@/types/pattern-detail';
import { patternHeartsReviews } from '@/mocks/pattern-hearts-reviews';

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
};
