import prisma from "@/lib/prisma"
import dynamic from 'next/dynamic'
const SurveyComponent = dynamic(() => import('@/components/survey/CaseCreationSurveyComponent'), { ssr: false });

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

const CaseEditPage = async ({ params: { id } }) => {
  const caseData = await fetchSingleCase(id);
  const warrants = await fetchWarrant(id);
  
  return (
    <div className="note-editor">
      <SurveyComponent
      id={id}
      caseData={caseData}
      warrants={warrants}
      />
    </div>
  );
};
  
export default CaseEditPage;
  