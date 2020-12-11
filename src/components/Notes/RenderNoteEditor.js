import React from "react";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import "./NoteEditor.scss";

export default function RenderNoteEditor({ content }) {
  const noteToJson = JSON.parse(content);
  const contentState = convertFromRaw(noteToJson);
  const editorState = EditorState.createWithContent(contentState);

  return (
    <div>
      <Editor
        editorState={editorState}
        readOnly={true}
        blockStyleFn={getBlockStyle}
        customStyleMap={styleMap}
      />
    </div>
  );
}

const styleMap = {
  CODE: {
    // backgroundColor: "rgba(211, 211, 211, 1)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}
