import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AppCard } from '@/components/app-card';
import { AppText } from '@/components/app-text';
import { SEARCH_FILTER_ICON, SearchInput, type SearchInputAction } from '@/components/search-input';
import { TutorialPreviewCard } from '@/components/tutorial-preview-card';
import { TutorialThumbnail } from '@/components/tutorial-thumbnail';
import {
  communityTutorials,
  continueTutorials,
  myTutorials,
} from '@/mocks/discover-tutorials';
import { theme } from '@/theme';
import type { TutorialPreview } from '@/types/tutorial-preview';
import { getPreviewAccent } from '@/utils/preview-accent';

const SEARCH_ACTIONS: readonly SearchInputAction[] = [
  {
    accessibilityLabel: 'Filter tutorials',
    icon: SEARCH_FILTER_ICON,
  },
];

type TutorialStripProps = {
  title: string;
  tutorials: readonly TutorialPreview[];
  accentOffset: number;
  destination: '/profile/library/tutorials' | '/projects';
  accessibilityLabel: string;
};

function TutorialStrip({
  title,
  tutorials,
  accentOffset,
  destination,
  accessibilityLabel,
}: TutorialStripProps) {
  return (
    <AppCard style={styles.tutorialSection}>
      <Pressable
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        hitSlop={{ bottom: 6, top: 6 }}
        onPress={() => router.push(destination)}
        style={({ pressed }) => [styles.sectionHeader, pressed && styles.pressed]}>
        <AppText variant="bodySmallStrong">{title}</AppText>
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={styles.chevron}>
          <AppText color="primaryText" variant="heading3">
            ›
          </AppText>
        </View>
      </Pressable>
      <ScrollView
        contentContainerStyle={styles.thumbnailList}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {tutorials.map((tutorial, index) => (
          <TutorialThumbnail
            accent={getPreviewAccent(index + accentOffset)}
            key={tutorial.id}
            tutorial={tutorial}
          />
        ))}
      </ScrollView>
    </AppCard>
  );
}

export default function DiscoverLearnRoute() {
  const [query, setQuery] = useState('');
  const isSearching = query.trim().length > 0;
  const tutorials = useMemo(() => {
    const seenIds = new Set<string>();
    return [...communityTutorials, ...myTutorials].filter((tutorial) => {
      if (seenIds.has(tutorial.id)) {
        return false;
      }
      seenIds.add(tutorial.id);
      return true;
    });
  }, []);
  const visibleTutorials = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return tutorials.filter((tutorial) =>
      !normalizedQuery ||
      tutorial.title.toLowerCase().includes(normalizedQuery),
    );
  }, [query, tutorials]);

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

      {!isSearching && (
        <>
          <TutorialStrip
            accentOffset={0}
            accessibilityLabel="View tutorials in progress"
            destination="/projects"
            title="Continue . . ."
            tutorials={continueTutorials}
          />
          <TutorialStrip
            accentOffset={1}
            accessibilityLabel="View my Tutorials"
            destination="/profile/library/tutorials"
            title="My Tutorials"
            tutorials={myTutorials}
          />
        </>
      )}

      <View style={styles.communitySection}>
        {!isSearching && (
          <AppText style={styles.sectionTitle} variant="bodyStrong">
            Tutorials
          </AppText>
        )}
        {visibleTutorials.length > 0 ? (
          <View style={styles.communityList}>
            {visibleTutorials.map((tutorial, index) => (
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
    paddingVertical: theme.spacing[2],
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 32,
    justifyContent: 'space-between',
    marginBottom: 0,
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
  pressed: {
    opacity: 0.7,
  },
});