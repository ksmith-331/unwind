import { router } from 'expo-router';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { CONTENT_THUMBNAIL_CONTENT_FIT } from '@/types/content-media';
import type { ProjectItem } from '@/types/project-item';
import { theme } from '@/theme';
import { getProgressColor } from '@/utils/progress-color';

type ProjectItemCardProps = {
  item: ProjectItem;
};

export function ProjectItemCard({ item }: ProjectItemCardProps) {
  const openItem = () => {
    if (item.kind === 'pattern') {
      router.push({
        pathname: '/pattern/[patternId]',
        params: { patternId: item.id },
      });
      return;
    }

    router.push({
      pathname: '/tutorial/[tutorialId]',
      params: { tutorialId: item.id },
    });
  };

  return (
    <Pressable
      accessibilityLabel={
        item.status === 'inProgress'
          ? `Open ${item.kind}: ${item.title}, ${item.progress}% complete`
          : `Open bookmarked ${item.kind}: ${item.title}`
      }
      accessibilityRole="button"
      onPress={openItem}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.thumbnailShadow}>
        <View style={styles.thumbnail}>
          {item.thumbnail === 'placeholder' ? (
            <View
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              pointerEvents="none"
              style={styles.placeholderMotif}>
              <View style={[styles.thread, styles.mintThread]} />
              <View style={[styles.thread, styles.orangeThread]} />
              <View style={[styles.thread, styles.yellowThread]} />
            </View>
          ) : (
            <Image
              accessible={false}
              contentFit={CONTENT_THUMBNAIL_CONTENT_FIT}
              contentPosition="center"
              source={item.thumbnail}
              style={StyleSheet.absoluteFill}
            />
          )}
          {item.status === 'inProgress' && (
            <View style={[styles.progressBadge, { backgroundColor: theme.colors[getProgressColor(item.progress)] }]}>
              <AppText variant="bodySmallStrong">{item.progress}%</AppText>
            </View>
          )}
        </View>
      </View>
      <AppText style={styles.title} variant="bodySmallStrong">
        {item.title}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    width: '48%',
  },
  pressed: {
    opacity: 0.8,
  },
  thumbnailShadow: {
    ...theme.shadows.neutral,
    aspectRatio: 153 / 120,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.medium,
    minHeight: 112,
    overflow: 'visible',
    width: '100%',
  },
  thumbnail: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.medium,
    flex: 1,
    borderWidth: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  placeholderMotif: {
    alignItems: 'center',
    gap: theme.spacing[3],
    justifyContent: 'center',
    transform: [{ rotate: '-12deg' }],
    width: '72%',
  },
  thread: {
    borderRadius: theme.radii.pill,
    height: 10,
    width: '100%',
  },
  mintThread: {
    backgroundColor: theme.colors.secondaryAction,
  },
  orangeThread: {
    backgroundColor: theme.colors.primaryAction,
    width: '78%',
  },
  yellowThread: {
    backgroundColor: theme.colors.highlight,
    width: '88%',
  },
  progressBadge: {
    borderRadius: theme.radii.pill,
    left: theme.spacing[2],
    paddingHorizontal: theme.spacing[2],
    paddingVertical: theme.spacing[1],
    position: 'absolute',
    top: theme.spacing[2],
  },
  title: {
    marginTop: theme.spacing[2],
  },
});
