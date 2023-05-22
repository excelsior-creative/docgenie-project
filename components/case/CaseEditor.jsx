/* eslint-disable @next/next/no-img-element */
"use client";
import { startTransition, useState } from "react";
import { Case } from "models/note";
import { useRouter } from "next/navigation";

import CasePreview from "./CasePreview";
import prisma from "@/lib/prisma"

const BASE_API_URI = "https://next13-notes-app-api-production.up.railway.app";

export default function CaseEditor({
  createdAt,
  caseId,
  initialTitle = "",
  initialBody = "",
}) {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);

  const router = useRouter();

  const isTitleOrBodyEmpty = !title || !body;

  async function handleSave() {
    if (isTitleOrBodyEmpty) return;

    try {
      const updatedCase = await prisma.case.create({
        data: {
            // id: 3,
            title: title,
            body: body,
            createdAt: createdAt ?? new Date().getTime(),
            updatedAt: new Date().getTime(),
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

  return (
    <div className="note-editor">
      <form className="note-editor-form" autoComplete="off" onSubmit={(e) => e.preventDefault()}>
        <label className="offscreen" htmlFor="note-title-input">
          Enter Case Title
        </label>
        <input
          id="note-title-input"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label className="offscreen" htmlFor="note-body-input">
          Enter the body for your case
        </label>
        <textarea
          id="note-body-input"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
      </form>
      <div className="note-editor-preview">
        <div className="note-editor-menu" role="menubar">
          <button
            className="note-editor-done"
            disabled={Boolean(isSaving) || isTitleOrBodyEmpty}
            onClick={() => handleSave()}
            role="menuitem"
          >
            <img
              src="/icons/svg/checkmark.svg"
              width="14px"
              height="10px"
              alt=""
              role="presentation"
            />
            Done
          </button>
        </div>
        <div className="label label--preview" role="status">
          Preview
        </div>
        <h1 className="note-title">{title}</h1>
        <NotePreview body={body} />
      </div>
    </div>
  );
}