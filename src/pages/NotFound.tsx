import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../components/ui/Icon";
import "./NotFound.css";

export default function NotFound() {
  const { pathname } = useLocation();
  // One static 404.html serves every unknown URL, so the real path is only
  // filled in after hydration (keeps server and client markup identical).
  const [path, setPath] = useState<string | null>(null);
  useEffect(() => {
    if (pathname !== "/404") {
      setPath(pathname);
    }
  }, [pathname]);

  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <span className="glow-orb not-found__orb" aria-hidden="true" />
      <div className="container not-found__inner">
        <p className="not-found__code gradient-text" aria-hidden="true">
          404
        </p>
        <h1 id="not-found-title" className="not-found__title">
          Page not found
        </h1>
        <p className="not-found__text">
          {path ? (
            <>
              Nothing lives at <code>{path}</code>. It may have moved, or never existed.
            </>
          ) : (
            "This page doesn't exist, or it moved."
          )}
        </p>
        <Link className="btn btn--primary" to="/">
          <Icon name="arrowLeft" size={16} /> Back home
        </Link>
      </div>
    </section>
  );
}
