import type { Review } from '@/types/review';

export const patternHeartsReviews = [
  {
    reviewId: 'pattern-hearts-review-001',
    username: 'stitching_sam',
    rating: 5,
    text: 'The instructions were clear and easy to follow. I made this in an evening.',
    date: 'Nov 2, 2026',
  },
  {
    reviewId: 'pattern-hearts-review-002',
    username: 'crafty.mira',
    rating: 4,
    date: 'Oct 26, 2026',
  },
  {
    reviewId: 'pattern-hearts-review-003',
    username: 'threadandtea',
    rating: 5,
    text: 'This was my first bracelet pattern and the repeat was simple to remember.',
    date: 'Oct 18, 2026',
    image: {
      kind: 'fallback',
      accessibilityLabel: 'A reader-submitted bracelet photo is unavailable',
    },
  },
] satisfies readonly Review[];
