import { data, getProject, projects } from "../data";

export type RouteMeta = {
  title: string;
  description: string;
  path: string;
};

export const NOT_FOUND_PATH = "/404";

/** Every URL that is prerendered to static HTML at build time. */
export const prerenderPaths = [
  "/",
  ...projects.map((project) => `/projects/${project.slug}`),
  NOT_FOUND_PATH,
];

/** Keep meta descriptions within the ~160 characters search engines display. */
const truncate = (text: string, max = 160) =>
  text.length <= max ? text : `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;

export function getRouteMeta(path: string): RouteMeta {
  const { site } = data;
  const slug = path.match(/^\/projects\/([^/]+)$/)?.[1];
  const project = getProject(slug);

  if (path === "/") {
    return { title: site.title, description: site.description, path };
  }
  if (project) {
    return {
      title: `${project.name}: ${project.subtitle} · ${data.person.name}`,
      description: truncate(
        `${project.subtitle}. ${project.metrics.map((m) => `${m.label} ${m.display}`).join(", ")}.`
      ),
      path,
    };
  }
  return {
    title: `Not found · ${data.person.name}`,
    description: site.description,
    path: NOT_FOUND_PATH,
  };
}
