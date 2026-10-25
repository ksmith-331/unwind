import { Stack } from 'expo-router';

export default function DiscoverLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Create' }} />
      <Stack.Screen name="learn" options={{ title: 'Learn' }} />
    </Stack>
  );
}
