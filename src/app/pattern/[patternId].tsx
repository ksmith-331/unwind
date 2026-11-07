import { router, useLocalSearchParams } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import type { ComponentProps } from 'react';
import { useCallback, useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { ContentDetailPresentation } from '@/components/content-detail-presentation';
import { DetailActionBar } from '@/components/detail-action-bar';
import {
  DetailOverlayShell,
  type CloseAfterAnimation,
} from '@/components/detail-overlay-shell';
import { RatingStars } from '@/components/rating-stars';
import { patternDetails } from '@/mocks/pattern-details';
import type { DetailAction } from '@/types/detail-action';
import { theme } from '@/theme';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { resolvePatternDetailActions } from '@/utils/pattern-detail-actions';

type InternalPage = 'main' | 'description' | 'reviews';

const REVIEW_IMAGE_FALLBACK = {
  ios: 'photo',
  android: 'image',
  web: 'image',
} as const;

export default function PatternDetailRoute() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { patternId } = useLocalSearchParams<{ patternId: string }>();
  const pattern =
    typeof patternId === 'string' ? patternDetails[patternId] : undefined;
  const [page, setPage] = useState<InternalPage>('main');
  const reduceMotion = useReducedMotion();
  const popupInternalWidth = Math.max(
    0,
    width - 2 * (theme.spacing[2] + theme.spacing[5]),
  );
  const previewHeight = popupInternalWidth * (220 / 294);
  const preferredHeight =
    56 +
    theme.spacing[1] +
    previewHeight +
    3 * theme.spacing[5] +
    80 +
    68 +
    68 +
    theme.spacing[4] +
    theme.spacing[3] +
    64 +
    Math.max(insets.bottom, theme.spacing[4]);
  const maxCardHeight = height - Math.max(insets.top + theme.spacing[5], 48);
  const resolution = useMemo(
    () =>
      pattern
        ? resolvePatternDetailActions(pattern)
        : { supported: false as const, reason: 'Pattern detail is unavailable.' },
    [pattern],
  );

  const handleBack = useCallback(
    (closeAfterAnimation: CloseAfterAnimation) => {
      if (page === 'main') {
        closeAfterAnimation();
      } else {
        setPage('main');
      }
    },
    [page],
  );

  const handleAction = useCallback(
    (
      action: DetailAction,
      closeAfterAnimation: CloseAfterAnimation,
    ) => {
      if (!pattern) {
        return;
      }

      if (action.id === 'start') {
        closeAfterAnimation(() =>
          router.replace({
            pathname: '/workspace/pattern/[patternId]/track',
            params: { patternId: pattern.patternId },
          }),
        );
      } else if (action.id === 'edit') {
        closeAfterAnimation(() =>
          router.replace({
            pathname: '/workspace/pattern/[patternId]/edit',
            params: { patternId: pattern.patternId },
          }),
        );
      }
    },
    [pattern],
  );

  const title =
    page === 'main'
      ? pattern?.title ?? 'Pattern unavailable'
      : page === 'description'
        ? 'Description'
        : 'Reviews';

  return (
    <DetailOverlayShell
      backAccessibilityLabel={
        page === 'main' ? 'Close pattern details' : 'Back to pattern details'
      }
      onBack={handleBack}
      onDismiss={() => router.dismiss()}
      preferredHeight={
        pattern ? Math.min(preferredHeight, maxCardHeight) : 200
      }
      minimumHeight={maxCardHeight}
      reduceMotion={reduceMotion}
      title={title}
      actions={
        page === 'main' && pattern && resolution.supported
          ? (closeAfterAnimation) => (
              <DetailActionBar
                actions={resolution.actions}
                onAction={(action) => handleAction(action, closeAfterAnimation)}
              />
            )
          : undefined
      }>
      {!pattern || !resolution.supported ? (
        <View style={styles.unavailable}>
          <AppText variant="body">
            {resolution.supported === false
              ? resolution.reason
              : 'This development build does not include this Pattern yet.'}
          </AppText>
        </View>
      ) : page === 'main' ? (
        <ContentDetailPresentation
          onOpenDescription={() => setPage('description')}
          onOpenReviews={() => setPage('reviews')}
          pattern={pattern}
        />
      ) : page === 'description' ? (
        <ScrollView
          contentContainerStyle={styles.internalContent}
          showsVerticalScrollIndicator={false}>
          <AppText variant="body">{pattern.description}</AppText>
        </ScrollView>
      ) : (
        <ScrollView
          contentContainerStyle={styles.reviewList}
          showsVerticalScrollIndicator={false}>
          {pattern.reviews.map((review) => (
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
      )}
    </DetailOverlayShell>
  );
}

const styles = StyleSheet.create({
  unavailable: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing[5],
  },
  internalContent: {
    paddingBottom: theme.spacing[5],
    paddingTop: theme.spacing[3],
  },
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