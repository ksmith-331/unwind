import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { HistoryPreviewCard } from '@/components/history-preview-card';
import {
  SEARCH_FILTER_ICON,
  SearchInput,
} from '@/components/search-input';
import { historyItems } from '@/mocks/history-items';
import { theme } from '@/theme';

export default function ProfileHistoryRoute() {
  const [searchText, setSearchText] = useState('');
  const filteredHistory = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    if (query.length === 0) {
      return historyItems;
    }
    return historyItems.filter((item) =>
      item.title.toLowerCase().includes(query),
    );
  }, [searchText]);

  return (
    <View style={styles.page}>
      <View style={styles.search}>
        <SearchInput
          accessibilityLabel="Search history"
          onChangeText={setSearchText}
          placeholder="Search"
          trailingActions={[
            {
              accessibilityLabel: 'Filter history',
              icon: SEARCH_FILTER_ICON,
            },
          ]}
          value={searchText}
        />
      </View>
      {filteredHistory.length > 0 ? (
        <ScrollView
          contentContainerStyle={styles.list}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {filteredHistory.map((item) => (
            <HistoryPreviewCard item={item} key={item.historyId} />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyState}>
          <AppText variant="body">No history items found</AppText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingHorizontal: theme.spacing[5],
  },
  search: {
    marginBottom: theme.spacing[5],
    marginTop: theme.spacing[5],
  },
  list: {
    gap: theme.spacing[5],
    paddingBottom: theme.spacing[6],
  },
  emptyState: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
