import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

async function copyText(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  // Fallback for non-secure contexts / older browsers.
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.cssText = "position:fixed;opacity:0;pointer-events:none";
  document.body.appendChild(area);
  area.select();
  const ok = document.execCommand("copy");
  area.remove();
  if (!ok) {
    throw new Error("copy failed");
  }
}

export default function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onClick = async () => {
    try {
      await copyText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus("idle"), 2200);
  };

  return (
    <button type="button" className="btn copy-email" onClick={onClick}>
      <Icon name={status === "copied" ? "check" : "copy"} size={16} />
      {status === "copied" ? "copied" : "copy"}
      <span className="sr-only" aria-live="polite">
        {status === "copied" ? "Email copied to clipboard" : status === "failed" ? "Copy failed" : ""}
      </span>
    </button>
  );
}
