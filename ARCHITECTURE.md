# Architecture decisions

Running log of the technical decisions in this repo, newest section last.
Product intent lives in [SPIRIT.md](SPIRIT.md); this file is only about code.

## Stack as it stands

| Thing | Choice | Note |
| --- | --- | --- |
| Framework | Next.js 16.3.4, App Router | Turbopack is the default in 16, no `--turbopack` flag needed |
| React | 19.2.8 | App Router pins its own React canary |
| Routing dir | `app/` at the repo root, no `src/` | `@/*` maps to `./*` in `tsconfig.json` |
| Styling | Tailwind v4, CSS-first config in `app/globals.css` | No `tailwind.config.*` file exists and none should be added |
| Components | shadcn, `base-nova` style, on `@base-ui/react` | **Not Radix.** See the API notes below |
| Icons | `lucide-react` | |
| Theme | `next-themes`, `attribute="class"` | Matches `@custom-variant dark (&:is(.dark *))` in `globals.css` |
| Charts | `recharts` 3.8.0 installed, unused so far | The capacity bar is plain CSS and does not need it |
| Package manager | pnpm 9.15.4 | |

`AGENTS.md` carries a managed block that `next dev` rewrites on every run. It
points at the version matched docs in `node_modules/next/dist/docs/`. Read those
before writing Next specific code, and commit the block along with your work so
the tree stays clean.

## base-ui is not Radix

The installed shadcn style builds on `@base-ui/react`, so the habits from the
Radix based shadcn do not carry over:

- There is no `asChild`. Composition uses a `render` prop instead, for example
  `<DropdownMenuTrigger render={<Button ... />} />`.
- `AccordionItem` requires a `value`.
- `DropdownMenuContent` sets `w-(--anchor-width)`, which pins the popup to the
  trigger width. Pass `w-auto` when the content should size itself, as the app
  switcher does.
- `Button` sizes are small by default (`h-8`, `lg` is `h-9`). Big marketing
  CTAs need explicit height and padding classes.

## Design tokens

shadcn wrote a neutral greyscale token set into `app/globals.css`. Two things
were layered on top of it rather than replacing it, so future `shadcn` commands
stay safe:

1. `--font-sans` and `--font-heading` point at `var(--font-poppins)`. shadcn
   left `--font-sans: var(--font-sans)`, which is circular. Poppins is loaded in
   `app/layout.tsx` with `variable: "--font-poppins"` and needs explicit weights
   because it is not a variable font.
2. Two token groups were added to `:root` and `.dark`:
   - `--brand`, `--brand-strong`, `--brand-foreground`: the amber accent. Every
     app in the suite gets its own accent (SprintVotes red, SprintRetro
     emerald), so this is the one colour that identifies Pointly Track.
   - `--capacity-track`, `--capacity-filled`, `--capacity-over`: grey, blue, red.
     These are semantic, not decorative. Do not reuse them for anything that is
     not a capacity bar, and do not use the brand amber inside a bar. The whole
     point is that red on a bar means one thing only.

The shadcn `--chart-1` to `--chart-5` tokens are greyscale because the base
colour is neutral. They are untouched and unused so far.

## The capacity chart

`components/capacity-chart.tsx` is the one component worth being careful about,
because the real app reuses it and the landing page only mocks data into it.

Hours are always the stored unit. Capacity is stored in hours too, and the
`display` prop decides whether a row reads in days or in hours, with
`hoursPerDay` (default 8) doing the conversion. That is what makes "capacity in
days, but hours if you prefer" work without two storage formats.

**Vertical columns on one shared scale.** The chart owns the scale rather than
the individual bar, which is why there is no exported single bar component:

```
maxValue    = max over all rows of max(capacity, logged)
greyHeight  = capacity / maxValue * height          (px, floor of 4)
redHeight   = max(0, logged - capacity) / maxValue * height
blueHeight  = min(logged, capacity) / capacity      (% of its own grey column)
```

Two decisions are load bearing here and should not be quietly undone:

1. **Column height encodes capacity.** Equal length bars were the first attempt
   and were wrong: they hid which projects are the big commitments. A project
   with twice the capacity must render twice as tall.
2. **Vertical, not horizontal.** Comparing heights side by side is easier than
   comparing lengths stacked down a page.

Blue is a percentage of its own column rather than of `maxValue`, so it always
stops exactly at the capacity line no matter what the other projects do. Red
sits on top of the grey column and takes the rounded top when present. A row
exactly on capacity is a full blue column with no red. `capacity <= 0` renders
no column, and the project name block has a fixed height so every column sits
on the same baseline even when a name wraps.

## Landing page composition

`app/page.tsx` composes sections directly, the same way sprintvotes does, and
only the visuals are extracted into components. Layout follows the suite house
style: slate gradient background, `max-w-7xl` sections, `3fr/5fr` hero grid, and
a footer with a curved SVG top edge.

`lib/site.ts` holds the name, url, description, author links and the sibling app
list. Nothing else should hard code a URL or the app name.

The hero previews (`components/landing/capacity-preview.tsx`,
`entry-preview.tsx`) hold hard coded data on purpose. They stand in for screens
that do not exist yet and double as the visual spec for building them.

JSON-LD is inlined with `dangerouslySetInnerHTML` over a local static object,
which is the pattern in the Next docs (`02-guides/json-ld.md`). No user input
reaches it.

## Not built yet, and why

- **Auth and database.** Decided: accounts with a hosted database, so hours sync
  between laptop and phone. Nothing is implemented, and the FAQ copy already
  promises "stored so you can get them back, never sold, delete the account and
  it all goes". Whatever gets built has to keep that true.
- **`/privacy`.** Deliberately skipped. It should land in the same step as auth,
  because that is the first moment there is real data to describe. Until then the
  footer only links to pages that exist, so there are no dead links.
- **Usage counter and demo video.** Both are placeholders. The counter is a
  dashed box in `components/landing/stats-placeholder.tsx`. The hero shows the
  bar mock instead of a video, and the video can replace it later.
- **`app/icon.tsx` / `apple-icon.tsx`.** sprintvotes generates these. Still the
  create-next-app `favicon.ico` here.
