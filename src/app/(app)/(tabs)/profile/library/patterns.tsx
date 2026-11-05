import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { PatternPreviewCard } from '@/components/pattern-preview-card';
import { SEARCH_FILTER_ICON, SearchInput, type SearchInputAction } from '@/components/search-input';
import { profilePatterns } from '@/mocks/profile-patterns';
import { theme } from '@/theme';

const SEARCH_ACTIONS: readonly SearchInputAction[] = [
  {
    accessibilityLabel: 'Filter patterns',
    icon: SEARCH_FILTER_ICON,
  },
];

export default function LibraryPatternsRoute() {
  const [query, setQuery] = useState('');
  const filteredPatterns = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return profilePatterns;
    }

    return profilePatterns.filter((pattern) =>
      pattern.title.toLowerCase().includes(normalizedQuery),
    );
  }, [query]);

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <SearchInput
        accessibilityLabel="Search my patterns"
        onChangeText={setQuery}
        placeholder="Search"
        trailingActions={SEARCH_ACTIONS}
        value={query}
      />
      {filteredPatterns.length > 0 ? (
        <View style={styles.patternList}>
          {filteredPatterns.map((pattern) => (
            <PatternPreviewCard key={pattern.id} pattern={pattern} />
          ))}
        </View>
      ) : (
        <AppText style={styles.emptyMessage} variant="body">
          No patterns found
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
  patternList: {
    gap: theme.spacing[4],
  },
  emptyMessage: {
    paddingHorizontal: theme.spacing[1],
    paddingVertical: theme.spacing[3],
  },
});
