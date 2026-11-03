import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppCard } from '@/components/app-card';
import { AppText } from '@/components/app-text';
import { SearchInput, type SearchInputAction } from '@/components/search-input';
import { TutorialPreviewCard } from '@/components/tutorial-preview-card';
import { TutorialThumbnail } from '@/components/tutorial-thumbnail';
import {
  communityTutorials,
  continueTutorials,
  myTutorials,
} from '@/mocks/discover-tutorials';
import type { TutorialPreview } from '@/types/tutorial-preview';
import { theme } from '@/theme';

const SEARCH_ACTIONS: readonly SearchInputAction[] = [
  {
    accessibilityLabel: 'Filter tutorials',
    icon: {
      ios: 'line.3.horizontal.decrease',
      android: 'filter_list',
      web: 'filter_list',
    },
  },
];

type TutorialStripProps = {
  title: string;
  tutorials: readonly TutorialPreview[];
};

function TutorialStrip({ title, tutorials }: TutorialStripProps) {
  return (
    <AppCard style={styles.tutorialSection}>
      <View style={styles.sectionHeader}>
        <AppText variant="bodySmallStrong">{title}</AppText>
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
        {tutorials.map((tutorial) => (
          <TutorialThumbnail key={tutorial.id} tutorial={tutorial} />
        ))}
      </ScrollView>
    </AppCard>
  );
}

export default function DiscoverLearnRoute() {
  const [query, setQuery] = useState('');
  const filteredCommunityTutorials = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return communityTutorials;
    }

    return communityTutorials.filter((tutorial) =>
      tutorial.title.toLowerCase().includes(normalizedQuery),
    );
  }, [query]);

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <SearchInput
        accessibilityLabel="Search community tutorials"
        onChangeText={setQuery}
        placeholder="Search"
        trailingActions={SEARCH_ACTIONS}
        value={query}
      />

      <TutorialStrip title="Continue . . ." tutorials={continueTutorials} />
      <TutorialStrip title="My Tutorials" tutorials={myTutorials} />

      <View style={styles.communitySection}>
        <AppText style={styles.sectionTitle} variant="bodyStrong">
          Community Tutorials
        </AppText>
        {filteredCommunityTutorials.length > 0 ? (
          <View style={styles.communityList}>
            {filteredCommunityTutorials.map((tutorial) => (
              <TutorialPreviewCard key={tutorial.id} tutorial={tutorial} />
            ))}
          </View>
        ) : (
          <AppText style={styles.emptyMessage} variant="body">
            No tutorials found
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
  tutorialSection: {
    padding: theme.spacing[4],
  },
  sectionHeader: {
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