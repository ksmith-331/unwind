import type { Review } from '@/types/review';

export const patternChevronReviews = [
  {
    reviewId: 'pattern-chevron-review-001',
    username: 'threaded.sun',
    rating: 5,
    text: 'A clear pattern with a lovely finished result.',
    date: 'Nov 12, 2026',
  },
  {
    reviewId: 'pattern-chevron-review-002',
    username: 'knotty.by.nature',
    rating: 4,
    date: 'Nov 3, 2026',
  },
  {
    reviewId: 'pattern-chevron-review-003',
    username: 'colorfulloops',
    rating: 3,
    text: 'Easy to follow once I got the first row started.',
    date: 'Oct 26, 2026',
  },
] satisfies readonly Review[];
