import { useCallback, useRef, useState } from 'react';
import { Animated, Easing, Image, Pressable, StyleSheet, View } from 'react-native';
import { router, Stack, useFocusEffect, usePathname, type Href } from 'expo-router';

import { AppCard } from '@/components/app-card';
import { AppText } from '@/components/app-text';
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
          {isActionTrayOpen && (
            <Pressable
              accessibilityLabel="Dismiss project actions"
              accessibilityRole="button"
              onPress={() => setIsActionTrayOpen(false)}
              style={styles.dismissLayer}
            />
          )}
          <View pointerEvents="box-none" style={styles.floatingControls}>
            {isActionTrayOpen && (
              <AppCard accessibilityLabel="Project actions, coming soon" style={styles.actionTray}>
                <AppText style={styles.trayHeading} variant="bodySmallStrong">
                  Coming soon
                </AppText>
                <View style={styles.trayAction}>
                  <AppText variant="bodySmall">Create a pattern</AppText>
                </View>
                <View style={styles.trayAction}>
                  <AppText variant="bodySmall">Upload a pattern</AppText>
                </View>
              </AppCard>
            )}
            <Pressable
              accessibilityLabel={isActionTrayOpen ? 'Close project actions' : 'Add a project'}
              accessibilityRole="button"
              accessibilityState={{ expanded: isActionTrayOpen }}
              onPress={() => setIsActionTrayOpen((open) => !open)}
              style={({ pressed }) => [styles.fab, pressed && styles.pressed]}>
              <AppText style={styles.fabLabel} variant="heading2">
                +
              </AppText>
            </Pressable>
          </View>
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
  dismissLayer: {
    ...StyleSheet.absoluteFill,
    elevation: 10,
    zIndex: 10,
  },
  floatingControls: {
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
