import { useCallback, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { router, Stack, useFocusEffect, usePathname, type Href } from 'expo-router';

import { FloatingActionTray } from '@/components/floating-action-tray';
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
  const pathname = usePathname();
  const [isActionTrayOpen, setIsActionTrayOpen] = useState(false);
  const activeSection =
    LIBRARY_TABS.find((tab) => tab.route === pathname)?.label ?? 'Inventory';
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
      },
      [],
    ),
  );

  const navigateToTab = (route: Href) => {
    setIsActionTrayOpen(false);
    router.navigate(route);
  };

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
        <SubTabs onNavigate={navigateToTab} tabs={tabs} />
        <View style={styles.contentRegion}>
          <Stack
            screenOptions={{
              animation: 'none',
              contentStyle: { backgroundColor: 'transparent' },
              headerShown: false,
            }}>
            <Stack.Screen name="index" options={{ title: 'Inventory' }} />
            <Stack.Screen name="inventory" options={{ title: 'Inventory' }} />
            <Stack.Screen name="patterns" options={{ title: 'Patterns' }} />
            <Stack.Screen name="tutorials" options={{ title: 'Tutorials' }} />
          </Stack>
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
});
