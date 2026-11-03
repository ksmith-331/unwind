import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { AppCard } from '@/components/app-card';
import { AppText } from '@/components/app-text';
import { theme } from '@/theme';

export type FloatingActionTrayProps = {
  isOpen: boolean;
  onToggle: () => void;
  onDismiss: () => void;
  buttonLabel: string;
  closeButtonLabel: string;
  dismissButtonLabel: string;
  trayAccessibilityLabel: string;
  trayTitle: string;
  actions: readonly string[];
  style?: StyleProp<ViewStyle>;
};

export function FloatingActionTray({
  isOpen,
  onToggle,
  onDismiss,
  buttonLabel,
  closeButtonLabel,
  dismissButtonLabel,
  trayAccessibilityLabel,
  trayTitle,
  actions,
  style,
}: FloatingActionTrayProps) {
  return (
    <View pointerEvents="box-none" style={[styles.position, style]}>
      {isOpen && (
        <Pressable
          accessibilityLabel={dismissButtonLabel}
          accessibilityRole="button"
          onPress={onDismiss}
          style={styles.dismissLayer}
        />
      )}
      <View pointerEvents="box-none" style={styles.controls}>
        {isOpen && (
          <AppCard accessibilityLabel={trayAccessibilityLabel} style={styles.actionTray}>
            <AppText style={styles.trayHeading} variant="bodySmallStrong">
              {trayTitle}
            </AppText>
            {actions.map((action) => (
              <View key={action} style={styles.trayAction}>
                <AppText variant="bodySmall">{action}</AppText>
              </View>
            ))}
          </AppCard>
        )}
        <Pressable
          accessibilityLabel={isOpen ? closeButtonLabel : buttonLabel}
          accessibilityRole="button"
          accessibilityState={{ expanded: isOpen }}
          onPress={onToggle}
          style={({ pressed }) => [styles.fab, pressed && styles.pressed]}>
          <AppText style={styles.fabLabel} variant="heading2">
            +
          </AppText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  position: {
    ...StyleSheet.absoluteFill,
    elevation: 20,
    zIndex: 20,
  },
  dismissLayer: {
    ...StyleSheet.absoluteFill,
    elevation: 10,
    zIndex: 10,
  },
  controls: {
    ...StyleSheet.absoluteFill,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: theme.spacing[5],
    paddingRight: theme.spacing[5],
    elevation: 20,
    zIndex: 20,
  },
  fab: {
    alignItems: 'center',
    backgroundColor: theme.colors.secondaryAction,
    borderRadius: theme.radii.pill,
    elevation: 3,
    height: 52,
    justifyContent: 'center',
    shadowColor: theme.colors.overlay,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: 52,
  },
  fabLabel: {
    lineHeight: 36,
  },
  actionTray: {
    alignSelf: 'flex-end',
    marginBottom: theme.spacing[2],
    minWidth: 192,
    padding: theme.spacing[2],
  },
  trayHeading: {
    marginBottom: theme.spacing[1],
  },
  trayAction: {
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: theme.spacing[2],
  },
  pressed: {
    opacity: 0.8,
  },
});
