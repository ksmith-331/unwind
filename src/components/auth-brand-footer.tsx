import { Image, StyleSheet, View } from 'react-native';

export function AuthBrandFooter() {
  return (
    <View style={styles.footer}>
      <Image
        accessible={false}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        resizeMode="contain"
        source={require('../../assets/images/brand/unwind-logo.png')}
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    height: 36,
    justifyContent: 'center',
  },
  logo: {
    height: 34,
    width: 180,
  },
});
