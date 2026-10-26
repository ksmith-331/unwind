# UnWind Design System

## Scope

UnWind currently supports:

- Portrait phone layouts
- iOS and Android
- Light theme only

Tablet layouts and dark mode are outside the current milestone.

## Typography

Primary font family:

- Inter

Required weights:

- Regular: 400
- Medium: 500
- SemiBold: 600
- Bold: 700

Typography must be controlled by centralized tokens. Route files must not
specify font families directly.

## Brand Colors

- Coral: #F26340
- Aqua: #90D3D0
- Yellow: #F5BD21
- Navy: #122F3A
- White: #FCFCFC
- Light Gray: #F0EFEF
- Black: #000000

## Semantic Colors

- App background: White
- Surface: White
- Muted surface: Light Gray
- Primary action: Coral
- Secondary action: Aqua
- Highlight: Yellow
- Navigation: Navy
- Primary text: Black
- Text on dark backgrounds: White
- Border: Light Gray
- Destructive action: Coral until a dedicated destructive color is defined

## Token Rules

- Do not hard-code colors in route or component files.
- Do not hard-code font families in route or component files.
- Use the spacing scale instead of arbitrary spacing values.
- Use the radius scale instead of arbitrary corner radii.
- Use semantic color names in components.
- Raw brand colors should only be referenced from the theme definition.

## Initial Spacing Scale

- 0: 0
- 1: 4
- 2: 8
- 3: 12
- 4: 16
- 5: 20
- 6: 24
- 8: 32
- 10: 40
- 12: 48

These values are provisional until individual Figma frames are inspected.

## Initial Radius Scale

- Small: 8
- Medium: 12
- Large: 16
- Extra Large: 24
- Pill: 999

These values are provisional until individual Figma frames are inspected.

## Initial Typography Scale

- Caption: 12
- Body Small: 14
- Body: 16
- Heading Small: 20
- Heading: 24
- Display: 32

These values are provisional until individual Figma frames are inspected.

## Shared Component Requirements

Milestone 1 shared components:

- Screen
- AppText
- AppButton
- IconButton
- AppCard
- AppHeader
- SearchInput
- SegmentedTabs
- EmptyState
- ContentImage
- FloatingActionButton
- ConfirmationDialog

Components must:

- Be typed with explicit TypeScript interfaces
- Not use the any type
- Support accessibility labels where appropriate
- Use centralized design tokens
- Avoid application-specific data fetching
- Avoid route navigation unless navigation is part of the component's purpose

## Screen Behavior

- Screen must respect device safe areas.
- Screen must support optional scrolling.
- Screen must provide consistent horizontal padding.
- Screen must use the application background token.

## Button Variants

AppButton should support:

- Primary
- Secondary
- Outline
- Ghost
- Destructive

AppButton should support:

- Loading state
- Disabled state
- Full-width mode
- Accessibility label

## Text Variants

AppText should support:

- Display
- Heading
- Heading Small
- Body
- Body Small
- Caption
- Button

AppText should support weight and semantic color without requiring route files
to specify raw font values.

## Card Behavior

AppCard should support:

- Optional press behavior
- Optional accessibility label
- Default surface, padding, radius, and border
- Custom children

## Figma Precedence

The Figma mockup is authoritative for visual presentation.

Product documentation is authoritative for application behavior, navigation,
and content requirements.

If Figma and product documentation conflict:

- Follow product documentation for behavior.
- Follow Figma for visual styling when doing so does not conflict with product
  requirements.