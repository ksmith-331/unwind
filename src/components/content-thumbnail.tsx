import { router, type Href } from 'expo-router';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { theme } from '@/theme';
import {
  CONTENT_THUMBNAIL_CONTENT_FIT,
  type ContentMediaSource,
} from '@/types/content-media';
import type { PreviewAccent } from '@/utils/preview-accent';

type ContentThumbnailProps = {
  title: string;
  accent: PreviewAccent;
  href: Href;
  thumbnail: ContentMediaSource;
};

export function ContentThumbnail({
  title,
  accent,
  href,
  thumbnail,
}: ContentThumbnailProps) {
  return (
    <View style={styles.shadow}>
      <Pressable
        accessibilityLabel={`Open ${title}`}
        accessibilityRole="button"
        onPress={() => router.push(href)}
        style={({ pressed }) => [styles.thumbnail, pressed && styles.pressed]}>
        {thumbnail === 'placeholder' ? (
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            pointerEvents="none"
            style={styles.motif}>
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
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    ...theme.shadows.neutral,
    aspectRatio: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.small,
    width: 60,
  },
  thumbnail: {
    alignItems: 'center',
    aspectRatio: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.small,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 60,
  },
  motif: {
    alignItems: 'center',
    gap: theme.spacing[1],
    justifyContent: 'center',
    transform: [{ rotate: '-35deg' }],
    width: '110%',
  },
  thread: {
    borderRadius: theme.radii.pill,
    height: 6,
    width: '100%',
  },
  blueThread: {
    backgroundColor: theme.colors.navigation,
    width: '80%',
  },
  yellowThread: {
    backgroundColor: theme.colors.highlight,
    width: '90%',
  },
  pressed: {
    opacity: 0.75,
  },
});
