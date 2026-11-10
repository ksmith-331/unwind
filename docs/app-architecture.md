# UnWind App Architecture Inventory

> This document inventories Figma frames, node IDs, visual variants, and
> reusable visual patterns. It is not authoritative for product behavior,
> navigation behavior, or production data structures. For those decisions,
> follow PRODUCT_SPEC.md, NAVIGATION.md, DESIGN_SYSTEM.md, and DATA_MODEL.md
> as appropriate.

This document inventories the major mobile app screens present on the Figma page `App` (`1898:1191`) and identifies the primary navigation flow and reusable UI patterns.

## 1. Page confirmation

- Confirmed page: `App`
- Page node ID: `1898:1191`
- This is the top-level page containing the mobile app screens and mock variations.

## 2. Major screens on the page

### Onboarding / Authentication

| Screen / frame name | Node ID | Size | Purpose |
| --- | --- | --- | --- |
| Login - Opening | `1898:1192` | `375 x 842` | Welcome screen with Sign In and Register choices. |
| Login - Splash | `2119:1494` | `375 x 842` | Branded native launch-splash visual reference. |
| Login - Sign In | `1923:1459` | `375 x 842` | Sign In form with email, password, and Forgot Password. |
| Landing Page | `1898:1211` | `375 x 842` | Authenticated Landing with streak, resume action, and main navigation. |

### Home

| Screen / frame name | Node ID | Size | Purpose |
| --- | --- | --- | --- |
| Projects Tab - In Progress | `1898:1303` | `375 x 1001` | Main app dashboard showing in-progress projects and the default project home area. |
| Projects Tab - To Do | `1898:1261` | `375 x 1001` | Secondary project list view focused on to-do tasks and upcoming work. |
| Projects Tab - Add | `1898:1926` | `74 x 215` | Floating add/task action tray rather than a standalone screen. |
| Projects Tab - Tracking | `1898:1984` | `375 x 1200` | Progress tracking view for live project status and percentages. |
| Projects Tab - Tracking | `2130:1119` | `375 x 1200` | Alternate tracking variant with a different visual treatment. |
| Projects Tab - Tracking | `2030:1620` | `375 x 1300` | Another tracking-state variation with a slightly taller layout. |
| Projects Tab - Editing | `2018:1557` | `375 x 1200` | Editing experience for adjusting project content or pattern details. |
| Projects Tab - Editing | `2030:1642` | `375 x 1300` | Alternate editing variation with a different card arrangement. |
| Projects Tab - Prog Tutorial | `2075:1006` | `375 x 1366` | Tutorial-focused project view for guided progress learning. |
| Projects Tab - New Tutorial | `2085:951` | `375 x 1643` | More expanded tutorial creation or tutorial detail flow. |

### Projects

| Screen / frame name | Node ID | Size | Purpose |
| --- | --- | --- | --- |
| Projects Tab - In Progress | `1898:1303` | `375 x 1001` | Project home/dashboard listing active work. |
| Projects Tab - To Do | `1898:1261` | `375 x 1001` | Task-oriented project list view. |
| Projects Tab - Tracking | `1898:1984` | `375 x 1200` | Progress tracking view for project accountability. |
| Projects Tab - Editing | `2018:1557` | `375 x 1200` | Project editing/state management view. |
| Projects Tab - View Progress Pattern | `1898:2138` | `375 x 842` | Detail card for a pattern in progress. |
| Projects Tab - View To Do Pattern | `2008:1416` | `375 x 842` | Detail card for a to-do item/pattern. |
| Projects Tab - View Progress Tutorial | `2070:1824` | `375 x 842` | Tutorial detail view tied to in-progress work. |
| Projects Tab - View Progress Pattern | `2070:1907` | `375 x 842` | Alternate pattern-detail variation. |
| Projects Tab - View Progress Pattern | `2096:2332` | `375 x 842` | Another pattern-detail variant. |
| Projects Tab - View To Do Pattern | `2096:2369` | `375 x 842` | Alternate to-do-pattern detail variation. |
| Projects Tab - View Progress Tutorial | `2123:950` | `375 x 842` | Alternate tutorial-detail variation. |

### Discover

| Screen / frame name | Node ID | Size | Purpose |
| --- | --- | --- | --- |
| Discover Tab - Create | `1950:2091` | `375 x 1001` | Create/discovery flow for producing or posting a new project/tutorial pattern. |
| Discover Tab - Learn | `2096:2492` | `375 x 1001` | Learning/discovery surface for consuming tutorials and examples. |

### Profile

| Screen / frame name | Node ID | Size | Purpose |
| --- | --- | --- | --- |
| Profile Tab | `2119:1230` | `375 x 842` | Main personal profile surface / tab entry. |
| Profile Tab - Inventory | `2104:916` | `375 x 1001` | User inventory view showing owned materials or project assets. |
| Profile Tab - Patterns | `2104:1001` | `375 x 1001` | User pattern library or saved pattern collection. |
| Profile Tab - View Inventory | `2104:1075` | `375 x 842` | Detailed item page for a specific material or inventory record. |
| Profile Tab - View Pattern | `2104:1122` | `375 x 842` | Detailed screen for a saved/published pattern. |
| Profile Tab - Tracking | `2114:673` | `375 x 1739` | Tracking/history view showing project or progress snapshots. |
| Profile Tab - Editing | `2116:747` | `375 x 1739` | Editing experience for profile-owned items or patterns. |
| Profile Tab - Stats | `2116:847` | `375 x 842` | Analytics or summary stats screen. |
| Profile Tab - History | `2116:890` | `375 x 1001` | History or recent activity record. |

## 3. Alternate states and duplicate variants

The page clearly contains multiple screens that are not fully separate routes but alternate versions of the same concept:

- Authentication variants
  - `Login - Opening` (`1898:1192`) — Welcome / auth choices
  - `Login - Splash` (`2119:1494`) — branded launch splash
  - `Login - Sign In` (`1923:1459`)

- Project tracking variants
  - `Projects Tab - Tracking` (`1898:1984`)
  - `Projects Tab - Tracking` (`2130:1119`)
  - `Projects Tab - Tracking` (`2030:1620`)

- Project editing variants
  - `Projects Tab - Editing` (`2018:1557`)
  - `Projects Tab - Editing` (`2030:1642`)

- Pattern detail variants
  - `Projects Tab - View Progress Pattern` (`1898:2138`)
  - `Projects Tab - View Progress Pattern` (`2070:1907`)
  - `Projects Tab - View Progress Pattern` (`2096:2332`)

- To-do pattern detail variants
  - `Projects Tab - View To Do Pattern` (`2008:1416`)
  - `Projects Tab - View To Do Pattern` (`2096:2369`)

- Tutorial detail variants
  - `Projects Tab - View Progress Tutorial` (`2070:1824`)
  - `Projects Tab - View Progress Tutorial` (`2123:950`)

- Profile item detail variants
  - `Profile Tab - View Inventory` (`2104:1075`)
  - `Profile Tab - View Pattern` (`2104:1122`)

These are best treated as alternate states or design exploration variants rather than unique app routes.

## 4. Important reusable UI elements

The page repeatedly uses a consistent set of building blocks across screens:

- Status bar / top system chrome
  - Present across many screens as `Android UI/Status Bar`
- Standard mobile card container
  - Rounded rectangles with generous padding and soft corner radii
- Back navigation controls
  - `arrow_back` appears repeatedly
- Action button cluster
  - `Play circle`, `Edit`, `Bookmark`, `Settings`, `Trash 2`, `Copy`
- Pattern/media preview cards
  - Large rounded blocks used for preview thumbnails or project visuals
- Description / reviews / notes collapsible blocks
  - Repeated sections with title, expandable content, and chevron affordances
- Rating display
  - Star-based review UI appears in multiple tutorial and pattern screens
- Tab UI / segmented navigation
  - Reused on project and profile flows
- Floating add/action tray
  - `Projects Tab - Add` acts as a quick utility overlay, not a primary route

## 5. Best candidate for the primary Home screen

The strongest candidate for the app’s primary home screen is:

- `Projects Tab - In Progress` (`1898:1303`)

Why this is the best fit:

- It is the clearest dashboard-style screen.
- It is named as an in-progress project overview rather than a detail or subview.
- It appears to be the main landing area for the app’s primary user task flow.
- It is positioned as the central screen in the app architecture, while the other screens are detail, editing, discovery, or profile views.

## 6. Overall architectural interpretation

This page appears to represent a mobile app with a project-driven home flow:

- Entry/authentication layer
  - Login and landing screens
- Core app work area
  - In-progress projects, to-do list, tracking, editing
- Discovery/content layer
  - Discover tab for creating and learning
- Personal layer
  - Profile, inventory, patterns, stats, history

The app seems designed around a repeated pattern-detail and project-detail model, with many screens functioning as stateful variants of the same underlying content rather than fully distinct destinations.

## 7. Suggested inventory for downstream targeted inspection

Priority screen IDs for follow-up work:

1. `1898:1192` — Welcome / Login - Opening
2. `1898:1211` — Authenticated Landing Page
3. `1898:1303` — Projects Tab - In Progress
4. `1898:1261` — Projects Tab - To Do
5. `1898:1984` — Projects Tab - Tracking
6. `2018:1557` — Projects Tab - Editing
7. `1950:2091` — Discover Tab - Create
8. `2096:2492` — Discover Tab - Learn
9. `2119:1230` — Profile Tab
10. `2104:916` — Profile Tab - Inventory
11. `2104:1001` — Profile Tab - Patterns
12. `2104:1075` — Profile Tab - View Inventory
13. `2104:1122` — Profile Tab - View Pattern

This list is the best starting set for future targeted inspection without drilling into every layout detail on the page.
