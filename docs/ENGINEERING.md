## Known Development Issues

### Expo Router Web SSR

During development with Expo SDK 58, Expo Router web server-side rendering
can produce an order-dependent stack overflow when directly loading nested
Projects routes such as:

- /projects
- /projects/todo

The error occurs inside Expo's web server-rendering path
(`escapeTextForBrowser`).

Current investigation found no recursive component, duplicate route,
circular theme value, or malformed Projects route registration in the
application code.

Native mobile navigation through Expo Go is currently unaffected.

Because UnWind currently targets iOS and Android rather than web, mobile
behavior is authoritative for development.

Re-evaluate this issue if:

- Expo / Expo Router is upgraded
- web becomes a supported UnWind platform
- the same routing behavior appears on iOS or Android