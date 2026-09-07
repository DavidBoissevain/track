export const site = {
  name: "Pointly Track",
  shortName: "Track",
  suite: "Pointly",
  url: "https://track.meetpointly.com",
  tagline: "Your capacity, at a glance.",
  description:
    "Log the hours you did per project and see straight away which ones are short and which ones are over. Free, no ads, no tracking.",
  author: {
    name: "David Boissevain",
    // Same address already published on sprintvotes.me. A privacy policy has
    // to give people a way to reach you, so it is the contact point here too.
    email: "david.boissevain@proton.me",
    linkedin: "https://www.linkedin.com/in/davidboissevain/",
    coffee: "https://buymeacoffee.com/davidboissevain",
  },
  /** Shown on the privacy page. Bump when the policy changes in a real way. */
  privacyUpdated: "7 September 2026",
} as const;

/** The other apps in the suite, used by the app switcher and the footer. */
export const siblingApps = [
  {
    name: "SprintVotes",
    href: "https://sprintvotes.me",
    description: "Planning Poker",
  },
  {
    name: "SprintRetro",
    href: "https://sprintretro.me",
    description: "Retrospectives",
  },
] as const;
