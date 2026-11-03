import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '@/theme';

export type MainTab = 'projects' | 'discover' | 'profile';
export type MainNavigationRole = 'button' | 'tab';

type MainNavigationItem = {
  label: string;
  tab: MainTab;
  icon: ComponentProps<typeof SymbolView>['name'];
};

type MainNavigationBarProps = {
  activeTab: MainTab | null;
  onProjectsPress: () => void;
  onDiscoverPress: () => void;
  onProfilePress: () => void;
  bottomInset?: number;
  accessibilityRole?: MainNavigationRole;
  style?: StyleProp<ViewStyle>;
};

const BAR_CONTENT_HEIGHT = 61;

const NAVIGATION_ITEMS: readonly MainNavigationItem[] = [
  {
    label: 'Projects',
    tab: 'projects',
    icon: { ios: 'folder', android: 'folder', web: 'folder' },
  },
  {
    label: 'Discover',
    tab: 'discover',
    icon: { ios: 'magnifyingglass', android: 'search', web: 'search' },
  },
  {
    label: 'Profile',
    tab: 'profile',
    icon: { ios: 'person', android: 'person', web: 'person' },
  },
];

const ACTIVE_BACKGROUNDS: Record<MainTab, string> = {
  projects: theme.colors.secondaryAction,
  discover: theme.colors.primaryAction,
  profile: theme.colors.highlight,
};

export function getMainNavigationBarHeight(bottomInset: number) {
  return BAR_CONTENT_HEIGHT + bottomInset;
}

export function MainNavigationBar({
  activeTab,
  onProjectsPress,
  onDiscoverPress,
  onProfilePress,
  bottomInset,
  accessibilityRole = 'button',
  style,
}: MainNavigationBarProps) {
  const safeAreaInsets = useSafeAreaInsets();
  const resolvedBottomInset = bottomInset ?? safeAreaInsets.bottom;
  const onPressByTab: Record<MainTab, () => void> = {
    projects: onProjectsPress,
    discover: onDiscoverPress,
    profile: onProfilePress,
  };
  const containerRole = accessibilityRole === 'tab' ? 'tablist' : 'toolbar';

  return (
    <View
      accessibilityRole={containerRole}
      style={[
        styles.container,
        { height: getMainNavigationBarHeight(resolvedBottomInset) },
        style,
      ]}>
      {NAVIGATION_ITEMS.map((item) => {
        const isActive = activeTab === item.tab;

        return (
          <Pressable
            accessibilityLabel={item.label}
            accessibilityRole={accessibilityRole}
            accessibilityState={
              accessibilityRole === 'tab' ? { selected: isActive } : undefined
            }
            key={item.tab}
            onPress={onPressByTab[item.tab]}
            style={({ pressed }) => [
              styles.section,
              { backgroundColor: isActive ? ACTIVE_BACKGROUNDS[item.tab] : theme.colors.navigation },
              pressed && styles.pressed,
            ]}>
            <View pointerEvents="none" style={styles.iconFrame}>
              <SymbolView
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
                name={item.icon}
                size={26}
                tintColor={isActive ? theme.colors.darkText : theme.colors.textOnDark}
              />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: theme.colors.navigation,
    flexDirection: 'row',
    width: '100%',
  },
  section: {
    alignItems: 'center',
    flex: 1,
  },
  iconFrame: {
    alignItems: 'center',
    height: BAR_CONTENT_HEIGHT,
    justifyContent: 'center',
    width: '100%',
  },
  pressed: {
    opacity: 0.7,
  },
});
