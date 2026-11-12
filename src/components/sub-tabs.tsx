import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { router, type Href } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { theme } from '@/theme';

export type SubTabDefinition = {
  label: string;
  route: Href;
  active: boolean;
};

type SubTabsProps = {
  tabs:
    | readonly [SubTabDefinition, SubTabDefinition]
    | readonly [SubTabDefinition, SubTabDefinition, SubTabDefinition];
  onNavigate?: (route: Href) => void;
};

export function SubTabs({ tabs, onNavigate }: SubTabsProps) {
  const reduceMotion = useReducedMotion();
  const insets = useSafeAreaInsets();
  const [containerWidth, setContainerWidth] = useState(0);
  const indicatorPosition = useRef(new Animated.Value(0)).current;
  const hasPositionedIndicator = useRef(false);
  const activeIndex = Math.max(0, tabs.findIndex((tab) => tab.active));
  const tabWidth = containerWidth / tabs.length;
  const navigateToIndex = (index: number) => {
    const tab = tabs[index];
    if (!tab || tab.active) {
      return;
    }
    if (onNavigate) {
      onNavigate(tab.route);
    } else {
      router.navigate(tab.route);
    }
  };

  useEffect(() => {
    if (containerWidth === 0) {
      return;
    }

    const targetPosition = activeIndex * tabWidth + tabWidth * 0.14;
    if (!hasPositionedIndicator.current) {
      indicatorPosition.setValue(targetPosition);
      hasPositionedIndicator.current = true;
      return;
    }

    const animation = Animated.timing(indicatorPosition, {
      toValue: targetPosition,
      duration: reduceMotion ? 0 : 180,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });
    animation.start();

    return () => animation.stop();
  }, [activeIndex, containerWidth, indicatorPosition, reduceMotion, tabWidth]);

  return (
    <View style={styles.surface}>
      <View
        pointerEvents="none"
        style={[
          styles.statusBarSurface,
          { height: insets.top + 48, top: -insets.top },
        ]}
      />
      <View
        accessibilityRole="tablist"
        onLayout={({ nativeEvent }) => setContainerWidth(nativeEvent.layout.width)}
        style={styles.container}>
        {tabs.map((tab) => (
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected: tab.active }}
            key={tab.label}
            onPress={() => {
              if (!tab.active) {
                navigateToIndex(tabs.indexOf(tab));
              }
            }}
            style={({ pressed }) => [styles.tab, pressed && styles.pressed]}>
            <AppText
              color="textOnDark"
              variant={tab.active ? 'bodySmallStrong' : 'bodySmall'}>
              {tab.label}
            </AppText>
          </Pressable>
        ))}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.activeIndicator,
            {
              opacity: containerWidth === 0 ? 0 : 1,
              transform: [{ translateX: indicatorPosition }],
              width: tabWidth * 0.72,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  surface: {
    position: 'relative',
  },
  statusBarSurface: {
    backgroundColor: theme.colors.navigation,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  container: {
    alignItems: 'stretch',
    backgroundColor: theme.colors.navigation,
    flexDirection: 'row',
    position: 'relative',
    ...theme.shadows.neutral,
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: theme.spacing[2],
    position: 'relative',
  },
  activeIndicator: {
    backgroundColor: theme.colors.highlight,
    bottom: 0,
    height: 4,
    left: 0,
    position: 'absolute',
  },
  pressed: {
    opacity: 0.75,
  },
});
