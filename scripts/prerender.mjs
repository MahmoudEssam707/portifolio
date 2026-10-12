// Renders every route to static HTML after `vite build` + `vite build --ssr`.
// Output: dist/index.html, dist/projects/<slug>.html, dist/404.html,
//         dist/sitemap.xml, dist/robots.txt
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const template = await fs.readFile(path.join(dist, "index.html"), "utf8");
for (const marker of ["<!--app-head-->", "<!--app-html-->"]) {
  if (!template.includes(marker)) {
    throw new Error(`prerender: ${marker} missing from dist/index.html`);
  }
}

const { render, paths, siteUrl } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);

// Preload the hero headline font (the LCP element) and the mono UI font.
const assets = await fs.readdir(path.join(dist, "assets"));
const preloads = [/^inter-tight-latin-wght-normal-.*\.woff2$/, /^jetbrains-mono-latin-wght-normal-.*\.woff2$/]
  .map((pattern) => assets.find((file) => pattern.test(file)))
  .filter(Boolean)
  .map((file) => `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`);

const outFile = (url) => {
  if (url === "/") return "index.html";
  if (url === "/404") return "404.html";
  return `${url.slice(1)}.html`; // served extensionless via cleanUrls (vercel.json)
};

for (const url of paths) {
  const { html, head } = render(url);
  const page = template
    .replace("<!--app-head-->", [...preloads, head].join("\n    "))
    .replace("<!--app-html-->", html);
  const file = path.join(dist, outFile(url));
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, page);
  console.log(`  prerendered ${url.padEnd(32)} → ${path.relative(root, file)}`);
}

const indexable = paths.filter((url) => url !== "/404");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((url) => `  <url><loc>${siteUrl}${url === "/" ? "/" : url}</loc></url>`).join("\n")}
</urlset>
`;
await fs.writeFile(path.join(dist, "sitemap.xml"), sitemap);
await fs.writeFile(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);

await fs.rm(ssrDir, { recursive: true, force: true });
console.log(`  ${paths.length} pages, sitemap.xml, robots.txt`);
