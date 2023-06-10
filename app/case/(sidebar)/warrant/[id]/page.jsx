import { format } from "date-fns";
import DeleteWarrantButton from "@/components/case/DeleteWarrantButton";
import EditWarrantButton from "@/components/case/EditWarrantButton";
import prisma from "@/lib/prisma"

const fetchSingleWarrant = async (id) => {
  const res = await prisma.warrant.findFirst({
    where: { id: parseInt (id) },
  });

  return res;
};

function renderHTML(htmlString) {
    return { __html: htmlString };
  }

const WarrantPage = async ({ params: { id } }) => {
  const { id: caseId, title, body, created_at, data, html } = await fetchSingleWarrant(id);
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
              <EditWarrantButton caseId={id}>Edit Warrant</EditWarrantButton>
              <DeleteWarrantButton id={caseId} />
            </div>
          </div>
          <h1 className="note-title">{title}</h1>
        </div>
        <div dangerouslySetInnerHTML={renderHTML(html)}></div>
      </div>
    </div>
  );
};

export default WarrantPage;
