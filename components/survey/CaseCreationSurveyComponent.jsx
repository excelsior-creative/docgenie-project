'use client'
import React, { useState, useEffect, startTransition, useRef, useMemo, use } from "react";
import ReactDOM from "react-dom/client" 
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
import App from "next/app";

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
        router.replace("/");
        router.refresh();
      });
    
    } catch (error)
    {
      console.log (error);
    }
}
  
async function saveCase (data, router) {
    try {
        const res = await fetch('/api/case', {
          method: 'PUT',
          body: JSON.stringify({
            data
          }),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
  
        startTransition(() => {
          router.replace("/");
          router.refresh();
        });
        
      } catch (error)
      {
        console.log (error);
      }
}

const SurveyComponent = ({ id, data, setState }) => {
    const router = useRouter();
    const survey = new Model(json);
    // const [survey, setSurvey] = useState({});

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

    survey.addNavigationItem({
      id: "survey-generate-warrant", title: "Generate Warrant", action:()=>{}
    });

    survey.onComplete.add((sender, options) => {
      console.log(JSON.stringify(sender.data, null, 3));
      if (data) {
        updateCase (id, sender.data, router);
      }
      else {
        saveCase (sender.data, router);
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

function _App ({ id, data }) {
  const [state, setState] = useState("");
  return (
    <div className="note-editor">
      <div id="survey-element">
      <SurveyComp
      id={id}
      data={data}
      setState={setState} />
      </div>
    <div className="note-editor-preview">
        <div className="label label--preview" role="status">
          Preview
        </div>
        <h1 className="note-title">{state.name}</h1>
        <CasePreview body={state.description} />
      </div>
    </div>
  );
}

const SurveyComp = React.memo (SurveyComponent);
export default _App;
// export default SurveyComponent;


