import { StyleSheet, Text, type TextProps } from 'react-native';

import {
  theme,
  typography,
  type SemanticColor,
  type TypographyVariant,
  type TypographyWeight,
} from '@/theme';

export const manropeFontFamilies = {
  regular: 'ManropeRegular',
  semiBold: 'ManropeSemiBold',
  bold: 'ManropeBold',
} as const;

const fontFamiliesByWeight: Record<TypographyWeight, string> = {
  '400': manropeFontFamilies.regular,
  '600': manropeFontFamilies.semiBold,
  '700': manropeFontFamilies.bold,
};

export interface AppTextProps extends TextProps {
  variant?: TypographyVariant;
  color?: SemanticColor;
}

export function AppText({
  variant = 'body',
  color = 'primaryText',
  style,
  ...textProps
}: AppTextProps) {
  return (
    <Text
      {...textProps}
      style={[typographyStyles[variant], colorStyles[color], style]}
    />
  );
}

const typographyStyles = StyleSheet.create({
  display: {
    fontSize: typography.display.fontSize,
    fontFamily: fontFamiliesByWeight[typography.display.weight],
  },
  heading1: {
    fontSize: typography.heading1.fontSize,
    fontFamily: fontFamiliesByWeight[typography.heading1.weight],
  },
  heading2: {
    fontSize: typography.heading2.fontSize,
    fontFamily: fontFamiliesByWeight[typography.heading2.weight],
  },
  heading3: {
    fontSize: typography.heading3.fontSize,
    fontFamily: fontFamiliesByWeight[typography.heading3.weight],
  },
  body: {
    fontSize: typography.body.fontSize,
    fontFamily: fontFamiliesByWeight[typography.body.weight],
  },
  bodyStrong: {
    fontSize: typography.bodyStrong.fontSize,
    fontFamily: fontFamiliesByWeight[typography.bodyStrong.weight],
  },
  bodySmall: {
    fontSize: typography.bodySmall.fontSize,
    fontFamily: fontFamiliesByWeight[typography.bodySmall.weight],
  },
  bodySmallStrong: {
    fontSize: typography.bodySmallStrong.fontSize,
    fontFamily: fontFamiliesByWeight[typography.bodySmallStrong.weight],
  },
  caption: {
    fontSize: typography.caption.fontSize,
    fontFamily: fontFamiliesByWeight[typography.caption.weight],
  },
  button: {
    fontSize: typography.button.fontSize,
    fontFamily: fontFamiliesByWeight[typography.button.weight],
  },
});

const colorStyles = StyleSheet.create({
  appBackground: { color: theme.colors.appBackground },
  surface: { color: theme.colors.surface },
  mutedSurface: { color: theme.colors.mutedSurface },
  primaryAction: { color: theme.colors.primaryAction },
  secondaryAction: { color: theme.colors.secondaryAction },
  highlight: { color: theme.colors.highlight },
  navigation: { color: theme.colors.navigation },
  primaryText: { color: theme.colors.primaryText },
  darkText: { color: theme.colors.darkText },
  textOnDark: { color: theme.colors.textOnDark },
  border: { color: theme.colors.border },
  overlay: { color: theme.colors.overlay },
});
