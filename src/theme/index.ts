export const brandColors = {
  orange: '#F26340',
  lightBlue: '#90D3D0',
  yellow: '#F5BD21',
  blue: '#122F3A',
  white: '#FCFCFC',
  gray: '#F0EFEF',
  overlay: '#000000',
} as const;

export const semanticColors = {
  appBackground: brandColors.white,
  surface: brandColors.white,
  mutedSurface: brandColors.gray,
  primaryAction: brandColors.orange,
  secondaryAction: brandColors.lightBlue,
  highlight: brandColors.yellow,
  navigation: brandColors.blue,
  primaryText: brandColors.blue,
  darkText: brandColors.overlay,
  textOnDark: brandColors.white,
  border: brandColors.gray,
  overlay: brandColors.overlay,
} as const;

export const typography = {
  display: { fontSize: 36, weight: '700' },
  heading1: { fontSize: 30, weight: '700' },
  heading2: { fontSize: 24, weight: '700' },
  heading3: { fontSize: 20, weight: '600' },
  body: { fontSize: 16, weight: '400' },
  bodyStrong: { fontSize: 16, weight: '600' },
  bodySmall: { fontSize: 14, weight: '400' },
  bodySmallStrong: { fontSize: 14, weight: '600' },
  caption: { fontSize: 12, weight: '400' },
  button: { fontSize: 16, weight: '600' },
} as const;

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 10,
  4: 12,
  5: 16,
  6: 24,
  7: 32,
} as const;

export const radii = {
  small: 8,
  medium: 10,
  large: 20,
  extraLarge: 24,
  extraExtraLarge: 30,
  pill: 999,
} as const;

export const shadows = {} as const;

export const theme = {
  brandColors,
  colors: semanticColors,
  typography,
  spacing,
  radii,
  shadows,
} as const;

export type TypographyVariant = keyof typeof typography;
export type TypographyWeight = (typeof typography)[TypographyVariant]['weight'];
export type SemanticColor = keyof typeof semanticColors;
