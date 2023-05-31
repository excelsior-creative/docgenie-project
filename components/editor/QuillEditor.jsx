'use client'
import { useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { saveAs } from "file-saver";
import { pdfExporter } from "quill-to-pdf";
import { downloadObjectAsJson } from "./download";

const QuillEditor = ({initialContent=""}) => {
  const [value, setValue] = useState(initialContent);
  const editorRef = useRef(null);

  const exportDocument = () => {
    const deltas = editorRef.current?.editor?.getContents();
    if (!deltas) {
      return alert("Content not found");
    }
    downloadObjectAsJson(deltas.ops, "editor-text");
  };

  const importDocument = (event) => {
    const Jsonfile = event.target.files?.[0];
    var reader = new FileReader();

    if (!Jsonfile) return;

    reader.readAsText(Jsonfile, "UTF-8");
    reader.onload = function (evt) {
      const delta = JSON.parse(evt.target?.result);
      editorRef.current?.editor?.setContents(delta);
    };
  };

  const exportAsPDF = async () => {
    const delta = editorRef.current?.editor?.getContents(); // gets the Quill delta
    const pdfAsBlob = await pdfExporter.generatePdf(delta); // converts to PDF
    saveAs(pdfAsBlob, "pdf-export.pdf"); // downloads from the browser
  };

  const clearDocument = () => {
    editorRef.current?.editor?.deleteText(0, Infinity);
  };

  return (
    <div className="app">
      <main className="main-content">
        <div className="action-container">
          <button className="button" onClick={exportAsPDF}>
            Export as PDF
          </button>
          <button className="button" onClick={exportDocument}>
            Export as file
          </button>
          <input
            id="import-file"
            type="file"
            className="button"
            onChange={importDocument}
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
          <button className="button" onClick={clearDocument}>
            Clear document
          </button>
        </div>
        <ReactQuill
          defaultValue={JSON.parse(localStorage.getItem("document") || "[]")}
          style={{ height: "60vh", width: "100%" }}
          theme="snow"
          value={value}
          onChange={setValue}
          modules={{
            toolbar: [
              ["bold", "italic", "underline", "strike"],
              [{ color: [] }],
              [{ align: [] }],
              [{ font: [] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ header: 1 }, { header: 2 }],
              [{ size: ["small", false, "large", "huge"] }],
              ["blockquote", "code-block"],
              [{ list: "ordered" }, { list: "bullet" }]
            ]
          }}
          ref={editorRef}
        />
      </main>
    </div>
  );
}

export default QuillEditor;