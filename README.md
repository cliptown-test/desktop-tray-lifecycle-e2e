# ClipTown desktop tray lifecycle acceptance

This independent acceptance repository proves the native macOS lifecycle at an
immutable `cliptown/cliptown-flutter` revision:

1. closing the main window keeps the process alive and hides it from the taskbar;
2. the tray `Open ClipTown` action restores the full `1100 x 760` window;
3. the restored window is visible, focused, and centered on the primary display;
4. quitting remains an explicit tray action.

The workflow runs the real Flutter macOS integration test. This repository does
not claim clipboard capture, history persistence, keystroke consent, or blob
storage coverage; those product capabilities require separate acceptance tests.

## Run locally

Check out the source repositories at the revisions in `source-pins.json` as
sibling directories named `cliptown-flutter` and `cliptown-interfaces`, then run:

```bash
cd cliptown-flutter
flutter pub get
flutter test integration_test/desktop_lifecycle_test.dart -d macos --reporter=expanded
```

Validate the harness metadata with `node scripts/validate-plan.mjs`.
