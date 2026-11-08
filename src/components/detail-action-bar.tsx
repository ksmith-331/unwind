import { SymbolView } from 'expo-symbols';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import type { DetailAction, DetailActionId } from '@/types/detail-action';
import { theme } from '@/theme';

type DetailActionBarProps = {
  actions: readonly DetailAction[];
  onAction: (action: DetailAction) => void;
};

const ACTION_ICONS: Record<
  DetailActionId,
  ComponentProps<typeof SymbolView>['name']
> = {
  start: { ios: 'play.circle', android: 'play_circle', web: 'play_circle' },
  continue: { ios: 'arrow.right.circle', android: 'arrow_circle_right', web: 'arrow_circle_right' },
  edit: { ios: 'square.and.pencil', android: 'edit', web: 'edit' },
  complete: { ios: 'checkmark.circle', android: 'check_circle', web: 'check_circle' },
  remove: { ios: 'trash', android: 'delete', web: 'delete' },
  'add-to-do': { ios: 'bookmark', android: 'bookmark', web: 'bookmark' },
  'remove-to-do': { ios: 'bookmark.slash', android: 'bookmark_remove', web: 'bookmark_remove' },
  restart: { ios: 'arrow.counterclockwise', android: 'restart_alt', web: 'restart_alt' },
  delete: { ios: 'trash', android: 'delete', web: 'delete' },
  duplicate: { ios: 'doc.on.doc', android: 'content_copy', web: 'content_copy' },
};

const ACTION_PRESENTATION_OVERRIDES: Partial<
  Record<DetailActionId, { label: string; accessibilityLabel: string }>
> = {
  'add-to-do': { label: 'To-Do', accessibilityLabel: 'Add to To-Do' },
};

export function DetailActionBar({ actions, onAction }: DetailActionBarProps) {
  return (
    <View style={styles.bar}>
      {actions.map((action) => {
        const presentation = ACTION_PRESENTATION_OVERRIDES[action.id];
        return (
          <Pressable
            accessibilityLabel={presentation?.accessibilityLabel ?? action.label}
            accessibilityRole="button"
            key={action.id}
            onPress={() => onAction(action)}
            style={({ pressed }) => [styles.action, pressed && styles.pressed]}>
            <SymbolView
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              name={ACTION_ICONS[action.id]}
              size={24}
              tintColor={theme.colors.textOnDark}
            />
            <AppText color="textOnDark" style={styles.label} variant="caption">
              {presentation?.label ?? action.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    alignItems: 'stretch',
    alignSelf: 'center',
    backgroundColor: theme.colors.navigation,
    borderRadius: theme.radii.medium,
    flexDirection: 'row',
    gap: theme.spacing[1],
    justifyContent: 'center',
    maxWidth: '100%',
    paddingHorizontal: theme.spacing[2],
    paddingVertical: theme.spacing[2],
  },
  action: {
    alignItems: 'center',
    flexBasis: 64,
    flexGrow: 0,
    flexShrink: 1,
    justifyContent: 'center',
    minHeight: 48,
    minWidth: 48,
  },
  label: {
    marginTop: theme.spacing[1],
    maxWidth: '100%',
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
