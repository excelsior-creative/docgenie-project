import { format } from "date-fns";
import NotePreview from "@/components/case/CasePreview";
import DeleteButton from "@/components/case/DeleteButton";
import EditButton from "@/components/case/EditButton";

import prisma from "@/lib/prisma"

const fetchSingleCase = async (id) => {
  const res = await prisma.case.findFirst({
    where: { id: parseInt (id) },
  });

  return res;
};

const CasePage = async ({ params: { id } }) => {
  const { id: caseId, title, body, created_at } = await fetchSingleCase(id);

  const updatedAtDate = new Date(created_at);

  return (
    <div className="note-viewer">
      <div className="note">
        <div className="note-header">
          <div className="note-menu" role="menubar">
            <small className="note-updated-at" role="status">
              Last updated on {format(updatedAtDate, "M/d/yy 'at' h:mm bb")}
            </small>
            <div>
              <EditButton caseId={id}>Edit</EditButton>
              <DeleteButton id={caseId} />
            </div>
          </div>
          <h1 className="note-title">{title}</h1>
        </div>
        <NotePreview body={body} />
      </div>
    </div>
  );
};

export default CasePage;
