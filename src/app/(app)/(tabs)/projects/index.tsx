import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { ProjectItemGrid } from '@/components/project-item-grid';
import { SEARCH_FILTER_ICON, SearchInput } from '@/components/search-input';
import { projectItems } from '@/mocks/project-items';
import { theme } from '@/theme';

export default function ProjectsInProgressRoute() {
  const [query, setQuery] = useState('');
  const visibleItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return projectItems.filter((item) =>
      item.title.toLowerCase().includes(normalizedQuery),
    );
  }, [query]);

  return (
    <View style={styles.page}>
      <View style={styles.search}>
        <SearchInput
          accessibilityLabel="Search projects in progress"
          onChangeText={setQuery}
          placeholder="Search"
          trailingActions={[{ accessibilityLabel: 'Filter projects', icon: SEARCH_FILTER_ICON }]}
          value={query}
        />
      </View>
      {visibleItems.length > 0 ? (
        <ProjectItemGrid items={visibleItems} />
      ) : (
        <ScrollView
          contentContainerStyle={styles.emptyState}
          keyboardShouldPersistTaps="handled">
          <AppText variant="body">No projects found.</AppText>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  search: {
    paddingHorizontal: theme.spacing[5],
    paddingTop: theme.spacing[5],
  },
  emptyState: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    padding: theme.spacing[6],
  },
});