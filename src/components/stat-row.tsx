import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { theme } from '@/theme';

type StatRowProps = {
  label: string;
  value: number;
  accessibilityLabel?: string;
};

export function StatRow({ label, value, accessibilityLabel }: StatRowProps) {
  return (
    <View
      accessible
      accessibilityLabel={accessibilityLabel ?? `${label}: ${value}`}
      style={styles.row}>
      <AppText numberOfLines={1} style={styles.label} variant="bodySmall">
        {label}:
      </AppText>
      <AppText style={styles.value} variant="bodySmall">
        {value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.medium,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 36,
    paddingHorizontal: theme.spacing[2],
    shadowColor: theme.colors.overlay,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: '100%',
  },
  label: {
    flexShrink: 1,
  },
  value: {
    marginLeft: theme.spacing[2],
  },
});
