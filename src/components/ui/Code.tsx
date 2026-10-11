import { highlight } from "../../lib/highlight";

/** One line of syntax-highlighted Python. */
export default function Code({ children }: { children: string }) {
  return (
    <code className="code">
      {highlight(children).map((token, i) =>
        token.kind === "txt" ? token.text : (
          <span key={i} className={`syn-${token.kind}`}>
            {token.text}
          </span>
        )
      )}
    </code>
  );
}
