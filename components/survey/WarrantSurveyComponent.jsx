'use client'
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client" 
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import $ from "jquery";
import * as SurveyCore from "survey-core";
import { jqueryuidatepicker } from "surveyjs-widgets";
import "jquery-ui-dist/jquery-ui.css";
import "survey-core/defaultV2.min.css";
import "./index.css";
import { json } from "./casejson";
import dynamic from 'next/dynamic'

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

async function SurveyComponent ({ id, data }) {
    const templates = await fetchTemplates();
    const [survey, setSurvey] = useState(new Model(json));
    
    if (data) {
        survey.data = data;
    }

    let isPreviewed = false;
    function previewPdf () {
        const oldFrame = document.getElementById("pdf-preview-frame");
        if (oldFrame) oldFrame.parentNode.removeChild(oldFrame);
        const previewDiv = document.getElementById("pdf-preview");
        previewDiv.innerHTML = Template (survey, "Google");

        const data = Template (survey, "Google", templates);

        // const element = <DraftJsEditor initialContent={data} />;
        const element = <QuillEditor initialContent={data} />;
        
        const root = ReactDOM.createRoot(
            document.getElementById('pdf-preview')
        );
        root.render(element);
        isPreviewed = true;
    }

    survey.navigationBar.getActionById("sv-nav-complete").visible = true;
    
    // survey.addNavigationItem({
    //     id: "survey_save_as_file", title: "Save as PDF", action: saveSurveyToFile
    // });
    // survey.addNavigationItem({
    //     id: "survey_save_via_blob", title: "Save via Blob", action: savePdfViaBlob
    // });
    survey.addNavigationItem({
        id: "survey_pdf_preview", title: "Preview PDF", action: previewPdf
    });

    survey.onComplete.add((sender, options) => {
        console.log(JSON.stringify(sender.data, null, 3));
        
        // if (data) {
        //     updateCase (data.id, sender.data, router);
        // }
        // else {
        //     saveCase (sender.data, router);
        // }
    });
    survey.onCurrentPageChanged.add((sender, options) => {
      console.log(JSON.stringify(sender.data, null, 3));
    });
    survey.onValueChanged.add((sender, options) => {
      console.log(JSON.stringify(sender.data, null, 3));
      if (isPreviewed) { 
        previewPdf();
      }
    });

    return (<Survey model={survey} />);
}

export default SurveyComponent;

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

function Template (survey, name, templates) {
    const template = fetchTemplate (name, templates);
    
    if (!template) {
        return null;
    }

    let fields = template.fields;
    let str = template.html;

    for (const [key, value] of Object.entries(survey.data)) {
        if ("{" + key + "}" in fields) {
            fields["{" + key + "}"] = value;
        }
    }

    str = str.replace(/{\w+}/g, function(all) {
        return fields[all] || all;
    });

    return str;
}
  