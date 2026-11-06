import { useCallback, useRef, useState } from 'react';
import { Animated, Easing, Image, StyleSheet, View } from 'react-native';
import { router, Stack, useFocusEffect, usePathname, type Href } from 'expo-router';

import { FloatingActionTray } from '@/components/floating-action-tray';
import { Screen } from '@/components/screen';
import { SubTabs, type SubTabDefinition } from '@/components/sub-tabs';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { theme } from '@/theme';

const PROJECT_TABS: readonly [SubTabDefinition, SubTabDefinition] = [
  { label: 'In Progress', route: '/projects', active: false },
  { label: 'To Do', route: '/projects/todo', active: false },
];

export function ProjectsShell() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [isActionTrayOpen, setIsActionTrayOpen] = useState(false);
  const isNavigatingBetweenTabs = useRef(false);
  const collectionOpacity = useRef(new Animated.Value(1)).current;
  const collectionAnimation = useRef<Animated.CompositeAnimation | null>(null);
  const isTodoActive = pathname === '/projects/todo';
  const tabs: readonly [SubTabDefinition, SubTabDefinition] = [
    { ...PROJECT_TABS[0], active: !isTodoActive },
    { ...PROJECT_TABS[1], active: isTodoActive },
  ];

  useFocusEffect(
    useCallback(
      () => () => {
        setIsActionTrayOpen(false);
        isNavigatingBetweenTabs.current = false;
        collectionAnimation.current?.stop();
        collectionOpacity.setValue(1);
      },
      [collectionOpacity],
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
        collectionOpacity.setValue(0);
        router.navigate(route);
        return;
      }

      collectionAnimation.current = Animated.timing(collectionOpacity, {
        toValue: 0,
        duration: 100,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      });
      collectionAnimation.current.start(({ finished }) => {
        if (finished) {
          router.navigate(route);
        } else {
          isNavigatingBetweenTabs.current = false;
        }
      });
    },
    [collectionOpacity, reduceMotion],
  );

  const showActiveCollection = useCallback(() => {
    if (reduceMotion) {
      collectionOpacity.setValue(1);
      isNavigatingBetweenTabs.current = false;
      return;
    }

    collectionAnimation.current = Animated.timing(collectionOpacity, {
      toValue: 1,
      duration: 140,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });
    collectionAnimation.current.start(() => {
      isNavigatingBetweenTabs.current = false;
    });
  }, [collectionOpacity, reduceMotion]);

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
        <SubTabs tabs={tabs} onNavigate={navigateToTab} />

        <View style={styles.collectionRegion}>
          <Animated.View style={[styles.collectionStack, { opacity: collectionOpacity }]}>
            <Stack
              screenOptions={{
                headerShown: false,
                animation: reduceMotion ? 'none' : 'simple_push',
                animationDuration: 230,
                contentStyle: { backgroundColor: 'transparent' },
              }}>
              <Stack.Screen
                name="index"
                listeners={{ transitionEnd: (event) => !event.data.closing && showActiveCollection() }}
                options={{ title: 'In Progress' }}
              />
              <Stack.Screen
                name="todo"
                listeners={{ transitionEnd: (event) => !event.data.closing && showActiveCollection() }}
                options={{ title: 'To Do' }}
              />
            </Stack>
          </Animated.View>
          <FloatingActionTray
            actions={[
              'Search projects',
              'Upload pattern',
              'Personal patterns',
              'Create pattern',
            ]}
            buttonLabel="Add a project"
            closeButtonLabel="Close project actions"
            dismissButtonLabel="Dismiss project actions"
            isOpen={isActionTrayOpen}
            onDismiss={() => setIsActionTrayOpen(false)}
            onToggle={() => setIsActionTrayOpen((open) => !open)}
            trayAccessibilityLabel="Project actions, coming soon"
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
  collectionRegion: {
    flex: 1,
    position: 'relative',
  },
  collectionStack: {
    flex: 1,
  },
});
