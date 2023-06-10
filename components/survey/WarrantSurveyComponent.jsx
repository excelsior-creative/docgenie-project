'use client'
import React, { useState, useEffect, startTransition } from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import $ from "jquery";
import * as SurveyCore from "survey-core";
import { jqueryuidatepicker } from "surveyjs-widgets";
import "jquery-ui-dist/jquery-ui.css";
import "survey-core/defaultV2.min.css";
import { json } from "./casejson2";
import dynamic from 'next/dynamic'
import { useRouter } from "next/navigation";

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

async function updateWarrant (id, caseId, data, value, router) {
  try {
      const res = await fetch('/api/case/warrant', {
        method: 'POST',
        body: JSON.stringify({
          id: id,
          caseId: caseId,
          data: data,
          html: value
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
    
async function saveWarrant (id, caseId, data, value, router) {
  try {
      const res = await fetch('/api/case/warrant', {
        method: 'PUT',
        body: JSON.stringify({
          id: id,
          caseId: caseId,
          data: data,
          html: value
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

const SurveyComponent = ({ id, data, templates, setState, onComplete }) => {
    // const templates = await fetchTemplates();    
    const router = useRouter();
    const survey = new Model(json);

    // Avoid rehydration conflict
    // https://nextjs.org/docs/messages/react-hydration-error
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
      setHasMounted(true)
      setState(data);
    }, []);

    if (!hasMounted) {
      return null;
  }

    if (data) {
        survey.data = data;
    }

    survey.navigationBar.getActionById("sv-nav-complete").visible = false;
 
    // survey.addNavigationItem({
    //     id: "survey_pdf_preview", title: "Preview PDF", action: () => {}
    // });

    survey.onComplete.add((sender, options) => {
      console.log(JSON.stringify(sender.data, null, 3));
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

const _App = ({ id, caseId, data, templates, warrant }) => {
  const [isComponentVisible, setComponentVisible] = useState(true);
  const [state, setState] = useState ("");
  const [value, setValue] = useState (warrant);
  const router = useRouter();

  const toggleComponentVisibility = () => {
    setComponentVisible(!isComponentVisible);
  };

  useEffect(() => {
    setValue(Template (state, "Google", templates));
  }, [state]);

  return (
    <div className="note-editor">
      <div className="survey-component">
        <SurveyComp
        id={id}
        data={data}
        templates={templates}
        setState={setState}
        />
      </div>
      {isComponentVisible && (
        <div className="component note-editor-preview">
          <div className="save-warrant-button">
            <button
              className="edit-button edit-button--solid"
              onClick={() => id ? updateWarrant (id, caseId, state, value, router) : saveWarrant (id, caseId, state, value, router)}>
              Save Warrant
            </button>
          </div>
          <Quill
          initialContent={""}
          value={value}
          setValue={setValue}
          />
        </div>
      )}
      <button className="toggle-button edit-button edit-button--outline" onClick={toggleComponentVisibility}>
        {isComponentVisible ? 'Hide Preview' : 'Show Preview'}
      </button>
    </div>
  );
}

const SurveyComp = React.memo (SurveyComponent);

const Quill = ({initialContent, value, setValue}) => {
  return (
    <QuillEditor
    initialContent={initialContent}
    value={value}
    setValue={setValue}
    />
  );
}

export default _App;

function fetchTemplate(name, templates) {
    if (!templates) {
        return null;
    }

    for (let i = 0; i < templates.length; i++) {
        if (templates[i].name == name) {
            return templates[i];
        }
    }

    return null;
}

function Template (surveyData, name, templates) {
    const template = fetchTemplate (name, templates);
    
    if (!template) {
        return null;
    }

    let fields = template.fields;
    let str = template.html;

    for (const [key, value] of Object.entries(surveyData)) {
        if ("{" + key + "}" in fields) {
            fields["{" + key + "}"] = value;
        }
    }

    str = str.replace(/{[\w\s]+}/ig, function(all) {
        return fields[all] || all;
    });

    return str;
}
  