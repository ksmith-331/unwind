import type { Review } from '@/types/review';

export const patternStuffedBunnyReviews = [
  {
    reviewId: 'pattern-stuffed-bunny-review-001',
    username: 'happyhook',
    rating: 5,
    text: 'The shaping came together beautifully.',
    date: 'Nov 6, 2026',
  },
  {
    reviewId: 'pattern-stuffed-bunny-review-002',
    username: 'softstitches',
    rating: 4.5,
    date: 'Oct 30, 2026',
  },
  {
    reviewId: 'pattern-stuffed-bunny-review-003',
    username: 'yarnandtea',
    rating: 4,
    text: 'A sweet project with clear steps.',
    date: 'Oct 22, 2026',
    image: {
      kind: 'fallback',
      accessibilityLabel: 'A reader-submitted bunny photo is unavailable',
    },
  },
] satisfies readonly Review[];
