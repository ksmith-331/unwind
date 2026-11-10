import type { Review } from '@/types/review';

export const patternPoinsettiaReviews = [
  {
    reviewId: 'profile-simple-poinsettia-review-001',
    username: 'knotgarden',
    rating: 5,
    text: 'The colors make a lovely holiday bracelet.',
    date: 'Nov 1, 2026',
  },
  {
    reviewId: 'profile-simple-poinsettia-review-002',
    username: 'silkandthread',
    rating: 5,
    text: 'Clear, easy-to-follow alpha pattern.',
    date: 'Oct 24, 2026',
  },
  {
    reviewId: 'profile-simple-poinsettia-review-003',
    username: 'loopedlark',
    rating: 4.5,
    date: 'Oct 11, 2026',
    image: {
      kind: 'fallback',
      accessibilityLabel:
        'A reader-submitted Poinsettia bracelet photo is unavailable',
    },
  },
] satisfies readonly Review[];
