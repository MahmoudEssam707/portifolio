import { data } from "../data";
import { NOT_FOUND_PATH, type RouteMeta } from "./meta";

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function personJsonLd() {
  const { person, site, contact, experience } = data;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.role,
    url: site.url,
    email: `mailto:${person.email}`,
    image: `${site.url}${person.photo.src}`,
    address: { "@type": "PostalAddress", addressLocality: "Alexandria", addressCountry: "EG" },
    worksFor: { "@type": "Organization", name: experience[0].company },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Alexandria University" },
    sameAs: contact.socials.map((social) => social.url),
  };
}

/** <head> tags for a prerendered route. */
export function buildHead(meta: RouteMeta) {
  const { site, person } = data;
  const url = `${site.url}${meta.path}`;
  const image = `${site.url}/icon-512.png`;
  const tags = [
    `<title>${escape(meta.title)}</title>`,
    `<meta name="description" content="${escape(meta.description)}" />`,
    `<meta name="author" content="${escape(person.name)}" />`,
    `<meta property="og:type" content="${meta.path.startsWith("/projects/") ? "article" : "website"}" />`,
    `<meta property="og:site_name" content="${escape(person.name)}" />`,
    `<meta property="og:title" content="${escape(meta.title)}" />`,
    `<meta property="og:description" content="${escape(meta.description)}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary" />`,
  ];

  if (meta.path === NOT_FOUND_PATH) {
    tags.push(`<meta name="robots" content="noindex" />`);
  } else {
    tags.push(`<link rel="canonical" href="${url}" />`, `<meta property="og:url" content="${url}" />`);
  }
  if (meta.path === "/") {
    // The hero network draws the portrait; fetch it alongside the HTML.
    tags.push(`<link rel="preload" href="${person.photo.src}" as="image" />`);
    // "<" is escaped so the JSON can never close the script tag early.
    const json = JSON.stringify(personJsonLd()).replace(/</g, "\\u003c");
    tags.push(`<script type="application/ld+json">${json}</script>`);
  }
  return tags.join("\n    ");
}
