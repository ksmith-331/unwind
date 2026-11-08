import { SymbolView } from 'expo-symbols';
import type { ComponentProps } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { RatingStars } from '@/components/rating-stars';
import type { Review } from '@/types/review';
import { theme } from '@/theme';

type DetailReviewListProps = {
  reviews: readonly Review[];
};

const REVIEW_IMAGE_FALLBACK: ComponentProps<typeof SymbolView>['name'] = {
  ios: 'photo',
  android: 'image',
  web: 'image',
};

export function DetailReviewList({ reviews }: DetailReviewListProps) {
  return (
    <ScrollView
      contentContainerStyle={styles.reviewList}
      showsVerticalScrollIndicator={false}>
      {reviews.map((review) => (
        <View key={review.reviewId} style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <AppText style={styles.username} variant="bodySmallStrong">
              {review.username}
            </AppText>
            <AppText color="primaryText" variant="caption">
              {review.date}
            </AppText>
          </View>
          <RatingStars
            accessibilityLabel={`Rated ${review.rating} out of 5 stars`}
            rating={review.rating}
          />
          {review.text ? (
            <AppText style={styles.reviewText} variant="bodySmall">
              {review.text}
            </AppText>
          ) : null}
          {review.image ? (
            <View
              accessibilityLabel={review.image.accessibilityLabel}
              accessibilityRole="image"
              style={styles.reviewImageFallback}>
              <SymbolView
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
                name={REVIEW_IMAGE_FALLBACK}
                size={24}
                tintColor={theme.colors.navigation}
              />
              <AppText color="primaryText" variant="caption">
                Photo preview unavailable
              </AppText>
            </View>
          ) : null}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  reviewList: {
    gap: theme.spacing[4],
    paddingBottom: theme.spacing[5],
    paddingTop: theme.spacing[3],
  },
  reviewCard: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.medium,
    borderWidth: 1,
    gap: theme.spacing[2],
    padding: theme.spacing[4],
  },
  reviewHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  username: {
    flexShrink: 1,
    marginRight: theme.spacing[2],
  },
  reviewText: {
    lineHeight: 21,
  },
  reviewImageFallback: {
    alignItems: 'center',
    backgroundColor: theme.colors.mutedSurface,
    borderRadius: theme.radii.small,
    flexDirection: 'row',
    gap: theme.spacing[2],
    minHeight: 64,
    paddingHorizontal: theme.spacing[3],
  },
});
