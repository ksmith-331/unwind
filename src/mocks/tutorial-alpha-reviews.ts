import type { Review } from '@/types/review';

export const tutorialAlphaReviews = [
  {
    reviewId: 'community-guide-alpha-review-001',
    username: 'stitching_sam',
    rating: 5,
    text: 'A clear introduction to reading alpha patterns.',
    date: 'Nov 4, 2026',
  },
  {
    reviewId: 'community-guide-alpha-review-002',
    username: 'crafty.mira',
    rating: 4.5,
    date: 'Oct 29, 2026',
  },
  {
    reviewId: 'community-guide-alpha-review-003',
    username: 'threadandtea',
    rating: 5,
    text: 'The examples made the steps easy to follow.',
    date: 'Oct 21, 2026',
    image: {
      kind: 'fallback',
      accessibilityLabel: 'A reader-submitted tutorial photo is unavailable',
    },
  },
] satisfies readonly Review[];
