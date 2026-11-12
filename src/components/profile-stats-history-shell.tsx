import { useCallback, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  router,
  Stack,
  useFocusEffect,
  type Href,
} from 'expo-router';

import { useActiveSubTab } from '@/hooks/use-active-subtab';
import { useSubTabSwipe } from '@/hooks/use-subtab-swipe';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { Screen } from '@/components/screen';
import { SubTabs, type SubTabDefinition } from '@/components/sub-tabs';
import { theme } from '@/theme';

const STATS_HISTORY_TABS = [
  { label: 'Stats', route: '/profile/stats-history' },
  { label: 'History', route: '/profile/stats-history/history' as Href },
] as const satisfies readonly Omit<SubTabDefinition, 'active'>[];

export function ProfileStatsHistoryShell() {
  const insets = useSafeAreaInsets();
  const reduceMotion = useReducedMotion();
  const isNavigatingBetweenTabs = useRef(false);
  const contentOpacity = useRef(new Animated.Value(1)).current;
  const contentAnimation = useRef<Animated.CompositeAnimation | null>(null);
  const isHistoryActive =
    useActiveSubTab(
      [
        { key: 'stats', routes: ['/profile/stats-history'] },
        { key: 'history', routes: ['/profile/stats-history/history'] },
      ],
      'stats',
    ) === 'history';
  const tabs: readonly [SubTabDefinition, SubTabDefinition] = [
    { ...STATS_HISTORY_TABS[0], active: !isHistoryActive },
    { ...STATS_HISTORY_TABS[1], active: isHistoryActive },
  ];
  useFocusEffect(
    useCallback(
      () => () => {
        isNavigatingBetweenTabs.current = false;
        contentAnimation.current?.stop();
        contentOpacity.setValue(1);
      },
      [contentOpacity],
    ),
  );

  const navigateToTab = useCallback(
    (route: Href) => {
      if (isNavigatingBetweenTabs.current) {
        return;
      }

      isNavigatingBetweenTabs.current = true;

      if (reduceMotion) {
        contentOpacity.setValue(0);
        router.navigate(route);
        return;
      }

      contentAnimation.current = Animated.timing(contentOpacity, {
        toValue: 0,
        duration: 100,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      });
      contentAnimation.current.start(({ finished }) => {
        if (finished) {
          router.navigate(route);
        } else {
          isNavigatingBetweenTabs.current = false;
        }
      });
    },
    [contentOpacity, reduceMotion],
  );
  const swipeResponder = useSubTabSwipe(tabs, navigateToTab);

  const showActiveContent = useCallback(() => {
    if (reduceMotion) {
      contentOpacity.setValue(1);
      isNavigatingBetweenTabs.current = false;
      return;
    }

    contentAnimation.current = Animated.timing(contentOpacity, {
      toValue: 1,
      duration: 140,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });
    contentAnimation.current.start(() => {
      isNavigatingBetweenTabs.current = false;
    });
  }, [contentOpacity, reduceMotion]);

  return (
    <Screen
      edges={['top']}
      contentContainerStyle={styles.screenContent}
      style={styles.transparentScreen}>
      <View {...swipeResponder.panHandlers} style={styles.page}>
        {!isHistoryActive && (
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            pointerEvents="none"
            style={[styles.decorations, { top: -insets.top }]}>
            <View style={[styles.ellipse, styles.yellowEllipse]} />
            <View style={[styles.ellipse, styles.orangeEllipse]} />
            <View style={[styles.ellipse, styles.blueEllipse]} />
          </View>
        )}
        <SubTabs onNavigate={navigateToTab} tabs={tabs} />
        <View style={styles.contentRegion}>
          <Animated.View style={[styles.contentStack, { opacity: contentOpacity }]}>
            <Stack
              screenOptions={{
                animation: reduceMotion ? 'none' : 'simple_push',
                animationDuration: 230,
                contentStyle: { backgroundColor: 'transparent' },
                headerShown: false,
              }}>
              <Stack.Screen
                name="index"
                listeners={{
                  transitionEnd: (event) => !event.data.closing && showActiveContent(),
                }}
                options={{ title: 'Stats' }}
              />
              <Stack.Screen
                name="history"
                listeners={{
                  transitionEnd: (event) => !event.data.closing && showActiveContent(),
                }}
                options={{ title: 'History' }}
              />
            </Stack>
          </Animated.View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  transparentScreen: {
    backgroundColor: 'transparent',
  },
  screenContent: {
    flex: 1,
    paddingHorizontal: 0,
  },
  page: {
    flex: 1,
    position: 'relative',
  },
  decorations: {
    ...StyleSheet.absoluteFill,
  },
  ellipse: {
    borderRadius: 999,
    height: '45%',
    opacity: 0.42,
    position: 'absolute',
    width: '86%',
  },
  yellowEllipse: {
    backgroundColor: theme.colors.highlight,
    right: '-38%',
    top: 0,
  },
  orangeEllipse: {
    backgroundColor: theme.colors.primaryAction,
    left: '-45%',
    top: '29%',
  },
  blueEllipse: {
    backgroundColor: theme.colors.secondaryAction,
    right: '-44%',
    top: '65%',
  },
  contentRegion: {
    flex: 1,
  },
  contentStack: {
    flex: 1,
  },
});
