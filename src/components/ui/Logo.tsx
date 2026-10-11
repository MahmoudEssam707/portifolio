/** The pixel-head mark from logo.png, traced to SVG so it follows the theme accent. */
export const LOGO_HEAD =
  "M258 10H425C485 12 531 60 531 123V143L572 224L532 234V321Q532 345 508 345H481Q456 345 456 369V431Q456 456 432 456H368Q344 456 344 431V370Q344 345 318 345H258Q233 345 233 321V259Q233 234 258 234H318Q344 234 344 208V148Q344 122 318 122H258Q233 122 233 96V36Q233 10 258 10Z";

export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg
      className="logo-mark"
      viewBox="0 0 582 466"
      width={size}
      height={(size * 466) / 582}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="10" y="122" width="111" height="111" rx="25" style={{ fill: "var(--accent-soft)" }} opacity="0.75" />
      <rect x="121" y="345" width="111" height="111" rx="25" style={{ fill: "var(--accent-soft)" }} opacity="0.75" />
      <path d={LOGO_HEAD} style={{ fill: "var(--accent)" }} />
    </svg>
  );
}
