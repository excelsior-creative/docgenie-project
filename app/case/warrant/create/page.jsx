'use client'
import "@/app/globals.css"
import dynamic from 'next/dynamic'

const SurveyComponent = dynamic(() => import('@/components/survey/WarrantSurveyComponent'), { ssr: false });

export default async function Survey () { 
  return (
      <div id="float-parent" className="grid-container">
          <div id="surveyElement" className="grid-child">
            <SurveyComponent 
            id={null}
            data={null} />
          </div>
            <div id="pdf-preview" className="grid-child">
        </div>
      </div>
  )
}