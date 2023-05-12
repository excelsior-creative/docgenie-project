import React from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import $ from "jquery";
import * as SurveyCore from "survey-core";
import { jqueryuidatepicker } from "surveyjs-widgets";
import "jquery-ui-dist/jquery-ui.css";
import "survey-core/defaultV2.min.css";
import "./index.css";
import { json } from "./json";

window["$"] = window["jQuery"] = $;
require("jquery-ui-dist/jquery-ui.js");

jqueryuidatepicker(SurveyCore);


import { SurveyPDF } from "survey-pdf";
function createSurveyPdfModel(surveyModel) {
    let pdfWidth = !!surveyModel && surveyModel.pdfWidth ? surveyModel.pdfWidth : 210;
    let pdfHeight = !!surveyModel && surveyModel.pdfHeight ? surveyModel.pdfHeight : 297;
    let options = {
        fontSize: 14,
        margins: {
            left: 10,
            right: 10,
            top: 10,
            bot: 10
        },
        
        
        format: [pdfWidth, pdfHeight]
    };
    const surveyPDF = new SurveyPDF(json, options);
    if (surveyModel) {
        surveyPDF.data = surveyModel.data;
    }
    
    return surveyPDF;
}
function saveSurveyToPdf(filename, surveyModel) {
    createSurveyPdfModel(surveyModel).save(filename);
}
function SurveyPdfComponent() {
    const survey = new Model(json);
    function saveSurveyToFile() {
        saveSurveyToPdf("surveyResult.pdf", survey);
    }
    function savePdfViaBlob() {
        const surveyPDF = createSurveyPdfModel(survey);
        surveyPDF.raw("bloburl").then(function(bloburl) {
            const a = document.createElement("a");
            a.href = bloburl;
            a.download = "surveyViaBlob.pdf";
            document.body.appendChild(a);
            a.click();
        });
    }
    function previewPdf() {
        const surveyPDF = createSurveyPdfModel(survey);
        const oldFrame = document.getElementById("pdf-preview-frame");
        if (oldFrame) oldFrame.parentNode.removeChild(oldFrame);
        surveyPDF.raw("dataurlstring").then(function(dataurl) {
            const pdfEmbed = document.createElement("embed");
            pdfEmbed.setAttribute("id", "pdf-preview-frame");
            pdfEmbed.setAttribute("type", "application/pdf");
            pdfEmbed.setAttribute("src", dataurl);
            const previewDiv = document.getElementById("pdf-preview");
            previewDiv.appendChild(pdfEmbed);
        });
    }
    survey.navigationBar.getActionById("sv-nav-complete").visible = false;
    survey.addNavigationItem({
        id: "survey_save_as_file", title: "Save as PDF", action: saveSurveyToFile
    });
    survey.addNavigationItem({
        id: "survey_save_via_blob", title: "Save via Blob", action: savePdfViaBlob
    });
    survey.addNavigationItem({
        id: "survey_pdf_preview", title: "Preview PDF", action: previewPdf
    });

    survey.onComplete.add((sender, options) => {
        console.log(JSON.stringify(sender.data, null, 3));
    });
    survey.onCurrentPageChanged.add((sender, options) => {
        console.log(JSON.stringify(sender.data, null, 3));
    });

    return (<Survey model={survey} />);
}

export default SurveyPdfComponent;

function SurveyComponent() {
    const survey = new Model(json);
    survey.onComplete.add((sender, options) => {
        console.log(JSON.stringify(sender.data, null, 3));
    });
    survey.onCurrentPageChanged.add((sender, options) => {
        console.log(JSON.stringify(sender.data, null, 3));
    });

    // survey.navigateToUrl = window.location.origin
    return (<Survey model={survey} />);
}

// export default SurveyComponent;