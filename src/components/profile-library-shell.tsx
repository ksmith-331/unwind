import { useCallback, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { router, Stack, useFocusEffect, type Href } from 'expo-router';

import { FloatingActionTray } from '@/components/floating-action-tray';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useActiveSubTab } from '@/hooks/use-active-subtab';
import { useSubTabSwipe } from '@/hooks/use-subtab-swipe';
import { Screen } from '@/components/screen';
import { SubTabs, type SubTabDefinition } from '@/components/sub-tabs';
import { theme } from '@/theme';

const LIBRARY_TABS = [
  { label: 'Inventory', route: '/profile/library/inventory' },
  { label: 'Patterns', route: '/profile/library/patterns' },
  { label: 'Tutorials', route: '/profile/library/tutorials' },
] as const satisfies readonly Omit<SubTabDefinition, 'active'>[];

type LibrarySection = (typeof LIBRARY_TABS)[number]['label'];

const ACTIONS_BY_SECTION: Record<LibrarySection, readonly string[]> = {
  Inventory: ['Create an inventory item', 'Add an inventory item'],
  Patterns: ['Create a pattern', 'Upload a pattern'],
  Tutorials: ['Create a tutorial', 'Upload a tutorial'],
};

export function ProfileLibraryShell() {
  const reduceMotion = useReducedMotion();
  const [isActionTrayOpen, setIsActionTrayOpen] = useState(false);
  const isNavigatingBetweenTabs = useRef(false);
  const contentOpacity = useRef(new Animated.Value(1)).current;
  const contentAnimation = useRef<Animated.CompositeAnimation | null>(null);
  const activeSubTab = useActiveSubTab(
    LIBRARY_TABS.map((tab) => ({
      key: tab.label,
      routes:
        tab.label === 'Inventory'
          ? ['/profile/library', tab.route]
          : [tab.route],
    })),
    'Inventory',
  );
  const activeSection =
    LIBRARY_TABS.find((tab) => tab.label === activeSubTab)?.label ??
    'Inventory';
  const tabs: readonly [
    SubTabDefinition,
    SubTabDefinition,
    SubTabDefinition,
  ] = [
    { ...LIBRARY_TABS[0], active: activeSection === LIBRARY_TABS[0].label },
    { ...LIBRARY_TABS[1], active: activeSection === LIBRARY_TABS[1].label },
    { ...LIBRARY_TABS[2], active: activeSection === LIBRARY_TABS[2].label },
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
                options={{ title: 'Inventory' }}
              />
              <Stack.Screen
                name="inventory"
                listeners={{
                  transitionEnd: (event) => !event.data.closing && showActiveContent(),
                }}
                options={{ title: 'Inventory' }}
              />
              <Stack.Screen
                name="patterns"
                listeners={{
                  transitionEnd: (event) => !event.data.closing && showActiveContent(),
                }}
                options={{ title: 'Patterns' }}
              />
              <Stack.Screen
                name="tutorials"
                listeners={{
                  transitionEnd: (event) => !event.data.closing && showActiveContent(),
                }}
                options={{ title: 'Tutorials' }}
              />
            </Stack>
          </Animated.View>
          <FloatingActionTray
            actions={ACTIONS_BY_SECTION[activeSection]}
            buttonLabel={`${activeSection} actions`}
            closeButtonLabel={`Close ${activeSection.toLowerCase()} actions`}
            dismissButtonLabel={`Dismiss ${activeSection.toLowerCase()} actions`}
            isOpen={isActionTrayOpen}
            onDismiss={() => setIsActionTrayOpen(false)}
            onToggle={() => setIsActionTrayOpen((open) => !open)}
            trayAccessibilityLabel={`${activeSection} actions, coming soon`}
            trayTitle="Coming soon"
          />
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
  },
  contentRegion: {
    flex: 1,
    position: 'relative',
  },
  contentStack: {
    flex: 1,
  },
});
