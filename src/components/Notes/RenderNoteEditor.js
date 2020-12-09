import React from "react";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";

export default function RenderNoteEditor({ content }) {
  const noteToJson = JSON.parse(content);
  const contentState = convertFromRaw(noteToJson);
  const editorState = EditorState.createWithContent(contentState);

  return (
    <div>
      <Editor editorState={editorState} readOnly={true} />
    </div>
  );
}
