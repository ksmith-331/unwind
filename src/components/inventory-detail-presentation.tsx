import { Image, Pressable, StyleSheet, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { AppText } from '@/components/app-text';
import type { InventoryDetail } from '@/types/inventory-detail';
import { theme } from '@/theme';

type InventoryDetailPresentationProps = {
  detail: InventoryDetail;
  onOpenNotes: () => void;
  onOpenRestock: () => void;
};

const VENDOR_COLORS = [
  theme.colors.secondaryAction,
  theme.colors.primaryAction,
  theme.colors.highlight,
] as const;

const CARD_SHADOW = {
  elevation: 4,
  shadowColor: theme.colors.overlay,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
} as const;

export function InventoryDetailPresentation({
  detail,
  onOpenNotes,
  onOpenRestock,
}: InventoryDetailPresentationProps) {
  return (
    <View style={styles.content}>
      <View style={styles.media}>
        <Image
          accessibilityLabel={`${detail.title} product photo`}
          resizeMode="cover"
          source={detail.primaryMedia}
          style={styles.image}
        />
        <Image
          accessibilityLabel={`${detail.title} floss detail photo`}
          resizeMode="cover"
          source={detail.secondaryMedia}
          style={styles.image}
        />
      </View>

      <View style={styles.metadata}>
        <MetadataLine label="Brand" value={detail.brand} />
        <MetadataLine label="Color" value={detail.color} />
        <MetadataLine label="Type" value={detail.type} />
        <MetadataLine label="Size" value={detail.size} />
        <MetadataLine label="SKU" value={detail.sku} />
      </View>

      <View style={styles.stockedAt}>
        <AppText style={styles.sectionLabel} variant="bodyStrong">
          Stocked At
        </AppText>
        <View style={styles.vendors}>
          {detail.stockedAt.map((vendor, index) => (
            <View
              key={vendor}
              style={[
                styles.vendor,
                { backgroundColor: VENDOR_COLORS[index % VENDOR_COLORS.length] },
              ]}>
              <AppText variant="caption">{vendor}</AppText>
            </View>
          ))}
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={onOpenNotes}
        style={({ pressed }) => [styles.previewCard, pressed && styles.pressed]}>
        <View style={styles.previewHeading}>
          <AppText variant="bodyStrong">Notes</AppText>
          <Chevron />
        </View>
        {detail.notes.map((note) => (
          <AppText key={note} numberOfLines={1} variant="caption">
            {note}
          </AppText>
        ))}
      </Pressable>

      <Pressable
        accessibilityRole="button"
        onPress={onOpenRestock}
        style={({ pressed }) => [
          styles.previewCard,
          styles.restockCard,
          pressed && styles.pressed,
        ]}>
        <View style={styles.previewHeading}>
          <View>
            <AppText variant="bodyStrong">Time to Restock?</AppText>
            <AppText numberOfLines={1} variant="caption">
              {detail.restockPreview}
            </AppText>
          </View>
          <Chevron />
        </View>
      </Pressable>
    </View>
  );
}

function MetadataLine({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metadataLine}>
      <AppText style={styles.metadataLabel} variant="caption">
        {label}
      </AppText>
      <AppText style={styles.metadataValue} variant="caption">
        {value}
      </AppText>
    </View>
  );
}

function Chevron() {
  return (
    <SymbolView
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
      size={18}
      tintColor={theme.colors.navigation}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    gap: theme.spacing[3],
    paddingBottom: theme.spacing[5],
    paddingTop: theme.spacing[1],
  },
  media: {
    aspectRatio: 2.69,
    flexDirection: 'row',
    gap: theme.spacing[5],
  },
  image: {
    ...CARD_SHADOW,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.medium,
    flex: 1,
    height: '100%',
    width: 0,
  },
  metadata: {
    ...CARD_SHADOW,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.medium,
    gap: theme.spacing[1],
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[2],
  },
  metadataLine: {
    alignItems: 'baseline',
    flexDirection: 'row',
  },
  metadataLabel: {
    flex: 0.32,
  },
  metadataValue: {
    flex: 0.68,
  },
  stockedAt: {
    gap: theme.spacing[2],
  },
  sectionLabel: {
    marginLeft: theme.spacing[1],
  },
  vendors: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing[2],
  },
  vendor: {
    borderRadius: theme.radii.pill,
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[1],
  },
  previewCard: {
    ...CARD_SHADOW,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.medium,
    gap: theme.spacing[1],
    justifyContent: 'center',
    minHeight: 136,
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[3],
  },
  previewHeading: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  restockCard: {
    minHeight: 64,
  },
  pressed: {
    opacity: 0.72,
  },
});
