import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import { ROUTER_FUTURE } from "./lib/router";
import { buildHead } from "./lib/head";
import { getRouteMeta, prerenderPaths } from "./lib/meta";
import { data } from "./data";

/** Used by scripts/prerender.mjs at build time. */
export function render(url: string) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url} future={ROUTER_FUTURE}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
  return { html, head: buildHead(getRouteMeta(url)) };
}

export const paths = prerenderPaths;
export const siteUrl = data.site.url;
