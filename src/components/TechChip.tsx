type TechChipProps = {
  tag: string;
  label: string;
};

export default function TechChip({ tag, label }: TechChipProps) {
  return (
    <div className="stack-chip">
      <span>{tag}</span>
      {label}
    </div>
  );
}
