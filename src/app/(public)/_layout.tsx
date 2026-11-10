import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AuthBackground } from '@/components/auth-background';
import { theme } from '@/theme';

export default function PublicLayout() {
  return (
    <View style={styles.container}>
      <AuthBackground />
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
    backgroundColor: theme.colors.appBackground,
    flex: 1,
  },
});