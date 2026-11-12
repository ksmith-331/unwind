import { StyleSheet } from 'react-native';

import { AppText } from '@/components/app-text';
import { Screen } from '@/components/screen';

type RoutePlaceholderProps = {
  name: string;
  textured?: boolean;
};

export function RoutePlaceholder({ name, textured = false }: RoutePlaceholderProps) {
  return (
    <Screen
      contentContainerStyle={styles.centered}
      style={textured ? styles.transparent : undefined}>
      <AppText>{name}</AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  transparent: {
    backgroundColor: 'transparent',
  },
});
