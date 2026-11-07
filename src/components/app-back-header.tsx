import type { ComponentProps, ComponentRef, Ref } from 'react';
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
  backAccessibilityLabel?: string;
  titleLines?: 1 | 2;
  backButtonRef?: Ref<ComponentRef<typeof Pressable>>;
  horizontalPadding?: number;
};

export function AppBackHeader({
  title,
  onBack,
  backAccessibilityLabel = 'Back',
  titleLines = 1,
  backButtonRef,
  horizontalPadding = theme.spacing[2],
}: AppBackHeaderProps) {
  return (
    <View style={[styles.header, { paddingHorizontal: horizontalPadding }]}>
      <Pressable
        accessibilityLabel={backAccessibilityLabel}
        accessibilityRole="button"
        hitSlop={4}
        onPress={onBack}
        ref={backButtonRef}
        style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
        <SymbolView
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          name={BACK_ICON}
          size={22}
          tintColor={theme.colors.navigation}
        />
      </Pressable>
      <AppText
        ellipsizeMode="tail"
        numberOfLines={titleLines}
        style={styles.title}
        variant="heading3">
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
  },
  backButton: {
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  title: {
    flex: 1,
    marginLeft: theme.spacing[1],
    paddingRight: theme.spacing[4],
  },
  pressed: {
    opacity: 0.65,
  },
});
