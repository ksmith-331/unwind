# UnWind Design System

## Scope

UnWind currently supports:

- Portrait phone layouts
- iOS and Android
- Light theme only

Tablet layouts and dark mode are outside the current milestone.

## Design Authority

The Figma mockup is authoritative for visual intent.

Product documentation is authoritative for application behavior,
navigation, and content requirements.

Some legacy Figma text styles, paint styles, and individual layers
contain styling that is not part of the intended UnWind design system.

The following should NOT be considered authoritative:

- Named Figma text styles using Inter
- Accidental Inter text layers
- SF Pro text layers
- Named Figma paint styles

When accidental Inter or SF Pro text is found, reproduce its visual
hierarchy using the nearest appropriate Area Variable typography token.

## Typography

Primary font family:

- Area Variable

The application should use Area Variable exclusively for normal UI text.

A small semantic typography scale should be preferred over reproducing
every one-off font size present in Figma.

Initial typography tokens:

- Display: 36px / Bold
- Heading 1: 30px / Bold
- Heading 2: 24px / Bold
- Heading 3: 20px / SemiBold
- Body: 16px / Regular
- Body Strong: 16px / SemiBold
- Body Small: 14px / Regular
- Body Small Strong: 14px / SemiBold
- Caption: 12px / Regular
- Button: 16px / SemiBold

These values may be refined when individual Figma screens are
implemented.

Do not create a new typography token merely because an individual Figma
layer differs by one or two pixels.

Unique typography may be implemented locally when the visual design
clearly requires it.

## Brand Colors

The Figma color variables are authoritative.

- Orange: #F26340
- Light Blue: #90D3D0
- Yellow: #F5BD21
- Blue: #122F3A
- White: #FCFCFC
- Gray: #F0EFEF
- Overlay: #000000

Named Figma paint styles such as Primary, Secondary, Tertiary, and
Annotations are legacy styles and must not define the application theme.

## Semantic Colors

- App Background: White
- Surface: White
- Muted Surface: Gray
- Primary Action: Orange
- Secondary Action: Light Blue
- Highlight: Yellow
- Navigation: Blue
- Primary Text: Blue or Overlay depending on design context
- Text On Dark: White
- Border: Gray
- Overlay: Overlay

Additional semantic roles can be introduced when implementation
demonstrates a repeated need.

## Spacing

Initial spacing scale:

- 0: 0
- 1: 4
- 2: 8
- 3: 10
- 4: 12
- 5: 16
- 6: 24
- 7: 32

Use the nearest appropriate spacing token instead of reproducing
incidental one-off Figma values.

## Corner Radii

Initial radius scale:

- Small: 8
- Medium: 10
- Large: 20
- Extra Large: 24
- Extra Extra Large: 30
- Pill: 999

## Shadows

Shadows will be defined after inspecting the first implemented screens.

Avoid adding arbitrary shadows that are not present in the design.

## Theme Rules

- Do not hard-code brand colors in route files.
- Do not hard-code font families in route files.
- Prefer semantic tokens over raw visual values.
- Prefer established spacing tokens over arbitrary spacing.
- Prefer established radius tokens over arbitrary radii.
- Figma values may be approximated to the nearest token when there is
  no meaningful visual difference.

## Shared Components

Initial reusable components:

- Screen
- AppText
- AppButton
- AppCard

Additional components will be introduced as repeated patterns are
implemented.

Likely future components include:

- AppHeader
- IconButton
- SearchInput
- SegmentedTabs
- EmptyState
- ContentImage
- FloatingActionButton
- ConfirmationDialog

## Screen

Screen should:

- Respect device safe areas
- Support optional scrolling
- Apply consistent screen padding
- Use application background tokens
- Support custom content styles

## AppText

AppText should support:

- Display
- Heading 1
- Heading 2
- Heading 3
- Body
- Body Strong
- Body Small
- Body Small Strong
- Caption
- Button

AppText should use Area Variable.

Route files should not specify font-family or raw font weights.

## AppButton

AppButton should initially support:

- Primary
- Secondary
- Outline
- Ghost
- Destructive

And:

- Loading state
- Disabled state
- Full-width mode
- Accessibility label

Exact button appearance will be refined from Figma.

## AppCard

AppCard should support:

- Optional press behavior
- Optional accessibility label
- Default surface
- Default radius
- Default padding
- Custom children

Exact card appearance will be refined from Figma.

## Accessibility

Interactive components should provide:

- Appropriate accessibility roles
- Accessibility labels when visible text is insufficient
- Disabled-state semantics where applicable

Color must not be the sole indicator of application state.