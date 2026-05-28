type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  className,
}: SectionHeaderProps) {
  return (
    <div className={["reveal", className].filter(Boolean).join(" ")}>
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="section-title">{title}</h2>
      {subtitle ? <p className="section-sub">{subtitle}</p> : null}
    </div>
  );
}
