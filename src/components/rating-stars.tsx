import { StyleSheet, Text, View } from 'react-native';

import { theme } from '@/theme';

type RatingStarsProps = {
  rating: number;
  max?: number;
  size?: number;
  accessibilityLabel?: string;
};

type StarState = 'full' | 'half' | 'empty';

function getStarState(rating: number, position: number): StarState {
  if (rating >= position) {
    return 'full';
  }
  if (rating >= position - 0.5) {
    return 'half';
  }
  return 'empty';
}

export function RatingStars({
  rating,
  max = 5,
  size = 16,
  accessibilityLabel,
}: RatingStarsProps) {
  const clampedRating = Math.max(0, Math.min(rating, max));
  const visualRating = Math.round(clampedRating * 2) / 2;
  const accessibleLabel =
    accessibilityLabel ??
    `Rated ${clampedRating} out of ${max} stars`;

  return (
    <View
      accessible={Boolean(accessibilityLabel)}
      accessibilityLabel={accessibleLabel}
      style={styles.row}>
      {Array.from({ length: max }, (_, index) => {
        const state = getStarState(visualRating, index + 1);
        return <Star key={index} size={size} state={state} />;
      })}
    </View>
  );
}

function Star({ size, state }: { size: number; state: StarState }) {
  const glyph = state === 'empty' ? '☆' : '★';
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[styles.star, { height: size, width: size }]}>
      <Text
        allowFontScaling={false}
        style={[
          styles.glyph,
          {
            color: state === 'empty' ? theme.colors.border : theme.colors.highlight,
            fontSize: size,
            lineHeight: size,
          },
        ]}>
        {state === 'half' ? '☆' : glyph}
      </Text>
      {state === 'half' ? (
        <View pointerEvents="none" style={[styles.halfFill, { width: size / 2 }]}>
          <Text
            allowFontScaling={false}
            style={[
              styles.glyph,
              {
                color: theme.colors.highlight,
                fontSize: size,
                lineHeight: size,
                width: size,
              },
            ]}>
            ★
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 1,
  },
  star: {
    overflow: 'hidden',
  },
  glyph: {
    includeFontPadding: false,
    textAlign: 'center',
  },
  halfFill: {
    height: '100%',
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
  },
});
