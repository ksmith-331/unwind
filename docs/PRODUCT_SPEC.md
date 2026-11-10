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
in supported contexts, marked complete while in progress, bookmarked or
removed from To Do, or removed from In Progress. Pattern Edit is not limited
to user-created patterns.

**Delete** permanently deletes a user-owned Pattern or Tutorial. **Remove**
only removes content from To Do or In Progress and does not delete it. Delete
and To-Do mutations remain non-functional until persistence is implemented.

Tutorials can be viewed with their description and reviews, started or
continued, marked complete while in progress, bookmarked or removed from To
Do, or removed from In Progress. Editing is available for user-owned
tutorials.
In-progress Tutorial detail offers Continue, Restart, Complete, and Remove.
Until shared persistence is implemented, only Continue navigates; Restart,
Complete, and Remove are non-mutating placeholders.

User-created Patterns and Tutorials share a publication lifecycle with Draft
and Published states. Published owned content may show its publication status
in detail. Publication status is separate from visibility, which may be Public
or Private. Publishing, unpublishing, and visibility controls are not yet
implemented.

## Content detail overlays

Pattern, Tutorial, and Inventory details use canonical content routes presented
as modal overlays above the exact originating screen. The origin remains
mounted with its tab, subtab, content, search, scroll position where practical,
navbar, and FAB state. A full-window black scrim at 40% opacity covers the
origin and blocks its interaction and accessibility traversal while the detail
is open. The detail card rises from the bottom; tapping outside it or using
Back on the main detail closes the overlay and restores the existing origin.

Description, Reviews, and Inventory Notes/Restock are internal pages of the
detail overlay, not separate global destinations. Back from an internal page
returns to the main detail; Back from the main detail closes the overlay.
Outside-tap dismissal closes the entire overlay from any internal page.

Main Pattern/Tutorial detail normally keeps a fixed header and action bar
around a bounded, non-scrolling body. Titles and Description/Reviews previews
are bounded and truncated. Full descriptions and reviews appear on internal
pages, which may scroll. Reviews require a username, rating, and date; written
text and an image are optional. The full Reviews view supports rating-only
reviews without placeholder text.

Detail actions derive from typed current content/user state rather than only
from the originating screen. Patterns may offer Edit for community and
user-created content where the applicable action set allows it. Tutorial
Edit is available only for user-created tutorials.

Inventory detail presents paired item photos and structured Brand, Color,
Type, Size, SKU, and Stocked At/vendor information, followed by bounded Notes
and Restock previews. Vendor labels are informational. Notes and Restock open
local pages within the same overlay. Inventory detail offers Duplicate, Edit,
and Delete; these actions remain non-mutating placeholders until supported
creation, editing, and persistence flows exist. Deleting an Inventory item
must not be confused with removing a Pattern or Tutorial from To Do or
In Progress.

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
- Settings is one grouped surface with **Account** (Profile, Security, Log
  Out), **Notifications** (Project & tutorial reminders, Community activity,
  App updates), **Appearance & Accessibility** (system Reduce Motion and a
  Theme/System placeholder), **Privacy & Data** (Privacy settings, Cookie use,
  Delete account), and **About** (About UnWind, Terms of Service, Privacy
  Policy, Open-source licenses, and app version).
- Notification controls currently demonstrate local-only UI state. Account
  management, authentication actions, theme selection, privacy/data actions,
  and legal/about destinations are future functionality; they do not mutate
  accounts, persist preferences, or navigate to placeholder destinations.
- Delete account is a non-functional destructive-action placeholder and must
  eventually require confirmation before any deletion capability exists.

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
