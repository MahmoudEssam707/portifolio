import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Cell from "../components/ui/Cell";
import Icon from "../components/ui/Icon";
import "./NotFound.css";

export default function NotFound() {
  const { pathname } = useLocation();
  // One static 404.html serves every unknown URL, so the real path is only
  // filled in after hydration (keeps server and client markup identical).
  const [key, setKey] = useState("/this-page");
  useEffect(() => {
    if (pathname !== "/404") {
      setKey(pathname);
    }
  }, [pathname]);

  return (
    <div className="not-found">
      <Cell n={1} code={`site["${key}"]`} title="Page not found" as="h1">
        <pre className="traceback">
          <span className="traceback__rule">{"-".repeat(60)}</span>
          {"\n"}
          <span className="traceback__err">KeyError</span>
          {"                     Traceback (most recent call last)\n"}
          <span className="traceback__err">KeyError</span>: <span className="syn-str">'{key}'</span>
        </pre>
        <p className="not-found__text">This page doesn't exist, or it moved.</p>
        <Link className="btn btn--primary" to="/">
          <Icon name="arrowLeft" size={16} /> Back home
        </Link>
      </Cell>
    </div>
  );
}
