import { useCallback, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { router, Stack, useFocusEffect, usePathname } from 'expo-router';

import { FloatingActionTray } from '@/components/floating-action-tray';
import { Screen } from '@/components/screen';
import { SubTabs, type SubTabDefinition } from '@/components/sub-tabs';
import { theme } from '@/theme';

const DISCOVER_TABS: readonly [SubTabDefinition, SubTabDefinition] = [
  { label: 'Create', route: '/discover', active: false },
  { label: 'Learn', route: '/discover/learn', active: false },
];

export function DiscoverShell() {
  const pathname = usePathname();
  const [isActionTrayOpen, setIsActionTrayOpen] = useState(false);
  const isLearnActive = pathname === '/discover/learn';
  const tabs: readonly [SubTabDefinition, SubTabDefinition] = [
    { ...DISCOVER_TABS[0], active: !isLearnActive },
    { ...DISCOVER_TABS[1], active: isLearnActive },
  ];

  useFocusEffect(
    useCallback(
      () => () => {
        setIsActionTrayOpen(false);
      },
      [],
    ),
  );

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
          onNavigate={(route) => {
            setIsActionTrayOpen(false);
            router.navigate(route);
          }}
          tabs={tabs}
        />
        <View style={styles.contentRegion}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: 'transparent' },
            }}>
            <Stack.Screen name="index" options={{ title: 'Create' }} />
            <Stack.Screen name="learn" options={{ title: 'Learn' }} />
          </Stack>
          <FloatingActionTray
            actions={['Create a pattern', 'Upload a pattern']}
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
});
