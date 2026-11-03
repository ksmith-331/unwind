import { router, type Href } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import type { PatternAccent } from '@/types/pattern-preview';
import { theme } from '@/theme';

type ContentThumbnailProps = {
  title: string;
  accent: PatternAccent;
  href: Href;
};

export function ContentThumbnail({ title, accent, href }: ContentThumbnailProps) {
  return (
    <Pressable
      accessibilityLabel={`Open ${title}`}
      accessibilityRole="button"
      onPress={() => router.push(href)}
      style={({ pressed }) => [styles.thumbnail, pressed && styles.pressed]}>
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        pointerEvents="none"
        style={styles.motif}>
        <View style={[styles.thread, { backgroundColor: theme.colors[accent] }]} />
        <View style={[styles.thread, styles.blueThread]} />
        <View style={[styles.thread, styles.yellowThread]} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  thumbnail: {
    alignItems: 'center',
    aspectRatio: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.small,
    elevation: 2,
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
