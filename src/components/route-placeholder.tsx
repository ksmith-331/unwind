import { StyleSheet } from 'react-native';

import { AppText } from '@/components/app-text';
import { Screen } from '@/components/screen';

type RoutePlaceholderProps = {
  name: string;
};

export function RoutePlaceholder({ name }: RoutePlaceholderProps) {
  return (
    <Screen contentContainerStyle={styles.centered}>
      <AppText>{name}</AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
