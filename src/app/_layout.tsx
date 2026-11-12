import { Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold } from '@expo-google-fonts/manrope';
import { useFonts } from 'expo-font';
import { DefaultTheme, Stack, ThemeProvider, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { manropeFontFamilies } from '@/components/app-text';
import { WovenBackground } from '@/components/woven-background';

const minimumNativeSplashDurationMs = 850;
const nativeSplashStartedAt = Date.now();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const pathname = usePathname();
  const previousScreenStatusStyle = useRef<'dark' | 'light'>('dark');
  const [fontsLoaded, fontError] = useFonts({
    [manropeFontFamilies.regular]: Manrope_400Regular,
    [manropeFontFamilies.semiBold]: Manrope_600SemiBold,
    [manropeFontFamilies.bold]: Manrope_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      const remainingDuration = Math.max(
        0,
        minimumNativeSplashDurationMs - (Date.now() - nativeSplashStartedAt),
      );
      const timeout = setTimeout(() => {
        void SplashScreen.hideAsync();
      }, remainingDuration);

      return () => clearTimeout(timeout);
    }

    return undefined;
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (fontError) {
    return (
      <View style={styles.fontError}>
        <Text>Unable to load the required fonts.</Text>
      </View>
    );
  }

  const isDetailOverlay =
    pathname.startsWith('/pattern/') ||
    pathname.startsWith('/tutorial/') ||
    pathname.startsWith('/inventory/');
  const statusBarStyle = isDetailOverlay
    ? previousScreenStatusStyle.current
    : isNavySubTabsPath(pathname)
      ? 'light'
      : 'dark';
  if (!isDetailOverlay) {
    previousScreenStatusStyle.current = statusBarStyle;
  }

  return (
    <SafeAreaProvider>
      <View style={styles.root}>
        <WovenBackground />
        <StatusBar animated style={statusBarStyle} />
        <ThemeProvider value={DefaultTheme}>
          <Stack
            screenOptions={{
              contentStyle: { backgroundColor: 'transparent' },
              headerShown: false,
            }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(public)" />
            <Stack.Screen name="(app)" />
            <Stack.Screen
              name="pattern/[patternId]"
              options={{
                animation: 'none',
                contentStyle: { backgroundColor: 'transparent' },
                gestureEnabled: false,
                presentation: 'transparentModal',
              }}
            />
            <Stack.Screen
              name="tutorial/[tutorialId]"
              options={{
                animation: 'none',
                contentStyle: { backgroundColor: 'transparent' },
                gestureEnabled: false,
                presentation: 'transparentModal',
              }}
            />
            <Stack.Screen
              name="inventory/[inventoryItemId]"
              options={{
                animation: 'none',
                contentStyle: { backgroundColor: 'transparent' },
                gestureEnabled: false,
                presentation: 'transparentModal',
              }}
            />
            <Stack.Screen name="creator/[userId]" />
            <Stack.Screen name="workspace" options={{ presentation: 'fullScreenModal' }} />
          </Stack>
        </ThemeProvider>
      </View>
    </SafeAreaProvider>
  );
}

function isNavySubTabsPath(pathname: string) {
  return (
    pathname.startsWith('/projects') ||
    pathname.startsWith('/discover') ||
    pathname.startsWith('/profile/library') ||
    pathname.startsWith('/profile/stats-history')
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  fontError: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
