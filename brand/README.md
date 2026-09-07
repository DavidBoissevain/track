# Brand files

Source of truth for the mark is `components/pointly-logo.tsx`. These are
exports of the same shape for places that cannot take a React component.

- `pointly-track-logo.svg` — vector, use this wherever SVG is accepted
- `pointly-track-logo-120.png` — 120x120, the size Google asks for on the
  OAuth consent screen
- `pointly-track-logo-512.png` — 512x512, for app icons and anything larger

Colours are the brand ramp from `app/globals.css`: `#277dda` to `#0e5abd`,
white glyph. If those tokens change, regenerate these.
