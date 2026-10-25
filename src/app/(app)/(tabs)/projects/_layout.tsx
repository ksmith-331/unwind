import { Stack } from 'expo-router';

export default function ProjectsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'In Progress' }} />
      <Stack.Screen name="todo" options={{ title: 'To Do' }} />
    </Stack>
  );
}
