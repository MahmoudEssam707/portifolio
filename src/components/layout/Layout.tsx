import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { getRouteMeta } from "../../lib/meta";
import useLenis from "../../hooks/useLenis";
import useReveal from "../../hooks/useReveal";
import useSpotlight from "../../hooks/useSpotlight";
import ErrorBoundary from "./ErrorBoundary";
import Footer from "./Footer";
import Nav from "./Nav";
import ScrollManager from "./ScrollManager";

export default function Layout() {
  const { pathname } = useLocation();

  useLenis();
  useReveal(pathname);
  useSpotlight();

  useEffect(() => {
    document.title = getRouteMeta(pathname).title;
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollManager />
      <Nav />
      <main id="main" tabIndex={-1}>
        <ErrorBoundary key={pathname}>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
}
