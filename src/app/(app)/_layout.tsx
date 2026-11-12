import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: 'transparent' },
        headerShown: false,
      }}>
      <Stack.Screen name="landing" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="profile/settings" />
    </Stack>
  );
}