'use client'
import "@/app/globals.css"
import dynamic from 'next/dynamic'
import { useRouter } from "next/navigation";

const SurveyComponent = dynamic(() => import('@/components/survey/WarrantSurveyComponent'), { ssr: false });

export default function Survey () { 
  const router = useRouter();
  
  return (
      <div id="float-parent" className="grid-container">
          <div id="survey-element" className="grid-child">
            <SurveyComponent 
            id={null}
            data={null}
            router={router}
            />
          </div>
            <div id="pdf-preview" className="grid-child">
        </div>
      </div>
  )
}