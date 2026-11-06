# UnWind Copilot Context

## Documentation authority

- `PRODUCT_SPEC.md` -> product behavior and feature requirements
- `NAVIGATION.md` -> route hierarchy and navigation behavior
- `DESIGN_SYSTEM.md` -> production visual/design requirements
- `DATA_MODEL.md` -> conceptual data structures
- `ENGINEERING.md` -> implementation, platform, development, and tooling
  constraints
- `app-architecture.md` -> Figma frame/node inventory and visual reference

When documents conflict, follow the authoritative document for that category.
`app-architecture.md` does not override product behavior. Figma visual intent
does not override finalized production requirements.
`App Documents v2.1.docx` is a human-oriented planning/source artifact;
normal implementation work should use the synchronized Markdown documents.

## Current application context

- React Native, Expo, Expo Router, TypeScript; production typography is
  Manrope.
- Authenticated Landing is outside the selectable main tabs.
- Main navigation: Projects, Discover, Profile.
- Main-tab state is remembered when switching tabs; reselecting the active tab
  returns to its root.
- Subtab groups: Projects (In Progress / To Do), Discover (Create / Learn),
  Profile Library (Inventory / Patterns / Tutorials), Stats + History
  (Stats / History).
- Shared UI concepts include `MainNavigationBar`, persistent `SubTabs`
  shells, `SearchInput` (no microphone), `FloatingActionTray`, and the
  dynamic shared `StreakCard`.
- Wide preview-card accent colors are positional presentation state and are
  recalculated from the visible list after search/filtering.
- History records occurrences separately from current content state;
  historical completion is distinct from current completion.
- Use typed mock data that preserves conceptual relationships. Backend
  integration and live persistence are deferred; see `ENGINEERING.md`.

Expo Router routes live under `src/app`. Do not create a second root app
directory. Consult the authority documents above before implementation.
