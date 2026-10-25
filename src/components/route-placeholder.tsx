import { StyleSheet, Text, View } from 'react-native';

type RoutePlaceholderProps = {
  name: string;
};

export function RoutePlaceholder({ name }: RoutePlaceholderProps) {
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
