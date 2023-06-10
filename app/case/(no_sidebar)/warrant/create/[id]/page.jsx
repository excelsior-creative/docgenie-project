import prisma from "@/lib/prisma"
import dynamic from 'next/dynamic'
const SurveyComponent = dynamic(() => import('@/components/survey/WarrantSurveyComponent'), { ssr: false });

const fetchSingleCase = async (id) => {
  const res = await prisma.case.findFirst({
    where: { id: parseInt (id) },
  });

  return res;
};

const fetchTemplates = async () => {
  const res = await prisma.template.findMany({});
  return res;
};

const WarrantCreatePage = async ({ params: { id } }) => {
  const casE = await fetchSingleCase(id);
  const templates = await fetchTemplates();

  return (
  <SurveyComponent
  id={""}
  caseId={casE.id}
  data={casE.data}
  templates={templates}
  warrant={""}
  />
  );
};

export default WarrantCreatePage;