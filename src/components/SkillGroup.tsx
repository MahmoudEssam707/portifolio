type SkillItem = {
  name: string;
  value: number;
};

type SkillGroupProps = {
  group: string;
  items: SkillItem[];
};

export default function SkillGroup({ group, items }: SkillGroupProps) {
  return (
    <div className="skill-group">
      <div className="skill-group-label">{group}</div>
      {items.map((item) => (
        <div key={item.name} className="skill-row">
          <div className="skill-name">{item.name}</div>
          <div className="skill-bar">
            <div className="skill-bar-fill" data-w={item.value}></div>
          </div>
          <div className="skill-value">{item.value}%</div>
        </div>
      ))}
    </div>
  );
}
