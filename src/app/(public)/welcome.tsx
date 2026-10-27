import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/app-button';
import { RoutePlaceholder } from '@/components/route-placeholder';

export default function WelcomeRoute() {
  return (
    <View style={styles.container}>
      <RoutePlaceholder name="Welcome" />
      {/* TODO: Remove this button when real authentication/session routing is implemented. */}
      <AppButton label="DEV: View Landing" onPress={() => router.push('/landing')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});