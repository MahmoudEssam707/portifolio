type PublicationCardProps = {
  year: string;
  title: string;
  venue: string;
  abstract: string;
  highlight: string;
  accent?: "blue" | "orange" | "teal";
};

export default function PublicationCard({
  year,
  title,
  venue,
  abstract,
  highlight,
  accent = "blue",
}: PublicationCardProps) {
  const accentClass = `badge accent-${accent}`;

  return (
    <div className="card pub-card reveal">
      <div className="pub-year">{year}</div>
      <div>
        <div className="pub-title">{title}</div>
        <div className="pub-venue">{venue}</div>
        <p className="pub-abstract">{abstract}</p>
        <span className={accentClass}>{highlight}</span>
      </div>
    </div>
  );
}
