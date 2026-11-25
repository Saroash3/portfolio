/**
 * Shared types for everything under src/content.
 * Edit the content files, not this one, unless you add a new field.
 *
 * Convention: a field set to `undefined` (or an empty string / empty array)
 * is hidden in the UI. Search the repo for "TODO" to find gaps to fill.
 */

export type SocialKey = "github" | "linkedin" | "email";

export interface SocialLink {
  key: SocialKey;
  label: string;
  href: string;
  /** Short text shown in contact cards, e.g. "github.com/Saroash3" */
  handle: string;
}

export interface Site {
  name: string;
  shortName: string;
  /** Roles cycled by the typing effect in the hero */
  roles: string[];
  /** One- or two-sentence intro under the name in the hero */
  tagline: string;
  /** Status pill in the hero. Set to undefined to hide it. */
  availability?: string;
  location: string;
  email: string;
  socials: SocialLink[];
  /** Kept for later. Not shown anywhere on the site yet. */
  resumeUrl?: string;
  /** Path under /public. A monogram placeholder is shown if the file is missing. */
  photoPath: string;
  photoAlt: string;
  /** Used for metadata, sitemap and Open Graph. Overridden by NEXT_PUBLIC_SITE_URL. */
  url: string;
  description: string;
  keywords: string[];
}

export interface AboutFact {
  label: string;
  value: string;
  detail?: string;
  icon: "education" | "location" | "work" | "focus";
}

export interface About {
  /** Paragraphs. The first is always shown; the rest sit behind "Read more". */
  bio: string[];
  facts: AboutFact[];
}

export interface SkillGroup {
  id: string;
  title: string;
  /** Mono label shown on the card, e.g. "frontend/" */
  path: string;
  description: string;
  skills: string[];
  /** Optional: skills currently being learned (shown with a "learning" marker) */
  learning?: string[];
}

export interface ExperienceLink {
  label: string;
  href: string;
}

/** A compact card inside a timeline entry, e.g. one workshop of a training program */
export interface ExperienceModule {
  title: string;
  description: string;
  /** Slug of a project on this page; the card links to it */
  projectSlug?: string;
}

export interface ExperienceItem {
  id: string;
  /** "training" entries are labelled clearly so they don't read as employment */
  kind: "work" | "training" | "education";
  role: string;
  org: string;
  orgUrl?: string;
  /** e.g. "Jun 2026 – Jul 2026". Leave undefined to hide. */
  period?: string;
  location?: string;
  summary?: string;
  points: string[];
  tags: string[];
  links?: ExperienceLink[];
  /** Optional compact cards, shown in a small grid */
  modules?: ExperienceModule[];
}

export type ProjectCategory = "AI" | "Full-stack" | "Automation";

export interface ProjectMedia {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  title: string;
  /** Short subtitle on cards */
  kicker: string;
  /** One- or two-sentence card description */
  summary: string;
  featured: boolean;
  /** Lower comes first among featured projects */
  order: number;
  categories: ProjectCategory[];
  /** e.g. "Final year project · team of 2" */
  context?: string;
  status?: string;
  /** Dialog: what problem it solves */
  problem: string;
  /** Dialog: what was built (bullets) */
  built: string[];
  /** Dialog: my role (hidden if undefined) */
  role?: string;
  /** Short facts shown as chips, all taken from the live site or README */
  highlights?: string[];
  stack: string[];
  links: {
    live?: string;
    code?: string;
  };
  /** Real screenshot. Without one, a generated code-style cover is shown. */
  media?: ProjectMedia;
  /** Lines used by the generated cover when there is no screenshot */
  coverLines?: string[];
}
