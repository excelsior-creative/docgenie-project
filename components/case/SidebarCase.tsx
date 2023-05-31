import { format, isToday } from "date-fns";
import { Case } from "@/models/case";
import Link from "next/link";

type SidebarCaseProps = {
  cAse: Case;
};

const SidebarCase = ({ cAse }: SidebarCaseProps) => {
  const updatedAt = new Date(cAse.created_at);
  const lastUpdatedAt = isToday(updatedAt)
    ? format(updatedAt, "h:mm bb")
    : format(updatedAt, "M/d/yy");

  return (
    <Link href={`/case/${cAse.id}`} className="sidebar-note-list-item">
      <header className="sidebar-note-header">
        <strong>{cAse.title}</strong>
        <small>{lastUpdatedAt}</small>
      </header>
    </Link>
  );
};

export default SidebarCase;
