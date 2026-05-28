type TagRowProps = {
  tags?: string[];
};

export default function TagRow({ tags }: TagRowProps) {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="tag-row">
      {tags.map((tag) => (
        <span key={tag} className="badge">
          {tag}
        </span>
      ))}
    </div>
  );
}
