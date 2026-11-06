import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { TutorialPreviewCard } from '@/components/tutorial-preview-card';
import { SEARCH_FILTER_ICON, SearchInput, type SearchInputAction } from '@/components/search-input';
import { profileTutorials } from '@/mocks/profile-tutorials';
import { theme } from '@/theme';
import { getPreviewAccent } from '@/utils/preview-accent';

const SEARCH_ACTIONS: readonly SearchInputAction[] = [
  {
    accessibilityLabel: 'Filter tutorials',
    icon: SEARCH_FILTER_ICON,
  },
];

export default function LibraryTutorialsRoute() {
  const [query, setQuery] = useState('');
  const filteredTutorials = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return profileTutorials;
    }

    return profileTutorials.filter((tutorial) =>
      tutorial.title.toLowerCase().includes(normalizedQuery),
    );
  }, [query]);

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <SearchInput
        accessibilityLabel="Search my tutorials"
        onChangeText={setQuery}
        placeholder="Search"
        trailingActions={SEARCH_ACTIONS}
        value={query}
      />
      {filteredTutorials.length > 0 ? (
        <View style={styles.tutorialList}>
          {filteredTutorials.map((tutorial, index) => (
            <TutorialPreviewCard
              accent={getPreviewAccent(index)}
              key={tutorial.id}
              tutorial={tutorial}
            />
          ))}
        </View>
      ) : (
        <AppText style={styles.emptyMessage} variant="body">
          No tutorials found
        </AppText>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    gap: theme.spacing[5],
    paddingBottom: 92,
    paddingHorizontal: theme.spacing[6],
    paddingTop: theme.spacing[5],
  },
  tutorialList: {
    gap: theme.spacing[4],
  },
  emptyMessage: {
    paddingHorizontal: theme.spacing[1],
    paddingVertical: theme.spacing[3],
  },
});
