import React from "react";

export function ActionButtons({
  onDownloadAsPDFClick,
  onExportAsFileClick,
  onImportClick
}) {
  return (
    <div>
      <div className="action-container">
        <button className="button" onClick={onExportAsFileClick}>
          Export as file
        </button>
        <input
          id="import-file"
          type="file"
          className="button"
          onChange={onImportClick}
          title="Import file"
          hidden={true}
        />
        <button className="button">
          <label
            style={{ height: "100%", width: "100%" }}
            htmlFor="import-file"
            className="custom-file-upload"
          >
            Import file
          </label>
        </button>
        <button className="button" onClick={onDownloadAsPDFClick}>
          Download PDF
        </button>
      </div>
    </div>
  );
}
