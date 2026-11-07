export type ReviewRating = number;

export type ReviewImageFallback = {
  kind: 'fallback';
  accessibilityLabel: string;
};

export type Review = {
  reviewId: string;
  username: string;
  rating: ReviewRating;
  text?: string;
  date: string;
  image?: ReviewImageFallback;
};
