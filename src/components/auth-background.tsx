import { StyleSheet, View, useWindowDimensions } from 'react-native';

import { theme } from '@/theme';

type AuthDecorationsProps = {
  variant: 'welcome' | 'form';
};

export function AuthDecorations({ variant }: AuthDecorationsProps) {
  const { height, width } = useWindowDimensions();
  const ellipseWidth = width * 0.86;
  const ellipseHeight = ellipseWidth * (375 / 323);
  const welcome = variant === 'welcome';

  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      pointerEvents="none"
      style={styles.decorations}>
      <View
        style={[
          styles.ellipse,
          styles.lightBlue,
          {
            height: ellipseHeight,
            width: ellipseWidth,
            left: welcome ? -ellipseWidth * 0.5 : width * 0.44,
            top: welcome ? -ellipseHeight * 0.08 : height * 0.39,
          },
        ]}
      />
      <View
        style={[
          styles.ellipse,
          styles.orange,
          {
            height: ellipseHeight,
            width: ellipseWidth,
            left: welcome ? width - ellipseWidth * 0.42 : -ellipseWidth * 0.55,
            top: welcome ? height * 0.32 : height * 0.47,
          },
        ]}
      />
      <View
        style={[
          styles.ellipse,
          styles.yellow,
          {
            height: ellipseHeight,
            width: ellipseWidth,
            left: welcome ? -ellipseWidth * 0.43 : width - ellipseWidth * 0.76,
            top: welcome ? height * 0.51 : -ellipseHeight * 0.32,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  decorations: {
    ...StyleSheet.absoluteFill,
  },
  ellipse: {
    borderRadius: 999,
    opacity: 0.45,
    position: 'absolute',
  },
  lightBlue: {
    backgroundColor: theme.colors.secondaryAction,
  },
  orange: {
    backgroundColor: theme.colors.primaryAction,
  },
  yellow: {
    backgroundColor: theme.colors.highlight,
  },
});
