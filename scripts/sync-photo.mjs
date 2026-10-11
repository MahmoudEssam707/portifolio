// Pulls the current GitHub avatar into public/ so both `npm run dev` and
// `npm run build` use the latest photo. Never fails the build: if GitHub is
// unreachable, the existing public/photo.jpg is kept.
import dns from "node:dns";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Some networks have broken IPv6; Node's fetch then times out where curl works.
dns.setDefaultResultOrder("ipv4first");

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Read the photo settings from the content file (person.photo in portfolio.ts).
const content = await fs.readFile(path.join(root, "src/data/portfolio.ts"), "utf8");
const block = content.match(/photo:\s*\{([\s\S]*?)\}/)?.[1] ?? "";
const read = (key) => block.match(new RegExp(`${key}:\\s*"?([^",\\n]+)"?`))?.[1];
const github = read("github");
const size = read("size") ?? "460";
const src = read("src") ?? "/photo.jpg";

if (process.env.PHOTO_SYNC === "0" || !github) {
  console.log(github ? "photo sync disabled (PHOTO_SYNC=0)" : "photo sync skipped: no person.photo.github set");
  process.exit(0);
}

const target = path.join(root, "public", src.replace(/^\//, ""));
try {
  const response = await fetch(`https://github.com/${github}.png?size=${size}`, {
    signal: AbortSignal.timeout(15_000),
  });
  const type = response.headers.get("content-type") ?? "";
  const bytes = Buffer.from(await response.arrayBuffer());
  if (!response.ok || !type.startsWith("image/") || bytes.length < 2048) {
    throw new Error(`${response.status} ${type || "no content-type"}, ${bytes.length} bytes`);
  }

  const previous = await fs.readFile(target).catch(() => null);
  if (previous && previous.equals(bytes)) {
    console.log(`photo up to date (github.com/${github})`);
  } else {
    await fs.writeFile(target, bytes);
    console.log(`photo updated from github.com/${github} (${(bytes.length / 1024).toFixed(1)} kB)`);
  }
} catch (error) {
  console.warn(`photo sync skipped, keeping public${src}: ${error.message}`);
}
