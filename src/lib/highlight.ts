export type TokenKind = "kw" | "fn" | "str" | "num" | "com" | "op" | "txt";
export type Token = { kind: TokenKind; text: string };

const KEYWORDS = new Set([
  "from", "import", "as", "for", "in", "if", "else", "return", "def", "with",
  "lambda", "True", "False", "None", "and", "or", "not",
]);

// Order matters: comments and strings first so their contents aren't re-tokenised.
const PATTERN =
  /(#.*$)|('[^']*'|"[^"]*")|(\b\d+(?:\.\d+)?\b)|([A-Za-z_]\w*)(?=\s*\()|([A-Za-z_]\w*)|([()[\]{}.,=:<>+\-*/%]+)|(\s+)|(.)/gm;

/** Minimal Python tokenizer for one-line code cells. Deterministic, SSR-safe. */
export function highlight(code: string): Token[] {
  const tokens: Token[] = [];
  for (const m of code.matchAll(PATTERN)) {
    const [text, com, str, num, fn, word, op] = m;
    const kind: TokenKind = com
      ? "com"
      : str
        ? "str"
        : num
          ? "num"
          : fn
            ? (KEYWORDS.has(fn) ? "kw" : "fn")
            : word
              ? (KEYWORDS.has(word) ? "kw" : "txt")
              : op
                ? "op"
                : "txt";
    const last = tokens[tokens.length - 1];
    if (last && last.kind === kind && kind === "txt") {
      last.text += text;
    } else {
      tokens.push({ kind, text });
    }
  }
  return tokens;
}
