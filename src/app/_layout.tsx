import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
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
  );
}
