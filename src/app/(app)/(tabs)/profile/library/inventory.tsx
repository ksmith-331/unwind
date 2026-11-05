import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { AppText } from '@/components/app-text';
import { InventoryTile } from '@/components/inventory-tile';
import { SearchInput } from '@/components/search-input';
import { inventoryItems } from '@/mocks/inventory-items';
import { theme } from '@/theme';

const FILTER_ICON = {
  ios: 'line.3.horizontal.decrease',
  android: 'tune',
  web: 'tune',
} as const;

export default function LibraryInventoryRoute() {
  const [searchText, setSearchText] = useState('');
  const [tileSize, setTileSize] = useState(0);
  const matchingItems = inventoryItems.filter((item) =>
    item.name.toLowerCase().includes(searchText.trim().toLowerCase()),
  );

  return (
    <View
      onLayout={({ nativeEvent }) => {
        const gridWidth = nativeEvent.layout.width;
        const gap = theme.spacing[3];
        const horizontalPadding = theme.spacing[5];
        setTileSize((gridWidth - horizontalPadding * 2 - gap * 2) / 3);
      }}
      style={styles.container}>
      <FlatList
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.gridContent}
        data={matchingItems}
        ItemSeparatorComponent={RowSeparator}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <AppText style={styles.emptyMessage} variant="body">
            No inventory items found
          </AppText>
        }
        ListHeaderComponent={
          <View style={styles.search}>
            <SearchInput
              accessibilityLabel="Search inventory"
              onChangeText={setSearchText}
              placeholder="Search"
              trailingActions={[
                {
                  accessibilityLabel: 'Filter inventory',
                  icon: FILTER_ICON,
                },
              ]}
              value={searchText}
            />
          </View>
        }
        keyboardShouldPersistTaps="handled"
        numColumns={3}
        renderItem={({ item }) => (
          <InventoryTile
            item={item}
            onPress={() =>
              router.push({
                pathname: '/inventory/[inventoryItemId]',
                params: { inventoryItemId: item.id },
              })
            }
            size={tileSize}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

function RowSeparator() {
  return <View style={styles.rowSeparator} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridContent: {
    flexGrow: 1,
    paddingBottom: 92,
    paddingHorizontal: theme.spacing[5],
  },
  search: {
    marginBottom: theme.spacing[6],
    marginTop: theme.spacing[5],
  },
  row: {
    columnGap: theme.spacing[3],
  },
  rowSeparator: {
    height: theme.spacing[6],
  },
  emptyMessage: {
    paddingTop: theme.spacing[6],
    textAlign: 'center',
  },
});
