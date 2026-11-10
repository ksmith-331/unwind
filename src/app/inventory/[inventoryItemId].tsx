import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { DetailActionBar } from '@/components/detail-action-bar';
import {
  DetailOverlayShell,
  type CloseAfterAnimation,
} from '@/components/detail-overlay-shell';
import { InventoryDetailPresentation } from '@/components/inventory-detail-presentation';
import { inventoryDetails } from '@/mocks/inventory-details';
import { theme } from '@/theme';
import type { DetailAction } from '@/types/detail-action';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { INVENTORY_DETAIL_ACTIONS } from '@/utils/inventory-detail-actions';

type InternalPage = 'main' | 'notes' | 'restock';

export default function InventoryDetailRoute() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { inventoryItemId } = useLocalSearchParams<{
    inventoryItemId: string;
  }>();
  const detail =
    typeof inventoryItemId === 'string'
      ? inventoryDetails[inventoryItemId]
      : undefined;
  const [page, setPage] = useState<InternalPage>('main');
  const [bodyHeight, setBodyHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const reduceMotion = useReducedMotion();
  const maxCardHeight = height - Math.max(insets.top + theme.spacing[5], 48);
  const popupInternalWidth = Math.max(
    0,
    width - 2 * (theme.spacing[2] + theme.spacing[5]),
  );
  const pairedMediaHeight = popupInternalWidth / 2.69;
  const preferredHeight =
    56 +
    theme.spacing[1] +
    pairedMediaHeight +
    3 * theme.spacing[3] +
    128 +
    66 +
    136 +
    64 +
    64 +
    theme.spacing[3] +
    Math.max(insets.bottom, theme.spacing[4]);
  const title =
    page === 'main'
      ? detail?.title ?? 'Inventory unavailable'
      : page === 'notes'
        ? 'Notes'
        : 'Restock';

  const handleBack = useCallback(
    (closeAfterAnimation: CloseAfterAnimation) => {
      if (page === 'main') {
        closeAfterAnimation();
      } else {
        setPage('main');
      }
    },
    [page],
  );

  const handleAction = useCallback((_action: DetailAction) => undefined, []);
  const scrollEnabled = contentHeight > bodyHeight + 1;
  const bodyContent = useMemo(() => {
    if (!detail) {
      return (
        <View style={styles.unavailable}>
          <AppText variant="body">
            This development build does not include this Inventory item yet.
          </AppText>
        </View>
      );
    }

    if (page === 'main') {
      return (
        <InventoryDetailPresentation
          detail={detail}
          onOpenNotes={() => setPage('notes')}
          onOpenRestock={() => setPage('restock')}
        />
      );
    }

    if (page === 'notes') {
      return (
        <View style={styles.internalContent}>
          {detail.notes.map((note) => (
            <AppText key={note} variant="body">
              {note}
            </AppText>
          ))}
        </View>
      );
    }

    return (
      <View style={styles.internalContent}>
        <AppText variant="body">{detail.restockDetails}</AppText>
      </View>
    );
  }, [detail, page]);

  return (
    <DetailOverlayShell
      backAccessibilityLabel={
        page === 'main' ? 'Close inventory details' : 'Back to inventory details'
      }
      onBack={handleBack}
      onDismiss={() => router.dismiss()}
      preferredHeight={detail ? Math.min(preferredHeight, maxCardHeight) : 200}
      minimumHeight={maxCardHeight}
      reduceMotion={reduceMotion}
      title={title}
      actions={
        page === 'main' && detail
          ? () => (
              <DetailActionBar
                actions={INVENTORY_DETAIL_ACTIONS}
                onAction={handleAction}
              />
            )
          : undefined
      }>
      <ScrollView
        key={page}
        onContentSizeChange={(_width, nextHeight) => setContentHeight(nextHeight)}
        onLayout={(event) => setBodyHeight(event.nativeEvent.layout.height)}
        scrollEnabled={scrollEnabled}
        showsVerticalScrollIndicator={false}>
        {bodyContent}
      </ScrollView>
    </DetailOverlayShell>
  );
}

const styles = StyleSheet.create({
  unavailable: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing[5],
  },
  internalContent: {
    gap: theme.spacing[4],
    paddingBottom: theme.spacing[5],
    paddingTop: theme.spacing[4],
  },
});