# UnWind Navigation

This document is authoritative for route hierarchy and navigation behavior.

## Public flow

- The native splash is shown while the application loads. In the current
  pre-authentication milestone, `/` routes to `/welcome` without creating or
  inferring authentication state.
- Welcome navigates to `/sign-in` or `/register`. Sign In navigates to
  `/forgot-password`; Register offers a link back to Sign In. Back from
  Sign In or Register returns to Welcome, and Forgot Password returns to
  Sign In. Android Back follows the same public route stack.
- Sign In and Register submissions are not connected to account services.
  Verify Email and New User Setup remain unconnected placeholders.
- A development-only shortcut on Sign In may replace the route with `/landing`.
  This is navigation-only and is not a valid production authentication path.
- In the future, a root/session boundary resolves loading, authenticated, or
  unauthenticated status before allowing navigation into `(app)` or `(public)`.
  Real authenticated users enter Landing; unauthenticated users enter Welcome.

## Authenticated entry and main tabs

Landing is the authenticated entry screen and is **not** a selectable main
tab. Its bottom navigation is visible with no active tab. After entering the
main application, Landing is not normally reachable through tab navigation.

The selectable main tabs appear in this order:

1. **Projects** — root: In Progress
2. **Discover** — root: Create
3. **Profile** — root: Profile Home

### Remembered state and reselect

Switching to a different main tab preserves that destination tab's previously
visited nested/subtab state. For example, returning to Projects after visiting
Discover restores Projects / To Do if that was the last Projects subtab.

Pressing the already-active main tab returns to that tab's root:

- Projects -> In Progress
- Discover -> Create
- Profile -> Profile Home

## Subtab groups

- **Projects:** In Progress, To Do
- **Discover:** Create, Learn
- **Profile Library:** Inventory, Patterns, Tutorials
- **Profile Stats + History:** Stats, History

Subtabs are sibling views within their persistent main-section shell.

## Profile destinations

Profile Home links to the Profile Library, Stats + History, and Settings.
Account management is part of Settings; there is no separate My Account
destination.

Settings retains the conceptual `/profile/settings` destination but is
presented by the app-level stack above the main Tabs navigator. The
MainNavigationBar is hidden while Settings is visible, and the underlying
Tabs navigator remains mounted to preserve tab state. Settings' back control
returns explicitly to `/profile` (Profile Home), not to a nested Profile
destination.

## Detail and workspace exceptions

Ordinary nested screens remain within their main tab and retain the main
navigation bar. These presentations are exceptions:

- `/pattern/[patternId]`, `/tutorial/[tutorialId]`, and
  `/inventory/[inventoryItemId]` are canonical modal detail routes presented
  above the current app route.
- The exact originating screen and its state remain mounted beneath a
  full-window scrim. The navbar, SubTabs, FAB, and origin content are covered,
  not removed; they are non-interactive while the modal is open.
- Dismissing a detail returns to the exact origin without resetting its tab,
  subtab, search, or other retained state.
- Description, Reviews, Notes, and Restock are local pages within the detail
  overlay. Back from an internal page returns to the main detail; Back from
  the main detail dismisses the overlay. Outside-tap dismissal closes the
  entire overlay.
- Pattern tracking/editing and tutorial tracking/viewing/editing workspaces
  occupy the full screen and hide the main navigation bar.
- Unauthenticated screens do not show the authenticated main navigation.

Pattern and Tutorial detail routes are reusable across their originating
screens; source location and current ownership/progress affect the available
actions, not the identity of the route.
