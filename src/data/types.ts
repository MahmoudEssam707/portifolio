export type Link = {
  label: string;
  url: string;
};

export type SocialLink = Link & {
  handle: string;
  icon: "github" | "linkedin" | "kaggle" | "mail";
};

export type Fact = {
  key: string;
  value: string;
};

export type Experience = {
  role: string;
  company: string;
  /** "Nov 2025" */
  start: string;
  /** null while the role is current */
  end: string | null;
  summary: string;
  /** Key achievements, rendered as a bullet list under the summary */
  highlights?: string[];
  tags: string[];
};

/**
 * A reported result. With `value` (0–100) it is drawn as a bar; without it,
 * only `display` is shown. Only ever put real, published numbers here.
 */
export type Metric = {
  label: string;
  display: string;
  value?: number;
};

export type Project = {
  /** Stable URL id: /projects/<slug>. Never change once published. */
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  metrics: Metric[];
  stack: string[];
  repo: string;
  live?: string;
};

export type SkillArea = {
  area: string;
  note?: string;
  tools: string[];
};

export type Paper = {
  year: string;
  title: string;
  venue: string;
  abstract: string;
  highlight: string;
  /** Publisher page (DOI / IEEE Xplore / journal) */
  url?: string;
};

export type Portfolio = {
  person: {
    name: string;
    role: string;
    company: string;
    email: string;
    location: string;
    /** IANA zone for the live clock */
    timeZone: string;
    cv: string;
    photo: {
      /** Served path of the portrait */
      src: string;
      /**
       * GitHub username the build syncs the avatar from. GitHub caps avatars at
       * 460px, so leave it unset to keep a higher-resolution local photo.
       */
      github?: string;
      /** Square size of the image in px */
      size: number;
    };
  };
  hero: {
    /** Short availability line in the pill above the name */
    status: string;
    /** Headline under the name; `highlight` is drawn in the accent gradient */
    tagline: { text: string; highlight: string };
    intro: string;
    /** Headline numbers; only real, published figures */
    stats: { value: string; label: string }[];
    /** A few focus areas floated around the portrait */
    focus: string[];
  };
  about: {
    paragraphs: string[];
    facts: Fact[];
  };
  experience: Experience[];
  projects: Project[];
  skills: SkillArea[];
  papers: Paper[];
  contact: {
    blurb: string;
    socials: SocialLink[];
  };
  site: {
    /** Production origin without trailing slash, used for canonical/OG/sitemap. */
    url: string;
    title: string;
    description: string;
    year: number;
  };
};
