# UnWind Product Specification

This document is authoritative for product behavior and feature requirements.
Implementation and platform constraints belong in `ENGINEERING.md`;
navigation structure belongs in `NAVIGATION.md`.

## Purpose

UnWind helps crafters discover, organize, track, and complete patterns and
tutorials; manage craft materials; view their progress; and share work with a
crafting community.

## Authentication and Landing

- The application always displays its splash screen while loading.
- An authenticated user proceeds from Splash to the authenticated Landing.
- An unauthenticated user proceeds to the Welcome/sign-in/register flow.
- Successful sign-in or registration proceeds to Landing. Registration may
  include email verification and new-user setup before Landing.
- Landing is outside the selectable main-tab group. It displays the shared
  bottom navigation with no active tab and is not normally revisited after
  entering the main application.
- “Pick up where you left off” is intended to resume the user's most recent
  active project or tutorial.

## Projects

Projects contains the user's patterns and tutorials in two views:

- **In Progress** contains active work and displays its progress.
- **To Do** contains bookmarked content that has not been started. It does
  not show artificial 0% progress. Starting an item conceptually moves it to
  In Progress.

Pattern actions depend on ownership and current state. A pattern can be viewed
with its description and reviews, started or continued in tracking, edited
when the user owns it, marked complete while in progress, bookmarked or
removed from To Do, or removed from In Progress.

Tutorials can be viewed with their description and reviews, started or
continued, marked complete while in progress, bookmarked or removed from To
Do, or removed from In Progress. Editing is available for user-owned
tutorials.

## Discover

### Create

- Shows community patterns and a separate **My Patterns** subsection for
  patterns created by the current user.
- With an empty search query, shows My Patterns, a neutral **Patterns**
  heading, and the combined community and personal pattern results.
- During active search, hides My Patterns and the Patterns heading and shows
  only matching combined pattern results or the **No patterns found** empty
  state.
- Clearing the search with the SearchInput X restores the normal browse
  sections and complete combined result list.
- A future filter may exclude personal patterns.
- Patterns can be viewed, started or continued in tracking, edited when
  user-owned, and added to or removed from To Do.

### Learn

- Shows community tutorials, **Continue**, and **My Tutorials** subsections.
- **Continue** means tutorials currently in progress.
- **My Tutorials** means tutorials created by the current user; it is not an
  in-progress list.
- With an empty search query, shows Continue, My Tutorials, a neutral
  **Tutorials** heading, and the combined community and personal tutorial
  results. Continue tutorials are not included in the search result dataset.
- During active search, hides Continue, My Tutorials, and the Tutorials
  heading and shows only matching combined tutorial results or the
  **No tutorials found** empty state.
- Clearing the search with the SearchInput X restores the normal browse
  sections and complete combined result list.
- A future filter may exclude personal tutorials.
- Tutorials can be viewed, started or continued, and added to or removed from
  To Do. User-owned tutorials can be edited.

## Profile

Profile Home includes the user's profile photo/avatar, username, email,
Inventory, Patterns, Tutorials, Stats + History, and Settings. There is no
separate My Account destination; account management belongs under Settings.

The Profile Library contains exactly **Inventory**, **Patterns**, and
**Tutorials**. Tutorials are an intentional production addition even though
the original Figma Profile Library omitted that tab.

- Inventory contains user-created organizational records for materials.
- Patterns and Tutorials contain content created by the current user.
- Stats displays the user's dynamic progress statistics.
- History is an occurrence log of patterns and tutorials the user has worked
  on.
- Settings provides account management, user preferences, and related
  application settings.

## Stats

Stats displays dynamic user data for:

- Daily Streak
- Longest Streak
- Projects Completed
- Projects Created
- Reviews Created
- Tutorials Created
- Tutorials Completed
- Project Types Made
- Materials Logged

The visible presentation of a statistic may vary; the list above defines
tracked statistics, not a requirement that every statistic appear on every
Stats screen design.

## History

History records occurrences of working on a pattern or tutorial. Each
HistoryItem represents one occurrence; multiple HistoryItems may refer to the
same underlying content. Completion is historical state of that occurrence:
restarting content may change its current state but does not erase or change a
previous completed HistoryItem. History supports searching by content; dates
and other future behavior are defined in the data model and design as
applicable.

## Search

Text search is case-insensitive. Search presentation is consistent throughout
the application. Filtering is a future capability; there is no production
microphone or voice-search feature.

## Floating action button

Some main-list views are intended to provide a floating action button (FAB)
that opens an action tray for relevant create, upload, or search actions.
Planned actions are not necessarily implemented or functional. Where present,
the FAB toggles its tray; tapping outside dismisses it without activating
content beneath; navigating away or changing its relevant subview closes it.
The tray's shell persists between sibling views where the product calls for
it. Stats and History do not have creation actions and do not use a FAB.
