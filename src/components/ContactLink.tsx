type ContactLinkProps = {
  label: string;
  value: string;
  url: string;
  variant?: "blue" | "orange" | "teal";
  tag: string;
};

export default function ContactLink({
  label,
  value,
  url,
  variant = "blue",
  tag,
}: ContactLinkProps) {
  const variantClass = `contact-icon variant-${variant}`;
  const isExternal = url.startsWith("http");

  return (
    <a
      className="contact-link"
      href={url}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
    >
      <div className={variantClass}>{tag}</div>
      <div className="contact-text">
        <small>{label}</small>
        <span>{value}</span>
      </div>
    </a>
  );
}
