# UnWind Navigation

This document is authoritative for route hierarchy and navigation behavior.

## Public flow

- The splash screen is shown while the application loads.
- Unauthenticated users continue to Welcome, Sign In, or Register.
- Registration may continue through Verify Email and New User Setup.
- Successful authentication enters Landing.

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

## Detail and workspace exceptions

Ordinary nested screens remain within their main tab and retain the main
navigation bar. These presentations are exceptions:

- Pattern, Tutorial, and Inventory details are presented above the tab
  navigator.
- Pattern tracking/editing and tutorial tracking/viewing/editing workspaces
  occupy the full screen and hide the main navigation bar.
- Unauthenticated screens do not show the authenticated main navigation.

Pattern and Tutorial detail routes are reusable across their originating
screens; source location and current ownership/progress affect the available
actions, not the identity of the route.
