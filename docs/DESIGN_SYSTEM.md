# UnWind Design System

This document is authoritative for production visual and design rules.
Figma provides visual reference, but finalized production requirements in
this document and `PRODUCT_SPEC.md` take precedence.

## Scope and visual authority

Current product target: portrait phones on iOS and Android, light theme.
Manrope is the production font. Figma color variables inform the palette;
legacy named styles, Area Variable, Inter, and SF Pro references do not
override production tokens.

## Typography

Use Manrope through the shared typography system. Prefer this semantic scale
instead of reproducing incidental Figma font sizes:

| Variant | Size | Weight |
| --- | ---: | --- |
| Display | 36 | Bold / 700 |
| Heading 1 | 30 | Bold / 700 |
| Heading 2 | 24 | Bold / 700 |
| Heading 3 | 20 | SemiBold / 600 |
| Body | 16 | Regular / 400 |
| Body Strong | 16 | SemiBold / 600 |
| Body Small | 14 | Regular / 400 |
| Body Small Strong | 14 | SemiBold / 600 |
| Caption | 12 | Regular / 400 |
| Button | 16 | SemiBold / 600 |

## Colors

| Color | Value | Semantic use |
| --- | --- | --- |
| Orange | `#F26340` | Primary action |
| Light Blue | `#90D3D0` | Secondary action |
| Yellow | `#F5BD21` | Highlight |
| Blue | `#122F3A` | Navigation and primary text |
| White | `#FCFCFC` | App background and surfaces |
| Gray | `#F0EFEF` | Muted surface and borders |
| Black / Overlay | `#000000` | Overlay and dark text |

Use semantic theme tokens rather than raw brand colors in route styles.

## Spacing, radii, and surfaces

Use the established spacing scale: 0, 4, 8, 10, 12, 16, 24, 32.
Established corner radii are 8, 10, 20, 24, 30, and pill (999). Prefer these
tokens unless a design needs a meaningful exception. Add shadows only where
the screen design supports them.

## Background texture

Ordinary textured app screens use
`assets/images/brand/background-texture.png` at 20% opacity, tiled/repeated,
never stretched. Opacity belongs only to the texture layer and must not fade
foreground content.

Do not use the texture on Pattern detail, Tutorial detail, Inventory detail,
tracking workspaces, or editing workspaces unless a future specific design
explicitly overrides this rule.

## MainNavigationBar

The bar has three equal-width sections in Projects, Discover, Profile order.

- Inactive section: Blue fill and white icon.
- Active Projects: Light Blue fill and black icon.
- Active Discover: Orange fill and black icon.
- Active Profile: Yellow fill and black icon.
- Landing uses the same bar with no active section.

## SubTabs and persistent shells

SubTabs use a navy background, white labels, and a yellow active indicator
that slides between tabs. The section shell, background, and SubTabs remain
mounted while sibling child content changes; child content fades out before
navigation and fades in afterward. Shells support two or three tabs.

Groups:

- Projects: In Progress / To Do
- Discover: Create / Learn
- Profile Library: Inventory / Patterns / Tutorials
- Profile Stats + History: Stats / History

## SearchInput

The common search presentation has a search icon, text input, a conditional
clear X when the query is non-empty, and the canonical filter icon. The X is
an accessible **Clear search** control. There is no microphone or production
voice-search feature. Search text is case-insensitive where implemented;
filters may be added in a future capability.

## Wide preview cards and positional accents

Wide Pattern, Tutorial, and History preview cards use a thumbnail on the
left and a navy information region with a title and difficulty indicator.
Show a completion checkmark only when appropriate to the content's semantics.

The colored bottom accent is presentation state, not content data. Assign it
by current visible list position, starting at index zero:

1. Orange (`primaryAction`)
2. Light Blue (`secondaryAction`)
3. Yellow (`highlight`)
4. Repeat

Recalculate the sequence after search or filtering so the first visible result
always uses Orange. Never store this accent on Pattern, Tutorial, HistoryItem,
or other domain data.

## Completion indicators

Current-content completion is derived from the current UserPattern or
UserTutorial state and may disappear when content is restarted. Historical
completion belongs to an individual History occurrence and remains recorded
after a restart. These are separate concepts; one shared completion boolean
must not drive both.

## Shared StreakCard

The same visual StreakCard is used on Landing and Stats. Its streak value is
dynamic user progress; encouragement text is derived from that streak and may
be refined as product behavior evolves.

## Floating action button

Where a FAB/action tray is specified, it is fixed within its section shell.
Tapping the FAB toggles the tray; tapping outside dismisses it without
activating content underneath. It closes when navigating away or changing the
relevant subtab, while its shell persists across sibling subviews where
applicable. Planned tray actions do not imply those actions are currently
functional. Stats and History have no FAB.

## Accessibility

Interactive controls need useful labels, semantic state, and adequate touch
targets. Difficulty and completion should be understandable without relying
on color alone. Decorative graphics and textures are excluded from
accessibility.
