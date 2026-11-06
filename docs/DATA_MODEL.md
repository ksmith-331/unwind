# UnWind Conceptual Data Model

This document describes conceptual application data, not a database schema or
implementation contract. IDs are identifiers; relationships are described
in words to avoid prescribing a storage technology.

## Content

- **Pattern:** `patternID`, project type, optional project subtype,
  `patternName`, `patternDescription`, `createdBy`, `createdOn`, associated
  reviews, and pattern details.
- **Tutorial:** `tutorialID`, project type, optional project subtype,
  `tutorialName`, `tutorialDescription`, `createdBy`, `createdOn`, associated
  reviews, and tutorial details.
- **ProjectType:** `projectType`, `projectTypeName`.
- **ProjectSubType:** `projectSubType`, its parent project type, and subtype
  name.
- **Review:** `reviewID`, author/user ID, rating (1–5), review text, and
  review date; associated with a Pattern or Tutorial.

## User relationships to content

- **UserPattern:** `userPatternID`, user ID, `patternID`, current status
  (`NOT_STARTED`, `IN_PROGRESS`, or `COMPLETED`), percent progress, and
  created/started/completed dates. This describes the user's current
  relationship to the pattern.
- **UserTutorial:** `userTutorialID`, `tutorialID`, current status
  (`NOT_STARTED`, `IN_PROGRESS`, or `COMPLETED`), percent progress, and
  created/started/completed dates. This describes the user's current
  relationship to the tutorial.
- Current completion can change when a user restarts content. It is not the
  same as historical completion recorded by a HistoryItem.

## Users

- **PublicUser:** `userID`, associated authenticated identity, public
  username, avatar path, created/updated dates, and relationships to
  UserPatterns, UserTutorials, InventoryItems, UserStats, and UserHistory.
- **AuthenticatedUser:** private authentication information. Keep
  authentication data separate from public profile data.

## Inventory

- **InventoryItem:** `inventoryItemID`, name, creator/owner, notes, brand,
  color, type, size, SKU, quantity, unit, and associated vendors.
- **Vendor:** `vendorID`, `vendorName`.

## Statistics

- **UserStats:** `userStatsID`, `dailyStreak`, `longestStreak`,
  `projectsCompleted`, `projectsCreated`, `reviewsCreated`,
  `tutorialsCreated`, `tutorialsCompleted`, `projectTypesMade`, and
  `materialsLogged`.

Both `tutorialsCreated` and `tutorialsCompleted` are required and represent
different statistics.

## History occurrences

- **UserHistory:** `userHistoryID` and an ordered collection of HistoryItems.
- **HistoryItem:** `historyItemID`, `itemID`, `itemType` (`Pattern` or
  `Tutorial`), `isComplete`, and `occurredOn`.

`historyItemID` is the unique identity of one occurrence.
`itemID` identifies the referenced UserPattern or UserTutorial relationship.
Multiple HistoryItems may reference the same underlying content. A completed
historical occurrence remains completed if the current content is restarted;
it must not be overwritten by current UserPattern/UserTutorial state.
`occurredOn` records when the occurrence happened and supports chronological
History behavior.

## Presentation data

Preview-card accent colors are not domain/data-model fields. They are
calculated from the item's current visible position in a rendered list and
recalculated after search or filtering.
