import { portfolio } from "./portfolio";
import type { Portfolio, Project } from "./types";

export type * from "./types";

export const data: Portfolio = portfolio;

export const projects: Project[] = data.projects;

export function getProject(slug: string | undefined): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Previous/next project, wrapping around the list. */
export function adjacentProjects(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  const count = projects.length;
  return {
    prev: projects[(index - 1 + count) % count],
    next: projects[(index + 1) % count],
  };
}

/** Every tool mentioned in the skills table, de-duplicated, in order. */
export const allTools = [...new Set(data.skills.flatMap((skill) => skill.tools))];

/** "01", "02", … */
export const indexLabel = (index: number) => String(index + 1).padStart(2, "0");

/** A link value of "#" or "" means "not available". */
export const hasUrl = (url: string | undefined): url is string =>
  Boolean(url && url !== "#");
