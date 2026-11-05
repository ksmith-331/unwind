import { Image, Pressable, StyleSheet, View } from 'react-native';

import type { InventoryPreview } from '@/types/inventory-preview';
import { theme } from '@/theme';

type InventoryTileProps = {
  item: InventoryPreview;
  size: number;
  onPress: () => void;
};

const YARN_STRANDS = [0, 1, 2, 3, 4, 5, 6, 7] as const;

export function InventoryTile({ item, size, onPress }: InventoryTileProps) {
  const thumbnail = item.thumbnail;

  return (
    <View
      style={[
        styles.shadow,
        {
          height: size,
          width: size,
        },
      ]}>
      <Pressable
        accessibilityLabel={item.name}
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [
          styles.tile,
          {
            backgroundColor:
              thumbnail.state === 'placeholder'
                ? thumbnail.color
                : theme.colors.surface,
          },
          pressed && styles.pressed,
        ]}>
        {thumbnail.state === 'image' ? (
          <Image
            accessible={false}
            resizeMode="cover"
            source={thumbnail.source}
            style={styles.thumbnail}
          />
        ) : (
          <View pointerEvents="none" style={styles.thumbnail}>
            {YARN_STRANDS.map((strand) => (
              <View
                key={strand}
                style={[
                  styles.strand,
                  {
                    backgroundColor: thumbnail.strandColor,
                    top: `${strand * 14 - 28}%`,
                    transform: [{ rotate: '-13deg' }],
                  },
                ]}
              />
            ))}
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    borderRadius: theme.radii.medium,
    elevation: 3,
    shadowColor: theme.colors.overlay,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.22,
    shadowRadius: 3,
  },
  tile: {
    borderRadius: theme.radii.medium,
    flex: 1,
    overflow: 'hidden',
  },
  thumbnail: {
    ...StyleSheet.absoluteFill,
    borderRadius: theme.radii.medium,
    overflow: 'hidden',
  },
  strand: {
    height: 5,
    left: '-20%',
    opacity: 0.62,
    position: 'absolute',
    width: '145%',
  },
  pressed: {
    opacity: 0.82,
  },
});
