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
import type { PatternDetail } from '@/types/pattern-detail';
import { theme } from '@/theme';

type ContentDetailPresentationProps = {
  pattern: PatternDetail;
  onOpenDescription: () => void;
  onOpenReviews: () => void;
};

const CHEVRON_ICON: ComponentProps<typeof SymbolView>['name'] = {
  ios: 'chevron.right',
  android: 'chevron_right',
  web: 'chevron_right',
};

export function ContentDetailPresentation({
  pattern,
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
        accessibilityLabel={
          pattern.media === 'placeholder'
            ? 'Pattern preview placeholder'
            : 'Pattern preview'
        }
        accessibilityRole="image"
        style={styles.preview}>
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={styles.motif}>
          <View style={[styles.thread, styles.pinkThread]} />
          <View style={[styles.thread, styles.yellowThread]} />
          <View style={[styles.thread, styles.blueThread]} />
        </View>
      </View>

      <View style={styles.metadata}>
        <AppText variant="body">
          Pattern By: <AppText color="primaryText">{pattern.creator}</AppText>
        </AppText>
        <AppText variant="body">
          Type: <AppText color="primaryText">{pattern.type}</AppText>
        </AppText>
        <View
          accessible
          accessibilityLabel={`Difficulty: ${pattern.difficulty} out of 4`}
          style={styles.difficultyRow}>
          <AppText variant="body">Difficulty:</AppText>
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={styles.difficultyDots}>
            {Array.from({ length: pattern.difficulty }, (_, index) => (
              <View key={index} style={styles.difficultyDot} />
            ))}
          </View>
        </View>
      </View>

      <Pressable
        accessibilityLabel="Description"
        accessibilityRole="button"
        onPress={onOpenDescription}
        style={({ pressed }) => [styles.previewRow, pressed && styles.pressed]}>
        <View style={styles.rowCopy}>
          <AppText variant="bodySmallStrong">Description</AppText>
          <AppText numberOfLines={2} style={styles.descriptionPreview} variant="caption">
            {pattern.description}
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
        accessibilityLabel={`Rated ${pattern.aggregateRating} out of 5 stars. Reviews, ${pattern.reviewCount} reviews`}
        accessibilityRole="button"
        onPress={onOpenReviews}
        style={({ pressed }) => [styles.previewRow, pressed && styles.pressed]}>
        <View style={styles.rowCopy}>
          <AppText variant="bodySmallStrong">Reviews</AppText>
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={styles.ratingSummary}>
            <RatingStars rating={pattern.aggregateRating} size={15} />
            <AppText style={styles.reviewCount} variant="caption">
              {pattern.aggregateRating.toFixed(1)} ({pattern.reviewCount})
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
    width: '100%',
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
