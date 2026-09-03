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
    linkedin: "https://www.linkedin.com/in/davidboissevain/",
    coffee: "https://buymeacoffee.com/davidboissevain",
  },
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
