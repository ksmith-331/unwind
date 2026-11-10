import { Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold } from '@expo-google-fonts/manrope';
import { useFonts } from 'expo-font';
import { DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { manropeFontFamilies } from '@/components/app-text';

const minimumNativeSplashDurationMs = 850;
const nativeSplashStartedAt = Date.now();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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

  return (
    <SafeAreaProvider>
      <ThemeProvider value={DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
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
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  fontError: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
