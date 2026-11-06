import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Switch, View } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { AppText } from '@/components/app-text';
import { theme } from '@/theme';

const CHEVRON_ICON: ComponentProps<typeof SymbolView>['name'] = {
  ios: 'chevron.right',
  android: 'chevron_right',
  web: 'chevron_right',
};

type SettingsTrailingAccessory =
  | { type: 'chevron' }
  | { type: 'value'; value: string }
  | { type: 'switch'; value: boolean; onValueChange: (value: boolean) => void }
  | { type: 'none' };

type SettingsRowProps = {
  label: string;
  detail?: string;
  icon?: ComponentProps<typeof SymbolView>['name'];
  trailing: SettingsTrailingAccessory;
  onPress?: () => void;
  destructive?: boolean;
  showSeparator?: boolean;
};

export function SettingsRow({
  label,
  detail,
  icon,
  trailing,
  onPress,
  destructive = false,
  showSeparator = false,
}: SettingsRowProps) {
  const content = (
    <>
      {icon ? (
        <SymbolView
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          name={icon}
          size={20}
          tintColor={theme.colors.navigation}
        />
      ) : null}
      <View style={styles.labelGroup}>
        <AppText
          color="primaryText"
          variant={destructive ? 'bodyStrong' : 'body'}>
          {label}
        </AppText>
        {detail ? (
          <AppText color="primaryText" style={styles.detail} variant="caption">
            {detail}
          </AppText>
        ) : null}
      </View>
      {trailing.type === 'chevron' ? (
        <SymbolView
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          name={CHEVRON_ICON}
          size={18}
          tintColor={theme.colors.border}
        />
      ) : null}
      {trailing.type === 'value' ? (
        <AppText color="primaryText" variant="bodySmall">
          {trailing.value}
        </AppText>
      ) : null}
      {trailing.type === 'switch' ? (
        <Switch
          accessibilityLabel={label}
          onValueChange={trailing.onValueChange}
          value={trailing.value}
        />
      ) : null}
    </>
  );
  const rowStyle = [styles.row, showSeparator && styles.separated];

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [rowStyle, pressed && styles.pressed]}>
        {content}
      </Pressable>
    );
  }

  return <View style={rowStyle}>{content}</View>;
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing[3],
    justifyContent: 'space-between',
    minHeight: 56,
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[2],
  },
  labelGroup: {
    flex: 1,
    gap: theme.spacing[1],
  },
  detail: {
    opacity: 0.72,
  },
  separated: {
    borderBottomColor: theme.colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  pressed: {
    backgroundColor: theme.colors.mutedSurface,
  },
});
