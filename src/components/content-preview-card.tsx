import type { ReactNode } from 'react';
import { router, type Href } from 'expo-router';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import {
  CONTENT_THUMBNAIL_CONTENT_FIT,
  type ContentMediaSource,
} from '@/types/content-media';
import type { DifficultyLevel } from '@/types/pattern-preview';
import { theme } from '@/theme';
import type { PreviewAccent } from '@/utils/preview-accent';

type ContentPreviewCardProps = {
  title: string;
  difficulty: DifficultyLevel;
  accent: PreviewAccent;
  href: Href;
  thumbnail: ContentMediaSource;
  accessibilityLabel?: string;
  accessory?: ReactNode;
};

export function ContentPreviewCard({
  title,
  difficulty,
  accent,
  href,
  thumbnail,
  accessibilityLabel,
  accessory,
}: ContentPreviewCardProps) {
  return (
    <Pressable
      accessibilityLabel={
        accessibilityLabel ?? `Open ${title}. Difficulty ${difficulty} out of 4`
      }
      accessibilityRole="button"
      onPress={() => router.push(href)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        pointerEvents="none"
        style={styles.thumbnail}>
        {thumbnail === 'placeholder' ? (
          <View style={styles.motif}>
            <View style={[styles.thread, { backgroundColor: theme.colors[accent] }]} />
            <View style={[styles.thread, styles.blueThread]} />
            <View style={[styles.thread, styles.yellowThread]} />
          </View>
        ) : (
          <Image
            accessible={false}
            contentFit={CONTENT_THUMBNAIL_CONTENT_FIT}
            contentPosition="center"
            source={thumbnail}
            style={StyleSheet.absoluteFill}
          />
        )}
      </View>
      <View style={styles.information}>
        <AppText
          color="textOnDark"
          numberOfLines={1}
          style={accessory ? styles.titleWithAccessory : undefined}
          variant="bodyStrong">
          {title}
        </AppText>
        <View style={styles.difficultyRow}>
          <AppText color="textOnDark" variant="caption">
            Difficulty:
          </AppText>
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={styles.dots}>
            {Array.from({ length: difficulty }, (_, index) => (
              <View key={index} style={styles.dot} />
            ))}
          </View>
        </View>
        {accessory ? (
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            pointerEvents="none"
            style={styles.accessory}>
            {accessory}
          </View>
        ) : null}
      </View>
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={[styles.accent, { backgroundColor: theme.colors[accent] }]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radii.medium,
    flexDirection: 'row',
    height: 72,
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  },
  thumbnail: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    overflow: 'hidden',
    width: '31%',
    position: 'relative',
  },
  motif: {
    alignItems: 'center',
    gap: theme.spacing[2],
    justifyContent: 'center',
    transform: [{ rotate: '-32deg' }],
    width: '115%',
  },
  thread: {
    borderRadius: theme.radii.pill,
    height: 9,
    width: '100%',
  },
  blueThread: {
    backgroundColor: theme.colors.navigation,
    width: '78%',
  },
  yellowThread: {
    backgroundColor: theme.colors.highlight,
    width: '90%',
  },
  information: {
    backgroundColor: theme.colors.navigation,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing[3],
    paddingBottom: theme.spacing[1],
    position: 'relative',
  },
  titleWithAccessory: {
    paddingRight: theme.spacing[6],
  },
  accessory: {
    position: 'absolute',
    right: theme.spacing[3],
    top: theme.spacing[2],
  },
  difficultyRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing[1],
    marginTop: theme.spacing[1],
  },
  dots: {
    flexDirection: 'row',
    gap: theme.spacing[1],
  },
  dot: {
    backgroundColor: theme.colors.secondaryAction,
    borderRadius: theme.radii.pill,
    height: 12,
    width: 12,
  },
  accent: {
    bottom: 0,
    height: 4,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  pressed: {
    opacity: 0.82,
  },
});
