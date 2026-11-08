import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppCard } from '@/components/app-card';
import { AppText } from '@/components/app-text';
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
    <AppCard
      accessibilityLabel={
        item.status === 'inProgress'
          ? `Open ${item.kind}: ${item.title}, ${item.progress}% complete`
          : `Open bookmarked ${item.kind}: ${item.title}`
      }
      onPress={openItem}
      style={styles.card}>
      <View style={styles.thumbnail}>
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          pointerEvents="none"
          style={styles.placeholderMotif}>
          <View style={[styles.thread, styles.mintThread]} />
          <View style={[styles.thread, styles.orangeThread]} />
          <View style={[styles.thread, styles.yellowThread]} />
        </View>
        {item.status === 'inProgress' && (
          <View style={[styles.progressBadge, { backgroundColor: theme.colors[getProgressColor(item.progress)] }]}>
            <AppText variant="bodySmallStrong">{item.progress}%</AppText>
          </View>
        )}
      </View>
      <AppText style={styles.title} variant="bodySmallStrong">
        {item.title}
      </AppText>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    width: '48%',
  },
  thumbnail: {
    alignItems: 'center',
    aspectRatio: 153 / 120,
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.medium,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 112,
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
