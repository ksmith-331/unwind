import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { AppCard } from '@/components/app-card';
import { AppText } from '@/components/app-text';
import { theme } from '@/theme';

type StreakCardProps = {
  streakCount: number;
  message: string;
  accessibilityLabel: string;
  compact?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function StreakCard({
  streakCount,
  message,
  accessibilityLabel,
  compact = false,
  style,
}: StreakCardProps) {
  return (
    <View accessible accessibilityLabel={accessibilityLabel} style={style}>
      <AppCard style={[styles.card, compact && styles.compactCard]}>
        <View style={styles.content}>
          <AppText color="textOnDark" variant="display">
            daily streak:
          </AppText>
          <AppText color="secondaryAction" style={styles.streakNumber} variant="display">
            {streakCount}
          </AppText>
          <AppText color="textOnDark" variant="body">
            {message.toLowerCase()}
          </AppText>
        </View>
      </AppCard>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: theme.colors.navigation,
    borderRadius: theme.radii.large,
    borderWidth: 0,
    elevation: 4,
    maxWidth: 303,
    padding: theme.spacing[5],
    shadowColor: theme.colors.overlay,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: '100%',
  },
  compactCard: {
    padding: theme.spacing[4],
  },
  content: {
    alignItems: 'center',
    gap: theme.spacing[1],
  },
  streakNumber: {
    fontSize: 64,
    lineHeight: 76,
  },
});
