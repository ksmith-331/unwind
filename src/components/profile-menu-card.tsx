import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { AppText } from '@/components/app-text';
import { theme, type SemanticColor } from '@/theme';

type ProfileMenuCardProps = {
  title: string;
  accentColor: Extract<SemanticColor, 'secondaryAction' | 'primaryAction' | 'highlight'>;
  onPress: () => void;
  accessibilityLabel: string;
};

const CHEVRON_ICON: ComponentProps<typeof SymbolView>['name'] = {
  ios: 'chevron.right',
  android: 'chevron_right',
  web: 'chevron_right',
};

export function ProfileMenuCard({
  title,
  accentColor,
  onPress,
  accessibilityLabel,
}: ProfileMenuCardProps) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.content}>
        <AppText color="textOnDark" variant="body">
          {title}
        </AppText>
        <SymbolView
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          name={CHEVRON_ICON}
          size={20}
          tintColor={theme.colors.textOnDark}
        />
      </View>
      <View style={[styles.accent, { backgroundColor: theme.colors[accentColor] }]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.navigation,
    borderRadius: theme.radii.medium,
    height: 80,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing[5],
  },
  accent: {
    bottom: 0,
    height: 4,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  pressed: {
    opacity: 0.8,
  },
});
