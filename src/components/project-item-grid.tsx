import { ScrollView, StyleSheet, View } from 'react-native';

import { ProjectItemCard } from '@/components/project-item-card';
import type { ProjectItem } from '@/types/project-item';
import { theme } from '@/theme';

type ProjectItemGridProps = {
  items: readonly ProjectItem[];
};

export function ProjectItemGrid({ items }: ProjectItemGridProps) {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}>
      <View style={styles.gridContent}>
        <View style={styles.grid}>
          {items.map((item) => (
            <ProjectItemCard item={item} key={item.id} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  gridContent: {
    flexGrow: 1,
    padding: theme.spacing[6],
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: theme.spacing[4],
  },
});
