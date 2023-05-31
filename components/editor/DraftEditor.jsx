'use client'
import React, { useState } from "react";
import { EditorState, ContentState, convertToRaw, convertFromHTML } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import StateToPdfMake from "draft-js-export-pdfmake";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ActionButtons } from "./ActionButtons";
import Roboto from "@/fonts/Roboto"

export default function DraftJsEditor ({initialContent=""}) {
  const blocksFromHTML = convertFromHTML(initialContent);
  const initialState = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap,
  );
  
  const [editorState, setEditorState] = useState(EditorState.createWithContent(initialState));
  
  const onEditorStateChange = (contentState) => {
    setEditorState(contentState);
  };

  const exportAsPdf = async () => {
    const rawContent = convertToRaw(editorState.getCurrentContent());
    const stateToPdfMake = new StateToPdfMake(rawContent);
    console.log (stateToPdfMake)
    pdfMake.createPdf(stateToPdfMake.generate()).download();
  };

  return (
    <div style={styles.editor}>
      <ActionButtons onDownloadAsPDFClick={exportAsPdf} />
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
}

const styles = {
  editor: {
    border: "1px solid gray",
    minHeight: "6em",
    zIndex: 1,
  }
};
