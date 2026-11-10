import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { AppText } from '@/components/app-text';

type AuthTextLinkProps = {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export function AuthTextLink({ label, onPress, style }: AuthTextLinkProps) {
  return (
    <Pressable
      accessibilityRole="link"
      onPress={onPress}
      style={({ pressed }) => [styles.link, pressed && styles.pressed, style]}>
      <AppText style={styles.label} variant="bodySmall">
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  link: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: 44,
  },
  label: {
    textDecorationLine: 'underline',
  },
  pressed: {
    opacity: 0.7,
  },
});
