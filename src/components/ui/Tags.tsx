import "./Tags.css";

export default function Tags({ items, label }: { items: string[]; label?: string }) {
  if (items.length === 0) {
    return null;
  }
  return (
    <ul className="tags" aria-label={label}>
      {items.map((item) => (
        <li key={item} className="tags__item">
          {item}
        </li>
      ))}
    </ul>
  );
}
