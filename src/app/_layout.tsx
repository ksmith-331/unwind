import { Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold } from '@expo-google-fonts/manrope';
import { useFonts } from 'expo-font';
import { DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { manropeFontFamilies } from '@/components/app-text';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    [manropeFontFamilies.regular]: Manrope_400Regular,
    [manropeFontFamilies.semiBold]: Manrope_600SemiBold,
    [manropeFontFamilies.bold]: Manrope_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
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
          <Stack.Screen name="pattern/[patternId]" />
          <Stack.Screen name="tutorial/[tutorialId]" />
          <Stack.Screen name="inventory/[inventoryItemId]" />
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
