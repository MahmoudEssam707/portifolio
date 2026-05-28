import TagRow from "./TagRow";

type TimelineItemProps = {
  icon: string;
  position: string;
  company: string;
  duration: string;
  description: string;
  tags?: string[];
};

export default function TimelineItem({
  icon,
  position,
  company,
  duration,
  description,
  tags,
}: TimelineItemProps) {
  return (
    <div className="timeline-item reveal">
      <div className="timeline-dot">{icon}</div>
      <div className="timeline-card card">
        <div className="timeline-header">
          <div>
            <h3>{position}</h3>
            <div className="org">{company}</div>
          </div>
          <div className="date-pill">{duration}</div>
        </div>
        <p className="timeline-desc">{description}</p>
        <TagRow tags={tags} />
      </div>
    </div>
  );
}
