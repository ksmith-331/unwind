import { Image, StyleSheet, View } from 'react-native';

import { theme } from '@/theme';

export function WovenBackground() {
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      pointerEvents="none"
      style={styles.background}>
      <Image
        accessible={false}
        importantForAccessibility="no-hide-descendants"
        resizeMode="repeat"
        source={require('../../assets/images/brand/background-texture.png')}
        style={styles.texture}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFill,
    backgroundColor: theme.colors.appBackground,
  },
  texture: {
    ...StyleSheet.absoluteFill,
    opacity: 0.2,
  },
});
