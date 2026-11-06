import { Image, StyleSheet, View } from 'react-native';
import { Stack, usePathname, type Href } from 'expo-router';

import { Screen } from '@/components/screen';
import { SubTabs, type SubTabDefinition } from '@/components/sub-tabs';
import { theme } from '@/theme';

const STATS_HISTORY_TABS = [
  { label: 'Stats', route: '/profile/stats-history' },
  { label: 'History', route: '/profile/stats-history/history' as Href },
] as const satisfies readonly Omit<SubTabDefinition, 'active'>[];

export function ProfileStatsHistoryShell() {
  const pathname = usePathname();
  const isHistoryActive = pathname === '/profile/stats-history/history';
  const tabs: readonly [SubTabDefinition, SubTabDefinition] = [
    { ...STATS_HISTORY_TABS[0], active: !isHistoryActive },
    { ...STATS_HISTORY_TABS[1], active: isHistoryActive },
  ];

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
        <SubTabs tabs={tabs} />
        <View style={styles.contentRegion}>
          <Stack
            screenOptions={{
              animation: 'none',
              contentStyle: { backgroundColor: 'transparent' },
              headerShown: false,
            }}>
            <Stack.Screen name="index" options={{ title: 'Stats' }} />
            <Stack.Screen name="history" options={{ title: 'History' }} />
          </Stack>
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
  },
});
