import React from "react";
import NoteEditor from "./NoteEditor";
import "./Notes.scss";

export default function AddNote() {
  //find a component library with text editor
  return (
    <div className="addNote">
      <NoteEditor />
    </div>
  );
}
