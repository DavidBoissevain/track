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
   - `--brand`, `--brand-strong`, `--brand-foreground`: the blue accent. Every
     app in the suite gets its own accent (SprintVotes red, SprintRetro
     emerald), so this is the one colour that identifies Pointly Track.
   - `--capacity-track`, `--capacity-filled`, `--capacity-over`: grey, blue, red.
     These are semantic, not decorative. Do not reuse them for anything that is
     not a capacity bar. The whole point is that red on a bar means one thing
     only.

**`--brand` and `--capacity-filled` are the same blue on purpose**
(`oklch(0.588 0.163 254)`, `#277dda`). The accent started as amber, which put
three competing hues on one page and stole attention from the red that says you
went over. With one blue, red is the only other colour on screen. Two blues that
almost matched would have been worse than either, so if you ever change one of
these, change both. `--capacity-filled` still lightens in dark mode for contrast
while `--brand` does not, which is the one place they part company.

White sits at 4.17:1 on this blue, ahead of SprintVotes red (3.81) and
SprintRetro emerald (3.65), so the white glyph in the logo is safe.
`--brand-strong` (`#0e5abd`) is only the dark end of the logo and CTA gradient.

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

**Where the hours label goes.** It sits at the top of the blue, inside it, not
above the column. Above the column it read as the capacity, which is the one
number it is not: capacity is the grey top and it is written under the project
name. An over capacity project is the exception and keeps its label at the very
top in red, where it labels the red tip. If the blue is shorter than
`LABEL_MIN_PX` the label falls back to sitting just above the fill line in the
grey, which is what a project with nothing logged yet gets.

The inside label is `text-white dark:text-slate-900`. White on the light fill is
4.17:1, but on the lighter dark mode fill it drops to 3.27:1, so dark text takes
over there at 5.45:1.

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
