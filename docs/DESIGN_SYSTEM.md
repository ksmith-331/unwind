# UnWind Design System

## Scope

UnWind currently supports:

- Portrait phone layouts
- iOS and Android
- Light theme only

Tablet layouts and dark mode are outside the current milestone.

---

## Design Authority

The Figma mockup is authoritative for visual intent.

Product documentation is authoritative for:

- Application behavior
- Navigation
- Content requirements
- Feature requirements

Some legacy Figma text styles, paint styles, and individual layers contain
styling that is not part of the intended UnWind design system.

The following Figma elements should NOT be considered authoritative:

- Named Figma text styles
- Area Variable font references
- Inter font references
- SF Pro font references
- Named Figma paint styles

When implementing text from Figma, reproduce its visual hierarchy using the
nearest appropriate Manrope typography token.

The Figma color variables ARE authoritative.

---

## Typography

Primary application font:

- Manrope

Manrope replaces Area Variable throughout the production application.

The application should use a small semantic typography scale rather than
reproducing every one-off font size found in Figma.

### Typography Tokens

Display
- Size: 36
- Weight: Bold / 700

Heading 1
- Size: 30
- Weight: Bold / 700

Heading 2
- Size: 24
- Weight: Bold / 700

Heading 3
- Size: 20
- Weight: SemiBold / 600

Body
- Size: 16
- Weight: Regular / 400

Body Strong
- Size: 16
- Weight: SemiBold / 600

Body Small
- Size: 14
- Weight: Regular / 400

Body Small Strong
- Size: 14
- Weight: SemiBold / 600

Caption
- Size: 12
- Weight: Regular / 400

Button
- Size: 16
- Weight: SemiBold / 600

These values may be refined as individual screens are implemented.

Do not create a new typography token simply because an individual Figma
element differs by one or two pixels.

Unique typography may be implemented locally only when the design clearly
requires a meaningful visual distinction.

---

## Brand Colors

The Figma color variables are authoritative.

Orange
- #F26340

Light Blue
- #90D3D0

Yellow
- #F5BD21

Blue
- #122F3A

White
- #FCFCFC

Gray
- #F0EFEF

Overlay
- #000000

Named Figma paint styles such as Primary, Secondary, Tertiary, and
Annotations are legacy styles and must not define the application theme.

---

## Semantic Colors

App Background
- White

Surface
- White

Muted Surface
- Gray

Primary Action
- Orange

Secondary Action
- Light Blue

Highlight
- Yellow

Navigation
- Blue

Primary Text
- Blue

Dark Text
- Overlay

Text On Dark
- White

Border
- Gray

Overlay
- Overlay

Additional semantic roles may be introduced when repeated implementation
needs demonstrate that they are necessary.

---

## Spacing

Use a normalized spacing scale instead of reproducing incidental Figma
measurements.

Spacing 0
- 0

Spacing 1
- 4

Spacing 2
- 8

Spacing 3
- 10

Spacing 4
- 12

Spacing 5
- 16

Spacing 6
- 24

Spacing 7
- 32

Use the nearest appropriate spacing token unless the visual design clearly
requires a unique value.

---

## Corner Radii

Small
- 8

Medium
- 10

Large
- 20

Extra Large
- 24

Extra Extra Large
- 30

Pill
- 999

Use the nearest appropriate radius token instead of reproducing incidental
one-off values.

---

## Shadows

Shadows will be defined as screens requiring them are implemented.

Do not add arbitrary shadows that are not supported by the intended visual
design.

---

## Theme Rules

- Do not hard-code brand colors in route files.
- Do not hard-code font families in route files.
- Do not hard-code recurring typography values in route files.
- Prefer semantic color tokens over raw brand colors.
- Prefer established spacing tokens over arbitrary spacing.
- Prefer established radius tokens over arbitrary radii.
- Figma values may be approximated to the nearest design token when there
  is no meaningful visual difference.

---

## Initial Shared Components

The initial design-system implementation will provide:

- Screen
- AppText
- AppButton
- AppCard

Additional components will be introduced after repeated visual patterns
are encountered during screen implementation.

Likely future components include:

- AppHeader
- IconButton
- SearchInput
- SegmentedTabs
- EmptyState
- ContentImage
- FloatingActionButton
- ConfirmationDialog

---

## Screen

Screen should:

- Respect device safe areas
- Support optional scrolling
- Apply consistent screen padding
- Use application background tokens
- Support custom content styles
- Support screens that intentionally extend content into particular safe
  areas when required later

---

## AppText

AppText should support these semantic variants:

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

AppText should use Manrope.

Normal route components should not specify:

- Font family
- Raw font weight
- Repeated font sizes

These should come from AppText variants.

---

## AppButton

AppButton should initially support:

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

Exact visual details may be refined as the corresponding Figma components
are implemented.

---

## AppCard

AppCard should support:

- Custom children
- Optional press behavior
- Optional accessibility label
- Default surface
- Default radius
- Default padding

Exact visual details may be refined as repeated card designs are implemented.

---

## Accessibility

Interactive components should provide:

- Appropriate accessibility roles
- Accessibility labels where visible text is insufficient
- Disabled-state semantics where applicable
- Adequate touch targets

Color must not be the sole indicator of application state.