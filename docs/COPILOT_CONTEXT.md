# UnWind Copilot Context

## Source of truth

The product documentation is authoritative.

If the product documentation and Figma disagree, follow the product
documentation.

## Technology

- React Native
- Expo
- TypeScript
- Expo Router
- Zustand
- TanStack Query
- React Hook Form
- Zod
- Supabase

## Current milestone

Milestone 1 focuses on:

- Route structure
- Navigation
- Shared UI components
- Design tokens
- Typed mock data
- Screen layouts

## Do not implement yet

- Supabase
- Real authentication
- Image uploads
- Craft-specific pattern tracking
- Craft-specific pattern editing
- Offline synchronization

## Route structure

Expo Router routes are stored in:

src/app

Do not create a second app directory at the repository root.

## Application entry

The application always displays its native splash screen while loading.

If there is no valid session:

Splash -> Welcome -> Sign In or Register

If there is a valid session:

Splash -> Authenticated Landing

Registration flow:

Welcome -> Register -> Verify Email -> New User Setup -> Landing

## Authenticated Landing

Landing is the first authenticated screen.

Landing is not the Projects screen.

Landing provides:

- Pick up where you left off
- Projects navigation
- Discover navigation
- Profile navigation

## Main tabs

The persistent tabs appear in this order:

1. Projects
2. Discover
3. Profile

Projects subtabs:

- In Progress
- To Do

Discover subtabs:

- Create
- Learn

Profile library subtabs:

- Inventory
- Patterns
- Tutorials

## Presentation behavior

Pattern, tutorial, inventory, and creator detail screens are outside
the tab group and appear above it.

Tracking and editing workspaces are outside the tab group and occupy
the full screen.

Do not create separate detail routes for each source location.

One reusable pattern detail route must account for:

- Ownership
- Bookmark state
- Progress status
- Source screen

The same rule applies to tutorial details.

## Engineering rules

- Use TypeScript.
- Do not use the any type.
- Do not duplicate screen components.
- Do not hard-code colors inside route files.
- Use centralized theme tokens.
- Use typed route parameters.
- Use mock data before database integration.
- Keep route files thin.
- Place reusable UI in src/components.
- Place data types in src/types.