# UnWind: The All-In-One Crafting App

Purpose: The purpose of UnWind is to allow users of multiple experiences and backgrounds the ability to streamline their pattern discovery, tracking, and completion process by removing tedious aspects of pattern management. UnWind would contain support for several different kinds of project types based on traditional weaving artforms, including friendship bracelets, crocheting, knitting, cross-stitching, embroidery, and more. Additionally, users can create and track their materials through inventory items, keep track of how many projects they've made through various statistics. This app is also meant to build community among traditional crafters, as they can find patterns and tutorials made by others, as well as create their own.  

The app is built with React Native, Expo, TypeScript, and Expo Router.

> **Current development status:** UnWind is under active development. The current checkpoint focuses on the application's navigation, interface, content browsing, detail overlays, and mock user/content data. Database integration, real authentication, persistence, and full Pattern/Tutorial tracking and editing are not yet implemented.

---

## Running the App

### Recommended testing environment

UnWind should currently be tested on a **physical Android or iOS device using Expo Go**.

Web/browser testing is not recommended. The application contains mobile-specific behavior such as safe-area handling, system-bar presentation, swipe navigation, modal overlays, and phone-oriented responsive layouts. Web/browser testing may be useful for a general overview of the application, but visual glitches and web-specific errors may occur. 

### Prerequisites

Make sure the development computer has:

- Node.js and npm
- Expo-compatible project dependencies installed through npm

On the mobile device, install:

- **Expo Go**

Expo Go is available for Android and iOS: https://expo.dev/go

---

## First-Time Setup

From the repository root, install the project dependencies:

```bash
npm install
```

After installation finishes, start the Expo development server:

```bash
npx expo start
```

Expo will display a QR code for the running project.

---

## Opening UnWind on a Phone

1. Connect the development computer and phone to the same local network.
2. Start the project:

   ```bash
   npx expo start
   ```

3. Open **Expo Go** on the phone.
4. Scan the QR code displayed by Expo.
5. After the JavaScript bundle and needed assets have loaded, UnWind will open on the phone.

---

## Entering the Authenticated App During Development

Real authentication is not connected yet. Use the following path to enter UnWind for testing:

```text
Welcome
→ Sign In
→ DEV: Continue to authenticated app
→ Landing
```

The DEV button is only a navigation shortcut. It does not create an account, authenticate a user, save a session, or persist login state.

---

## Current Testable Areas

After entering through the DEV shortcut, the Landing screen provides access to the main app via the navigation bar. The three primary navigation areas are:

- **Projects**
- **Discover**
- **Profile**

### Projects

Projects contains:

- **In Progress**
- **To Do**
- Pattern and Tutorial project tiles
- Pattern and Tutorial detail overlays

In Progress may contain both Patterns and Tutorials. To Do contains saved items that have not been started.

### Discover

Discover contains:

- **Create**
- **Learn**
- My Patterns
- Continue (tutorials)
- My Tutorials
- Pattern and Tutorial detail overlays

### Profile

Profile provides access to:

- User created Inventory, Patterns, and Tutorials
- User Stats and History
- Settings (currently with mock implementations)

---

## Detail Overlays

Pattern, Tutorial, and Inventory items can open detail views over the current screen. These overlays currently support features such as:

- descriptions
- reviews
- ratings
- progress/status metadata
- Notes and Restock information for Inventory items
- state-dependent action bars

Many persistence-dependent actions are currently placeholders. For example, actions such as completing a project, deleting an item, or adding/removing To-Do state may be visually present without changing permanent application data yet. These overlays have also only been applied to a subset of visible patterns, tutorials, and inventory items. 

---

## Current Development Limitations

The following systems are not yet fully implemented:

- Supabase database integration
- real Sign In and registration
- persisted authentication sessions
- backend data synchronization
- persisted Add/Remove To-Do changes
- persisted Complete/Remove/Delete actions
- Pattern tracking
- Pattern editing
- Tutorial tracking/view workflows
- Tutorial editing
- Inventory creation/editing
- content creation/uploads
- review submission
- publishing controls
- Public/Private visibility controls

Tracking and editing routes currently use placeholder implementations while the rest of the application architecture is established.

---

## Troubleshooting Expo Go

### The QR code does not connect

Make sure the phone and development computer are connected to the same network, then restart Expo and scan the new QR code:

```bash
npx expo start
```

### The app appears to be using stale code

Run Expo while clearing the bundler cache:

```bash
npx expo start --clear
```

### Dependencies are missing or broken

Run:

```bash
npm install
```

Then restart Expo:

```bash
npx expo start
```

---

## Validation

The primary TypeScript validation command for the current project is:

```bash
npx tsc --noEmit
```

The project should complete the command without TypeScript errors.

---