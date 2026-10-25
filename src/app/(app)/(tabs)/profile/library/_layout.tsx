import { Stack } from 'expo-router';

export default function LibraryLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Library' }} />
      <Stack.Screen name="inventory" options={{ title: 'Inventory' }} />
      <Stack.Screen name="patterns" options={{ title: 'Patterns' }} />
      <Stack.Screen name="tutorials" options={{ title: 'Tutorials' }} />
    </Stack>
  );
}
