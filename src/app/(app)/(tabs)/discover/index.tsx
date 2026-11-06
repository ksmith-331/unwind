import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppCard } from '@/components/app-card';
import { AppText } from '@/components/app-text';
import { PatternPreviewCard } from '@/components/pattern-preview-card';
import { PatternThumbnail } from '@/components/pattern-thumbnail';
import { SEARCH_FILTER_ICON, SearchInput, type SearchInputAction } from '@/components/search-input';
import { communityPatterns, myPatterns } from '@/mocks/discover-patterns';
import { theme } from '@/theme';
import { getPreviewAccent } from '@/utils/preview-accent';

const SEARCH_ACTIONS: readonly SearchInputAction[] = [
  {
    accessibilityLabel: 'Filter patterns',
    icon: SEARCH_FILTER_ICON,
  },
];

export default function DiscoverCreateRoute() {
  const [query, setQuery] = useState('');
  const filteredCommunityPatterns = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return communityPatterns;
    }

    return communityPatterns.filter((pattern) =>
      pattern.title.toLowerCase().includes(normalizedQuery),
    );
  }, [query]);

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <SearchInput
        accessibilityLabel="Search community patterns"
        onChangeText={setQuery}
        placeholder="Search"
        trailingActions={SEARCH_ACTIONS}
        value={query}
      />

      <AppCard style={styles.myPatternsCard}>
        <View style={styles.myPatternsHeader}>
          <AppText variant="bodySmallStrong">My Patterns</AppText>
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={styles.chevron}>
            <AppText color="primaryText" variant="heading3">
              ›
            </AppText>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={styles.thumbnailList}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {myPatterns.map((pattern, index) => (
            <PatternThumbnail
              accent={getPreviewAccent(index + 1)}
              key={pattern.id}
              pattern={pattern}
            />
          ))}
        </ScrollView>
      </AppCard>

      <View style={styles.communitySection}>
        <AppText style={styles.sectionTitle} variant="bodyStrong">
          Community Patterns
        </AppText>
        {filteredCommunityPatterns.length > 0 ? (
          <View style={styles.communityList}>
            {filteredCommunityPatterns.map((pattern, index) => (
              <PatternPreviewCard
                accent={getPreviewAccent(index)}
                key={pattern.id}
                pattern={pattern}
              />
            ))}
          </View>
        ) : (
          <AppText style={styles.emptyMessage} variant="body">
            No patterns found
          </AppText>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    gap: theme.spacing[4],
    padding: theme.spacing[5],
    paddingBottom: theme.spacing[7],
  },
  myPatternsCard: {
    padding: theme.spacing[4],
  },
  myPatternsHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing[2],
  },
  chevron: {
    alignItems: 'center',
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  thumbnailList: {
    alignItems: 'center',
    gap: theme.spacing[2],
    paddingVertical: theme.spacing[1],
  },
  communitySection: {
    gap: theme.spacing[2],
  },
  sectionTitle: {
    marginHorizontal: theme.spacing[1],
  },
  communityList: {
    gap: theme.spacing[4],
  },
  emptyMessage: {
    paddingHorizontal: theme.spacing[1],
    paddingVertical: theme.spacing[3],
  },
});