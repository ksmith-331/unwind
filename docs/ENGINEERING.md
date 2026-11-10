# UnWind Engineering Guidance

This document is authoritative for implementation, platform, development,
and tooling constraints. Product behavior belongs in `PRODUCT_SPEC.md`;
navigation in `NAVIGATION.md`; visual rules in `DESIGN_SYSTEM.md`; conceptual
data structures in `DATA_MODEL.md`.

## Platform

- Current product target: iOS and Android.
- Expo Go/native mobile behavior is authoritative for current UI development.
- Web may be useful for development but is not a current release target.

## Application implementation

- Use React Native, Expo, Expo Router, and TypeScript.
- Keep application code strictly typed; avoid `any`.
- Avoid `@ts-ignore` unless separately justified.
- Use typed mock data before backend integration.
- Keep routes thin and reusable UI in `src/components`; put types in
  `src/types`.
- Use existing theme tokens and shared UI conventions rather than duplicating
  components.

## Mock-data boundary

Mocks stand in for future backend data and should preserve conceptual
relationships described in `DATA_MODEL.md`. Do not build disposable
synchronization systems between unrelated mock arrays merely to simulate a
future database.

## Accessibility

Recurring controls should provide useful accessibility labels and adequate
touch targets. Difficulty and completion should be conveyed semantically,
not solely through color. Decorative graphics and textures should be excluded
from accessibility and interaction.

## Backend boundary

The current UI milestone defers:

- Supabase integration and live persistence
- Real completion synchronization
- Functional filtering where it is not yet implemented
- Real authentication integration

Do not infer that a planned product action is functional before its
implementation milestone.

## Temporary authentication UI development

The current public authentication screens are visual/navigation-only. Keep
exactly one development shortcut, gated by `__DEV__`, on Sign In. It may
navigate to the existing Landing route but must never create a user, session,
token, or persisted authenticated flag. Remove the shortcut when real
authentication routing is added.

Future Supabase integration belongs at a centralized root/session boundary.
Resolve loading, authenticated, or unauthenticated state there before routing
into the authenticated or public route group; do not make individual forms
simulate or own session state. The native splash currently has a small
850-millisecond minimum presentation duration for development/UI completeness,
concurrent with font loading. This is not a replacement for future session
loading: resolve the Supabase session under the same native splash hold, then
revisit or remove the artificial minimum once real session loading exists.
Do not add a separate React splash screen.

## Known development issue: Expo Router Web SSR

During development with Expo SDK 58, Expo Router web server-side rendering
can produce an order-dependent stack overflow when directly loading nested
Projects routes such as:

- `/projects`
- `/projects/todo`

The error occurs inside Expo's web server-rendering path
(`escapeTextForBrowser`). Current investigation found no recursive component,
duplicate route, circular theme value, or malformed Projects route
registration in application code. Native mobile navigation through Expo Go is
currently unaffected.

Re-evaluate this issue if Expo/Expo Router is upgraded, web becomes a supported
UnWind platform, or the same behavior appears on iOS or Android.
