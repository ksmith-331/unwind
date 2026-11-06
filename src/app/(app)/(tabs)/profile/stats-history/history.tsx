import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';

export default function ProfileHistoryRoute() {
  return (
    <View style={styles.placeholder}>
      <AppText variant="body">History coming soon</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
