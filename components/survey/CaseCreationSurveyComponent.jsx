'use client'
import React, { useState, useEffect, startTransition, use } from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import $ from "jquery";
import * as SurveyCore from "survey-core";
import { jqueryuidatepicker } from "surveyjs-widgets";
import "jquery-ui-dist/jquery-ui.css";
import "survey-core/defaultV2.min.css";
import "./index.css";
import { json } from "./casejson2";
import CasePreview from "@/components/case/CasePreview";
import dynamic from 'next/dynamic'
import { useRouter } from "next/navigation";
import WarrantList from "@/components/case/WarrantList";
import { useSession } from "next-auth/react";
import Link from "next/link";

window["$"] = window["jQuery"] = $;
require("jquery-ui-dist/jquery-ui.js");
jqueryuidatepicker(SurveyCore);

const DraftJsEditor = dynamic(
    () => import("@/components/editor/DraftEditor"),
    { ssr: false }
)
    
const QuillEditor = dynamic(
    () => import("@/components/editor/QuillEditor"),
    { ssr: false }
)

const fetchTemplates = async () => {
    try {
      const res = await fetch('/api/template', {
        method: 'GET',
        },
      );
      const data = await res.json();
      return data.data
    }
    catch (error) {
      console.log(error)
    }
  }

async function updateCase (id, data, router) {
  try {
      const res = await fetch('/api/case', {
        method: 'POST',
        body: JSON.stringify({
          id: id,
          data
        }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      startTransition(() => {
        router.replace("/case");
        router.refresh();
      });
    
    } catch (error)
    {
      console.log (error);
    }
}
  
async function saveCase (data, session, router) {
    try {
        const res = await fetch('/api/case', {
          method: 'PUT',
          body: JSON.stringify({
            user_id: session.data.user.id,
            data
          }),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
  
        startTransition(() => {
          router.replace("/case");
          router.refresh();
        });
        
      } catch (error)
      {
        console.log (error);
      }
}

const SurveyComponent = ({ id, data, setState, session }) => {
    const router = useRouter();
    const survey = new Model(json);

    // Avoid rehydration conflict
    // https://nextjs.org/docs/messages/react-hydration-error
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
      setHasMounted(true)
    }, []);

    if (!hasMounted) {
        return null;
    }

    if (data) {
      survey.data = data;
      setState(data);
    }

    survey.navigationBar.getActionById("sv-nav-complete").visible = true;

    // survey.addNavigationItem({
    //   id: "survey-generate-warrant", title: "Generate Warrant", action:()=>{
    //     router.replace(`/case/warrant/create/${id}`);
    //     router.refresh();
    //   }
    // });

    survey.onComplete.add((sender, options) => {
      console.log(JSON.stringify(sender.data, null, 3));
      if (data) {
        updateCase (id, sender.data, router);
      }
      else {
        saveCase (sender.data, session, router);
      }
    });
    survey.onCurrentPageChanged.add((sender, options) => {
      console.log(JSON.stringify(sender.data, null, 3));
    });
    survey.onValueChanged.add((sender, options) => {
      console.log(JSON.stringify(sender.data, null, 3));
      setState(sender.data);
    });

    return (
      <Survey model={survey} />
    );
}

function _App ({ id, caseData, warrants }) {
  const [isComponentVisible, setComponentVisible] = useState(true);
  const [state, setState] = useState("");

  const toggleComponentVisibility = () => {
    setComponentVisible(!isComponentVisible);
  };

  const router = useRouter();
  const session = useSession();

  return (
    <>
      <div id="survey-element">
        <SurveyComp
        id={id? id : null}
        data={caseData? caseData.data : null}
        setState={setState}
        session={session}
      />
      </div>
      {isComponentVisible && (
        <div className="note-editor-preview">
          <CasePreview 
          caseData={caseData}
          jsonData={state}
          warrants={warrants}
          />
        </div>
      )}
      <div className="toggle-button flex justify-between">
        <button className="edit-button edit-button--solid"
        onClick={() => {
          if (caseData) {
            updateCase (id, state, router);
          }
          else {
            saveCase (state, session, router);
          }
        }}>
          Save Case
        </button>
        <div className="">
          <Link href={`/case/warrant/create/${id}`}>
            <button className="edit-button edit-button--solid">Generate Warrant</button>
          </Link>
        </div>
      <button className="edit-button edit-button--outline" onClick={toggleComponentVisibility}>
        {isComponentVisible ? 'Hide Preview' : 'Show Preview'}
      </button>
      </div>
    </>
  );
}

const SurveyComp = React.memo (SurveyComponent);
export default _App;