'use client'
import { useState } from "react";
import { format } from "date-fns";
import EditButton from "@/components/case/EditButton";
import DeleteButton from "@/components/case/DeleteButton";
import WarrantList from "@/components/case/WarrantList";

const CasePreview = ({ caseData, jsonData, warrants, showEdit }) => {
  const fieldOrder = ['Case Number', 'Officer Name', 'Officer Title', 'Agency', 'Case Type', 'Case Status', 'Case Description', 'State', 'County', 'Location']; // Define the desired order of fields
  let updatedAtDate;
  if (caseData) {
    updatedAtDate = new Date(caseData.created_at);
  }
  else {
    updatedAtDate = new Date();
  }
  
  const [isWarrantsVisible, setWarrantsVisible] = useState(false);

  const toggleWarrantsVisibility = () => {
    setWarrantsVisible(!isWarrantsVisible);
  };

  return (
    <div className="note">
      <div className="note-header">
        {caseData && (
          <div className="note-menu" role="menubar">
            <small className="note-updated-at" role="status">
              Last updated on {format(updatedAtDate, "M/d/yy 'at' h:mm bb")}
            </small>
            <div className="flex justify-between">
              <button className="edit-button edit-button--outline" onClick={toggleWarrantsVisibility}>
                {isWarrantsVisible ? 'Hide Warrants' : 'Show Warrants'}
              </button>
              {showEdit && (
                <>
                <EditButton caseId={caseData.id}>
                  Edit Case
                </EditButton>
                </>
              )}
              <DeleteButton id={caseData.id} />
            </div>
          </div>
          )}
          <h1 className="note-title">{jsonData.name}</h1>
      </div>
      <div className="json-preview">
        {/* <h2>JSON Preview</h2> */}
        <div className="json-table">
          {fieldOrder.map((field) => {
            if (jsonData.hasOwnProperty(field) && jsonData[field] !== undefined) {
              let value = jsonData[field];
              if (Array.isArray(value)) {
                value = value.map((item, index) => (
                  <span className="array-item" key={index}>
                    {item}
                  </span>
                ));
              }
              return (
                <div className="json-row" key={field}>
                  <div className="json-field">{field}</div>
                  <div className="json-value">{value}</div>
                </div>
              );
            }
            return null; // Skip iteration for non-existing fields
          })}
        </div>
      </div>
      {isWarrantsVisible && (
        <div className="warrant">
          {/* <div className="label label--preview" role="status"> */}
          <h2 className="warrant-title">
            Warrants
          </h2>
          <WarrantList warrants={warrants} />
        </div>
      )}
    </div>
  );
};

export default CasePreview;
