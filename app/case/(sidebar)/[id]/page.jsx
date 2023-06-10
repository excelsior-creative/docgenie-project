import CasePreview from "@/components/case/CasePreview";
import prisma from "@/lib/prisma"

const fetchSingleCase = async (id) => {
  const res = await prisma.case.findFirst({
    where: { id: parseInt (id) },
  });

  return res;
};

const fetchWarrant = async (id) => {
  const res = await prisma.warrant.findMany({
    where: { caseId: parseInt (id) },
  });

  return res;
};

const CasePage = async ({ params: { id } }) => {
  const caseData = await fetchSingleCase(id);
  const warrants = await fetchWarrant(id);

  return (
    <div className="note-viewer">
      <CasePreview 
      caseData={caseData}
      jsonData={caseData.data}
      warrants={warrants}
      showEdit={true}
      />
    </div>
  );
};

export default CasePage;
