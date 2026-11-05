import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { manropeFontFamilies } from '@/components/app-text';
import { theme } from '@/theme';

export type SearchInputAction = {
  accessibilityLabel: string;
  icon: ComponentProps<typeof SymbolView>['name'];
  onPress?: () => void;
  disabled?: boolean;
};

export type SearchInputProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  accessibilityLabel?: string;
  clearable?: boolean;
  trailingActions?: readonly SearchInputAction[];
};

const SEARCH_ICON = {
  ios: 'magnifyingglass',
  android: 'search',
  web: 'search',
} as const;

const CLEAR_ICON = {
  ios: 'xmark.circle.fill',
  android: 'cancel',
  web: 'cancel',
} as const;

export const SEARCH_FILTER_ICON = {
  ios: 'line.3.horizontal.decrease',
  android: 'tune',
  web: 'tune',
} as const;

export function SearchInput({
  value,
  onChangeText,
  placeholder,
  accessibilityLabel,
  clearable = true,
  trailingActions = [],
}: SearchInputProps) {
  return (
    <View style={styles.container}>
      <SymbolView
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        name={SEARCH_ICON}
        size={20}
        tintColor={theme.colors.navigation}
      />
      <TextInput
        accessibilityLabel={accessibilityLabel ?? placeholder}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.navigation}
        returnKeyType="search"
        style={styles.input}
        value={value}
      />
      {clearable && value.length > 0 && (
        <Pressable
          accessibilityLabel="Clear search"
          accessibilityRole="button"
          onPress={() => onChangeText('')}
          style={styles.action}>
          <SymbolView
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            name={CLEAR_ICON}
            size={18}
            tintColor={theme.colors.navigation}
          />
        </Pressable>
      )}
      {trailingActions.map((action) => (
        <Pressable
          accessibilityLabel={action.accessibilityLabel}
          accessibilityRole="button"
          accessibilityState={{ disabled: action.disabled ?? !action.onPress }}
          disabled={action.disabled ?? !action.onPress}
          key={action.accessibilityLabel}
          onPress={action.onPress}
          style={styles.action}>
          <SymbolView
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            name={action.icon}
            size={20}
            tintColor={theme.colors.navigation}
          />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: theme.colors.mutedSurface,
    borderRadius: theme.radii.pill,
    flexDirection: 'row',
    minHeight: 48,
    paddingHorizontal: theme.spacing[3],
  },
  input: {
    color: theme.colors.primaryText,
    flex: 1,
    fontFamily: manropeFontFamilies.regular,
    fontSize: theme.typography.body.fontSize,
    minHeight: 44,
    paddingHorizontal: theme.spacing[2],
    paddingVertical: 0,
  },
  action: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    minWidth: 32,
    paddingHorizontal: theme.spacing[1],
  },
});
