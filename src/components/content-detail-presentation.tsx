import { SymbolView } from 'expo-symbols';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  type LayoutChangeEvent,
} from 'react-native';

import { AppText } from '@/components/app-text';
import { RatingStars } from '@/components/rating-stars';
import type { DifficultyLevel } from '@/types/pattern-preview';
import type { Review } from '@/types/review';
import { theme } from '@/theme';
import { getProgressColor } from '@/utils/progress-color';

type ContentDetailPresentationProps = {
  detail: {
    creator: string;
    difficulty: DifficultyLevel;
    description: string;
    reviews: readonly Review[];
    aggregateRating: number;
    reviewCount: number;
    media: 'placeholder';
    type?: string;
    percentProgress?: number;
  };
  contentType: 'Pattern' | 'Tutorial';
  onOpenDescription: () => void;
  onOpenReviews: () => void;
};

const CHEVRON_ICON: ComponentProps<typeof SymbolView>['name'] = {
  ios: 'chevron.right',
  android: 'chevron_right',
  web: 'chevron_right',
};

export function ContentDetailPresentation({
  detail,
  contentType,
  onOpenDescription,
  onOpenReviews,
}: ContentDetailPresentationProps) {
  const [bodyHeight, setBodyHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  const handleBodyLayout = (event: LayoutChangeEvent) => {
    setBodyHeight(event.nativeEvent.layout.height);
  };

  return (
    <ScrollView
      alwaysBounceVertical={false}
      bounces={false}
      contentContainerStyle={styles.content}
      onContentSizeChange={(_, height) => setContentHeight(height)}
      onLayout={handleBodyLayout}
      overScrollMode="never"
      scrollEnabled={contentHeight > bodyHeight + theme.spacing[2]}
      showsVerticalScrollIndicator={false}>
      <View
        accessibilityLabel={`${contentType} preview placeholder`}
        accessibilityRole="image"
        style={[
          styles.preview,
          contentType === 'Tutorial' && styles.tutorialPreview,
        ]}>
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={styles.motif}>
          <View style={[styles.thread, styles.pinkThread]} />
          <View style={[styles.thread, styles.yellowThread]} />
          <View style={[styles.thread, styles.blueThread]} />
        </View>
        {contentType === 'Pattern' &&
        detail.percentProgress !== undefined ? (
          <View
            accessible
            accessibilityLabel={`Progress: ${detail.percentProgress}%`}
            style={[
              styles.progressBadge,
              {
                backgroundColor:
                  theme.colors[getProgressColor(detail.percentProgress)],
              },
            ]}>
            <AppText variant="bodySmallStrong">
              {detail.percentProgress}%
            </AppText>
          </View>
        ) : null}
      </View>

      <View style={styles.metadataRow}>
        <View style={styles.metadata}>
          <AppText variant="body">
            {contentType} By:{' '}
            <AppText color="primaryText">{detail.creator}</AppText>
          </AppText>
          {detail.type ? (
            <AppText variant="body">
              Type: <AppText color="primaryText">{detail.type}</AppText>
            </AppText>
          ) : null}
          <View
            accessible
            accessibilityLabel={`Difficulty: ${detail.difficulty} out of 4`}
            style={styles.difficultyRow}>
            <AppText variant="body">Difficulty:</AppText>
            <View
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              style={styles.difficultyDots}>
              {Array.from({ length: detail.difficulty }, (_, index) => (
                <View key={index} style={styles.difficultyDot} />
              ))}
            </View>
          </View>
        </View>
        {contentType === 'Tutorial' &&
        detail.percentProgress !== undefined ? (
          <View
            accessible
            accessibilityLabel={`Progress: ${detail.percentProgress}%`}
            style={[
              styles.progressBadge,
              styles.tutorialProgressBadge,
              {
                backgroundColor:
                  theme.colors[getProgressColor(detail.percentProgress)],
              },
            ]}>
            <AppText variant="bodySmallStrong">
              {detail.percentProgress}%
            </AppText>
          </View>
        ) : null}
      </View>

      <Pressable
        accessibilityLabel="Description"
        accessibilityRole="button"
        onPress={onOpenDescription}
        style={({ pressed }) => [
          styles.previewRow,
          contentType === 'Tutorial' && styles.tutorialDescriptionRow,
          pressed && styles.pressed,
        ]}>
        <View style={styles.rowCopy}>
          <AppText variant="bodySmallStrong">Description</AppText>
          <AppText numberOfLines={2} style={styles.descriptionPreview} variant="caption">
            {detail.description}
          </AppText>
        </View>
        <SymbolView
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          name={CHEVRON_ICON}
          size={18}
          tintColor={theme.colors.navigation}
        />
      </Pressable>

      <Pressable
        accessibilityLabel={`Rated ${detail.aggregateRating} out of 5 stars. Reviews, ${detail.reviewCount} reviews`}
        accessibilityRole="button"
        onPress={onOpenReviews}
        style={({ pressed }) => [
          styles.previewRow,
          contentType === 'Tutorial' && styles.tutorialReviewsRow,
          contentType === 'Tutorial' && styles.tutorialReviewsGap,
          pressed && styles.pressed,
        ]}>
        <View style={styles.rowCopy}>
          <AppText variant="bodySmallStrong">Reviews</AppText>
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={styles.ratingSummary}>
            <RatingStars
              rating={detail.aggregateRating}
              size={contentType === 'Tutorial' ? 17.5 : 15}
            />
            <AppText style={styles.reviewCount} variant="caption">
              {contentType === 'Tutorial'
                ? `(${detail.reviewCount})`
                : `${detail.aggregateRating.toFixed(1)} (${detail.reviewCount})`}
            </AppText>
          </View>
        </View>
        <SymbolView
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          name={CHEVRON_ICON}
          size={18}
          tintColor={theme.colors.navigation}
        />
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    gap: theme.spacing[5],
    paddingBottom: theme.spacing[5],
    paddingTop: theme.spacing[1],
  },
  preview: {
    alignItems: 'center',
    aspectRatio: 294 / 220,
    backgroundColor: theme.colors.mutedSurface,
    borderRadius: theme.radii.medium,
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  },
  tutorialPreview: {
    aspectRatio: 294 / 230.588,
  },
  metadataRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  progressBadge: {
    borderRadius: theme.radii.pill,
    left: theme.spacing[2],
    paddingHorizontal: theme.spacing[2],
    paddingVertical: theme.spacing[1],
    position: 'absolute',
    top: theme.spacing[2],
  },
  tutorialProgressBadge: {
    left: undefined,
    marginLeft: theme.spacing[2],
    position: 'relative',
    top: 0,
  },
  motif: {
    alignItems: 'center',
    gap: theme.spacing[3],
    justifyContent: 'center',
    transform: [{ rotate: '-32deg' }],
    width: '120%',
  },
  thread: {
    borderRadius: theme.radii.pill,
    height: 22,
    width: '100%',
  },
  pinkThread: {
    backgroundColor: theme.colors.primaryAction,
    width: '88%',
  },
  yellowThread: {
    backgroundColor: theme.colors.highlight,
  },
  blueThread: {
    backgroundColor: theme.colors.secondaryAction,
    width: '82%',
  },
  metadata: {
    flex: 1,
    gap: theme.spacing[1],
  },
  difficultyRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing[1],
  },
  difficultyDots: {
    flexDirection: 'row',
    gap: theme.spacing[1],
  },
  difficultyDot: {
    backgroundColor: theme.colors.secondaryAction,
    borderRadius: theme.radii.pill,
    height: 12,
    width: 12,
  },
  previewRow: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.medium,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 68,
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[2],
    shadowColor: theme.colors.overlay,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  tutorialDescriptionRow: {
    minHeight: 72,
  },
  tutorialReviewsRow: {
    minHeight: 49,
    paddingVertical: 5,
  },
  tutorialReviewsGap: {
    marginTop: theme.spacing[5],
  },
  rowCopy: {
    flex: 1,
    minWidth: 0,
  },
  descriptionPreview: {
    marginTop: theme.spacing[1],
  },
  ratingSummary: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: theme.spacing[1],
  },
  reviewCount: {
    marginLeft: theme.spacing[2],
  },
  pressed: {
    opacity: 0.75,
  },
});
