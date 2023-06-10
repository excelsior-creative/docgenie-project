import prisma from "@/lib/prisma"
import dynamic from 'next/dynamic'
const SurveyComponent = dynamic(() => import('@/components/survey/WarrantSurveyComponent'), { ssr: false });

const fetchSingleCase = async (id) => {
  const res = await prisma.case.findFirst({
    where: { id: parseInt (id) },
  });

  return res;
};

const fetchWarrant = async (id) => {
  const res = await prisma.warrant.findFirst({
    where: { id: parseInt (id) },
  });

  return res;
};

const fetchTemplates = async () => {
    const res = await prisma.template.findMany({});
    return res;
};

const WarrantEditPage = async ({ params: { id } }) => {
    const warrant = await fetchWarrant(id);  
    const { caseId, title, body, createdAt, data } = await fetchSingleCase(warrant.caseId);
    const templates = await fetchTemplates();
  
    return (
    <SurveyComponent
    id={id}
    caseId={caseId}
    data={data}
    templates={templates}
    warrant={warrant}
    />
    );
};

  
export default WarrantEditPage;

