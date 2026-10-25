import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Profile Home' }} />
      <Stack.Screen name="library" options={{ title: 'Library' }} />
      <Stack.Screen name="stats-history" options={{ title: 'Stats & History' }} />
      <Stack.Screen name="settings" options={{ title: 'Settings' }} />
    </Stack>
  );
}
