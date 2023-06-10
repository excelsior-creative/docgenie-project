import dynamic from 'next/dynamic'

const SurveyComponent = dynamic(() => import('@/components/survey/CaseCreationSurveyComponent'), { ssr: false });

const CaseCreatePage = () => {
  return (
    <div className="note-editor">
      <SurveyComponent 
      id={null}
      data={null}
      />
    </div>
  )
}

export default CaseCreatePage;