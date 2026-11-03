import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, View } from 'react-native';
import { router, type Href } from 'expo-router';

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
  const [containerWidth, setContainerWidth] = useState(0);
  const indicatorPosition = useRef(new Animated.Value(0)).current;
  const hasPositionedIndicator = useRef(false);
  const activeIndex = Math.max(0, tabs.findIndex((tab) => tab.active));
  const tabWidth = containerWidth / tabs.length;

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
              if (onNavigate) {
                onNavigate(tab.route);
              } else {
                router.navigate(tab.route);
              }
            }
          }}
          style={({ pressed }) => [styles.tab, pressed && styles.pressed]}>
          <AppText
            color={tab.active ? 'textOnDark' : 'mutedSurface'}
            variant="bodySmallStrong">
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
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: theme.colors.navigation,
    flexDirection: 'row',
    position: 'relative',
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
