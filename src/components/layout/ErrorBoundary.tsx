import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { failed: boolean };

/** Keeps the shell (nav/footer) alive if a page throws while rendering. */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Page crashed:", error, info.componentStack);
  }

  render() {
    if (!this.state.failed) {
      return this.props.children;
    }
    return (
      <section className="container" role="alert" style={{ padding: "calc(var(--nav-h) + 64px) 0 96px" }}>
        <p className="eyebrow">Something went wrong</p>
        <h1 style={{ fontSize: "var(--fs-h2)", margin: "16px 0 24px" }}>This page failed to load.</h1>
        <a className="btn btn--primary" href="/">
          Back home
        </a>
      </section>
    );
  }
}
