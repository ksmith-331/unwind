import { Stack, usePathname } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AuthDecorations } from '@/components/auth-background';

export default function PublicLayout() {
  const pathname = usePathname();
  const decorationVariant =
    pathname === '/welcome'
      ? 'welcome'
      : ['/sign-in', '/register', '/forgot-password'].includes(pathname)
        ? 'form'
        : null;

  return (
    <View style={styles.container}>
      {decorationVariant ? <AuthDecorations variant={decorationVariant} /> : null}
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: 'transparent' },
          headerShown: false,
        }}>
        <Stack.Screen name="welcome" />
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="register" />
        <Stack.Screen name="forgot-password" />
        <Stack.Screen name="verify-email" />
        <Stack.Screen name="new-user-setup" />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});