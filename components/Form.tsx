'use client'
import { useEffect, useRef, useState } from "react";
import { Form, Viewer, Template, Designer, BLANK_PDF } from "@pdfme/ui";

type Mode = "form" | "viewer";
const template: Template = {
  basePdf: "document.pdf",
  schemas: [
    {
      a: {
        type: 'text',
        position: { x: 0, y: 0 },
        width: 10,
        height: 10,
      },
      b: {
        type: 'text',
        position: { x: 10, y: 10 },
        width: 10,
        height: 10,
      },
      c: {
        type: 'text',
        position: { x: 20, y: 20 },
        width: 10,
        height: 10,
      },
    },
  ],
};
const inputs = [{ a: 'a1', b: 'b1', c: 'c1' }];



function FormComp() {
  const uiRef = useRef<HTMLDivElement | null>(null);
  const ui = useRef<Form | Viewer | null>(null);
  const [mode, setMode] = useState<Mode>("form");
  useEffect(() => {
    if (uiRef.current) {
      ui.current = new (mode === "form" ? Form : Viewer)({
      domContainer: uiRef.current,
      template,
      inputs
      });
    }

    return () => {
      if (ui.current) {
        ui.current.destroy();
      }
    };
  }, [uiRef, mode]);

  const onChangeMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as Mode;
    setMode(value);
  };

  return (
    <div>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <strong>Form, Viewer</strong>
        <span style={{ margin: "0 1rem" }}>:</span>
        <div>
          <input
            type="radio"
            onChange={onChangeMode}
            id="form"
            value="form"
            checked={mode === "form"}
          />
          <label htmlFor="form">Form</label>
          <input
            type="radio"
            onChange={onChangeMode}
            id="viewer"
            value="viewer"
            checked={mode === "viewer"}
          />
          <label htmlFor="viewer">Viewer</label>
          </div>
          </header>
          <div ref={uiRef} />
        </div>
  );
}

export default FormComp;
