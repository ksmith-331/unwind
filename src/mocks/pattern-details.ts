import type { PatternDetail } from '@/types/pattern-detail';
import { patternHeartsReviews } from '@/mocks/pattern-hearts-reviews';
import { patternChevronReviews } from '@/mocks/pattern-chevron-reviews';
import { patternPoinsettiaReviews } from '@/mocks/pattern-poinsettia-reviews';
import { patternStuffedBunnyReviews } from '@/mocks/pattern-stuffed-bunny-reviews';
import { getPatternMedia } from '@/mocks/content-media';

// Development-only detail data; this is not fetched or persisted.
export const patternDetails: Record<string, PatternDetail> = {
  'profile-simple-poinsettia': {
    patternId: 'profile-simple-poinsettia',
    title: 'Simple Poinsettia',
    type: 'Alpha Friendship Bracelet',
    difficulty: 3,
    description:
      'Keywords: flowers, alpha, tricolor, Christmas. Happy Holidays!',
    reviews: patternPoinsettiaReviews,
    aggregateRating: 4.8,
    reviewCount: 74,
    media: getPatternMedia('profile-simple-poinsettia'),
    status: 'not-started',
    isInToDo: false,
    isOwnedByCurrentUser: true,
    publicationStatus: 'published',
  },
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
    media: getPatternMedia('pattern-hearts'),
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
    media: getPatternMedia('pattern-harbor-chevron'),
    status: 'in-progress',
    isInToDo: false,
    isOwnedByCurrentUser: false,
    percentProgress: 12,
  },
  'community-stuffed-bunny': {
    patternId: 'community-stuffed-bunny',
    title: 'Stuffed Bunny',
    creator: 'loopedbylena',
    type: 'Crochet Amigurumi',
    difficulty: 4,
    description:
      'Crochet a soft little bunny with shaped ears and simple finishing details.',
    reviews: patternStuffedBunnyReviews,
    aggregateRating: 4.5,
    reviewCount: 36,
    media: getPatternMedia('community-stuffed-bunny'),
    status: 'not-started',
    isInToDo: false,
    isOwnedByCurrentUser: false,
  },
};
