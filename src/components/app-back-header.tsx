import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { AppText } from '@/components/app-text';
import { theme } from '@/theme';

const BACK_ICON: ComponentProps<typeof SymbolView>['name'] = {
  ios: 'chevron.left',
  android: 'arrow_back',
  web: 'arrow_back',
};

type AppBackHeaderProps = {
  title: string;
  onBack: () => void;
};

export function AppBackHeader({ title, onBack }: AppBackHeaderProps) {
  return (
    <View style={styles.header}>
      <Pressable
        accessibilityLabel="Back"
        accessibilityRole="button"
        hitSlop={4}
        onPress={onBack}
        style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
        <SymbolView
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          name={BACK_ICON}
          size={22}
          tintColor={theme.colors.navigation}
        />
      </Pressable>
      <AppText style={styles.title} variant="heading3">
        {title}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 56,
    paddingHorizontal: theme.spacing[2],
  },
  backButton: {
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  title: {
    marginLeft: theme.spacing[1],
  },
  pressed: {
    opacity: 0.65,
  },
});
