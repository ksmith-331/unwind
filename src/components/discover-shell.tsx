import { useCallback, useRef, useState } from 'react';
import { Animated, Easing, Image, StyleSheet, View } from 'react-native';
import { router, Stack, useFocusEffect, usePathname, type Href } from 'expo-router';

import { FloatingActionTray } from '@/components/floating-action-tray';
import { Screen } from '@/components/screen';
import { SubTabs, type SubTabDefinition } from '@/components/sub-tabs';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { theme } from '@/theme';

const DISCOVER_TABS: readonly [SubTabDefinition, SubTabDefinition] = [
  { label: 'Create', route: '/discover', active: false },
  { label: 'Learn', route: '/discover/learn', active: false },
];

export function DiscoverShell() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [isActionTrayOpen, setIsActionTrayOpen] = useState(false);
  const isNavigatingBetweenTabs = useRef(false);
  const contentOpacity = useRef(new Animated.Value(1)).current;
  const contentAnimation = useRef<Animated.CompositeAnimation | null>(null);
  const isLearnActive = pathname === '/discover/learn';
  const actions = isLearnActive
    ? ['Create a tutorial', 'Upload a tutorial']
    : ['Create a pattern', 'Upload a pattern'];
  const tabs: readonly [SubTabDefinition, SubTabDefinition] = [
    { ...DISCOVER_TABS[0], active: !isLearnActive },
    { ...DISCOVER_TABS[1], active: isLearnActive },
  ];

  useFocusEffect(
    useCallback(
      () => () => {
        setIsActionTrayOpen(false);
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
      setIsActionTrayOpen(false);

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
    <Screen edges={['top']} contentContainerStyle={styles.screenContent}>
      <View style={styles.page}>
        <Image
          accessible={false}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          pointerEvents="none"
          resizeMode="repeat"
          source={require('../../assets/images/brand/background-texture.png')}
          style={styles.backgroundTexture}
        />
        <SubTabs
          onNavigate={navigateToTab}
          tabs={tabs}
        />
        <View style={styles.contentRegion}>
          <Animated.View style={[styles.contentStack, { opacity: contentOpacity }]}>
            <Stack
              screenOptions={{
                headerShown: false,
                animation: reduceMotion ? 'none' : 'simple_push',
                animationDuration: 230,
                contentStyle: { backgroundColor: 'transparent' },
              }}>
              <Stack.Screen
                name="index"
                listeners={{
                  transitionEnd: (event) => !event.data.closing && showActiveContent(),
                }}
                options={{ title: 'Create' }}
              />
              <Stack.Screen
                name="learn"
                listeners={{
                  transitionEnd: (event) => !event.data.closing && showActiveContent(),
                }}
                options={{ title: 'Learn' }}
              />
            </Stack>
          </Animated.View>
          <FloatingActionTray
            actions={actions}
            buttonLabel="Add to Discover"
            closeButtonLabel="Close Discover actions"
            dismissButtonLabel="Dismiss Discover actions"
            isOpen={isActionTrayOpen}
            onDismiss={() => setIsActionTrayOpen(false)}
            onToggle={() => setIsActionTrayOpen((open) => !open)}
            trayAccessibilityLabel="Discover actions, coming soon"
            trayTitle="Coming soon"
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    flex: 1,
    paddingHorizontal: 0,
  },
  page: {
    backgroundColor: theme.colors.appBackground,
    flex: 1,
  },
  backgroundTexture: {
    ...StyleSheet.absoluteFill,
    opacity: 0.2,
  },
  contentRegion: {
    flex: 1,
    position: 'relative',
  },
  contentStack: {
    flex: 1,
  },
});
