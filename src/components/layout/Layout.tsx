import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { getRouteMeta } from "../../lib/meta";
import useLenis from "../../hooks/useLenis";
import useReveal from "../../hooks/useReveal";
import Cursor from "./Cursor";
import ErrorBoundary from "./ErrorBoundary";
import Footer from "./Footer";
import Loader from "./Loader";
import Nav from "./Nav";
import ScrollManager from "./ScrollManager";

export default function Layout() {
  const { pathname } = useLocation();

  useLenis();
  useReveal(pathname);

  useEffect(() => {
    document.title = getRouteMeta(pathname).title;
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Loader />
      <Cursor />
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
